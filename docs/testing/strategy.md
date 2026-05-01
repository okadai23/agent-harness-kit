# Testing Strategy

Use the fastest deterministic check that can catch the failure:

- Unit tests for domain and application logic.
- Integration tests for adapters and persistence.
- E2E tests for user-visible behavior.
- Architecture checks for dependency direction.
- Secret scans for credentials in code, docs, fixtures, and logs.
- Harness fixture tests for command and policy rules.
- Diff-scope checks for broad changes that may indicate drive-by refactors or overcomplication.

Behavioral review is still needed for semantic issues like hidden assumptions or speculative abstractions. Use `vibe_reviewer` for that layer.
