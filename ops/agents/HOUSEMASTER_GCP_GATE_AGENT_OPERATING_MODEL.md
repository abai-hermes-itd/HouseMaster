# HouseMaster GCP Gate Agent Operating Model

**Status:** Proposed
**Type:** Governance / AI-agent operating model
**Date:** 2026-08-16
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Current baseline:** `6623b67`
**Scope:** AI gate-agent governance only

---

## 1. Purpose

The HouseMaster GCP Gate Agent is a controlled local execution assistant for the HouseMaster GCP workflow.

The agent automates routine gate mechanics, not architectural judgment.

Its purpose is to reduce repetitive manual work while preserving:

- user approval authority
- ChatGPT architecture and risk-control role
- strict secret handling
- explicit gate boundaries
- clean git history
- infrastructure safety

---

## 2. Role model

**User:**

- project owner
- final approval authority
- approves each execution gate
- approves each commit and push
- enters secrets locally when explicitly required

**ChatGPT:**

- architect
- orchestrator
- risk controller
- defines gate scope
- writes or approves task specifications
- reviews patch reports and execution reports
- decides whether Claude web review is needed

**Claude Code:**

- local executor
- works only inside approved repository path
- executes only explicit approved tasks
- must stop if task body is incomplete
- must not infer missing execution scope
- must not self-authorize dangerous commands

**Claude web:**

- optional reviewer
- used only for architecture uncertainty, complex diffs, ADR review, or unclear risk

---

## 3. Agent principle

The agent may automate routine steps.

The agent must not automate decisions.

**Allowed automation:**

- preflight checks
- creating approved docs/checklists/runbooks
- showing diffs
- producing patch reports
- staging approved files after approval
- committing approved files after approval
- pushing after separate approval
- final git status/log checks

**Forbidden automation:**

- choosing architecture
- expanding task scope
- running infrastructure commands without explicit gate approval
- reading secrets
- printing secrets
- modifying unapproved files
- moving to the next gate automatically

---

## 4. Gate types

**Docs-only gate:**

- **Template:** `sprints/04_RUNBOOKS/TEMPLATE_DOCS_ONLY_GATE.md` (closure variant: `TEMPLATE_GATE_CLOSURE_RECORD.md`) — see §16 for the full template/tool mapping
- may create or edit approved markdown files only
- no infrastructure commands
- no secret access
- no live DB commands
- no deploy
- no Terraform
- no Prisma migration

**Execution gate:**

- **Template:** `sprints/04_RUNBOOKS/TEMPLATE_EXECUTION_GATE.md` (secret-handling variant: `TEMPLATE_SECRET_EXECUTION_GATE.md`; endpoint/IAM compound variant: `TEMPLATE_ENDPOINT_IAM_RETEST_CYCLE.md`) — see §16
- may run exactly approved operational commands
- requires explicit per-command approval
- must include stop conditions
- must include metadata-only verification when secrets are involved
- must not move to next gate automatically

**Commit gate:**

- **Template:** `sprints/04_RUNBOOKS/TEMPLATE_COMMIT_GATE.md` — see §16
- may stage only approved files
- must show cached diff or stat
- must use approved commit message
- must not include Co-Authored-By trailer unless explicitly approved
- must not push

**Push gate:**

- **Template:** `sprints/04_RUNBOOKS/TEMPLATE_PUSH_GATE.md` — see §16
- separate from commit gate
- requires explicit approval
- followed by git status and git log verification

---

## 5. Hard forbidden actions without explicit approval

The agent must not run:

- `gcloud`
- `terraform plan`
- `terraform apply`
- `terraform destroy`
- Secret Manager commands
- Cloud Run deploy
- Cloud Run refresh
- Cloud Build
- `prisma migrate deploy`
- `prisma db push`
- `prisma db pull`
- live DB queries
- manual SQL
- `git push`
- `.env` read/output

---

## 6. Secret handling

Passwords and DATABASE_URL must never appear in:

- chat
- screenshots
- git
- logs
- reports
- markdown files
- terminal output
- `.env` files as part of agent tasks

**Allowed reporting:**

- secret name
- project name
- version number
- ENABLED/DISABLED state
- masked URL format

**Forbidden reporting:**

- full DATABASE_URL
- password
- secret payload
- token
- `.env` content

---

## 7. Standard docs-only workflow

**Template:** `TEMPLATE_DOCS_ONLY_GATE.md` (or `TEMPLATE_GATE_CLOSURE_RECORD.md` for a closure record). See §16 for the full template/tool mapping.

For each docs-only task, the agent must:

1. Run preflight:
   - `git status --short`
   - `git log --oneline --decorate -10`

2. Stop if tracked changes exist.

3. Create or modify only approved files.

4. Run validation:
   - `git status --short`
   - `git diff` for approved files
   - for new untracked files, use `git diff --no-index /dev/null <file>` if needed

5. Produce patch report:
   - commands run
   - files changed
   - summary
   - git status
   - forbidden actions confirmation
   - commit recommendation

6. Wait for approval.

---

## 8. Standard commit workflow

**Template:** `TEMPLATE_COMMIT_GATE.md` — may be generated with `sprints/04_RUNBOOKS/tools/fill-gate-template.mjs --template COMMIT_GATE` and checked with `validate-gate-request.mjs --template commit` before use (see §16). Generating a request this way does not execute it — explicit human approval is still required.

For each approved commit, the agent must:

1. Run `git status --short`.
2. Stage only approved files.
3. Run `git diff --cached --stat` or approved cached diff.
4. Commit with approved message.
5. Run `git status --short`.
6. Run `git log --oneline --decorate -5`.
7. Do not push.

---

## 9. Standard push workflow

**Template:** `TEMPLATE_PUSH_GATE.md` — may be generated with `fill-gate-template.mjs --template PUSH_GATE` and checked with `validate-gate-request.mjs --template push` (see §16). Push remains a separate gate from commit even when tool-generated.

For each approved push, the agent must:

1. Confirm working tree is clean for tracked files.
2. Confirm HEAD is the intended commit.
3. Run `git push` only after explicit approval.
4. Run:
   - `git status --short`
   - `git log --oneline --decorate -10`
5. Confirm HEAD and origin are aligned.

---

## 10. Incomplete task rule

If the task body is cut off, incomplete, ambiguous, or missing:

- stop
- do not infer missing instructions
- request the remaining task body
- do not inspect files unless preflight was explicitly authorized
- do not edit files

---

## 11. Scope expansion rule

The agent must stop if it detects a need to:

- modify additional files
- change architecture
- run infrastructure commands
- read secrets
- change environment variables
- change deployment configuration
- perform live validation

The agent must report the needed scope expansion and wait for ChatGPT/user approval.

---

## 12. Sprint 4 execution-gate rule

After Sprint 4 planning layer 004A–004E, all execution happens only through explicit gates:

- HM-GCP-004X-1 — Secret Manager update execution
- HM-GCP-004X-2 — Cloud Run revision refresh execution
- HM-GCP-004X-3 — live connectivity execution
- HM-GCP-004X-4 — controlled migrate deploy execution

No automatic transition between gates.

---

## 13. Stop conditions

Stop immediately if:

- a command would reveal a secret
- a command would read `.env`
- a command would access secret payload
- command scope does not match approved task
- unapproved files would be modified
- tracked changes exist before task start
- infrastructure command appears in docs-only task
- Claude Code proposes autonomous next-step execution

---

## 14. Report template

Every final report must include:

- Gate ID
- Commands run
- Files created/modified
- Git status
- Diff summary
- Forbidden actions confirmation
- Secret handling confirmation
- Commit recommendation
- Next allowed gate, if any

---

## 15. Readiness classification

This document defines the operating model only.

It does not authorize any infrastructure execution.

---

## 16. Approval-Pack Template & Tool Mapping

Compact mapping from each gate type / standard workflow step to the reusable template it uses and, where one exists, the local tool that supports it. Templates live in `sprints/04_RUNBOOKS/`; tools live in `sprints/04_RUNBOOKS/tools/`.

| Gate type / workflow step | Template | Supporting tool |
|---|---|---|
| Docs-only gate (§4; §7 workflow) | `TEMPLATE_DOCS_ONLY_GATE.md` | — |
| Docs-only gate, closure variant | `TEMPLATE_GATE_CLOSURE_RECORD.md` | — |
| Execution gate, non-secret (§4) | `TEMPLATE_EXECUTION_GATE.md` | `validate-gate-request.mjs --template execution` |
| Execution gate, secret-handling variant (§4, §6) | `TEMPLATE_SECRET_EXECUTION_GATE.md` | `validate-gate-request.mjs --template secret-execution` |
| Execution gate, endpoint/IAM retest compound variant | `TEMPLATE_ENDPOINT_IAM_RETEST_CYCLE.md` | `validate-gate-request.mjs --template endpoint-iam-retest` |
| Commit gate (§4; §8 workflow) | `TEMPLATE_COMMIT_GATE.md` | `fill-gate-template.mjs --template COMMIT_GATE`; `validate-gate-request.mjs --template commit` |
| Push gate (§4; §9 workflow) | `TEMPLATE_PUSH_GATE.md` | `fill-gate-template.mjs --template PUSH_GATE`; `validate-gate-request.mjs --template push` |

**The three tools** (`validate-gate-request.mjs`, `fill-gate-template.mjs`, `suggest-gate-id.mjs`) are standalone local CLI scripts (Node.js, no dependencies). See `sprints/04_RUNBOOKS/tools/README.md` for full usage of each.

- They are **not** wired into any Claude Code hook, `package.json` script, or other automatic workflow. `pnpm hm:gate` is not implemented. Running any of them is a manual, human-initiated step.
- A tool's output is never self-executing. A filled template from `fill-gate-template.mjs` is a draft approval request; a `validate-gate-request.mjs` result only says whether that draft's forbidden list is complete. Either way, the user's explicit approval (§2) is still required before any command in the request runs.
- Commit and push remain two separate gates (§4, §8, §9) regardless of tooling — `fill-gate-template.mjs` never combines them into one request, and none of the three tools stage, commit, or push anything themselves.
- `suggest-gate-id.mjs` supports numbering a new gate document (e.g. the next `HM-GCP-004X-N`); it has no template of its own to map to a gate type — it only informs what ID a human assigns before opening a new gate under one of the templates above.
