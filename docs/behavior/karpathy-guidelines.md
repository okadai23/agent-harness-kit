# Karpathy-Style Guidelines For Codex

This harness adapts the compact guidance from `forrestchang/andrej-karpathy-skills` for Codex.

The goal is not to make Codex slower. The goal is to prevent expensive mistakes on non-trivial work.

## Four Habits

1. Think before coding.
2. Prefer the simplest sufficient implementation.
3. Keep changes surgical.
4. Define success criteria and verify them.

## How This Harness Applies Them

- `AGENTS.md` contains the short always-on version.
- `.agents/skills/karpathy-guidelines/SKILL.md` contains the reusable workflow.
- `.codex/agents/vibe_reviewer.toml` reviews assumptions, overengineering, broad diffs, and weak verification.
- `scripts/harness/check-diff-scope.mjs` warns when a git diff is broad enough to deserve extra scrutiny.
- `harness/rules.yaml` tracks these behavioral rules as warn-mode harness entries.

## Prompt Pattern

```txt
Use $karpathy-guidelines with the implementation.
State assumptions, choose the simplest sufficient design, keep the diff surgical, and define verification before coding.
```

For tiny one-line edits, keep the ceremony tiny too.
