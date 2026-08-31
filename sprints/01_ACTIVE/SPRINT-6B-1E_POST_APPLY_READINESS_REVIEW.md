# SPRINT-6B-1E — Post-Apply Readiness Review

Status: REVIEW-ONLY / DECISION
Date: 2026-08-31
Branch: feat/hm-gcp-003d-cloud-sql-import

## 1. Current state

SPRINT-6B-1D completed a controlled Terraform apply of the saved plan.

Live resources now exist:

- google_compute_region_network_endpoint_group.next_web_serverless_neg
- google_compute_backend_service.next_web_iap_backend

Apply result:

- 2 added
- 0 changed
- 0 destroyed

Commit evidence:

- d6fa505 — docs(gcp): record IAP backend apply evidence

## 2. What exists now

The first IAP/LB backend contour exists:

Cloud Run next-web -> serverless NEG -> backend service with IAP enabled.

This is not yet a complete external HTTPS entry point.

## 3. What does not exist yet

Not yet created:

- URL map
- HTTPS target proxy
- forwarding rule
- certificate
- DNS / hostname
- Cloud Run ingress restriction

## 4. Readiness questions before next Terraform edit

Before SPRINT-6B-2, decide:

1. What hostname will be used for the controlled IAP entry?
2. Will certificate be Google-managed or deferred?
3. Should the next plan include URL map + HTTPS proxy + forwarding rule?
4. Should DNS be handled inside Terraform or manually outside Terraform?
5. Should Cloud Run ingress remain unchanged until live LB/IAP verification passes?
6. What is the rollback path if LB/IAP entry does not work?

## 5. Recommended decision

Proceed with a second narrow Terraform plan-only gate for URL map / HTTPS proxy / forwarding rule only after hostname and certificate strategy are fixed.

Do not restrict Cloud Run ingress yet.

Do not disable existing direct Cloud Run access until the full LB/IAP path is verified.

## 6. Next gate

SPRINT-6B-2A — Hostname / Certificate / DNS Decision.

Then:

SPRINT-6B-2B — Terraform plan-only for URL map / HTTPS proxy / forwarding rule / certificate, if safely planable.

## 7. Stop line

No Terraform edit in this review gate.
No Terraform plan in this review gate.
No Terraform apply.
No GCP mutation.
No IAM change.
No Secret Manager payload.
No DB/Prisma.
No app code.
No deploy.
No Cloud Run ingress restriction.
