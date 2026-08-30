# HM-GCP-004D — Live Connectivity Test Plan

**Status:** Proposed
**Type:** Operational plan / Sprint 4 DB Runtime Activation
**Date:** 2026-08-16
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Current baseline:** `2cb6f2a`
**Scope:** Live DB connectivity test planning only

---

## Context

Previous Sprint 4 tasks established the prerequisites:

- HM-GCP-004A — DATABASE_URL Unix socket format decision
- HM-GCP-004B — Secret Manager update runbook
- HM-GCP-004C — Cloud Run revision refresh plan

After the Secret Manager update and Cloud Run revision refresh are completed in future approved tasks, the application must be tested for live Cloud SQL connectivity.

This task creates the test plan only. It does not run any live test.

---

## Goal

Define how to verify that the Cloud Run application (`next-web`) can reach Cloud SQL (`housemaster-db`) through the Unix socket path after the future secret update and revision refresh.

---

## Non-goals

This task does not:

- update Secret Manager
- refresh Cloud Run
- run `prisma migrate deploy`
- change the database schema
- mutate any data
- run `gcloud`, Terraform, or Cloud Build
- read or print secrets, passwords, or DATABASE_URL
- deploy application code

---

## Approval gates

Before any future live connectivity test, explicit approval is required for:

- the exact endpoint or command to be used
- confirmation that no secret payload will be printed
- target service: `next-web`
- project: `housemaster-dev-503409`
- region: `europe-west1`
- confirmation that the Secret Manager update (HM-GCP-004B) has been executed
- confirmation that the Cloud Run revision refresh (HM-GCP-004C) has been executed

---

## Safe test principle

- Metadata and health checks first — confirm the revision is running before any DB test.
- The connectivity test must not expose the password or DATABASE_URL in logs, output, or responses.
- The test must be read-only against the database (e.g., `SELECT 1` or Prisma connection check).
- No data writes, schema changes, or migration operations during the connectivity test.

---

## Preferred test shape

**Option A — Existing app logs/status (preferred if sufficient):**

- Check Cloud Run logs for Prisma connection success/failure messages after revision startup.
- Use `gcloud run services describe` to confirm revision health (Ready=True).
- No code changes required.

**Option B — Minimal server-side health endpoint (only if separately approved):**

- Add a `/api/health/db` endpoint that performs a lightweight Prisma query (e.g., `prisma.$queryRaw(SELECT 1)`).
- Returns `{ "status": "ok" }` or `{ "status": "error", "message": "<safe error>" }`.
- Must not expose connection string, password, or internal details.
- Requires a separate approved code change task before implementation.

No option is executed in this task.

---

## Validation after future test

After the future connectivity test, verify:

- Cloud Run revision is Ready=True
- no secret leakage in Cloud Run logs
- connection success or failure is captured and reported
- no migration was run
- no data was mutated
- error messages (if any) do not contain passwords or connection strings

---

## Failure handling

If the future connectivity test fails, the operator must:

1. **Stop** — do not retry by changing secrets blindly.
2. **Classify the error:**
   - Authentication error — verify PostgreSQL user/password in Secret Manager (metadata only).
   - Socket path error — verify Cloud SQL instance connection name and `/cloudsql` mount.
   - Permission error — verify `sa-web-dev` has `roles/cloudsql.client`.
   - Timeout — verify Cloud Run ↔ Cloud SQL VPC/connector configuration.
   - Prisma adapter error — verify `@prisma/adapter-pg` version compatibility.
3. **Report** the error category and safe error message (no secrets).
4. **Do not** change DATABASE_URL format, secret values, or app code without separate approval.

---

## Follow-up tasks

1. HM-GCP-004E — controlled prisma migrate deploy runbook

---

## Readiness classification

Plan only.
Ready for review and commit.
Actual live connectivity test remains blocked until explicit future approval.
