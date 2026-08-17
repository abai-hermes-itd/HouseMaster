# HM-GCP-004X-3B — App-Level DB Health Check Gate

**Status:** Proposed
**Type:** Planning gate (docs-only)
**Date:** 2026-08-17
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Scope:** Design/approval planning only — no code change, no execution

---

## Why HM-GCP-004X-3 is weak pass / inconclusive-passing

HM-GCP-004X-3 confirmed revision `next-web-00004-4zk` is `Ready=True` and found no DB/Prisma/socket/timeout/auth-to-DB errors in Cloud Run logs over a 24h window, including a targeted search for `prisma`, `database`, `ECONNREFUSED`, `ECONNRESET`, `cloudsql`, `postgres`. That satisfies the checklist's literal success criteria ("successful connection message **or** absence of connection-error messages"), but the *absence* branch is weak: `apps/web/src/lib/prisma.ts` initializes `PrismaClient` with the `@prisma/adapter-pg` adapter and never logs a connection-success message anywhere in the codebase (confirmed by inspection — no such log statement exists). So the clean logs are consistent with either "connected successfully and silently" or "never actually attempted a query yet" (Prisma/pg adapters typically connect lazily, on first query) — the app may not have touched the database at all since revision `-00004-` started, since nothing in the observed logs triggers a DB call.

## Why positive DB proof is still needed before migrate deploy

HM-GCP-004E (controlled `prisma migrate deploy` runbook) is a schema-mutating operation. Running it against a database the running application has never demonstrably reached would mean the first real DB interaction is a **schema migration** — the highest-risk kind of DB operation to run blind. If connectivity, socket-mount, IAM, or credential wiring were subtly broken, an unverified migrate deploy could fail destructively or produce misleading partial state, with no prior read-only signal to have caught the problem first. A cheap, read-only, positive connectivity signal must exist before that gate.

---

## Possible safe designs for app-level DB health check

**Design 1 — Minimal `/api/health/db` route (recommended, see below):**
- New file `apps/web/src/app/api/health/db/route.ts` (matches existing route convention, e.g. `src/app/api/auth/[...nextauth]/route.ts`).
- Imports the existing `prisma` singleton from `src/lib/prisma.ts` — no new client, no new connection config.
- Executes a single read-only `prisma.$queryRaw`SELECT 1``.
- Returns `{ "status": "ok" }` (200) on success, `{ "status": "error", "message": "<safe, generic message>" }` (500) on failure — never the raw error object, connection string, or stack trace in the response body.

**Design 2 — Cloud Run startup/liveness probe extension:**
- Extend the existing `startup_probe` (`cloud_run.tf`, currently `httpGet { path: "/" }`) to instead target a dedicated health path that also checks DB.
- Rejected as first choice: conflates app liveness with DB liveness — a transient DB blip would mark the whole revision unready, which is a bigger blast radius than intended for a one-off connectivity proof.

**Design 3 — One-off Cloud Run Job or `gcloud run services proxy` + local script:**
- Run a throwaway Cloud Run Job or local proxy invoking a script that does one `SELECT 1` through the same Cloud SQL connector.
- Rejected as first choice: more moving parts (new Job resource, IAM, image) for what should be the cheapest possible test; also touches Terraform/infra surface HM-GCP-004F already flagged as sensitive.

---

## Recommended minimal option

**Design 1** — a single `/api/health/db` GET route using the existing `prisma` singleton, one `SELECT 1`, generic-only error messages. Smallest possible code surface, reuses existing connection wiring exactly as the rest of the app would use it (so it's a true test of the same path), and is trivially removable or left in place as ongoing operational tooling.

---

## Forbidden actions (this gate)

- Modifying `apps/web/src/lib/prisma.ts` or any application code
- Modifying `cloud_run.tf` or any Terraform file
- Running `prisma migrate deploy` or any Prisma CLI command
- Running any DB query directly (outside of what the proposed endpoint itself would do, once separately approved and implemented)
- Running `terraform`
- Running `gcloud`
- Reading `.env`
- Accessing or printing secret payload, password, or unmasked `DATABASE_URL`
- Staging, committing, or pushing
- Proceeding to HM-GCP-004X-4

---

## Future approval requirements

Before any implementation:
1. Explicit approval of the exact route file path and code diff (Design 1, or an alternative if reconsidered).
2. Explicit approval of the exact response shape (fields, status codes) — no internal error detail leakage.
3. Explicit approval to deploy the code change (a real build/deploy cycle — likely via CI/CD per `cloud_run.tf`'s `ignore_changes` on `image`, not a manual `gcloud` deploy).
4. Explicit approval to call the new endpoint once live, with confirmation that the call and its response contain no secret payload.
5. Separate approval for HM-GCP-004X-4 (migrate deploy) only after this endpoint returns a genuine positive `{ "status": "ok" }`.

---

## Report template

```
HM-GCP-004X-3B result:
- design selected: <pending future approval>
- code change approved: yes/no
- deployed: yes/no
- endpoint called: yes/no
- response: ok / error / not yet run
- error detail leaked: no
- secret leaked: no
- ready for HM-GCP-004X-4 approval: yes/no
```

---

## Non-goals

This gate does not:
- modify application code
- run Prisma
- run DB queries
- run Terraform
- run `gcloud`
- read `.env`
- access or print secrets
- stage, commit, or push
- proceed to HM-GCP-004X-4

---

## Readiness classification

Planning note only. No design selected or approved, no code written, nothing deployed.
