#!/usr/bin/env node
import childProcess from "node:child_process";

const maxFiles = Number(process.env.DIFF_SCOPE_MAX_FILES || 25);
const maxLines = Number(process.env.DIFF_SCOPE_MAX_LINES || 1200);
const strict = process.env.DIFF_SCOPE_STRICT === "1";

function run(command) {
  return childProcess.execSync(command, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"]
  }).trim();
}

function inGitRepo() {
  try {
    run("git rev-parse --is-inside-work-tree");
    return true;
  } catch {
    return false;
  }
}

if (!inGitRepo()) {
  console.log("Diff scope check skipped: not a git repository.");
  process.exit(0);
}

let output = "";
try {
  output = run("git diff --numstat HEAD");
} catch {
  output = "";
}

if (!output) {
  console.log("Diff scope check passed: no unstaged working tree diff.");
  process.exit(0);
}

const rows = output.split(/\r?\n/).filter(Boolean).map((line) => {
  const [addedRaw, deletedRaw, ...fileParts] = line.split(/\t/);
  const added = Number(addedRaw) || 0;
  const deleted = Number(deletedRaw) || 0;
  return { added, deleted, file: fileParts.join("\t") };
});

const changedFiles = rows.length;
const changedLines = rows.reduce((sum, row) => sum + row.added + row.deleted, 0);
const largeFiles = rows.filter((row) => row.added + row.deleted > Math.max(200, maxLines / 3));

const warnings = [];
if (changedFiles > maxFiles) {
  warnings.push(`changed file count ${changedFiles} exceeds DIFF_SCOPE_MAX_FILES=${maxFiles}`);
}
if (changedLines > maxLines) {
  warnings.push(`changed line count ${changedLines} exceeds DIFF_SCOPE_MAX_LINES=${maxLines}`);
}
for (const row of largeFiles) {
  warnings.push(`large file diff: ${row.file} (+${row.added}/-${row.deleted})`);
}

if (!warnings.length) {
  console.log(`Diff scope check passed: ${changedFiles} files, ${changedLines} changed lines.`);
  process.exit(0);
}

console.log("Diff scope warnings:");
for (const warning of warnings) console.log(`- ${warning}`);
console.log("\nSurgical-change prompt: every changed file should have a direct reason tied to the user request. Mention unrelated findings instead of fixing them silently.");

process.exit(strict ? 1 : 0);

