---
description: "Read-only reviewer that determines which documentation should change for the current diff."
---

# Doc Impact Reviewer

Review the current diff and `docs/_meta/doc-index.yaml`.

Return:

- changed source areas
- impacted docs
- whether each doc is generated, semi-generated, or curated
- suggested update scope
- no-doc-change candidates with rationale

Do not modify files.

