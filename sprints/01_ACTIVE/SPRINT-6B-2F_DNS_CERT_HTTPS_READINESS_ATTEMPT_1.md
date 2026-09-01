# SPRINT-6B-2F — DNS / Certificate / HTTPS Readiness Verification Attempt 1

Status: DNS FAIL / NOT PROPAGATED OR DELEGATION ISSUE
Date: 2026-09-01
Branch: feat/hm-gcp-003d-cloud-sql-import

## 1. Context

Manual DNS A-record was created in iD Host DNS zone housemasters.kz:

- Host: iap-dev
- Type: A
- Value: 8.232.62.29
- Resulting FQDN: iap-dev.housemasters.kz

## 2. Verification result

DNS verification was attempted after record creation.

Results:

- Windows Resolve-DnsName: DNS name does not exist
- Google Public DNS 8.8.8.8: Non-existent domain
- Cloudflare DNS 1.1.1.1: Non-existent domain
- curl https://iap-dev.housemasters.kz: Could not resolve host

## 3. Certificate state

GCP certificates remain in PROVISIONING:

- iap-dev-housemaster-cert — MANAGED / PROVISIONING
- iap-dev-housemasters-cert — MANAGED / PROVISIONING

## 4. HTTPS proxy state

HTTPS proxy is correctly switched to the new housemasters certificate:

- proxy: next-web-iap-https-proxy
- sslCertificates: iap-dev-housemasters-cert

## 5. Interpretation

The current blocker is DNS resolution, not Terraform proxy/certificate wiring.

Possible causes:

- DNS propagation delay
- DNS zone in iD Host is not authoritative for public housemasters.kz
- registrar/nameserver delegation points elsewhere
- DNS panel saved record locally but not published publicly yet

## 6. Next safe action

Run authoritative DNS / nameserver delegation check before any further infrastructure mutation.

Next gate:

SPRINT-6B-2F-AUTH-NS-CHECK — check authoritative nameservers and DNS delegation for housemasters.kz.

## 7. Stop line

No Terraform apply.
No DNS duplicate record.
No Cloud Run ingress restriction.
No Cloud Run deploy/update.
No Secret Manager payload.
No DB/Prisma.
No app code.
No cleanup/delete old certificate yet.
