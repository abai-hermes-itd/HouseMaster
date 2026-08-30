# SPRINT-6B — Cloud Run Access via IAP / Controlled Access Implementation Plan

Status: DRAFT / DOCS-ONLY  
Sprint: 6 — Runtime Config / Secret Hygiene  
Depends on: SPRINT-6A Cloud Run Ingress/IAM Policy Decision  
Mode: planning only; no Terraform, no IAM mutation, no deploy

---

## 1. Problem statement

SPRINT-6A confirmed that the live Cloud Run service is not reachable by a normal browser request.

Observed behavior:

- `/login` returns HTTP 403 from Google Frontend.
- `/admin` returns HTTP 403 from Google Frontend.
- The request is rejected before it reaches Next.js middleware or application code.
- Therefore Sprint 5 AUTH code cannot be live-verified through the current Cloud Run URL.

Root cause confirmed in SPRINT-6A:

- `iam.allowedPolicyMemberDomains` is enforced at the organization level.
- `allUsers` and `allAuthenticatedUsers` cannot be used for public Cloud Run invoker access.
- The Cloud Run service currently has no invoke-capable public principal.
- Public `allUsers` access is not a viable remediation path under current org policy.

---

## 2. Target access model

Recommended target path:

**Cloud Run access through Identity-Aware Proxy / controlled access.**

The target model should preserve:

- no public `allUsers` exposure;
- compliance with organization policy;
- browser-based access for authorized Abay-Germes users;
- ability to rerun AUTH-5 live behavior verification;
- separation between platform-level access and app-level authorization.

Platform-level access:

- IAP or controlled ingress decides whether a browser/user may reach the service boundary.
- Cloud Run invoker permission is granted only to the required controlled principal, not to the public internet.

App-level auth:

- Existing NextAuth / Google OAuth logic remains responsible for application session behavior.
- `ALLOWED_WORKSPACE_DOMAIN=abay-germes.kz` remains the app-level domain guard.
- Admin realm logic remains inside the app and must still be tested after platform access is solved.

---

## 3. Required architecture decisions

Before implementation, decide:

1. **Access route**
   - Direct Cloud Run access is currently blocked.
   - IAP normally requires an external HTTPS Load Balancer with serverless NEG.
   - Confirm whether the target is:
     - external HTTPS Load Balancer + serverless NEG + IAP;
     - another approved controlled access pattern;
     - or a temporary authenticated invoker test path.

2. **IAP OAuth brand/client**
   - Determine whether an IAP OAuth brand already exists.
   - Determine whether an IAP OAuth client is already configured.
   - Confirm whether this can be managed by Terraform or must be pre-created/manual.

3. **Domain-scoped access**
   - Target access should be restricted to Abay-Germes / approved workspace users.
   - Avoid `allUsers` and `allAuthenticatedUsers`.

4. **Relation to NextAuth**
   - IAP is not a replacement for app authorization unless explicitly decided later.
   - Existing NextAuth should remain in place for app-level login/session/admin realm behavior.

5. **AUTH-5 rerun target**
   - Decide whether AUTH-5 should be rerun through:
     - the IAP-protected URL;
     - a temporary authenticated-invoker test URL;
     - or another controlled dev endpoint.

---

## 4. Proposed implementation sequence

### SPRINT-6B-0 — Read-only IAP feasibility preflight

Goal:

- Inspect current Terraform structure.
- Inspect current Cloud Run, IAM, load balancer, certificate, DNS, and IAP-related state.
- Determine whether IAP prerequisites exist.

No mutation.

### SPRINT-6B-1 — Terraform design / plan-only

Goal:

- Draft the Terraform change set required for controlled access.
- Run `terraform fmt`, `terraform validate`, and `terraform plan`.
- Confirm plan scope before any apply.

No apply.

### SPRINT-6B-2 — PR / review

Goal:

- Commit the approved plan/code changes.
- Open PR for review.
- Confirm no unrelated infrastructure or secret changes.

No apply.

### SPRINT-6B-3 — Controlled apply

Goal:

- Apply only the reviewed Terraform plan.
- Confirm Cloud Run access path is updated as expected.
- No DB/Prisma/secret payload operations.

### SPRINT-6C — Rerun AUTH-5 live behavior verification

Goal:

- Verify `/login` and `/admin` through the chosen access path.
- Confirm whether Sprint 5 AUTH blocker is resolved.

---

## 5. Terraform / IAM resources likely involved

Potential resources or configuration areas:

- serverless NEG for Cloud Run;
- external HTTPS Load Balancer;
- backend service with IAP enabled;
- IAP OAuth brand/client configuration or references;
- IAM binding for IAP HTTPS resource accessor;
- Cloud Run invoker binding for the IAP service agent;
- managed certificate or certificate map if custom domain is required;
- DNS/domain routing if applicable.

No secret payload values should be read or written in this sprint.

---

## 6. Security guardrails

Hard guardrails:

- no `allUsers` Cloud Run invoker binding;
- no `allAuthenticatedUsers` Cloud Run invoker binding unless separately approved;
- no Secret Manager payload access;
- no `DATABASE_URL` value printing;
- no DB/Prisma actions;
- no Terraform apply without a reviewed saved plan;
- no Cloud Run manual update outside Terraform unless explicitly approved;
- no organization policy mutation in this sprint unless separately approved.

---

## 7. Risks and unknowns

Known risks:

- IAP may require external HTTPS Load Balancer resources, increasing complexity.
- IAP OAuth brand/client setup may not be fully Terraform-managed.
- IAP sign-in can overlap with existing NextAuth sign-in.
- Incorrect IAM binding could keep the service unreachable.
- Terraform state may already contain partial or historical load-balancer artifacts.
- Domain/certificate setup may become a separate dependency.
- AUTH-5 may need to be redefined for an IAP-protected browser flow.

---

## 8. Rollback path

Possible rollback principles:

- remove or disable newly added load-balancer/IAP path if it fails;
- keep Cloud Run private by default;
- preserve existing NextAuth code and Cloud Run service revision;
- avoid changing application code during access-layer remediation;
- rollback must be based on reviewed Terraform state and explicit approval.

---

## 9. Acceptance criteria

SPRINT-6B can be considered successful only if:

- a controlled access path is implemented without public `allUsers` exposure;
- organization policy compliance is preserved;
- Cloud Run remains protected by a known access model;
- authorized browser access path is available for dev/manual QA;
- AUTH-5 can be rerun through the selected access route;
- no secret payloads, DB/Prisma operations, or unrelated infrastructure changes occur.

---

## 10. Proposed next gates

1. `SPRINT-6B-0` — read-only IAP feasibility preflight.
2. `SPRINT-6B-1` — Terraform design / plan-only.
3. `SPRINT-6B-2` — PR / review.
4. `SPRINT-6B-3` — controlled apply.
5. `SPRINT-6C` — rerun AUTH-5 live behavior verification.

---

## 11. Current decision

SPRINT-6B is not yet approved for implementation.

This document is a planning artifact only.

Next safe gate:

**SPRINT-6B-0 — read-only IAP feasibility preflight.**
