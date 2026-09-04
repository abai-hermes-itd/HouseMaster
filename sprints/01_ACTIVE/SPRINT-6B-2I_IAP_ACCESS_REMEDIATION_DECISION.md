# SPRINT-6B-2I — IAP Access Remediation Decision

Status: DECIDED / DOCS-ONLY — no binding applied
Date: 2026-09-04
Branch: feat/hm-gcp-003d-cloud-sql-import

---

## 1. Context

`SPRINT-6B-2H_IAP_ACCESS_REVOCATION_FINDING.md` confirmed that `roles/iap.httpsResourceAccessor` is bound to no principal anywhere in this project's IAM hierarchy (resource, project, or org level), and that the access `SPRINT-6B-2G` exercised on 2026-09-02 no longer works. That finding named this decision — which principal to re-grant the role to — as its recommended next gate, without choosing one. This note makes that choice. It does not apply it.

## 2. Options considered

| Option | Description | Named in |
|---|---|---|
| A — Direct user | Bind `roles/iap.httpsResourceAccessor` to `user:markelus@abay-germes.kz` only | `SPRINT-6B-2H` |
| B — Domain | Bind to `domain:abay-germes.kz` | `SPRINT-6B-0_IAP_FEASIBILITY_PREFLIGHT.md` §"open question 4"; `SPRINT-6B_IAP_CONTROLLED_ACCESS_IMPLEMENTATION_PLAN.md` §3.3 | 
| C — Group | Bind to a specific admin Google Group | Same two docs, as the alternative to B |

## 3. Decision

**Recommended: Option B — `domain:abay-germes.kz`.**

## 4. Rationale

- The implementation plan's own target access model (`SPRINT-6B_IAP_CONTROLLED_ACCESS_IMPLEMENTATION_PLAN.md` §2, §3.3) already states the goal as "browser-based access for authorized Abay-Germes users" and "restricted to Abay-Germes / approved workspace users," not a single named individual. A domain-scoped binding is what the design already intended, not a new decision invented here.
- The app already enforces the identical boundary one layer up: `ALLOWED_WORKSPACE_DOMAIN=abay-germes.kz` is the existing app-level domain guard (`SPRINT-6B_IAP_CONTROLLED_ACCESS_IMPLEMENTATION_PLAN.md` §2, `HM-005_CLOSE_SPRINT5_ADMIN_AUTH.md`). Matching the platform-level (IAP) principal to the same domain keeps both access layers expressed the same way, instead of introducing a second, differently-shaped access list (a group's membership) that has to be kept in sync with the domain guard by hand.
- A single-user binding (Option A) would only fix the immediate test account and would recreate exactly the kind of narrow, easy-to-silently-lose access that `SPRINT-6B-2H` just found had already disappeared once — it does not by itself let any other legitimate Abay-Germes user in, which is the whole stated point of Sprint 6B.
- Option C (a specific group) is not rejected outright — it remains a reasonable refinement once there is an actual need to exclude some workspace members from admin access. That need has not been identified yet; `domain:abay-germes.kz` at the IAP layer plus the app's own admin-realm authorization (session/role checks inside the app, separate from IAP) is judged sufficient for now, consistent with `SPRINT-6B_IAP_CONTROLLED_ACCESS_IMPLEMENTATION_PLAN.md` §4's separation between "platform-level access" and "app-level auth."

## 5. What this decision does not do

Docs-only. No IAM change, no policy binding change, no Terraform, no `gcloud` mutation, no deploy, no DNS/Cloud Run/Cloud SQL change, no Secret Manager payload, no password/`DATABASE_URL` printing, no DB mutation, no `prisma migrate deploy`, no `package.json` edit, no automation/hook/CI wiring. Nothing was staged, committed, or pushed by creating this file. `roles/iap.httpsResourceAccessor` remains unbound to any principal until a separate, explicitly approved gate applies this decision.

## 6. Next safe gate

A scoped Terraform (or `gcloud`, if Terraform coverage for this binding is not yet in place — `SPRINT-6B-1A_IAP_TERRAFORM_DESIGN_SPEC.md` named `google_iap_web_backend_service_iam_member` as the intended resource, which does not exist in the applied config per `SPRINT-6B-2H`) change binding `roles/iap.httpsResourceAccessor` on `next-web-iap-backend` to `domain:abay-germes.kz`. That change — plan, review, and apply — is its own separately-approved gate, not run here. After it applies, rerun the `SPRINT-6B-2G`/`SPRINT-6C`-style manual login test to confirm access is restored before treating Sprint 6B as unblocked again.
