# SPRINT-6C — AUTH-5 Live-Behavior Verification Plan

**Status:** Proposed — plan only, not executed
**Type:** Operational plan / Sprint 6 IAP Controlled Access, follow-up to Sprint 5 (HM-005)
**Date:** 2026-09-04
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Scope:** Test planning only. No browser login test, no endpoint call, and no infrastructure/runtime change is made by this document.

---

## 1. Context

`AUTH-5` (Admin Auth Live Behavior Verification) was attempted during Sprint 5 and recorded as **BLOCKED / FAIL** in `sprints/02_COMPLETED/HM-005_CLOSE_SPRINT5_ADMIN_AUTH.md`:

- `GET /login` → expected `200`, got `403 Forbidden` (Google Frontend, before reaching the app)
- `GET /admin` (unauthenticated) → expected `302`/`307` redirect to `/login`, got `403 Forbidden`

Root cause: no invoke-capable public principal on Cloud Run (`allUsers` blocked by org policy). Sprint 6B's IAP work has since put a working access path in front of the service — confirmed via `SPRINT-6B_CLOSURE_READINESS_REVIEW.md`'s 6-item evidence chain (DNS resolved, certificate ACTIVE, HTTPS reachable, IAP redirect observed, one authenticated login PASS, evidence committed/pushed). But that chain tested the IAP layer generically, at the root path — it did not re-run the specific `/login` / `/admin` checks `AUTH-5` originally defined, and it did not verify the app-level (`middleware.ts` / `isAllowedDomain`) behavior on top of IAP. This plan defines how to do that, without running it yet.

## 2. Goal

Define the exact requests, order, and pass/fail criteria to confirm whether `middleware.ts` and the `isAllowedDomain` admin-realm check (Sprint 5's actual deliverable) behave correctly for real browser traffic now that IAP fronts the service — i.e., whether Sprint 5's original `AUTH-5` blocker is resolved.

## 3. Non-goals

This task does not:

- perform any browser login or IAP authentication flow
- call `/login`, `/admin`, or any other application endpoint
- read or print a password, token, cookie, OAuth code, or `DATABASE_URL`
- change Terraform, IAM, DNS, Cloud Run, Cloud SQL, or any Secret Manager payload
- run `prisma migrate deploy` or any DB mutation
- edit `package.json` or wire any automation/hook/CI
- stage, commit, or push anything

## 4. Two layers to verify (per the Sprint 6B implementation plan's own §4 "Relation to NextAuth")

IAP and the app's own auth are two separate, stacked layers:

1. **Platform layer (IAP):** decides whether a browser reaches the service boundary at all. Already confirmed generically working (`SPRINT-6B_CLOSURE_READINESS_REVIEW.md`).
2. **App layer (NextAuth / `middleware.ts` / `isAllowedDomain`):** decides, once a request reaches the app, whether the `/admin` realm is actually reachable and correctly domain-gated. **This is the layer `AUTH-5` exists to verify, and it has never been exercised live.**

A future execution of this plan must show both layers behaving correctly together, not just the first one.

## 5. Verification steps (for the future, separately-approved execution)

All against `https://iap-dev.housemasters.kz`, read-only HTTP checks unless noted:

| Step | Request | Auth state | Expected result (PASS) |
|---|---|---|---|
| 1 | `GET /login` | No IAP session | IAP intercepts, redirects to Google OAuth (same shape already confirmed at `/` in `SPRINT-6B-2F_DNS_CERT_HTTPS_READINESS_ATTEMPT_2.md`) |
| 2 | `GET /admin` | No IAP session | Same — IAP intercepts before the app is reached; app-level behavior is not yet exercised at this step |
| 3 | `GET /login` | Authenticated at IAP (browser session from a completed IAP login) | Request reaches the app; app returns `200` (the original `AUTH-5` expectation for `/login`) — confirms IAP is not itself replacing or hiding app-level `/login` |
| 4 | `GET /admin` | Authenticated at IAP, but no NextAuth app session yet | App's own `middleware.ts` runs; expect `302`/`307` redirect to `/login` (original `AUTH-5` expectation for unauthenticated `/admin`, now measured at the app layer instead of being masked by a platform-level `403`) |
| 5 | `GET /admin` | Authenticated at IAP **and** signed in via NextAuth as a `workspace domain` (`abay-germes.kz`) account | App's `isAllowedDomain` check passes; `/admin` loads (`200`), no app-level rejection |
| 6 | (if available) `GET /admin` | Authenticated at IAP **and** signed in via NextAuth as a **non**-`abay-germes.kz` account | App's `isAllowedDomain` check rejects; app returns its own denial (not a platform-level `403`) — confirms the domain gate still functions with IAP in front of it |

Steps 3–6 require an actual browser session (IAP login, then NextAuth login) — they cannot be done with a bare `curl`. Step 6 needs a second, non-workspace test account; if none is available, it should be explicitly marked "not tested" rather than skipped silently.

## 6. PASS/FAIL criteria

**Overall PASS** requires all of:

- Step 1 and 2: IAP redirect observed (platform layer confirmed for these specific paths, not just `/`).
- Step 3: app returns `200` for `/login` once past IAP — i.e., the app is actually reachable, unlike the original `403 Forbidden` finding.
- Step 4: app itself (not Google Frontend) issues a `302`/`307` to `/login` for unauthenticated `/admin` — this is the specific regression `AUTH-5` needs resolved: the rejection must come from `middleware.ts`, not from infrastructure.
- Step 5: `/admin` loads (`200`) for a valid workspace-domain session.
- Step 6: non-workspace-domain access is rejected at the app layer (or explicitly recorded as not tested, if no second account is available).

**FAIL** if any of:
- Step 1/2 do not show the IAP redirect (regression in the already-confirmed platform layer).
- Step 3 or 4 still return a `403` before reaching the app (would mean the original AUTH-5 root cause is not actually resolved by IAP).
- Step 5 fails to load `/admin` for a legitimate workspace account.
- Step 6 allows a non-workspace account into `/admin` (a security regression, not just an unresolved blocker).

**PARTIAL** if steps 1–5 pass but step 6 is explicitly not tested (no second account available) — resolves `AUTH-5` for the intended-user path but leaves the negative case unverified.

## 7. Safe test principle

- No token, cookie, OAuth code, or session artifact is captured, logged, or pasted anywhere (same handling rule already applied in `SPRINT-6B-2G_AUTHENTICATED_IAP_LOGIN_TEST_RESULT.md`).
- Steps 1–2 can be done with a plain read-only HTTP check (no credentials). Steps 3–6 require manual interactive browser testing, same method as `SPRINT-6B-2G`.
- No data write, schema change, or migration at any step — this is a read/observe-only behavioral check.

## 8. Failure handling

If any step fails:

1. **Stop** — do not change IAM, Terraform, or app code to "fix" it inline during the test.
2. **Classify**: platform-layer failure (IAP/LB/certificate regression — compare against `SPRINT-6B_CLOSURE_READINESS_REVIEW.md`'s baseline) vs. app-layer failure (`middleware.ts`/`isAllowedDomain` logic).
3. **Report** the exact step, request, and observed status/redirect target (no secrets).
4. Any fix requires its own separate, explicitly approved gate — not made part of this verification run.

## 9. Follow-up tasks

1. If PASS or PARTIAL: close `AUTH-5` and update `SPRINT-6B_CLOSURE_READINESS_REVIEW.md` (or a successor doc) to mark Sprint 6B ready for completion.
2. If PARTIAL (step 6 untested): schedule a follow-up once a second, non-workspace test account is available.
3. If FAIL: a new investigation gate scoped to whichever layer failed.

## 10. Readiness classification

Plan only. Ready for review. Execution (the actual browser-based steps 3–6, and even the read-only steps 1–2) remains blocked until its own explicit, separate approval.
