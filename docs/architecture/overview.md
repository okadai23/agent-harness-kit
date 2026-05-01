---
owner: platform
review_cycle: monthly
last_reviewed: 2026-04-29
stale_after_days: 60
source_of_truth:
  - AGENTS.md
  - .codex/config.toml
  - harness/rules.yaml
---

# Architecture Overview

This repository is organized as an agent harness, not just a prompt collection.

The layers are:

- Feedforward guidance: `AGENTS.md`, `PLANS.md`, `.agents/skills/**`, and docs.
- Deterministic feedback: `scripts/**`, `harness/rules.yaml`, fixtures, tests, and CI.
- Runtime guardrails: `.codex/config.toml`, `.codex/rules/**`, and `.codex/hooks/**`.
- Review separation: `.codex/agents/**` read-only reviewers for vibe discipline, architecture, docs, E2E, security, and harness changes.
- Cross-platform execution: Node `.mjs` entrypoints wrap verification so Windows and Linux run the same package scripts.
- Task shaping and review: `code_review.md`, `PLANS.md`, and workflow skills keep long tasks structured.

The behavioral layer follows four compact coding-agent habits:

- state assumptions instead of silently guessing
- prefer the simplest sufficient design
- keep diffs surgical
- define success criteria that can be verified

For product prototypes, prefer Clean Architecture:

```text
domain -> application -> adapters -> infrastructure
```

Dependencies point inward. Frameworks, storage, HTTP, browser tooling, and environment configuration stay outside business logic.

Broad-diff review is handled by `vibe_reviewer` and `scripts/harness/check-diff-scope.mjs`.
