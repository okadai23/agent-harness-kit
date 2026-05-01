#!/usr/bin/env python3
import ast
import sys
from pathlib import Path


SKIP_DIRS = {".git", "node_modules", "apm_modules", ".venv", "dist", "build", "coverage", ".harness", "__pycache__"}


def should_skip(path: Path) -> bool:
    return bool(set(path.parts) & SKIP_DIRS)


def main() -> int:
    failures: list[str] = []
    files = [p for p in Path(".").rglob("*.py") if not should_skip(p)]
    for path in files:
        try:
            text = path.read_text(encoding="utf-8")
            ast.parse(text, filename=str(path))
        except SyntaxError as exc:
            failures.append(f"{path}:{exc.lineno}:{exc.offset}: {exc.msg}")
        except UnicodeDecodeError as exc:
            failures.append(f"{path}: unable to decode as UTF-8: {exc}")

    if failures:
        print("Python syntax check failed:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print(f"Python syntax check passed: {len(files)} files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

