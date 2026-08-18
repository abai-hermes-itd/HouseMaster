# HOUSEMASTER GCP Gate MCP Concept / Operating Model

**Status:** Concept / Operating Model  
**Type:** Read-only MCP concept  
**Project:** HouseMaster GCP Runtime Integration  
**Repository:** C:\Abay-Germes\HouseMaster  
**Purpose:** Reduce manual screenshot/status handoff friction between Claude Code, ChatGPT, and future agents without creating an autonomous DevOps agent.

---

## 1. Mission

HouseMaster GCP Gate MCP is a proposed local MCP server for producing structured, machine-readable repo, gate, diff, and handoff reports during controlled HouseMaster GCP execution.

Its mission is to answer:

> Where are we, what changed, what is allowed, what is forbidden, and what is the next safe step?

It must not execute infrastructure, secrets, database, deployment, or approval decisions.

---

## 2. Problem being solved

The current workflow depends heavily on screenshots, copied terminal output, and manual interpretation of Claude Code state.

This creates friction:

- status is fragmented across terminal screenshots;
- long logs are hard to review;
- approvals depend on manually reading command prompts;
- session handoff requires repeated reconstruction;
- hidden risks include accidental `.env`, secret, Terraform, gcloud, Prisma, or DB exposure.

The MCP should produce compact structured reports instead of relying only on screenshots.

---

## 3. Role in the HouseMaster GCP workflow

The MCP acts as a local read-only reporting bridge between:

- the real repository on disk;
- Claude Code CLI;
- ChatGPT as architect/orchestrator;
- the user as approval authority;
- future agent workflows.

It does not replace Claude Code.  
It does not replace ChatGPT.  
It does not approve actions.  
It does not execute live infrastructure changes.

---

## 4. Non-goals

This MCP is not:

- an autonomous DevOps agent;
- a deployment bot;
- a Terraform executor;
- a Secret Manager accessor;
- a Prisma migration runner;
- a database client;
- a hidden approval system;
- a replacement for human approval.

---

## 5. Core principle: Gate State Reporter, not DevOps Executor

The MCP may observe and report.

It must not decide or execute high-risk operations.

Allowed posture:

> read, summarize, classify, report.

Forbidden posture:

> approve, apply, deploy, mutate, migrate, access secrets.

---

## 6. Actors and responsibility model

### User

The user is the project owner and approval authority.

The user approves or rejects each gate.

### ChatGPT

ChatGPT is the architect, orchestrator, reviewer, and risk controller.

ChatGPT interprets MCP reports and prepares safe next-step instructions.

### Claude Code

Claude Code is the local technical executor inside:

```text
C:\Abay-Germes\HouseMaster
```

Claude Code may call MCP tools, but it must still respect gate rules.

### HouseMaster GCP Gate MCP

The MCP provides structured local status and handoff data.

It must be read-only in v0.1.

### Optional future agents

Future agents may consume MCP JSON reports, but they must not receive authority to approve or execute forbidden actions.

---

## 7. Read-only first architecture

Version 0.1 must be read-only.

It may read:

- git status;
- git branch;
- git HEAD;
- git log;
- explicit diffs;
- sprint/gate markdown files;
- known safe metadata files.

It must not read:

- `.env`;
- secret files;
- credential files;
- database payloads;
- Secret Manager payloads.

---

## 8. Proposed MCP tools v0.1

### hm_repo_status

Returns branch, HEAD, origin alignment, tracked status, staged files, modified files, and untracked files.

### hm_gate_status

Returns current sprint/gate status based on sprint documents and known gate files.

### hm_diff_summary

Summarizes git diff for explicit approved files only.

### hm_handoff_report

Produces a markdown handoff report for another session or agent.

---

## 9. Future MCP tools v0.2+

### hm_secret_scan_summary

Scans approved output/diff text for secret-looking patterns without printing the secret itself.

### hm_command_result_wrapper

Wraps command result summaries into structured JSON.

### hm_gate_policy_check

Checks whether a proposed command is allowed, forbidden, or requires explicit approval.

---

## 10. Strict forbidden actions

The MCP must never run:

```text
terraform apply
terraform destroy
gcloud secrets versions access
prisma migrate deploy
psql
database mutation queries
deployment commands
secret payload reads
```

The MCP must never:

```text
read .env
print DATABASE_URL
print passwords
auto-approve gates
push code automatically
deploy automatically
```

---

## 11. Safe command allowlist for v0.1

Allowed read-only commands:

```bash
git status --short
git branch --show-current
git rev-parse HEAD
git log --oneline --decorate -10
git diff --stat
git diff -- <explicit-approved-files-only>
```

Any command outside the allowlist requires explicit review.

---

## 12. Data contract examples

### repo_status JSON

```json
{
  "branch": "feat/hm-gcp-003d-cloud-sql-import",
  "head": "39a9e3d",
  "origin_aligned": true,
  "tracked_clean": true,
  "modified_files": [],
  "staged_files": [],
  "untracked_files": [],
  "risk_flags": []
}
```

### gate_status JSON

```json
{
  "current_sprint": "HM-GCP-004",
  "current_gate": "HM-GCP-004X-3B",
  "closed_gates": [
    "HM-GCP-004X-1",
    "HM-GCP-004X-2",
    "HM-GCP-004F",
    "HM-GCP-004F-1",
    "HM-GCP-004X-3A",
    "HM-GCP-004X-3"
  ],
  "blocked_until": "positive app-level DB proof",
  "next_allowed_step": "HM-GCP-004X-3B implementation/build/deploy/call sequence"
}
```

### handoff_report Markdown

```markdown
# HOUSEMASTER GCP SESSION HANDOFF

Branch:
HEAD:
Origin:
Tracked status:
Current gate:
Closed gates:
Open risks:
Next safe step:
Forbidden actions:
```

---

## 13. Secret-handling model

The MCP must treat secrets as toxic data.

It may report:

```json
{
  "secret_detected": true,
  "secret_printed": false,
  "action": "stop_and_redact"
}
```

It must not print the actual secret.

Forbidden patterns include:

- DATABASE_URL;
- password values;
- service account keys;
- Secret Manager payloads;
- `.env` contents.

---

## 14. Gate lifecycle model

Each gate has a lifecycle:

```text
proposed
approved
executed
verified
documented
committed
pushed
closed
```

The MCP may report the lifecycle state.

It must not advance the lifecycle by itself.

---

## 15. How Claude Code would use this MCP

Claude Code may call:

```text
hm_repo_status
hm_gate_status
hm_diff_summary
hm_handoff_report
```

Then Claude Code can produce a compact report instead of asking the user to send screenshots.

Claude Code remains subject to explicit approvals.

---

## 16. How ChatGPT would consume the MCP output

ChatGPT can read pasted JSON or markdown reports from the MCP.

ChatGPT uses those reports to decide:

- whether the working tree is clean;
- whether HEAD and origin are aligned;
- whether a gate is safe to continue;
- whether a command is forbidden;
- what next instruction to give Claude Code.

---

## 17. Why this is not a direct “send to another AI” feature

MCP does not magically stream Claude Code terminal state into ChatGPT.

It provides structured output that can be copied, saved, passed to another tool, or consumed by another MCP-aware system.

This is a bridge, not a universal agent messaging bus.

---

## 18. Minimal local architecture

```text
C:\Abay-Germes\HouseMaster
└─ ops
   └─ mcp
      ├─ HOUSEMASTER_GCP_GATE_MCP_CONCEPT.md
      └─ housemaster-gcp-gate-mcp
         ├─ README.md
         ├─ package.json
         ├─ src
         │  ├─ server.ts
         │  └─ tools
         │     ├─ repoStatus.ts
         │     ├─ gateStatus.ts
         │     ├─ diffSummary.ts
         │     └─ handoffReport.ts
         └─ policies
            ├─ forbiddenCommands.ts
            ├─ secretPatterns.ts
            └─ gateRules.ts
```

The folder above is future architecture only.  
This concept document does not create MCP server code.

---

## 19. Suggested folder structure

For concept stage:

```text
ops/mcp/HOUSEMASTER_GCP_GATE_MCP_CONCEPT.md
```

For future implementation:

```text
ops/mcp/housemaster-gcp-gate-mcp/
```

---

## 20. Phased roadmap

### HM-MCP-001

Concept / Operating Model only.

### HM-MCP-002

Read-only MCP skeleton.

### HM-MCP-003

Repo status tool.

### HM-MCP-004

Gate status and handoff report.

### HM-MCP-005

Diff summary and secret scanner.

---

## 21. Approval model

Every non-read-only expansion requires explicit approval.

The MCP cannot approve:

- Terraform;
- gcloud;
- Secret Manager;
- Prisma migrate;
- DB operations;
- deploys;
- code changes.

The user remains the only approval authority.

---

## 22. Open questions

- Should the MCP be local-only or optionally remote?
- Should it read sprint files directly or use a structured gate registry?
- Should it support JSON schema validation?
- Should secret scanning run on every diff summary?
- Should command allowlists be hardcoded or configured?
- Should future agents consume MCP output directly or via markdown handoff files?

---

## 23. Readiness classification

This document is concept-only.

No MCP server code is created.  
No package.json is created.  
No TypeScript files are created.  
No app code is modified.  
No Terraform is modified.  
No gcloud command is run.  
No Prisma command is run.  
No database query is run.  
No `.env` file is read.  
No secrets are accessed or printed.

Current readiness:

```text
HM-MCP-001: Concept ready for review
HM-MCP-002: Not started
```
