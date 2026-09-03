# Gate Runner Dry-Run v0.1

**Status:** Implemented — read-only precondition/readiness check only
**Type:** Governance / tooling
**Date:** 2026-09-04
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Scope:** `sprints/04_RUNBOOKS/tools/gate-runner-dry-run.mjs`, `sprints/04_RUNBOOKS/tools/gate-runner-dry-run.example.json`, this document. No other file is created, modified, or wired by this task.

---

## 1. Purpose

Before a commit-gate or push-gate request is even filled in, a human still has to answer by hand: "is the repo actually in the state this request assumes?" — is the target file the *only* thing changed, is the branch right, is there really something to push, does the change accidentally touch a file it never should (`package.json`, a `.tfstate` file, a path this session was told to leave alone)?

Gate Runner dry-run answers exactly that question, and nothing else. Given a small JSON description of a pending commit-gate or push-gate, it runs a fixed set of **read-only** git checks and reports **READY** or **BLOCKED** with itemized reasons.

It does not check whether a gate request's *text* is well-formed — that is `validate-gate-request.mjs`'s job (the "Forbidden:" section hard-rule check), and this tool does not duplicate or replace it. Dry-run checks **repo/environment state**; `validate-gate-request.mjs` checks **request wording**. A real gate should still pass both, plus the human approval itself, before anything executes.

## 2. Relationship to `gate-runner.mjs`

This is a **separate, additive** tool. It does not modify `gate-runner.mjs`, `fill-gate-template.mjs`, `validate-gate-request.mjs`, or `hard-rules.json`, and none of those files were touched to build it. `gate-runner.mjs`'s existing modes (`suggest-id`, `fill`, `validate`, `draft-commit-gate`, `draft-push-gate`) are unchanged. A future version could wire `gate-runner.mjs dry-run` to call this script the same way it already wraps the other three tools — that wiring is explicitly **not** done here (see §5).

## 3. Config shape

One JSON object, either as a file argument or piped on stdin:

```json
{
  "gateType": "commit",
  "target": "path/relative/to/repo/root.md",
  "targets": ["optional/alternative/to/target — multiple paths"],
  "expectedBranch": "optional — current branch must equal this",
  "forbiddenPaths": ["optional glob(s), appended to the built-in defaults below"],
  "remote": "optional, push-gate only — defaults to \"origin\"",
  "minAheadBy": "optional, push-gate only — defaults to 1"
}
```

`gateType` must be `"commit"` or `"push"` — anything else is refused (exit 2). See `gate-runner-dry-run.example.json` for a worked config.

Built-in default forbidden-path globs (always applied, on top of any `forbiddenPaths` the config adds — the config can only add to this list, never remove from it): `package.json`, `**/package.json`, `pnpm-lock.yaml`, `package-lock.json`, `yarn.lock`, `.env`, `.env.*`, `**/*.tfstate`, `**/*.tfstate.backup`.

## 4. Checks performed

### 4.1 `gateType: "commit"`

| Check | What it verifies |
|---|---|
| `target_exists:<path>` | Each target path exists on disk. |
| `target_has_pending_change` | Every target has an uncommitted change (`git status --porcelain` lists it) — i.e. there is actually something for a commit gate to stage. |
| `scope_is_target_only` | No file **other than** the target(s) is currently changed — staged, unstaged, or untracked. Catches the "accidentally left something else dirty" case before it becomes `git add -A` temptation. |
| `no_forbidden_path_changed` | No changed file (target or otherwise) matches a forbidden-path glob. |
| `branch_matches_expected` | (only if `expectedBranch` given) Current branch equals it. |

### 4.2 `gateType: "push"`

| Check | What it verifies |
|---|---|
| `working_tree_clean` | `git status --porcelain` is empty — nothing uncommitted, matching a push gate's assumption that the commit already happened. |
| `branch_matches_expected` | (only if `expectedBranch` given) Current branch equals it. |
| `remote_ref_known_locally` | This repo has a local ref for `<remote>/<branch>` (no `git fetch` is ever run by this tool — if the ref is missing, it reports BLOCKED and says so, rather than fetching). |
| `ahead_of_remote` | Local `HEAD` is at least `minAheadBy` commit(s) ahead of `<remote>/<branch>`. |
| `no_forbidden_path_in_outgoing_commits` | No file touched by the commits between `<remote>/<branch>` and `HEAD` matches a forbidden-path glob. |

## 5. Non-goals (v0.1)

- **Not an executor.** Runs no `git add`, `git commit`, `git push`, `git fetch`, `terraform`, deploy command, DB/Prisma command, or Secret Manager access — in any mode, for any input. Every git command it runs is read-only (`rev-parse`, `status --porcelain`, `diff --name-only`, `rev-list --count`).
- **Not a request-text validator.** Does not read or check a gate request's "Forbidden:" section — that stays `validate-gate-request.mjs`'s job.
- **Not wired anywhere.** Not added to `gate-runner.mjs`'s mode list, not added to `package.json`, no hook/chat-interception/CI wiring. Standalone script, invoked directly, same as every other tool in `sprints/04_RUNBOOKS/tools/`.
- **Does not fetch.** If remote-tracking refs are stale or missing, it reports that as BLOCKED rather than running `git fetch` itself — refreshing remote refs stays a separate, human-initiated action.
- **Not an approval.** A `READY` result is a precondition check, not a substitute for the explicit human approval every gate still requires (`ops/agents/HOUSEMASTER_GCP_GATE_AGENT_OPERATING_MODEL.md` §2). The tool says so in its own output.
- **Only two gate types.** `commit` and `push` — matching the two templates `gate-runner.mjs`'s composite modes already cover. The other four templates (`EXECUTION_GATE`, `SECRET_EXECUTION_GATE`, `ENDPOINT_IAM_RETEST_CYCLE`, `DOCS_ONLY_GATE`) are out of scope for v0.1.

## 6. Usage

```bash
node sprints/04_RUNBOOKS/tools/gate-runner-dry-run.mjs sprints/04_RUNBOOKS/tools/gate-runner-dry-run.example.json
# or
cat some-config.json | node sprints/04_RUNBOOKS/tools/gate-runner-dry-run.mjs
```

Exit codes: `0` = READY, `1` = BLOCKED (one or more checks failed), `2` = usage/config error (bad JSON, missing/invalid `gateType`, no target given).

## 7. Worked example

Config (`gate-runner-dry-run.example.json`):

```json
{
  "gateType": "commit",
  "target": "sprints/04_RUNBOOKS/GATE_RUNNER_DRY_RUN_V0.md",
  "expectedBranch": "feat/hm-gcp-003d-cloud-sql-import",
  "forbiddenPaths": ["gplay/pwa/**"]
}
```

Illustrative output once this document and the two tool files are staged as the intended change and nothing else is dirty:

```
Gate Runner dry-run v0.1 — gateType: commit
Repo root: C:/Abay-Germes/HouseMaster

  [PASS   ] branch_matches_expected                     current branch is "feat/hm-gcp-003d-cloud-sql-import"
  [PASS   ] no_forbidden_path_changed                    no changed file matches a forbidden path pattern
  [PASS   ] scope_is_target_only                         no file outside target(s) is changed
  [PASS   ] target_exists:sprints/04_RUNBOOKS/GATE_RUNNER_DRY_RUN_V0.md   target exists on disk: ...
  [PASS   ] target_has_pending_change                    every target has a pending (uncommitted) change

Overall: READY — repo state matches this gate's assumptions. This is not an approval and does not execute anything; the gate request still needs its own explicit human approval before any command in it runs.
```

If, say, `gplay/pwa/index.html` were also dirty at that moment, `no_forbidden_path_changed` and `scope_is_target_only` would both report BLOCKED and name the file — exactly the case this tool exists to catch before a `COMMIT_GATE` request gets filled and approved.

## 8. Readiness classification

Implemented, v0.1. Read-only, not wired into any automation, does not change the behavior of `gate-runner.mjs` or any of the three tools it wraps. Extending it to more gate types, or wiring `gate-runner.mjs dry-run` to call it, is out of scope here and would need its own separate, explicit approval.
