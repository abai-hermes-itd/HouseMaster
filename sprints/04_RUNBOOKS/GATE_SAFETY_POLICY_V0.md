# Gate Safety Policy v0.1

**Status:** Proposed — policy only, not implemented, not yet adopted as binding
**Type:** Governance / safety policy
**Date:** 2026-08-28
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Scope:** Docs-only. Defines the safety policy that governs the HouseMaster GCP gate process, the local `sprints/04_RUNBOOKS/tools/` gate-runner tooling, and any future MCP layer built on top of them. Creates no code, no hook, no `package.json` script, no wiring of any kind.

---

## 1. Purpose

This document is the single reference for what "safe" means across the HouseMaster GCP gate process, independent of which layer is acting: a human typing commands by hand, Claude Code executing an approved gate, the local `gate-runner.mjs` dispatcher, or any future MCP tool exposed on top of this workflow.

It does not introduce new policy. Every rule below already exists in `ops/agents/HOUSEMASTER_GCP_GATE_AGENT_OPERATING_MODEL.md` (the operating model — §2–§14) and `sprints/04_RUNBOOKS/GATE_RUNNER_SPEC_V0.md` (the gate-runner spec — §2, §5). This document collects those rules into one place, states them as durable principles rather than task-specific instructions, and — new here — extends them explicitly to any future MCP layer, which neither source document addresses. If this policy and either source document ever appear to disagree, the operating model's §2 role model and §5 hard-forbidden list win; this document should be corrected to match, not the other way around.

---

## 2. Safety principles for the gate process

1. **A gate is a request, not an action.** Producing, filling, or validating a draft request is not the same as executing what it describes. Nothing in the gate process is self-executing.
2. **Approval is per-gate, not standing.** Approval given for one gate does not carry forward to the next gate, a similar-looking gate, or a follow-on step — see §11 ("No automatic next-gate progression rule").
3. **The forbidden list is load-bearing, not boilerplate.** The one real incident this whole approval-pack was built to prevent (`HM-GCP-004X-1B`) was a truncated forbidden list nearly authorizing an unintended action. A short or reworded forbidden list is a stop condition, not a formatting variation.
4. **Fail closed.** Where a check cannot confirm compliance (an unlabeled forbidden section, an ambiguous scope, an incomplete task body), the correct response is to treat it as non-compliant and stop — never to proceed on the assumption that missing information was probably fine.
5. **Read scope is not act scope.** Being allowed to inspect a file for context (a "May inspect" list) never implies permission to edit it, run a command found in it, or use it to justify expanding the current gate's scope.
6. **Least mechanism.** A docs-only outcome should be produced by a docs-only gate; a read-only script should never be reached for when a manual read accomplishes the same inspection. Tooling exists to reduce retyping, not to reduce how many approvals a step requires.

---

## 3. Allowed draft-only capabilities

Draft-only tools (today: `validate-gate-request.mjs`, `fill-gate-template.mjs`, `suggest-gate-id.mjs`, and the `gate-runner.mjs` dispatcher over them) may:

- read template files (`TEMPLATE_*.md`) and fill their placeholders from CLI-supplied, non-secret values
- read the sprint doc set's filenames to suggest (never assign) a next gate ID
- read a gate-request's text and check its `Forbidden:` section against a fixed, hand-maintained rule set
- print a filled request or a validation result to stdout
- exit non-zero and refuse, with a stderr reason, when required input is missing or a template is unknown

Draft-only tools may **not**, under any mode or flag combination:

- write, rename, move, or delete any file
- stage, commit, or push anything to git
- invoke `gcloud`, `terraform`, `prisma`, or any deploy command
- read or print any Secret Manager payload, password, or `DATABASE_URL`
- call an application endpoint
- chain automatically into another mode, another tool, or another gate

---

## 4. Actions that always require explicit human approval

Regardless of which layer proposes them (human, Claude Code, gate-runner, or a future MCP tool), the following always require a fresh, explicit, per-instance human approval before they run:

- any infrastructure command (`gcloud`, `terraform plan`/`apply`/`destroy`, Cloud Build, Cloud Run deploy/refresh)
- any Secret Manager read, write, or version-access command
- any `prisma migrate deploy` / `db push` / `db pull`, or manual SQL against a live database
- `git add` / `git commit` (commit gate)
- `git push` (push gate, separate from commit gate — see §10)
- any application endpoint call gated behind IAM or auth
- creating or editing any file not named in the current gate's approved target/scope
- moving to the next gate in a sequence, even one that looks like the obvious next step

Approval must name the exact command or exact file, not a category of commands or files. "Run the usual deploy step" is not an approval; the literal command line is.

---

## 5. Actions forbidden for draft-only tools

Restated from §3 for emphasis, because this is the boundary a future MCP tool is most likely to accidentally cross: a draft-only tool exists to produce or check a *description* of an action. It must never itself become the thing that performs the action it describes. Concretely, no draft-only tool may:

- execute the command it just drafted or validated
- read `.env` or any secret file as part of drafting or validating
- retry a failed draft with different arguments on its own initiative
- treat a `PASS` validation result as authorization to proceed — a `PASS` means the forbidden list is complete, nothing more

---

## 6. Secret-safety rules

- Passwords and `DATABASE_URL` must never appear in chat, screenshots, git history, logs, reports, markdown files, or terminal output.
- Allowed to report: secret **name**, project name, version number, ENABLED/DISABLED state, a masked URL format (e.g. host/db name with credentials elided).
- Forbidden to report: full `DATABASE_URL`, password, any secret payload, token, or `.env` content.
- Infrastructure snapshots (Cloud Run service YAML, Cloud SQL instance YAML, and similar) may reference secret **names** via `secretKeyRef` — that is not a secret value and is safe to inspect and report on. The line is the value, not the reference.
- A command that would reveal a secret is a stop condition (§9) regardless of what gate type is in progress, including inside an otherwise-approved execution gate.

---

## 7. Git-safety rules

- Preflight before any docs-only or execution gate: `git status --short` and `git log --oneline --decorate` (recent commits). Stop if unexpected tracked changes exist before the gate's own work begins.
- A gate may create or modify only the file(s) explicitly named as its target. Untracked, unrelated files already present in the working tree are not staged, committed, or cleaned up as a side effect of an unrelated gate.
- Validation after docs-only work: `git status --short` plus `git diff` (or `git diff --no-index /dev/null <file>` for a brand-new untracked file) scoped to the approved target only.
- Commit and push are always two separate gates (§10) — no tool or automation may combine them into one approval or one execution.
- `git push` runs only after its own explicit approval, followed by `git status --short` and `git log` to confirm `HEAD` and `origin` are aligned.

---

## 8. GCP / runtime safety rules

- No `gcloud` command of any kind (read or write) runs without explicit per-command approval, even a read-only `describe`/`list`.
- No `terraform plan`, `apply`, or `destroy` runs without explicit per-command approval; a `plan` output already on disk may be read and reported on, but generating a fresh one is still an infrastructure command requiring approval.
- No Cloud Run deploy, revision refresh, or traffic change without explicit approval.
- No Cloud Build trigger.
- An endpoint/IAM cycle (grant → call → rollback → verify) always includes an explicit rollback requirement as part of its approval — the compound shape is never split so that the rollback step gets skipped or deferred.

---

## 9. DB / Prisma safety rules

- No `prisma migrate deploy`, `prisma db push`, or `prisma db pull` without explicit per-command approval, following the controlled-deploy runbook (`HM-GCP-004E`) shape: exact command, stated stop conditions, no silent retry.
- No live DB queries and no manual SQL without explicit approval scoped to that exact query.
- Metadata-only verification (row counts, connection status, schema version) is preferred over data access whenever it satisfies the gate's stated goal.
- A DB mutation is never bundled into a docs-only or read-only gate's scope, even as a "quick check."

---

## 10. Commit/push separation rule

Commit and push are distinct gate types with distinct approvals, always, with no exception path:

- A commit gate stages only the approved files, shows the cached diff/stat, commits with the approved message, and explicitly does not push.
- A push gate is requested and approved separately, after the commit gate has already completed, and pushes only the already-committed state.
- No template, tool, or future MCP capability may merge these into a single approval or a single execution step, even when the same human approves both in quick succession.

---

## 11. No automatic next-gate progression rule

- Completing one gate is never, by itself, authorization to begin the next one — including a gate that was previewed, proposed, or discussed as "the obvious next step" in the same conversation.
- Every gate begins from an explicit, freshly issued instruction naming its own goal, target, allowed actions, and forbidden list.
- A tool may *suggest* a next step (e.g. `suggest-gate-id.mjs` proposing a next numeric suffix) without that suggestion constituting approval to act on it.
- If Claude Code (or any future MCP tool) proposes autonomous next-step execution, that is itself a stop condition (§9 of the operating model; restated in §12 below).

---

## 12. Stop conditions

Work stops immediately, regardless of gate type or layer, if:

- a command would reveal a secret, read `.env`, or access a secret payload
- command scope does not match the approved task
- unapproved files would be created, modified, or deleted
- tracked changes exist before a gate's own work begins
- an infrastructure command appears inside a docs-only task's scope
- the task body is cut off, incomplete, or ambiguous — the correct response is to request the remaining/complete task, not to infer it
- an agent (Claude Code, gate-runner, or a future MCP tool) proposes autonomous next-step or next-gate execution
- a draft-only tool's output is about to be treated as if it were an executed action

---

## 13. How this policy constrains future MCP tools

Any MCP tool built to expose this gate process (or the gate-runner tooling behind it) inherits every rule above without weakening any of them. Specifically, an MCP tool:

- must not gain the ability to run `git add`/`commit`/`push`, `gcloud`, `terraform`, `prisma`, or any deploy command as a side effect of a call whose stated purpose is drafting, validating, or suggesting
- must not read or expose Secret Manager payloads, passwords, or `DATABASE_URL` values through any tool call, resource, or response field, even ones nominally scoped to metadata
- must not collapse commit and push into a single tool call
- must not chain gates — each MCP tool call is one gate-process step, requiring its own explicit human approval before its output is acted on, exactly as a manually typed gate does today
- must fail closed on ambiguous or partial input in the same way `validate-gate-request.mjs` fails closed on a missing `Forbidden:` heading (§2 principle 4)
- must not be granted broader filesystem, network, or command-execution scope than the specific draft-only tool(s) it wraps already have
- any new capability an MCP tool would need beyond what §3 already allows is itself a scope-expansion event (§11 of the operating model) requiring its own separate, explicit approval before that capability is built — never inferred from "the MCP layer probably needs this to be useful"

---

## 14. MCP is a controlled interface, not an autonomous DevOps agent

To state this plainly, since it is the premise every rule above depends on: an MCP layer over this gate process is a **controlled interface** — a narrower, more convenient way to invoke the same draft-only tools and request the same human approvals this document and the operating model already require. It is not, and must never become, an autonomous agent that plans, sequences, or executes infrastructure changes, secret rotations, deployments, or database operations on its own judgment. Every action an MCP tool call can lead to still passes through the same approval gate a human would type by hand; the MCP layer changes how a request is composed and transmitted, not who decides whether it runs.

---

## 15. Readiness classification

Policy only. Not yet adopted as binding (see Status above — mark as Adopted only via its own separate, explicit approval). Does not authorize building any MCP tool, modifying any existing tool's logic, or running any infrastructure, secret, git, or DB command. Building on this policy (an actual MCP tool, a `closeout-draft` implementation, `pnpm hm:gate`, or any hook/CI wiring) remains out of scope here and requires its own separately-approved task, consistent with `GATE_RUNNER_SPEC_V0.md` §6 and the operating model's Forbidden-automation list (§3).
