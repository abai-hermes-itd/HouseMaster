# SPRINT-6B-1A-CHECK-2 — IAP Brand / Client Read-only Check After API Enablement

Status: READ-ONLY CHECK
Date: 2026-08-31
Branch: feat/hm-gcp-003d-cloud-sql-import
Scope: Read-only check after iap.googleapis.com enablement.

## 1. Context

SPRINT-6B-1A-API enabled iap.googleapis.com for project housemaster-dev-503409.

This gate checks whether IAP OAuth brand/client metadata is now readable.

No OAuth brand/client creation, Terraform edit, Terraform plan, Terraform apply, IAM change, Cloud Run update, Secret Manager payload access, DB/Prisma, app code, deploy, or secret-version disablement is allowed.

## 2. Questions

1. Is iap.googleapis.com enabled?
2. Is an IAP OAuth brand visible?
3. If a brand is visible, what is its BRAND_NAME?
4. Can IAP OAuth clients be listed for the visible brand without creating anything?
5. Does this unblock Terraform design/plan-only?

## 3. Stop line

No gcloud create/update/delete.
No OAuth brand/client create.
No Terraform edit.
No Terraform plan.
No Terraform apply.
No IAM changes.
No Cloud Run update/deploy.
No Secret Manager payload.
No DB/Prisma.
No app code.
No disabling old secret version.

## 4. Findings

Read-only check result:

- `iap.googleapis.com` is enabled.
- IAP OAuth brand is visible.
- Brand name: `projects/1084024721838/brands/1084024721838`
- Application title: `HouseMaster`
- Org/internal: `true`
- Support email: `markelus@abay-germes.kz`
- IAP OAuth clients list returned: `Listed 0 items`

## 5. Decision impact

The IAP API blocker is resolved.

The OAuth brand exists and does not need to be created.

However, no IAP OAuth client is currently listed under the brand.

Therefore SPRINT-6B-1B Terraform edit + plan-only should not start until the OAuth client approach is explicitly resolved.

## 6. Next gate

SPRINT-6B-1A-OAUTH-CLIENT — decide/create IAP OAuth client or confirm alternative provider-supported approach.

This is a mutation gate if client creation is required.
