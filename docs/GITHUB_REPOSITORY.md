# GitHub Repository Setup

This harness is intended to be managed as a GitHub repository.

## Recommended Repository Name

Recommended:

```txt
agent-harness-kit
```

Why:

- neutral across Codex, Claude Code, and future coding agents
- short enough to remember
- describes the actual artifact: a reusable harness, not only prompts
- leaves room for APM packaging and CI workflows

Good alternatives:

- `codex-claude-harness`
- `coding-agent-harness`
- `agentic-dev-harness`
- `vibe-coding-harness`
- `codex-harness-kit`

Avoid names that are too narrow:

- `codex-settings`
- `my-agents`
- `prompts`

## Initial GitHub Setup

```bash no-run
git init
git add .
git commit -m "Initial agent harness kit"
gh repo create agent-harness-kit --private --source=. --remote=origin --push
```

Use `--public` instead of `--private` only after reviewing the repository for personal paths and private preferences.

## Required Checks

Recommended branch protection checks:

- `script-quality / Check JS, JSON, and Python scripts`
- `quality / verify`
- `docs-quality / docs`
- `apm-quality / apm`

## CI Coverage

The workflows check:

- JavaScript syntax with `node --check`
- JSON syntax
- Python syntax via `uv run python`
- harness rule fixtures
- APM package shape
- Claude Code native layer shape
- docs impact and docs verification
- full harness verification
- APM compile validation and audit

## Local Pre-Push Check

```bash no-run
pnpm ci:scripts
pnpm ci:harness:uv
pnpm docs:verify
pnpm verify:fast
```

## Release Strategy

For early personal use, tag manually:

```bash no-run
git tag v0.1.0
git push origin v0.1.0
```

When the harness stabilizes, add a release workflow and publish an APM archive from `pnpm apm:pack`.

