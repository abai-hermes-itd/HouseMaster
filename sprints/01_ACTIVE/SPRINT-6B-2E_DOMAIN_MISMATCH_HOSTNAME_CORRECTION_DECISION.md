# SPRINT-6B-2E-DOMAIN-MISMATCH — Hostname Correction Decision

Status: DOCS-ONLY / CORRECTION DECISION
Date: 2026-09-01
Branch: feat/hm-gcp-003d-cloud-sql-import

## 1. Context

SPRINT-6B-2D created the external HTTPS/IAP entry using hostname:

- iap-dev.housemaster.kz

However, during DNS operation the available DNS zone in iD Host was confirmed as:

- housemasters.kz

The originally intended domain housemaster.kz is not the active DNS zone available for this operation.

## 2. Mismatch

Current Terraform/certificate hostname:

- iap-dev.housemaster.kz

Available DNS zone:

- housemasters.kz

Required corrected hostname:

- iap-dev.housemasters.kz

## 3. Decision

Adopt Variant B:

- use iap-dev.housemasters.kz as the controlled dev IAP hostname
- keep the existing global IP 8.232.62.29
- correct the Google-managed certificate domain through Terraform
- then create manual DNS A-record in the housemasters.kz zone

Correct DNS record after Terraform correction:

- Host / Name: iap-dev
- Type: A
- Value: 8.232.62.29
- Zone: housemasters.kz

Canonical DNS result:

iap-dev.housemasters.kz.  A  8.232.62.29

## 4. Required Terraform correction

Next Terraform correction gate should update only the certificate/domain reference from:

- iap-dev.housemaster.kz

to:

- iap-dev.housemasters.kz

Expected target file:

- infrastructure/terraform/iap_lb_external_entry.tf

Expected correction:

- google_compute_managed_ssl_certificate.iap_dev_cert managed.domains

## 5. Safety boundary

Correction must be narrow.

Do not change:

- global IP
- URL map
- HTTPS target proxy
- forwarding rule
- backend service
- serverless NEG
- Cloud Run ingress
- app code
- DB/Prisma
- Secret Manager payload

## 6. Next gate

SPRINT-6B-2E-CORRECTION-PLAN — Terraform plan-only hostname correction to iap-dev.housemasters.kz.

Then, only after correction apply succeeds:

SPRINT-6B-2E-MANUAL-DNS-HOUSEMASTERS — create DNS A-record in housemasters.kz zone.

## 7. Stop line

No Terraform edit in this decision gate.
No Terraform plan in this decision gate.
No Terraform apply.
No DNS mutation in this gate.
No Cloud Run ingress restriction.
No Secret Manager payload.
No DB/Prisma.
No app code.
No deploy.
