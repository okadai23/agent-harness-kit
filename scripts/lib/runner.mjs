import childProcess from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const isWindows = process.platform === "win32";

export function run(command, args = [], options = {}) {
  const result = childProcess.spawnSync(command, args, {
    cwd: options.cwd ?? process.cwd(),
    env: options.env ?? process.env,
    stdio: options.stdio ?? "inherit",
    shell: options.shell ?? isWindows,
    encoding: "utf8"
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const printable = [command, ...args].join(" ");
    throw new Error(`Command failed (${result.status}): ${printable}`);
  }

  return result;
}

export function tryRun(command, args = [], options = {}) {
  const result = childProcess.spawnSync(command, args, {
    cwd: options.cwd ?? process.cwd(),
    env: options.env ?? process.env,
    stdio: options.stdio ?? "ignore",
    shell: options.shell ?? isWindows,
    encoding: "utf8"
  });

  return !result.error && result.status === 0;
}

export function hasCommand(command, probeArgs = ["--version"]) {
  return tryRun(command, probeArgs);
}

export function hasPnpm() {
  return hasCommand("pnpm", ["--version"]);
}

export function hasUv() {
  return hasCommand("uv", ["--version"]);
}

export function hasUvx() {
  return hasCommand("uvx", ["--version"]);
}

export function runPnpmScript(scriptName, fallback = null) {
  if (hasPnpm()) {
    return run("pnpm", [scriptName]);
  }

  if (fallback) {
    return fallback();
  }

  return runNoop(scriptName);
}

export function runNoop(name) {
  return runNodeScript("scripts/noop-if-missing.mjs", [name]);
}

export function runNodeScript(scriptPath, args = []) {
  return run(process.execPath, [scriptPath, ...args], { shell: false });
}

export function findPython() {
  if (hasUv()) {
    return { command: "uv", argsPrefix: ["run", "python"] };
  }

  const candidates = isWindows
    ? [
        { command: "py", argsPrefix: ["-3"] },
        { command: "python", argsPrefix: [] },
        { command: "python3", argsPrefix: [] }
      ]
    : [
        { command: "python3", argsPrefix: [] },
        { command: "python", argsPrefix: [] }
      ];

  for (const candidate of candidates) {
    if (tryRun(candidate.command, [...candidate.argsPrefix, "-c", "import sys"], { shell: isWindows })) {
      return candidate;
    }
  }

  throw new Error("Python 3 was not found. Install Python or adjust scripts/lib/runner.mjs.");
}

export function runPythonScript(scriptPath, args = []) {
  const python = findPython();
  return run(python.command, [...python.argsPrefix, scriptPath, ...args], { shell: isWindows });
}

export function runUvxTool(toolAndArgs = []) {
  if (!toolAndArgs.length) {
    throw new Error("runUvxTool requires a tool name");
  }
  if (!hasUvx()) {
    throw new Error("uvx was not found. Install uv from https://docs.astral.sh/uv/ first.");
  }
  return run("uvx", toolAndArgs, { shell: isWindows });
}

export function writeText(filePath, text) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, text, "utf8");
}
