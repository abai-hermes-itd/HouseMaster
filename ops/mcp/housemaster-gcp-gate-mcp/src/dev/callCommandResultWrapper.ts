#!/usr/bin/env node
/**
 * HM-MCP-008 — local function-invocation self-test for
 * hm_command_result_wrapper. Imports and calls hmCommandResultWrapper
 * directly. Every input here is a hand-written fixture standing in for
 * "a result the caller already produced elsewhere" — this script never
 * runs the labeled commands itself.
 *
 * Usage: node_modules/.bin/tsx src/dev/callCommandResultWrapper.ts
 */
import { hmCommandResultWrapper } from "../tools/commandResultWrapper.js";

let failures = 0;

function check(label: string, condition: boolean, detail: string) {
  if (!condition) {
    failures++;
    console.error(`  MISMATCH (${label}): ${detail}`);
  }
}

// Case 1: short stdout, no scan requested.
{
  const result = hmCommandResultWrapper({
    command: "git status --short",
    exit_code: 0,
    stdout: "?? foo.txt\n",
  });
  console.log("short stdout, no scan:", JSON.stringify(result));
  check("short stdout, no scan", result.truncated === false, "expected truncated=false");
  check("short stdout, no scan", result.secret_scan === null, "expected secret_scan=null when not requested");
}

// Case 2: stdout longer than the truncation threshold.
{
  const longStdout = "x".repeat(600);
  const result = hmCommandResultWrapper({
    command: "git log --oneline -1000",
    exit_code: 0,
    stdout: longStdout,
  });
  console.log("long stdout, truncated:", JSON.stringify({ ...result, stdout_summary: `<${result.stdout_summary.length} chars>` }));
  check("long stdout", result.truncated === true, "expected truncated=true for 600-char stdout");
  check("long stdout", result.stdout_summary.length < longStdout.length, "expected stdout_summary shorter than raw stdout");
}

// Case 3: secret scan opted in, secret present.
{
  const result = hmCommandResultWrapper({
    command: "cat .env.example",
    exit_code: 0,
    stdout: "DATABASE_URL=postgresql://u:p@h:5432/db",
    run_secret_scan: true,
  });
  console.log("secret scan opt-in, secret present:", JSON.stringify(result));
  check("secret scan opt-in, secret present", result.secret_scan?.secret_detected === true, "expected secret_scan.secret_detected=true");
}

// Case 4: secret scan opted in, nothing secret-shaped present.
{
  const result = hmCommandResultWrapper({
    command: "git status --short",
    exit_code: 0,
    stdout: "?? foo.txt",
    run_secret_scan: true,
  });
  console.log("secret scan opt-in, none present:", JSON.stringify(result));
  check("secret scan opt-in, none present", result.secret_scan?.secret_detected === false, "expected secret_scan.secret_detected=false");
}

if (failures > 0) {
  console.error(`\nHM-MCP-008 self-test: FAIL (${failures} mismatch(es))`);
  process.exit(1);
}
console.log("\nHM-MCP-008 self-test: PASS");
