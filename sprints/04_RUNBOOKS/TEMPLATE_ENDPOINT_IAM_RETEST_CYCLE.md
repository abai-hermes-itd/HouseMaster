# Template — Endpoint / IAM Retest Cycle

**Maps to:** `HOUSEMASTER_GCP_GATE_AGENT_OPERATING_MODEL.md` §4 "Execution gate" (compound form), §5, §6

**Use when:** calling a Cloud Run endpoint that isn't publicly invokable requires a temporary IAM grant — this is the specific grant → call → rollback → verify shape used repeatedly in Sprint 4 for `/api/health/db`. Treat the whole cycle as one atomic unit of approval; never approve the grant without also approving its removal in the same request.

---

## Fill-in-the-blank request

```
Approved: run endpoint retest for <ENDPOINT_PATH> against live revision <REVISION_NAME>.

Sequence:
1. Temporarily grant roles/run.invoker to <PRINCIPAL> for Cloud Run service <SERVICE_NAME>.
2. Get identity token.
3. Call GET <FULL_URL><ENDPOINT_PATH>.
4. Capture response body and HTTP_STATUS.
5. Immediately remove temporary roles/run.invoker.
6. Verify IAM rollback.

Allowed:
- temporary Cloud Run invoker grant to <PRINCIPAL>
- identity-token curl to <ENDPOINT_PATH>
- immediate IAM rollback
- Cloud Run/IAM metadata verification

Forbidden:
- do not print password
- do not print DATABASE_URL
- do not access Secret Manager payload
- do not deploy
- do not run terraform
- do not run DB queries
- do not proceed to <NEXT_GATE_ID>

Report:
- endpoint response body
- HTTP_STATUS
- temporary invoker added yes/no
- temporary invoker removed yes/no
- IAM clean yes/no
- whether <GATE_ID> can close
```

## Hard rules specific to this template

1. **Rollback is not optional and not deferred.** Step 5 runs regardless of what step 3/4 returned — a `500` response is not a reason to leave the grant in place "in case another test is needed." Get separate approval for a second cycle instead.
2. **Verify, don't assume.** Step 6 (`get-iam-policy`) must actually run and its output must be read to confirm no `run.invoker` binding remains for `<PRINCIPAL>` — do not report "IAM clean: yes" from the removal command's own success message alone.
3. **A negative result is still a complete result.** A `500`/error response is a fully valid, reportable outcome of this cycle — it is not a failure of the *cycle* (which succeeded at producing a genuine signal); it may still mean the target gate stays blocked. Report it plainly rather than treating it as something to immediately re-run.
4. **One cycle, one report.** Do not chain automatically into "let's try again" or "let's now fix the cause" inside the same approval — those are separate gates (see `TEMPLATE_SECRET_EXECUTION_GATE.md` for a credential fix, or a fresh docs-only gate to record the finding).

## Worked example (from this session — the successful retest)

```
Approved: run endpoint retest for /api/health/db against live revision next-web-00010-wn4.

Sequence:
1. Temporarily grant roles/run.invoker to user markelus@abay-germes.kz for Cloud Run service next-web.
2. Get identity token.
3. Call GET https://next-web-bbqvhnfzta-ew.a.run.app/api/health/db.
4. Capture response body and HTTP_STATUS.
5. Immediately remove temporary roles/run.invoker.
6. Verify IAM rollback.

Allowed:
- temporary Cloud Run invoker grant to markelus@abay-germes.kz
- identity-token curl to /api/health/db
- immediate IAM rollback
- Cloud Run/IAM metadata verification

Forbidden:
- do not print password
- do not print DATABASE_URL
- do not access Secret Manager payload
- do not deploy
- do not run terraform
- do not run DB queries
- do not proceed to HM-GCP-004X-4

Report:
- endpoint response body
- HTTP_STATUS
- temporary invoker added yes/no
- temporary invoker removed yes/no
- IAM clean yes/no
- whether HM-GCP-004X-3B can close
```

Result that time: `{"status":"ok"}` / `200`, invoker added and removed, IAM verified clean, gate closed.
