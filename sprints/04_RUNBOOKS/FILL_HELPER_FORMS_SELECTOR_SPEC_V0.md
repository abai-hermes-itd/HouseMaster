# Fill-Helper `forms` Selector Mechanism Spec v0.1

**Status:** Proposed — specification only, not implemented
**Type:** Governance / tooling specification
**Date:** 2026-09-02
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Scope:** Specification only — no executable code (`fill-gate-template.mjs`, `fill-rules.json`, `validate-gate-request.mjs`, or any `TEMPLATE_*.md` file) is written or changed by this document

---

## 1. Purpose

`TEMPLATE_FILL_HELPER_SPEC_V0.md` §5.3 sketched a `forms` selector so `fill-gate-template.mjs` could fill `TEMPLATE_GATE_CLOSURE_RECORD.md`, the one template in the pack containing two distinct "Fill-in-the-blank request" blocks under two different headings, but left it as an open sketch. This document reads both forms' fill-in-the-blank blocks byte-for-byte and produces a build-ready design, following the same method `FILL_HELPER_LIST_PLACEHOLDERS_SPEC_V0.md` used for the three variable-list templates.

## 2. Non-goals (this task)

- **Not an implementation.** No change to `fill-gate-template.mjs`, `fill-rules.json`, `validate-gate-request.mjs`, or any `TEMPLATE_*.md` source file.
- **Does not touch any already-implemented entry** (`COMMIT_GATE`, `PUSH_GATE`, `ENDPOINT_IAM_RETEST`), `package.json`, or any hook/chat/CI wiring.
- **Does not access any secret, infra, or DB state.**
- **Does not add a third form or change either form's actual template text** in `TEMPLATE_GATE_CLOSURE_RECORD.md` — this spec fills the two forms as they exist today.

## 3. Key finding: the two forms are not the same shape with different fields — one has a real list, the other doesn't

Reading both blocks shows they need genuinely different mechanisms, not just different placeholder names:

**Successful closure** — its `Record:` section is a true variable-length list (`- <key fact 1 — e.g. live revision>` / `- <key fact 2 — ...>` / `- <key fact 3 — ...>`, i.e. the same "N examples standing in for an operator-chosen count" shape as `TEMPLATE_DOCS_ONLY_GATE.md`'s `Record:` list, covered by `FILL_HELPER_LIST_PLACEHOLDERS_SPEC_V0.md`) — **followed by** two fixed-shape trailing bullets that are not part of that list: `conclusion: <GATE_ID> closed / <WHAT IT PROVES>` and `<DOWNSTREAM_GATE_ID> remains separately blocked pending explicit approval`. Same fixed-suffix-after-variable-list pattern already documented for `EXECUTION_GATE`/`SECRET_EXECUTION_GATE`.

**Containment record** — its `Record:` section is **not a repeatable list at all**. It's seven fixed, individually-distinct sentences, each carrying its own placeholder(s):

```
- <GATE_ID> first execution attempt failed.
- <WHAT FAILED AND WHY — exact error/policy reason>.
- <WHAT WAS CREATED ANYWAY, IF ANYTHING> was created anyway.
- <RESOURCE> is known-bad because <REASON>.
- <RESOURCE> was <CONTAINMENT ACTION TAKEN> as containment.
- <ANY SIDE EFFECT OF CONTAINMENT — e.g. "do not refresh X while Y is disabled">.
- Retry must <SPECIFIC FIX FOR NEXT ATTEMPT>.
```

Two of these seven lines are conditionally applicable rather than always-true: "`<WHAT WAS CREATED ANYWAY, IF ANYTHING>` was created anyway" only makes sense if something actually was, and "`<ANY SIDE EFFECT OF CONTAINMENT...>`" only applies if the containment action has one — the template's own wording ("IF ANYTHING", "ANY side effect") already signals these are optional, not just variable. Treating this section as a `listPlaceholders` list (like `DOCS_ONLY_GATE`'s facts) would be wrong: the sentences aren't interchangeable repeated items, they're seven named, mostly-required, individually-optional-in-two-cases fields. This needs a third mechanism, distinct from both existing `placeholders` (always required) and the list-mechanism's `listPlaceholders` (N interchangeable items): **optional single lines**, specified in §5.3.

## 4. Key finding: the containment form has no `<TARGET_FILE>` token, but still needs a target file

The successful-closure form has an explicit `Target:\n<TARGET_FILE>` line the tool can fill and later hand to a Commit Gate. The containment form has **no such line anywhere in its fill-in-the-blank block** — the opening line is `Update <GATE_ID> with <INCIDENT_NAME> containment incident.`, with the file being edited left entirely implicit (in this session's real worked example, it's named only in the surrounding prose, not the template block). A `--target` CLI flag is still operationally necessary for whoever files the resulting Commit Gate, but it has **no placeholder to substitute in the rendered request text** for this form — the tool must not invent a `Target:` line the source template doesn't have. This spec's answer: `fill-gate-template.mjs` does not require or accept `--target` for the `containment` form at all (only for `success`); naming the file being updated stays the requester's job in a follow-up Commit Gate, exactly as it does today.

## 5. Proposed `fill-rules.json` schema: `forms`

```json
"GATE_CLOSURE_RECORD": {
  "sourceFile": "TEMPLATE_GATE_CLOSURE_RECORD.md",
  "requiredFlags": ["form"],
  "forms": {
    "success": { "...": "see 5.1" },
    "containment": { "...": "see 5.2" }
  }
}
```

`--form success|containment` is required for this template id specifically. An unrecognized or missing value refuses (exit 2) before any other flag is even checked — form selection gates which `requiredFlags`/`placeholders`/`listPlaceholders`/`optionalLines` apply.

### 5.1 `success` form

```json
"success": {
  "heading": "## Fill-in-the-blank request — successful closure",
  "requiredFlags": ["gate-id", "what-retested", "target", "what-it-proves", "downstream-gate-id"],
  "placeholders": {
    "<GATE_ID>": "gate-id",
    "<WHAT WAS RETESTED>": "what-retested",
    "<TARGET_FILE>": "target",
    "<WHAT IT PROVES>": "what-it-proves",
    "<DOWNSTREAM_GATE_ID>": "downstream-gate-id"
  },
  "listPlaceholders": {
    "fact": {
      "flag": "fact",
      "marker": "- <key fact 1 — e.g. live revision>\n- <key fact 2 — e.g. credential/version source>\n- <key fact 3 — e.g. response body / exit code>",
      "render": "bullet",
      "minItems": 1
    }
  }
}
```

`<GATE_ID>` appears twice in this form's block (opening line, `conclusion:` bullet) and is substituted both places by the existing whole-block literal-replace behavior — no new mechanism needed for repeated scalar tokens, matching how `<TARGET_FILE>` already repeats three times in `COMMIT_GATE` today.

Usage: `node fill-gate-template.mjs --template GATE_CLOSURE_RECORD --form success --gate-id HM-... --what-retested "..." --target sprints/... --what-it-proves "..." --downstream-gate-id HM-... --fact "..." --fact "..."`.

### 5.2 `containment` form

```json
"containment": {
  "heading": "## Fill-in-the-blank request — failed attempt / containment record",
  "requiredFlags": ["gate-id", "incident-name", "failure-reason", "resource", "resource-reason", "containment-action", "retry-fix", "downstream-gate-id"],
  "placeholders": {
    "<GATE_ID>": "gate-id",
    "<INCIDENT_NAME>": "incident-name",
    "<WHAT FAILED AND WHY — exact error/policy reason>": "failure-reason",
    "<RESOURCE>": "resource",
    "<REASON>": "resource-reason",
    "<CONTAINMENT ACTION TAKEN>": "containment-action",
    "<SPECIFIC FIX FOR NEXT ATTEMPT>": "retry-fix",
    "<DOWNSTREAM_GATE_ID>": "downstream-gate-id"
  },
  "optionalLines": {
    "created-anyway": {
      "flag": "created-anyway",
      "marker": "- <WHAT WAS CREATED ANYWAY, IF ANYTHING> was created anyway.",
      "template": "- <VALUE> was created anyway."
    },
    "side-effect": {
      "flag": "side-effect",
      "marker": "- <ANY SIDE EFFECT OF CONTAINMENT — e.g. \"do not refresh X while Y is disabled\">.",
      "template": "- <VALUE>."
    }
  }
}
```

No `--target` in `requiredFlags`, per §4. `<RESOURCE>` appears twice (the "known-bad because" bullet and the "was ... as containment" bullet) and is filled both places by the existing whole-block substitution, same as `<GATE_ID>` above. `optionalLines` entries behave as specified in §6 below — present and non-empty → the line is kept, with `<VALUE>` substituted; absent or empty → the entire marker line (including its trailing newline) is deleted from the rendered block.

## 6. Algorithm changes required (for a future implementation task)

Builds on §6 of `FILL_HELPER_LIST_PLACEHOLDERS_SPEC_V0.md` (list mechanism); this section covers what's additionally needed for `forms`/`optionalLines`.

1. **Heading-parameterized extraction.** `extractFillBlock(mdText, heading)` takes an explicit heading string to search for, instead of the hardcoded `"## Fill-in-the-blank request"`. Every other template passes its existing unqualified heading (no behavior change for them); `GATE_CLOSURE_RECORD` passes `forms.<selected>.heading`.
2. **`--form` dispatch, before any other flag is validated.** If `templateId === "GATE_CLOSURE_RECORD"`: read `--form`, refuse (exit 2) if missing or not one of `Object.keys(rule.forms)`; otherwise, treat `rule.forms[form]` as the effective rule object for every subsequent step (its own `requiredFlags`, `placeholders`, `listPlaceholders`, `optionalLines`, and `heading`) — the outer `GATE_CLOSURE_RECORD.requiredFlags` (`["form"]`) is checked first, separately, before this dispatch.
3. **Optional-line pass, after list-marker replacement, before scalar placeholder substitution.** For each `optionalLines` entry: if its `flag` was supplied and non-empty (same emptiness test already used for required flags: `args[f] === undefined || String(args[f]).trim() === ""`), replace the marker line with `template` with `<VALUE>` substituted by the flag's value; if not supplied or empty, delete the marker line (and its trailing `\n`) entirely from the block. Marker-not-found is a refusal (exit 2), same as a `listPlaceholders` marker miss — an `optionalLines` entry is optional in *whether it's filled*, never optional in *whether the source template still contains it*.
4. **Then scalar `placeholders` substitution, as today**, over the now-list-and-optional-line-processed block.
5. **Backward compatibility unchanged.** `COMMIT_GATE`, `PUSH_GATE`, `ENDPOINT_IAM_RETEST` have no `forms` key and skip step 2 entirely, calling `extractFillBlock` with the default heading exactly as today.

## 7. Integration with the hard-rule validator — no change required

`validate-gate-request.mjs` already has a `gate-closure` template id in `hard-rules.json` (`sprints/04_RUNBOOKS/tools/README.md` Tool 1), using the same `shared_core_rules` set as `docs-only`/`execution`/`commit`/`push`. Both forms of `TEMPLATE_GATE_CLOSURE_RECORD.md` carry an identical `Forbidden:` list (`no Secret Manager payload, no password, ...`), so one rule set already covers both forms correctly — nothing about adding `forms` to the fill tool requires touching the validator or `hard-rules.json`. Confirmed by inspection: `fill-gate-template.mjs`, by construction, only ever renders **one** form's block per invocation (the `heading`-scoped extraction in §6.1 means a `containment`-form output never contains the `success` form's `Forbidden:`/`Report:` text or vice versa) — so `validate-gate-request.mjs`'s existing `Forbidden:`-through-`Report:` extraction, run against either form's rendered output, sees exactly one well-formed section, the same shape it already handles for every other template today.

## 8. Worked-through examples (traced by hand against the real template text, not run)

**`success`**, filled with the actual `HM-GCP-004X-3B` closure facts already recorded in this repo's history (per `TEMPLATE_ENDPOINT_IAM_RETEST_CYCLE.md`'s own worked example) would render:

```
Record successful HM-GCP-004X-3B endpoint retest and close the gate.

Target:
sprints/01_ACTIVE/HM-GCP-004X-3B_APP_LEVEL_DB_HEALTH_CHECK_GATE.md

Record:
- live revision next-web-00010-wn4
- response body {"status":"ok"}, HTTP_STATUS 200
- IAM rollback verified clean
- conclusion: HM-GCP-004X-3B closed / DB connectivity and credentials confirmed working end-to-end
- HM-GCP-004X-4 remains separately blocked pending explicit approval

Allowed:
git status --short
update target file only
git diff

Forbidden:
no Secret Manager payload, no password, no Cloud SQL change, no secret update,
no endpoint call, no deploy, no terraform, no DB queries,
no HM-GCP-004X-4.

Report:
- file updated
- next safe step
```

**`containment`**, filled with the real `version 6` containment facts already in `TEMPLATE_GATE_CLOSURE_RECORD.md`'s own worked example, with `--side-effect` supplied and `--created-anyway` supplied:

```
Update HM-GCP-004B.1 with version-6-password-policy-rejection containment incident.

Record:
- HM-GCP-004B.1 first execution attempt failed.
- Cloud SQL password reset failed because generated password did not satisfy Cloud SQL password policy.
- database-url version 6 was created anyway.
- database-url version 6 is known-bad because its password was never applied to Cloud SQL user housemaster.
- database-url version 6 was disabled as containment.
- do not refresh Cloud Run while version 6 is disabled/known-bad.
- Retry must use a policy-compliant password and hard-stop if Cloud SQL password reset fails before creating any secret version.

Allowed:
- update checklist/note only
- git diff
- git status --short

Forbidden:
no Secret Manager payload, no password, no Cloud SQL change, no secret update,
no endpoint call, no deploy, no terraform, no DB queries,
no HM-GCP-004X-4.

Report:
- file updated
- exact incident recorded
- next safe step
```

**Same `containment` example with `--side-effect` and `--created-anyway` omitted** would render identically except those two `Record:` bullets are absent entirely — no blank line, no leftover placeholder text, the list simply has five lines instead of seven.

## 9. Failure modes / fail-closed behavior

| Condition | Result |
|---|---|
| `--form` omitted or not `success`/`containment` | Refuse, exit 2, before any other flag is checked |
| A form's own `requiredFlags` entry missing/empty | Refuse, exit 2 — same message shape as today's `COMMIT_GATE` refusal |
| A `listPlaceholders`/`optionalLines` marker not found in the source `.md` (template text drifted from `fill-rules.json`) | Refuse, exit 2 — fail closed, never render a partially-matched block |
| `success` form's `fact` list under `minItems: 1` | Refuse, exit 2 |
| `containment` form's `created-anyway`/`side-effect` flag omitted or empty | **Not a refusal** — the corresponding line is silently, cleanly omitted from the rendered `Record:` list (these two are the only genuinely optional inputs anywhere in this design) |
| `--target` passed for the `containment` form | Accepted but unused/ignored — no placeholder exists for it in that form, matching how `fill-gate-template.mjs` already ignores flags a template doesn't map (`tools/README.md` Tool 2: "passing them anyway is harmless") |

## 10. Non-goals (recap, restated for emphasis)

- No implementation of §5–§6 in this task.
- No change to either form's actual template text in `TEMPLATE_GATE_CLOSURE_RECORD.md`.
- No new `gate-runner.mjs` mode (a `closeout-draft` composite mode remains explicitly deferred per `GATE_RUNNER_SPEC_V0.md` §4.6, unresolved by this document — this spec only unblocks that mode's prerequisite, it doesn't build the mode itself).
- No sanitization/escaping of operator-supplied values beyond what `FILL_HELPER_LIST_PLACEHOLDERS_SPEC_V0.md` §8 already flagged as a future hardening item — same trust model, unresolved here.
- No hook, chat-interception, CI, or `package.json` wiring.

## 11. Future implementation slice

This is a larger single slice than `ENDPOINT_IAM_RETEST` (§5.1 of `TEMPLATE_FILL_HELPER_SPEC_V0.md`, a `fill-rules.json`-only change) but comparable in size to the `listPlaceholders` mechanism already spec'd: three new mechanisms (`heading`-parameterized extraction, `--form` dispatch, `optionalLines`) plus one reused one (`listPlaceholders`, for the `success` form's `fact` list only — `containment` needs no `listPlaceholders` at all, per §3). Recommended as one implementation task, not split further, since `--form` dispatch has no independent value without at least one working form behind it. Smoke-test plan for that future task: render both forms with fake values (mirroring `ENDPOINT_IAM_RETEST`'s `MSYS_NO_PATHCONV=1` fake-value smoke test), including one run of `containment` with both optional flags omitted and one with both supplied, then validate each rendered output through `validate-gate-request.mjs --template gate-closure` — no validator change anticipated, per §7, but confirming that in practice is implementation-time verification, not resolved by this spec.

## 12. Readiness classification

Specification only. Not implemented. This document does not authorize modifying `fill-gate-template.mjs`, `fill-rules.json`, `validate-gate-request.mjs`, or any `TEMPLATE_*.md` file — a future implementation task requires its own separate, explicit approval gate, consistent with how `ENDPOINT_IAM_RETEST` (spec → separate implementation gate → commit `30bdd6a`) and the `listPlaceholders` mechanism (spec only, `19be31b`, implementation still pending) were both treated.
