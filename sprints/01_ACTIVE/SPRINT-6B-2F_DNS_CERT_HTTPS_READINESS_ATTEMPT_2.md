# SPRINT-6B-2F — DNS / Certificate / HTTPS Readiness Verification Attempt 2

Status: PASS / IAP HTTPS READY
Date: 2026-09-02
Branch: feat/hm-gcp-003d-cloud-sql-import

## 1. Context

Attempt 1 (`SPRINT-6B-2F_DNS_CERT_HTTPS_READINESS_ATTEMPT_1.md`, 2026-09-01) found
DNS not resolving publicly, blocking certificate provisioning. That led to the
authoritative-nameserver check (`SPRINT-6B-2F_AUTH_NS_CHECK_EVIDENCE.md`) and the
ISMET DNS record request, now closed
(`SPRINT-6B-2F_ISMET_DNS_RECORD_CLOSURE.md`, commit `1415c7e`, pushed).

This attempt re-runs the same class of check now that DNS resolves, to confirm
certificate provisioning and HTTPS/IAP readiness for the correct hostname,
`iap-dev.housemasters.kz`.

## 2. Repo state

- Repo clean before check: yes (`git status --short` empty).
- Repo clean after check: yes (`git status --short` empty) — this was a
  read-only infrastructure check; no working-tree file was touched by it.

## 3. Certificate state

- `iap-dev-housemasters-cert` (correct hostname): **ACTIVE**,
  `iap-dev.housemasters.kz=ACTIVE`.
- `iap-dev-housemaster-cert` (old/mismatched hostname, no `s`): still
  **PROVISIONING**, `iap-dev.housemaster.kz=FAILED_NOT_VISIBLE` — expected,
  since no DNS record targets that singular hostname. Not in use by the HTTPS
  proxy and not blocking the correct hostname.

## 4. HTTPS / IAP reachability

- `curl -sI https://iap-dev.housemasters.kz` (single attempt, no retries):
  **HTTP/1.1 302 Found**.
- Response carried `x-goog-iap-generated-response: true` and a `location:`
  redirect to `https://accounts.google.com/o/oauth2/v2/auth?...` — IAP itself
  intercepted the unauthenticated request and redirected to Google OAuth
  login, with an IAP XSRF-nonce cookie set. This is the expected, correct
  behavior for an IAP-protected endpoint reached without credentials, and
  confirms the full chain (DNS -> load balancer -> HTTPS certificate -> IAP ->
  backend) is functioning end-to-end.

## 5. Actions taken during this check

- No Terraform was run.
- No deploy was run.
- No DNS, IAM, Cloud Run, Secret Manager, Cloud SQL, or DB change was made.
- No endpoint call beyond the single already-completed read-only HTTPS check
  above (no authenticated call, no IAM grant, no identity token used).

## 6. Conclusion

- Blocker active: no.
- `iap-dev.housemasters.kz` is fully DNS-resolved, certificate-ACTIVE, and
  serving HTTPS with IAP correctly enforcing authentication.
- The stale `iap-dev-housemaster-cert` (no `s`) remains PROVISIONING but does
  not affect the correct hostname's readiness.

## 7. Next safe gate

Either of:

- An authenticated IAP login test as `markelus@abay-germes.kz` (its own
  separate, explicit gate — not run here).
- Sprint 6B readiness closure planning (deciding whether Sprint 6B's IAP
  controlled-access implementation is ready to be marked complete).

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
