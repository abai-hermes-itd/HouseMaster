# SPRINT-6B-1A-OAUTH-CLIENT-DECISION — IAP OAuth Client Decision

Status: DRAFT / DOCS-ONLY
Date: 2026-08-31
Branch: feat/hm-gcp-003d-cloud-sql-import
Scope: Decide how to handle IAP OAuth client prerequisite before Terraform IAP implementation.

## 1. Context

Sprint 6B is implementing controlled access to Cloud Run through Identity-Aware Proxy / IAP.

Closed prerequisites:

- SPRINT-6B-1A — IAP Terraform Design Spec.
- SPRINT-6B-1A-BLOCKERS — IAP prerequisites decision table.
- SPRINT-6B-1A-CHECK — read-only prerequisite check.
- SPRINT-6B-1A-API — `iap.googleapis.com` enabled.
- SPRINT-6B-1A-CHECK-2 — IAP brand/client read-only check.

## 2. Current verified state

Read-only checks confirmed:

- `iap.googleapis.com` is enabled.
- IAP OAuth brand exists.
- Brand name: `projects/1084024721838/brands/1084024721838`
- Application title: `HouseMaster`
- Org/internal: `true`
- Support email: `markelus@abay-germes.kz`
- IAP OAuth clients list returned: `Listed 0 items`

## 3. Problem

The IAP brand exists, but no IAP OAuth client is currently listed under the brand.

Terraform IAP implementation for an HTTPS Load Balancer backend service may require one of the following:

1. an explicit OAuth client ID/secret;
2. a provider-supported managed/default IAP configuration;
3. manual/Console precondition before Terraform can plan cleanly.

The current project should not guess this during Terraform implementation.

## 4. Decision options

| Option | Description | Mutation? | Risk | Recommendation |
|---|---|---:|---|---|
| A | Create IAP OAuth client through `gcloud iap oauth-clients create` | Yes | Deprecated API warning / secret handling | Avoid unless explicitly approved and still supported |
| B | Create/manage IAP OAuth client through Terraform if supported | Yes, later | Secret handling and provider compatibility | Investigate before use |
| C | Use provider-supported/default IAP behavior without explicit client if available | Possibly no client mutation | Must confirm with Terraform/provider behavior | Preferred if plan supports it cleanly |
| D | Create/confirm IAP OAuth client manually in Console | Yes, manual | Operational but controlled | Acceptable fallback if Terraform/API path is deprecated |
| E | Pause IAP implementation and use another controlled access path | TBD | Delays Sprint 6B | Fallback only |

## 5. Current decision

Do not create an IAP OAuth client yet.

Before SPRINT-6B-1B Terraform edit + plan-only, run a narrow documentation/provider check to determine whether the Terraform Google provider supports IAP on backend service without pre-created OAuth client, and whether OAuth client creation via the deprecated IAP OAuth Admin API should be avoided.

## 6. Recommended next gate

SPRINT-6B-1A-OAUTH-PROVIDER-CHECK — docs/provider check of Terraform IAP backend service configuration.

Allowed:
- read Terraform provider docs already present in local repo if available;
- inspect current provider version in Terraform lock/provider files;
- inspect current Terraform source;
- optionally use web/docs outside repo only if explicitly done by the user or separate assistant research.

Forbidden:
- no OAuth client creation;
- no Terraform edit;
- no Terraform plan;
- no Terraform apply;
- no GCP mutation;
- no IAM change;
- no Secret Manager payload;
- no DB/Prisma;
- no app code;
- no deploy;
- no disabling old secret version.

## 7. Stop line

No OAuth client create.
No Terraform edit.
No Terraform plan.
No Terraform apply.
No GCP mutation.
No IAM changes.
No Cloud Run update/deploy.
No Secret Manager payload.
No DB/Prisma.
No app code.
No disabling old google-client-secret version 1.
