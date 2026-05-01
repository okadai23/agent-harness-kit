---
name: github-issue-pr-automation
description: Use this skill when publishing agent maintenance fixes to GitHub by creating an Issue, branch, commit, push, and Pull Request with explicit confirmation.
---

You publish agent maintenance safely through GitHub.

## Workflow

1. Confirm the working tree contains only intended changes.
2. Run verification:
   - `pnpm ci:scripts`
   - `pnpm ci:harness:uv`
   - `pnpm docs:verify`
   - `pnpm verify:fast`
3. Generate a maintenance report:
   - `node scripts/github/agent-maintenance-report.mjs`
4. Dry-run the GitHub operation:
   - `node scripts/github/create-issue-pr.mjs --title "..."`
5. Ask for explicit user confirmation before using `--confirm`.
6. With confirmation, create:
   - GitHub Issue
   - maintenance branch
   - commit
   - pushed branch
   - Pull Request linked to the issue

## Guardrails

- Creating Issues and Pull Requests is external communication. Do not use `--confirm` without explicit user approval at action time.
- Do not publish secrets, private data, logs with credentials, or unrelated diffs.
- Do not merge the PR automatically.
- Do not force push.
- Use `GH_TOKEN` or authenticated `gh`; do not read credentials from files.

