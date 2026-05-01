# uv Integration

This harness supports Astral `uv` for Python execution.

Official docs:

- <https://docs.astral.sh/uv/>
- <https://docs.astral.sh/uv/concepts/tools/>
- <https://docs.astral.sh/uv/reference/cli/>

## Install uv

macOS/Linux:

```bash no-run
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Windows PowerShell:

```powershell no-run
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

Installing uv runs a downloaded installer, so let a human approve and perform it in environments that require confirmation.

## Check uv

```bash no-run
pnpm uv:doctor
```

This checks:

- `uv --version`
- `uvx --version`
- `uv run python --version`
- `uv run python scripts/harness/run_rule_tests.py`

## How This Harness Uses uv

The Node runner in `scripts/lib/runner.mjs` prefers:

```bash no-run
uv run python <script.py>
```

If `uv` is not installed, it falls back to:

- Windows: `py -3`, `python`, `python3`
- Linux/macOS: `python3`, `python`

## uvx

`uvx` is an alias for `uv tool run`.

Use it for external Python CLI tools published as packages:

```bash no-run
uvx ruff --version
uvx pycowsay "hello"
```

Do not use `uvx` for local repository scripts unless this harness is later packaged with console entry points. For local scripts, use:

```bash no-run
uv run python scripts/harness/run_rule_tests.py
```

