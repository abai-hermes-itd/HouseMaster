# HM-GCP-004C — Cloud Run Revision Refresh Plan

**Status:** Proposed
**Type:** Operational plan / Sprint 4 DB Runtime Activation
**Date:** 2026-08-16
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Current baseline:** `c44c204`
**Scope:** Cloud Run revision refresh planning only

---

## Context

HM-GCP-004A fixed the target DATABASE_URL Unix socket format.
HM-GCP-004B defined the Secret Manager update runbook.

After a new `database-url` Secret Manager version is added, Cloud Run must be refreshed so a new revision reads the latest secret version.

This task creates the plan only. It does not update Cloud Run.

---

## Problem

Cloud Run services read environment variables and secret references at revision startup.
After a new Secret Manager version is added, the running revision may not automatically reload the new value.

A new Cloud Run revision is required to pick up the updated `database-url`.

---

## Decision

Cloud Run revision refresh must be performed as a separate explicitly approved operational step after the Secret Manager update.

The refresh must not be mixed with:

- Secret Manager update
- live DB connectivity test
- `prisma migrate deploy`
- Terraform apply
- app code changes

---

## Terraform ownership boundary

Cloud Run service is managed by Terraform.

Therefore, any future refresh method must respect Terraform ownership and avoid unmanaged drift where possible.

Before actual execution, the operator must choose one approved refresh path:

**Option A — Terraform-driven refresh:**

- preferred if Terraform has a safe revision trigger / variable / annotation mechanism
- requires `terraform plan` review
- requires explicit `terraform apply` approval

**Option B — gcloud revision refresh:**

- operational shortcut only if explicitly approved
- must be documented as temporary drift-risk action
- must be followed by Terraform drift check
- must not change service configuration beyond forcing a new revision

No option is executed in this task.

---

## Future refresh command template — do not run now

Example only. Do not execute in this task.

```bash
gcloud run services update next-web \
  --region=europe-west1 \
  --project=housemaster-dev-503409 \
  --update-labels=secret-refresh=YYYYMMDDHHMM
```

This is only a placeholder example. Final command must be approved later.

---

## Required approval gate

Before any actual refresh:

- confirm new `database-url` secret version exists
- confirm no secret payload is printed
- confirm target service is `next-web`
- confirm region is `europe-west1`
- confirm project is `housemaster-dev-503409`
- confirm whether Terraform-driven or gcloud-driven refresh is selected
- approve the exact command

---

## Validation after future refresh

After future refresh, verify metadata only:

- Cloud Run service has a new revision
- revision becomes Ready=True
- service keeps expected service account
- service keeps Cloud SQL mount/connector config
- no secret payload is printed
- no DB query is run in this step

Live DB connectivity remains a separate HM-GCP-004D task.

---

## Non-goals

This task does not:

- update Secret Manager
- refresh Cloud Run
- run `gcloud`
- run Terraform
- run Cloud Build
- deploy application code
- run live DB queries
- run `prisma migrate deploy`
- change DATABASE_URL
- read or print secrets

---

## Follow-up tasks

1. HM-GCP-004D — live connectivity test plan
2. HM-GCP-004E — controlled prisma migrate deploy runbook
3. Future approved execution task — Secret Manager update
4. Future approved execution task — Cloud Run revision refresh

---

## Readiness classification

Plan only.
Ready for review and commit.
Actual Cloud Run revision refresh remains blocked until explicit future approval.
