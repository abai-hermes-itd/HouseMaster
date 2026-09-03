# HM-GCP-003D — Status Finding: Split, Not Closed

**Status:** Finding — documentation only, no action taken
**Type:** Docs-only status finding
**Date:** 2026-09-04
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**HEAD at time of this finding:** `55ea623` (== `origin/feat/hm-gcp-003d-cloud-sql-import`, tree clean)
**Scope:** This document only. No Terraform, deploy, Cloud SQL, Secret Manager, IAM, DNS, Cloud Run, DB, Prisma, or `package.json` change is made or implied by this note.

---

## 1. Summary

A read-only resume checkpoint (git history + sprint-doc + roadmap inspection, no writes) found that **HM-GCP-003D is not a single closed track — it is split into three distinct states**: part shipped, part still open, and a large amount of unrelated work sitting on the same long-running branch. This note records that split so it doesn't have to be re-discovered from git archaeology next time.

## 2. What was shipped via PR#2

`origin/main` already contains merge commit `b538bb5` — *"Merge pull request #2 from `feat/hm-gcp-003d-cloud-sql-import` — HM-GCP-003D: Cloud SQL import, runtime readiness, and MCP gate governance"* — dated **2026-08-30**. That PR merged everything on this branch up through commit `e3bb9ee` (`fix(gcp): add allowed workspace domain env`), which is the merge-base between this branch and `origin/main`.

In scope of what shipped: `cloud_sql.tf` (the `google_sql_database_instance.main` resource, `deletion_protection`, `lifecycle.ignore_changes` for `maintenance_version`/`authorized_networks`), the `sqladmin.googleapis.com` API uncomment, the `cloud_sql_instance_name`/`cloud_sql_region`/`cloud_sql_tier` variables, Prisma 7 runtime readiness (ADR-0006, `prisma.config.ts`, runtime adapter), the DB health-check endpoint and admin-route middleware, and the original MCP gate-governance tooling (`hm_repo_status`, `hm_gate_status`, etc.).

## 3. What remains open

- **Cloud SQL two-stage import, stage 2.** The original `HM-GCP-003D.1` commit (`fa6892f`) deliberately deferred `google_sql_database` and `google_sql_user` — "stage 2, after ADR-0005 acceptance," because a user's password must never enter Terraform state. **ADR-0005 has been Status: Accepted since 2026-07-26** (the same day as `003D.1`), but `infrastructure/terraform/cloud_sql.tf` still has no `google_sql_database` or `google_sql_user` resource as of this finding. Stage 2 was never implemented.
- **`terraform validate` was never confirmed.** `003D.1`'s own commit message states `terraform validate: NOT run (provider registry unreachable from this environment, 403)` and asked for local verification before merge. No later commit or doc in this branch records that it was ever actually run.

## 4. Unrelated but still present on this branch

47 commits sit on `feat/hm-gcp-003d-cloud-sql-import` after the `e3bb9ee` merge-base with `origin/main`, none merged back and none part of HM-GCP-003D's own scope:

- Sprint 5 Admin Auth closeout (`HM-005`), closed with an **open `AUTH-5` blocker** (`fec6adc`).
- The entire Sprint 6A/6B IAP + DNS + HTTPS + OAuth access track (SPRINT-6A, SPRINT-6B-0 through 6B-2G).
- `SECRET-ROTATION-1` (Google OAuth client secret rotation) and its incident closure.
- Tech-debt inventory, classification, and cleanup-decision work (`TECH-DEBT-0/1/3`).
- The approval-pack / Gate Runner tooling family, including this session's `GATE_RUNNER_DRY_RUN_V0.md` and its two tool files (`sprints/04_RUNBOOKS/`).
- An unrelated feature commit, `feat(gplay): add HouseMaster PWA camera baseline` (`1082d94`).

`origin/main` and this branch have diverged in both directions: 1 commit exists only on the `main` side (the merge commit itself) and 47 exist only on this branch. No PR or merge plan back to `main` has been opened or recorded for any of this.

## 5. This note is documentation only

Creating this file is the only action taken. No Terraform plan or apply, no `terraform validate`, no Cloud SQL, Secret Manager, IAM, DNS, Cloud Run, DB, or Prisma command was run; no `package.json` was touched; nothing was staged, committed, or pushed; no hook, CI step, or automation was added.

## 6. Recommended next safe gate

Two independent options, neither implied or auto-started by this note:

1. **Cloud SQL stage-2 import gate** (Terraform-only, still no `terraform apply`): draft the `google_sql_database` resource addition to `cloud_sql.tf`, matching the design already recorded in `HM-GCP-003C`, now that ADR-0005 acceptance (the stated blocking condition) is confirmed satisfied. The `google_sql_user` side still needs its own separate handling per `HM-GCP-003C` §8 (password must not enter TF state) — likely an explicit non-goal for whatever gate does the database resource.
2. **Branch-consolidation decision.** With 47 commits of substantive, already-`origin/main`-independent work sitting only on this branch, a decision is needed on whether to open a new PR for (some or all of) that work, split it into smaller PRs by topic (IAP/DNS, secret rotation, tech debt, runbook tooling), or continue treating this branch as the working branch. This is a decision gate, not an execution gate — no code change is implied by raising it.

This note does not choose between the two — it records the split so either can be picked up deliberately, on its own approval.
