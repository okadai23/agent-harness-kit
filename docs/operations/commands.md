# Commands

<!-- GENERATED:package-commands:start -->
| Script | Command |
| --- | --- |
| `adopt` | `node scripts/adopt-harness.mjs --write` |
| `adopt:dry` | `node scripts/adopt-harness.mjs` |
| `apm:audit` | `apm audit --ci` |
| `apm:check` | `node scripts/apm/check-local-package.mjs` |
| `apm:compile` | `apm compile --target codex` |
| `apm:compile:dry` | `apm compile --target codex --dry-run --verbose` |
| `apm:install` | `apm install` |
| `apm:pack` | `apm pack --target codex --archive` |
| `apm:validate` | `apm compile --target codex --validate --local-only` |
| `arch` | `node scripts/check-boundaries.mjs` |
| `ci:harness` | `node scripts/apm/check-local-package.mjs && node scripts/claude/check-native.mjs && python scripts/harness/run_rule_tests.py` |
| `ci:harness:uv` | `node scripts/apm/check-local-package.mjs && node scripts/claude/check-native.mjs && uv run python scripts/harness/run_rule_tests.py` |
| `ci:scripts` | `node scripts/check-js-syntax.mjs && node scripts/check-json.mjs && uv run python scripts/check-python-syntax.py` |
| `claude:check` | `node scripts/claude/check-native.mjs` |
| `claude:sync` | `node scripts/claude/sync-native.mjs` |
| `docs:commands` | `node scripts/docs/generate-command-docs.mjs` |
| `docs:env` | `node scripts/docs/generate-env-docs.mjs` |
| `docs:generate` | `node scripts/docs/generate-docs.mjs` |
| `docs:impact` | `node scripts/docs/doc-impact.mjs` |
| `docs:links` | `node scripts/docs/check-doc-links.mjs` |
| `docs:secrets` | `python scripts/docs/check-doc-secrets.py` |
| `docs:snippets` | `node scripts/docs/check-doc-snippets.mjs` |
| `docs:stale` | `node scripts/docs/check-doc-staleness.mjs` |
| `docs:usecases` | `node scripts/docs/generate-usecase-docs.mjs` |
| `docs:verify` | `node scripts/docs/verify-docs.mjs` |
| `docs:verify:ps` | `powershell -ExecutionPolicy Bypass -File scripts/docs/verify-docs.ps1` |
| `docs:verify:sh` | `bash scripts/docs/verify-docs.sh` |
| `github:issue-pr` | `node scripts/github/create-issue-pr.mjs --confirm` |
| `github:issue-pr:dry` | `node scripts/github/create-issue-pr.mjs` |
| `github:report` | `node scripts/github/agent-maintenance-report.mjs` |
| `harness:diff-scope` | `node scripts/harness/check-diff-scope.mjs` |
| `harness:promote` | `python scripts/harness/promote_failures.py` |
| `harness:test` | `python scripts/harness/run_rule_tests.py` |
| `harness:test:uv` | `uv run python scripts/harness/run_rule_tests.py` |
| `lint` | `node scripts/noop-if-missing.mjs lint` |
| `lint:python` | `python scripts/check-python-syntax.py` |
| `lint:python:uv` | `uv run python scripts/check-python-syntax.py` |
| `lint:scripts` | `node scripts/check-js-syntax.mjs && node scripts/check-json.mjs` |
| `secrets` | `python scripts/secret-scan.py` |
| `test:e2e` | `node scripts/noop-if-missing.mjs test:e2e` |
| `test:integration` | `node scripts/noop-if-missing.mjs test:integration` |
| `test:unit` | `node scripts/noop-if-missing.mjs test:unit` |
| `typecheck` | `node scripts/noop-if-missing.mjs typecheck` |
| `uv:doctor` | `node scripts/uv-doctor.mjs` |
| `uv:install` | `node scripts/install-uv-notice.mjs` |
| `uv:python` | `uv run python` |
| `uvx:python` | `uvx python` |
| `uvx:ruff` | `uvx ruff --version` |
| `verify` | `node scripts/verify.mjs` |
| `verify:e2e` | `node scripts/verify-e2e.mjs` |
| `verify:e2e:sh` | `bash scripts/verify-e2e.sh` |
| `verify:fast` | `node scripts/verify-fast.mjs` |
| `verify:fast:ps` | `powershell -ExecutionPolicy Bypass -File scripts/verify-fast.ps1` |
| `verify:fast:sh` | `bash scripts/verify-fast.sh` |
| `verify:ps` | `powershell -ExecutionPolicy Bypass -File scripts/verify.ps1` |
| `verify:sh` | `bash scripts/verify.sh` |
| `verify:fast:ps` | `powershell -ExecutionPolicy Bypass -File scripts/verify-fast.ps1` |
| `verify:ps` | `powershell -ExecutionPolicy Bypass -File scripts/verify.ps1` |
<!-- GENERATED:package-commands:end -->
