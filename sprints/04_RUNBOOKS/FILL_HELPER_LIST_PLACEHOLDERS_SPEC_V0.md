# Fill-Helper `listPlaceholders` Mechanism Spec v0.1

**Status:** Proposed — specification only, not implemented
**Type:** Governance / tooling specification
**Date:** 2026-09-02
**Branch:** `feat/hm-gcp-003d-cloud-sql-import`
**Scope:** Specification only — no executable code (`fill-gate-template.mjs`, `fill-rules.json`, or any `TEMPLATE_*.md` file) is written or changed by this document

---

## 1. Purpose

`TEMPLATE_FILL_HELPER_SPEC_V0.md` §5.2 sketched a new `listPlaceholders` mechanism to let `fill-gate-template.mjs` fill the variable-length list sections of `TEMPLATE_DOCS_ONLY_GATE.md`, `TEMPLATE_EXECUTION_GATE.md`, and `TEMPLATE_SECRET_EXECUTION_GATE.md`, but left the exact algorithm, `fill-rules.json` schema, and per-template edge cases as a sketch, not a build-ready design. This document works that sketch through to a concrete, implementable design, by reading each of the three templates' actual fill-in-the-blank block byte-for-byte and identifying exactly which lines are genuinely variable vs. fixed boilerplate that must be preserved untouched.

`TEMPLATE_ENDPOINT_IAM_RETEST_CYCLE.md` (fixed-placeholder, no lists) is already covered by the plain `placeholders` mechanism — see `30bdd6a`/`f0d2e2f`, the implemented `ENDPOINT_IAM_RETEST` entry. `TEMPLATE_GATE_CLOSURE_RECORD.md` (two template forms, `forms` selector) is out of scope here — it belongs to `TEMPLATE_FILL_HELPER_SPEC_V0.md` §5.3, a separate future document, and is only referenced below where a design choice here would affect it.

## 2. Non-goals (this task)

- **Not an implementation.** No change to `fill-gate-template.mjs`, `fill-rules.json`, or any `TEMPLATE_*.md` source file.
- **Does not touch `TEMPLATE_ENDPOINT_IAM_RETEST_CYCLE.md`'s already-implemented entry, `package.json`, or any hook/chat/CI wiring.**
- **Does not access any secret, infra, or DB state.** This document only analyzes existing markdown template text already in the repo.
- **Does not resolve `TEMPLATE_GATE_CLOSURE_RECORD.md`'s `forms` design** — noted only where relevant, left to its own spec.

## 3. Key finding: not every list-shaped section is fully variable

Reading the three templates' actual fill-in-the-blank blocks (not just their conceptual shape) shows each list-shaped section splits into a **variable prefix** (the part an operator actually fills, different every time) and, in two of the three templates, a **fixed suffix** of boilerplate lines that must stay exactly as written — the same "preserve what shouldn't vary" principle `fill-gate-template.mjs` already applies to the `Forbidden:` section today, just inside an `Allowed:`/`Report:` section this time.

| Template | Section | Variable part | Fixed part (must stay literal) |
|---|---|---|---|
| `TEMPLATE_DOCS_ONLY_GATE.md` | `Record:` | `- <FACT 1>` / `- <FACT 2>` / `- <FACT N>` (whole list) | — none, `Allowed:` here has no placeholders at all |
| `TEMPLATE_EXECUTION_GATE.md` | `Allowed:` | `<EXACT_COMMAND_1>` / `<EXACT_COMMAND_2>` | `git status --short` (trailing line, always present) |
| `TEMPLATE_SECRET_EXECUTION_GATE.md` | `Allowed:` | 3 example bullets (`<secret-touching action...>` etc.) | — none, all 3 shown bullets are themselves examples of a variable list |
| `TEMPLATE_SECRET_EXECUTION_GATE.md` | `Report:` | first 2 bullets (`<primary result...>`, `<secondary result...>`) | `temp file deleted yes/no` / `secret/password/DATABASE_URL printed yes/no` / `next required step` (3 trailing fixed lines, always present) |

This means the mechanism cannot simply "replace everything between `Allowed:` and the next blank line/heading" — it must target the exact variable sub-span within a section, by literal marker text, and leave any fixed lines around it untouched. §5 gives the precise markers.

## 4. Key finding: `TEMPLATE_SECRET_EXECUTION_GATE.md`'s numbered sequence doesn't fit a rigid list mechanism

The template's own instructional line — `<Sequence, numbered, if more than one step:>` followed by `1. <step>` / `2. <step, including any hard-stop condition between steps>` — describes a numbered list. But this session's own worked, actually-used example for this template (`TEMPLATE_SECRET_EXECUTION_GATE.md`'s "Worked example" section, and the real `HM-GCP-004B.1` retry request it's drawn from) does **not** use a numbered list at all — it uses two ordinary prose sentences ("Reset Cloud SQL password... If reset succeeds, create database-url Secret Manager version 7...").

Forcing a `--step` repeatable flag onto this section would only fit the minority case (an operator who actually wants a numbered list) and would misrepresent the majority real-world case (prose with an embedded conditional). This spec's recommendation: **do not build a list mechanism for the `Sequence`/numbered-step portion of `TEMPLATE_SECRET_EXECUTION_GATE.md` in this pass.** Leave the `<Sequence, numbered, if more than one step:>` block as free text a human writes directly into the generated request (the same way `<ANYTHING ELSE THIS COMMIT SHOULD NOT TOUCH>` is left for `COMMIT_GATE` today) — i.e., `fill-gate-template.mjs` fills `<EXACT ACTION>` (single-token, already fits today's model) plus the `Allowed:`/`Report:` list sections (§5.3), and prints the sequence portion through unfilled for the operator to hand-edit, exactly as it appears in the source template. This is a narrower scope than `TEMPLATE_FILL_HELPER_SPEC_V0.md` §5.2 implied, and is called out here explicitly rather than silently dropped.

## 5. Proposed `fill-rules.json` schema: `listPlaceholders`

```json
"listPlaceholders": {
  "<name>": {
    "flag": "<repeatable CLI flag name>",
    "marker": "<exact literal text to find and replace, newline-joined>",
    "render": "bullet | plain | numbered",
    "minItems": <integer, usually 1>
  }
}
```

- `marker` is matched as a literal substring (same non-regex philosophy as the existing `placeholders` map) against the extracted fill-block text — **not** a single token, since these sections have no single `<TOKEN>` standing in for "the whole list" in the source `.md` files.
- `render` controls how the repeated flag's values become lines: `bullet` → `- <item>` per line; `plain` → bare `<item>` per line (no prefix); `numbered` → `1. <item>`, `2. <item>`, … per line, 1-indexed in the order flags were given.
- `minItems` is enforced before rendering; fewer values than `minItems` refuses (exit 2), matching how a missing required scalar flag refuses today.
- Items are rendered strictly in the CLI order they were passed — no sorting, no deduplication. A repeated identical value is kept as-is (an operator's mistake to catch on review, not the tool's to silently fix).

### 5.1 `DOCS_ONLY_GATE`

```json
"DOCS_ONLY_GATE": {
  "sourceFile": "TEMPLATE_DOCS_ONLY_GATE.md",
  "requiredFlags": ["what", "target"],
  "placeholders": {
    "<WHAT>": "what",
    "<TARGET_FILE>": "target"
  },
  "listPlaceholders": {
    "fact": {
      "flag": "fact",
      "marker": "- <FACT 1>\n- <FACT 2>\n- <FACT N>",
      "render": "bullet",
      "minItems": 1
    }
  }
}
```

Usage: `node fill-gate-template.mjs --template DOCS_ONLY_GATE --what "..." --target sprints/... --fact "..." --fact "..." --fact "..."`. The `Allowed:` section (`update target file only` / `git status --short` / `git diff`) has no placeholders and needs no entry — it's copied through unchanged today already, no new mechanism required for it.

### 5.2 `EXECUTION_GATE`

```json
"EXECUTION_GATE": {
  "sourceFile": "TEMPLATE_EXECUTION_GATE.md",
  "requiredFlags": ["what", "goal"],
  "placeholders": {
    "<WHAT THIS CHECKS/DOES>": "what",
    "<ONE SENTENCE — what this confirms or produces>": "goal"
  },
  "listPlaceholders": {
    "command": {
      "flag": "command",
      "marker": "<EXACT_COMMAND_1>\n<EXACT_COMMAND_2>",
      "render": "plain",
      "minItems": 1
    }
  }
}
```

Usage: `--command "gcloud run services describe ..." --command "gcloud sql instances describe ..."`. The marker deliberately excludes the template's trailing `git status --short` line — that fixed line stays in the rendered output below whatever commands `--command` supplies, unconditionally, on every fill (an execution gate always ends with a status check; this spec does not make that optional). Note this template's `<WHAT THIS CHECKS/DOES>` and `<ONE SENTENCE...>` scalar placeholders are long descriptive strings rather than short tokens like `<WHAT>` — they're included here as-is from the source file so a future implementer doesn't have to re-derive them; an implementation task may reasonably rename them to shorter internal keys as long as the substitution still targets the exact source-file text.

### 5.3 `SECRET_EXECUTION_GATE`

```json
"SECRET_EXECUTION_GATE": {
  "sourceFile": "TEMPLATE_SECRET_EXECUTION_GATE.md",
  "requiredFlags": ["action"],
  "placeholders": {
    "<EXACT ACTION — e.g. \"reset Cloud SQL password and create database-url version N\">": "action"
  },
  "listPlaceholders": {
    "allowed": {
      "flag": "allowed",
      "marker": "- <secret-touching action, named precisely — e.g. \"reset Cloud SQL password for user X\">\n- <metadata-only verification action — e.g. \"list Secret Manager versions metadata only\">\n- <cleanup action — e.g. \"create/delete secure local temp file\">",
      "render": "bullet",
      "minItems": 1
    },
    "report-field": {
      "flag": "report-field",
      "marker": "- <primary result, yes/no — e.g. \"password reset yes/no\">\n- <secondary result, yes/no — e.g. \"version N created yes/no\">",
      "render": "bullet",
      "minItems": 1
    }
  }
}
```

Per §4, no `listPlaceholders` entry is defined for the `Sequence:` numbered-step portion — it is left unfilled, matching `<ANYTHING ELSE THIS COMMIT SHOULD NOT TOUCH>`'s precedent. `report-field`'s marker deliberately covers only the first two example bullets — `temp file deleted yes/no`, `secret/password/DATABASE_URL printed yes/no`, and `next required step` stay fixed and always present in the rendered `Report:` section, unconditionally, on every fill (this template's report must always ask whether a secret/password/DATABASE_URL was printed; that line is not optional and this mechanism must never let a caller omit it).

## 6. Algorithm changes required in `fill-gate-template.mjs` (for a future implementation task)

1. **`parseArgs` must collect repeated flags into arrays.** Today's parser overwrites `args[key]` on each occurrence (last value wins). A list-aware parser needs to know which flag names are declared as `listPlaceholders` flags for the selected template (read `fill-rules.json` before parsing, or post-process) and accumulate those into an ordered array instead of overwriting.
2. **Marker lookup happens before scalar placeholder substitution.** For each `listPlaceholders` entry, search the extracted fill-block text for the literal `marker` string. Not found → refuse, exit 2, `Refused: could not locate the "<name>" list marker in <sourceFile> — template text may have drifted from fill-rules.json.` (mirrors the existing "could not locate a Fill-in-the-blank request code block" refusal shape).
3. **`minItems` enforcement.** Fewer than `minItems` values supplied for a given flag (including zero, i.e. the flag never passed) → refuse, exit 2, `Refused: --<flag> requires at least <minItems> value(s) for <templateId>.`
4. **Render and replace.** Build the joined multi-line string per `render` mode, then do one literal substring replace of the exact `marker` text with the rendered string — same literal, non-regex, whole-block replace style the existing scalar `placeholders` loop already uses.
5. **Then apply scalar `placeholders` substitution as today**, unchanged, over the now-list-filled block.
6. **Backward compatibility.** A template entry with no `listPlaceholders` key (i.e. `COMMIT_GATE`, `PUSH_GATE`, `ENDPOINT_IAM_RETEST` as they exist today) skips steps 2–4 entirely and behaves exactly as `fill-gate-template.mjs` behaves right now — this is additive, not a rewrite of the existing code path.

## 7. Cross-cutting rules (restated, unchanged from `TEMPLATE_FILL_HELPER_SPEC_V0.md` §6)

- `Forbidden:` sections stay untouched in every template, including the ones gaining list support.
- The tool still only ever prints generated request text to stdout — it executes nothing a filled `EXECUTION_GATE` or `SECRET_EXECUTION_GATE` request describes.
- The mandatory disclaimer line is unchanged.
- Fail closed: a missing marker, an unmet `minItems`, or a missing required scalar flag all refuse with exit 2 and no stdout — never a partially-filled request printed as if complete.
- No new hard-rule content is introduced anywhere; `hard-rules.json` (the separate validator tool) is not modified by this design and needs no change for it — the `Forbidden:` sections these templates carry are unaffected by list-filling their `Allowed:`/`Report:` sections.

## 8. Out of scope for v0.1 of this mechanism (candidates for later, separately-approved work)

- Actual implementation of §5–§6 — specification only.
- `TEMPLATE_SECRET_EXECUTION_GATE.md`'s `Sequence:` numbered-step section (§4) — deliberately left unmechanized in this pass; revisit only if real usage shows a genuine, recurring need for a strict numbered-list form rather than prose.
- `TEMPLATE_GATE_CLOSURE_RECORD.md`'s `forms` selector and its own `Record:` list handling — `TEMPLATE_FILL_HELPER_SPEC_V0.md` §5.3, a separate document.
- New `gate-runner.mjs` composite modes for these three templates (`draft-docs-only-gate`, `draft-execution-gate`, `draft-secret-execution-gate`) — would follow the same pattern as `draft-commit-gate`/`draft-push-gate` once the underlying fill support exists, but is its own follow-up task.
- Markdown-escaping of operator-supplied values (e.g. a `--fact` value containing a literal backtick or `|`) — the mechanism as specified does a raw literal substitution, same trust model as today's scalar placeholders; sanitization is a candidate hardening item for the implementation task, not resolved here.
- Any hook, chat-interception, CI, or `package.json` wiring.

## 9. Readiness classification

Specification only. Not implemented. This document does not authorize modifying `fill-gate-template.mjs`, `fill-rules.json`, or any `TEMPLATE_*.md` file — a future implementation task requires its own separate, explicit approval gate, consistent with how the `ENDPOINT_IAM_RETEST` fill rule was treated (spec first, implementation as its own later gate) in `TEMPLATE_FILL_HELPER_SPEC_V0.md` §5.1 → commit `30bdd6a`.
