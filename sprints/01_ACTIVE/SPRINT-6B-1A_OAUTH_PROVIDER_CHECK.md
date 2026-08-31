# SPRINT-6B-1A-OAUTH-PROVIDER-CHECK — Terraform IAP OAuth Provider Check

Status: DOCS-ONLY / DECISION
Date: 2026-08-31
Branch: feat/hm-gcp-003d-cloud-sql-import

## 1. Context

Sprint 6B is preparing controlled access to Cloud Run through HTTPS Load Balancer and Identity-Aware Proxy.

Verified state:

- iap.googleapis.com is enabled.
- IAP OAuth brand exists.
- Brand: projects/1084024721838/brands/1084024721838
- Application title: HouseMaster
- Org/internal: true
- IAP OAuth clients list returned: Listed 0 items.

## 2. Decision

Use Google-managed OAuth client for IAP.

Do not create an IAP OAuth client at this stage.

Do not use:

- google_iap_client
- gcloud iap oauth-clients create
- oauth2_client_id
- oauth2_client_secret

Do not put OAuth client secret into Terraform state.

## 3. Terraform implication

For SPRINT-6B-1B, the backend service IAP block should be attempted without explicit OAuth client credentials:

iap {
  enabled = true
}

If Terraform validation or plan rejects this approach, stop and report. Do not automatically create an OAuth client.

## 4. Next gate

SPRINT-6B-1B-PREFLIGHT — local Terraform provider/version and file-layout preflight.

## 5. Stop line

No OAuth client create.
No Terraform edit in this gate.
No Terraform plan in this gate.
No Terraform apply.
No GCP mutation.
No IAM changes.
No Cloud Run update/deploy.
No Secret Manager payload.
No DB/Prisma.
No app code.
No disabling old google-client-secret version 1.
