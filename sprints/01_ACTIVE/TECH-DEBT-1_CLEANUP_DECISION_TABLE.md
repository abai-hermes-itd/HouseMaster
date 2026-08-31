# TECH-DEBT-1 — Cleanup Decision Table

Status: DECISION DRAFT — no cleanup executed
Date: 2026-08-31
Branch: feat/hm-gcp-003d-cloud-sql-import

## 1. Context

Sprint 6 secret incident is closed and pushed.

Before resuming Sprint 6B / IAP controlled access work, the repository technical debt is being classified.

This document records cleanup decisions only.

No files are deleted, moved, archived, staged, committed, or pushed by this document.

## 2. Confirmed ignored cache/build artifacts

The following local artifacts are cache/build/dependency outputs and may be safely removed locally after approval:

| Path | Decision | Reason |
|---|---|---|
| .turbo/ | DELETE LOCAL | build/cache artifact |
| apps/web/.turbo/ | DELETE LOCAL | app build/cache artifact |
| ops/mcp/housemaster-gcp-gate-mcp/node_modules/ | DELETE LOCAL | dependency folder; already ignored by root .gitignore |
| infrastructure/terraform/.terraform/ | DELETE LOCAL | Terraform provider/backend cache; can be recreated by terraform init |

## 3. Terraform working files to keep

| Path/type | Decision | Reason |
|---|---|---|
| infrastructure/terraform/*.tf | KEEP | Terraform source |
| infrastructure/terraform/README.md | KEEP | Terraform documentation |
| infrastructure/terraform/backend-dev.tfbackend | KEEP | active backend config |
| infrastructure/terraform/backend-dev.tfbackend.example | KEEP | example config |
| infrastructure/terraform/backend-prod.tfbackend.example | KEEP | example config |
| infrastructure/terraform/dev.tfvars | KEEP | active dev vars; do not print contents |
| infrastructure/terraform/dev.tfvars.example | KEEP | example vars |

## 4. Terraform plan/log artifacts

These files appear to be historical plan/output/evidence artifacts. They should not be deleted blindly.

Decision: ARCHIVE OR DELETE only after explicit approval.

Examples:

- infrastructure/terraform/*.plan
- infrastructure/terraform/*plan*.txt
- infrastructure/terraform/*stdout*.txt
- infrastructure/terraform/*post-apply*.yaml
- infrastructure/terraform/*post-apply*.txt
- sprint3-cloud-run-service.yaml
- sprint3-cloudsql-instance.yaml

Recommended decision:
- keep final evidence that documents closed gates;
- delete duplicate/stale stdout dumps after confirming they are captured in sprint docs;
- do not commit binary `.plan` files unless explicitly required.

## 5. Project-related non-GCP materials

These items appear project-related but outside current Sprint 6B/IAP scope.

Decision: NEEDS HUMAN DECISION.

| Path | Decision | Reason |
|---|---|---|
| ENGINEERING_CASE/ | NEEDS DECISION | likely separate documentation/design branch |
| _PROJECT_AUDIT/ | NEEDS DECISION | may contain audit evidence |
| 01_SCIENTIFIC_CONTINUITY_GRAPH_V1.md | NEEDS DECISION | project/domain artifact, not cache |

## 6. Proposed cleanup order

1. Delete local cache/build artifacts only:
   - .turbo/
   - apps/web/.turbo/
   - ops/mcp/housemaster-gcp-gate-mcp/node_modules/
   - infrastructure/terraform/.terraform/

2. Re-check git status.

3. Decide separately on Terraform evidence/log artifacts.

4. Decide separately on ENGINEERING_CASE, _PROJECT_AUDIT, and 01_SCIENTIFIC_CONTINUITY_GRAPH_V1.md.

5. Only after decisions, update .gitignore if needed.

## 7. Stop line

No Terraform.
No GCP.
No IAM.
No Secret Manager.
No DB/Prisma.
No Sprint 6B/IAP.
No deletion before explicit cleanup gate.
No archive before explicit cleanup gate.
No commit before review.

## 8. Next proposed gate

TECH-DEBT-2 — delete local ignored cache/build artifacts only.
