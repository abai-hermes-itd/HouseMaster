# Template-Fill Helper Spec v0.1 — Remaining Five Templates

**Status:** Proposed — specification only, not implemented
**Type:** Governance / tooling specification
**Date:** 2026-09-02
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Scope:** Specification only — no executable code (`fill-gate-template.mjs`, `fill-rules.json`, or any other file under `sprints/04_RUNBOOKS/tools/`) is written or changed by this document

---

## 1. Purpose

`fill-gate-template.mjs` (Tool 2 of the approval-pack, see `sprints/04_RUNBOOKS/tools/README.md`) currently fills only two of the pack's seven templates — `COMMIT_GATE` and `PUSH_GATE`. Both its own "Known limitations" section and `GATE_RUNNER_SPEC_V0.md` §6 name the same gap: the remaining five templates (`TEMPLATE_DOCS_ONLY_GATE.md`, `TEMPLATE_EXECUTION_GATE.md`, `TEMPLATE_SECRET_EXECUTION_GATE.md`, `TEMPLATE_ENDPOINT_IAM_RETEST_CYCLE.md`, `TEMPLATE_GATE_CLOSURE_RECORD.md`) are out of scope for v0.1 and were left as a candidate for later, separately-approved work.

This document specifies how that gap would be closed. It exists so a future implementation task has a settled design to build from, rather than improvising placeholder handling per template. It does not close the gap itself.

## 2. Non-goals (this task)

- **Not an implementation.** No change to `fill-gate-template.mjs`, `fill-rules.json`, any `TEMPLATE_*.md` file, or any other file in the repo. This document is new; nothing else is touched.
- **Does not run anything.** No `node` invocation of any tool, no git command beyond what the operator prompt itself already required (`git status --short`, `git log`, HEAD/origin check) for situational awareness before writing this spec.
- **Does not access secrets, infra, or the DB.** Nothing in this spec requires or describes accessing Secret Manager, Cloud SQL, or running `gcloud`/`terraform`/`prisma` — it only describes how *text substitution* into existing markdown templates would be extended.
- **Does not weaken any hard rule.** Every `Forbidden:` section in every template stays exactly as strict as today; this spec explicitly keeps that section untouched by the fill tool, matching the existing tool's behavior for `COMMIT_GATE`/`PUSH_GATE`.
- **Does not wire anything into `gate-runner.mjs`, a hook, chat interception, CI, or `package.json`.** If built, an extended `fill-gate-template.mjs` would still be invoked directly as a node script, the same way it is today. Adding composite `gate-runner.mjs` modes for these five templates (mirroring `draft-commit-gate`/`draft-push-gate`) is a separate, later, separately-approved task — this spec only covers the fill tool itself.

## 3. Current state (recap)

| Template | Fillable today? |
|---|---|
| `TEMPLATE_COMMIT_GATE.md` | Yes (v0.1) |
| `TEMPLATE_PUSH_GATE.md` | Yes (v0.1) |
| `TEMPLATE_DOCS_ONLY_GATE.md` | No |
| `TEMPLATE_EXECUTION_GATE.md` | No |
| `TEMPLATE_SECRET_EXECUTION_GATE.md` | No |
| `TEMPLATE_ENDPOINT_IAM_RETEST_CYCLE.md` | No |
| `TEMPLATE_GATE_CLOSURE_RECORD.md` | No |

The existing tool's substitution model is a literal, non-regex, whole-block substring replace: one placeholder token (e.g. `<TARGET_FILE>`) maps to one CLI flag, and the token is replaced everywhere it appears in the "Fill-in-the-blank request" fenced block. `COMMIT_GATE` and `PUSH_GATE` fit this model cleanly because every placeholder in both templates occurs exactly once conceptually (even when `<TARGET_FILE>` repeats textually, it's always the same value). The five remaining templates break that assumption in two distinct ways described in §4.

## 4. Why the remaining five templates aren't a drop-in extension

### 4.1 Variable-length list placeholders

`TEMPLATE_DOCS_ONLY_GATE.md`'s `Record:` section is `<FACT 1>` / `<FACT 2>` / `<FACT N>` — an operator-chosen number of bullets, not a fixed set of named tokens. `TEMPLATE_EXECUTION_GATE.md`'s `Allowed:` section is `<EXACT_COMMAND_1>` / `<EXACT_COMMAND_2>` (and the worked example shows six). `TEMPLATE_SECRET_EXECUTION_GATE.md` has both a numbered `<step>` sequence and an `Allowed:`/`Report:` bullet list of unspecified length. A one-token-to-one-flag map (today's model) cannot represent "however many facts/commands/steps the operator has."

### 4.2 Multiple template forms in one file

`TEMPLATE_GATE_CLOSURE_RECORD.md` contains **two** separate "Fill-in-the-blank request" fenced blocks under two different headings ("successful closure" and "failed attempt / containment record") — genuinely different shapes (different field names, different narrative), not two instances of the same fields. Today's `extractFillBlock()` finds the *first* `## Fill-in-the-blank request` heading only; it has no concept of selecting between forms.

`TEMPLATE_ENDPOINT_IAM_RETEST_CYCLE.md` does **not** have this problem — its six placeholders (`<ENDPOINT_PATH>`, `<REVISION_NAME>`, `<PRINCIPAL>`, `<SERVICE_NAME>`, `<FULL_URL>`, `<GATE_ID>`) are each fixed-count and fixed-name, and its `Sequence:`/`Allowed:`/`Report:` sections are fixed-shape in the template itself (the six numbered steps don't vary; only the placeholder values inside them do). It fits today's one-token-to-one-flag model directly and needs no new mechanism — it's listed here as the one template of the five that's a straightforward extension under the *existing* substitution model.

## 5. Proposed design

### 5.1 Fixed-placeholder templates: extend the existing model as-is

`TEMPLATE_ENDPOINT_IAM_RETEST_CYCLE.md` would be added to `fill-rules.json` exactly like `COMMIT_GATE`/`PUSH_GATE` are today:

```json
"ENDPOINT_IAM_RETEST": {
  "sourceFile": "TEMPLATE_ENDPOINT_IAM_RETEST_CYCLE.md",
  "requiredFlags": ["endpoint-path", "revision-name", "principal", "service-name", "full-url", "gate-id"],
  "placeholders": {
    "<ENDPOINT_PATH>": "endpoint-path",
    "<REVISION_NAME>": "revision-name",
    "<PRINCIPAL>": "principal",
    "<SERVICE_NAME>": "service-name",
    "<FULL_URL>": "full-url",
    "<GATE_ID>": "gate-id"
  }
}
```

No change to `fill-gate-template.mjs`'s substitution logic is needed for this one template — only a `fill-rules.json` entry. `<NEXT_GATE_ID>` in its `Forbidden:` section stays unfilled, matching how `<ANYTHING ELSE THIS COMMIT SHOULD NOT TOUCH>` and `<NEXT_GATE_ID>` are deliberately left untouched for `COMMIT_GATE`/`PUSH_GATE` today.

### 5.2 Variable-length lists: a new repeatable-flag mechanism

For `DOCS_ONLY_GATE`, `EXECUTION_GATE`, and `SECRET_EXECUTION_GATE`, the spec proposes a new `fill-rules.json` field, `listPlaceholders`, alongside the existing `placeholders` map:

```json
"DOCS_ONLY_GATE": {
  "sourceFile": "TEMPLATE_DOCS_ONLY_GATE.md",
  "requiredFlags": ["what", "target"],
  "placeholders": {
    "<WHAT>": "what",
    "<TARGET_FILE>": "target"
  },
  "listPlaceholders": {
    "fact": { "marker": "- <FACT 1>\n- <FACT 2>\n- <FACT N>", "minItems": 1 }
  }
}
```

CLI usage would repeat the flag once per item, in order: `--fact "live revision next-web-00009-jzn" --fact "no DATABASE_URL was printed" --fact "IAM rollback is clean"`. The tool would render each list as `- <item>` lines joined by newlines and replace the *entire multi-line marker block* (not a single token) with the rendered list — this is why `listPlaceholders` needs a literal marker string (the exact `- <FACT 1>\n- <FACT 2>\n- <FACT N>` run of lines) rather than one token, since there's no single `<FACTS>` placeholder in the source template to target. `minItems: 1` enforces that at least one `--fact` was given (an empty `Record:` section is refused, same failure-closed posture as a missing `--target`).

The same mechanism covers `EXECUTION_GATE`'s `--command` (repeatable, replacing the `<EXACT_COMMAND_1>`/`<EXACT_COMMAND_2>` marker lines, rendered as bare lines not `- ` bullets, matching the template's own unbulleted `Allowed:` format) and `SECRET_EXECUTION_GATE`'s `--step` (repeatable, rendered as `1. `/`2. `/… numbered lines replacing the `1. <step>` / `2. <step, ...>` marker) plus `--allowed`/`--report-field` for its bulleted `Allowed:`/`Report:` sections.

### 5.3 Multi-form templates: an explicit `--form` selector

For `TEMPLATE_GATE_CLOSURE_RECORD.md`, the spec proposes a `forms` map in place of a single `sourceFile`/`placeholders` pair, keyed by a new required `--form` flag:

```json
"GATE_CLOSURE_RECORD": {
  "sourceFile": "TEMPLATE_GATE_CLOSURE_RECORD.md",
  "requiredFlags": ["form"],
  "forms": {
    "success": {
      "heading": "## Fill-in-the-blank request — successful closure",
      "requiredFlags": ["gate-id", "what-retested", "target", "downstream-gate-id"],
      "placeholders": { "...": "..." },
      "listPlaceholders": { "fact": { "...": "..." } }
    },
    "containment": {
      "heading": "## Fill-in-the-blank request — failed attempt / containment record",
      "requiredFlags": ["gate-id", "incident-name", "downstream-gate-id"],
      "placeholders": { "...": "..." }
    }
  }
}
```

This requires `extractFillBlock()` to accept a specific heading string to search for (defaulting to the current unqualified `## Fill-in-the-blank request` for every other template, so this change is additive and does not alter behavior for `COMMIT_GATE`/`PUSH_GATE`/`ENDPOINT_IAM_RETEST`), and `--form success|containment` to be a required flag specifically for this template id, refused (exit 2) if omitted or unrecognized — mirroring how a missing `--target`/`--commit-message` is refused for `COMMIT_GATE` today.

### 5.4 Backward compatibility

None of the above changes the behavior, flags, output, or `fill-rules.json` entries for `COMMIT_GATE` or `PUSH_GATE`. `listPlaceholders` and `forms` are additive, optional keys — a template entry that doesn't define them (as `COMMIT_GATE`/`PUSH_GATE`/`ENDPOINT_IAM_RETEST` would not) is processed exactly as `fill-gate-template.mjs` processes templates today.

## 6. Cross-cutting rules (apply to every extended template, no exceptions)

- **Forbidden section stays untouched.** Exactly as today: every `Forbidden:` section, including its own trailing placeholder (`<NEXT_GATE_ID>`, `<DOWNSTREAM_GATE_ID>`, `<ANYTHING ELSE...>`), is copied through verbatim. No template extension in this spec fills, removes, or reduces a `Forbidden:` line.
- **Still generates text only.** An extended tool prints a filled request to stdout and does nothing else — no template gains a mode that executes, stages, commits, or pushes anything, including `ENDPOINT_IAM_RETEST`'s IAM grant/rollback sequence or `SECRET_EXECUTION_GATE`'s password-reset sequence: filling those templates produces the *request text describing* those actions, never the actions themselves.
- **Disclaimer line unchanged.** Every extended template's output keeps the existing mandatory line: "This is a generated approval request. It must still be explicitly approved by the user before execution."
- **Fail closed on missing input.** A missing required flag (fixed or repeatable), an unrecognized `--form` value, or a `listPlaceholders` marker not found in the source file all refuse with exit code 2 and nothing on stdout — same posture as today's refusal paths.
- **No new template invents new policy.** Every hard-rule line these five templates carry already exists in the `.md` source files today; this spec adds no new `Forbidden:`/hard-rule content anywhere.

## 7. Out of scope for v0.1 of this extension (candidates for later, separately-approved work)

- Actual implementation of any of §5 — this document is specification only.
- Updating `validate-gate-request.mjs`'s `hard-rules.json` to cover new edge cases the extension might surface (it already covers all seven templates' hard-rule sets independently of whether they're fillable — no change needed there for this extension to work, but confirming that in practice is implementation-time work, not this spec).
- New `gate-runner.mjs` composite modes (`draft-docs-only-gate`, `draft-execution-gate`, `draft-secret-execution-gate`, `draft-endpoint-iam-retest`, `draft-gate-closure`) analogous to `draft-commit-gate`/`draft-push-gate` — `GATE_RUNNER_SPEC_V0.md` would need its own follow-up revision for these once the underlying `fill-gate-template.mjs` support exists.
- Any hook, chat-interception, CI, or `package.json` wiring.
- Choosing exact final CLI flag names/casing if they differ from what's sketched in §5 — the sketches here fix the *mechanism* (repeatable flags for lists, a `--form` selector for multi-block templates, marker-block replacement vs. token replacement), not necessarily every literal flag spelling.

## 8. Readiness classification

Specification only. Not implemented. This document does not authorize modifying `fill-gate-template.mjs`, `fill-rules.json`, any `TEMPLATE_*.md` file, or `gate-runner.mjs` — a future implementation task requires its own separate, explicit approval gate, consistent with how `GATE_RUNNER_SPEC_V0.md` itself was treated before `gate-runner.mjs` was built.
