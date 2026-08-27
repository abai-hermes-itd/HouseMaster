# Template — Gate Closure Record

**Maps to:** `HOUSEMASTER_GCP_GATE_AGENT_OPERATING_MODEL.md` §4 "Docs-only gate" (closure variant), §14 "Report template"

**Use when:** a gate document's open question has been resolved — either successfully (close it) or by a contained failure (record the incident and its containment, without closing). These are two forms of the same underlying pattern: don't let a resolved state sit undocumented in a doc whose header still says "in progress" or "blocked."

---

## Fill-in-the-blank request — successful closure

```
Record successful <GATE_ID> <WHAT WAS RETESTED> and close the gate.

Target:
<TARGET_FILE>

Record:
- <key fact 1 — e.g. live revision>
- <key fact 2 — e.g. credential/version source>
- <key fact 3 — e.g. response body / exit code>
- conclusion: <GATE_ID> closed / <WHAT IT PROVES>
- <DOWNSTREAM_GATE_ID> remains separately blocked pending explicit approval

Allowed:
git status --short
update target file only
git diff

Forbidden:
no Secret Manager payload, no password, no Cloud SQL change, no secret update,
no endpoint call, no deploy, no terraform, no DB queries,
no <DOWNSTREAM_GATE_ID>.

Report:
- file updated
- next safe step
```

## Fill-in-the-blank request — failed attempt / containment record

```
Update <GATE_ID> with <INCIDENT_NAME> containment incident.

Record:
- <GATE_ID> first execution attempt failed.
- <WHAT FAILED AND WHY — exact error/policy reason>.
- <WHAT WAS CREATED ANYWAY, IF ANYTHING> was created anyway.
- <RESOURCE> is known-bad because <REASON>.
- <RESOURCE> was <CONTAINMENT ACTION TAKEN> as containment.
- <ANY SIDE EFFECT OF CONTAINMENT — e.g. "do not refresh X while Y is disabled">.
- Retry must <SPECIFIC FIX FOR NEXT ATTEMPT>.

Allowed:
- update checklist/note only
- git diff
- git status --short

Forbidden:
no Secret Manager payload, no password, no Cloud SQL change, no secret update,
no endpoint call, no deploy, no terraform, no DB queries,
no <DOWNSTREAM_GATE_ID>.

Report:
- file updated
- exact incident recorded
- next safe step
```

## Agent obligations while executing either form

1. Update the status header/badge at the top of `<TARGET_FILE>` (e.g. `**Status:**`) to match the actual outcome — don't leave a stale "Proposed"/"In progress" line sitting above a body that says "closed."
2. Add a new dated section rather than deleting or rewriting the document's prior history — Sprint 4's docs consistently preserved the original negative/blocked finding alongside the later positive one (see `HM-GCP-004X-3B`'s "Gate closure" section, added *after* its original 500/credential-mismatch finding, not replacing it).
3. Update the doc's own "Report template" and "Readiness classification" sections to reflect the new state — those are the parts most likely to go stale if only the narrative body is edited.
4. A containment record does **not** close the gate — it documents that the gate is still blocked, now for a more specific, better-understood reason. Only the successful-closure form marks a gate closed.
5. State explicitly, every time, that the downstream gate (e.g. the next `HM-GCP-004X-N`) remains separately blocked — closure of gate N is never itself authorization for gate N+1.

## Worked example — containment (from this session)

```
Update checklist with version 6 containment incident.

Record:
- HM-GCP-004B.1 Option A first execution attempt failed.
- Cloud SQL password reset failed because generated password did not satisfy Cloud SQL password policy.
- database-url version 6 was created anyway.
- version 6 is known-bad because its password was never applied to Cloud SQL user housemaster.
- version 6 was disabled as containment.
- Do not refresh Cloud Run while version 6 is disabled/known-bad.
- Retry must use policy-compliant password and hard-stop if Cloud SQL password reset fails
  before creating any secret version.

Allowed:
- update checklist/note only
- git diff
- git status --short

Forbidden:
no Secret Manager payload, no password, no Cloud SQL change, no secret update,
no endpoint call, no deploy, no terraform, no DB queries, no HM-GCP-004X-4.

Report:
- file updated
- exact incident recorded
- next safe step
```
