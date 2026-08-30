import { containsSecretLookingContent } from "../lib/secretPatterns.js";

export interface SecretScanSummaryResult {
  secret_detected: boolean;
  secret_printed: boolean;
  action: "stop_and_redact" | "none";
}

/**
 * hm_secret_scan_summary (HM-MCP-007) — runs the same shared
 * secret-pattern module hm_diff_summary uses (../lib/secretPatterns.js)
 * against an explicit, caller-supplied block of text. Never reads a
 * file path itself, never reads .env, never returns the matched
 * substring — only a boolean verdict and an action.
 *
 * Known limitation: secretPatterns.ts exposes a single combined
 * boolean check (containsSecretLookingContent), not per-pattern
 * labels, so this does not report `matched_pattern_types` as the
 * v0.2 concept doc's illustrative example shows. Adding that would
 * mean either reimplementing the pattern list here (against the
 * concept doc's own "reuses, does not reimplement" boundary) or
 * extending secretPatterns.ts itself, which is outside this gate's
 * approved target-file list.
 */
export function hmSecretScanSummary(text: string): SecretScanSummaryResult {
  const secret_detected = containsSecretLookingContent(text);
  return {
    secret_detected,
    secret_printed: false,
    action: secret_detected ? "stop_and_redact" : "none",
  };
}
