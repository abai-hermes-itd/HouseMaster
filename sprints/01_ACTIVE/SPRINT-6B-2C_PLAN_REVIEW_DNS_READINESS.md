# SPRINT-6B-2C — Plan Review / DNS Readiness Decision

Status: REVIEW-ONLY / DECISION
Date: 2026-08-31
Branch: feat/hm-gcp-003d-cloud-sql-import

## 1. Context

SPRINT-6B-2B produced a Terraform plan-only result for the external HTTPS/IAP entry contour.

Committed evidence:

- infrastructure/terraform/iap_lb_external_entry.tf
- infrastructure/terraform/sprint-6b-2b-external-entry-plan-stdout.txt

Commit:

- 81d1671 — feat(gcp): add IAP external entry plan

## 2. Plan result

Plan summary:

- 5 to add
- 0 to change
- 0 to destroy

Planned resources:

- google_compute_global_address.iap_dev_lb_ip
- google_compute_managed_ssl_certificate.iap_dev_cert
- google_compute_url_map.next_web_iap_url_map
- google_compute_target_https_proxy.next_web_iap_https_proxy
- google_compute_global_forwarding_rule.next_web_iap_https_forwarding_rule

## 3. Safety review

Confirmed from plan evidence:

- No Terraform apply was performed in SPRINT-6B-2B.
- No Cloud Run ingress change was planned.
- No DNS resource or DNS mutation was planned.
- No oauth2_client_id was configured.
- No oauth2_client_secret was configured.
- No google_iap_client was created.
- No allUsers principal was planned.
- No allAuthenticatedUsers principal was planned.
- No DB/Prisma change was planned.
- No app code change was planned.
- No Secret Manager payload was accessed.
- No Cloud Run deploy/update was planned.

## 4. DNS readiness decision

Hostname fixed for first dev IAP entry:

- iap-dev.housemaster.kz

Certificate strategy:

- Google-managed SSL certificate.

DNS strategy:

- DNS A-record will be handled manually outside Terraform for the first iteration.
- Terraform will reserve/create the global IP.
- After controlled apply, read the created global IP.
- Then manually create or update A-record: iap-dev.housemaster.kz -> global IP.

## 5. Apply readiness decision

The plan is narrow and suitable for a separate controlled apply gate.

However, apply must remain a separate explicit approval because it will create live GCP resources:

- global IP address
- managed SSL certificate
- URL map
- target HTTPS proxy
- global forwarding rule

## 6. Post-apply verification requirements

After apply, verify read-only:

- global IP exists
- managed certificate exists
- URL map exists
- target HTTPS proxy exists
- global forwarding rule exists
- backend service remains connected
- DNS is still manual and not changed by Terraform
- Cloud Run ingress remains unchanged

Then perform manual DNS A-record update only as a separate action.

## 7. Next gate

SPRINT-6B-2D — Controlled Terraform Apply for saved plan sprint-6b-2b-external-entry.plan.

Then:

SPRINT-6B-2E — Read created global IP and prepare manual DNS A-record instruction.

## 8. Stop line

No Terraform apply in this review gate.
No Terraform edit in this review gate.
No new Terraform plan in this review gate.
No GCP mutation in this review gate.
No DNS mutation in this review gate.
No IAM change.
No Secret Manager payload.
No DB/Prisma.
No app code.
No deploy.
No Cloud Run ingress restriction.
