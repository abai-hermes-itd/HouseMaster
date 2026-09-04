# SPRINT-6C — Manual Browser Test Instructions (AUTH-5 Steps 3–6)

**Status:** Instructions only — not executed
**Type:** Manual test instructions, follow-up to `SPRINT-6C_AUTH5_LIVE_BEHAVIOR_VERIFICATION_PLAN.md`
**Date:** 2026-09-04
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Scope:** Instructions only. No browser action, no endpoint call, no git operation is performed by creating this document.

---

## 1. Why this exists

Steps 1–2 of `SPRINT-6C_AUTH5_LIVE_BEHAVIOR_VERIFICATION_PLAN.md` (unauthenticated `curl` checks against `/login` and `/admin`) have been run and both confirmed **PASS** at the platform (IAP) layer. Steps 3–6 require an actual interactive browser session — IAP login, then the app's own NextAuth login — which cannot be done from this session. This document is the set of instructions for a human to perform those steps and report back what was observed.

## 2. Before you start

- Use a private/incognito browser window, so no old Google session or cookie affects the result.
- Do **not** paste any token, cookie value, OAuth `code=` parameter, or full redirect URL into any report, chat, or file. Report only the outcome (what page loaded, what status/behavior you saw) — same evidence-handling rule already used in `SPRINT-6B-2G_AUTHENTICATED_IAP_LOGIN_TEST_RESULT.md`.
- Primary test account: `markelus@abay-germes.kz` (the same account already used in `SPRINT-6B-2G`).
- Optional (Step 6 only): a second Google account that is **not** on the `abay-germes.kz` workspace domain, if one is available to you. If not available, skip Step 6 and say so — don't substitute another account type.

## 3. Steps

**Step 3 — `/login`, after IAP login, before any app-level session**

1. Go to `https://iap-dev.housemasters.kz/login`.
2. Complete the Google OAuth screen IAP presents, signing in as `markelus@abay-germes.kz`.
3. Observe what loads immediately after IAP login completes.
4. **Expected (PASS):** the app's own `/login` page renders (a real login screen, HTTP `200` — not another redirect loop, not an infrastructure error page).

**Step 4 — `/admin`, IAP-authenticated but no app (NextAuth) session yet**

1. In the same private window (IAP session active, but you have not yet signed in through the app's own `/login` screen), navigate directly to `https://iap-dev.housemasters.kz/admin`.
2. Observe what happens.
3. **Expected (PASS):** you are redirected to the app's `/login` page (not an infrastructure `403`, not a blank page, not a crash).

**Step 5 — `/admin`, IAP-authenticated *and* signed in via the app's own login as a workspace account**

1. From the app's `/login` page, sign in using `markelus@abay-germes.kz` through whatever login control the app presents (Google sign-in button, etc.).
2. Navigate to `https://iap-dev.housemasters.kz/admin`.
3. Observe what happens.
4. **Expected (PASS):** the admin page loads (HTTP `200`) — no rejection, no error.

**Step 6 — `/admin`, signed in via the app as a *non*-workspace account (optional, only if a second account is available)**

1. Repeat Step 5's app-level login, but with the non-`abay-germes.kz` account.
2. Navigate to `https://iap-dev.housemasters.kz/admin`.
3. Observe what happens.
4. **Expected (PASS):** the app itself rejects access (its own denial/redirect — not an infrastructure `403`) — confirming `isAllowedDomain` still functions with IAP in front of it.
5. If no second account is available, write "not tested — no second account available" instead of guessing.

## 4. What to report back

For each step, report just:
- Step number
- What you observed (one line — e.g. "app login page loaded", "redirected to /login", "admin page loaded with dashboard", "got a 500 error page", "not tested")
- PASS / FAIL / NOT TESTED

Do not include screenshots or logs containing cookies, tokens, or URLs with `code=`/`state=`/`code_challenge=` parameters.

## 5. Scope reminder

This document only contains instructions. No Terraform, deploy, Cloud SQL, Secret Manager, IAM, DNS, Cloud Run, DB, Prisma, or `package.json` change is made or implied. No git operation is part of creating this file.
