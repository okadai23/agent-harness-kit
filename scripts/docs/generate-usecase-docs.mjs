#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const dir = "src/application/usecases";
const target = "docs/domain/usecases.md";
const start = "<!-- GENERATED:application-usecases:start -->";
const end = "<!-- GENERATED:application-usecases:end -->";

function walk(root) {
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const p = path.join(root, entry.name);
    if (entry.isDirectory()) return walk(p);
    return /\.(ts|tsx|js|jsx|mjs|cjs|py|go)$/.test(entry.name) ? [p] : [];
  });
}

function replaceBlock(text, content) {
  const block = `${start}\n${content.trim()}\n${end}`;
  const re = new RegExp(`${escapeRegex(start)}[\\s\\S]*?${escapeRegex(end)}`);
  return re.test(text) ? text.replace(re, block) : `${text.trim()}\n\n${block}\n`;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const files = walk(dir);
const content = files.length
  ? files.map((file) => `- \`${file.split(path.sep).join("/")}\``).join("\n")
  : "No `src/application/usecases` directory found yet.";

fs.mkdirSync("docs/domain", { recursive: true });
const existing = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : "# Use Cases\n\n";
fs.writeFileSync(target, replaceBlock(existing, content), "utf8");
console.log(`Generated ${target}`);

