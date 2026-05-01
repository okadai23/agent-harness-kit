---
applyTo: "**"
---

# Review Instructions

When reviewing code:

- Lead with actionable findings ordered by severity.
- Focus on correctness, security, data loss, test gaps, architecture boundaries, flaky E2E, and documentation drift.
- Avoid style-only comments unless they hide real risk.
- Use concrete paths and tight line references when possible.
- If no findings exist, say so and mention residual risk or checks not run.

For larger reviews, use the subagent review team:

- `pr_explorer`
- `vibe_reviewer`
- `bug_hunter`
- `security_reviewer`
- `architecture_reviewer`
- `e2e_reviewer`
- `doc_impact_reviewer`

