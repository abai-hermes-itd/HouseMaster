import { hmSecretScanSummary, type SecretScanSummaryResult } from "./secretScanSummary.js";

const MAX_STDOUT_SUMMARY_CHARS = 500;

export interface CommandResultWrapperInput {
  command: string;
  exit_code: number;
  stdout: string;
  run_secret_scan?: boolean;
}

export interface CommandResultWrapperResult {
  command: string;
  exit_code: number;
  stdout_summary: string;
  secret_scan: SecretScanSummaryResult | null;
  truncated: boolean;
}

/**
 * hm_command_result_wrapper (HM-MCP-008) — normalizes a result the
 * caller already produced elsewhere (by hand, or via an already-approved
 * execution gate) into one structured JSON shape. Never runs `command`
 * itself — it is a label only. Optionally runs hm_secret_scan_summary
 * against stdout when the caller opts in via run_secret_scan.
 *
 * Known limitation: stdout_summary is a plain truncation (first
 * MAX_STDOUT_SUMMARY_CHARS characters), not a semantic summary like the
 * v0.2 concept doc's illustrative "10 untracked, 0 staged, 0 modified"
 * example. Producing that would mean parsing specific command output
 * shapes (e.g. `git status --short` porcelain format), which this
 * caller-supplied-input-only, no-command-execution tool has no way to
 * know it's looking at in general.
 */
export function hmCommandResultWrapper(
  input: CommandResultWrapperInput,
): CommandResultWrapperResult {
  const { command, exit_code, stdout, run_secret_scan } = input;
  const truncated = stdout.length > MAX_STDOUT_SUMMARY_CHARS;
  const stdout_summary = truncated
    ? `${stdout.slice(0, MAX_STDOUT_SUMMARY_CHARS)}…`
    : stdout;

  return {
    command,
    exit_code,
    stdout_summary,
    secret_scan: run_secret_scan ? hmSecretScanSummary(stdout) : null,
    truncated,
  };
}
