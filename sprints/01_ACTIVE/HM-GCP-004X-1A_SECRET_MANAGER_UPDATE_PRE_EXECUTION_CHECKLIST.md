# HM-GCP-004X-1A — Secret Manager Update Pre-Execution Checklist

**Status:** Proposed
**Type:** Pre-execution checklist / Sprint 4 DB Runtime Activation
**Date:** 2026-08-16
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Current baseline:** `6623b67`
**Scope:** Pre-execution checklist only

---

## Context

Sprint 4 planning layer HM-GCP-004A through HM-GCP-004E is complete.

This checklist prepares HM-GCP-004X-1 Secret Manager update execution.

No secret update is performed in this task.

---

## Gate objective

Prepare the approval checklist for adding a new Secret Manager version for `database-url`.

---

## Required target values

| Field | Value |
|-------|-------|
| Project | `housemaster-dev-503409` |
| Secret | `database-url` |
| DB user | `housemaster` |
| DB name | `housemaster` |
| Instance connection name | `housemaster-dev-503409:europe-west3:housemaster-db` |

Masked URL format:

```
postgresql://housemaster:***@localhost/housemaster?host=/cloudsql/housemaster-dev-503409:europe-west3:housemaster-db
```

---

## Strict secret handling

The real password and full DATABASE_URL must never appear in:

- chat
- screenshots
- git
- logs
- markdown
- reports
- terminal output

Only the masked URL form may be reported.

---

## Execution prerequisites

Before actual HM-GCP-004X-1 execution, the operator must confirm:

- [ ] Active `gcloud` project is `housemaster-dev-503409`
- [ ] Target secret `database-url` exists
- [ ] Local password is available to operator only
- [ ] No `.env` will be read
- [ ] Temporary payload strategy is approved (file or stdin)
- [ ] Old versions will not be disabled in this gate
- [ ] No Cloud Run refresh will be performed in this gate
- [ ] No DB connectivity test will be performed in this gate

---

## Allowed future execution scope

- Only add a new Secret Manager version for `database-url`
- Only metadata-only verification after that

---

## Forbidden in actual HM-GCP-004X-1 unless separately approved

- Access secret payload
- Print DATABASE_URL
- Print password
- Read `.env`
- Disable old secret versions
- Refresh Cloud Run
- Deploy Cloud Run
- Run Terraform
- Run Prisma migrate
- Run live DB query
- Commit or push

---

## Metadata-only verification

Future execution may verify:

- new version number
- ENABLED state
- create time

But must not run secret payload access.

---

## Stop conditions

Stop immediately if any command would:

- expose secret payload
- read `.env`
- alter Cloud Run
- run Terraform
- run Prisma
- disable old versions

---

## Report template

```
HM-GCP-004X-1A checklist result:
- checklist created: yes
- target project: housemaster-dev-503409
- target secret: database-url
- masked URL format confirmed: yes
- no secret values accessed: yes
- no forbidden commands run: yes
- ready for separate HM-GCP-004X-1 approval: yes/no
```

---

## Readiness classification

Checklist only.
Actual Secret Manager update remains blocked until explicit future approval.
