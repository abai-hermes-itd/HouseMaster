# SPRINT-6A — Cloud Run Ingress/IAM Policy Decision

**Status:** Investigation complete, live-verified — decision NOT yet approved (no apply performed)
**Type:** Read-only investigation, decision doc only — no apply
**Date:** 2026-08-30
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Scope:** Diagnose AUTH-5 `403 Forbidden` on the dev Cloud Run service and evaluate ingress/IAM options. No Terraform change, no IAM change, no Cloud Run deploy in this gate.
**Follows:** `sprints/02_COMPLETED/HM-005_CLOSE_SPRINT5_ADMIN_AUTH.md`

---

## No-Mutation Confirmation

No GCP mutation was performed, in either the original pass or this live-verification pass. Every command run was `describe`/`list`/`get-iam-policy` (or `gcloud config get-value` / `auth list` / `organizations list` / `projects get-ancestors` for identity/guardrail checks). No `terraform apply`, `gcloud ... set-iam-policy`, `gcloud auth login`, or any write call was issued. No command touched Secret Manager or printed a secret value.

**Guardrails checked before any read (per live-verification pass, 2026-08-30):**
- Active account: `markelus@abay-germes.kz` — matches required account. ✅ (proceed)
- Active project: `housemaster-dev-503409` — matches required project. ✅ (proceed)
- Org-policy read access: **not denied** this pass (see Live Verification below). ✅

---

## Live Verification (2026-08-30, post-reauth)

Reauth resolved between the original pass and this one — all reads below succeeded (contrast with the original pass, which hit `Reauthentication failed. cannot prompt during non-interactive execution` on every `gcloud` read).

### Active account / project

```
$ gcloud config get-value account  →  markelus@abay-germes.kz
$ gcloud config get-value project  →  housemaster-dev-503409
```
Both match the required guardrail values.

### Cloud Run IAM policy (`next-web`, `europe-west1`) — full policy, live

```json
{
  "bindings": [
    {
      "members": ["serviceAccount:sa-deployer-dev@housemaster-dev-503409.iam.gserviceaccount.com"],
      "role": "roles/run.developer"
    }
  ],
  "etag": "BwZaAIhfLbg=",
  "version": 1
}
```

**Summary:** exactly one binding exists, and it is `roles/run.developer` (deploy/manage revisions) for the CI/CD deployer service account — **not** `roles/run.invoker`. There is no `allUsers` binding, no `allAuthenticatedUsers` binding, and no domain/group principal. `roles/run.developer` does not itself carry `run.routes.invoke` (Cloud Run separates "manage" from "invoke" by design) — so **not even the deployer SA can currently invoke this service**, let alone the public or a Workspace admin.

### Org Policy — `iam.allowedPolicyMemberDomains`

- `describe` at the **project** node (no `--effective`) returned only `constraint:` and `etag:`, no `listPolicy`/rules — i.e. **no explicit override is set on the project itself**; `org-policies list --project=...` confirms this with `Listed 0 items.`
- `describe --effective` (resolved through inheritance) returned:
  ```
  constraint: constraints/iam.allowedPolicyMemberDomains
  listPolicy:
    allowedValues:
    - C02w3xoca
  ```
- `gcloud organizations list` confirms `C02w3xoca` is the **Cloud Identity/Workspace customer ID for `abay-germes.kz`** (org `76529432832`).
- `gcloud projects get-ancestors housemaster-dev-503409` confirms the project's direct parent is that same organization (no intervening folder) — so the policy is inherited straight from the org, not set anywhere in between.

**Conclusion: `iam.allowedPolicyMemberDomains` IS enforced** on this project, inherited from the org, restricting any IAM-bindable member (on any resource in the org, Cloud Run included) to principals belonging to Workspace customer `C02w3xoca` (i.e., `abay-germes.kz` users/groups/service accounts). `allUsers` and `allAuthenticatedUsers` are not scoped to any customer ID — they are categorically excluded by this constraint, org-wide, with no per-resource member visible in this project's node. This directly confirms and gives a concrete mechanism for the org-policy block reported (not just narratively) in `HM-GCP-003E.2-C`.

**Is `allUsers`/public invoker blocked by org policy? Yes — confirmed live**, via the mechanism above, not just the prior incident's narrative.

### Is the service currently private?

**Yes — fully private, with no exceptions.** The live IAM policy has zero `run.invoker` grants of any kind (public, domain-scoped, or named). This is stricter than "no public access" — literally no principal, including the deploy pipeline's own service account, currently holds invoke permission.

### Confirmed reason for the 403

The Cloud Run platform IAM check rejects every request before it reaches the container, because no principal holds `roles/run.invoker` on the service (live-confirmed above), and no principal can be granted `allUsers`/`allAuthenticatedUsers` while `iam.allowedPolicyMemberDomains` is enforced from the org (live-confirmed above). This is now fully confirmed by live evidence, not just IaC inference — matches the `403` / `server: Google Frontend` / no-app-headers signature recorded in HM-005 for both `GET /login` and `GET /admin`.

---

## Findings

### 1. Does `allUsers` have `roles/run.invoker`?

**No.** `infrastructure/terraform/iam.tf` gates the `public_invoker` binding (`allUsers` → `roles/run.invoker`) behind `var.cloud_run_allow_unauthenticated`, and `dev.tfvars:30` sets `cloud_run_allow_unauthenticated = false` — so the resource has `count = 0` and was never created in dev state. This is deliberate: `sprints/02_COMPLETED/HM-GCP-003E.2-C_RESOLVE_TAINTED_CLOUD_RUN.md` records that the `public_invoker` apply was attempted and **failed, blocked by Organization Policy**, and the flag was then set to `false` specifically to keep it out of the plan graph.
*(Confirmed live in the Live Verification section below — no reauth blocker this pass.)*

### 2. Does `allAuthenticatedUsers` have `roles/run.invoker`?

**No — confirmed live.** No Terraform resource in `iam.tf` grants `allAuthenticatedUsers` any role, and the live `get-iam-policy` read (Live Verification below) shows exactly one binding on the service — `roles/run.developer` for `sa-deployer-dev` — with no `allAuthenticatedUsers` entry and no `run.invoker` grant to anyone. This rules out an out-of-band/manual grant, not just an IaC-absence inference.

### 3. Does domain-restricted IAM appear to be enforced?

**Not at the Cloud Run invoker layer.** No `domain:abay-germes.kz` (or any group) principal is granted `roles/run.invoker` anywhere in `iam.tf`. The domain restriction that *does* exist is **application-level only**: `ALLOWED_WORKSPACE_DOMAIN=abay-germes.kz` is wired as a plain env var on the Cloud Run service (`cloud_run.tf:97-100`, applied live per HM-005 via commit `e3bb9ee`), and enforced inside the app by `isAllowedDomain()` / the Auth.js `signIn` callback (Sprint 5 / HM-005-QA1). That code is unit-tested but **cannot currently run** — see #5.

### 4. Does Organization Policy block `allUsers`/public invoker?

**Yes — confirmed live**, not just per the prior documented incident (HM-GCP-003E.2-C, step 11: "`public_invoker` apply failed — blocked by Organization Policy (`allUsers` not permitted)"). Live evidence (Live Verification section below) identifies the exact mechanism: `iam.allowedPolicyMemberDomains` is enforced on this project, inherited directly from the `abay-germes.kz` org node (no folder in between, no project-level override), as a `listPolicy` allowlisting only Workspace customer ID `C02w3xoca`. `allUsers`/`allAuthenticatedUsers` are not scoped to any customer ID, so they are categorically excluded — this is the concrete constraint behind the prior incident's narrative, not merely a corroboration of it. No raw error text for the original 2026-08 failure is preserved in the repo (checked `apply-e3bb9ee-stdout.txt`, `preview-e3bb9ee-plan-stdout.txt`, `hm-gcp-003f1-post-apply-full-plan.txt`, `sprint3-readonly-plan.txt` — none mention it), but that gap no longer matters now that the constraint has been read live and directly.

### 5. Likely reason for the HTTP 403

Cloud Run's own invoker-IAM check is rejecting the request **before it reaches the container**, because (per #1–#3) no principal — public, domain-scoped, or otherwise — currently holds `roles/run.invoker` on the service in dev. This matches the AUTH-5 evidence in HM-005: both `GET /login` and `GET /admin` returned `403` with `server: Google Frontend` and **no application-level headers**, meaning literally nobody (including a legitimate `@abay-germes.kz` Workspace admin browsing normally) can currently reach the app.

### 6. App/middleware issue, or Cloud Run ingress/IAM/platform issue?

**Platform/IAM, not app/middleware.** Confirmed already in HM-005: the `Google Frontend`-only response with no app headers means the rejection happens at the Cloud Run edge, ahead of `middleware.ts` and all app code (`lib/auth.ts`, `isAllowedDomain()`). The admin-auth application code built in Sprint 5 is implemented, merged, and unit-tested, but has never actually been exercised by a live HTTP request — it is not implicated in this 403.

---

## Decision Options

| # | Option | Satisfies domain-restriction org policy? | Works for an anonymous browser hitting `/login`? | Notes |
|---|--------|:---:|:---:|---|
| **A** | Domain-restricted IAM principal (`domain:abay-germes.kz` → `roles/run.invoker`) | Yes | **No** | Cloud Run's invoker check requires the caller to *already* present a signed Google ID token on every request, including the first anonymous hit. A browser navigating to a URL doesn't carry one — this only helps pre-authenticated service/API/`gcloud` callers, not the SSO login flow itself. |
| **B** | Identity-Aware Proxy (IAP) in front of Cloud Run | Yes (`roles/iap.httpsResourceAccessor` scoped to `domain:abay-germes.kz`; invoker goes to IAP's own service agent, not `allUsers`) | Yes — IAP performs the Google Sign-In redirect itself and injects the token Cloud Run needs | Solves the UX problem correctly, but duplicates Sprint 5's Auth.js/NextAuth Google-OAuth + domain-check flow. Needs an explicit decision on whether IAP replaces, wraps, or runs alongside app-level auth. More moving parts (OAuth brand/client, IAP config) for a dev environment. |
| **C** | External HTTPS Load Balancer + Cloud Armor | Not by itself | Not by itself | Cloud Armor is a network/WAF filter (IP/geo/rate), not an identity control. The LB→Cloud Run serverless-NEG backend still needs *some* invoker principal — commonly still `allUsers`, which trips the same org policy — so this option really means "B + LB", at higher setup cost, unless paired with IAP. |
| **D** | Named-principal allowlist (`roles/run.invoker` to a specific group, e.g. `group:hm-admins@abay-germes.kz`) | Yes | **No** | Same fundamental limitation as A — still requires the caller to already hold a Google ID token before the first request. Narrow and auditable, but doesn't fix the anonymous-browser SSO case. |
| **E** | Scoped Org Policy exception permitting `allUsers`/`roles/run.invoker` on this one Cloud Run service, keeping Auth.js + `isAllowedDomain()` as the sole real authorization boundary (the design Sprint 5 already built) | Requires an explicit **exception**, not compliance | Yes | This is the model `prod.tfvars.example` already assumes (`cloud_run_allow_unauthenticated = true`) — bringing dev in line with the intended target rather than adding a dev-only detour. Requires an Org Policy Admin (outside this project's authority) to grant the exception; relies solely on app-level auth for defense — a real trade-off that Org/Security should sign off on explicitly. Feasibility (whether the constraint even allows a project-level exception) is unconfirmed — needs the live `org-policies describe` this session couldn't run. |

**Recommendation — updated after live verification: B, not E.**

The original recommendation (E first, B fallback) was provisional pending a live org-policy read. That read is now in: `iam.allowedPolicyMemberDomains` is enforced **org-wide** (inherited from `abay-germes.kz`'s org node, not set/overridden at the project), as a `listPolicy` allowlisting only Workspace customer `C02w3xoca`. `allUsers`/`allAuthenticatedUsers` aren't scoped to any customer ID, so they're structurally excluded by this constraint — there is no per-resource member or condition visible on this constraint type that could carve out an exception for a public principal; the restriction is enforced at the org, not something a project-level policy override plausibly reaches around (and attempting to set a project-level override to test that would itself be a mutation, out of scope for this gate). E therefore now looks unlikely to be grantable as originally framed ("except `allUsers` on this one service") — it would need to become "ask the Org Policy Admin whether *any* exception mechanism exists," which is a question for that team, not a Terraform change this project can make.

**B (Identity-Aware Proxy) is now the primary recommendation.** It's the only evaluated option that is simultaneously: (1) compliant with the live-confirmed org policy — IAP's own service agent gets `run.invoker`, not `allUsers`, and IAP's own access control (`roles/iap.httpsResourceAccessor`) can itself be scoped to `domain:abay-germes.kz`/`C02w3xoca`, staying inside the same constraint; and (2) usable by an ordinary anonymous browser, since IAP performs the Google Sign-In redirect and injects the token Cloud Run's invoker check needs — solving exactly the gap that rules out A and D. The remaining open question for B, not for this gate: whether IAP's own sign-in replaces, wraps, or duplicates Sprint 5's Auth.js/`isAllowedDomain()` flow — that's an architecture call for SPRINT-6B, not a re-litigation of this gate's IAM/ingress finding.

C is dropped — it doesn't stand on its own against a live-confirmed org-wide domain restriction; it would still need B underneath it.

A quick, low-cost side check worth doing in parallel (not blocking): ask the Org Policy Admin directly whether `iam.allowedPolicyMemberDomains` has ever had a resource-level exception granted elsewhere in the org. If yes, E could still be revisited. Don't block SPRINT-6B on that answer.

---

## Recommended Next Gate

**SPRINT-6B — Cloud Run Access via Identity-Aware Proxy (IAP)**
Scope: implement option B — front the dev Cloud Run service with IAP, grant IAP's service agent `roles/run.invoker` (not `allUsers`), and scope `roles/iap.httpsResourceAccessor` to `domain:abay-germes.kz`. Includes the architecture decision on how IAP's sign-in relates to Sprint 5's existing Auth.js/`isAllowedDomain()` flow (replace / wrap / run alongside), since both this gate's finding and that decision are prerequisites for a correct implementation. Explicitly excludes: any other app code change, Secret Manager changes, DB/Prisma changes, and changes to `prod.tfvars.example` assumptions beyond confirming they still hold once the dev model is proven. Still gated on approval — this gate (6A) is a recommendation, not an authorization to implement.

Then:
**SPRINT-6C — Re-run AUTH-5** (Admin Auth Live Behavior Verification) against the corrected ingress model, closing the blocker carried forward from HM-005.

---

## Sprint 6 Current Status

Sprint 6 ("Runtime Config / Secret Hygiene", per the follow-up track named in `HM-005_CLOSE_SPRINT5_ADMIN_AUTH.md`) has **not formally started as execution**. SPRINT-6A (this document) is now complete and live-verified: root cause is confirmed with live evidence (no `run.invoker` grants of any kind exist on the service; `iam.allowedPolicyMemberDomains` is confirmed enforced org-wide and structurally excludes `allUsers`/`allAuthenticatedUsers`), and the recommendation has been updated from the original provisional call (E) to B (IAP), based on that live evidence. Nothing has been approved or implemented yet — SPRINT-6B/6C above remain as the gates before Sprint 6 can close and AUTH-5 can be un-blocked.

---

## Upcoming Sprint Summary (for context, not authoritative roadmap)

- **Sprint 6 — Runtime Config / Secret Hygiene** *(this track; name sourced from HM-005's follow-up section)* — Cloud Run ingress/IAM decision (this gate) → implementation → AUTH-5 re-verification.
- **Sprint 7 — Admin Console MVP** *(name referenced in HM-005, line 78, as depending on Sprint 6's public-reachability outcome)* — first real admin UI, gated on public reachability being resolved.
- **Sprint 8 — DB / Prisma Production Hardening** *(carried from this session's working plan; not yet written to a roadmap file in the repo)*.
- **Sprint 9 — API Boundary / Internal Services** *(same — carried from this session's working plan, not yet committed to a roadmap doc)*.

Note: `sprints/00_ROADMAP/HOUSEMASTER_SPRINT_ROADMAP.md` uses a different, older numbering (its row 5/6/etc. are "User Roles & Access Model" / "Core Domain — Buildings", not these names) and was last synced 2026-08-27, before HM-005 closed. It should be reconciled with this Sprint 6–9 track in a future roadmap-sync gate rather than assumed consistent as-is.
