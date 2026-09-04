# SPRINT-6B-2H — IAP Access Revocation Finding

Status: CONFIRMED / ACCESS REVOKED SINCE SPRINT-6B-2G
Date: 2026-09-04
Branch: feat/hm-gcp-003d-cloud-sql-import

---

## 1. Context

`SPRINT-6B-2G_AUTHENTICATED_IAP_LOGIN_TEST_RESULT.md` recorded a clean **PASS** for `markelus@abay-germes.kz` against `https://iap-dev.housemasters.kz` on 2026-09-02: IAP login succeeded, the application loaded, no access denial.

A later manual rerun of the Sprint 6C browser test (same account, same URL) returned **IAP Access Denied**, prompting a read-only IAM investigation to find out why.

## 2. IAM investigation (read-only, this session)

`roles/iap.httpsResourceAccessor` bindings were checked at every level in the project's hierarchy:

| Level | Command | Result |
|---|---|---|
| Resource (`next-web-iap-backend`) | `gcloud iap web get-iam-policy --resource-type=backend-services --service=next-web-iap-backend` | Empty policy (`etag` only, no bindings) — confirmed on two separate runs |
| Project (`housemaster-dev-503409`) | `gcloud projects get-iam-policy ... --filter="bindings.role:roles/iap.httpsResourceAccessor"` | No match — confirmed against an unfiltered dump (14 total bindings, none IAP-related) and reconfirmed on a repeat run |
| Organization (`76529432832`, `abay-germes.kz`) | `gcloud organizations get-iam-policy 76529432832 --filter="bindings.role:roles/iap.httpsResourceAccessor"` | No match — confirmed against an unfiltered dump (3 total bindings, none IAP-related) |
| Folder | — | N/A — the project's direct parent is the organization; no folder exists in this hierarchy |

No principal — not `markelus@abay-germes.kz` directly, not `domain:abay-germes.kz`, not any group — holds `roles/iap.httpsResourceAccessor` at any level that could grant access to this IAP-protected resource.

## 3. Confirmation test (manual browser observation, today)

- **Date:** 2026-09-04
- **Account tested:** `markelus@abay-germes.kz`
- **Method:** fresh/incognito browser, manual sign-in attempt against `https://iap-dev.housemasters.kz`
- **Result: FAIL** — IAP "Access Denied" / "You don't have access" screen. No redirect loop. No OAuth URL, code, state, cookie, or token was captured or recorded, per this session's evidence-handling rule.

## 4. Conclusion

The access `SPRINT-6B-2G` exercised on 2026-09-02 **no longer exists today, and the IAM evidence explains why**: the binding that must have granted it is absent at every level checked. This is a confirmed access **revocation or drift**, not a testing-condition difference, a fluke, or a caching artifact — each read-only check was independently reconfirmed (resource level twice, project level twice, org level once with an unfiltered cross-check).

This **supersedes** the reasoning in `SPRINT-6B_CLOSURE_READINESS_REVIEW.md`, which treated `SPRINT-6B-2G`'s PASS as still-current evidence toward Sprint 6B closure. It is not current. Sprint 6B's platform-access story is not "AUTH-5 rerun still pending" (the prior BLOCKED reason) — it is now "the access path itself has regressed since it was last confirmed working."

## 5. What this finding does not do

Docs-only. No IAM change, no policy binding change, no Terraform, no deploy, no DNS/Cloud Run/Cloud SQL change, no Secret Manager payload, no password/`DATABASE_URL`/token/cookie/OAuth-code printing, no DB mutation, no `prisma migrate deploy`, no `package.json` edit, no automation/hook/CI wiring. Nothing was staged, committed, or pushed by creating this file. In particular, this note **does not re-grant** `roles/iap.httpsResourceAccessor` to anyone — that is an IAM change and requires its own separate, explicit gate.

## 6. Recommended next safe gate

An **IAM remediation decision gate** (not an apply) to decide how to re-grant `roles/iap.httpsResourceAccessor`:
- to `markelus@abay-germes.kz` directly, or
- to `domain:abay-germes.kz` (the domain-scoped option `SPRINT-6B-0_IAP_FEASIBILITY_PREFLIGHT.md` left as an open, never-resolved question), or
- to a specific admin Google Group (the other option that same doc named and never resolved).

That decision, and any Terraform/`gcloud` change implementing it, is its own separately-approved gate — not run here.
