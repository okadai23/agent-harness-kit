#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const mappings = [
  [".apm/prompts/shape-task.prompt.md", ".claude/commands/shape-task.md"],
  [".apm/prompts/implement-prototype.prompt.md", ".claude/commands/implement-prototype.md"],
  [".apm/prompts/review-branch.prompt.md", ".claude/commands/review-branch.md"],
  [".apm/prompts/session-retrospective.prompt.md", ".claude/commands/session-retrospective.md"],
  [".apm/prompts/apm-maintenance.prompt.md", ".claude/commands/apm-maintenance.md"]
];

for (const [source, target] of mappings) {
  if (!fs.existsSync(source)) continue;
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
  console.log(`${source} -> ${target}`);
}

console.log("Claude command sync complete. Review diffs before committing.");

