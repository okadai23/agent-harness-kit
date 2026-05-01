# ADR 0001: Use A Codex Harness

Status: Proposed

## Context

Coding agents work better when repeated workflows, constraints, and verification loops are encoded in repository artifacts rather than repeated in ad hoc prompts.

## Decision

Use a repo-local Codex harness with:

- short project instructions in `AGENTS.md`
- reusable skills in `.agents/skills`
- subagent definitions in `.codex/agents`
- command rules and hooks in `.codex`
- deterministic verification scripts in `scripts`
- recurring failure tracking in `harness`

## Consequences

- Codex can recover from failures with concrete feedback.
- Repeated failures can be promoted from notes to rules, hooks, lint, tests, or reviewer agents.
- Harness changes require the same review care as application code.

