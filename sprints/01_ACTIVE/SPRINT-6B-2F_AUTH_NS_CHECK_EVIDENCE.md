# SPRINT-6B-2F-AUTH-NS-CHECK — Evidence

Status: DNS DELEGATION ISSUE FOUND
Date: 2026-09-01
Branch: feat/hm-gcp-003d-cloud-sql-import

## 1. Context

Manual DNS A-record was added in iD Host DNS Manager for:

- iap-dev.housemasters.kz A 8.232.62.29

However public DNS did not resolve the record.

## 2. Authoritative nameserver check

Public DNS shows that housemasters.kz is delegated to:

- ns2.hosting.ismet.kz
- ns3.hosting.ismet.kz

Therefore the iD Host DNS Manager zone is not authoritative for public DNS resolution of housemasters.kz.

## 3. Base domain checks

Public DNS resolves existing records:

- housemasters.kz -> 178.88.168.55
- almau.housemasters.kz -> 178.88.168.55

But does not resolve:

- iap-dev.housemasters.kz

Result:

- Non-existent domain

## 4. Interpretation

The blocker is DNS delegation/provider mismatch, not GCP or Terraform wiring.

HTTPS proxy already points to the new certificate:

- iap-dev-housemasters-cert

Certificates remain PROVISIONING because the required DNS A-record is not visible publicly.

## 5. Decision

Do not duplicate records in iD Host.

Do not change Terraform.

Preferred next action:

- add iap-dev.housemasters.kz A 8.232.62.29 in the authoritative ISMET DNS zone

Alternative action:

- change domain nameserver delegation to iD Host only after confirming existing records will be preserved

## 6. Next gate

SPRINT-6B-2F-ISMET-DNS-RECORD — add A-record in authoritative ISMET DNS zone.

## 7. Stop line

No Terraform apply.
No DNS delegation change without separate decision.
No Cloud Run ingress restriction.
No Cloud Run deploy/update.
No Secret Manager payload.
No DB/Prisma.
No app code.
No cleanup/delete old certificate yet.
