# TECH-DEBT-3 — Terraform / Sprint3 Evidence Classification

Status: READ-ONLY CLASSIFICATION
Date: 2026-08-31
Branch: feat/hm-gcp-003d-cloud-sql-import

## 1. Context

TECH-DEBT-0 / TECH-DEBT-1 are committed and pushed.

TECH-DEBT-2 removed local cache/build artifacts and one accidental odd root file.

Remaining technical debt includes Terraform / Sprint3 evidence artifacts and project-related non-GCP materials.

This gate classifies only Terraform / Sprint3 evidence artifacts.

No deletion, archive, edit, staging, commit, push, Terraform, GCP, IAM, Secret Manager, DB/Prisma, or Sprint 6B/IAP work is performed.

## 2. Files under review

Terraform / Sprint3 evidence candidates:

- infrastructure/terraform/apply-e3bb9ee-stdout.txt
- infrastructure/terraform/hm-gcp-003f1-cloud-run-post-apply.yaml
- infrastructure/terraform/hm-gcp-003f1-post-apply-full-plan.txt
- infrastructure/terraform/preview-e3bb9ee-plan-stdout.txt
- infrastructure/terraform/sprint3-readonly-plan.txt
- sprint3-cloud-run-service.yaml
- sprint3-cloudsql-instance.yaml

## 3. Preliminary decision model

| File type | Proposed decision | Reason |
|---|---|---|
| final post-apply evidence | ARCHIVE | useful historical evidence for closed gates |
| duplicate stdout/log dumps | DELETE AFTER APPROVAL | useful only if already captured in sprint docs |
| sprint3 YAML snapshots | ARCHIVE OR DELETE AFTER APPROVAL | may be historical evidence, but not active source |
| Terraform source files | KEEP | not part of this cleanup |
| binary .plan files | DO NOT COMMIT | local execution artifact unless explicitly required |

## 4. Stop line

No delete.
No archive.
No file edits outside this report.
No staging.
No commit.
No push.
No Terraform.
No GCP.
No IAM.
No Secret Manager.
No DB/Prisma.
No Sprint 6B/IAP.

## 5. Next proposed gate

TECH-DEBT-4 — archive/delete selected Terraform evidence after explicit approval.
