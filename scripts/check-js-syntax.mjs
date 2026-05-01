#!/usr/bin/env node
import childProcess from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const skipDirs = new Set([".git", "node_modules", "apm_modules", ".venv", "dist", "build", "coverage", ".harness"]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (skipDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.name.endsWith(".mjs") || entry.name.endsWith(".cjs") || entry.name.endsWith(".js")) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = walk(".");
const failures = [];

for (const file of files) {
  const result = childProcess.spawnSync(process.execPath, ["--check", file], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
  if (result.status !== 0) {
    failures.push(`${file}\n${result.stdout}${result.stderr}`.trim());
  }
}

if (failures.length) {
  console.error("JavaScript syntax check failed:");
  for (const failure of failures) {
    console.error(`\n${failure}`);
  }
  process.exit(1);
}

console.log(`JavaScript syntax check passed: ${files.length} files.`);

