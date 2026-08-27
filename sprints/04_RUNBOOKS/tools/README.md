# Approval-Pack Tools — Hard-Rule Validator

**Status:** Built, manually tested, not wired into any automatic workflow
**Type:** Local CLI tool (Node.js, no dependencies)
**Date:** 2026-08-27
**Scope:** One tool — `validate-gate-request.mjs` — the first item from `sprints/04_RUNBOOKS/README.md` §4 "What should become executable later"

---

## What it does

Checks that a gate request's `Forbidden:` section contains every hard-rule line its template type requires, **before** anyone acts on the request. It does not check anything else about the request (it doesn't validate the `Allowed:` commands, the target file, or the report fields) — it only answers one question: *is the forbidden list complete for this gate type?*

This targets a real failure mode from this session, not a hypothetical one: a truncated approval message dropped two forbidden-list lines (`do not change Cloud SQL password`, `do not update database-url secret`) partway through the `HM-GCP-004X-1B` credential-remediation work. It was caught by hand, on inspection, before anything was executed — this tool exists so that check doesn't have to be done by eye every time.

## Usage

```
node validate-gate-request.mjs --template <template-id> <path-to-request.txt>
cat request.txt | node validate-gate-request.mjs --template <template-id>
```

Template ids (match the filenames in `sprints/04_RUNBOOKS/`, minus the `TEMPLATE_` prefix and gate-type suffix): `docs-only`, `execution`, `secret-execution`, `endpoint-iam-retest`, `commit`, `push`, `gate-closure`.

Exit code `0` = all required rules present. Exit code `1` = one or more missing (do not act on the request). Exit code `2` = usage/config error (unknown template, no template given, empty input).

## How it works

`hard-rules.json` defines, per template, a canonical set of hard rules as regex-alternative lists (to tolerate wording variance — "do not print password" vs "no password printing" both count). Rules for `docs-only`, `execution`, `commit`, `push`, and `gate-closure` share one core set (`shared_core_rules`), since those templates' forbidden lists are effectively the same shape in `sprints/04_RUNBOOKS/`. `secret-execution` and `endpoint-iam-retest` get their own, stricter rule sets, matching the extra hard rules those two templates define.

The script extracts the text between a line matching `Forbidden:` and the next line matching `Report:` (or end of input if there's no `Report:` line), and tests each rule's patterns against that extracted text only — not the whole message. **If no `Forbidden:` heading is found at all, every rule is reported missing** (fail closed, not open) — a request with no clearly labeled forbidden section should not be treated as compliant by omission.

## Tested against real examples

`examples/pass-secret-execution.txt` — the actual approved retry message from this session's `HM-GCP-004X-1B` credential fix (all 8 lines present):

```
node validate-gate-request.mjs --template secret-execution examples/pass-secret-execution.txt
→ Overall: PASS — all required hard rules present. (exit 0)
```

`examples/fail-secret-execution-dropped-lines.txt` — a reconstruction of the real truncated message from this session that was missing `no_print_password`, `no_print_database_url`, `no_access_secret_payload`, `no_endpoint_unless_approved`, and `no_deploy` (it only carried terraform/DB-queries/next-gate):

```
node validate-gate-request.mjs --template secret-execution examples/fail-secret-execution-dropped-lines.txt
→ Overall: FAIL — 5 of 8 rules missing (exit 1)
```

The tool correctly flags exactly the lines that were actually missing in the real incident, and correctly passes the three that were actually present — confirmed by running both fixtures above.

## Known limitations (not fixed in this task)

- Regex-based, not semantic — a forbidden list that rephrases a rule in genuinely novel wording could still slip past or false-positive. It's a net, not a guarantee.
- Doesn't validate the `Allowed:` list, target file, or report fields at all — forbidden-list completeness only.
- `hard-rules.json` is maintained by hand alongside the `TEMPLATE_*.md` files; nothing currently checks that the two stay in sync if a template's forbidden list is edited later.
- Not wired into any hook, chat interception, or CI step — it's a manual CLI you run against a request's text yourself.

## Non-goals (this task)

Did not: implement a hook or chat-interception mechanism, implement the template-fill helper or gate-ID numbering helper (the other two candidates from the README), touch any existing sprint doc or the roadmap, access any secret, run any infrastructure command, or wire this tool into any automatic workflow.
