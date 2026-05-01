#!/usr/bin/env python3
import json
import subprocess
import sys
from pathlib import Path


CHECKED_SUFFIXES = {".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".py", ".md", ".json", ".yaml", ".yml"}


def touched_paths(payload: dict) -> list[str]:
    tool_input = payload.get("tool_input") or {}
    if not isinstance(tool_input, dict):
        return []
    paths = []
    for key in ("file_path", "path"):
        value = tool_input.get(key)
        if isinstance(value, str):
            paths.append(value)
    command = str(tool_input.get("command") or "")
    for marker in ("*** Add File:", "*** Update File:", "*** Delete File:"):
        for line in command.splitlines():
            if line.startswith(marker):
                paths.append(line[len(marker):].strip())
    return paths


def remove_stamp() -> None:
    stamp = Path(".harness/last_verify_passed")
    try:
        if stamp.exists():
            stamp.unlink()
    except OSError:
        pass


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except json.JSONDecodeError:
        return 0

    remove_stamp()
    paths = [p for p in touched_paths(payload) if Path(p).suffix in CHECKED_SUFFIXES]
    failures = []

    for file_path in paths:
        proc = subprocess.run(
            [sys.executable, "scripts/harness/check_changed_file.py", file_path],
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            timeout=20,
        )
        if proc.returncode != 0:
            failures.append(f"{file_path}\n{proc.stdout.strip()}")

    if failures:
        print("Edited file policy failed:\n\n" + "\n\n".join(failures), file=sys.stderr)
        return 2

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

