# SPRINT-6B-2K — Terraform Plan Review Result (IAP Domain Binding)

Status: PASS / PLAN LIMITED TO INTENDED RESOURCE, NOT APPLIED
Date: 2026-09-04
Branch: feat/hm-gcp-003d-cloud-sql-import

---

## 1. Context

`SPRINT-6B-2I_IAP_ACCESS_REMEDIATION_DECISION.md` decided to bind `roles/iap.httpsResourceAccessor` to `domain:abay-germes.kz`. `SPRINT-6B-2J` (commit `86bef45`, "draft IAP domain accessor binding") added the corresponding Terraform resource to `infrastructure/terraform/iap_lb.tf`, code-only, with `terraform fmt`/`validate` passing. This document records the plan-only review of that draft, run in two attempts against live GCP state.

## 2. Attempt 1 — blocked

Application Default Credentials (used by the Terraform Google provider to reach the GCS state backend — a separate credential store from the `gcloud auth login` account used for earlier IAM policy checks) were expired:

```
Error: error loading state: Failed to open state file at gs://housemaster-dev-503409-tfstate/terraform/state/default.tfstate:
oauth2: "invalid_grant" "reauth related error (invalid_rapt)"
```

ADC was refreshed interactively (`gcloud auth application-default login`, run externally), and the check was rerun.

## 3. Attempt 2 — success

`terraform validate`: **PASS** — `Success! The configuration is valid.`

`terraform plan -var-file=dev.tfvars` (the var-file is required per `README.md`'s documented apply order; a local, gitignored `dev.tfvars` already exists) completed cleanly against live state:

```
# google_iap_web_backend_service_iam_member.next_web_iap_domain_accessor will be created
  + member              = "domain:abay-germes.kz"
  + project             = "housemaster-dev-503409"
  + role                = "roles/iap.httpsResourceAccessor"
  + web_backend_service = "next-web-iap-backend"

Plan: 1 to add, 0 to change, 0 to destroy.
```

Every other resource in state refreshed with no diff against config — no drift found anywhere else in the plan.

## 4. Conclusion

- The plan proposes **exactly one action**: creating `google_iap_web_backend_service_iam_member.next_web_iap_domain_accessor` with the intended `role`/`member`/`web_backend_service` values.
- Confirmed by grepping the full plan output for every resource-action line — this is the only one; nothing else is proposed to add, change, or destroy.
- No unexpected drift anywhere else in the project's Terraform-managed state.
- The plan was saved to a local session scratchpad file, outside the repository, for review only.

## 5. What this review does not do

Docs-only. **No `terraform apply` or auto-approve was run** — the plan above was reviewed, not applied. No `gcloud` IAM mutation, no deploy, no DNS/Cloud Run/Cloud SQL change, no Secret Manager payload, no password/`DATABASE_URL`/token/cookie/OAuth-code printing, no DB mutation, no `prisma migrate deploy`, no `package.json` edit, no automation/hook/CI wiring. Nothing was staged, committed, or pushed by creating this file.

## 6. Next safe gate

`terraform apply` of this exact reviewed plan — its own separately-approved gate, not run here. After apply, rerun the manual login test (`SPRINT-6B-2G`/`2H`-style, `markelus@abay-germes.kz` against `https://iap-dev.housemasters.kz`) to confirm domain-scoped IAP access is actually restored before treating Sprint 6B as unblocked.
