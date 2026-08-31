# SPRINT-6B-2A — Hostname / Certificate / DNS Decision

Status: DOCS-ONLY / DECISION
Date: 2026-08-31
Branch: feat/hm-gcp-003d-cloud-sql-import

## 1. Context

Sprint 6B is implementing controlled access to Cloud Run through HTTPS Load Balancer and IAP.

Already completed:

- serverless NEG created: next-web-serverless-neg
- backend service with IAP enabled created: next-web-iap-backend
- Google-managed OAuth client approach confirmed
- no explicit oauth2_client_id / oauth2_client_secret used

Current backend contour:

Cloud Run next-web -> serverless NEG -> backend service with IAP enabled

This is not yet a complete external HTTPS entry point.

## 2. Missing external entry resources

Not yet created:

- URL map
- HTTPS target proxy
- forwarding rule
- certificate
- DNS / hostname
- Cloud Run ingress restriction

## 3. Decision summary

| Decision | First controlled-access decision | Reason |
|---|---|---|
| Hostname | Use a dev-only hostname, preferably iap-dev.housemaster.kz, only if DNS is confirmed under our control | Avoid mixing pilot/dev IAP testing with production hostname |
| Certificate | Use Google-managed certificate after hostname/DNS confirmation | Avoid manual certificate secret handling |
| DNS | Manage DNS manually outside Terraform for the first iteration | Avoid adding DNS provider/state complexity to this gate |
| URL map / HTTPS proxy / forwarding rule | Include in next Terraform plan-only gate if certificate/hostname plan is safe | Complete external HTTPS entry point incrementally |
| Cloud Run ingress | Keep unchanged until live LB/IAP path is verified | Avoid locking out the current direct access path |
| Rollback | Preserve direct Cloud Run URL until LB/IAP entry is verified | Safe fallback during controlled-access rollout |

## 4. Required confirmation before SPRINT-6B-2B

Before Terraform edit + plan-only, confirm:

1. The exact hostname to use.
2. DNS zone / registrar control for that hostname.
3. Whether Google-managed certificate can be planned safely before DNS A record points to the load balancer IP.
4. Whether the first external-entry plan should reserve a global IP address.
5. Whether DNS record creation stays manual outside Terraform.

## 5. Recommended next implementation shape

SPRINT-6B-2B should be Terraform edit + validate + plan-only for the external HTTPS entry contour.

Potential resources:

- google_compute_global_address
- google_compute_url_map
- google_compute_target_https_proxy
- google_compute_global_forwarding_rule
- google_compute_managed_ssl_certificate, if hostname is confirmed

Do not change Cloud Run ingress in SPRINT-6B-2B.

## 6. Stop line

No Terraform edit in this decision gate.
No Terraform plan in this decision gate.
No Terraform apply.
No GCP mutation.
No IAM change.
No Secret Manager payload.
No DB/Prisma.
No app code.
No deploy.
No Cloud Run ingress restriction.
No DNS change in this gate.
