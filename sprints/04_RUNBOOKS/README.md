# Gate Approval-Pack — Index

**Status:** Proposed — templates only, not yet wired to any execution tooling
**Type:** Governance / reusable templates
**Date:** 2026-08-27
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Scope:** Template architecture only — no infrastructure commands run, no secrets accessed, no existing sprint docs or roadmap modified to produce this pack

---

## 1. Why this exists

Sprint 4 (`HM-GCP-004*` / `HM-GCP-004X-*`) ran its entire execution phase as a long sequence of hand-typed, one-off approval messages — each one restating the same shape: an `Approved:` line, a `Target:`/`Goal:`, an `Allowed:` command list, a `Forbidden:` hard-rule list, and a `Report:` field list. That shape is exactly what `ops/agents/HOUSEMASTER_GCP_GATE_AGENT_OPERATING_MODEL.md` already formalizes as gate types (§4), hard-forbidden actions (§5), secret handling (§6), and standard workflows (§7–9) — but every individual gate in Sprint 4 re-typed that structure from scratch instead of filling in a template.

This pack extracts that recurring shape into reusable, fill-in-the-blank templates, one per gate type from the operating model. It does not change how gates work — it only reduces how much of each approval message has to be retyped by hand each time.

## 2. Files in this pack

| File | Gate type (per operating model §4/8/9) | Use when |
|---|---|---|
| `TEMPLATE_DOCS_ONLY_GATE.md` | Docs-only gate | Creating or editing an approved markdown file only — no commands |
| `TEMPLATE_EXECUTION_GATE.md` | Execution gate | Running approved read-only or infrastructure commands, non-secret |
| `TEMPLATE_SECRET_EXECUTION_GATE.md` | Execution gate (secret-handling variant) | The command touches Secret Manager, a password, or `DATABASE_URL` — adds the use-not-print and hard-stop-on-failure rules |
| `TEMPLATE_ENDPOINT_IAM_RETEST_CYCLE.md` | Execution gate (compound variant) | The specific grant → call → rollback → verify shape used for `/api/health/db` retests |
| `TEMPLATE_COMMIT_GATE.md` | Commit gate | Staging and committing already-approved file changes |
| `TEMPLATE_PUSH_GATE.md` | Push gate | Pushing an already-committed change to origin |
| `TEMPLATE_GATE_CLOSURE_RECORD.md` | Docs-only gate (closure variant) | Recording that a gate document is now closed/resolved, including a failed-attempt/containment variant |

Every template's hard-rule list is a subset or restatement of the operating model's §5/§6 — none introduce new policy. If a template and the operating model ever disagree, the operating model wins.

## 3. How this reduces copy-paste

Sprint 4's actual approval messages (see `sprints/01_ACTIVE/HM-GCP-004X-1B_*`, `HM-GCP-004X-3B_*`, `HM-GCP-004X-4_*` for the real transcripts this pack is extracted from) repeated, near-verbatim, the same ~9-line forbidden list dozens of times across the session — re-typed by hand each time, with small drift between instances (e.g. one message dropping two forbidden items, which stalled that gate until it was resent in full — see `HM-GCP-004X-1B`'s "first execution attempt" history). Each template here instead:

- Fixes the hard-rule list once, per gate type, so it's copied intact instead of retyped
- Leaves only the genuinely task-specific fields as blanks (`<TARGET_FILE>`, `<EXACT_COMMAND>`, `<COMMIT_MESSAGE>`, …)
- Keeps the fields ChatGPT/the user actually vary between gates (goal, allowed command, report fields) explicit and separate from the fields that should never vary (the hard rules)

The intent is that filling a template is strictly copy → fill blanks → send, rather than reconstructing the rule list from memory each time.

## 4. What should become executable later

Not built in this task (explicitly out of scope — see Non-goals below). Candidates for a later, separately-approved task:

1. A small validator (script or Claude Code hook) that checks an incoming gate request against its template — e.g. confirms the forbidden list for a `TEMPLATE_SECRET_EXECUTION_GATE` request still contains all required hard-rule lines before the agent is allowed to act on it. This directly addresses the exact failure mode observed in Sprint 4 (a truncated/incomplete forbidden list nearly authorizing an unintended action).
2. A slash-command or CLI helper that takes a gate type + a small set of answers (target file, exact command, commit message) and emits a filled template, rather than a human copying and editing the `.md` by hand.
3. A generator that produces the next `HM-GCP-004X-N` (or equivalent) filename/number automatically from the sprint's existing doc set, so numbering stays consistent (this pack's templates still require a human/orchestrator to pick the ID by hand).
4. Wiring template selection into `ops/agents/HOUSEMASTER_GCP_GATE_AGENT_OPERATING_MODEL.md` §7–9's "standard workflow" steps, so each workflow step names which template backs it.

None of these are scripts yet — this task only produced the `.md` templates themselves.

## 5. Non-goals (this task)

This task does not:
- implement any executable script, hook, or CLI tool
- run any infrastructure command (`gcloud`, `terraform`, `prisma`, etc.)
- access, print, or request any secret, password, or `DATABASE_URL`
- perform blind `terraform apply`
- mutate any DB
- run `prisma migrate deploy` without exact command approval
- run an endpoint/IAM cycle without a rollback requirement
- stage any untracked, unrelated file
- automatically progress to a next gate
- modify any existing file under `sprints/01_ACTIVE/`, `sprints/02_COMPLETED/`, or `sprints/00_ROADMAP/`

## 6. Readiness classification

Templates only. Not wired to any tooling. Using a template still requires the same explicit, per-gate human approval every Sprint 4 gate required — this pack changes what gets retyped, not who approves what.
