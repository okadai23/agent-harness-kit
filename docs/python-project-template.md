# Python Project Template

`templates/python-project/` is a copy-ready Python project template derived from
the portable settings in `/home/okamoto-daisuke/develop/clean-python-interfaces`.
It keeps this harness repository's root Node, Playwright, and verification flow
unchanged.

## Copy The Template

Copy the directory into a new project location:

```sh
cp -R templates/python-project ../my-python-project
cd ../my-python-project
```

Then install the editable package and development tools:

```sh
python -m pip install -e ".[dev]"
```

If you use `uv`, this template also works with:

```sh
uv sync --extra dev
```

## Rename Before Use

Replace the placeholder values before adding application code:

- `your-project` in `pyproject.toml`
- `your_package` in `pyproject.toml`, `noxfile.py`, `src/your_package/`, and tests
- project `description`, `authors`, and `license`
- `README.md` title and description

Keep package names import-safe, for example `my_service` for Python imports and
`my-service` for the distribution name.

## Recommended Commands

Run checks from inside the copied project:

```sh
nox -s lint
nox -s typecheck
nox -s tests
nox -s coverage
nox -s security
```

Use `nox -s format_code` when you want Ruff to rewrite formatting.

## Included Quality Tools

- Ruff: linting and formatting with a strict default rule set.
- Pyright: strict static type checking for `src`, `tests`, and `noxfile.py`.
- pytest: test discovery under `tests`.
- coverage.py / pytest-cov: branch coverage with a default 90 percent threshold.
- nox: repeatable local and CI sessions.
- pip-audit: dependency vulnerability checks.
- pre-commit: local hooks that call the same nox sessions.

## Notes

The template intentionally excludes source-project domain code, production
dependencies, deployment configuration, generated documentation output, and
secret-bearing files. Add documentation tooling only after choosing a docs stack,
then wire the `docs` nox session to that command.
