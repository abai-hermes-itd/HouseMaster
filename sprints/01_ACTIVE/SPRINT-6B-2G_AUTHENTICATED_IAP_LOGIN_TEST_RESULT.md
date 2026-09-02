# SPRINT-6B-2G — Authenticated IAP Login Test Result

Status: PASS / AUTHENTICATED IAP LOGIN CONFIRMED
Date: 2026-09-02
Branch: feat/hm-gcp-003d-cloud-sql-import

## 1. Context

`SPRINT-6B-2F_DNS_CERT_HTTPS_READINESS_ATTEMPT_2.md` confirmed unauthenticated
HTTPS/IAP readiness for `iap-dev.housemasters.kz` (DNS resolved, certificate
ACTIVE, unauthenticated request correctly redirected to Google OAuth) and
named the authenticated IAP login test as the next safe gate — its own
separate, explicit gate, not run in that check.

This doc records that gate.

## 2. Test performed

- Target: `https://iap-dev.housemasters.kz`
- Account used: `markelus@abay-germes.kz`
- Method: interactive browser login through the Google OAuth flow IAP
  presented (manual test, not scripted/automated).

## 3. Result

- **PASS** — Google OAuth login completed successfully.
- The protected site/application loaded after IAP login (final visible result:
  the application/page loaded).
- No IAP access-denied page and no app-level error was encountered.

## 4. Evidence handling

- No tokens, cookies, OAuth codes, or secret URLs were captured, logged, or
  pasted anywhere (including in this doc).
- This doc records the test outcome only, not any credential or session
  artifact.

## 5. Actions taken during this test

- No Terraform was run.
- No deploy was run.
- No DNS, IAM, Cloud Run, Secret Manager, Cloud SQL, or DB change was made.
- No password, token, cookie, OAuth code, or `DATABASE_URL` value was printed
  or recorded.
- No package.json edit, no automation/wiring change.
- No git add/commit/push performed as part of this test or this doc.

## 6. Conclusion

- Both platform-level gates for IAP-controlled access to
  `iap-dev.housemasters.kz` are now confirmed:
  - Unauthenticated request -> correctly redirected to Google OAuth
    (`SPRINT-6B-2F_DNS_CERT_HTTPS_READINESS_ATTEMPT_2.md`).
  - Authenticated request as `markelus@abay-germes.kz` -> IAP login succeeds
    and the application loads (this doc).
- The full chain (DNS -> load balancer -> HTTPS certificate -> IAP -> IAM
  principal check -> backend) is functioning end-to-end for this principal.

## 7. Next safe gate

Sprint 6B readiness closure planning: decide whether Sprint 6B's IAP
controlled-access implementation is ready to be marked complete, and whether
any other principals/domain-scoped access still need to be verified or
documented before closure. Not run here.

## 8. Stop line

No Terraform apply.
No DNS change.
No Cloud Run ingress restriction.
No Cloud Run deploy/update.
No IAM change.
No Secret Manager payload.
No DB/Prisma.
No app code.
No cleanup/delete of the old stale certificate yet.
No git add/commit/push.
