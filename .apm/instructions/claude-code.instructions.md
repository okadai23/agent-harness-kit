---
applyTo: "**"
---

# Claude Code Instructions

This harness supports Claude Code through native project files:

- `CLAUDE.md`
- `.claude/settings.json`
- `.claude/agents/*.md`
- `.claude/skills/*/SKILL.md`
- `.claude/commands/*.md`

Keep Claude native files aligned with Codex native files and `.apm/**`.

When changing behavior:

1. Update native Claude files for immediate use.
2. Update `.apm/**` primitives for portability.
3. Update Codex native files if the behavior should apply to Codex too.
4. Run `pnpm claude:check` and `pnpm apm:check`.

