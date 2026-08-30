import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import {
  SECRET_LOOKING_FILENAME,
  containsSecretLookingContent,
} from "../lib/secretPatterns.js";

const execFileAsync = promisify(execFile);

// Fixed, hardcoded repo root — never taken from caller input.
const REPO_ROOT = "C:\\Abay-Germes\\HouseMaster";

export interface DiffEntry {
  file: string;
  diff_stat: string | null;
  diff_text: string | null;
  secret_detected: boolean;
  secret_printed: boolean;
  action: "included" | "stop_and_redact";
}

export interface RejectedFile {
  path: string;
  reason: string;
}

export interface DiffSummaryResult {
  entries: DiffEntry[];
  rejected_files: RejectedFile[];
}

type ValidationResult =
  | { ok: true; rel: string }
  | { ok: false; reason: string };

/**
 * Validates one caller-supplied path before it is ever passed to git:
 * must be relative, must resolve to somewhere inside REPO_ROOT, and
 * must not look secret-shaped by filename — rejected even if the
 * caller explicitly asked for it.
 */
function validateFile(requested: string): ValidationResult {
  if (path.isAbsolute(requested)) {
    return { ok: false, reason: "absolute paths not allowed" };
  }

  const resolved = path.resolve(REPO_ROOT, requested);
  const relFromRoot = path.relative(REPO_ROOT, resolved);

  if (relFromRoot.startsWith("..") || path.isAbsolute(relFromRoot)) {
    return { ok: false, reason: "path escapes repository root" };
  }

  const rel = relFromRoot.replace(/\\/g, "/");

  if (SECRET_LOOKING_FILENAME.test(rel)) {
    return {
      ok: false,
      reason:
        "secret-looking filename, rejected regardless of caller intent",
    };
  }

  return { ok: true, rel };
}

async function git(args: string[]): Promise<string> {
  const { stdout } = await execFileAsync("git", args, { cwd: REPO_ROOT });
  return stdout.replace(/\r?\n+$/, "");
}

/**
 * hm_diff_summary — read-only git diff for an explicit, caller-approved
 * list of files only. Never diffs the whole repo (no bare `git diff`).
 * Every path is validated (relative, inside repo root, not
 * secret-shaped) before it ever reaches git. The diff text itself is
 * additionally scanned for secret-looking content: a match withholds
 * that file's diff_text (secret_detected: true, action:
 * "stop_and_redact") — the matched value is never printed.
 */
export async function hmDiffSummary(
  files: string[],
): Promise<DiffSummaryResult> {
  const rejected_files: RejectedFile[] = [];
  const validFiles: string[] = [];

  for (const requested of files) {
    const result = validateFile(requested);
    if (result.ok) {
      validFiles.push(result.rel);
    } else {
      rejected_files.push({ path: requested, reason: result.reason });
    }
  }

  const entries: DiffEntry[] = [];

  // Diffed one file at a time (rather than one batched `git diff -- a b
  // c`) so the secret scan and stop_and_redact action can be applied
  // per file — one flagged file must never suppress the others.
  for (const file of validFiles) {
    const [diffStat, diffText] = await Promise.all([
      git(["diff", "--stat", "--", file]),
      git(["diff", "--", file]),
    ]);

    if (containsSecretLookingContent(diffText)) {
      entries.push({
        file,
        diff_stat: diffStat || null,
        diff_text: null,
        secret_detected: true,
        secret_printed: false,
        action: "stop_and_redact",
      });
      continue;
    }

    entries.push({
      file,
      diff_stat: diffStat || null,
      diff_text: diffText || null,
      secret_detected: false,
      secret_printed: false,
      action: "included",
    });
  }

  return { entries, rejected_files };
}
