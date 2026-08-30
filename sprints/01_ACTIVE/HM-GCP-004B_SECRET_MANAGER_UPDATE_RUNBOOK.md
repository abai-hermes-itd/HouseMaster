# HM-GCP-004B — Secret Manager Update Runbook

**Status:** Proposed
**Type:** Operational runbook / Sprint 4 DB Runtime Activation
**Date:** 2026-08-16
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Current baseline:** `315533d`
**Scope:** Secret Manager update procedure only

---

## Context

HM-GCP-004A fixed the target Cloud Run runtime DATABASE_URL format:

```
postgresql://housemaster:<PASSWORD>@localhost/housemaster?host=/cloudsql/housemaster-dev-503409:europe-west3:housemaster-db
```

Masked report form:

```
postgresql://housemaster:***@localhost/housemaster?host=/cloudsql/housemaster-dev-503409:europe-west3:housemaster-db
```

This runbook defines how to add a new Secret Manager version for `database-url` safely.

---

## Non-goals

This runbook does not:

- update the secret during this task
- read or print the real password
- read `.env` files
- run `gcloud` during this task
- deploy Cloud Run
- run Terraform
- run live DB queries
- run `prisma migrate deploy`

---

## Required approval gate

Before executing this runbook later, explicit approval is required for:

- adding a new Secret Manager version for `database-url`
- entering the real database password locally
- disabling any old secret version
- refreshing Cloud Run revision
- running any live connectivity check

---

## Safe update principle

The real DATABASE_URL must never appear in:

- chat
- git
- terminal logs
- screenshots
- reports
- `.env` files
- markdown docs

Reports must only use the masked form.

---

## Proposed local execution model for future task

The future execution should use a local, temporary, non-committed secret payload file or stdin.

The operator must:

1. Build the DATABASE_URL locally using the real PostgreSQL password.
2. Add a new Secret Manager version for `database-url`.
3. Immediately delete any temporary local file if one was used.
4. Verify only secret metadata, not secret payload.
5. Report only the new version number and masked URL form.

---

## Future command template — do not run in this task

Example only. Do not execute now.

```bash
gcloud secrets versions add database-url --data-file=TEMP_SECRET_FILE --project=housemaster-dev-503409
```

---

## Future verification — metadata only

Future verification must use metadata-only checks.

Allowed future check examples:

- list versions and states
- confirm a new ENABLED version exists
- do not access secret payload
- do not print secret value

---

## Old versions policy

Do not disable old `database-url` versions in the same step unless separately approved.

Recommended sequence:

1. Add new version.
2. Confirm new version exists.
3. Refresh Cloud Run revision in separate approved task.
4. Run connectivity test in separate approved task.
5. Only then decide whether to disable old versions.

---

## Follow-up tasks

1. HM-GCP-004C — Cloud Run revision refresh plan
2. HM-GCP-004D — live connectivity test plan
3. HM-GCP-004E — controlled prisma migrate deploy runbook

---

## Readiness classification

Runbook only.
Ready for review and commit.
Actual Secret Manager update remains blocked until explicit future approval.
