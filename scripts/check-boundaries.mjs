#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const src = path.join(root, "src");

const rules = [
  {
    name: "domain must not depend on outer layers",
    from: /^src\/domain\//,
    deny: [/^src\/application\//, /^src\/adapters\//, /^src\/infrastructure\//]
  },
  {
    name: "application must not depend on adapters or infrastructure",
    from: /^src\/application\//,
    deny: [/^src\/adapters\//, /^src\/infrastructure\//]
  },
  {
    name: "adapters must not depend on infrastructure",
    from: /^src\/adapters\//,
    deny: [/^src\/infrastructure\//]
  }
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const p = path.join(dir, entry.name);
    if (entry.name === "node_modules" || entry.name === ".git") return [];
    if (entry.isDirectory()) return walk(p);
    if (/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(entry.name)) return [p];
    return [];
  });
}

function normalize(p) {
  return p.split(path.sep).join("/");
}

function resolveImport(file, spec) {
  if (!spec.startsWith(".")) return null;
  const base = path.dirname(file);
  const resolved = path.resolve(base, spec);
  const candidates = [
    resolved,
    `${resolved}.ts`,
    `${resolved}.tsx`,
    `${resolved}.js`,
    `${resolved}.jsx`,
    `${resolved}.mjs`,
    `${resolved}.cjs`,
    path.join(resolved, "index.ts"),
    path.join(resolved, "index.tsx"),
    path.join(resolved, "index.js"),
    path.join(resolved, "index.jsx")
  ];
  const found = candidates.find((p) => fs.existsSync(p) && fs.statSync(p).isFile());
  return found ? normalize(path.relative(root, found)) : null;
}

const files = walk(src);
const failures = [];

for (const abs of files) {
  const rel = normalize(path.relative(root, abs));
  const text = fs.readFileSync(abs, "utf8");
  const imports = [
    ...text.matchAll(/from\s+["']([^"']+)["']/g),
    ...text.matchAll(/import\s*\(\s*["']([^"']+)["']\s*\)/g),
    ...text.matchAll(/require\s*\(\s*["']([^"']+)["']\s*\)/g)
  ].map((m) => m[1]).filter(Boolean);

  for (const spec of imports) {
    const target = resolveImport(abs, spec);
    if (!target) continue;

    for (const rule of rules) {
      if (!rule.from.test(rel)) continue;
      if (rule.deny.some((d) => d.test(target))) {
        failures.push(`${rule.name}: ${rel} -> ${target}`);
      }
    }
  }
}

if (failures.length) {
  console.error("Architecture boundary violations:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(files.length ? "Architecture boundary check passed." : "No src/ tree found; architecture check skipped.");

