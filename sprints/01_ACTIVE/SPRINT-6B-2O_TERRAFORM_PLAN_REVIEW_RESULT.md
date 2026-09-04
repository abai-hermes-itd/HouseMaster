# SPRINT-6B-2O — Terraform Plan Review Result (IAP Cloud Run Invoker Binding)

Status: PASS / PLAN LIMITED TO INTENDED RESOURCE, NOT APPLIED
Date: 2026-09-04
Branch: feat/hm-gcp-003d-cloud-sql-import

---

## 1. Context

`SPRINT-6B-2N` (commit `e13fa3f`, "draft IAP Cloud Run invoker binding") diagnosed and drafted a fix for a new blocker found after the domain-accessor binding (`SPRINT-6B-2I`/`2J`/`2L`) went live: the browser test returned "The IAP service account is not provisioned," traced to two confirmed gaps — the IAP service agent had never been provisioned, and nothing granted it `roles/run.invoker` on `next-web`. The drafted fix references the well-known deterministic service-agent email directly (the same pattern this repo already uses for `gcp-sa-pubsub` in `pubsub.tf`), avoiding a `google-beta` provider dependency that an explicit `google_project_service_identity` resource would have required (that approach was tried first and rejected by `terraform validate` — see `2N`'s own commit history). This document records the plan-only review of that draft.

## 2. Plan result

`terraform validate`: **PASS** — `Success! The configuration is valid.`

`terraform plan -var-file=dev.tfvars` completed cleanly against live state:

```
# google_cloud_run_v2_service_iam_member.iap_invoker[0] will be created
  + resource "google_cloud_run_v2_service_iam_member" "iap_invoker" {
      + location = "europe-west1"
      + member   = "serviceAccount:service-1084024721838@gcp-sa-iap.iam.gserviceaccount.com"
      + name     = "next-web"
      + project  = "housemaster-dev-503409"
      + role     = "roles/run.invoker"
    }

Plan: 1 to add, 0 to change, 0 to destroy.
```

The member email matches the project number (`1084024721838`) confirmed directly in `SPRINT-6B-2N`'s diagnosis.

## 3. Conclusion

- The plan proposes **exactly one action**: creating `google_cloud_run_v2_service_iam_member.iap_invoker[0]` with the intended `role`/`member`/`name`/`location` values.
- Confirmed by grepping every resource-action line in the full plan output — this is the only one.
- No unexpected drift anywhere else in the project's Terraform-managed state — every other resource refreshed with no diff against config.
- The plan was saved to a local session scratchpad file, outside the repository, for review only.

## 4. What this review does not do

Docs-only. **No `terraform apply` or auto-approve was run.** No `gcloud` IAM mutation, no service account creation outside Terraform, no deploy, no DNS/Cloud Run-config/Cloud SQL change, no Secret Manager payload, no password/`DATABASE_URL`/token/cookie/OAuth-code printing, no DB mutation, no `prisma migrate deploy`, no `package.json` edit, no automation/hook/CI wiring. Nothing was staged, committed, or pushed by creating this file.

## 5. Next safe gate

`terraform apply` of this exact reviewed plan — its own separately-approved gate, not run here. After apply, rerun the manual browser login test (`markelus@abay-germes.kz` against `https://iap-dev.housemasters.kz`), allowing time for propagation as `SPRINT-6B-2M` found necessary for the prior binding, to confirm the "IAP service account not provisioned" error is actually resolved before treating Sprint 6B as unblocked.
