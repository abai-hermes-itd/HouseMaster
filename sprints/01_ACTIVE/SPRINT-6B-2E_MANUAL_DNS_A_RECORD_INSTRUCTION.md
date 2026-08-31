# SPRINT-6B-2E — Manual DNS A-record Instruction

Status: DOCS-ONLY / OPERATOR INSTRUCTION
Date: 2026-08-31
Branch: feat/hm-gcp-003d-cloud-sql-import

## 1. Context

SPRINT-6B-2D created the external HTTPS/IAP entry resources.

Global forwarding rule IP:

- 8.232.62.29

Managed certificate:

- iap-dev-housemaster-cert
- Current status after apply: PROVISIONING

## 2. Required manual DNS record

Create or update the following DNS A-record manually outside Terraform:

- Hostname: iap-dev.housemaster.kz
- Type: A
- Value: 8.232.62.29
- TTL: provider default or 300 seconds for first rollout if selectable

Canonical form:

iap-dev.housemaster.kz.  A  8.232.62.29

## 3. Boundary

DNS is not managed by Terraform in this sprint gate.

No Terraform apply.
No Terraform edit.
No Cloud Run ingress restriction.
No Cloud Run deploy/update.
No Secret Manager payload.
No DB/Prisma.
No app code.
No disabling old google-client-secret version 1.

## 4. After DNS update

After DNS propagation, verify:

- DNS A-record resolves to 8.232.62.29
- Google-managed SSL certificate moves from PROVISIONING to ACTIVE
- HTTPS endpoint responds at iap-dev.housemaster.kz
- IAP access behavior is observed

## 5. Next gate

SPRINT-6B-2F — DNS / Certificate / HTTPS Readiness Verification.

Do not restrict Cloud Run ingress until DNS, certificate activation, and live LB/IAP verification pass.
