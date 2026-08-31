# SPRINT-6B-1D — Controlled Terraform Apply Evidence

Status: APPLY PASS
Date: 2026-08-31
Branch: feat/hm-gcp-003d-cloud-sql-import

## 1. Scope

Controlled apply of saved Terraform plan:

- infrastructure/terraform/sprint-6b-1b-iap-lb.plan

## 2. Apply result

Terraform apply completed successfully.

Result:

- 2 added
- 0 changed
- 0 destroyed

Created resources:

- google_compute_region_network_endpoint_group.next_web_serverless_neg
- google_compute_backend_service.next_web_iap_backend

## 3. Verification

Terraform state verification confirmed both resources:

- google_compute_backend_service.next_web_iap_backend
- google_compute_region_network_endpoint_group.next_web_serverless_neg

GCP read-only verification confirmed:

- Network endpoint group exists: next-web-serverless-neg
- Backend service exists: next-web-iap-backend
- Backend service load balancing scheme: EXTERNAL_MANAGED
- Backend service protocol: HTTP

## 4. Boundary

No certificate resource was created.
No DNS resource was created.
No HTTPS proxy was created.
No forwarding rule was created.
No URL map was created.
No Cloud Run ingress change was performed.
No Cloud Run deploy/update was performed.
No Secret Manager payload was accessed.
No DB/Prisma operation was performed.
No app code was changed.
No old google-client-secret version was disabled.

## 5. Current architecture state

The first IAP/LB backend contour now exists:

Cloud Run next-web -> serverless NEG -> backend service with IAP enabled.

This is not yet a complete external HTTPS entry point.

## 6. Next gate

SPRINT-6B-1E — Post-Apply Readiness Review for URL map / HTTPS proxy / certificate / forwarding rule / DNS decisions.

Do not restrict Cloud Run ingress until the full LB/IAP path is verified.
