# Template — Secret-Handling Execution Gate

**Maps to:** `HOUSEMASTER_GCP_GATE_AGENT_OPERATING_MODEL.md` §4 "Execution gate", §5, §6 "Secret handling"

**Use when:** the approved action touches Secret Manager, a Cloud SQL password, or `DATABASE_URL` — accessing secret metadata, resetting a password, adding a secret version, or using a secret value inside a script/connection. This template adds rules `TEMPLATE_EXECUTION_GATE.md` does not carry.

---

## Fill-in-the-blank request

```
Approved: <EXACT ACTION — e.g. "reset Cloud SQL password and create database-url version N">.

<Sequence, numbered, if more than one step:>
1. <step>
2. <step, including any hard-stop condition between steps>

Allowed:
- <secret-touching action, named precisely — e.g. "reset Cloud SQL password for user X">
- <metadata-only verification action — e.g. "list Secret Manager versions metadata only">
- <cleanup action — e.g. "create/delete secure local temp file">

Forbidden:
- do not print password
- do not print DATABASE_URL
- do not access existing secret payload (unless this gate's own goal is exactly that access — then say so explicitly and name the version)
- do not call /api/health/db (unless separately approved)
- do not deploy
- do not run terraform
- do not run DB queries/mutations
- do not proceed to <NEXT_GATE_ID>

Report:
- <primary result, yes/no — e.g. "password reset yes/no">
- <secondary result, yes/no — e.g. "version N created yes/no">
- temp file deleted yes/no
- secret/password/DATABASE_URL printed yes/no
- next required step
```

## Hard rules specific to this template (do not weaken)

1. **Use-not-print.** A secret value may be held in an in-process variable or environment variable for the duration of one script execution, and used to build a connection or CLI argument — it must never appear in anything the agent reads back as output: no `echo`, no unredirected `cat`, no error message that could contain it. Redirect command output that might echo an argument value; add a defensive redaction pass on any text before displaying it.
2. **Hard-stop on step failure.** If the sequence has an ordered dependency (e.g. "reset password, then create secret version from that same password"), a failure at an earlier step must abort the remaining steps — do not continue and produce a secret version built from a password that was never actually applied. (This is not hypothetical: the first `HM-GCP-004B.1` execution attempt in this session did exactly that — a policy-rejected password reset was followed anyway by a secret-version create, producing a known-bad version that then had to be disabled as containment. See `HM-GCP-004X-1B`'s "first execution attempt" section for the full incident record.)
3. **Metadata-only by default.** Any verification step (listing or describing a secret version) must request only name/state/create-time — never the payload — unless the gate's stated goal is explicitly to access the payload for immediate, contained use per rule 1.
4. **Generate compliant, then verify.** If the action generates a new credential, validate it meets the target system's policy (e.g. Cloud SQL requires lowercase + uppercase + digit + non-alphanumeric) *before* attempting to apply it — a rejected attempt is a wasted, loggable failure, not free.
5. **Containment over diagnosis.** If a bad secret version is ever created (by policy failure, wrong value, or any other cause), the immediate next action is to disable it, not to investigate why while it stays live and resolvable via `latest`.

## Worked example (from this session — the corrected, hard-stopping version)

```
Approved: execute HM-GCP-004B.1 Option A retry now.

Reset Cloud SQL password for user housemaster using a new policy-compliant local password.
If reset succeeds, create database-url Secret Manager version 7 with the same password and
correct Cloud SQL socket URL. If reset fails, stop immediately and do not create any secret version.

Do not print password. Do not print DATABASE_URL. Do not read existing secret payload.
Do not call endpoint. Do not deploy. Do not run terraform. Do not run DB queries.
Do not proceed to HM-GCP-004X-4.

Report: password reset yes/no; version 7 created yes/no; temp file deleted yes/no;
secret printed yes/no; next step.
```
