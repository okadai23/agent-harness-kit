---
name: clean-tdd-prototype
description: Use this skill when implementing a prototype with Clean Architecture, TDD, and E2E or acceptance tests.
---

Use `karpathy-guidelines` as the behavioral layer.

## Workflow

1. Read `AGENTS.md`.
2. Restate target behavior as acceptance criteria.
3. State risky assumptions.
4. Identify domain, application use case, inbound adapter, outbound port, outbound adapter, and infrastructure boundary.
5. Choose the simplest sufficient design.
6. Write or update failing E2E or acceptance-level tests first unless the task is domain-only.
7. Implement the minimum production code.
8. Add focused domain/application unit tests.
9. Refactor without changing behavior.
10. Run `pnpm verify:fast`.
11. Run `pnpm test:e2e` for user-visible behavior.
12. Run `pnpm harness:diff-scope` under git.

## Guardrails

- Do not read secrets.
- Do not use network access unless explicitly approved.
- Do not put business logic in controllers, ORM models, UI, or framework bootstrapping.
- Do not broaden the diff with unrelated refactors.

