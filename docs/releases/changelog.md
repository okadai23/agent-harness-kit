# Changelog

## Unreleased

- Added Codex harness template.
- Added Karpathy-style coding discipline as a Codex skill, read-only reviewer, and diff-scope check.
- Switched default verification and hook entrypoints to cross-platform Node wrappers for Windows/Linux compatibility.
- Added Codex task-shaping, Research-Plan-Execute-Review-Ship workflow, code review checklist, and focused PR review subagents.
- Updated memory privacy configuration to the current `memories.disable_on_external_context` key and added the Codex config schema hint.
- Added APM package management via `apm.yml`, `.apm/**` primitives, APM package checks, and APM CI workflow.
- Added Claude Code native support with `CLAUDE.md`, `.claude/settings.json`, Claude agents, skills, commands, and Claude hook adapters.
- Added uv integration with `pyproject.toml`, uv-aware Python runner fallback, `uv:doctor`, uv docs, and uvx guidance.
- Added GitHub repository guidance, PR template, Dependabot for actions, and script-quality CI for JS/JSON/Python/APM/Claude checks.
- Added GitHub Issue and Pull Request automation for agent maintenance fixes, including dry-run local script, manual workflow, skill, and read-only maintainer agent.
- Added one-shot harness adoption with `scripts/adopt-harness.mjs`, `pnpm adopt:dry`, `pnpm adopt`, and an adoption guide for installing the full kit into another repository.
