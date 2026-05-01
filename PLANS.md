# PLANS.md

Use this file for long-running work, handoffs, and context resets.

## 2026-05-01 Python Project Template Settings Import

Status: Completed
Owner: Codex

### Goal

- Add a reusable Python project template under `templates/python-project/` using only general-purpose quality and developer-experience settings from `/home/okamoto-daisuke/develop/clean-python-interfaces`.
- Keep this repository's root harness, Node, Playwright, and verification flow unchanged.

### Acceptance Criteria

- Template includes generalized `pyproject.toml`, `noxfile.py`, Python helper settings, and minimal `src/your_package` plus `tests` sample files.
- Source project names, package names, paths, and domain dependencies are not carried into the template.
- `docs/python-project-template.md` explains copy, rename, commands, and tool roles.

### Architecture Boundary

- Domain: none changed.
- Application: none changed.
- Inbound adapter: none changed.
- Outbound ports: none changed.
- Outbound adapters: none changed.
- Infrastructure: template files only, not root runtime wiring.

### Plan

1. Review source settings and select portable Python project configuration.
2. Create `templates/python-project/` with generalized settings and minimal sample package.
3. Add concise usage documentation.
4. Verify template commands where possible and run repo docs/diff checks.

### Verification

- [x] Check template for leaked `clean_interfaces` / `clean-interfaces` source names.
- [x] `python -m pip install -e .` inside `templates/python-project` attempted; blocked because `python` is not on PATH and the `uv` Python venv initially had no `pip`.
- [x] `uv pip install -e ".[dev]"` inside `templates/python-project`
- [x] `nox -s lint`, `nox -s typecheck`, `nox -s tests` inside `templates/python-project`
- [x] `pnpm docs:verify`
- [x] `pnpm verify:fast`
- [x] `pnpm harness:diff-scope`

### Handoff Notes

- Changed files: `templates/python-project/**`, `docs/python-project-template.md`, `PLANS.md`, generated `docs/operations/commands.md`.
- Open questions: none.
- Risks: local environments without `python` on PATH should use `python3`, `uv run python`, or install/activate Python before using the pip command.

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
