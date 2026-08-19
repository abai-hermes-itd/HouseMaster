import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { SECRET_LOOKING_FILENAME } from "../lib/secretPatterns.js";

const execFileAsync = promisify(execFile);

// Fixed, hardcoded repo root — this server reports on exactly one repo.
// Never taken from user input, never expanded into an arbitrary path.
const REPO_ROOT = "C:\\Abay-Germes\\HouseMaster";

export interface RepoStatusResult {
  branch: string;
  head: string;
  origin_aligned: boolean;
  tracked_clean: boolean;
  modified_files: string[];
  staged_files: string[];
  untracked_files: string[];
  risk_flags: string[];
}

async function git(args: string[]): Promise<string> {
  const { stdout } = await execFileAsync("git", args, { cwd: REPO_ROOT });
  // Strip only the trailing newline, never leading whitespace: a blanket
  // .trim() would eat the leading space of `git status --short`'s first
  // line whenever that line is a worktree-only modification (index
  // column blank, e.g. " M path"), corrupting the fixed-width XY-prefix
  // parsing below (confirmed bug, HM-MCP-003 validation run).
  return stdout.replace(/\r?\n+$/, "");
}

/**
 * hm_repo_status — read-only report of branch, HEAD, origin alignment,
 * and working-tree status. Runs only fixed, hardcoded git subcommands;
 * never shells out to an arbitrary/user-supplied command.
 */
export async function hmRepoStatus(): Promise<RepoStatusResult> {
  const branch = await git(["branch", "--show-current"]);
  const head = await git(["rev-parse", "HEAD"]);
  const statusRaw = await git(["status", "--short"]);

  const modified_files: string[] = [];
  const staged_files: string[] = [];
  const untracked_files: string[] = [];

  const lines = statusRaw.length > 0 ? statusRaw.split("\n") : [];
  for (const line of lines) {
    const indexStatus = line[0];
    const worktreeStatus = line[1];
    const file = line.slice(3);

    if (indexStatus === "?" && worktreeStatus === "?") {
      untracked_files.push(file);
      continue;
    }
    if (indexStatus !== " ") staged_files.push(file);
    if (worktreeStatus !== " ") modified_files.push(file);
  }

  const risk_flags: string[] = [];

  // Origin alignment: compare local HEAD to the upstream tracking ref.
  let origin_aligned = false;
  try {
    const upstream = await git([
      "rev-parse",
      "--abbrev-ref",
      "--symbolic-full-name",
      "@{u}",
    ]);
    const upstreamHead = await git(["rev-parse", upstream]);
    origin_aligned = upstreamHead === head;
  } catch {
    risk_flags.push("no upstream tracking branch configured");
  }

  for (const file of [...modified_files, ...staged_files, ...untracked_files]) {
    if (SECRET_LOOKING_FILENAME.test(file)) {
      risk_flags.push(`secret-looking filename: ${file}`);
    }
  }

  return {
    branch,
    head,
    origin_aligned,
    tracked_clean:
      modified_files.length === 0 &&
      staged_files.length === 0 &&
      untracked_files.length === 0,
    modified_files,
    staged_files,
    untracked_files,
    risk_flags,
  };
}
