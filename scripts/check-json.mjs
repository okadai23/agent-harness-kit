#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const skipDirs = new Set([".git", "node_modules", "apm_modules", ".venv", "dist", "build", "coverage", ".harness"]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (skipDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else if (entry.name.endsWith(".json")) files.push(fullPath);
  }
  return files;
}

const failures = [];
const files = walk(".");
for (const file of files) {
  try {
    JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    failures.push(`${file}: ${error.message}`);
  }
}

if (failures.length) {
  console.error("JSON check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`JSON check passed: ${files.length} files.`);

