# SPRINT-6B — Closure Readiness Review

Status: BLOCKED / NOT READY FOR COMPLETE
Reason: AUTH-5 rerun through IAP path required
Next gate: SPRINT-6C — AUTH-5 live-behavior verification
Date: 2026-09-04
Branch: feat/hm-gcp-003d-cloud-sql-import

---

## 1. Context

This review answers one question: is Sprint 6B (Cloud Run access via IAP / controlled access) ready to be marked complete? It follows a read-only evidence-chain verification checkpoint run earlier this session against the docs already in `sprints/01_ACTIVE/SPRINT-6B-*`.

Sprint 6B's own acceptance criteria are defined in `SPRINT-6B_IAP_CONTROLLED_ACCESS_IMPLEMENTATION_PLAN.md` §9, and its proposed gate sequence in §10 ends with `SPRINT-6C — rerun AUTH-5 live behavior verification`.

## 2. Platform-access evidence chain — PASS (all 6 items)

| # | Item | Result | Source |
|---|---|---|---|
| 1 | DNS resolved | PASS | `SPRINT-6B-2F_ISMET_DNS_RECORD_CLOSURE.md` — `iap-dev.housemasters.kz` → `8.232.62.29`, confirmed across 3 resolvers, 2 rounds |
| 2 | Managed certificate ACTIVE | PASS | `SPRINT-6B-2F_DNS_CERT_HTTPS_READINESS_ATTEMPT_2.md` — `iap-dev-housemasters-cert` = ACTIVE |
| 3 | HTTPS reachable | PASS | same doc — `curl -sI` → `302 Found` from the IAP proxy |
| 4 | IAP redirect observed | PASS | same doc — `x-goog-iap-generated-response: true`, redirected to Google OAuth |
| 5 | Authenticated login PASS | PASS | `SPRINT-6B-2G_AUTHENTICATED_IAP_LOGIN_TEST_RESULT.md` — login as `markelus@abay-germes.kz` succeeded, app loaded |
| 6 | Evidence committed and pushed | PASS | commits `1415c7e`, `c47a57b`, `a170d5c` are all ancestors of the current pushed branch HEAD |

The platform-access layer (DNS → load balancer → HTTPS certificate → IAP → IAM principal check → backend) is confirmed functioning end-to-end for one principal.

## 3. Why this is not full Sprint 6B closure

`SPRINT-6B_IAP_CONTROLLED_ACCESS_IMPLEMENTATION_PLAN.md` §9 acceptance criteria requires, in addition to the platform-access chain above: **"AUTH-5 can be rerun through the selected access route."** That is `SPRINT-6C`'s job (§4: "Verify `/login` and `/admin` through the chosen access path. Confirm whether Sprint 5 AUTH blocker is resolved.") — a distinct, not-yet-performed gate.

`SPRINT-6B-2G`'s login test confirmed generic IAP login success and that "the application/page loaded," but did not specifically re-verify `/login` and `/admin` app-level behavior against `AUTH-5`'s original test criteria. Sprint 5 (`HM-005`) was closed with `AUTH-5` explicitly recorded as an open blocker (commit `fec6adc`), deferred to this track — and it remains open.

## 4. Other remaining items (non-blocking for the AUTH-5 rerun, but open)

- Stale/mismatched certificate `iap-dev-housemaster-cert` (no "s") left un-cleaned — deferred in every `SPRINT-6B-2F`/`2G` "Stop line," not itself a closure blocker.
- `HOUSEMASTER_SPRINT_ROADMAP.md` has no entry for Sprint 6B or IAP at all.
- Only one principal (`markelus@abay-germes.kz`) has been tested; `SPRINT-6B-2G` itself flags that other principals/domain-scoped access remain unverified.

## 5. Conclusion

Sprint 6B: **BLOCKED / NOT READY FOR COMPLETE.** The platform-access evidence chain is fully PASS, but the sprint's own acceptance criteria are not yet satisfied until `AUTH-5` is rerun through the IAP path.

## 6. Next gate

**SPRINT-6C — AUTH-5 live-behavior verification.** Verify `/login` and `/admin` through `https://iap-dev.housemasters.kz` and confirm whether the Sprint 5 `AUTH-5` blocker is resolved. Not run by this review.

## 7. Scope of this document

Docs-only. No Terraform, deploy, Cloud SQL, Secret Manager, IAM, DNS, Cloud Run, DB, Prisma, or `package.json` change was made or implied. Nothing was staged, committed, or pushed by creating this file.
