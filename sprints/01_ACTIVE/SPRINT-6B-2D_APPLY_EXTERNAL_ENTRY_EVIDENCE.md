# SPRINT-6B-2D — Controlled Terraform Apply External Entry Evidence

Status: APPLY PASS / VERIFIED
Date: 2026-08-31
Branch: feat/hm-gcp-003d-cloud-sql-import

## 1. Scope

Controlled apply of saved Terraform plan:

- infrastructure/terraform/sprint-6b-2b-external-entry.plan

## 2. Apply result

Terraform apply completed successfully.

Result:

- 5 added
- 0 changed
- 0 destroyed

Created resources:

- google_compute_global_address.iap_dev_lb_ip
- google_compute_managed_ssl_certificate.iap_dev_cert
- google_compute_url_map.next_web_iap_url_map
- google_compute_target_https_proxy.next_web_iap_https_proxy
- google_compute_global_forwarding_rule.next_web_iap_https_forwarding_rule

## 3. Verification

Terraform state verification confirmed:

- google_compute_global_address.iap_dev_lb_ip
- google_compute_global_forwarding_rule.next_web_iap_https_forwarding_rule
- google_compute_managed_ssl_certificate.iap_dev_cert
- google_compute_target_https_proxy.next_web_iap_https_proxy
- google_compute_url_map.next_web_iap_url_map

GCP read-only verification confirmed:

- Global IP exists: iap-dev-lb-ip
- Global IP address: 8.232.62.29
- Global IP status: IN_USE
- Managed certificate exists: iap-dev-housemaster-cert
- Managed certificate status: PROVISIONING
- URL map exists: next-web-iap-url-map
- HTTPS target proxy exists: next-web-iap-https-proxy
- Global forwarding rule exists: next-web-iap-https-fr
- Forwarding rule IP: 8.232.62.29
- Forwarding rule protocol: TCP
- Forwarding rule port range: 443-443

## 4. Boundary

No DNS record was created or modified by Terraform.
No Cloud Run ingress restriction was performed.
No Cloud Run deploy/update was performed.
No Secret Manager payload was accessed.
No DB/Prisma operation was performed.
No app code was changed.
No old google-client-secret version was disabled.

## 5. Current architecture state

The external HTTPS/IAP entry contour now exists:

Client -> global forwarding rule 443 -> HTTPS proxy -> URL map -> IAP backend service -> serverless NEG -> Cloud Run next-web

Certificate is currently PROVISIONING and requires DNS A-record for iap-dev.housemaster.kz to point to the created global IP.

## 6. Next gate

SPRINT-6B-2E — Prepare manual DNS A-record instruction.

Required DNS instruction:

- iap-dev.housemaster.kz A 8.232.62.29

Do not restrict Cloud Run ingress until DNS, certificate activation, and live LB/IAP verification pass.
