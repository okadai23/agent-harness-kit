# Claude Code Harness

This directory is the Claude Code native layer for the shared Codex/Claude/APM harness.

## Files

- `settings.json`: permissions and hooks.
- `agents/*.md`: project subagents.
- `skills/*/SKILL.md`: project skills.
- `commands/*.md`: slash-style workflow prompts.

## Canonical Source

The portable package source is `.apm/**`.
Native Claude files are committed so Claude Code works immediately after clone.

When changing behavior:

1. Update the native Claude file for immediate use.
2. Update the matching `.apm/**` primitive for portability.
3. Run `pnpm claude:check` and `pnpm apm:check`.

## Useful Commands

```bash no-run
pnpm claude:check
pnpm claude:sync
pnpm verify:fast
```

