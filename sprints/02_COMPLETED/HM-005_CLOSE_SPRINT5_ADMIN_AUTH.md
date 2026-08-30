# HM-005 — Close Sprint 5 Admin Auth (implementation/test complete, live-behavior blocked)

**Status:** Completed — implementation & test scope closed; one gate (AUTH-5) carried forward as a documented blocker, not closed
**Date:** 2026-08-30
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**HEAD:** `bb2e42f`
**Scope:** Admin-realm authentication (ADR-0004) — Google Workspace OAuth, domain-check, route middleware, unit test coverage
**ADR:** ADR-0004 (Two auth realms — Users and Admin)

---

## Completed Items

| Task | Description | Commit / PR |
|------|-------------|--------------|
| AUTH-3 | Runtime prerequisites (Cloud SQL, Prisma runtime, DB health) | Closed prior to Sprint 5 (see `sprints/00_ROADMAP` row 3.1) |
| Admin auth implementation | `middleware.ts` route gate, `lib/auth.ts` Auth.js config + `hd`-domain `signIn` check, `login`/`admin` pages | PR #2, merge commit `b538bb53820655319fa15092d8ede0b46551a4fd` |
| `ALLOWED_WORKSPACE_DOMAIN` env wiring | Cloud Run env var added via Terraform, applied and confirmed live | commit `e3bb9ee`, revision `next-web-00011-mwl` |
| AUTH-4B / HM-005-QA1 | Unit test coverage for `isAllowedDomain()` — extracted to standalone module for testability | commit `bb2e42f` |
| AUTH-4C | Push gate — `bb2e42f` pushed to origin | — |
| AUTH-4D | PR gate — opened and merged | PR #3, merge commit `26f55234ec80713cc10b1535516c438c639c79ff` |

### Validations Passed

- `node --experimental-strip-types --test src/lib/auth-domain.test.ts` — 6/6 tests pass
- `npm run lint` (eslint) — clean
- `npx tsc --noEmit` — clean
- `terraform fmt -check` / `terraform validate` / `terraform plan` / `terraform apply` for `ALLOWED_WORKSPACE_DOMAIN` — clean, single-resource change, confirmed live via `gcloud run services describe`

---

## Blocked Item — AUTH-5 Admin Auth Live Behavior Verification

**Result: BLOCKED / FAIL** — not a code defect.

Attempted read-only HTTP checks against the live dev Cloud Run URL:
- `GET /login` → expected `200`, got **`403 Forbidden`**
- `GET /admin` (unauthenticated) → expected `302`/`307` redirect to `/login`, got **`403 Forbidden`**

Both responses carried `server: Google Frontend` with no application-level headers — the request is rejected **before it reaches Next.js middleware or any app code**. This means the admin-auth code built and unit-tested in this sprint (`middleware.ts`, `lib/auth.ts`, the `isAllowedDomain` check) could not be exercised live, and — more importantly — **no real user, including a legitimate Workspace admin, can currently reach the app either.**

### Root cause (already known, not a new finding)

`dev.tfvars` currently has `cloud_run_allow_unauthenticated = false`, which omits the `google_cloud_run_v2_service_iam_member.public_invoker` (`allUsers` → `roles/run.invoker`) binding. This was a deliberate remediation recorded in `sprints/02_COMPLETED/HM-GCP-003E.2-C_RESOLVE_TAINTED_CLOUD_RUN.md`:

> `public_invoker` apply failed — blocked by Organization Policy (`allUsers` not permitted).
> ... `cloud_run_allow_unauthenticated=false` in `dev.tfvars` to remove `public_invoker` from the plan graph.
> Open item: `public_invoker`/`allUsers` access model требует отдельной задачи (domain principal / IAP / LB / application-level auth).

That open item was never picked up. AUTH-5 rediscovered it while trying to verify live behavior — it is the same deferred decision, not a regression introduced in Sprint 5.

### Why this closes Sprint 5 rather than blocking it

The admin-auth **application code** is implemented, reviewed, merged, and unit-tested — that is Sprint 5's actual deliverable. The remaining gap is a **Cloud Run ingress/IAM/organization-policy** question, which is infrastructure-layer, pre-existing, and independent of the app code. Per decision, Sprint 5 AUTH closes as implementation/test complete, and AUTH-5 is carried forward as an explicitly documented blocker rather than left as a silently stale "in progress" gate.

---

## Explicit Non-Goals (this closure)

- No IAM change
- No Terraform plan/apply
- No Cloud Run deploy/update
- No Secret Manager access
- No DB/Prisma operation
- No app code change

---

## Follow-Up Track — Sprint 6 / Runtime Config / Secret Hygiene

1. **SPRINT-6A — Cloud Run Ingress/IAM Policy Decision** *(recommended next gate)*
   Scope: read-only investigation, decision doc only — no apply.
   - Identify the specific GCP Organization Policy blocking `allUsers` (e.g. `iam.allowedPolicyMemberDomains`) via read-only `gcloud org-policies`/`resourcemanager` inspection.
   - Evaluate the three options already named in HM-GCP-003E.2-C: (a) domain-restricted IAM principal (`domain:abay-germes.kz` as invoker), (b) Identity-Aware Proxy, (c) external Load Balancer + Cloud Armor.
   - Produce a decision doc recommending one path. No Terraform change in this gate.
2. Scoped Terraform change implementing the SPRINT-6A decision (separate gate, pending approval).
3. Re-run AUTH-5 (Admin Auth Live Behavior Verification) against the corrected ingress model.
4. Confirm prod `tfvars.example` assumption (`cloud_run_allow_unauthenticated = true`) still matches whatever ingress model is chosen, before Sprint 7 (Admin Console MVP) assumes public reachability.
