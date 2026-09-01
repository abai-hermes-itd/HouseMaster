# SPRINT-6B-2E-CORRECTION-APPLY — Failure Evidence

Status: APPLY FAILED / SAFE STOP / RECOVERY VERIFIED
Date: 2026-09-01
Branch: feat/hm-gcp-003d-cloud-sql-import

## 1. Context

Hostname correction apply attempted to replace the managed SSL certificate domain:

- from: iap-dev.housemaster.kz
- to: iap-dev.housemasters.kz

Saved plan:

- infrastructure/terraform/sprint-6b-2e-hostname-correction.plan

Plan summary:

- 1 to add
- 1 to change
- 1 to destroy

## 2. Failure

Terraform apply failed while trying to destroy the existing managed SSL certificate.

Failure reason:

- resourceInUseByAnotherResource
- the old certificate iap-dev-housemaster-cert is still used by target HTTPS proxy next-web-iap-https-proxy

## 3. Recovery verification

Terraform state still contains:

- google_compute_global_address.iap_dev_lb_ip
- google_compute_global_forwarding_rule.next_web_iap_https_forwarding_rule
- google_compute_managed_ssl_certificate.iap_dev_cert
- google_compute_target_https_proxy.next_web_iap_https_proxy
- google_compute_url_map.next_web_iap_url_map

GCP read-only verification confirmed:

- certificate exists: iap-dev-housemaster-cert
- certificate type: MANAGED
- certificate status: PROVISIONING
- HTTPS proxy exists: next-web-iap-https-proxy
- HTTPS proxy still references iap-dev-housemaster-cert
- URL map remains next-web-iap-url-map

## 4. Decision impact

Do not retry the failed replacement plan.

Use a safer V2 correction strategy:

1. Keep old certificate temporarily.
2. Create a new managed certificate with a new resource/name:
   - iap-dev-housemasters-cert
3. Domain:
   - iap-dev.housemasters.kz
4. Update HTTPS proxy to reference the new certificate.
5. Delete old certificate later in a separate cleanup gate only after proxy/DNS/certificate verification.

## 5. Boundary

No DNS mutation was performed.
No Cloud Run ingress restriction was performed.
No Cloud Run deploy/update was performed.
No Secret Manager payload was accessed.
No DB/Prisma operation was performed.
No app code was changed.
No old google-client-secret version was disabled.

## 6. Next gate

SPRINT-6B-2E-CORRECTION-V2-PLAN — create new housemasters certificate and update HTTPS proxy plan-only.

## 7. Stop line

No retry apply of failed plan.
No Terraform apply in the evidence gate.
No DNS mutation.
No Cloud Run ingress restriction.
No Secret Manager payload.
No DB/Prisma.
No app code.
No deploy.
