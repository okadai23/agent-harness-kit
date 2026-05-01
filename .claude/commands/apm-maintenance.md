---
description: Maintain APM source and native Codex/Claude files together.
argument-hint: "[change request]"
---

Maintain `apm.yml`, `.apm/**`, `.codex/**`, `.agents/**`, and `.claude/**` as aligned harness layers.

Tasks:

- Keep APM source primitives aligned with native Codex and Claude files.
- Run or recommend `pnpm apm:check` and `pnpm claude:check`.
- Do not edit lock files by hand.
- Commit generated/native files only when intentionally refreshed.

$ARGUMENTS

