#!/usr/bin/env python3
import json
import re
import sys


BLOCKED = [
    (re.compile(r"\bsudo\b", re.I), "sudo is not allowed"),
    (re.compile(r"\brm\s+-rf\s+(/|\$HOME|~|\.|\*)", re.I), "destructive rm -rf is not allowed"),
    (re.compile(r"\bchmod\s+-R\s+777\b", re.I), "chmod -R 777 is not allowed"),
    (re.compile(r"\bchown\s+-R\b", re.I), "recursive chown is not allowed"),
    (re.compile(r"\bgit\s+push\s+--force\b", re.I), "force push is not allowed"),
    (re.compile(r"\b(npm|pnpm|yarn)\s+publish\b", re.I), "package publish is not allowed"),
    (re.compile(r"\b(curl|wget)\b.*\|\s*(sh|bash|pwsh|powershell)\b", re.I), "curl/wget piping to shell is not allowed"),
    (re.compile(r"\b(ssh|scp|rsync)\b", re.I), "remote shell/file transfer is not allowed"),
    (re.compile(r"\b(aws|gcloud|az)\b", re.I), "cloud CLI access is not allowed from Claude Code in this harness"),
]

SECRET_READS = [
    (re.compile(r"(^|\s)(cat|type|less|more|tail|head|sed|awk|grep|rg|Get-Content)\s+.*\.env(\s|$)", re.I), "attempt to read .env"),
    (re.compile(r"(^|\s)(cat|type|less|more|tail|head|sed|awk|grep|rg|Get-Content)\s+.*(id_rsa|id_ed25519|\.pem)(\s|$)", re.I), "attempt to read private key material"),
    (re.compile(r"(^|\s)(cat|type|less|more|tail|head|sed|awk|grep|rg|Get-Content)\s+.*(\.ssh|\.aws|secrets[\\/])", re.I), "attempt to read credential store"),
]


def command_from(payload: dict) -> str:
    tool_input = payload.get("tool_input") or {}
    if isinstance(tool_input, dict):
        return str(tool_input.get("command") or tool_input.get("cmd") or tool_input)
    return str(tool_input)


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except json.JSONDecodeError:
        return 0

    command = command_from(payload)
    for pattern, reason in BLOCKED + SECRET_READS:
        if pattern.search(command):
            print(f"Claude Code hook blocked tool use: {reason}\nCommand: {command}", file=sys.stderr)
            return 2

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

