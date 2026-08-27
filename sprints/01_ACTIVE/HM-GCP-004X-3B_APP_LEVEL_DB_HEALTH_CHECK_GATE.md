# HM-GCP-004X-3B — App-Level DB Health Check Gate

**Status:** **CLOSED** — positive DB connectivity confirmed 2026-08-27
**Type:** Planning gate (docs-only)
**Date:** 2026-08-17
**Amended:** 2026-08-19
**Closed:** 2026-08-27
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Scope:** Design/approval planning only — no build, deploy, or execution performed under this amendment

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

## Amendment (2026-08-19): Design 1 amended to lazy `getPrisma()`

**Status: Approved.**

During implementation drafting, `apps/web/src/lib/prisma.ts` was found to export an eagerly-instantiated `PrismaClient` singleton (`export const prisma = ...`) that runs at module-import time. Importing this module during Next.js build-time page-data collection would require `DATABASE_URL` to be set at build time — a build-safety risk Design 1's original wording did not anticipate.

**Amended design:**
- `apps/web/src/lib/prisma.ts` is refactored from `export const prisma = ...` to `export function getPrisma(): PrismaClient`, which lazily creates (or reuses) the client on first call instead of at import time.
  - Dev-mode behavior unchanged: still caches on `globalForPrisma.prisma` (HMR-safe).
  - Production caching moves from the global to a local `cachedClient` module variable.
- `apps/web/src/app/api/health/db/route.ts` calls `getPrisma().$queryRaw`SELECT 1`` instead of importing a pre-built `prisma` singleton.
- Response shape, status codes, and error-message genericness are unchanged from the original Design 1 approval (`{ "status": "ok" }` / 200 on success, `{ "status": "error", "message": "<safe, generic message>" }` / 500 on failure — no raw error, connection string, or stack trace).

**Why approved:** the refactor is small, self-contained, behavior-preserving for existing runtime call sites, does not touch Terraform/infra surface, and closes a real build-time risk that the original Design 1 text did not account for. Reverting to the eager singleton to match the doc's original literal wording would reintroduce that risk solely for doc-literalism.

**Files covered by this amendment (already present in the working tree, uncommitted as of this approval):**
- `apps/web/src/lib/prisma.ts` — modified (eager singleton → lazy `getPrisma()`)
- `apps/web/src/app/api/health/db/route.ts` — added (new file)

No other files are in scope of this amendment. No deletions.

**This amendment approves the design only.** It does not itself authorize build, deploy, staging, committing, pushing, or calling the endpoint — those remain separate approval items per "Future approval requirements" below, items 3–4 still pending.

---

## Forbidden actions (this gate)

> **Note (2026-08-19 amendment):** the item below is superseded, narrowly, by the approved amendment above — modifying `apps/web/src/lib/prisma.ts` for the specific `getPrisma()` refactor, and adding `apps/web/src/app/api/health/db/route.ts`, are now approved design changes. All other application code remains out of scope and forbidden. Build, deploy, staging, commit, push, and endpoint-call remain forbidden regardless of this note — see items below.

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

## Build validation (2026-08-19)

**Status: Passed.**

- Command: `pnpm --filter web build`
- Result: build passed
- `/api/health/db` compiled as a dynamic (`ƒ`) route in the Next.js route manifest, alongside the rest of the app
- `DATABASE_URL` printed: no
- secrets printed: no
- Deploy: still pending (no build/deploy authorization has been given beyond this local build check)
- Endpoint call: still pending
- HM-GCP-004X-4 (migrate deploy): still blocked until deploy + a genuine positive endpoint response are obtained

---

## Cloud Run deploy status check (2026-08-19, read-only)

**Status: Commit not deployed. Deploy pending.**

Read-only `gcloud` inspection of the live `next-web` Cloud Run service (`housemaster-dev-503409`, `europe-west1`):

| Revision | Active | Ready | Created | Image digest |
|---|---|---|---|---|
| `next-web-00004-4zk` | yes (100% traffic) | True | 2026-08-17T04:50:35Z | `...web@sha256:afb49c1...29f5fa` |
| `next-web-00003-567` | no | True | 2026-08-15T10:43:59Z | same digest as above |
| `next-web-00002-fqb` | no | True | 2026-08-13T12:26:37Z | same digest as above |
| `next-web-00001-6tc` | no | True | 2026-08-13T07:04:33Z | Google placeholder image |

- Currently-serving revision: `next-web-00004-4zk`, `Ready=True`, 100% traffic.
- That revision was created **2026-08-17T04:50Z**, before commit `57027df` existed (pushed 2026-08-19). No new revision has been created since the push, and revisions 00002–00004 share an identical image digest — no rebuild/redeploy has occurred since 2026-08-13.
- **Conclusion: commit `57027df` is not deployed.** No CI/CD pipeline appears to have triggered a build/deploy on this push. Deploying it requires a separate, explicit deploy approval (not yet given) — per this doc's "Future approval requirements" item 3.

---

## Deploy + endpoint call result (2026-08-27)

**Status: Blocked — credential mismatch, not a connectivity/socket/Auth.js failure.**

Since the 2026-08-19 status above, additional work landed on the branch (commits `effba33`, `70238be`, `f5d5180`, `6994d3b`, routing DB health through app auth, trusting the Cloud Run host for Auth.js, bypassing Auth.js middleware for DB health, and reconciling Cloud Run Terraform drift) plus `c4a7614` ("log DB health errors safely"). `c4a7614` was pushed and deployed via `gcloud builds submit --config=cloudbuild.yaml --substitutions=SHORT_SHA=c4a7614`, producing revision `next-web-00009-jzn` (`Ready=True`, 100% traffic, image digest `...254a0ce...21cf41`).

`GET /api/health/db` was then called manually against live revision `next-web-00009-jzn`:
- Response: `{"status":"error","message":"Database connectivity check failed"}`, `HTTP_STATUS:500` — generic message only, no raw error/connection detail in the response body, matching the approved Design 1 response shape.
- A temporary `roles/run.invoker` grant used to make the call was removed afterward; IAM confirmed clean.

Read-only Cloud Run log inspection (`stderr`) for that request on `next-web-00009-jzn` showed:
```
[health/db] database connectivity check failed {
  name: 'PrismaClientKnownRequestError',
  message: '...Raw query failed. Code: `28P01`. Message: `password authentication failed for user "housemaster"`',
  code: 'P2010',
  cause: undefined
}
```
No `DATABASE_URL`, password, or connection string appeared in the logs — only the Postgres error code and the DB username, which Postgres includes in its own auth-failure message by design.

**Finding:** the app reached Cloud SQL and completed a real Postgres auth handshake, which was rejected with Postgres error `28P01` ("password authentication failed for user \"housemaster\""), Prisma error code `P2010`. This confirms the network/socket path and the Auth.js-layer fixes are working — the request got all the way to Postgres — and the remaining failure is a **credential mismatch**: the password Cloud Run presents (via Secret Manager / `DATABASE_URL`) does not match what Postgres currently has for user `housemaster`. This is not a connectivity, IAM, or Terraform problem.

**Recommended next gate:** `HM-GCP-004B` (Secret Manager Update Runbook) — to reconcile the `DATABASE_URL`/Secret Manager credential against the actual Postgres password for `housemaster` — before any further connectivity retest or `HM-GCP-004X-4` (migrate deploy) consideration. `HM-GCP-004X-4` remains blocked; a credential fix and a subsequent genuine positive `{"status":"ok"}` are both still required first.

---

## Report template

```
HM-GCP-004X-3B result:
- design selected: Design 1, amended (lazy getPrisma()) — approved 2026-08-19
- code change approved: yes
- build validated: yes (pnpm --filter web build, 2026-08-19)
- pushed: yes (commit 57027df, 2026-08-19; commit c4a7614, 2026-08-27)
- deployed: yes — revision next-web-00009-jzn (2026-08-27), Ready=True, 100% traffic
- endpoint called: yes (2026-08-27, manual, against next-web-00009-jzn)
- response: {"status":"error","message":"Database connectivity check failed"}, HTTP_STATUS:500
- root cause (from read-only Cloud Run stderr logs): Postgres 28P01 "password authentication failed for user \"housemaster\"" (Prisma P2010) — credential mismatch, not connectivity/socket/Auth.js
- error detail leaked: no
- secret leaked: no
- ready for HM-GCP-004X-4 approval: no — blocked on credential mismatch; route to HM-GCP-004B first
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

## Gate closure — successful endpoint retest (2026-08-27)

**Status: CLOSED. Positive DB connectivity confirmed.**

Following credential remediation (`HM-GCP-004B.1` Option A retry — see `HM-GCP-004X-1B`, which recorded a failed first attempt, containment of the resulting known-bad `database-url` version 6, and a successful retry producing version 7) and a Cloud Run revision refresh to pick up the new credential, `/api/health/db` was retested:

- Live revision: `next-web-00010-wn4`
- Credential source: `database-url` Secret Manager version 7 (resolved via `latest`)
- Endpoint response body: `{"status":"ok"}`
- HTTP status: `200`
- Retest sequence: temporary `roles/run.invoker` grant to `markelus@abay-germes.kz` on `next-web` → identity-token `curl` → immediate grant removal → IAM rollback verified
- Temporary invoker added: yes
- Temporary invoker removed: yes
- IAM clean: yes — `get-iam-policy` confirmed only the pre-existing `sa-deployer-dev` → `roles/run.developer` binding remains after rollback
- Secret payload / password / DATABASE_URL printed: no, at any point in this gate or its remediation chain

**Conclusion:** `HM-GCP-004X-3B` is **closed** — the app-level DB health check returned a genuine, non-fabricated positive result, confirming Cloud Run's live revision can reach Cloud SQL and authenticate successfully end-to-end.

**`HM-GCP-004X-4` (controlled `prisma migrate deploy`) remains separately blocked.** This gate's closure satisfies its own precondition for `HM-GCP-004X-4` to be *considered*, but does not itself authorize it — that requires its own explicit, separate approval per `HM-GCP-004E`'s runbook.

---

## Readiness classification

Design approved (amended, 2026-08-19), build-validated locally, pushed, and deployed (commit `c4a7614`, revision `next-web-00009-jzn`, 2026-08-27). First endpoint call returned a genuine negative result (`HTTP 500`, Postgres `28P01` credential mismatch — not connectivity/socket/IAM/Terraform). Credential remediation (`HM-GCP-004X-1B`) fixed the Cloud SQL password and produced `database-url` version 7; a Cloud Run revision refresh deployed `next-web-00010-wn4`; the endpoint was retested and returned a genuine positive `{"status":"ok"}` / `HTTP 200`. **Gate closed 2026-08-27.** `HM-GCP-004X-4` remains a separate, still-blocked approval.
