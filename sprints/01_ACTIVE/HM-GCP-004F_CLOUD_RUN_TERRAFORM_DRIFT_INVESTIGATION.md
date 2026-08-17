# HM-GCP-004F — Cloud Run Terraform Drift Investigation

**Status:** Proposed
**Type:** Investigation / fix-planning gate (docs-only)
**Date:** 2026-08-17
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Scope:** Investigation and fix-option documentation only — no execution

---

## Context

HM-GCP-004X-2 (Cloud Run revision refresh, label-only via `gcloud run services update --update-labels=secret-refresh=<timestamp>`) executed successfully and was independently verified: new revision `next-web-00004-4zk`, `Ready=True`, service account unchanged, 100% traffic.

A subsequent read-only Terraform drift-check (`terraform plan -var-file=dev.tfvars -no-color`) surfaced drift broader than the expected single-label change.

---

## Observed drift

`terraform plan` against `google_cloud_run_v2_service.web[0]` shows:

```
- scaling {
    - manual_instance_count = 0 -> null
    - min_instance_count    = 0 -> null
  }

~ template {
    ~ labels = {
        - "app"                        = "housemaster" -> null
        - "environment"                = "dev" -> null
        - "goog-terraform-provisioned" = "true" -> null
        - "managed_by"                 = "terraform" -> null
        - "secret-refresh"             = "202608170950" -> null
      }
  }
```

`Plan: 0 to add, 1 to change, 0 to destroy` — confined to this one resource, but touching more attributes than the single label the refresh was meant to add.

---

## Why the HM-GCP-004X-2 refresh itself succeeded

The refresh's own success criteria were fully met and are unaffected by this drift:
- New revision `next-web-00004-4zk` created and became `Ready=True`
- 100% traffic routed to it
- Service account, Cloud SQL connector, image, and secret env references (`database-url` → version 4) all unchanged
- No live traffic disruption, no config change beyond the intended label

Terraform drift is a *reporting* discrepancy between declared config and live state — it does not retroactively affect an already-completed `gcloud` operation. The refresh gate (HM-GCP-004X-2) is correctly closed as successful; this drift is a separate, follow-on concern about the *next* `terraform apply`, not about the refresh that already ran.

---

## Why `terraform apply` is forbidden until this is understood

1. **Label removal risk:** an unreviewed apply would strip `app`, `environment`, `goog-terraform-provisioned`, and `managed_by` — labels that look like they carry provisioning/ownership meaning (possibly used by tooling, cost allocation, or `goog-terraform-provisioned` conventions) and were not intentionally added by any approved task.
2. **Scaling field uncertainty:** the origin and live effect of `scaling.manual_instance_count` are not yet confirmed (see "Likely causes" below). Applying `null` for it should be low-risk (a return to automatic scaling governed by `min_instance_count`/`max_instance_count`, which stay Terraform-managed), but "likely low-risk" is not sufficient justification for an unreviewed production-adjacent apply.
3. **Root cause now confirmed (see below), but decision still pending:** the label drift was introduced by HM-GCP-004X-2 and the scaling drift predates it — both are now understood, but no fix option has been selected or approved yet, so applying remains premature.

---

## Confirmed causes (updated after investigation steps 1 and 2)

Both drift items were investigated via two read-only commands: `gcloud run revisions describe next-web-00003-567 --format=json` (pre-refresh revision) and `terraform state show 'google_cloud_run_v2_service.web[0]'` (last-applied state, dated 2026-08-15, also pre-refresh). Together they give a clean "before" snapshot to compare against the post-refresh live state.

- **`template.labels` — INTRODUCED BY HM-GCP-004X-2.** Both the pre-refresh revision describe and the pre-refresh persisted Terraform state confirm `template.labels` was empty (`{}`) on revision `-00003-`, with no `app`, `environment`, `goog-terraform-provisioned`, or `managed_by` present. `cloud_run.tf` sets top-level `labels = local.common_labels` but never declares `template.labels` at all. The label-only `gcloud run services update --update-labels=secret-refresh=...` call (which forces a full revision rewrite) caused Cloud Run to newly propagate the service's top-level labels down onto the revision template, alongside the intended `secret-refresh` label. This was a genuine, previously-undocumented side effect of the refresh — not merely revealing pre-existing drift.
- **`scaling.manual_instance_count` / `min_instance_count` — PREDATES HM-GCP-004X-2.** The persisted Terraform state (last apply, 2026-08-15, before the refresh) already contains a top-level `scaling { manual_instance_count = 0, min_instance_count = 0, scaling_mode = null }` block on the service resource — a block `cloud_run.tf` never declares in HCL (only `template.scaling` is declared, with `min_instance_count`/`max_instance_count`, no `manual_instance_count`). Since this value was already in the state file before HM-GCP-004X-2 ran, this drift is unrelated to the refresh and has existed since at least the prior `terraform apply`.

---

## Candidate fix options (none selected yet — for future approval)

Now that root causes are confirmed and split, Option 2 is better-justified for the label drift (address at the source) and Option 1 is better-justified for the scaling drift (pre-existing, lower-urgency, safe to ignore pending step 3 above). No option has been selected or approved.

**Option 1 — Extend `lifecycle.ignore_changes`:**
Add `labels`, `template[0].labels`, and `template[0].scaling` (or the specific `manual_instance_count` sub-attribute, if separately targetable) to the existing `ignore_changes` list alongside `image`, `client`, `client_version`. Lowest-effort; accepts that `gcloud`-driven label/scaling changes will always diverge from Terraform state without reporting drift.

**Option 2 — Declare `template.labels` explicitly in `cloud_run.tf`:**
Set `template { labels = local.common_labels }` (or an explicit subset) so Terraform's declared state matches what the API actually persists, eliminating the label drift at its source rather than ignoring it. Leaves `secret-refresh`-style ad hoc labels as the only expected transient drift (which could then be separately ignored or accepted as informational).

**Option 3 — Investigate and explicitly set `scaling` mode in Terraform:**
If `manual_instance_count`/`scaling_mode` prove to be a real, intentional API field (not incidental), declare it explicitly in `cloud_run.tf` to match actual desired scaling behavior, rather than leaving it undeclared.

**Option 4 — Do nothing further; re-run drift-check only after next legitimate `terraform apply`:**
Accept current drift as informational-only, revisit only when an apply is next genuinely needed for unrelated reasons (e.g., a real config change), at which point review the full diff before applying.

---

## Investigation steps

1. ✅ **Done (2026-08-17).** `gcloud run revisions describe next-web-00003-567 --region=europe-west1 --project=housemaster-dev-503409 --format=json` — compared scaling/labels fields against the pre-refresh revision. Result: `template.labels` empty on `-00003-`; no `manual_instance_count` visible in this Knative-format output (inconclusive for scaling).
2. ✅ **Done (2026-08-17).** `terraform state show 'google_cloud_run_v2_service.web[0]'` — read-only, inspected Terraform's own recorded state (last apply, 2026-08-15). Result: confirmed `template.labels = {}` pre-refresh (label drift introduced by HM-GCP-004X-2), and confirmed top-level `scaling.manual_instance_count = 0` already present pre-refresh (scaling drift predates HM-GCP-004X-2).
3. **Still open (read-only, future approval required).** Review Terraform provider (`google`) changelog/schema for `scaling.manual_instance_count` to confirm intended semantics and default behavior when unset vs. explicitly `0` — needed before choosing between "ignore" vs. "declare explicitly" for the pre-existing scaling block.

---

## Explicit approval required before any Terraform code change

No `lifecycle.ignore_changes` edit, no `template.labels` declaration, no `scaling` block change, and no `terraform apply` may proceed under this gate without a separate, explicit approval that selects one of the candidate fix options above. This document is investigation/planning only.

---

## Non-goals

This gate does not:
- run `terraform apply` or `terraform destroy`
- run `gcloud`
- modify `cloud_run.tf` or any other Terraform file
- read `.env`
- run Prisma or DB queries
- commit or push
- proceed to HM-GCP-004X-3

---

## Readiness classification

Investigation/planning note only. No fix selected, no code changed, no infrastructure touched.
