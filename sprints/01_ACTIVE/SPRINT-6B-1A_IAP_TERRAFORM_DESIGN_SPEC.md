# SPRINT-6B-1A — IAP Terraform Design Spec

Status: DRAFT / DOCS-ONLY
Date: 2026-08-31
Branch: feat/hm-gcp-003d-cloud-sql-import
Scope: Design the Terraform approach for controlled browser access to Cloud Run through Identity-Aware Proxy.

## 1. Context

Sprint 6A confirmed that the current Cloud Run service is private at the platform/IAM layer.

Observed behavior:
- /login returns HTTP 403 from Google Frontend.
- /admin returns HTTP 403 from Google Frontend.
- requests are rejected before reaching Next.js middleware or NextAuth.

Secret rotation incident is closed:
- google-client-secret version 2 exists;
- Cloud Run revision next-web-00012-s44 was created;
- live login validation remains blocked by platform access/IAM.

Repo hygiene track is closed:
- Terraform/Sprint3 evidence archived;
- project-related non-GCP materials archived;
- tracked tree clean.

## 2. Current Terraform state from read-only preflight

Current Terraform appears to include:
- Cloud Run v2 service;
- Secret Manager references;
- service accounts;
- IAM resources;
- Cloud SQL / storage / logging / monitoring / Vertex AI files;
- variables for cloud_run_allow_unauthenticated and deploy_cloud_run.

Current Terraform does not appear to include:
- Identity-Aware Proxy resources;
- external HTTPS Load Balancer resources;
- serverless NEG;
- backend service with IAP enabled;
- URL map;
- target HTTPS proxy;
- global forwarding rule;
- managed SSL certificate.

## 3. Target access model

The target model is controlled browser access:

User browser
-> HTTPS Load Balancer
-> IAP authentication / authorization
-> Serverless NEG
-> Cloud Run next-web

Cloud Run should not be exposed to public allUsers.

IAP / controlled ingress should provide the outer platform access gate.

Next.js / NextAuth should remain responsible for app-level session and admin realm behavior after the platform request reaches the app.

## 4. Expected Terraform resource families

Likely resource families to design:

1. Serverless NEG
   - google_compute_region_network_endpoint_group
   - type: SERVERLESS
   - points to Cloud Run service next-web

2. Backend service
   - google_compute_backend_service
   - serverless NEG backend
   - IAP enabled if provider/project prerequisites allow

3. IAP IAM binding
   - google_iap_web_backend_service_iam_member or equivalent
   - scoped to allowed Abay-Germes domain/group/user decision

4. URL map / HTTPS proxy / forwarding rule
   - google_compute_url_map
   - google_compute_target_https_proxy
   - google_compute_global_forwarding_rule

5. Certificate
   - managed certificate or pre-existing certificate decision required

6. OAuth brand/client precondition
   - determine whether existing OAuth consent/brand can support IAP
   - if API enablement or brand/client creation is required, it must be a separate approved gate

## 5. Blocking decisions before Terraform edit

Before writing Terraform resources, decide:

1. Domain / hostname:
   - What hostname should front the app?
   - Is a DNS name already available for the Load Balancer?

2. Certificate:
   - Use Google-managed certificate?
   - Use existing certificate?
   - Is DNS control available?

3. IAP OAuth brand/client:
   - Can existing OAuth project brand/client support IAP?
   - Does IAP OAuth brand already exist?
   - Is enabling iap.googleapis.com required?
   - Any API enablement is a mutation and must be separately approved.

4. IAP principal scope:
   - user-level allowlist?
   - Google Group?
   - Workspace domain-level access?
   - temporary admin-only access for pilot?

5. Cloud Run ingress:
   - Should Cloud Run ingress be restricted to internal-and-cloud-load-balancing?
   - Do not change until LB/IAP path is planned and verified.

6. Current Auth.js/NextAuth relation:
   - IAP does not replace app auth by default.
   - NextAuth remains inside app.
   - AUTH-5 must be rerun after platform access is corrected.

## 6. Proposed implementation sequence

SPRINT-6B-1B:
Terraform design / plan-only for LB + serverless NEG + IAP resources.

SPRINT-6B-1C:
Review plan output and confirm exact add/change/destroy.

SPRINT-6B-2:
PR / review if needed.

SPRINT-6B-3:
Controlled Terraform apply only after explicit approval.

SPRINT-6C:
Rerun AUTH-5 live behavior verification through corrected access path.

## 7. Non-goals

This design does not:
- expose Cloud Run to allUsers;
- disable old google-client-secret version 1;
- replace NextAuth;
- create a production Admin Console;
- perform DB/Prisma changes;
- perform Terraform apply;
- perform live IAM changes.

## 8. Safety line

No Terraform apply.
No gcloud mutation.
No Secret Manager payload.
No DB/Prisma.
No app code changes.
No disabling old secret version.
No public allUsers exposure.
No Sprint 7 scope.

## 9. Next gate

SPRINT-6B-1B — Terraform edit + validate + plan-only, after the blocking decisions above are resolved.
