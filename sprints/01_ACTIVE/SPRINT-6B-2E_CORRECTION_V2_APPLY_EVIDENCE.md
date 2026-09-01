# SPRINT-6B-2E-CORRECTION-V2-APPLY — Evidence

Status: APPLY PASS / VERIFIED
Date: 2026-09-01
Branch: feat/hm-gcp-003d-cloud-sql-import

## 1. Scope

Controlled apply of saved V2 hostname correction plan:

- infrastructure/terraform/sprint-6b-2e-correction-v2.plan

## 2. Apply result

Terraform apply completed successfully.

Result:

- 1 added
- 1 changed
- 0 destroyed

## 3. Created / changed resources

Created:

- google_compute_managed_ssl_certificate.iap_dev_housemasters_cert
- GCP certificate name: iap-dev-housemasters-cert
- Domain: iap-dev.housemasters.kz

Updated in-place:

- google_compute_target_https_proxy.next_web_iap_https_proxy
- HTTPS proxy now references iap-dev-housemasters-cert

Preserved:

- old certificate iap-dev-housemaster-cert remains temporarily

## 4. Verification

GCP read-only verification confirmed certificates:

- iap-dev-housemaster-cert — MANAGED / PROVISIONING
- iap-dev-housemasters-cert — MANAGED / PROVISIONING

HTTPS proxy verification confirmed:

- proxy: next-web-iap-https-proxy
- sslCertificates references iap-dev-housemasters-cert
- urlMap remains next-web-iap-url-map

Terraform state verification confirmed:

- google_compute_managed_ssl_certificate.iap_dev_cert
- google_compute_managed_ssl_certificate.iap_dev_housemasters_cert
- google_compute_target_https_proxy.next_web_iap_https_proxy

## 5. Boundary

No certificate destroy was performed.
No DNS mutation was performed.
No Cloud Run ingress restriction was performed.
No Cloud Run deploy/update was performed.
No Secret Manager payload was accessed.
No DB/Prisma operation was performed.
No app code was changed.
No old google-client-secret version was disabled.

## 6. Current state

The HTTPS proxy now points to the corrected housemasters certificate.

DNS is still pending and must be handled manually in the housemasters.kz DNS zone.

Required DNS record:

- iap-dev.housemasters.kz A 8.232.62.29

## 7. Next gate

SPRINT-6B-2E-MANUAL-DNS-HOUSEMASTERS — create manual DNS A-record in housemasters.kz zone.

Then:

SPRINT-6B-2F — DNS / Certificate / HTTPS Readiness Verification.

Do not restrict Cloud Run ingress until DNS, certificate activation, and live LB/IAP verification pass.
