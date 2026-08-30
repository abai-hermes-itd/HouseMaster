# Template — Docs-Only Gate

**Maps to:** `HOUSEMASTER_GCP_GATE_AGENT_OPERATING_MODEL.md` §4 "Docs-only gate", §7 "Standard docs-only workflow"

**Use when:** creating or editing one approved markdown file — no commands beyond `git status`/`git diff` verification.

---

## Fill-in-the-blank request

```
Update/Record <WHAT> in <TARGET_FILE>.

Target:
<TARGET_FILE>

Record:
- <FACT 1>
- <FACT 2>
- <FACT N>

Allowed:
- update target file only
- git status --short
- git diff

Forbidden:
no Secret Manager payload, no password, no Cloud SQL change, no secret update,
no endpoint call, no deploy, no terraform, no DB mutation/queries,
no prisma migrate deploy, no <NEXT_GATE_ID> execution.

Report:
- file created/updated
- exact fact(s) recorded
- next safe step
```

## Agent obligations while executing this template

1. Preflight: `git status --short` — stop if unrelated tracked changes already exist (operating model §7.2).
2. Edit only `<TARGET_FILE>`. Do not touch any other file, including sibling sprint docs, even if closely related.
3. After editing: `git status --short` and `git diff -- <TARGET_FILE>` — confirm the diff contains only the requested facts, no secret-shaped strings (connection strings, `postgresql://`, anything resembling a password).
4. Do not stage or commit unless a separate Commit Gate request follows (see `TEMPLATE_COMMIT_GATE.md`).
5. Report using the fields the request asked for — do not add unrequested narrative sections to the sprint doc itself.

## Worked example (from this session)

```
Record HM-GCP-004X-3B current finding: DB health reaches Postgres but fails password auth.

Context:
- Live revision: next-web-00009-jzn
- /api/health/db returned HTTP_STATUS:500
- Cloud Run logs show: PrismaClientKnownRequestError, code P2010, Postgres code 28P01,
  password authentication failed for user "housemaster"
- No DATABASE_URL or password was printed.
- IAM rollback is clean.
- This confirms network/socket/Auth.js layers are working and failure is credential mismatch.

Allowed:
- update/create a sprint note documenting this finding
- git diff
- git status --short

Forbidden:
- do not access Secret Manager payload
- do not print or request password
- do not change Cloud SQL password
- do not update database-url secret
- do not call /api/health/db again
- do not deploy
- do not run terraform
- do not run DB queries
- do not proceed to HM-GCP-004X-4

Report:
- file updated
- exact finding recorded
- whether HM-GCP-004X-3B remains blocked
- recommended next gate
```
