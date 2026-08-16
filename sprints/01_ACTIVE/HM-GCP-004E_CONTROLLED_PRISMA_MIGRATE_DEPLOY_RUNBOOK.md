# HM-GCP-004E — Controlled Prisma Migrate Deploy Runbook

**Status:** Proposed
**Type:** Operational runbook / Sprint 4 DB Runtime Activation
**Date:** 2026-08-16
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Current baseline:** `4367185`
**Scope:** Controlled prisma migrate deploy runbook only

---

## Context

Previous Sprint 4 tasks established the full prerequisite chain:

- HM-GCP-004A — DATABASE_URL Unix socket format decision
- HM-GCP-004B — Secret Manager update runbook
- HM-GCP-004C — Cloud Run revision refresh plan
- HM-GCP-004D — Live connectivity test plan

This runbook defines how `prisma migrate deploy` should be executed later, only after the secret update, revision refresh, and connectivity are confirmed.

This task creates the runbook only. It does not run any migration.

---

## Goal

Define a safe, explicitly approved process for running production-like Prisma migrations against Cloud SQL without exposing secrets and without mixing migration with secret update or Cloud Run refresh.

---

## Required prerequisites before future execution

Before running `prisma migrate deploy`, all of the following must be confirmed:

1. `database-url` secret updated through approved HM-GCP-004B execution
2. Cloud Run revision refreshed through approved HM-GCP-004C execution
3. Live connectivity confirmed through approved HM-GCP-004D execution
4. Migration files reviewed
5. Expected migration impact understood
6. Rollback/restore posture reviewed
7. Exact command approved

---

## Non-goals

This task does not:

- run `prisma migrate deploy`
- run live DB commands
- update secrets
- refresh Cloud Run
- run Terraform
- modify `schema.prisma` or migrations
- read DATABASE_URL

---

## Approval gate

Before future `prisma migrate deploy`, the operator must approve:

- target project: `housemaster-dev-503409`
- target database: `housemaster`
- target app/runtime context
- exact command
- expected migrations
- confirmation that no secret value will be printed
- confirmation that backup/restore posture is acceptable

---

## Safe execution principle

Migration must be a separate operational step.

Do not combine `prisma migrate deploy` with:

- Secret Manager update
- Cloud Run revision refresh
- live connectivity test
- app deploy
- Terraform apply

---

## Future command template — do not run now

Example only. Do not execute in this task.

```bash
pnpm db:migrate:deploy
```

Or, if executed in a controlled environment:

```bash
DATABASE_URL=<MASKED_OR_RUNTIME_INJECTED> pnpm db:migrate:deploy
```

This is only a template. Final execution method must be approved later.

---

## Validation after future migration

After future migration, verify:

- command exits successfully
- migration history is consistent
- no secret value appears in logs
- no unexpected schema drift is reported
- app revision remains Ready=True
- post-migration smoke test is separately approved

---

## Failure handling

If `prisma migrate deploy` fails:

1. **Stop immediately** — do not rerun blindly.
2. **Do not** edit migrations live.
3. **Do not** change DATABASE_URL.
4. **Classify the failure:**
   - Authentication error
   - Socket/connectivity error
   - Migration SQL error
   - Shadow DB/config issue
   - Prisma version issue
   - Permissions error
   - Timeout
5. **Preserve logs** without secrets.
6. **Decide next step** through separate approval.

---

## Explicitly forbidden during future execution unless separately approved

- `prisma db push`
- `prisma migrate reset`
- manual SQL mutation
- deleting migration files
- editing applied migration history
- disabling old secret versions as part of migration
- Cloud Run deploy as part of migration

---

## Follow-up

After HM-GCP-004E review and commit, Sprint 4 planning layer is complete.

Next phase should be explicit execution gates:

1. HM-GCP-004X-1 — Secret Manager update execution
2. HM-GCP-004X-2 — Cloud Run revision refresh execution
3. HM-GCP-004X-3 — live connectivity execution
4. HM-GCP-004X-4 — controlled migrate deploy execution

---

## Readiness classification

Runbook only.
Actual `prisma migrate deploy` remains blocked until explicit future approval.
