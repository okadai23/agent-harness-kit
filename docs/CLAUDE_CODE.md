# Claude Code Support

This repository includes a Claude Code native layer in `.claude/`.

## Native Files

- `CLAUDE.md`: short always-on project instructions.
- `.claude/settings.json`: permissions and lifecycle hooks.
- `.claude/agents/*.md`: project subagents.
- `.claude/skills/*/SKILL.md`: project skills.
- `.claude/commands/*.md`: slash-style command prompts.

## Shared Source

The portable source package remains `.apm/**`.

The Codex native layer remains:

- `AGENTS.md`
- `.codex/**`
- `.agents/skills/**`

The Claude native layer mirrors the same concepts:

| Concept | Codex | Claude Code | APM |
| --- | --- | --- | --- |
| Always-on instructions | `AGENTS.md` | `CLAUDE.md` | `.apm/instructions/**` |
| Skills | `.agents/skills/**` | `.claude/skills/**` | `.apm/skills/**` |
| Subagents | `.codex/agents/*.toml` | `.claude/agents/*.md` | `.apm/agents/*.agent.md` |
| Hooks | `.codex/hooks.json` | `.claude/settings.json` | `.apm/hooks/**` |
| Commands/prompts | prompts in docs/APM | `.claude/commands/*.md` | `.apm/prompts/**` |

## Commands

Validate the Claude native layer:

```bash no-run
pnpm claude:check
```

Sync command prompts from `.apm/prompts`:

```bash no-run
pnpm claude:sync
```

Run regular verification:

```bash no-run
pnpm verify:fast
pnpm docs:verify
```

## Hooks

Claude Code hooks use the native exit-code contract:

- exit `0`: continue
- exit `2`: block and show stderr to Claude

The hook commands call:

```bash no-run
node scripts/hook-dispatch.mjs scripts/claude/hooks/pre_tool_policy.py
```

`hook-dispatch.mjs` finds `python3`, `python`, or `py -3` depending on the host and preserves the hook exit code.

## Subagent Review Prompt

```txt
Use pr-explorer first to map the diff.
Then use vibe-reviewer, bug-hunter, security-reviewer, architecture-reviewer, e2e-reviewer, and doc-impact-reviewer.
All are read-only.
Consolidate findings using code_review.md.
Do not modify files.
```

For publishing maintenance fixes, use `github-maintainer` to plan the Issue/PR flow. Creating Issues and PRs still requires explicit confirmation before running `--confirm`.

## Maintenance Rule

When changing harness behavior, update both:

1. the native Claude file in `.claude/**`
2. the portable APM primitive in `.apm/**`
3. the Codex native file if the behavior should apply there too
