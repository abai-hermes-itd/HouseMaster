# SPRINT-6B-1C — Plan Review / Apply Readiness Decision

Status: REVIEW-ONLY / DECISION
Date: 2026-08-31
Branch: feat/hm-gcp-003d-cloud-sql-import

## 1. Context

SPRINT-6B-1B produced a Terraform plan-only result for the first narrow IAP/LB contour.

Committed evidence:

- infrastructure/terraform/iap_lb.tf
- infrastructure/terraform/sprint-6b-1b-iap-lb-plan-stdout.txt

Commit:

- 9af7e08 — feat(gcp): add IAP backend service plan

## 2. Plan result

Plan summary:

- 2 to add
- 0 to change
- 0 to destroy

Planned resources:

- google_compute_region_network_endpoint_group.next_web_serverless_neg
- google_compute_backend_service.next_web_iap_backend

## 3. Safety review

Confirmed from plan evidence:

- No Terraform apply was performed.
- No oauth2_client_id was configured.
- No oauth2_client_secret was configured.
- No google_iap_client was created.
- No allUsers principal was planned.
- No allAuthenticatedUsers principal was planned.
- No Cloud Run ingress change was planned.
- No certificate resource was planned.
- No DNS resource was planned.
- No HTTPS proxy / forwarding rule / URL map was planned.
- No DB/Prisma change was planned.
- No app code change was planned.
- No Secret Manager payload was accessed.

Note:

- oauth2_client_secret_sha256 appears only as a Terraform sensitive computed value inside the IAP block.
- No OAuth client secret value is configured or printed.
- This confirms the Google-managed OAuth client path at plan-only level.

## 4. Apply readiness decision

The plan is narrow and appears suitable for a separate controlled apply gate.

However, apply must remain a separate explicit approval because it will create live GCP resources:

- serverless NEG
- backend service with IAP enabled

## 5. Next gate

SPRINT-6B-1D — Controlled Terraform Apply for saved plan sprint-6b-1b-iap-lb.plan.

Apply gate must:

- apply only the saved plan file;
- verify created resources read-only after apply;
- not create certificate/DNS/proxy/forwarding rule;
- not change Cloud Run ingress;
- not change IAM outside resources already in the saved plan;
- not access Secret Manager payload;
- not touch DB/Prisma/app code;
- not deploy Cloud Run.

## 6. Stop line

No Terraform apply in this review gate.
No GCP mutation in this review gate.
No IAM change in this review gate.
No Secret Manager payload.
No DB/Prisma.
No app code.
No deploy.
