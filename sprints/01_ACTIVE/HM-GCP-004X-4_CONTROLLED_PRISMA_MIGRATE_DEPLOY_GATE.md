# HM-GCP-004X-4 — Controlled Prisma Migrate Deploy Gate

**Status:** Preflight in progress — data-shape blocker cleared, execution not approved
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

## Remaining blocker

**Exact migrate execution command approval** (`HM-GCP-004E` prerequisite #7) — not yet given. This preflight satisfies prerequisite #5 (migration impact understood, data-shape confirmed safe); prerequisites 1–4 and 6 were already satisfied prior to this document. `HM-GCP-004X-4` execution (`prisma migrate deploy` itself) remains blocked pending explicit, separate approval of the exact command and execution environment.

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
HM-GCP-004X-4 preflight result:
- prerequisites 1-4, 6 satisfied: yes (prior work)
- prerequisite 5 (migration impact) satisfied: yes (this document)
- affected tables all empty: yes (apartments=0, assets=0, entrances=0, inspections=0, work_orders=0)
- secret payload printed: no
- mutation performed: no
- execution environment proven viable: yes (local Cloud SQL Auth Proxy)
- prerequisite 7 (exact command approval): not yet given
- ready for HM-GCP-004X-4 execution: no
```

---

## Readiness classification

Preflight only. Data-shape blocker cleared — all five affected tables confirmed empty via read-only query, secret handled without printing, no mutation performed. `HM-GCP-004X-4` execution remains blocked pending explicit approval of the exact command and execution environment.
