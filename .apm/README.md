# Codex Harness APM Package

This directory is the APM source package for the Codex harness.

APM manages these primitives:

- `instructions/`: always-on guidance compiled into agent context
- `prompts/`: reusable task prompts
- `agents/`: portable reviewer/explorer personas
- `skills/`: reusable workflows
- `hooks/`: lifecycle hook definitions

Native Codex files still live in:

- `AGENTS.md`
- `.agents/skills/**`
- `.codex/agents/**`
- `.codex/hooks.json`

Native Claude Code files live in:

- `CLAUDE.md`
- `.claude/settings.json`
- `.claude/agents/**`
- `.claude/skills/**`
- `.claude/commands/**`

Use APM to keep portable agent context reproducible:

```bash no-run
apm install
apm compile --target codex
apm audit --ci
apm pack --target codex --archive
```

APM currently manages Codex mainly through compile output. Keep this `.apm/` package as the portable source, then commit the generated native Codex files for immediate use.
For Claude Code, keep `.apm/**` and `.claude/**` aligned and run `pnpm claude:check`.
For GitHub publication automation, keep `github-issue-pr-automation`, `github-maintainer`, and `publish-agent-fix` aligned across APM, Codex, and Claude native layers.
