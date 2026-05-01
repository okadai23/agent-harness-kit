# Subagent Review Pattern

Use this when a diff is large enough that independent context windows help.

## Default PR Review Team

- `pr_explorer`: map changed files, entry points, tests, and docs impact.
- `vibe_reviewer`: check assumptions, simplicity, broad diffs, and weak verification.
- `bug_hunter`: look for correctness bugs, races, regressions, and missing reproduction tests.
- `security_reviewer`: check secrets, exfiltration, unsafe commands, and permission weakening.
- `architecture_reviewer`: check dependency direction and misplaced business logic.
- `e2e_reviewer`: check acceptance coverage and flaky user journeys.
- `doc_impact_reviewer`: check README, API, runbook, changelog, and generated docs impact.

## Prompt

```txt
Review this branch against main.
Spawn pr_explorer first to map the affected code paths.
Then spawn vibe_reviewer, bug_hunter, security_reviewer, architecture_reviewer, e2e_reviewer, and doc_impact_reviewer.
All agents are read-only.
Wait for all results, then consolidate findings using code_review.md.
Do not modify files.
```

## Rule

Subagents are for bounded sidecar work. Keep the main thread focused on the decision and final integration.

