# Harness Operations

## Failure-To-Harness Loop

1. Observe a failure and log it in `harness/failures.jsonl`.
2. Run `python scripts/harness/promote_failures.py`.
3. Add or update a rule in `harness/rules.yaml`.
4. Add bad and good fixtures.
5. Run `python scripts/harness/run_rule_tests.py`.
6. Start in warn mode.
7. Promote to block mode only after human review.

## Subagent Pattern

Use subagents for read-only sidecar work:

- `architecture_reviewer`
- `pr_explorer`
- `staff_plan_reviewer`
- `bug_hunter`
- `vibe_reviewer`
- `github_maintainer`
- `e2e_reviewer`
- `security_reviewer`
- `doc_impact_reviewer`
- `doc_quality_reviewer`
- `harness_reviewer`

Keep one writer responsible for any given file set.

For PR-size reviews, use the pattern in `docs/workflows/subagent-review.md`.
For publishing agent maintenance fixes, use `github_maintainer` for a read-only publication plan before running `github:issue-pr`.

## Karpathy-Style Behavioral Layer

The `karpathy-guidelines` skill is intentionally small and behavioral. It is not a replacement for tests or hooks.

Use it as feedforward guidance:

- think before coding
- simplify before abstracting
- keep diffs surgical
- define verification up front

Use `vibe_reviewer` as feedback when a diff may be too broad, speculative, or assumption-heavy.
Use `node scripts/harness/check-diff-scope.mjs` as a cheap computational sensor for broad working-tree changes.

## Cross-Platform Execution

Default verification commands use Node `.mjs` entrypoints so the same `pnpm verify` works on Windows, Linux, and macOS.

Shell-specific `.sh` and `.ps1` files are wrappers only.
Hooks call `node scripts/hook-dispatch.mjs` so Python hooks can run with `uv run python`, `python3`, `python`, or `py -3` depending on the host.
