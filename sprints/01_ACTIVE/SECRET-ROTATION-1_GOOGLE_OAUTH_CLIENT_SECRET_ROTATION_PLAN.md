# SECRET-ROTATION-1 — Google OAuth Client Secret Rotation Plan

**Status:** Plan only — not approved for execution
**Type:** Docs-only planning gate — no mutation
**Date:** 2026-08-30
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Scope:** Plan the rotation of the compromised `GOOGLE_CLIENT_SECRET` / Secret Manager `google-client-secret`. No secret read, no secret write, no OAuth client change, no Secret Manager operation, no Cloud Run update, no Terraform, no app code change in this gate.
**Follows:** Incident containment report (this session, undocumented as a file — see Incident section below), which halted Sprint 6B work pending rotation.

---

## Incident Summary (no secret value included)

During the SPRINT-6B-0A OAuth brand/client clarification gate, a pre-approved `grep` command (scoped over `apps/web`, matching on the variable names `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`) matched `apps/web/.env.local` — a local dev file that inlines the actual live values rather than just referencing the variable names — and the real `GOOGLE_CLIENT_SECRET` value appeared in that command's tool output. The value is treated as compromised. It has not been repeated, printed, copied, summarized, or stored anywhere in this document or any prior report in this session, and will not be. All Sprint 6B / IAP work was halted at that point per the incident containment report; this document is the first step back toward closing that incident, not a resumption of Sprint 6B.

---

## No-Mutation Confirmation

Nothing in this gate touched GCP, Secret Manager, OAuth clients, Cloud Run, Terraform, or the database. The only actions taken were local, read-only git/branch checks (`git branch --show-current`, `git status --short`, `git log`) and writing this one new documentation file. No secret value was read, printed, or written. No staging, commit, push, or PR action was taken.

---

## Proposed Rotation Sequence

Each step below is its own separately-approved gate. None are authorized by this plan document — this document only records the sequence.

1. **Regenerate the Google OAuth client secret** — manually via Cloud Console (Credentials page), or through a separately approved secure gate. Not performed here.
2. **Add a new Secret Manager version for `google-client-secret`** without printing the value in any command output, log, or tool transcript. Requires a controlled input method (e.g. `gcloud secrets versions add --data-file=` from a file never echoed, or Console paste) — to be specified in that gate's own execution plan, not here.
3. **Confirm Cloud Run references the latest secret version.** Per `infrastructure/terraform/cloud_run.tf`, the `GOOGLE_CLIENT_SECRET` env var is wired via `secret_key_ref { version = "latest" }` (see `local.secret_env_map` / `google_secret_manager_secret.runtime`), so a new `ENABLED` version should be picked up automatically on next revision — this still needs to be verified, not assumed, in the rotation-execution gate.
4. **Redeploy/refresh Cloud Run only if required** to force a new revision to pick up the rotated value (Cloud Run does not always re-resolve `latest` on already-running revisions).
5. **Verify login behavior** end-to-end with the rotated secret, once the platform-level access blocker from SPRINT-6A/6B/6B-0 is separately resolved (login cannot currently be tested live — the service is still fully private, per SPRINT-6A).
6. **Disable/destroy the old (compromised) secret version** once step 5 confirms the new version works.
7. **Document incident closure** — a short closure note referencing this plan, the rotation-execution gate's outcome, and confirmation that the old version is disabled/destroyed.

---

## Explicit Non-Goals (this gate)

- No secret value read, printed, copied, or stored.
- No Secret Manager access (payload or version operations).
- No OAuth client secret regeneration.
- No Cloud Run update or redeploy.
- No Terraform plan or apply.
- No DB/Prisma action.
- No app code or repo file change other than this new document.
- No resumption of Sprint 6B / IAP work — that remains halted until this incident closes.

---

## Next Safe Gate

**SECRET-ROTATION-1-EXEC** (working name) — the first execution step above (regenerate the OAuth client secret), scoped as its own explicitly-approved, secret-handling-safe gate with a defined method for entering the new value without it ever appearing in command output or a transcript. Not started by this document.

---

## Sprint 6 Status

Sprint 6 ("Runtime Config / Secret Hygiene") is **paused on Sprint 6B** pending this rotation. SPRINT-6A, SPRINT-6B, and SPRINT-6B-0 remain closed and pushed (`228183d`, `20e0ef4`, `0e5021b`). SPRINT-6B-0A (OAuth brand/client clarification) is complete but not written up as its own committed doc. The secret-exposure incident and this rotation plan are the current blocking item ahead of any further SPRINT-6B-1 work.
