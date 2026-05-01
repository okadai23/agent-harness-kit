# CLAUDE.md

This repository is configured for Claude Code as well as Codex.

Keep this file short. Put reusable workflows in `.claude/skills`, slash-style prompts in `.claude/commands`, focused agents in `.claude/agents`, and portable APM source in `.apm`.

## Core Habits

- Shape work as Goal, Context, Constraints, Done when, and Verification.
- For complex work, use Research -> Plan -> Execute -> Review -> Ship.
- State risky assumptions before coding.
- Prefer the simplest sufficient implementation.
- Keep diffs surgical and explain every changed file.
- Treat docs as part of the deliverable when public behavior changes.
- For reviews, use `code_review.md` and lead with actionable findings.

## Safety

- Do not read `.env`, `.env.*`, private keys, credential stores, `.ssh/`, `.aws/`, or `secrets/`.
- Do not introduce real secrets. Use dummy values in examples, tests, fixtures, and docs.
- Ask before adding external network access, publishing, deploying, or changing permissions.
- Do not run `sudo`, `rm -rf`, `chmod -R 777`, `git push --force`, package publish commands, or `curl | sh`.

## Verification

Use cross-platform Node entrypoints:

- Fast verification: `pnpm verify:fast` or `node scripts/verify-fast.mjs`
- Full verification: `pnpm verify` or `node scripts/verify.mjs`
- Docs verification: `pnpm docs:verify` or `node scripts/docs/verify-docs.mjs`
- Diff scope: `pnpm harness:diff-scope` or `node scripts/harness/check-diff-scope.mjs`

## Claude Code Native Files

- `.claude/settings.json`: permissions and lifecycle hooks
- `.claude/agents/*.md`: project subagents
- `.claude/skills/*/SKILL.md`: project skills
- `.claude/commands/*.md`: reusable slash-style workflows

APM portable source lives in `.apm/**`.

