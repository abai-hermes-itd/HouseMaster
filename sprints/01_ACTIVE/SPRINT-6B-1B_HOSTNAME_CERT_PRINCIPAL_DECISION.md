# SPRINT-6B-1B-HOSTNAME-CERT-PRINCIPAL — IAP LB Access Decisions

Status: DOCS-ONLY / DECISION
Date: 2026-08-31
Branch: feat/hm-gcp-003d-cloud-sql-import

## 1. Context

Sprint 6B is preparing controlled access to Cloud Run through HTTPS Load Balancer and Identity-Aware Proxy.

Closed prerequisites:

- IAP Terraform design spec.
- IAP prerequisites decision table.
- IAP API enabled.
- IAP OAuth brand confirmed.
- IAP OAuth clients list returned 0 items.
- Google-managed OAuth client approach fixed.
- Terraform layout preflight completed.
- IAP/LB Terraform scope fixed.

## 2. Decision summary

Before Terraform edit and plan-only, the following decisions are fixed for the first controlled-access iteration:

| Decision | First iteration decision | Reason |
|---|---|---|
| Hostname / DNS | Defer production hostname | DNS/certificate is not yet confirmed. Do not block architecture planning on production DNS. |
| Certificate | Defer certificate resource in first Terraform implementation scope | Avoid creating incomplete HTTPS certificate resources without DNS readiness. |
| IAP principal | Start with admin-only user markelus@abay-germes.kz | Minimal controlled test scope. No allUsers/allAuthenticatedUsers. |
| Cloud Run ingress | Leave unchanged in first plan/apply path | Do not risk cutting off access before LB/IAP path is verified. |
| OAuth client | Use Google-managed OAuth client | Avoid deprecated explicit OAuth client creation and avoid secret in Terraform state. |
| App auth | Preserve existing NextAuth/Auth.js | IAP is platform access gate; app/session/admin realm remains application layer. |

## 3. Implication for SPRINT-6B-1B

SPRINT-6B-1B should be Terraform edit + validate + plan-only.

The first plan should focus on planability and resource shape, not production DNS completion.

The first Terraform implementation may define the IAP/LB contour modularly, but must stop if hostname/certificate requirements prevent a safe plan.

## 4. Required safety constraints

- Do not expose Cloud Run to allUsers.
- Do not use allAuthenticatedUsers for IAP.
- Do not create IAP OAuth client.
- Do not use oauth2_client_id.
- Do not use oauth2_client_secret.
- Do not put OAuth client secret into Terraform state.
- Do not disable old google-client-secret version 1.
- Do not change DB/Prisma.
- Do not change app code.

## 5. Next gate

SPRINT-6B-1B — Terraform edit + validate + plan-only for IAP/LB contour.

Expected first Terraform file:

- infrastructure/terraform/iap_lb.tf

Expected Terraform direction:

- serverless NEG for Cloud Run next-web;
- backend service with iap { enabled = true };
- narrow IAP principal binding for markelus@abay-germes.kz;
- URL map / proxy / forwarding rule only if safely planable;
- certificate/hostname resources only if not blocking and not requiring premature DNS decisions.

## 6. Stop line

No Terraform edit in this decision gate.
No Terraform plan in this decision gate.
No Terraform apply.
No GCP mutation.
No IAM change.
No Secret Manager payload.
No DB/Prisma.
No app code.
No deploy.
