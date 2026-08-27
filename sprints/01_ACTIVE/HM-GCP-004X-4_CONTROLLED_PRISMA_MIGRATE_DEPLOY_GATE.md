# HM-GCP-004X-4 — Controlled Prisma Migrate Deploy Gate

**Status:** **CLOSED (no-op)** — schema already fully migrated, confirmed 2026-08-27
**Type:** Execution gate / Sprint 4 DB Runtime Activation
**Date:** 2026-08-27
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Scope:** Preflight verification only — no migration executed in this task

---

## Context

Per `HM-GCP-004E`'s 7 required prerequisites, `HM-GCP-004X-4` (controlled `prisma migrate deploy` execution) may only proceed once all are confirmed:

1. `database-url` secret updated (approved `HM-GCP-004B` execution) — ✅ satisfied, version 7 (`HM-GCP-004X-1B`)
2. Cloud Run revision refreshed (approved `HM-GCP-004C` execution) — ✅ satisfied, `next-web-00010-wn4`
3. Live connectivity confirmed (approved `HM-GCP-004D` execution) — ✅ satisfied, `HM-GCP-004X-3B` closed
4. Migration files reviewed — ✅ satisfied (two migrations: `20260725072311_init_housemaster`, `20260725080000_harden_production_schema`)
5. Expected migration impact understood — this document's subject
6. Rollback/restore posture reviewed — ✅ satisfied (Cloud SQL backups + PITR confirmed enabled on `housemaster-db`)
7. Exact command approved — not yet given

---

## Data-shape preflight result (2026-08-27)

**Status: Blocker cleared.**

The second migration (`20260725080000_harden_production_schema`) adds `organization_id UUID NOT NULL` (no default) to five existing tables. Postgres only permits this on tables with zero existing rows, since there is no default value to backfill. Row counts were required to confirm this before the migration could be considered safe.

**Affected tables:** `apartments`, `assets`, `entrances`, `inspections`, `work_orders`

**Row counts** (via read-only `SELECT COUNT(*)`, executed against `housemaster-db` through a locally-run Cloud SQL Auth Proxy):

| Table | Count |
|---|---|
| `apartments` | 0 |
| `assets` | 0 |
| `entrances` | 0 |
| `inspections` | 0 |
| `work_orders` | 0 |

- All counts zero: **yes**
- Data-shape blocker cleared: **yes** — the `organization_id UUID NOT NULL` column additions will succeed as written; no default value or backfill step is required.

**Execution/secret handling for this preflight:**
- `database-url` Secret Manager version 7 was used **securely, only inside a script/environment variable** — accessed via `gcloud secrets versions access`, held only in an in-process env var, passed into a `pg.Client` connection object, and unset immediately after use.
- Password / `DATABASE_URL` / secret payload: **not printed** at any point — no value appeared in any command output, log, or report.
- No mutation of any kind was performed: **no `prisma migrate deploy`, no `prisma db push`, no DB write** — only a read-only `SELECT COUNT(*)` across the five affected tables.
- Connection path: a standalone Cloud SQL Auth Proxy binary (downloaded from Google's official release, sha256-verified against the published checksum, run from a scratchpad temp location, and fully cleaned up afterward — binary, logs, and query script all deleted) tunneled a local TCP connection to `housemaster-db`; Node's `pg` driver ran the query. **This path is proven viable** and is a candidate execution environment for the actual migration, alongside a Cloud Build/Job-based alternative.

---

## Remaining blocker (resolved)

**Exact migrate execution command approval** (`HM-GCP-004E` prerequisite #7) was given, and the approved command was executed. See "Execution result" below — this section is retained for history; the blocker no longer applies.

---

## Execution result (2026-08-27)

**Status: CLOSED (no-op). Schema already fully migrated.**

Approved command executed: `pnpm db:migrate:deploy` (root script → `prisma migrate deploy`), run against `housemaster-db` via a locally-run, sha256-verified Cloud SQL Auth Proxy on `127.0.0.1:5433`, with `DATABASE_URL` built in proxy form (`postgresql://housemaster:***@127.0.0.1:5433/housemaster`) from `database-url` Secret Manager version 7.

- Exit code: `0`
- Output: `2 migrations found in prisma/migrations` → `No pending migrations to apply.`
- **Finding:** both migrations (`20260725072311_init_housemaster`, `20260725080000_harden_production_schema`) were already recorded as applied in the database's migration history *before* this run — the schema was already fully in sync. This run applied nothing new; it was a no-op confirmation, not a failure.
- This is independent of the data-shape preflight's zero row counts: an empty table and an already-migrated schema are not in tension — the schema (columns, constraints, indexes) can exist with zero rows if no application data has been written yet.
- Secret / password / DATABASE_URL printed: **no** — accessed only into an in-process variable, used to build the proxy-form connection string, unset immediately after; Prisma's own output was additionally passed through a redaction filter as a defensive second layer (unused, since no connection string appeared in it).
- Retry attempted: **no** — not applicable, this was not a failure.
- Endpoint call after migrate: **no** — not separately approved, so not run.
- Cleanup: proxy process killed; binary, log, and pid file removed from scratchpad.
- Repo impact: **none** — `prisma migrate deploy` writes no local files; `git status --short` unchanged before/after.

**Conclusion:** `HM-GCP-004X-4` is closed. There was no pending migration work to execute — the Cloud SQL schema was already current. No further migrate action is needed unless new migration files are added in the future.

---

## Non-goals

This document does not:
- run `prisma migrate deploy`
- run `prisma db push`
- mutate any DB data or schema
- access Secret Manager payload beyond the described read-only, non-printed usage
- change Cloud SQL
- update secrets
- deploy
- run Terraform
- call the application endpoint
- constitute approval to execute HM-GCP-004X-4

---

## Report template

```
HM-GCP-004X-4 result:
- prerequisites 1-7 satisfied: yes
- command executed: pnpm db:migrate:deploy (prisma migrate deploy), via local Cloud SQL Auth Proxy
- exit code: 0
- migrations newly applied: none — schema already fully migrated (no-op)
- secret payload printed: no
- endpoint called after migrate: no (not separately approved)
- retry attempted: no
- repo files changed: no
- gate status: CLOSED (no-op)
```

---

## Readiness classification

**Closed.** Preflight (data-shape) confirmed safe, all 7 `HM-GCP-004E` prerequisites satisfied, exact command executed with explicit approval. Result: no-op — the database schema was already fully migrated before this gate ran, so no migrations were applied. Secret handled without printing throughout. No further `HM-GCP-004X-4` action needed unless new migration files are introduced later.
