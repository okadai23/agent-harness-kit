---
applyTo: "**"
---

# Security And Privacy Guardrails

- Do not read `.env`, `.env.*`, private keys, credential stores, `.ssh/`, `.aws/`, or `secrets/`.
- Do not introduce real secrets in code, docs, tests, snapshots, fixtures, or logs.
- Use dummy values for credentials and environment examples.
- Ask before adding external network access, persistent credentials, publishing, deploying, or changing permissions.
- Prefer sandbox, rules, hooks, tests, and CI over prompt-only reminders.
- Use APM audit and lock files to review agent configuration changes like infrastructure changes.

