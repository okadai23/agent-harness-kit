#!/usr/bin/env python3
import subprocess
import sys
from pathlib import Path


def main() -> int:
    if not Path("scripts/verify-fast.mjs").exists():
        return 0

    proc = subprocess.run(
        ["node", "scripts/verify-fast.mjs"],
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        timeout=280,
    )

    if proc.returncode != 0:
        print(
            "Quality gate failed. Fix the failure, then rerun `pnpm verify:fast`.\n\n"
            f"Output tail:\n{proc.stdout[-6000:]}",
            file=sys.stderr,
        )
        return 2

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

