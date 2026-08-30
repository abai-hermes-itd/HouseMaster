#!/usr/bin/env node
// Gate Runner v0.1 (draft-only) for the HouseMaster approval-pack workflow.
//
// A single local CLI dispatcher that wraps the three existing standalone
// tools (suggest-gate-id.mjs, fill-gate-template.mjs, validate-gate-request.mjs)
// under one entry point, per sprints/04_RUNBOOKS/GATE_RUNNER_SPEC_V0.md.
//
// This file does not reimplement or modify any of those tools' logic. Every
// mode invokes the existing script as a child process and preserves its
// stdout, stderr, and exit code exactly. This file never runs `git add`,
// `git commit`, `git push`, `terraform`, a deploy command, a DB/Prisma
// command, or accesses a Secret Manager payload — it only generates and/or
// validates draft approval requests. A generated request still requires
// explicit human approval before anything in it is executed, and commit and
// push remain two separate gates (see GATE_RUNNER_SPEC_V0.md §5).
//
// Usage:
//   node gate-runner.mjs suggest-id [--list | --prefix <ID_PREFIX>] [--dirs ...]
//   node gate-runner.mjs fill --template <COMMIT_GATE|PUSH_GATE> [flags...]
//   node gate-runner.mjs validate --template <template-id> [file]
//   node gate-runner.mjs draft-commit-gate --what <...> --target <...> --commit-message <...>
//   node gate-runner.mjs draft-push-gate --what <...>
//   node gate-runner.mjs closeout-draft   (explicitly unsupported in v0.1 — refuses)
//
// Exit codes: whatever the wrapped tool(s) returned. For composite modes
// (draft-commit-gate / draft-push-gate), if the `fill` stage refuses (exit 2),
// that stage's exit code is returned immediately and `validate` never runs.
// closeout-draft and unknown modes/usage errors exit 2, same convention as
// the wrapped tools.

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SUGGEST_ID_TOOL = join(__dirname, "suggest-gate-id.mjs");
const FILL_TOOL = join(__dirname, "fill-gate-template.mjs");
const VALIDATE_TOOL = join(__dirname, "validate-gate-request.mjs");

const SUPPORTED_MODES = [
  "suggest-id",
  "fill",
  "validate",
  "draft-commit-gate",
  "draft-push-gate",
];
const UNSUPPORTED_MODES = ["closeout-draft"];

function usageAndExit(code) {
  console.error(
    "Usage: node gate-runner.mjs <mode> [args...]\n\n" +
      "Supported modes (v0.1, all draft-only):\n" +
      "  suggest-id          -> wraps suggest-gate-id.mjs\n" +
      "  fill                -> wraps fill-gate-template.mjs\n" +
      "  validate            -> wraps validate-gate-request.mjs\n" +
      "  draft-commit-gate   -> fill --template COMMIT_GATE, then validate --template commit\n" +
      "  draft-push-gate     -> fill --template PUSH_GATE, then validate --template push\n\n" +
      "Not supported in v0.1 (refuses): closeout-draft\n\n" +
      "This dispatcher never stages, commits, pushes, deploys, or runs terraform/DB/Prisma/Secret\n" +
      "Manager commands. It only generates and/or validates draft approval requests — see\n" +
      "sprints/04_RUNBOOKS/GATE_RUNNER_SPEC_V0.md."
  );
  process.exit(code);
}

// Runs a tool as a child process with stdio fully inherited — the child's
// stdout/stderr/stdin and exit code pass through completely unmodified. Used
// for the direct passthrough modes, where no intermediate result needs to be
// captured or composed.
function runInherited(toolPath, args) {
  const result = spawnSync(process.execPath, [toolPath, ...args], { stdio: "inherit" });
  process.exit(result.status ?? 1);
}

// Runs a tool as a child process, inheriting stderr (so refusals are visible
// immediately) but capturing stdout so the caller can print it and/or pipe it
// into a second tool. Returns { status, stdout }.
function runCaptured(toolPath, args) {
  const result = spawnSync(process.execPath, [toolPath, ...args], {
    stdio: ["inherit", "pipe", "inherit"],
    encoding: "utf8",
  });
  return { status: result.status ?? 1, stdout: result.stdout ?? "" };
}

// Runs a tool as a child process, feeding `input` as its stdin, inheriting
// stdout/stderr directly (byte-exact, no re-encoding). Returns exit status.
function runWithStdin(toolPath, args, input) {
  const result = spawnSync(process.execPath, [toolPath, ...args], {
    input,
    stdio: ["pipe", "inherit", "inherit"],
    encoding: "utf8",
  });
  return result.status ?? 1;
}

function draftGate(templateId, validateId, args) {
  if (args.includes("--template")) {
    console.error(
      `Refused: --template is implied by this mode (${templateId}) — do not pass it explicitly.`
    );
    process.exit(2);
  }

  console.error(`--- gate-runner: fill (template ${templateId}) ---`);
  const fillResult = runCaptured(FILL_TOOL, ["--template", templateId, ...args]);
  if (fillResult.status !== 0) {
    console.error(`--- gate-runner: fill refused (exit ${fillResult.status}) — stopping before validate ---`);
    process.exit(fillResult.status);
  }
  process.stdout.write(fillResult.stdout);

  console.error(`--- gate-runner: validate (template ${validateId}) ---`);
  const validateStatus = runWithStdin(VALIDATE_TOOL, ["--template", validateId], fillResult.stdout);
  process.exit(validateStatus);
}

function main() {
  const [mode, ...rest] = process.argv.slice(2);

  if (!mode || mode === "--help" || mode === "-h") usageAndExit(mode ? 0 : 2);

  if (UNSUPPORTED_MODES.includes(mode)) {
    console.error(
      `Refused: mode "${mode}" is not supported in Gate Runner v0.1 (see GATE_RUNNER_SPEC_V0.md §4.6 — ` +
        "no existing tool fills the closure-record template yet). Use the templates under " +
        "sprints/04_RUNBOOKS/ directly for this gate type."
    );
    process.exit(2);
  }

  if (!SUPPORTED_MODES.includes(mode)) {
    console.error(`Refused: unknown mode "${mode}". Supported: ${SUPPORTED_MODES.join(", ")}`);
    usageAndExit(2);
  }

  switch (mode) {
    case "suggest-id":
      runInherited(SUGGEST_ID_TOOL, rest);
      break;
    case "fill":
      runInherited(FILL_TOOL, rest);
      break;
    case "validate":
      runInherited(VALIDATE_TOOL, rest);
      break;
    case "draft-commit-gate":
      draftGate("COMMIT_GATE", "commit", rest);
      break;
    case "draft-push-gate":
      draftGate("PUSH_GATE", "push", rest);
      break;
  }
}

main();
