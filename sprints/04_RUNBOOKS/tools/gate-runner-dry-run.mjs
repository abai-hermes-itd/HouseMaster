#!/usr/bin/env node
// Gate Runner dry-run v0.1 for the HouseMaster approval-pack workflow.
//
// A read-only PRECONDITION / READINESS check, separate from and additive to
// gate-runner.mjs. It answers "is the repo in the state this gate's request
// text assumes it is in?" — not "is the request text itself well-formed?"
// (that question is validate-gate-request.mjs's job, and this tool does not
// duplicate or replace its hard-rule check).
//
// It takes a small JSON config describing a pending commit-gate or push-gate
// (see gate-runner-dry-run.example.json) and runs read-only git commands
// against the current repo to report READY or BLOCKED with reasons.
//
// This tool NEVER runs git add, git commit, git push, git fetch, terraform,
// a deploy command, a DB/Prisma command, or accesses a Secret Manager
// payload — in any mode. It also never modifies gate-runner.mjs,
// fill-gate-template.mjs, validate-gate-request.mjs, or hard-rules.json; it
// only reads git state (git rev-parse, git status, git diff, git rev-list —
// no --cached mutation, no writes).
//
// Usage:
//   node gate-runner-dry-run.mjs <config.json>
//   cat config.json | node gate-runner-dry-run.mjs
//
// Config shape: see gate-runner-dry-run.example.json and
// GATE_RUNNER_DRY_RUN_V0.md §3.
//
// Exit codes: 0 = READY, 1 = BLOCKED (one or more checks failed),
// 2 = usage/config error.

import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Defaults appended to any config-supplied forbiddenPaths — paths this
// session has repeatedly been told never to touch as a side effect of an
// unrelated change. Config can add more; this tool never removes these.
const DEFAULT_FORBIDDEN_PATHS = [
  "package.json",
  "**/package.json",
  "pnpm-lock.yaml",
  "package-lock.json",
  "yarn.lock",
  ".env",
  ".env.*",
  "**/*.tfstate",
  "**/*.tfstate.backup",
];

function usageAndExit(code) {
  console.error(
    "Usage: node gate-runner-dry-run.mjs <config.json>\n" +
      "       (reads stdin if no file is given)\n\n" +
      "Read-only precondition check for a pending commit-gate or push-gate.\n" +
      "Runs no git add/commit/push/fetch, no terraform/deploy/DB/Secret Manager command.\n" +
      "See sprints/04_RUNBOOKS/GATE_RUNNER_DRY_RUN_V0.md and gate-runner-dry-run.example.json."
  );
  process.exit(code);
}

function readStdin() {
  try {
    return readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

function loadConfig(argv) {
  let file = null;
  for (const a of argv) {
    if (a === "--help" || a === "-h") usageAndExit(0);
    else if (!a.startsWith("-")) file = a;
  }
  const text = file ? readFileSync(file, "utf8") : readStdin();
  if (!text || !text.trim()) {
    console.error("Refused: no config provided (empty file/stdin).");
    usageAndExit(2);
  }
  let config;
  try {
    config = JSON.parse(text);
  } catch (e) {
    console.error(`Refused: config is not valid JSON — ${e.message}`);
    process.exit(2);
  }
  if (config.gateType !== "commit" && config.gateType !== "push") {
    console.error(
      `Refused: config.gateType must be "commit" or "push", got: ${JSON.stringify(config.gateType)}`
    );
    process.exit(2);
  }
  return config;
}

// Converts a simple glob (supporting "*", "**", "?") to a RegExp anchored to
// a full forward-slash-normalized relative path. No dependency — mirrors the
// minimal-tooling convention already used by the other tools in this dir.
function globToRegExp(glob) {
  let re = "";
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === "*") {
      if (glob[i + 1] === "*") {
        re += ".*";
        i++;
      } else {
        re += "[^/]*";
      }
    } else if (c === "?") {
      re += ".";
    } else if ("\\^$.|+()[]{}".includes(c)) {
      re += "\\" + c;
    } else {
      re += c;
    }
  }
  return new RegExp(`^${re}$`);
}

function matchesAnyGlob(filePath, globs) {
  const normalized = filePath.replace(/\\/g, "/");
  return globs.some((g) => globToRegExp(g).test(normalized));
}

function git(repoRoot, args) {
  return execFileSync("git", args, { cwd: repoRoot, encoding: "utf8" });
}

function tryGit(repoRoot, args) {
  try {
    return { ok: true, out: git(repoRoot, args) };
  } catch (e) {
    return { ok: false, out: "", error: e.message };
  }
}

function findRepoRoot() {
  const result = tryGit(__dirname, ["rev-parse", "--show-toplevel"]);
  if (!result.ok) {
    console.error(`Refused: could not resolve git repo root — ${result.error}`);
    process.exit(2);
  }
  return result.out.trim();
}

// Parses `git status --porcelain` output into a flat list of paths touched
// (staged, unstaged, and untracked) — read-only, no `git add` involved.
// Rename entries ("R  old -> new") contribute both sides.
function changedPaths(porcelain) {
  const paths = [];
  for (const line of porcelain.split(/\r?\n/)) {
    if (!line) continue;
    const body = line.slice(3);
    if (body.includes(" -> ")) {
      const [from, to] = body.split(" -> ");
      paths.push(from, to);
    } else {
      paths.push(body);
    }
  }
  return paths;
}

function runCommitChecks(config, repoRoot) {
  const results = [];
  const targets = config.targets || (config.target ? [config.target] : []);

  if (targets.length === 0) {
    results.push({ id: "target_given", desc: "config.target(s) provided", pass: false, detail: "no target or targets in config" });
    return results;
  }

  for (const t of targets) {
    const exists = existsSync(join(repoRoot, t));
    results.push({
      id: `target_exists:${t}`,
      desc: `target exists on disk: ${t}`,
      pass: exists,
      detail: exists ? "" : "file not found at this path",
    });
  }

  const statusResult = tryGit(repoRoot, ["status", "--porcelain"]);
  if (!statusResult.ok) {
    results.push({ id: "git_status", desc: "git status --porcelain ran", pass: false, detail: statusResult.error });
    return results;
  }
  const changed = changedPaths(statusResult.out);
  const changedSet = new Set(changed.map((p) => p.replace(/\\/g, "/")));

  const missingTargetChanges = targets.filter((t) => !changedSet.has(t.replace(/\\/g, "/")));
  results.push({
    id: "target_has_pending_change",
    desc: "every target has a pending (uncommitted) change",
    pass: missingTargetChanges.length === 0,
    detail: missingTargetChanges.length ? `no pending change found for: ${missingTargetChanges.join(", ")}` : "",
  });

  const targetSet = new Set(targets.map((t) => t.replace(/\\/g, "/")));
  const extra = changed.filter((p) => !targetSet.has(p.replace(/\\/g, "/")));
  results.push({
    id: "scope_is_target_only",
    desc: "no file outside target(s) is changed",
    pass: extra.length === 0,
    detail: extra.length ? `unexpected changed file(s): ${extra.join(", ")}` : "",
  });

  const forbidden = [...DEFAULT_FORBIDDEN_PATHS, ...(config.forbiddenPaths || [])];
  const forbiddenHits = changed.filter((p) => matchesAnyGlob(p, forbidden));
  results.push({
    id: "no_forbidden_path_changed",
    desc: "no changed file matches a forbidden path pattern",
    pass: forbiddenHits.length === 0,
    detail: forbiddenHits.length ? `forbidden-matching file(s) changed: ${forbiddenHits.join(", ")}` : "",
  });

  if (config.expectedBranch) {
    const branchResult = tryGit(repoRoot, ["rev-parse", "--abbrev-ref", "HEAD"]);
    const branch = branchResult.ok ? branchResult.out.trim() : null;
    results.push({
      id: "branch_matches_expected",
      desc: `current branch is "${config.expectedBranch}"`,
      pass: branchResult.ok && branch === config.expectedBranch,
      detail: branchResult.ok ? `actual branch: ${branch}` : branchResult.error,
    });
  }

  return results;
}

function runPushChecks(config, repoRoot) {
  const results = [];
  const remote = config.remote || "origin";
  const minAheadBy = Number.isInteger(config.minAheadBy) ? config.minAheadBy : 1;

  const statusResult = tryGit(repoRoot, ["status", "--porcelain"]);
  if (!statusResult.ok) {
    results.push({ id: "git_status", desc: "git status --porcelain ran", pass: false, detail: statusResult.error });
    return results;
  }
  const changed = changedPaths(statusResult.out);
  results.push({
    id: "working_tree_clean",
    desc: "working tree has nothing uncommitted",
    pass: changed.length === 0,
    detail: changed.length ? `uncommitted file(s): ${changed.join(", ")}` : "",
  });

  const branchResult = tryGit(repoRoot, ["rev-parse", "--abbrev-ref", "HEAD"]);
  const branch = branchResult.ok ? branchResult.out.trim() : null;
  if (config.expectedBranch) {
    results.push({
      id: "branch_matches_expected",
      desc: `current branch is "${config.expectedBranch}"`,
      pass: branchResult.ok && branch === config.expectedBranch,
      detail: branchResult.ok ? `actual branch: ${branch}` : branchResult.error,
    });
  }

  if (!branchResult.ok) {
    results.push({ id: "ahead_of_remote", desc: "could not resolve current branch to check ahead-count", pass: false, detail: branchResult.error });
    return results;
  }

  const remoteRef = `${remote}/${branch}`;
  const remoteRefCheck = tryGit(repoRoot, ["rev-parse", "--verify", "--quiet", remoteRef]);
  if (!remoteRefCheck.ok) {
    results.push({
      id: "remote_ref_known_locally",
      desc: `local knowledge of ${remoteRef} exists`,
      pass: false,
      detail: `no local ref for ${remoteRef} — this tool does not run "git fetch"; ask a human to refresh remote-tracking refs first, or confirm this branch has never been pushed`,
    });
    return results;
  }

  const aheadResult = tryGit(repoRoot, ["rev-list", "--count", `${remoteRef}..HEAD`]);
  const aheadBy = aheadResult.ok ? parseInt(aheadResult.out.trim(), 10) : null;
  results.push({
    id: "ahead_of_remote",
    desc: `HEAD is at least ${minAheadBy} commit(s) ahead of ${remoteRef}`,
    pass: aheadResult.ok && aheadBy >= minAheadBy,
    detail: aheadResult.ok ? `ahead by: ${aheadBy}` : aheadResult.error,
  });

  const outgoingResult = tryGit(repoRoot, ["diff", "--name-only", `${remoteRef}..HEAD`]);
  if (outgoingResult.ok) {
    const outgoing = outgoingResult.out.split(/\r?\n/).filter(Boolean);
    const forbidden = [...DEFAULT_FORBIDDEN_PATHS, ...(config.forbiddenPaths || [])];
    const forbiddenHits = outgoing.filter((p) => matchesAnyGlob(p, forbidden));
    results.push({
      id: "no_forbidden_path_in_outgoing_commits",
      desc: "no file in the outgoing (unpushed) commits matches a forbidden path pattern",
      pass: forbiddenHits.length === 0,
      detail: forbiddenHits.length ? `forbidden-matching file(s) in outgoing commits: ${forbiddenHits.join(", ")}` : "",
    });
  }

  return results;
}

function main() {
  const config = loadConfig(process.argv.slice(2));
  const repoRoot = findRepoRoot();

  const results = config.gateType === "commit" ? runCommitChecks(config, repoRoot) : runPushChecks(config, repoRoot);

  console.log(`Gate Runner dry-run v0.1 — gateType: ${config.gateType}`);
  console.log(`Repo root: ${repoRoot}`);
  console.log("");

  const idWidth = Math.max(...results.map((r) => r.id.length));
  let allPass = true;
  for (const r of results) {
    if (!r.pass) allPass = false;
    console.log(`  [${(r.pass ? "PASS" : "BLOCKED").padEnd(7)}] ${r.id.padEnd(idWidth)}  ${r.desc}`);
    if (!r.pass && r.detail) console.log(`            -> ${r.detail}`);
  }

  console.log("");
  console.log(
    allPass
      ? "Overall: READY — repo state matches this gate's assumptions. This is not an approval and does not execute anything; the gate request still needs its own explicit human approval before any command in it runs."
      : "Overall: BLOCKED — one or more preconditions are not met. Do not act on the gate request as-is; resolve the listed item(s) first."
  );

  process.exit(allPass ? 0 : 1);
}

main();
