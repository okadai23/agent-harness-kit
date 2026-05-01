#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourceRoot = path.resolve(__dirname, "..");

const rawArgs = process.argv.slice(2);
const args = new Set(rawArgs);
const dryRun = !args.has("--write");
const force = args.has("--force");
const help = args.has("--help") || args.has("-h");

function optionValue(name) {
  const inline = rawArgs.find((arg) => arg.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);

  const index = rawArgs.indexOf(name);
  if (index === -1) return null;

  const value = rawArgs[index + 1];
  if (!value || value.startsWith("--")) return null;
  return value;
}

const targetRoot = path.resolve(optionValue("--target") ?? process.cwd());

const manifest = [
  "AGENTS.md",
  "PLANS.md",
  "CLAUDE.md",
  "code_review.md",
  "pyproject.toml",
  "uv.lock",
  "apm.yml",
  ".apm",
  ".agents",
  ".claude",
  ".codex",
  ".github",
  "docs",
  "harness",
  "scripts",
];

const skipPatterns = [
  /^\.git(?:\/|$)/,
  /^node_modules(?:\/|$)/,
  /^\.venv(?:\/|$)/,
  /^\.harness(?:\/|$)/,
  /^dist(?:\/|$)/,
  /^coverage(?:\/|$)/,
  /^package-lock\.json$/,
  /^pnpm-lock\.yaml$/,
  /^yarn\.lock$/,
];

function usage() {
  console.log(`Usage:
  node scripts/adopt-harness.mjs [--target=../target-repo] [--write] [--force]

Default mode is a dry run.

Options:
  --target=<path>  Repository to install the harness into. Defaults to cwd.
  --write          Actually copy files.
  --force          Overwrite without creating .bak files.
  --help           Show this message.
`);
}

function toPosix(relativePath) {
  return relativePath.split(path.sep).join("/");
}

function shouldSkip(relativePath) {
  const normalized = toPosix(relativePath);
  return skipPatterns.some((pattern) => pattern.test(normalized));
}

function walk(entryPath) {
  const stat = fs.statSync(entryPath);
  if (stat.isFile()) return [entryPath];
  if (!stat.isDirectory()) return [];

  const files = [];
  for (const entry of fs.readdirSync(entryPath, { withFileTypes: true })) {
    const child = path.join(entryPath, entry.name);
    const relative = path.relative(sourceRoot, child);
    if (shouldSkip(relative)) continue;
    files.push(...walk(child));
  }
  return files;
}

function ensureParent(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function backupIfNeeded(target) {
  if (force || !fs.existsSync(target)) return;

  const backup = `${target}.bak`;
  if (fs.existsSync(backup)) {
    throw new Error(`Refusing to overwrite existing backup: ${backup}`);
  }
  fs.renameSync(target, backup);
  console.log(`backed up ${path.relative(targetRoot, target)} -> ${path.relative(targetRoot, backup)}`);
}

function copyFile(source, target) {
  const relative = path.relative(sourceRoot, source);
  if (dryRun) {
    const action = fs.existsSync(target) && !force ? "would backup and copy" : "would copy";
    console.log(`${action} ${toPosix(relative)}`);
    return;
  }

  ensureParent(target);
  backupIfNeeded(target);
  fs.copyFileSync(source, target);
  console.log(`copied ${toPosix(relative)}`);
}

function copyEntry(relativePath) {
  const source = path.join(sourceRoot, relativePath);
  if (!fs.existsSync(source)) {
    console.warn(`missing source entry: ${relativePath}`);
    return;
  }

  for (const file of walk(source)) {
    const target = path.join(targetRoot, path.relative(sourceRoot, file));
    copyFile(file, target);
  }
}

function copyPackageTemplate() {
  const source = path.join(sourceRoot, "package.json");
  if (!fs.existsSync(source)) return;

  const targetPackage = path.join(targetRoot, "package.json");
  const targetTemplate = path.join(targetRoot, "package.agent-harness-kit.json");

  if (fs.existsSync(targetPackage)) {
    copyFile(source, targetTemplate);
    if (!dryRun) {
      console.log("package.json already exists; merge scripts from package.agent-harness-kit.json manually.");
    }
    return;
  }

  copyFile(source, targetPackage);
}

function printNextSteps() {
  console.log(`
Next steps:
  1. Review copied files and remove features your project does not need yet.
  2. If package.agent-harness-kit.json exists, merge useful scripts into package.json.
  3. Run: pnpm install
  4. Run: node scripts/uv-doctor.mjs
  5. Run: pnpm verify:fast
  6. Run: pnpm docs:verify
  7. Commit the harness files as one reviewable change.
`);
}

function main() {
  if (help) {
    usage();
    return;
  }

  if (targetRoot === sourceRoot) {
    if (!dryRun) {
      throw new Error("Refusing to install into the harness kit repository itself. Pass --target <other-repo>.");
    }
    console.log("Dry run is targeting the harness kit repository itself. Pass --target <other-repo> to adopt elsewhere.");
  }

  console.log(`${dryRun ? "Dry run" : "Installing"} agent harness kit`);
  console.log(`source: ${sourceRoot}`);
  console.log(`target: ${targetRoot}`);

  for (const relativePath of manifest) {
    copyEntry(relativePath);
  }
  copyPackageTemplate();

  if (dryRun) {
    console.log("\nDry run only. Re-run with --write to copy files.");
  }

  printNextSteps();
}

main();
