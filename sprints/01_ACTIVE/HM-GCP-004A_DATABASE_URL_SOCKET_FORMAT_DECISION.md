# HM-GCP-004A — DATABASE_URL Socket Format Decision

**Status:** Proposed
**Type:** Decision note / Sprint 4 DB Runtime Activation
**Date:** 2026-08-16
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Current baseline:** `3e30319`
**Scope:** DATABASE_URL format decision only

---

## Context

Sprint 3 Runtime Readiness is closed. The repo has:

- Cloud SQL connector readiness completed in HM-GCP-003F.1
- Prisma runtime dependencies in `apps/web`
- `prisma.config.ts` and db scripts
- `apps/web/src/lib/prisma.ts` runtime wrapper using `@prisma/adapter-pg`
- successful `pnpm db:generate` with dummy DATABASE_URL
- successful `pnpm --filter web build`

Sprint 4 starts DB Runtime Activation.

---

## Decision

For Cloud Run runtime, Secret Manager key `database-url` must use PostgreSQL Unix socket format:

```
postgresql://housemaster:<PASSWORD>@localhost/housemaster?host=/cloudsql/housemaster-dev-503409:europe-west3:housemaster-db
```

Masked form for reports:

```
postgresql://housemaster:***@localhost/housemaster?host=/cloudsql/housemaster-dev-503409:europe-west3:housemaster-db
```

---

## Rationale

This format matches:

- Cloud Run `/cloudsql` mount
- Cloud SQL instance connection name
- existing PostgreSQL user/password model
- Prisma 7 runtime wrapper using `@prisma/adapter-pg` and `pg` connectionString
- avoiding public-IP runtime dependency

---

## Non-goals

This task does not:

- update Secret Manager
- read or print real DATABASE_URL
- change `.env` files
- run live DB queries
- run `prisma migrate deploy`
- deploy Cloud Run
- run Terraform
- switch to IAM DB auth
- use TCP public IP as Cloud Run runtime URL

---

## Explicitly rejected for Cloud Run runtime

Do not use TCP public IP format for Cloud Run runtime:

```
postgresql://housemaster:<PASSWORD>@34.185.183.10:5432/housemaster?sslmode=require
```

Do not use TCP localhost format:

```
postgresql://housemaster:<PASSWORD>@localhost:5432/housemaster
```

---

## SSL mode

Initial dev validation should not add `sslmode=require` to the Unix socket URL.

Target initial format:

```
postgresql://housemaster:<PASSWORD>@localhost/housemaster?host=/cloudsql/housemaster-dev-503409:europe-west3:housemaster-db
```

---

## Security handling

Real password must never be:

- pasted into chat
- committed
- printed in logs
- stored in `.env` as part of this task
- included in reports

Future Secret Manager update must be done through a separate approved runbook.

---

## Follow-up tasks

1. HM-GCP-004B — Secret Manager update runbook
2. HM-GCP-004C — Cloud Run revision refresh plan
3. HM-GCP-004D — live connectivity test plan
4. HM-GCP-004E — controlled prisma migrate deploy runbook

---

## Readiness classification

Decision note only.
Ready for HM-GCP-004B after review and commit.
