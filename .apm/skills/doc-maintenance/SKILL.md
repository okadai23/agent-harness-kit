---
name: doc-maintenance
description: Use this skill when code changes may require README, API docs, architecture docs, runbooks, changelogs, or documentation verification.
---

## Workflow

1. Read `AGENTS.md`.
2. Read `docs/_meta/doc-index.yaml`.
3. Run `pnpm docs:impact`.
4. Classify impact as generated, semi-generated, curated, or no-doc-change.
5. Run generators for generated docs.
6. Update the smallest useful curated doc.
7. Use dummy values in examples.
8. Do not read `.env` or secret files.
9. Run `pnpm docs:verify`.
10. Report impacted docs, generators run, assumptions, and remaining doc debt.

## Gotchas

- Do not document environment variables by reading `.env`.
- Do not hand-edit generated sections.
- Do not write uncertain external behavior as fact.

