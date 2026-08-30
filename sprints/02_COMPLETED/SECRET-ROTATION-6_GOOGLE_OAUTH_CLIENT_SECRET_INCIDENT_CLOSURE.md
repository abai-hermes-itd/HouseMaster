# SECRET-ROTATION-6 — Google OAuth Client Secret Incident Closure

Status: CLOSED — rotation completed and deployed; live login validation remains blocked by platform access/IAM
Date: 2026-08-30
Branch: feat/hm-gcp-003d-cloud-sql-import
Scope: Google OAuth client secret exposure incident closure
Secret value: not repeated, not recorded, not included

## 1. Incident summary

During Sprint 6 / SPRINT-6B-0A OAuth brand-client clarification, a command output exposed a real GOOGLE_CLIENT_SECRET value.

The exposed value was treated as compromised.

The secret value is intentionally not repeated in this document.

## 2. Rotation actions completed

The following incident-response sequence was completed:

1. SECRET-ROTATION-1 — Google OAuth Client Secret Rotation Plan.
2. SECRET-ROTATION-2 — manual OAuth client secret regeneration by the user outside Claude/ChatGPT.
3. SECRET-ROTATION-3 — new Secret Manager version added for google-client-secret.
4. SECRET-ROTATION-4 — Cloud Run reference verification.
5. SECRET-ROTATION-4B — Cloud Run revision refresh:
   - Terraform refresh marker planned.
   - Terraform refresh marker committed and pushed.
   - Saved Terraform plan applied.
   - New Cloud Run revision created.

## 3. Deployment result

Cloud Run service:

- service: next-web
- project: housemaster-dev-503409
- region: europe-west1

New Cloud Run revision created:

next-web-00012-s44

Purpose of the new revision:

- force Cloud Run to resolve google-client-secret:latest again;
- allow the service to pick up Secret Manager version 2 at revision startup.

## 4. Validation result

A minimal /login smoke test was attempted after the new Cloud Run revision was created.

Observed result:

/login -> HTTP 403 Forbidden

Interpretation:

- request is blocked by Google Frontend / Cloud Run IAM before reaching Next.js / NextAuth;
- this matches the existing platform-level blocker from Sprint 6A;
- the result does not prove a secret-rotation failure;
- end-to-end login cannot be validated until the Cloud Run/IAP access path is resolved.

## 5. Closure decision

The secret rotation incident is closed with the following wording:

Rotation completed and deployed; live login validation remains blocked by the pre-existing Cloud Run/IAM platform access issue.

This closure does not claim successful end-to-end login.

The remaining /login 403 belongs to the Sprint 6B / IAP controlled-access track, not to the secret-rotation incident.

## 6. Old secret version

The old Secret Manager version remains enabled for now.

Disabling or destroying the old version requires a separate explicit approval after either:

1. access validation succeeds through the controlled access path; or
2. a separate risk decision is made to disable it before full login validation.

No old secret version was disabled in this closure gate.

## 7. Resume rule

Sprint 6B / IAP work may resume after this closure note is committed and pushed.

Next technical track:

SPRINT-6B / IAP controlled access

The next practical gate remains access-related, not secret-rotation-related.

## 8. Safety confirmation

Confirmed safety boundaries:

- no secret value is repeated in this document;
- no Secret Manager payload is included;
- no DATABASE_URL value is included;
- no DB/Prisma operation is part of this closure;
- no further secret mutation is performed by this document.

## 9. Final status

SECRET-ROTATION-6 — CLOSED
Sprint 6 secret incident — CLOSED WITH ACCESS VALIDATION DEFERRED TO SPRINT-6B/IAP
