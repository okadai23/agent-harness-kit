---
name: research-plan-execute-review-ship
description: Use this skill for complex or multi-step development work that should be run as Research -> Plan -> Execute -> Review -> Ship.
---

## Research

- Read `AGENTS.md`, `PLANS.md`, `code_review.md`, and relevant docs.
- Locate affected code paths before editing.

## Plan

- State assumptions.
- Define acceptance criteria.
- Break work into phases.
- Attach verification to each phase.

## Execute

- Implement one phase at a time.
- Keep the diff surgical.
- Use the simplest sufficient design.

## Review

- Run relevant verification commands.
- Run `pnpm harness:diff-scope` under git.
- Review against `code_review.md`.

## Ship

- Update docs or explain no-doc-change.
- Summarize changed files, tests, commands, assumptions, and residual risk.

