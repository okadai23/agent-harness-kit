---
name: karpathy-guidelines
description: Use this skill to avoid silent assumptions, overcomplication, broad diffs, and unverifiable completion claims.
---

Apply four habits:

1. Think before coding.
2. Prefer the simplest sufficient solution.
3. Make surgical changes.
4. Drive work by verifiable goals.

## Workflow

1. State risky assumptions before implementation.
2. Define success criteria that can be tested or inspected.
3. Choose the simplest approach that satisfies today's requirement.
4. Avoid speculative extension points, configuration, and one-use abstractions.
5. Touch only files that trace to the request.
6. Match existing style.
7. Verify with the narrowest useful check, then broaden when risk warrants it.
8. Before finishing, every changed file should have a reason.

## Gotchas

- Do not stall on trivial edits.
- Simplicity does not mean skipping required error handling or tests.
- Surgical change does not mean leaving your own broken tests behind.
- Ask questions only for genuinely risky ambiguity.

