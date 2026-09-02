# SPRINT-6B-2F-ISMET-DNS-RECORD — Closure

Status: BLOCKED / SUPPORT REQUEST SENT -> CLOSED / DNS RESOLVED
Date: 2026-09-02
Branch: feat/hm-gcp-003d-cloud-sql-import

## 1. Context

`SPRINT-6B-2F_AUTH_NS_CHECK_EVIDENCE.md` (2026-09-01) identified the blocker as
DNS delegation/provider mismatch: `housemasters.kz` is delegated to
`ns2.hosting.ismet.kz` / `ns3.hosting.ismet.kz`, not the iD Host zone where the
`iap-dev` A-record had been manually added, so the record was invisible to
public DNS. That doc's decision was to add the record in the authoritative
ISMET DNS zone instead of duplicating it in iD Host, and named the next gate
as `SPRINT-6B-2F-ISMET-DNS-RECORD`.

Since then, a support request was sent to add:

- `iap-dev A 8.232.62.29`

in the authoritative ISMET DNS zone — tracked as Ticket #135930. That gate's
status was `BLOCKED / SUPPORT REQUEST SENT` pending ISMET action.

## 2. Verification (read-only checkpoint, this session)

Public DNS resolution for `iap-dev.housemasters.kz` was checked twice, several
minutes apart, across four independent resolution paths:

- Local resolver: `8.232.62.29`
- Google Public DNS (8.8.8.8): `8.232.62.29`
- Cloudflare (1.1.1.1): `8.232.62.29`

All four checks (two rounds x two-to-three resolvers) returned `8.232.62.29`,
matching the required record exactly. No inconsistency between resolvers or
between the two rounds.

## 3. Actions taken during this verification

- No Terraform was run.
- No deploy was run.
- No Cloud Run, IAM, Secret Manager, or Cloud SQL changes were made.
- No DNS change was made by this session — the record was already resolving
  when checked; this doc only records that finding.

## 4. Conclusion

- `SPRINT-6B-2F-ISMET-DNS-RECORD` closed: the ISMET support request (Ticket
  #135930) resulted in the authoritative A-record now being publicly
  resolvable.
- This does not by itself confirm the GCP managed certificates have moved out
  of `PROVISIONING` (last seen state, per
  `SPRINT-6B-2F_DNS_CERT_HTTPS_READINESS_ATTEMPT_1.md`) — certificate
  provisioning can lag DNS resolution. That is a separate, not-yet-run check.

## 5. Next gate

Read-only managed certificate / HTTPS readiness check — re-verify
`iap-dev-housemaster-cert` / `iap-dev-housemasters-cert` status
(`gcloud compute ssl-certificates describe`) now that DNS resolves, and
confirm HTTPS reachability. No Terraform, no deploy, no DNS/IAM/Cloud Run
change in that check either — describe/read-only only.

## 6. Stop line

No Terraform apply.
No DNS change.
No Cloud Run ingress restriction.
No Cloud Run deploy/update.
No IAM change.
No Secret Manager payload.
No DB/Prisma.
No app code.
No cleanup/delete old certificate yet.
