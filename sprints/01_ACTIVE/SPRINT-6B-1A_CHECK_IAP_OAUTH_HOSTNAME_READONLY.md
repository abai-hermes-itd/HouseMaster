# SPRINT-6B-1A-CHECK — IAP / OAuth / Hostname Read-only Check

Status: READ-ONLY CHECK
Date: 2026-08-31
Branch: feat/hm-gcp-003d-cloud-sql-import
Scope: Check current IAP API, OAuth brand/client, and hostname assumptions before Terraform edit/plan.

## 1. Context

SPRINT-6B-1A documented the IAP Terraform design.

SPRINT-6B-1A-BLOCKERS documented prerequisite decisions.

This gate checks live/project metadata only where the command is read-only.

No Terraform edit, Terraform plan, Terraform apply, GCP mutation, IAM change, Secret Manager payload access, DB/Prisma operation, app code change, deploy, or API enablement is allowed.

## 2. Questions

1. Is `iap.googleapis.com` already enabled?
2. Is an IAP OAuth brand visible through read-only commands?
3. Are IAP OAuth clients listable without mutation?
4. Is there any existing hostname/domain/cert resource in Terraform or GCP metadata?
5. Is there enough information to scope SPRINT-6B-1B Terraform edit + plan-only?

## 3. Stop line

No Terraform edit.
No Terraform plan.
No Terraform apply.
No gcloud services enable.
No gcloud create/update/delete.
No IAM changes.
No Secret Manager payload.
No DB/Prisma.
No app code.
No deploy.
No public allUsers exposure.
No disabling old secret version.
