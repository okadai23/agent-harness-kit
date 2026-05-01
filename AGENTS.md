# AGENTS.md

## Purpose

This repository is a Codex harness template for fast, safe prototyping and coding.
Keep this file short. Put reusable workflows in `.agents/skills`, deterministic checks in `scripts`, and enforceable policy in `.codex`, `harness/rules.yaml`, tests, and CI.

## Working Agreements

- Explore the existing code before editing.
- For unclear or multi-file tasks, use Explore -> Plan -> Implement -> Verify.
- For complex work, follow `docs/workflows/research-plan-execute-review-ship.md` and keep the active plan in `PLANS.md`.
- Prefer small, reversible changes with focused tests.
- Think before coding: state risky assumptions, surface tradeoffs, and ask when ambiguity would make the implementation likely wrong.
- Simplicity first: solve today's requirement without speculative abstractions, configurability, or features the user did not ask for.
- Surgical changes: touch only files and lines that trace to the request, match existing style, and clean up only your own new mess.
- Goal-driven execution: turn vague tasks into success criteria, then loop until the relevant checks pass.
- Treat documentation as part of the deliverable when public behavior, commands, architecture, configuration, or API shape changes.
- For reviews, use `code_review.md` and lead with actionable findings.
- Do not read `.env`, `.env.*`, private keys, credential stores, `.ssh/`, `.aws/`, or `secrets/`.
- Do not introduce real secrets. Use dummy values in examples, tests, fixtures, and docs.
- Ask before adding production dependencies, enabling external network access, or touching deployment/publishing flows.

## Prototype Architecture

- Prefer Clean Architecture for system prototypes:
  - `src/domain` has business rules and depends on no outer layer.
  - `src/application` owns use cases and ports.
  - `src/adapters` translates HTTP, persistence, external APIs, UI, or CLI into application calls.
  - `src/infrastructure` owns framework wiring, DB clients, config, and the composition root.
- Use cases depend on port interfaces, not adapter implementations.
- Keep business rules out of controllers, ORM models, framework bootstrapping, and UI components.

## TDD Workflow

- Write acceptance criteria before implementation.
- For user-visible behavior, add or update an E2E or acceptance-level test first.
- For domain-only behavior, add a domain or application test first.
- Confirm the new test fails for the expected reason when feasible.
- Implement the smallest useful change, then refactor after the tests pass.

## Required Commands

Use the commands that exist in this repository:

- Cross-platform fast verification: `pnpm verify:fast` or `node scripts/verify-fast.mjs`
- Full verification: `pnpm verify` or `node scripts/verify.mjs`
- Architecture check: `pnpm arch` or `node scripts/check-boundaries.mjs`
- Documentation check: `pnpm docs:verify` or `node scripts/docs/verify-docs.mjs`
- Harness rule tests: `python scripts/harness/run_rule_tests.py`
- Diff scope review: `pnpm harness:diff-scope` or `node scripts/harness/check-diff-scope.mjs`

If a command is missing because the target project has not been scaffolded yet, create the smallest script/package entry needed or explain the gap.

## Documentation Maintenance

Before finishing code changes, check whether docs are impacted by:

- public API, routes, CLI commands, or configuration
- application use cases or domain concepts
- E2E-visible behavior
- architecture boundaries or dependency rules
- testing strategy, runbooks, or release notes

Do not manually edit generated sections marked with `<!-- GENERATED:*:start -->` and `<!-- GENERATED:*:end -->`; run the matching generator.

## Definition Of Done

- Relevant tests were added or updated.
- Fast verification passed, or failures are reported with the exact blocker.
- E2E verification was run for user-visible behavior, or the reason for skipping it is stated.
- Architecture and secret checks pass for changed areas.
- Impacted docs were updated or a no-doc-change rationale is given.
- Diff scope is explainable: every changed file has a direct reason tied to the request.

## Personal Overrides

Use `AGENTS.override.md` for local preferences. Do not commit it.
