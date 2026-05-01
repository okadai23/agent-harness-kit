# Dependency Rules

The default structural check is implemented in `scripts/check-boundaries.mjs`.

Initial rules:

- Domain cannot depend on application, adapters, or infrastructure.
- Application cannot depend on adapters or infrastructure.
- Adapters cannot depend on infrastructure.

If the target framework needs a different layering model, update both this document and `scripts/check-boundaries.mjs` in the same change.

