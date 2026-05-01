# Research Plan Execute Review Ship

Use this workflow for non-trivial Codex work.

## Research

- Read `AGENTS.md`, relevant docs, and the smallest useful set of source files.
- Use search before broad file reads.
- Identify affected entry points, tests, and ownership boundaries.

## Plan

- State assumptions.
- Define acceptance criteria.
- Split work into phases.
- Attach a verification command to each phase.
- Ask for clarification only when choosing silently would likely be wrong or risky.

## Execute

- Make the smallest change that satisfies the next phase.
- Keep diffs surgical.
- Do not let multiple writers own the same files.

## Review

- Run relevant tests and checks.
- Review the diff against `code_review.md`.
- Use focused subagents for independent review when scope is large.

## Ship

- Update impacted docs.
- Record unresolved risks.
- Keep PRs focused and easy to revert.

