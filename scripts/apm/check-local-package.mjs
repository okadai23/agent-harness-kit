#!/usr/bin/env node
import fs from "node:fs";

const requiredFiles = [
  "apm.yml",
  ".apm/README.md",
  ".apm/instructions/codex-harness.instructions.md",
  ".apm/instructions/claude-code.instructions.md",
  ".apm/instructions/security-and-privacy.instructions.md",
  ".apm/instructions/review.instructions.md",
  ".apm/prompts/shape-task.prompt.md",
  ".apm/prompts/implement-prototype.prompt.md",
  ".apm/prompts/review-branch.prompt.md",
  ".apm/prompts/session-retrospective.prompt.md",
  ".apm/prompts/apm-maintenance.prompt.md",
  ".apm/prompts/claude-code-maintenance.prompt.md",
  ".apm/prompts/publish-agent-fix.prompt.md",
  ".apm/agents/pr-explorer.agent.md",
  ".apm/agents/vibe-reviewer.agent.md",
  ".apm/agents/bug-hunter.agent.md",
  ".apm/agents/staff-plan-reviewer.agent.md",
  ".apm/agents/security-reviewer.agent.md",
  ".apm/agents/architecture-reviewer.agent.md",
  ".apm/agents/doc-impact-reviewer.agent.md",
  ".apm/agents/github-maintainer.agent.md",
  ".apm/hooks/codex-harness-hooks.json",
  ".apm/skills/karpathy-guidelines/SKILL.md",
  ".apm/skills/codex-task-shaping/SKILL.md",
  ".apm/skills/clean-tdd-prototype/SKILL.md",
  ".apm/skills/doc-maintenance/SKILL.md",
  ".apm/skills/research-plan-execute-review-ship/SKILL.md",
  ".apm/skills/pr-review-checklist/SKILL.md",
  ".apm/skills/failure-to-harness/SKILL.md",
  ".apm/skills/session-retrospective/SKILL.md",
  ".apm/skills/github-issue-pr-automation/SKILL.md"
];

const missing = requiredFiles.filter((file) => !fs.existsSync(file));
const formatIssues = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(file) || !file.endsWith(".md")) continue;
  const text = fs.readFileSync(file, "utf8");
  const isPrimitive =
    file.includes("/instructions/") ||
    file.includes("/prompts/") ||
    file.includes("/agents/") ||
    file.includes("/skills/");
  if (isPrimitive && !text.startsWith("---\n")) formatIssues.push(file);
}

const hookPath = ".apm/hooks/codex-harness-hooks.json";
try {
  JSON.parse(fs.readFileSync(hookPath, "utf8"));
} catch (error) {
  formatIssues.push(`${hookPath}: invalid JSON (${error.message})`);
}

if (missing.length || formatIssues.length) {
  if (missing.length) {
    console.error("Missing APM package files:");
    for (const file of missing) console.error(`- ${file}`);
  }
  if (formatIssues.length) {
    console.error("APM primitive format issues:");
    for (const file of formatIssues) console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log(`APM local package check passed: ${requiredFiles.length} files.`);

