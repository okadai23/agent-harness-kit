# APM Management

This repository can be managed as an APM package.

APM source files live in:

- `apm.yml`
- `.apm/instructions/**`
- `.apm/prompts/**`
- `.apm/agents/**`
- `.apm/skills/**`
- `.apm/hooks/**`

Native Codex files remain committed for immediate use:

- `AGENTS.md`
- `.agents/skills/**`
- `.codex/agents/**`
- `.codex/hooks.json`
- `.codex/config.toml`

Native Claude Code files also remain committed for immediate use:

- `CLAUDE.md`
- `.claude/settings.json`
- `.claude/agents/**`
- `.claude/skills/**`
- `.claude/commands/**`

## Install APM

Linux/macOS:

```bash no-run
curl -sSL https://aka.ms/apm-unix | sh
```

Windows:

```powershell no-run
irm https://aka.ms/apm-windows | iex
```

## Local Workflow

Validate local APM source shape:

```bash no-run
pnpm apm:check
```

Install and deploy local `.apm/` content:

```bash no-run
apm install
```

Compile for Codex:

```bash no-run
apm compile --target codex
```

Audit package content:

```bash no-run
apm audit --ci
```

Pack for distribution:

```bash no-run
apm pack --target codex --archive
```

## Commit Policy

Commit:

- `apm.yml`
- `apm.lock.yaml` after `apm install`
- `.apm/**`
- generated native Codex files when intentionally refreshed

Do not commit:

- `apm_modules/**`
- build artifacts from `apm pack`

## Source-Of-Truth Guidance

For now, keep `.apm/**` and native Codex files aligned manually.
When changing agent behavior, update both:

1. native Codex file for immediate local use
2. native Claude file when the behavior should apply to Claude Code
3. `.apm/**` primitive for portable package distribution

Run `pnpm apm:check` and `pnpm claude:check` before review.
