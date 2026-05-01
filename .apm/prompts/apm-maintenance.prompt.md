---
mode: agent
description: "Maintain the APM manifest and package sources for this Codex harness."
---

# APM Maintenance

Maintain `apm.yml` and `.apm/**` as the portable source package for this harness.

Tasks:

- Keep APM source primitives aligned with native Codex files.
- Run or recommend `apm compile --target codex` after changing `.apm/**`.
- Run or recommend `apm audit --ci`.
- Do not edit `apm.lock.yaml` by hand.
- Commit generated native files after APM compile when they are intentionally updated.

