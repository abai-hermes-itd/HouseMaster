# SPRINT-6B-1B-PREFLIGHT — Terraform Provider / Layout Preflight

Status: READ-ONLY PASS
Date: 2026-08-31
Branch: feat/hm-gcp-003d-cloud-sql-import

## Finding

Terraform source exists and current Cloud Run variables/resources are present.

Current Terraform does not include the IAP / HTTPS Load Balancer resource family.

Existing IAP/LB/NEG/CERT references found only:

- cloud_run.tf: ALLOWED_WORKSPACE_DOMAIN
- cloud_sql.tf: ssl_mode = ENCRYPTED_ONLY

## Decision impact

SPRINT-6B-1B should not be treated as a small cloud_run.tf patch.

The next implementation scope must introduce a separate controlled-access Terraform contour:

- serverless NEG
- backend service with IAP enabled using Google-managed OAuth client
- URL map
- HTTPS proxy
- forwarding rule
- certificate / hostname strategy
- IAP IAM principal binding

## Next gate

SPRINT-6B-1B-SCOPE — define exact Terraform files/resources and unresolved hostname/certificate decisions before any Terraform edit.

## Stop line

No Terraform edit was performed.
No Terraform plan was performed.
No Terraform apply was performed.
No GCP mutation was performed.
No IAM change was performed.
No Secret Manager payload was accessed.
No DB/Prisma operation was performed.
No app code was changed.
