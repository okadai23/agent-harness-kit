---
name: failure-to-harness
description: Use this skill when repeated agent failures should become AGENTS.md guidance, skills, hooks, lint, tests, fixtures, or CI checks.
---

## Workflow

1. Read `harness/failures.jsonl` if present and `harness/rules.yaml`.
2. Cluster failures by fingerprint.
3. Route unsafe commands to hooks/rules.
4. Route secret access to deny rules or secret scans.
5. Route architecture violations to structural tests.
6. Route missing context to docs or skills.
7. Add good and bad fixtures for deterministic rules.
8. Keep new rules in warn mode unless humans approve block mode.

Do not silently weaken security settings or bypass CI.

