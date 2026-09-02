# Gate Runner Spec v0.1

**Status:** Proposed — specification only, not implemented
**Type:** Governance / tooling specification
**Date:** 2026-08-28
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Scope:** Specification only — no executable code is written or changed by this document

---

## 1. Purpose

The Gate Runner is a proposed single local CLI entry point that would coordinate the three existing, standalone approval-pack tools under one dispatcher, instead of a human needing to remember three separate script paths (`suggest-gate-id.mjs`, `fill-gate-template.mjs`, `validate-gate-request.mjs`) and how to pipe them together.

Coordinating those tools does not change the underlying safety model. Everything the Gate Runner would produce is still a draft. It does not perform the action the draft describes, and it does not replace the explicit, per-gate human approval this whole approval-pack has been built around (`ops/agents/HOUSEMASTER_GCP_GATE_AGENT_OPERATING_MODEL.md` §2). See that document's §16 "Approval-Pack Template & Tool Mapping" for how the three existing tools already relate to each gate type and template.

## 2. Non-goals (v0.1)

- **Not an implementation.** This document defines the intended interface and behavior. No code for a Gate Runner is written in this task.
- **v0.1 is draft-only.** It must not execute `git push`, `git commit`, `terraform`, any deploy command, any DB/Prisma command, or access any Secret Manager payload — in any mode.
- **Does not merge commit and push.** They remain two separate gates requiring two separate, explicit approvals, exactly as today.
- **Does not auto-progress.** No mode chains into another mode, another gate, or another approval without a fresh, human-issued command.
- **Does not implement `pnpm hm:gate`** or any `package.json` script. If a Gate Runner is ever built, v0.1 would be invoked directly as a node script under `sprints/04_RUNBOOKS/tools/` — the same way the three existing tools are invoked today. Wiring it into `package.json` would be a separate, later, separately-approved task.
- **Does not wire into any hook, chat interception, or CI step.**
- **Does not change any existing tool's logic.** A Gate Runner implementation would call `suggest-gate-id.mjs`, `fill-gate-template.mjs`, and `validate-gate-request.mjs` as they exist today (or reimplement equivalent read-only logic) — it would not modify them.

## 3. Relationship to existing tools

| Mode | Wraps / composes |
|---|---|
| `suggest-id` | `suggest-gate-id.mjs` |
| `fill` | `fill-gate-template.mjs` |
| `validate` | `validate-gate-request.mjs` |
| `draft-commit-gate` | `fill-gate-template.mjs --template COMMIT_GATE` → `validate-gate-request.mjs --template commit` |
| `draft-push-gate` | `fill-gate-template.mjs --template PUSH_GATE` → `validate-gate-request.mjs --template push` |
| `closeout-draft` | `TEMPLATE_GATE_CLOSURE_RECORD.md` shape — no existing tool fills this template yet (see §4.6) |

## 4. Supported modes (v0.1)

### 4.1 `suggest-id`

Wraps `suggest-gate-id.mjs` directly. Input: `--list`, or `--prefix <ID_PREFIX>`. Output: the same list or "suggested next number" text the underlying tool already produces, still explicitly marked as needing human confirmation. Creates no file, same as today.

### 4.2 `fill`

Wraps `fill-gate-template.mjs` directly. Input: `--template <COMMIT_GATE|PUSH_GATE>` plus that template's required flags (`--what`, and for `COMMIT_GATE`, `--target`/`--commit-message`). Output: the filled request text to stdout, including the mandatory "generated approval request" disclaimer line. Never executes the generated request.

### 4.3 `validate`

Wraps `validate-gate-request.mjs` directly. Input: `--template <template-id>` plus a request file or stdin. Output: the same PASS/FAIL hard-rule report the underlying tool already produces.

### 4.4 `draft-commit-gate`

Composite convenience mode: runs `fill --template COMMIT_GATE` with the given flags, then pipes the result into `validate --template commit`, printing both the filled request and the validation result together. Still produces a draft only — never stages, commits, or pushes. If validation fails (most commonly: an unfilled `Forbidden:`-section placeholder, the recurring case seen throughout this session), it reports the failure and stops. It does not guess or auto-fill a hard-stop line — that substitution stays a human decision, matching how every commit/push gate in this session has actually been closed.

### 4.5 `draft-push-gate`

Same composite shape as `draft-commit-gate`, for `PUSH_GATE` / `validate --template push`. Never runs `git push` under any circumstance in v0.1.

### 4.6 `closeout-draft`

Drafts a `TEMPLATE_GATE_CLOSURE_RECORD.md`-shaped request (either its successful-closure form or its containment-record form) from CLI-supplied facts, for a human to review before it's used to actually update a gate document.

**v0.1 open question, not resolved by this spec:** no existing tool fills this template today — `fill-gate-template.mjs`'s `fill-rules.json` currently supports only `COMMIT_GATE` and `PUSH_GATE` (see `sprints/04_RUNBOOKS/tools/README.md` "Tool 2"). Building `closeout-draft` would need either (a) extending `fill-gate-template.mjs`/`fill-rules.json` to cover this template, as its own separately-approved task, or (b) separate drafting logic specific to this mode. This document intentionally does not choose between those — it records the mode's intended interface and output shape only. Output is a draft only; it never updates the target gate document itself.

## 5. Cross-cutting rules (apply to every mode)

- **Draft-only, end to end.** No mode of the Gate Runner, in v0.1, ever runs `git push`, `git commit`, `terraform`, a deploy command, a DB/Prisma command, or accesses a Secret Manager payload.
- **Explicit human approval, always.** Every generated gate (from `fill`, `draft-commit-gate`, `draft-push-gate`, or `closeout-draft`) still requires explicit human approval before any command inside it is run — per `ops/agents/HOUSEMASTER_GCP_GATE_AGENT_OPERATING_MODEL.md` §2, and matching this session's actual workflow throughout.
- **Commit and push stay separate.** No mode combines them into a single approval or a single execution.
- **No automatic next-gate progression.** Each invocation is a single, human-initiated, single-purpose draft request; nothing chains automatically into another mode or another gate.
- **Same hard rules, not redefined.** Any validation a Gate Runner performs reuses the Forbidden-list hard rules already defined in `sprints/04_RUNBOOKS/tools/hard-rules.json` — this spec does not redefine or weaken them.

## 6. Out of scope for v0.1 (candidates for later, separately-approved work)

- Actual implementation — this is a specification-only task.
- Wiring into `package.json` (`pnpm hm:gate` or any other script name) — deliberately not done here; proposing it later is its own separately-approved task, consistent with the operating model's automation constraints (§3 "Forbidden automation").
- Support for the remaining four templates (`TEMPLATE_EXECUTION_GATE.md`, `TEMPLATE_SECRET_EXECUTION_GATE.md`, `TEMPLATE_ENDPOINT_IAM_RETEST_CYCLE.md`, `TEMPLATE_DOCS_ONLY_GATE.md`) in `fill`/`draft-*`-style modes — v0.1 only covers what `fill-gate-template.mjs` already supports (`COMMIT_GATE`, `PUSH_GATE`).
- Any hook, chat-interception, or CI wiring.

## 7. Readiness classification

Specification only. Not implemented. This document does not authorize building or running any Gate Runner code — a future implementation task requires its own separate, explicit approval gate.

## 8. Update — 2026-09-02: ENDPOINT_IAM_RETEST fill rule implemented

- The `ENDPOINT_IAM_RETEST` fill rule is now implemented in `sprints/04_RUNBOOKS/tools/fill-rules.json`, per `sprints/04_RUNBOOKS/TEMPLATE_FILL_HELPER_SPEC_V0.md` §5.1.
- It has passed a render + hard-rule validator smoke test (`fill-gate-template.mjs --template ENDPOINT_IAM_RETEST` against fake example values, then `validate-gate-request.mjs --template endpoint-iam-retest` against the rendered output — both PASS).
- It remains standalone and not wired into `package.json`, hooks, chat, CI, or `pnpm hm:gate` — this update does not change §4.2's mode list or the `fill` mode's own passthrough behavior; a `gate-runner.mjs` mode wrapping `fill --template ENDPOINT_IAM_RETEST` is not implemented by this note.
- Other template-fill candidates (`DOCS_ONLY_GATE`, `EXECUTION_GATE`, `SECRET_EXECUTION_GATE`, `GATE_CLOSURE_RECORD` — see `TEMPLATE_FILL_HELPER_SPEC_V0.md` §5.2–§5.3) remain future work and require their own separate, explicit approval before implementation.
