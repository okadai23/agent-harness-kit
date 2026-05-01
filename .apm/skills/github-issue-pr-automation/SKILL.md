---
name: github-issue-pr-automation
description: Use this skill when publishing agent maintenance fixes to GitHub by creating an Issue, branch, commit, push, and Pull Request with explicit confirmation.
---

## Workflow

1. Confirm the working tree contains only intended changes.
2. Run verification.
3. Generate `.agent-maintenance/report.md`.
4. Dry-run `node scripts/github/create-issue-pr.mjs`.
5. Ask for explicit user confirmation before `--confirm`.
6. Create Issue, branch, commit, push, and PR.

## Guardrails

- Creating Issues and Pull Requests is external communication.
- Do not use `--confirm` without explicit approval at action time.
- Do not publish secrets or unrelated diffs.
- Do not merge the PR automatically.

