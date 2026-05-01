# Troubleshooting

## Codex Does Not Load Project Settings

- Confirm the project is trusted in Codex.
- Restart the Codex session after editing `.codex/config.toml`, `.codex/hooks.json`, or `.codex/rules/**`.
- Run Codex from the repository root when validating this template.

## Verification Commands Are No-Op

This template starts with placeholder package scripts. Replace `scripts/noop-if-missing.mjs` usage in `package.json` after scaffolding a real app.

## Shell Compatibility

The default package scripts are cross-platform Node entrypoints:

- `node scripts/verify-fast.mjs`
- `node scripts/verify.mjs`
- `node scripts/docs/verify-docs.mjs`

The `.sh` and `.ps1` files are thin wrappers for manual use. Keep Codex hooks and CI pointed at the Node entrypoints unless a project has a strong reason to do otherwise.

## uv Is Missing

Run:

```bash no-run
pnpm uv:install
```

Then restart the shell and run:

```bash no-run
pnpm uv:doctor
```

The harness still falls back to system Python when `uv` is not installed.
