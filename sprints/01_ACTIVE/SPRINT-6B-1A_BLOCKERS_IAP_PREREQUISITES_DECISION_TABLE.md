# SPRINT-6B-1A-BLOCKERS — IAP Prerequisites Decision Table

Status: DRAFT / DOCS-ONLY
Date: 2026-08-31
Branch: feat/hm-gcp-003d-cloud-sql-import
Scope: Resolve blocking decisions before SPRINT-6B-1B Terraform edit + plan-only.

## 1. Context

SPRINT-6B-1A documented the target IAP controlled-access architecture.

This document records the blocking decisions required before Terraform implementation can be safely scoped.

No Terraform, GCP, IAM, Secret Manager, DB/Prisma, app code, deploy, or apply action is performed by this document.

## 2. Decision table

| Decision | Current position | Required before Terraform edit? | Notes |
|---|---|---:|---|
| Hostname / domain | TBD | Yes | HTTPS Load Balancer needs a stable hostname or explicit temporary strategy. |
| Certificate strategy | TBD | Yes | Prefer Google-managed certificate if DNS control is available. |
| IAP OAuth brand/client | Unknown / likely precondition | Yes | Must confirm whether existing OAuth setup can support IAP or whether iap.googleapis.com / brand/client work is needed. |
| IAP principal scope | Admin-only first | Yes | Initial scope should be the smallest safe allowlist, not allUsers. |
| Cloud Run ingress mode | Keep current until LB/IAP path exists | Yes | Do not restrict ingress further until path is created and verified. |
| Existing NextAuth/Auth.js relation | IAP does not replace app auth | Yes | IAP gates platform access; NextAuth remains app/session/admin realm layer. |
| Old google-client-secret version 1 | Keep enabled for now | No | Disable only after separate explicit approval. |

## 3. Recommended initial decisions

1. Hostname:
   - Use a dedicated dev/test hostname for IAP access.
   - Do not use raw Cloud Run URL as the target access route.

2. Certificate:
   - Use Google-managed certificate if DNS can be pointed to the Load Balancer.
   - If DNS is not ready, keep Terraform design modular and do not apply.

3. IAP OAuth:
   - Resolve IAP OAuth brand/client readiness before defining final Terraform resources.
   - Any API enablement or OAuth brand/client creation is a separate mutation gate.

4. Principal scope:
   - Start with a minimal admin allowlist or Google Group.
   - Do not grant allUsers or allAuthenticatedUsers.

5. Cloud Run ingress:
   - Keep current Cloud Run settings during design/plan.
   - Only change ingress after Load Balancer/IAP path is confirmed.

6. NextAuth:
   - Preserve existing NextAuth/Auth.js logic.
   - AUTH-5 must be rerun after platform access path is corrected.

## 4. Next gates

SPRINT-6B-1A-CHECK:
Read-only check of current IAP API / OAuth brand / hostname assumptions.

SPRINT-6B-1B:
Terraform edit + validate + plan-only for the selected controlled-access architecture.

SPRINT-6B-1C:
Review Terraform plan.

SPRINT-6B-3:
Controlled apply only after explicit approval.

SPRINT-6C:
Rerun AUTH-5 live behavior verification.

## 5. Stop line

No Terraform.
No GCP mutation.
No IAM change.
No Secret Manager payload.
No DB/Prisma.
No app code.
No deploy.
No apply.
No public allUsers exposure.
No disabling old secret version.
