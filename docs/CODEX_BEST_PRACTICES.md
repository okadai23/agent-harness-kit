# Codex Best Practices Applied Here

This harness incorporates guidance from:

- <https://developers.openai.com/codex/learn/best-practices>
- <https://github.com/shanraisshan/codex-cli-best-practice>

## Applied Patterns

- Prompt shape: Goal, Context, Constraints, Done when.
- Plan first for ambiguous or multi-step work.
- Keep `AGENTS.md` short and practical.
- Move repeatable workflows into skills.
- Use focused subagents for independent review and exploration.
- Run tests, lint, type checks, docs checks, and diff review before finishing.
- Keep MCP and external tool access narrow and agent-scoped.
- Use profiles for safety levels.
- Use memories cautiously with privacy guardrails. This harness enables memories but uses `memories.disable_on_external_context = true` so threads using MCP, web search, or tool search are excluded from memory generation.
- Use one thread per coherent task and fork only when work truly branches.

## Local Additions

- `code_review.md` for consistent review behavior.
- `codex-task-shaping` skill for turning fuzzy ideas into executable tasks.
- `research-plan-execute-review-ship` skill and workflow doc.
- `pr_explorer`, `staff_plan_reviewer`, and `bug_hunter` subagents.
- Cross-platform Node verification entrypoints.
- APM manifest and local `.apm/**` package sources for portable agent configuration.
- Claude Code native layer (`CLAUDE.md`, `.claude/**`) that mirrors the same harness concepts.
- uv-aware Python execution for hooks and harness checks, with `uv run python` preferred and system Python as fallback.
- GitHub CI checks for JavaScript syntax, JSON syntax, Python syntax, uv execution, APM package shape, Claude native shape, docs, and harness verification.
- GitHub Issue/PR publication automation with dry-run default and explicit confirmation before external communication.

## Config Notes

- `config.toml` includes the official schema comment for editor diagnostics.
- Memory privacy uses the current key `memories.disable_on_external_context`; the older `no_memories_if_mcp_or_web_search` name is only a legacy alias.
