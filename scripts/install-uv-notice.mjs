#!/usr/bin/env node
console.log(`uv installation requires running a downloaded installer.

Official install commands:

macOS/Linux:
  curl -LsSf https://astral.sh/uv/install.sh | sh

Windows PowerShell:
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

After installing, restart your shell and run:
  pnpm uv:doctor
`);

