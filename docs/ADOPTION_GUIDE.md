# Adoption Guide

Use this guide when you want to install the whole Agent Harness Kit into another repository in one pass.

The adoption script is intentionally conservative:

- dry-run is the default
- existing files are backed up with `.bak`
- existing `package.json` is not overwritten
- harness package scripts are copied to `package.agent-harness-kit.json` when a target `package.json` already exists
- `node_modules`, `.git`, `.venv`, `.harness`, `dist`, and `coverage` are skipped

## From The Harness Kit Repository

Run a dry run first:

```bash no-run
pnpm adopt:dry -- --target ../your-repo
```

Install the files:

```bash no-run
pnpm adopt -- --target ../your-repo
```

Overwrite without `.bak` backups only when you have reviewed the diff and intentionally want replacement:

```bash no-run
pnpm adopt -- --target ../your-repo --force
```

## From The Target Repository

You can also run the script directly from a cloned harness kit path:

```bash no-run
node ../agent-harness-kit/scripts/adopt-harness.mjs --target . --write
```

## What Gets Copied

The script copies the full harness surface:

- Codex configuration: `.codex/**`
- Codex and shared skills: `.agents/**`
- Claude Code native files: `CLAUDE.md`, `.claude/**`
- APM package files: `apm.yml`, `.apm/**`
- CI and GitHub templates: `.github/**`
- scripts, harness rules, docs, plans, and review checklists

If the target has no `package.json`, the harness package file is copied as `package.json`. If the target already has one, the harness package file is copied as `package.agent-harness-kit.json`.

## Required Manual Merge

After copying, merge the useful package scripts into the target project's `package.json`.

Start with these scripts:

```json
{
  "scripts": {
    "verify:fast": "node scripts/verify-fast.mjs",
    "verify": "node scripts/verify.mjs",
    "docs:verify": "node scripts/docs/verify-docs.mjs",
    "harness:test": "python scripts/harness/run_rule_tests.py",
    "harness:diff-scope": "node scripts/harness/check-diff-scope.mjs",
    "uv:doctor": "node scripts/uv-doctor.mjs"
  }
}
```

For a real Node app, replace `scripts/noop-if-missing.mjs` fallbacks with the target project's lint, typecheck, unit, integration, and E2E commands.

## Post-Adoption Checklist

1. Review `.codex/config.toml` and adjust sandbox, approval, and MCP settings.
2. Review `.codex/agents/*.toml` and update any absolute skill paths if needed.
3. Review `.github/workflows/*.yml` and remove checks that do not fit the target repository yet.
4. Merge package scripts from `package.agent-harness-kit.json` when present.
5. Run dependency install in the target repository.
6. Run `node scripts/uv-doctor.mjs`.
7. Run `pnpm verify:fast`.
8. Run `pnpm docs:verify`.
9. Run `python scripts/harness/run_rule_tests.py` or `uv run python scripts/harness/run_rule_tests.py`.
10. Commit the harness adoption as one reviewable change.

## Rollback

If adoption creates backups, restore files by renaming `*.bak` back to their original names. Delete newly copied directories only after reviewing that they were created by the adoption run.

Do not use destructive broad deletes. Prefer a normal Git diff review and revert the adoption commit when possible.

## Recommended First Codex Prompt In The Target Repo

```txt
Read AGENTS.md and docs/ADOPTION_GUIDE.md.
Review this repository after harness adoption.
Do not edit files yet.
Report:
- package scripts that still need merging
- Codex agent TOML paths that need target-specific changes
- CI workflows that should stay disabled or adjusted
- first verification command to run
```
