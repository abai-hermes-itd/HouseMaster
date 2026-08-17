# HM-GCP-004F-1 — Fix Option Decision Note

**Status:** Proposed (recommendation only — no option formally selected)
**Type:** Decision note / fix-planning gate (docs-only)
**Date:** 2026-08-17
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Scope:** Decision documentation only — no execution, no Terraform code change

---

## Context

HM-GCP-004F closed as a completed investigation, confirming two independent drift items on `google_cloud_run_v2_service.web[0]`:

- **`template.labels` drift** — introduced by HM-GCP-004X-2.
- **`scaling.manual_instance_count` / `min_instance_count` drift** — predates HM-GCP-004X-2, confirmed inert and safe to defer.

This note compares candidate fix options and records a recommendation. It does not select, approve, or implement any option.

---

## Why the label drift was introduced by HM-GCP-004X-2

`cloud_run.tf` declares top-level `labels = local.common_labels` but never declares `template.labels`. Two independent read-only checks — `gcloud run revisions describe` on the pre-refresh revision (`next-web-00003-567`), and `terraform state show` against the last-applied state (2026-08-15, also pre-refresh) — both confirmed `template.labels` was empty (`{}`) before HM-GCP-004X-2 ran. The `gcloud run services update --update-labels=secret-refresh=...` call forces a full revision rewrite; Cloud Run's API responded by propagating the service's top-level labels (`app`, `environment`, `goog-terraform-provisioned`, `managed_by`) down onto the revision template for the first time, alongside the intended `secret-refresh` label. This is a genuine side effect of the label-only refresh method, not a pre-existing condition.

---

## Why the scaling drift is safe to defer

`terraform state show` confirmed the top-level `scaling { manual_instance_count = 0, min_instance_count = 0, scaling_mode = null }` block was already present in state from the prior `terraform apply` (2026-08-15), before HM-GCP-004X-2 ran — unrelated to the refresh. Provider documentation review (`hashicorp/google` 6.50.0) confirmed `manual_instance_count` only governs runtime behavior when `scaling_mode = "MANUAL"`; since `scaling_mode` is `null` (unset/`AUTOMATIC`), the field is inert. Actual runtime scaling remains controlled by `template.scaling.min_instance_count`/`max_instance_count`, which are Terraform-declared and unaffected by this diff. A related provider issue (`terraform-provider-google` #25580, sibling `worker_pool` resource) documents the same class of benign computed-field drift.

---

## Option comparison

| Option | Addresses | Effort | Risk | Trade-off |
|---|---|---|---|---|
| **1. Extend `lifecycle.ignore_changes`** (add `labels`, `template[0].labels`, `template[0].scaling`) | Both drift items | Low | Low | Silences drift reporting entirely for these fields going forward, including any *future* unintended label/scaling changes via `gcloud` — Terraform would stop warning about them too. |
| **2. Declare `template.labels` explicitly** (e.g. `template { labels = local.common_labels }`) | Label drift only | Low-medium (HCL addition + one `terraform apply`) | Low-medium | Fixes label drift at the source; future `secret-refresh`-style ad hoc labels would still show as drift (expected/informational) — keeps drift-detection meaningful rather than blanket-silenced. |
| **3. Declare/ignore scaling separately** (explicit `scaling { scaling_mode = "AUTOMATIC" }`, or a targeted `ignore_changes` entry for just `scaling`/`manual_instance_count`) | Scaling drift only | Low | Low (field confirmed inert) | Addresses scaling in isolation; combinable with Option 2. |
| **4. Defer fix** (no code change now) | Neither | None | None immediate | Drift stays visible in every future `terraform plan` on this resource, accumulating noise; no forward risk since no `apply` occurs. |

---

## Recommended path (not selected, not approved)

**Option 2 for the label drift + Option 3-as-ignore for the scaling drift.**

Rationale: fix the label drift at its source since the cause is fully understood and cheap to declare correctly, while silencing only the scaling field (targeted `ignore_changes`, not blanket) since it's confirmed inert and unrelated to any Terraform-authored config. This avoids Option 1's downside of also silencing *future* label drift — which is exactly the kind of signal that caught this issue — while avoiding Option 4's accumulating plan noise.

**No fix option is formally selected yet. No Terraform code change is approved yet.**

---

## Why `terraform apply` remains forbidden

No fix option has been chosen or approved. Applying now — even incidentally, via an unrelated future `terraform apply` — would silently strip the `app`/`environment`/`goog-terraform-provisioned`/`managed_by` labels and reset the scaling block, effects that haven't been reviewed or signed off as intentional. Per the Operating Model, no infrastructure command runs without explicit per-step approval, and a Terraform code change is its own separate approval gate from the now-closed investigation.

---

## HM-GCP-004X-3 sequencing

**HM-GCP-004X-3 may proceed after this explicit fix-option decision, without waiting for code implementation.**

HM-GCP-004X-3 (live connectivity test) exercises the already-running Cloud Run service (revision `next-web-00004-4zk`, serving 100% traffic with `database-url` version 4 wired in). It does not touch Terraform, does not require `cloud_run.tf` to be reconciled with live state, and does not run `terraform apply`. The drift is a Terraform-bookkeeping concern between declared config and live state; it does not affect the live service's actual behavior (per the scaling-inert finding and the labels' non-functional nature).

The purpose of requiring a *decision* before HM-GCP-004X-3 — rather than requiring full implementation — is procedural hygiene: ensuring no ad hoc `terraform apply` runs for unrelated reasons mid-connectivity-testing without this drift being known and intentionally deferred. Once the decision is recorded, HM-GCP-004X-3 can proceed on its own timeline; the actual `cloud_run.tf` edit + apply can happen in a separate later gate.

---

## Non-goals

This note does not:
- select or approve a fix option
- modify `cloud_run.tf` or any other Terraform file
- run `terraform plan` or `terraform apply`
- run `gcloud`
- read `.env`
- run Prisma or DB queries
- commit or push
- proceed to HM-GCP-004X-3

---

## Readiness classification

Decision note only. Recommendation recorded; no option selected, no code changed, no infrastructure touched.
