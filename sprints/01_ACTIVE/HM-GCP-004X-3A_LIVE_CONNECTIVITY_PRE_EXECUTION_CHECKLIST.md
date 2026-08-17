# HM-GCP-004X-3A — Live Connectivity Test Pre-Execution Checklist

**Status:** Proposed
**Type:** Pre-execution checklist / Sprint 4 DB Runtime Activation
**Date:** 2026-08-17
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Current baseline:** `7b06ac3`
**Scope:** Pre-execution checklist only — no live test performed in this task

---

## Current baseline

```
HEAD / origin: 7b06ac3 (aligned)
```

## Prerequisite gate status

```
- HM-GCP-004X-1: CLOSED — database-url version 4, ENABLED
- HM-GCP-004X-2: CLOSED — next-web-00004-4zk, Ready=True, traffic 100%
- HM-GCP-004F:   CLOSED — drift classified (labels: introduced by 004X-2; scaling: pre-existing, inert, safe to defer)
- HM-GCP-004F-1: RECORDED — decision note: Option 2 (labels) + Option 3-as-ignore (scaling) recommended, not selected/implemented
- terraform apply: STILL FORBIDDEN — no fix option approved
```

All prerequisites from `HM-GCP-004D_LIVE_CONNECTIVITY_TEST_PLAN.md`'s approval gates (confirming the Secret Manager update and Cloud Run revision refresh have executed) are satisfied — both actually executed and were independently verified in this session.

---

## Purpose of HM-GCP-004X-3

Verify **only** that the live Cloud Run service (`next-web`, revision `next-web-00004-4zk`) can successfully reach Cloud SQL (`housemaster-db`) through the Unix socket connector, using `database-url` version 4. Nothing else.

---

## Allowed future test scope

Per HM-GCP-004D's "Preferred test shape":

**Option A — existing app logs/status (preferred):**
- Read Cloud Run logs for Prisma connection success/failure messages since revision `next-web-00004-4zk` started.
- `gcloud run services describe` / `gcloud run revisions describe` to reconfirm `Ready=True` (metadata only, no payload).
- No code changes required.

**Option B — minimal health endpoint (only if separately approved, separate code-change task):**
- Not in scope for this checklist or for a first HM-GCP-004X-3 attempt — would require its own approval gate before implementation, per HM-GCP-004D.

Read-only against the database only (e.g., a `SELECT 1`-equivalent already exercised implicitly by app startup/logs) — no writes, no schema changes, no migrations.

---

## Forbidden actions

- Running `terraform` (plan or apply)
- Running `prisma migrate deploy`, `prisma db push`, `prisma db pull`, or any Prisma command
- Running manual SQL or any DB query beyond what the app itself already performs at connection time
- Reading or printing `.env`
- Accessing or printing secret payload, password, or unmasked `DATABASE_URL`
- Mutating any data
- Deploying application code
- Cloud Build
- Staging, committing, or pushing
- Automatically proceeding to any further gate

---

## Expected success signal

- Cloud Run logs show a successful Prisma/DB connection message (or absence of connection-error messages) following revision `next-web-00004-4zk`'s startup
- `gcloud run revisions describe next-web-00004-4zk` (or `services describe`) confirms `Ready=True` still holds
- No secret payload, password, or unmasked `DATABASE_URL` appears anywhere in logs or output
- No error, timeout, or authentication-failure signal in logs

---

## Stop conditions

Stop immediately and do not proceed further if:
- Logs show a connection failure of any kind (auth error, socket path error, permission error, timeout, Prisma adapter error) — classify per HM-GCP-004D's failure-handling table, report, and wait for separate approval before any remediation
- Any command would print secret payload, password, or unmasked `DATABASE_URL`
- Any command would require `.env`
- Scope drifts toward Option B (health endpoint) or any code change without separate approval
- Scope drifts toward `terraform apply`, Prisma migration, or manual SQL

---

## Report template

```
HM-GCP-004X-3 execution result:
- baseline HEAD/origin: <commit>
- target revision checked: next-web-00004-4zk
- revision Ready=True confirmed: yes/no
- connection signal observed: success / failure / inconclusive
- error category (if failure): auth / socket path / permission / timeout / prisma adapter / none
- secret payload accessed: no
- password/DATABASE_URL printed: no
- .env read: no
- data mutated: no
- migration run: no
- terraform touched: no
- commit/push: no
- next allowed step: <e.g. HM-GCP-004E gate, or remediation gate if failure>
```

---

## Non-goals

This task does not:
- run the live connectivity test
- run `terraform`
- run `gcloud` beyond git status/log-equivalent checks
- run Prisma
- run DB queries
- read `.env`
- access or print secrets
- stage, commit, or push
- proceed to HM-GCP-004X-3 execution

---

## Readiness classification

Checklist only.
Actual live connectivity test remains blocked until explicit future approval.
