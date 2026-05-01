---
owner: platform
review_cycle: monthly
last_reviewed: 2026-04-29
stale_after_days: 60
source_of_truth:
  - package.json
  - scripts/**
---

# Runbook

## Verify Locally

```bash no-run
pnpm verify
```

Equivalent direct entrypoint:

```bash no-run
node scripts/verify.mjs
```

## Fast Check

```bash no-run
pnpm verify:fast
```

Equivalent direct entrypoint:

```bash no-run
node scripts/verify-fast.mjs
```

## Documentation Check

```bash no-run
pnpm docs:verify
```

Equivalent direct entrypoint:

```bash no-run
node scripts/docs/verify-docs.mjs
```
