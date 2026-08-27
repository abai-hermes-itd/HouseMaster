# Template — Execution Gate (non-secret)

**Maps to:** `HOUSEMASTER_GCP_GATE_AGENT_OPERATING_MODEL.md` §4 "Execution gate", §5 hard-forbidden list

**Use when:** running one or more approved, read-only or infrastructure-adjacent commands that do **not** touch Secret Manager, a password, or `DATABASE_URL`. Examples from Sprint 4: `gcloud run services describe`, `gcloud sql instances describe`, `gcloud sql instances list`, `git log`/`git status`.

For anything that touches a secret, password, or `DATABASE_URL`, use `TEMPLATE_SECRET_EXECUTION_GATE.md` instead — it carries additional hard rules this template does not.

---

## Fill-in-the-blank request

```
Approved: run <WHAT THIS CHECKS/DOES>.

Goal:
<ONE SENTENCE — what this confirms or produces>

Allowed:
<EXACT_COMMAND_1>
<EXACT_COMMAND_2>
git status --short

Forbidden:
- do not access Secret Manager payload
- do not print or request password
- do not change Cloud SQL password
- do not update secrets
- do not deploy
- do not run terraform
- do not run DB queries/mutations
- do not call the application endpoint
- do not proceed to <NEXT_GATE_ID>

Report:
- <RESULT FIELD 1>
- <RESULT FIELD 2>
- next safe step
```

## Agent obligations while executing this template

1. Run **only** the commands listed under `Allowed:` — verbatim, in order. Do not substitute an equivalent command or add flags not shown.
2. If a listed command fails for an environment reason unrelated to the task (auth expired, tool missing, permission denied), stop and report the failure plainly — do not silently work around it with an unapproved alternative (e.g. do not escalate to installing new tooling or downloading a binary without a fresh, explicit approval — see the `HM-GCP-004X-4` preflight history for why: an admin-rights failure on `gcloud components install` led to a separate, explicit `AskUserQuestion` before a standalone binary download was attempted).
3. Never construct a command whose arguments would require typing a secret value — if the task appears to need one, stop and re-route to `TEMPLATE_SECRET_EXECUTION_GATE.md`.
4. Report exactly the fields requested — do not editorialize beyond what's needed to explain a surprising result.
5. Do not chain into a next gate automatically, even if the result looks like an obvious green light.

## Worked example (from this session)

```
Check current git and Cloud Run deploy state read-only.

Allowed:
git status --short
git log --oneline --decorate -10
git rev-parse HEAD
git rev-parse origin/feat/hm-gcp-003d-cloud-sql-import
gcloud run services describe next-web --region=europe-west1 --project=housemaster-dev-503409 --format="value(status.latestReadyRevision,status.traffic[0].revisionName,status.traffic[0].percent,status.url)"
gcloud run revisions list --service=next-web --region=europe-west1 --project=housemaster-dev-503409 --limit=5 --format="table(metadata.name,status.conditions[0].status,metadata.creationTimestamp,status.imageDigest)"

Report:
- current HEAD
- origin HEAD
- whether <commit> is pushed
- latest Cloud Run revision
- traffic 100% revision
- next safe step

Do not push.
Do not deploy.
Do not call /api/health/db.
Do not modify IAM.
Do not run terraform.
Do not read .env.
Do not access or print secrets.
```
