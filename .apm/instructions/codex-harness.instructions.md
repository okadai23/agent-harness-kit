---
applyTo: "**"
---

# Codex Harness Instructions

Use this project as a Codex harness for safe, efficient prototype development.

Core habits:

- Shape work as Goal, Context, Constraints, Done when, and Verification.
- For non-trivial tasks, use Research -> Plan -> Execute -> Review -> Ship.
- Keep `AGENTS.md` short; move detailed workflows into skills and docs.
- Prefer simple, surgical changes with focused tests.
- Treat docs as part of the deliverable when public behavior changes.
- Review code with `code_review.md` and lead with findings.

Default verification:

- `pnpm verify:fast`
- `pnpm verify`
- `pnpm docs:verify`
- `pnpm harness:diff-scope`

