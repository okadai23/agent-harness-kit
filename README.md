# Agent Harness Kit

This workspace contains a portable coding-agent harness for safer prototyping and coding with Codex, Claude Code, and APM.

## What Is Included

- Recommended repository name: `agent-harness-kit`
- `AGENTS.md`: short persistent working agreements for Codex.
- `apm.yml` and `.apm/**`: APM package source for portable agent configuration.
- `code_review.md`: review checklist Codex can follow with `/review`-style tasks.
- `CLAUDE.md` and `.claude/**`: Claude Code native layer.
- `.codex/config.toml`: project-scoped model, sandbox, hooks, rules, and subagent defaults.
- `.codex/rules/default.rules`: command approval rules.
- `.codex/hooks/*`: prompt, command, edit, and stop-time safety checks.
- `.agents/skills/*`: reusable workflows for Clean TDD, Karpathy-style coding discipline, documentation, reviews, and failure-to-harness promotion.
- `.codex/agents/*`: focused custom subagents.
- `scripts/*`: verification, architecture, docs, secret scanning, and harness support scripts.
- `harness/rules.yaml`: source-of-truth rule ledger for recurring failures and deterministic checks.

## GitHub Repository

Recommended repository name:

```txt
agent-harness-kit
```

GitHub setup guidance lives in [docs/GITHUB_REPOSITORY.md](docs/GITHUB_REPOSITORY.md).

CI workflows include:

- `script-quality`: JavaScript, JSON, Python, APM, Claude native checks
- `quality`: full harness verification
- `docs-quality`: documentation impact and docs verification
- `apm-quality`: APM compile validation and audit

## GitHub Issue And PR Automation

Agent maintenance fixes can be published as a GitHub Issue and Pull Request.

Dry-run first:

```bash no-run
pnpm github:report
pnpm github:issue-pr:dry -- --title "Fix agent harness issue" --body-file .agent-maintenance/report.md
```

After explicit approval:

```bash no-run
pnpm github:issue-pr -- --title "Fix agent harness issue" --body-file .agent-maintenance/report.md
```

There is also a manual workflow:

```txt
.github/workflows/agent-maintenance-pr.yml
```

See [docs/GITHUB_AUTOMATION.md](docs/GITHUB_AUTOMATION.md).

## APM

This harness can be managed with Microsoft APM:

```bash no-run
apm install
apm compile --target codex
apm audit --ci
```

The portable source package lives in `.apm/**`; native Codex files remain committed so the project works immediately after clone. See [docs/APM.md](docs/APM.md).

## Claude Code

Claude Code can use the same harness through:

```txt
CLAUDE.md
.claude/settings.json
.claude/agents/*.md
.claude/skills/*/SKILL.md
.claude/commands/*.md
```

See [docs/CLAUDE_CODE.md](docs/CLAUDE_CODE.md).

## First Use

1. Open this folder as a trusted Codex project so `.codex/` is loaded.
2. If you copy this template elsewhere, update absolute skill paths in `.codex/agents/*.toml`.
3. For Node projects, replace `scripts/noop-if-missing.mjs` fallbacks with real lint, typecheck, and test commands.
4. Run:

```bash no-run
pnpm verify:fast
pnpm docs:verify
python scripts/harness/run_rule_tests.py
```

The standard `pnpm` scripts use Node entrypoints and work on Windows, Linux, and macOS. Shell-specific wrappers remain available as `*:ps` and `*:sh` aliases for manual use.

## uv

This harness supports Astral `uv` for Python execution. Python scripts prefer `uv run python ...` when `uv` is installed and fall back to system Python otherwise.

Install guidance:

```bash no-run
pnpm uv:install
```

Health check:

```bash no-run
pnpm uv:doctor
```

Use `uv run python` for repository scripts:

```bash no-run
uv run python scripts/harness/run_rule_tests.py
```

Use `uvx` for external Python CLI tools:

```bash no-run
uvx ruff --version
```

See [docs/UV.md](docs/UV.md).

## Recommended Prompts

```txt
$clean-tdd-prototype と $doc-maintenance を使って実装してください。

機能:
- ...

制約:
- Clean Architectureを守る
- E2Eまたはapplication-level testを先に書く
- .envやsecretsは読まない
- 外部ネットワークは使わない

完了条件:
- pnpm verify
- pnpm docs:verify
- pnpm harness:diff-scope
- 変更ファイル、テスト、残リスクを報告
```

```txt
このPRをレビューしてください。
pr_explorer, vibe_reviewer, bug_hunter, architecture_reviewer, e2e_reviewer, security_reviewer, doc_impact_reviewer をread-onlyでspawnし、main agentが code_review.md に沿って結果を統合してください。
ファイルは変更しないでください。
```

```txt
$codex-task-shaping を使って、この曖昧な機能案を Goal / Context / Constraints / Done when / Verification に変換してください。
実装はまだしないでください。
```

```txt
$research-plan-execute-review-ship を使って、この機能を段階的に進めてください。
各フェーズに検証コマンドを付け、必要なら staff_plan_reviewer にread-onlyで計画レビューさせてください。
```

## Karpathy-Style Coding Discipline

This harness includes `.agents/skills/karpathy-guidelines/SKILL.md`, adapted for Codex.
Use it to keep agent work grounded in four habits:

- surface assumptions before coding
- choose the simplest sufficient implementation
- keep diffs surgical
- define success criteria and verify them

The deterministic companion is `node scripts/harness/check-diff-scope.mjs`, which warns when a diff is broad enough to deserve extra scrutiny.

## Cross-Platform Execution

Use the default package scripts on every OS:

```bash no-run
pnpm verify:fast
pnpm verify
pnpm docs:verify
```

These call Node `.mjs` entrypoints internally. The `.sh` and `.ps1` files are compatibility wrappers, not the canonical path.

## Profiles

Useful project profiles:

- `conservative`: read-only, high-friction safety for audits
- `development`: workspace-write with on-request approvals
- `prototype`: workspace-write with untrusted approval behavior
- `review`: read-only for review tasks
- `ci`: read-only and non-interactive
- `trusted`: explicit opt-in only; still workspace-scoped
