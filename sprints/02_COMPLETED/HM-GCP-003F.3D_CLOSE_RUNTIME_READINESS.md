# HM-GCP-003F.3D — Close Sprint 3 Runtime Readiness

**Status:** Completed
**Date:** 2026-08-16
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**HEAD:** `57be303`
**Scope:** Runtime / Prisma / Cloud SQL readiness

---

## Completed Items

| Task | Description | Commit |
|------|-------------|--------|
| HM-GCP-003F.1 | Cloud SQL connector readiness (`/cloudsql` mount, `sa-web-dev` → `roles/cloudsql.client`) | `8c95aa2` |
| HM-GCP-003F.3C-1A | Prisma runtime dependencies added to `apps/web` (`@prisma/adapter-pg`, `pg`, `@types/pg`) | `c9827d3` |
| HM-GCP-003F.3C-1B | Prisma 7 CLI config (`prisma.config.ts`, `db:generate`/`db:migrate:deploy` scripts, `dotenv`) | `b90c0c9` |
| HM-GCP-003F.3C-1C | Prisma runtime wrapper (`apps/web/src/lib/prisma.ts` with `PrismaPg` adapter, singleton) | `57be303` |

### Validations Passed

- `pnpm db:generate` — Prisma Client v7.9.0 generated, config loaded from `prisma.config.ts`
- `pnpm --filter web build` — Next.js 16.2.10 compiled, TypeScript clean, all static pages generated

---

## Explicit Non-Goals

- No Secret Manager update
- No DATABASE_URL change
- No live DB query
- No migration deploy (`prisma migrate deploy` not run)
- No Cloud Run deploy
- No Terraform apply

---

## Follow-Up Track — Sprint 4 / DB Runtime Activation

1. DATABASE_URL socket-format decision note
2. Secret Manager update runbook
3. Cloud Run revision refresh plan
4. Live connectivity test plan
5. Controlled `prisma migrate deploy` runbook
