# SPRINT-6B-0 — Read-Only IAP Feasibility Preflight

**Status:** Complete — documentation only, no implementation decision made
**Type:** Read-only investigation, evidence document only — no apply, no mutation
**Date:** 2026-08-30
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Scope:** Per `SPRINT-6B_IAP_CONTROLLED_ACCESS_IMPLEMENTATION_PLAN.md` §4, "SPRINT-6B-0 — Read-only IAP feasibility preflight": inspect current Terraform structure, Cloud Run/IAM/load-balancer/certificate/IAP-related state, and determine whether IAP prerequisites exist. No mutation.
**Follows:** `sprints/01_ACTIVE/SPRINT-6A_CLOUD_RUN_INGRESS_IAM_POLICY_DECISION.md` (commit `228183d`), `sprints/01_ACTIVE/SPRINT-6B_IAP_CONTROLLED_ACCESS_IMPLEMENTATION_PLAN.md` (commit `20e0ef4`)

---

## No-Mutation Confirmation

Every command run for this preflight was read-only: `gcloud config get-value`, `gcloud run services describe`, `gcloud run services get-iam-policy`, `gcloud iap oauth-brands list`, `gcloud compute backend-services/network-endpoint-groups/url-maps/target-https-proxies/ssl-certificates/forwarding-rules list`, plus a `grep` over `infrastructure/terraform`. `gcloud iap oauth-brands list` prompted to auto-enable the `iap.googleapis.com` API — **this was declined; the API was not enabled.** No `terraform apply`, no `gcloud ... set-iam-policy` / `services update` / `org-policies set-policy`, no API enablement, no Secret Manager read, no DB/Prisma action, no app code, dependency, or lockfile change, and no commit/push/PR action occurred in this preflight.

---

## Evidence Gathered

### Active gcloud account / project

```
$ gcloud config get-value account  →  markelus@abay-germes.kz
$ gcloud config get-value project  →  housemaster-dev-503409
```
Matches required guardrails.

### Cloud Run service (`next-web`, `europe-west1`)

- URL: `https://next-web-bbqvhnfzta-ew.a.run.app`
- `latestReadyRevisionName` / `latestCreatedRevisionName`: `next-web-00011-mwl` (equal — no rollout in progress)
- Ingress: `all` (`run.googleapis.com/ingress: all`) — relevant because the IAP-via-Load-Balancer pattern requires this to become `internal-and-cloud-load-balancing`.
- Runtime service account: `sa-web-dev@housemaster-dev-503409.iam.gserviceaccount.com`

### Cloud Run IAM invoker policy (fresh read, consistent with SPRINT-6A)

```json
{
  "bindings": [
    {
      "members": ["serviceAccount:sa-deployer-dev@housemaster-dev-503409.iam.gserviceaccount.com"],
      "role": "roles/run.developer"
    }
  ],
  "etag": "BwZaAIhfLbg=",
  "version": 1
}
```
One binding, `roles/run.developer` only — no `run.invoker` grant to anyone, public or named. Unchanged since SPRINT-6A; service remains fully private.

### Terraform files relevant to IAP/LB/NEG/cert/IAM

**Not found.** `grep -i "iap|load_balanc|backend_service|network_endpoint_group|ssl_certificate|forwarding_rule|url_map|target_https_proxy|compute_global|serverless_neg"` over `infrastructure/terraform` returned zero matches. None of this infrastructure exists in IaC.

### Live IAP OAuth brand/client

**Denied — service disabled, plus an unresolved deprecation risk.** `gcloud iap oauth-brands list --project=housemaster-dev-503409` returned:

```
API [iap.googleapis.com] not enabled on project [housemaster-dev-503409].
ERROR: ... Cloud Identity-Aware Proxy API has not been used in project
housemaster-dev-503409 before or it is disabled.
```

The command also carried this deprecation warning verbatim, before the error:

> "This command is deprecated and will be non-functional after the IAP OAuth Admin APIs are turned down. Jan 19, 2026: Google will discontinue support for the IAP OAuth Admin APIs. New projects will not be able to use these APIs. March 19, 2026: The IAP OAuth Admin APIs will be permanently shut down."

Today's date (2026-08-30) is **after** the stated March 19, 2026 shutdown. This means the standard `gcloud iap oauth-brands` / OAuth-Admin-API method for provisioning IAP's required consent screen ("brand") may no longer function at all, independent of whether `iap.googleapis.com` itself gets enabled. This was **not tested against the actual post-shutdown behavior** — the error observed was disabled-service, not a post-shutdown-specific error — so this is a flagged risk, not a confirmed dead end. It also was not checked whether an OAuth brand already exists on this project from Sprint 5's own Google OAuth setup (Auth.js already uses `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`), which could be relevant either way.

### Live Load Balancer / NEG / IAP-adjacent Compute resources

All empty:
```
backend-services:            []
network-endpoint-groups:     []
url-maps:                    []
target-https-proxies:        []
ssl-certificates:            []
forwarding-rules (global):   []
```
No Load Balancer, NEG, URL map, HTTPS proxy, certificate, or forwarding rule exists live. Confirms IAP/LB infrastructure is entirely unbuilt, both in IaC and live — matches the "not found" Terraform result above.

---

## Feasibility Assessment

**IAP appears feasible in principle, but is not clean yet — treat as an open risk, not a settled path.**

- The org-policy obstacle from SPRINT-6A does **not** block IAP itself: IAP's own service agent would hold `roles/run.invoker` (not `allUsers`), and IAP's own access control (`roles/iap.httpsResourceAccessor`) can be scoped to `domain:abay-germes.kz` — staying inside the `iam.allowedPolicyMemberDomains` constraint confirmed enforced in SPRINT-6A. `allUsers`/`allAuthenticatedUsers` remain categorically blocked either way.
- The new, previously unknown risk is the OAuth brand/client provisioning path (above) — this is the actual open blocker for SPRINT-6B-1, not org policy.
- No infrastructure prerequisite exists yet (Terraform or live) — this is expected for a not-yet-started gate, not itself a blocker, but it means the full stack has to be built from nothing.

**Minimum likely architecture** (if OAuth brand/client provisioning is confirmed workable): External HTTPS Load Balancer → Serverless NEG (→ `next-web`) → Backend Service with IAP enabled → URL Map → Target HTTPS Proxy → Google-managed SSL certificate → Global forwarding rule; Cloud Run ingress changed to `internal-and-cloud-load-balancing`; `roles/run.invoker` granted to the IAP service agent (`service-<PROJECT_NUMBER>@gcp-sa-iap.iam.gserviceaccount.com`), not `allUsers`; `roles/iap.httpsResourceAccessor` scoped to `domain:abay-germes.kz` or an approved admin group.

---

## Decisions Required Before SPRINT-6B-1

1. Resolve the OAuth brand/client provisioning question — Console-based fallback vs. reuse of an existing brand from Sprint 5's Google OAuth setup vs. a genuinely blocked path — before designing Terraform around a resource that may not be creatable.
2. Whether enabling `iap.googleapis.com` is acceptable as its own explicit, isolated, approved mutation (small, low blast-radius, but still a mutation — separate approval from a design-only gate).
3. IAP-vs-NextAuth architecture call: does IAP replace, wrap, or run alongside Sprint 5's `isAllowedDomain()` check? (`SPRINT-6B` plan §3.4 already frames this as open.)
4. Which principal to scope `roles/iap.httpsResourceAccessor` to — org domain vs. a specific admin Google Group.
5. Whether the LB+NEG+IAP buildout is worth the cost/complexity for a dev environment now, or whether a quick direct check with the Org Policy Admin (whether any exception to `iam.allowedPolicyMemberDomains` has ever been granted elsewhere in the org — SPRINT-6A's parallel side-check) should be resolved first, since a "yes" there would reopen a much simpler path (Option E).

---

## Recommended Next Gate

**SPRINT-6B-1 — Terraform design / plan-only**, per the sequence already proposed in `SPRINT-6B_IAP_CONTROLLED_ACCESS_IMPLEMENTATION_PLAN.md` §4/§10: draft the Terraform change set for the architecture above (serverless NEG, backend service with IAP, URL map, HTTPS proxy, managed cert, forwarding rule, IAM bindings), run `terraform fmt` / `terraform validate` / `terraform plan` only — no apply, no API enablement, no live IAM change. The OAuth brand/client provisioning question (Decision #1 above) should be resolved as a blocking sub-task before that gate designs the IAP-brand resource specifically, since it may change what's even draftable. SPRINT-6B-1 does not have new approval yet and is not started by this document.

---

## Sprint 6 Current Status

Sprint 6 ("Runtime Config / Secret Hygiene") is **in progress**:
- SPRINT-6A (Cloud Run Ingress/IAM Policy Decision) — **closed, pushed** (`228183d`).
- SPRINT-6B (IAP / controlled access implementation plan) — **closed as docs-only, pushed** (`20e0ef4`).
- SPRINT-6B-0 (this document, read-only IAP feasibility preflight) — **complete**. Findings: IAP is feasible in principle (compliant with the org-wide `iam.allowedPolicyMemberDomains` constraint confirmed in SPRINT-6A) but not clean — OAuth brand/client provisioning is an unresolved blocker/risk, and `iap.googleapis.com` is not currently enabled. No infrastructure (Terraform or live) exists yet for the LB/NEG/IAP stack.
- SPRINT-6B-1 (Terraform design/plan-only) — **not started; requires new approval**, per this document's recommendation above.
- SPRINT-6B-2 (PR/review), SPRINT-6B-3 (controlled apply), and SPRINT-6C (re-run AUTH-5) remain open per the SPRINT-6B plan's proposed sequence.

---

## Upcoming Sprint Summary (for context, not authoritative roadmap)

- **Sprint 6 — Runtime Config / Secret Hygiene** *(current track — see status above)*.
- **Sprint 7 — Admin Console MVP** — gated on Sprint 6 resolving public reachability.
- **Sprint 8 — DB / Prisma Production Hardening** — working-plan name from prior sessions, not yet written to a committed roadmap file.
- **Sprint 9 — API Boundary / Internal Services** — same caveat as Sprint 8.

`sprints/00_ROADMAP/HOUSEMASTER_SPRINT_ROADMAP.md` still uses its own older numbering and has not been reconciled with this Sprint 6–9 track (noted already in SPRINT-6A).
