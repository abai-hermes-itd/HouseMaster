# Approval-Pack Tools — Hard-Rule Validator, Template-Fill Helper & Gate-ID Helper

**Status:** Built, manually tested, not wired into any automatic workflow
**Type:** Local CLI tools (Node.js, no dependencies)
**Date:** 2026-08-27 (validator); 2026-08-28 (template-fill helper v0.1; gate-ID numbering helper v0.1)
**Scope:** Three tools from `sprints/04_RUNBOOKS/README.md` §4 "What should become executable later" — `validate-gate-request.mjs` (hard-rule validator), `fill-gate-template.mjs` (template-fill helper), and `suggest-gate-id.mjs` (gate-ID numbering helper)

---

## Tool 1: Hard-Rule Validator (`validate-gate-request.mjs`)

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

---

## Tool 2: Template-Fill Helper (`fill-gate-template.mjs`)

### What it does

Fills an existing `TEMPLATE_*.md` "Fill-in-the-blank request" block from CLI flags and prints the generated approval request to stdout. It reads the source template straight from `sprints/04_RUNBOOKS/`, substitutes only the placeholders it's told to fill, and leaves everything else — including the entire `Forbidden:` section and any placeholder tokens the `Forbidden:`/`Report:` sections still carry (e.g. `<ANYTHING ELSE THIS COMMIT SHOULD NOT TOUCH>`, `<NEXT_GATE_ID>`) — copied through verbatim from the source file.

It does **not** execute anything the generated request describes. Its only output is the filled request text, prefixed with a mandatory line stating that the output is a generated request still requiring explicit human approval before execution.

Supported templates (v0.1): `COMMIT_GATE` (source: `TEMPLATE_COMMIT_GATE.md`) and `PUSH_GATE` (source: `TEMPLATE_PUSH_GATE.md`).

### Usage

```
node fill-gate-template.mjs --template COMMIT_GATE --what "<description>" \
    --target <path> --commit-message "<message>"
node fill-gate-template.mjs --template PUSH_GATE --what "<description>"
```

`--what` fills the `<WHAT>` placeholder both templates share (e.g. "Stage and commit `<WHAT>` only." / "Push `<WHAT>` commit."). `COMMIT_GATE` additionally requires `--target` (fills `<TARGET_FILE>`, used in the `Target:` line and three times in the `Allowed:` git commands) and `--commit-message` (fills `<COMMIT_MESSAGE>`, used in the `Commit message:` line and the `git commit -m` command). `PUSH_GATE` needs neither `--target` nor `--commit-message` — its template has no placeholder for them, so passing them anyway is harmless (they're simply not substituted anywhere).

Exit code `0` = filled request printed to stdout. Exit code `2` = refused — nothing is printed to stdout, and the reason goes to stderr. Refusal conditions: unknown `--template` id, missing source template file on disk, or a required flag missing/empty for the selected template.

### How it works

`fill-rules.json` maps each supported template id to its source filename (relative to `sprints/04_RUNBOOKS/`), its required CLI flags, and a placeholder-token → flag-name substitution map. The script locates the `## Fill-in-the-blank request` heading in the source `.md` file, extracts the body of the fenced code block that follows it, and does a literal (non-regex) substring replace for each mapped placeholder token across that whole block — which is why `<TARGET_FILE>` gets filled consistently everywhere it appears in the `Allowed:` commands, not just in the `Target:` line. Only the placeholders named in `fill-rules.json` are ever touched; the `Forbidden:` section's own template-specific trailing placeholder (`<ANYTHING ELSE...>` / `<NEXT_GATE_ID>`) is deliberately left unfilled, matching the "preserve the Forbidden section" requirement for this tool.

### Tested against real examples

`examples/fill-commit-gate.txt` and `examples/fill-push-gate.txt` each record the exact command and its expected stdout. Both were generated by running the tool, then re-verified by re-running the same command and diffing the fresh output against the recorded fixture — both matched byte-for-byte:

```
node fill-gate-template.mjs --template COMMIT_GATE --what "the Template-fill helper v0.1 files" --target sprints/04_RUNBOOKS/tools/fill-gate-template.mjs --commit-message "tools(runbooks): add template-fill helper v0.1"
→ prints the filled COMMIT_GATE request, Forbidden section intact, disclaimer line present (exit 0)

node fill-gate-template.mjs --template PUSH_GATE --what "the template-fill helper v0.1"
→ prints the filled PUSH_GATE request, Forbidden section intact, disclaimer line present (exit 0)
```

Refusal paths were also exercised manually (not saved as fixtures, since they produce no stdout to record): an unknown `--template` value, a `COMMIT_GATE` call missing `--target`/`--commit-message`, and — via an isolated scratch copy of the script pointed at a nonexistent source filename — a missing source-template-file refusal. All three refused with exit code 2 and a clear stderr reason, no stdout.

### Known limitations (not fixed in this task)

- Only fills `<WHAT>` / `<TARGET_FILE>` / `<COMMIT_MESSAGE>` — the `Forbidden:` and `Report:` sections' own placeholders (e.g. `<ANYTHING ELSE THIS COMMIT SHOULD NOT TOUCH>`, `<NEXT_GATE_ID>`, `<ANY CONTENT-SPECIFIC CONFIRMATION...>`) are left as literal text for a human to fill by hand or reject.
- Only `COMMIT_GATE` and `PUSH_GATE` are supported; the other five templates (`docs-only`, `execution`, `secret-execution`, `endpoint-iam-retest`, `gate-closure`) are out of scope for v0.1.
- Placeholder substitution is a literal substring replace, not markdown-aware — it trusts that the source templates keep using the exact `<TOKEN>` spelling this tool's `fill-rules.json` expects.
- Not wired into any hook, chat interception, or CI step, and does not call `validate-gate-request.mjs` itself — running the filled output through the validator (or eyeballing it) is a separate, manual step.

---

## Tool 3: Gate-ID Numbering Helper (`suggest-gate-id.mjs`)

### What it does

Scans the sprint doc set (`sprints/01_ACTIVE/`, `sprints/02_COMPLETED/` by default) for filenames carrying a gate/checklist ID — the part before the first `_`, e.g. `HM-GCP-004X-3B` in `HM-GCP-004X-3B_APP_LEVEL_DB_HEALTH_CHECK_GATE.md` — and either lists every ID it finds, or, given `--prefix`, suggests the next numeric suffix for that ID family.

It **only suggests, and creates nothing**: it never writes, renames, or touches any file, and it never picks a final ID by itself — the suggested number is explicitly labeled as needing human confirmation, and assigning any letter/sub-level suffix (`A`/`B`/`.1`/etc.) is left to the human, not inferred.

### Usage

```
node suggest-gate-id.mjs --list [--dirs <dir1>,<dir2>,...]
node suggest-gate-id.mjs --prefix <ID_PREFIX> [--dirs <dir1>,<dir2>,...]
```

`--list` prints every distinct ID found (with its source file) across the scanned directories. `--prefix <ID_PREFIX>` filters to IDs starting with that prefix, reports the highest numeric suffix found among them, and suggests `max + 1`. `--dirs` overrides the default scan set (`sprints/01_ACTIVE,sprints/02_COMPLETED`) with a comma-separated list of repo-relative directories.

Exit code `0` = ran successfully — including the "no existing IDs matched this prefix" case, which is a valid outcome (new family), not an error. Exit code `2` = refused (neither `--list` nor `--prefix` given, or no scan directory could be read / no ID-pattern filenames found at all).

### How it works

The ID pattern is `^([A-Z]+(?:[-.][A-Z0-9]+)+)_` — a letter-led group followed by one or more `-` or `.` separated alphanumeric groups, ending at the first underscore. This was derived by reading the actual filenames in `sprints/01_ACTIVE/` and `sprints/02_COMPLETED/`, which mix dash-only IDs (`HM-GCP-004X-3B`, `HM-CI-001`) with dotted ones (`HM-GCP-003E.2-B`, `HM-GCP-003F.1`) — an earlier version of this pattern only allowed dashes and silently dropped every dotted ID from `02_COMPLETED` (5 of its 6 files); this was caught during self-testing before the tool was finalized. For `--prefix` mode, the suggested number is the last integer found anywhere in each matching ID's suffix, maxed across all matches, plus one.

### Tested against real examples

`examples/suggest-gate-id-list.txt` and `examples/suggest-gate-id-prefix.txt` record real output against this session's actual sprint doc set (18 IDs across `01_ACTIVE`/`02_COMPLETED` as of 2026-08-28): a full `--list` run, a `--prefix HM-GCP-004X` run (5 matches, suggests `-5`), and a `--prefix HM-GCP-005` run (no matches, "new family" guidance). All three were run and their real output captured directly into the fixtures.

### Known limitations (not fixed in this task)

- Detection is filename-pattern-based only — it doesn't read file contents, so an ID mentioned only inside a doc's body (not its filename) is invisible to it.
- The numeric suggestion doesn't preserve a family's separator convention — e.g. suggesting `HM-GCP-003F-4` for the dotted `HM-GCP-003F.1`/`.3B`/`.3D` family, when that family's own convention is a dot. The number is right; the punctuation still needs a human eye.
- Only scans `sprints/01_ACTIVE/` and `sprints/02_COMPLETED/` by default — `sprints/99_ARCHIVE/` and other directories are not included unless passed via `--dirs`.
- Not wired into any hook, chat interception, or CI step, and does not call the other two tools itself.

## Non-goals (this task)

Did not: implement a hook, chat-interception mechanism, or CI wiring for any of the three tools; touch any existing sprint doc, the roadmap, or `package.json`; access any secret, Cloud SQL, or Secret Manager payload; run terraform, Prisma, or any DB command; execute any of the generated approval requests; stage, commit, or push anything; or wire any tool into any automatic workflow, including `pnpm hm:gate`.
