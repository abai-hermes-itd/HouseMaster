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
3. **Root cause unconfirmed:** whether this predates HM-GCP-004X-2 or was introduced by it is not fully verified yet (see Investigation steps) — applying before understanding cause risks masking or compounding an unrelated pre-existing issue.

---

## Likely causes

- **`template.labels`:** `cloud_run.tf` sets top-level `labels = local.common_labels` but never declares `template.labels` at all. Cloud Run's API appears to copy the service-level labels down onto the revision template at deploy time (possibly triggered specifically by `gcloud run services update --update-labels=...`, which forces a full revision rewrite). Since Terraform's config has zero opinion on `template.labels`, any value the API sets there reads as full-block drift.
- **`scaling.manual_instance_count` / `min_instance_count`:** `cloud_run.tf`'s `scaling` block only sets `min_instance_count` and `max_instance_count` (via `var.cloud_run_min_instances`/`max_instances`); it never sets `manual_instance_count`, and the provider schema for this newer scaling-mode field may not align with what `cloud_run.tf` declares. Comparison of pre-refresh exported state (revision `-00003-`, Aug 15) shows the same `minScale: '0'`/`maxScale: '3'` Knative annotations as the current revision, suggesting the underlying instance counts haven't changed — but that export format doesn't surface this specific v2-API field, so it's not fully confirmed whether `manual_instance_count` was already implicitly set pre-refresh or newly materialized by the `services update` call.

---

## Candidate fix options (none selected yet — for future approval)

**Option 1 — Extend `lifecycle.ignore_changes`:**
Add `labels`, `template[0].labels`, and `template[0].scaling` (or the specific `manual_instance_count` sub-attribute, if separately targetable) to the existing `ignore_changes` list alongside `image`, `client`, `client_version`. Lowest-effort; accepts that `gcloud`-driven label/scaling changes will always diverge from Terraform state without reporting drift.

**Option 2 — Declare `template.labels` explicitly in `cloud_run.tf`:**
Set `template { labels = local.common_labels }` (or an explicit subset) so Terraform's declared state matches what the API actually persists, eliminating the label drift at its source rather than ignoring it. Leaves `secret-refresh`-style ad hoc labels as the only expected transient drift (which could then be separately ignored or accepted as informational).

**Option 3 — Investigate and explicitly set `scaling` mode in Terraform:**
If `manual_instance_count`/`scaling_mode` prove to be a real, intentional API field (not incidental), declare it explicitly in `cloud_run.tf` to match actual desired scaling behavior, rather than leaving it undeclared.

**Option 4 — Do nothing further; re-run drift-check only after next legitimate `terraform apply`:**
Accept current drift as informational-only, revisit only when an apply is next genuinely needed for unrelated reasons (e.g., a real config change), at which point review the full diff before applying.

---

## Recommended investigation steps (read-only, none run yet — future approval required)

1. `gcloud run revisions describe next-web-00003-567 --region=europe-west1 --project=housemaster-dev-503409 --format=json` — compare scaling/labels fields against `next-web-00004-4zk`'s equivalent describe output, to confirm whether the drift predates HM-GCP-004X-2 or was introduced by it.
2. `terraform state show 'google_cloud_run_v2_service.web[0]'` — read-only, inspect Terraform's own recorded state for `template.labels`/`scaling` history.
3. Review Terraform provider (`google`) changelog/schema for `scaling.manual_instance_count` to confirm intended semantics and default behavior when unset vs. explicitly `0`.

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
