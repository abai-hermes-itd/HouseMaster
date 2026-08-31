# SPRINT-6B-1B-SCOPE — IAP / Load Balancer Terraform Scope

Status: DOCS-ONLY / SCOPE
Date: 2026-08-31
Branch: feat/hm-gcp-003d-cloud-sql-import

## 1. Goal

Define the exact Terraform scope for controlled access to Cloud Run through HTTPS Load Balancer and IAP before any Terraform edit or plan.

## 2. Fixed decisions

- Use Google-managed OAuth client for IAP.
- Do not create IAP OAuth client.
- Do not use oauth2_client_id or oauth2_client_secret.
- Do not put OAuth client secret into Terraform state.
- Do not expose Cloud Run to allUsers.
- Preserve existing NextAuth/Auth.js app-layer logic.

## 3. Proposed Terraform file

Create a new Terraform file:

- infrastructure/terraform/iap_lb.tf

Do not overload cloud_run.tf unless a reference output is strictly required.

## 4. Proposed resource family

Target resources for plan-only design:

- google_compute_region_network_endpoint_group for Cloud Run serverless NEG
- google_compute_backend_service with iap { enabled = true }
- google_compute_url_map
- google_compute_target_https_proxy
- google_compute_global_forwarding_rule
- certificate resource or deferred certificate strategy
- google_iap_web_backend_service_iam_member or equivalent narrow IAP principal binding

## 5. Unresolved decisions before implementation

Still unresolved:

1. Hostname / DNS name for HTTPS Load Balancer.
2. Certificate strategy: Google-managed cert or existing cert.
3. IAP principal: exact user, Google Group, or Workspace-controlled group.
4. Whether first plan should include certificate resources or defer them.
5. Whether Cloud Run ingress remains unchanged in first apply.

## 6. Recommended bounded implementation approach

First Terraform plan should be conservative:

- add LB/IAP resources in a new iap_lb.tf;
- use Google-managed OAuth client;
- avoid OAuth client secret;
- avoid Cloud Run allUsers exposure;
- avoid changing Cloud Run ingress until LB/IAP path is verified;
- stop if Terraform provider requires explicit OAuth client credentials.

## 7. Next gate

SPRINT-6B-1B-HOSTNAME-CERT-PRINCIPAL — resolve hostname, certificate, and IAP principal before Terraform edit.

Then:

SPRINT-6B-1B — Terraform edit + validate + plan-only.

## 8. Stop line

No Terraform edit.
No Terraform plan.
No Terraform apply.
No GCP mutation.
No IAM change.
No Secret Manager payload.
No DB/Prisma.
No app code.
No deploy.
No disabling old google-client-secret version 1.
