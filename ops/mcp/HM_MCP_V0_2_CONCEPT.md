# HOUSEMASTER GCP Gate MCP — v0.2 Concept

**Status:** Concept — proposed, not implemented, not yet approved for build
**Type:** Read-only MCP concept (extension of v0.1)
**Project:** HouseMaster GCP Runtime Integration
**Repository:** C:\Abay-Germes\HouseMaster
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Purpose:** Extend the closed HM-MCP v0.1 tool set (`hm_repo_status`, `hm_gate_status`, `hm_diff_summary`, `hm_handoff_report`) with the three tools already named as "Future MCP tools v0.2+" in `HOUSEMASTER_GCP_GATE_MCP_CONCEPT.md` §9, now specified in enough detail to be reviewed and approved (or rejected/amended) before any implementation gate is opened.

---

## 1. Relationship to v0.1

This document does not replace `HOUSEMASTER_GCP_GATE_MCP_CONCEPT.md`. Every principle in that document (§1–§7, §10, §13, §14, §17, §21) still applies unchanged: Gate State Reporter posture, read-only-first architecture, strict forbidden actions, secret-handling model, "not a direct send-to-another-AI feature," and the user as sole approval authority.

This document only:
- specifies the three v0.2 tools the v0.1 doc named but did not detail;
- folds in the rules from `sprints/04_RUNBOOKS/GATE_SAFETY_POLICY_V0.md` (adopted here as binding on this concept, per that policy's own §13 "How this policy constrains future MCP tools" — noting that policy document's own status is still "Proposed" as of this writing, so both remain concepts pending approval);
- proposes a phased roadmap continuation (HM-MCP-007+) for if/when a build gate is separately opened.

It creates no MCP server code, no `package.json`, no TypeScript files, no hook, and no automation wiring. It does not modify `ops/mcp/housemaster-gcp-gate-mcp/` in any way.

---

## 2. Why these three tools, in this order

HM-MCP v0.1's closure report (`ops/mcp/HM_MCP_V0_1_CLOSURE_REPORT.md`) lists both "Resume the GCP deploy track" and "Start MCP v0.2" as independent, unstarted next options awaiting separate approval. This document addresses only the second option's shape, without deciding whether or when either is actually started.

The three tools are read-only in nature and each closes a specific gap left open by v0.1:

| Tool | Gap it closes |
|---|---|
| `hm_secret_scan_summary` | v0.1's secret scan is embedded inline inside `hm_diff_summary` only; nothing lets a caller scan arbitrary approved text (e.g. a pasted command's stdout) independent of a diff |
| `hm_command_result_wrapper` | v0.1 has no standard shape for wrapping the result of a command a human already ran, into the same structured JSON style as the other tools |
| `hm_gate_policy_check` | v0.1 has no tool that classifies a *proposed* command against the allowlist/forbidden-list; today that classification is done manually against `GATE_SAFETY_POLICY_V0.md`/the operating model by a human or by Claude Code reading the docs |

---

## 3. Proposed MCP tools v0.2

### hm_secret_scan_summary

**Input:** an explicit block of text supplied by the caller (e.g. command stdout, a pasted log, a file's already-read content) — never a file path the tool reads itself.
**Behavior:** runs the same shared secret-pattern module v0.1 built for `hm_diff_summary` (`src/lib/secretPatterns.ts`, per HM-MCP-005) against the supplied text.
**Output:** a JSON verdict — never the secret itself.

```json
{
  "secret_detected": true,
  "secret_printed": false,
  "matched_pattern_types": ["database_url", "generic_password_assignment"],
  "action": "stop_and_redact"
}
```

When no match: `{"secret_detected": false, "action": "none"}`.

**Boundary:** identical to `hm_diff_summary`'s existing scan — reuses, does not reimplement, the pattern list. Never reads `.env`, never reads a file path directly, never returns the matched substring.

### hm_command_result_wrapper

**Input:** a command string (for labeling only, never executed by the tool) plus its already-captured stdout/stderr/exit-code, all supplied by the caller.
**Behavior:** normalizes that caller-supplied result into one structured JSON shape, optionally running it through `hm_secret_scan_summary` first if the caller opts in.
**Output:**

```json
{
  "command": "git status --short",
  "exit_code": 0,
  "stdout_summary": "10 untracked, 0 staged, 0 modified",
  "secret_scan": { "secret_detected": false, "action": "none" },
  "truncated": false
}
```

**Boundary:** this tool never runs a command. It only reshapes a result the caller already produced elsewhere (by hand, or via an already-approved execution gate). This is explicitly restated because it is the shape most likely to be misread as "the MCP now runs commands" — it does not.

### hm_gate_policy_check

**Input:** a single proposed command string, or a short list of proposed commands.
**Behavior:** checks each command, as a literal string match/pattern match, against:
- the v0.1 concept doc's §11 safe allowlist (read-only `git` commands);
- the v0.1 concept doc's §10 / Gate Safety Policy §5 strict-forbidden list (`terraform apply/destroy`, `gcloud secrets versions access`, `prisma migrate deploy`, `psql`, deployment commands, secret payload reads, `git push`/`git add`/`git commit` outside their own dedicated gates, etc.).
**Output:** a classification, never an execution and never an approval.

```json
{
  "command": "terraform apply",
  "classification": "forbidden",
  "reason": "matches strict-forbidden pattern: terraform apply/destroy",
  "requires_human_approval": true
}
```

Possible `classification` values: `allowed_readonly`, `requires_explicit_approval`, `forbidden`. There is no fourth value that means "auto-approved" — per Gate Safety Policy §5, "a `PASS`-style result means the rule set matched, nothing more," and this tool's own output can never itself constitute the approval it flags as required.

**Boundary:** this tool answers "what category is this command in," never "should this run." It must fail closed (`classification: "requires_explicit_approval"`) on any command it cannot confidently match to `allowed_readonly` or `forbidden`.

---

## 4. Strict forbidden actions (restated, unchanged from v0.1 §10 and Gate Safety Policy §5)

The three v0.2 tools above must never, individually or composed:

```text
run any command they classify, scan, or wrap
execute terraform apply / destroy
execute gcloud secrets versions access
execute prisma migrate deploy
execute psql or any database mutation query
execute any deployment command
read .env or any secret file
print DATABASE_URL, a password, or any secret payload
auto-approve a gate
push, commit, or stage anything
chain automatically into another tool or another gate
```

---

## 5. Safe command allowlist for v0.2 (unchanged from v0.1 §11)

```bash
git status --short
git branch --show-current
git rev-parse HEAD
git log --oneline --decorate -10
git diff --stat
git diff -- <explicit-approved-files-only>
```

None of the three v0.2 tools introduce a new command the MCP itself would run — all three operate on caller-supplied text/strings, not on live command execution. `hm_gate_policy_check` reads this allowlist as *reference data* to classify a command; it never executes anything from it.

---

## 6. Gate Safety Policy alignment

Per `GATE_SAFETY_POLICY_V0.md` §13, applied here explicitly:

- None of the three tools gain `git add`/`commit`/`push`, `gcloud`, `terraform`, or `prisma` capability as a side effect.
- None expose Secret Manager payloads, passwords, or `DATABASE_URL` — `hm_secret_scan_summary` only ever returns a boolean/classification, never the matched text.
- None collapse commit and push (n/a — none of the three touch git write operations at all).
- None chain gates — each remains a single, independently-callable, single-purpose tool.
- All three fail closed on ambiguous input (§2 principle 4): an unparseable command for `hm_gate_policy_check`, or an empty/missing text block for the other two, is a refusal with a stated reason, not a best-effort guess.
- This document, and any future build gate on top of it, does not gain broader filesystem/network/execution scope than v0.1 already has — the three tools operate on caller-supplied strings, not new read/write surface.

---

## 7. Phased roadmap (continuation)

v0.1 closed at HM-MCP-006 (`hm_handoff_report`). A build track for this concept, if separately approved, would continue the same numbering:

### HM-MCP-007 (proposed)
`hm_secret_scan_summary` implementation, reusing v0.1's `secretPatterns.ts`.

### HM-MCP-008 (proposed)
`hm_command_result_wrapper` implementation.

### HM-MCP-009 (proposed)
`hm_gate_policy_check` implementation, reusing this document's §4/§5 rule data.

No implementation gate for HM-MCP-007–009 is opened by this document. Each remains its own separately-approved task, per Gate Safety Policy §11 ("no automatic next-gate progression").

---

## 8. Open questions (carried forward / new)

- Should `hm_command_result_wrapper` require the caller to explicitly opt into the secret scan, or run it unconditionally on every wrap?

### Resolved (P6 decision gate, 2026-08-29)

- **`hm_gate_policy_check` rule-data source:** resolved — v0.1 will **not** read `GATE_SAFETY_POLICY_V0.md` or any policy file at build time or at call time. It uses only caller-supplied strings and an embedded minimal rule map (mirroring the `secretPatterns.ts` precedent), consistent with Gate Safety Policy v0.1. Trade-off accepted: the embedded map needs manual upkeep if the policy changes later, the same trade-off `hard-rules.json` already carries.
- **`GATE_SAFETY_POLICY_V0.md` adoption status:** resolved — the policy was formally adopted (commit `822ed31`, 2026-08-29; see its own Status line and §15). An HM-MCP-007+ build gate may now cite it as binding without qualification.
- **Build-gate granularity:** resolved — HM-MCP-007/008/009 will be implemented through **one combined build gate**, on the grounds that all three tools are small, independent, pure-function, read-only/draft-only modules under one target scope with no interdependency at the implementation level.

---

## 9. Readiness classification

This document is concept-only.

No MCP server code is created.
No `package.json` is created or modified.
No TypeScript files are created.
No existing file under `ops/mcp/housemaster-gcp-gate-mcp/` is modified.
No hook is created.
No `pnpm hm:gate` script is created or modified.
No Terraform is modified. No `gcloud` command is run. No Prisma command is run. No database query is run. No `.env` file is read. No secret is accessed or printed. No file is staged, committed, or pushed.

Current readiness:

```text
HM-MCP-007: Concept ready for review (this document)
HM-MCP-008: Concept ready for review (this document)
HM-MCP-009: Concept ready for review (this document)
```

Each requires its own separate, explicit approval to move from "concept" to "build gate opened," per Gate Safety Policy §11 and §21 of the v0.1 concept doc.
