# GitHub Issue And PR Automation

This harness can publish agent maintenance fixes to GitHub as an Issue and Pull Request.

## Safety Model

Creating GitHub Issues and Pull Requests is external communication.

Therefore:

- local automation is dry-run by default
- `--confirm` is required to create an Issue, branch, commit, push, and PR
- workflow automation only runs from `workflow_dispatch`
- the PR is never merged automatically
- generated reports are ignored by git

## Local Workflow

1. Let the agent make the maintenance fix locally.
2. Verify the change:

```bash no-run
pnpm ci:scripts
pnpm ci:harness:uv
pnpm docs:verify
pnpm verify:fast
```

3. Generate a report:

```bash no-run
pnpm github:report
```

4. Dry-run publication:

```bash no-run
pnpm github:issue-pr:dry -- --title "Fix agent harness issue" --body-file .agent-maintenance/report.md
```

5. After explicit human approval, publish:

```bash no-run
pnpm github:issue-pr -- --title "Fix agent harness issue" --body-file .agent-maintenance/report.md
```

The script creates:

- GitHub Issue
- branch
- commit
- pushed branch
- Pull Request linked to the issue

## Requirements

- `git`
- GitHub CLI `gh`
- authenticated `gh` session or `GH_TOKEN`
- a git repository with remote `origin`

## GitHub Actions Workflow

Manual workflow:

```txt
.github/workflows/agent-maintenance-pr.yml
```

It runs:

- `pnpm docs:verify`
- `pnpm apm:check`
- `pnpm claude:check`
- maintenance report generation
- issue and PR creation if generated changes exist

The workflow requires:

```yaml
permissions:
  contents: write
  issues: write
  pull-requests: write
```

## Skill

Use:

```txt
$github-issue-pr-automation
```

The skill requires dry-run first and explicit confirmation before `--confirm`.

## Guardrails

- Do not publish secrets, tokens, private logs, or unrelated diffs.
- Do not merge automatically.
- Do not force push.
- Do not read credential files; use `GH_TOKEN` or authenticated `gh`.

