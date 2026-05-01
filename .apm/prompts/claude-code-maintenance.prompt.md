---
mode: agent
description: "Maintain Claude Code native files together with APM and Codex harness files."
---

# Claude Code Maintenance

Maintain:

- `CLAUDE.md`
- `.claude/settings.json`
- `.claude/agents/*.md`
- `.claude/skills/*/SKILL.md`
- `.claude/commands/*.md`
- `.apm/**`
- equivalent Codex native files when relevant

Run or recommend:

- `pnpm claude:check`
- `pnpm apm:check`
- `pnpm verify:fast`

Do not weaken permissions or hooks without explicit approval.

