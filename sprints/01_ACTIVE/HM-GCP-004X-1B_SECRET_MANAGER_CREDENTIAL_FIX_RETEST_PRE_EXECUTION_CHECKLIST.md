# HM-GCP-004X-1B — Secret Manager Credential Fix + Retest Pre-Execution Checklist

**Status:** Proposed
**Type:** Pre-execution checklist / Sprint 4 DB Runtime Activation
**Date:** 2026-08-27
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Scope:** Verification and procedure planning only — no secret update, no Cloud Run refresh, no endpoint call performed in this task

---

## Context

`HM-GCP-004X-3B` (commit `d77d390`) found that live revision `next-web-00009-jzn` reaches Postgres successfully but fails auth: Postgres `28P01` "password authentication failed for user \"housemaster\"" (Prisma `P2010`). Network/socket/Auth.js layers are confirmed working. `HM-GCP-004X-3B` recommended routing to `HM-GCP-004B` (Secret Manager Update Runbook) to reconcile the `database-url` secret's password with Postgres's actual password for `housemaster`.

`HM-GCP-004X-1` (the original Secret Manager update, per `HM-GCP-004X-1A`) is `CLOSED` — `database-url` version 4, `ENABLED` — but that version's password is the one now failing auth. This checklist prepares a **second** round: a new `database-url` version with the corrected password, a Cloud Run revision refresh to pick it up, and a retest of `/api/health/db`.

No secret update, refresh, or endpoint call is performed in this task.

---

## Prerequisite gate status

```
- HM-GCP-004X-1:  CLOSED — database-url version 4, ENABLED (originally assumed to be the failing version — corrected below)
- HM-GCP-004X-2:  CLOSED — next-web-00004-4zk, Ready=True, traffic 100% (superseded by 00009-jzn)
- HM-GCP-004X-3B: BLOCKED — credential mismatch finding recorded (commit d77d390)
- HM-GCP-004B:    Runbook proposed, not yet executed for a corrected-password version
```

---

## Correction (2026-08-27): failing version was 5, not 4

Metadata-only verification (`gcloud secrets versions list database-url --project=housemaster-dev-503409 --format="table(name,state,createTime)"`) found:

| Version | State | Created |
|---|---|---|
| 5 | enabled | 2026-08-26T12:50:28Z |
| 4 | enabled | 2026-08-17T04:32:42Z |
| 3 | enabled | 2026-08-13T06:52:17Z |
| 2 | disabled | 2026-08-13T06:30:38Z |
| 1 | enabled | 2026-08-01T12:24:38Z |

Version **5** was created `2026-08-26T12:50:28Z` — **before** revision `next-web-00009-jzn` was built/deployed (`2026-08-27T02:01:24Z`, this session). Since `DATABASE_URL` is bound to Secret Manager's `latest` alias (see §2 below), revision `next-web-00009-jzn` resolved **version 5** at startup, not version 4.

**Correction:** the `28P01` "password authentication failed" result recorded in `HM-GCP-004X-3B` was almost certainly tested against **version 5**, not version 4 as this checklist originally assumed. Version 5's existence and creation are not recorded in any prior sprint doc in this branch — its origin (who/what created it, and whether it was itself an earlier attempted fix that also failed) is currently unknown and unverified. No payload was accessed to reach this conclusion — version/state/create-time metadata only.

**Implication:** the remediation path is not simply "add a new version with a corrected password" on top of an unexamined version 4 — version 5 is the actual current `latest` and the actual current failure point. Before adding a new version, the origin and intent of version 5 should be established (read-only, metadata/history only — no payload) so a new version isn't added blindly on top of an already-failed unexplained prior attempt.

### Origin investigation (2026-08-27) — result: unknown / undocumented

Read-only investigation into what created version 5:

- **Version 5 metadata** (`gcloud secrets versions describe 5 --secret=database-url`, no payload): `STATE=ENABLED`, `CREATE_TIME=2026-08-26T12:50:28.243002Z`, no `DESTROY_TIME`.
- **Git log around that time (all branches, full day 2026-08-26):** no commit at or near `12:50:28Z` — `effba33` at `12:14 UTC`, next commit `70238be` at `13:30 UTC`; version 5's creation falls in the 36-minute gap between them, with no commit either side referencing Secret Manager, `database-url`, credentials, or encoding/BOM.
- **Sprint docs search** (`sprints/`, case-insensitive, for "version 5", "BOM", "byte order mark", "credential fix", "database-url"): no prior reference to version 5's creation anywhere in the branch before this doc's own correction section above.

**Classification: unknown / undocumented.** Version 5 does not correspond to any tracked commit, CI run, or existing sprint doc. It was added out-of-band, most likely by a manual `gcloud secrets versions add` run outside any process this repo records.

**BOM-cleanup hypothesis:** raised as plausible but **unconfirmed** — no artifact of it exists in git or docs, and no payload was read to check. Noted only because a Windows-authored temp secret file (e.g. via PowerShell `Set-Content`/`Out-File`, which default to UTF-8-with-BOM) could inject a leading BOM into the connection string and independently produce a `28P01` failure even with an otherwise-correct password. This is an open question for the operator to answer, not a verified finding.

**Before adding a version 6:** confirm with the operator (1) whether they created version 5 manually and what it contained (a straight password correction vs. an attempted BOM/encoding fix), and (2) whether the current real Postgres password for `housemaster` is actually known/confirmed correct right now — rather than repeating the same blind-update pattern that produced the undocumented version 5.

---

## 1. Secret update — metadata-only verification

Per `HM-GCP-004X-1A` / `HM-GCP-004B` convention, adding the corrected `database-url` version is itself a separately approved action outside this checklist. This checklist covers only what verification is allowed **after** that add:

Allowed:
- List secret versions and states (`gcloud secrets versions list database-url`) — version number, state (`ENABLED`/`DISABLED`), create time only
- Confirm a new `ENABLED` version exists with a higher version number than 4

Forbidden regardless of approval elsewhere:
- Accessing or printing secret payload
- Printing or requesting the password
- Comparing old vs. new payload content in any form

---

## 2. Cloud Run revision refresh requirement

Confirmed by reading `infrastructure/terraform/cloud_run.tf` (read-only, no `terraform` run):

```
secret_key_ref {
  secret  = google_secret_manager_secret.runtime[env.key].secret_id
  version = "latest"
}
```

`DATABASE_URL` is bound to the `latest` alias, not a pinned version number. This means:
- A **new Secret Manager version becoming `ENABLED` does not retroactively update already-running Cloud Run instances** — Cloud Run resolves `latest` at container/instance startup, not continuously.
- Existing instances on revision `next-web-00009-jzn` will keep using whatever secret value they resolved at their own startup, until they are recycled or replaced.
- **A Cloud Run revision refresh (new revision deploy) is required** to guarantee new instances start and re-resolve `latest`, picking up the corrected password.

Conclusion: a bare secret-version add, with no accompanying revision refresh, is not sufficient and must not be treated as a fix on its own. This matches the existing `HM-GCP-004C` (Cloud Run revision refresh plan) step in the `004B → 004C → 004D` chain.

---

## 3. Endpoint retest sequence (future execution only — not run in this task)

Mirrors the manual procedure already used once in this session for `HM-GCP-004X-3B`, documented here as a repeatable, pre-approved shape for the *next* attempt, after secret fix + revision refresh:

1. **Temporary invoker grant** — add a scoped, temporary `roles/run.invoker` IAM binding for the calling identity only, on the `next-web` service.
2. **Curl** — `GET /api/health/db` against the then-current live revision's URL, capture HTTP status + JSON body only (no headers/tokens logged).
3. **Rollback** — remove the temporary `roles/run.invoker` binding immediately after the call, regardless of the call's outcome (success or failure).
4. **Verify rollback** — confirm via a read-only IAM policy check that the temporary binding is gone (matches the "IAM confirmed clean" step already done once in `HM-GCP-004X-3B`).

This sequence itself remains **future execution**, requiring separate approval to actually run, per the same gating pattern as `HM-GCP-004X-3A`.

---

## 4. Rollback / stop conditions

Stop immediately, before or during execution, if any of the following would occur:

- Any command would expose secret payload, password, or unmasked `DATABASE_URL`
- The temporary `roles/run.invoker` grant cannot be confirmed removed after the curl step — do not leave it in place pending investigation; removal takes priority over further diagnosis
- The retest response is a *different* failure category than the recorded `28P01` (e.g. a socket/timeout/permission error reappears) — stop, do not attempt further remediation inline, reclassify and report as a new finding rather than assuming the same fix path applies
- The retest response is still `28P01` after a confirmed secret update + confirmed new revision — stop, do not attempt a second secret update in the same pass; report and wait for separate approval (repeated blind password changes are the higher-risk pattern this checklist exists to avoid)
- Any step would require `.env`, `terraform`, `prisma migrate`, or a direct DB query
- The retest returns a genuine positive `{"status":"ok"}` — this satisfies the precondition for `HM-GCP-004X-4`, but proceeding to `HM-GCP-004X-4` itself still requires a **separate** explicit approval; do not auto-proceed

---

## Forbidden actions (this checklist)

- Access Secret Manager payload
- Print or request the password
- Change the Cloud SQL password
- Update the `database-url` secret
- Call `/api/health/db`
- Deploy Cloud Run
- Run `terraform`
- Run any DB query
- Proceed to `HM-GCP-004X-4`
- Modify IAM (grants/revokes are future-execution only, listed above for planning, not run here)

---

## Report template

```
HM-GCP-004X-1B checklist result:
- checklist created: yes
- secret update verification scope: metadata-only (version number, state, create time)
- Cloud Run revision refresh requirement: confirmed required (DATABASE_URL bound to `latest` alias, resolved at instance startup only)
- endpoint retest sequence documented: temporary invoker -> curl -> rollback
- rollback/stop conditions documented: yes
- no secret values accessed: yes
- no forbidden commands run: yes
- ready for separate HM-GCP-004B (corrected password) execution approval: yes/no
```

---

## Non-goals

This checklist does not:
- update the `database-url` secret
- refresh or deploy Cloud Run
- call `/api/health/db`
- modify IAM
- run Terraform
- run Prisma or any DB query
- read `.env`
- access or print secrets
- proceed to HM-GCP-004X-4

---

## Readiness classification

Checklist only. Documents the secret-update verification scope, the Cloud Run revision-refresh requirement (confirmed from `cloud_run.tf`'s `version = "latest"` binding), the endpoint retest sequence, and stop/rollback conditions. Actual secret update, Cloud Run refresh, and endpoint retest remain blocked until explicit separate approval for each.
