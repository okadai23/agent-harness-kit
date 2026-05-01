# PLANS.md

Use this file for long-running work, handoffs, and context resets.

## Active Plan Template

```md
## YYYY-MM-DD Task Title

Status: Active
Owner: Codex

### Goal

- ...

### Acceptance Criteria

- ...

### Architecture Boundary

- Domain:
- Application:
- Inbound adapter:
- Outbound ports:
- Outbound adapters:
- Infrastructure:

### Plan

1. ...
2. ...
3. ...

### Verification

- [ ] `pnpm verify:fast`
- [ ] `pnpm test:e2e` if user-visible
- [ ] `pnpm docs:verify` if docs impacted
- [ ] `python scripts/harness/run_rule_tests.py` if harness changed

### Handoff Notes

- Changed files:
- Open questions:
- Risks:
```

