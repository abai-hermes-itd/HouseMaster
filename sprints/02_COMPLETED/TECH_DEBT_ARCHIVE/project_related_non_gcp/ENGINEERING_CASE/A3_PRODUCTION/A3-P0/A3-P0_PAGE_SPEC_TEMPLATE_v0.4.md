# A3-P0 — PAGE SPEC TEMPLATE v0.4

**CORR-03 note (exact patch, PATCH-10):** `PAGE TYPE:` is replaced by
`SOURCE LINKAGE STATUS:`, `PRIMARY PAGE TYPE:`, and `SECONDARY
CHARACTERISTIC:`, matching the Page Registry v0.4 schema (14 columns,
Primary/Secondary Type Rule). New `PRODUCTION TOKENS:` field group added,
referencing Design System §33's canonical geometry/type/status/domain/flow/
line tokens by name — a Page Spec does not restate or reinvent token values.
`DO NOT IMPLY` remains mandatory. All other fields unchanged from v0.1–v0.3.

Copy this template once per page when a page moves from `CONTENT EXTRACTED`
to `PAGE SPEC READY` (per the Page Status Model, Design System §18). Every
field must be filled from an approved engineering source — a Page Spec that
cannot cite a source section for a field should leave that field `TBD`, not
invent content.

```text
PAGE ID:
TITLE:
SOURCE GATE:
SOURCE FILE:
SOURCE SECTIONS:

SOURCE LINKAGE STATUS:          (LINKED / SOURCE LINKAGE PENDING, per
                                 Design System §18 and Page Registry
                                 "Source Linkage Status" column)

PRIMARY PAGE TYPE:              (PT-01 … PT-10, per Design System §8 —
                                 exactly one)
SECONDARY CHARACTERISTIC:       (per Page Registry Primary/Secondary Type
                                 Rule — NONE if not applicable)

PURPOSE:
PRIMARY AUDIENCE:              (per Design System §4)
ENGINEERING QUESTION:
ONE-SENTENCE THESIS:

CONTENT STATUS:                (per Design System §18 A3 PRODUCTION STATUS
                                 track)
EVIDENCE STATUS:                (VERIFIED / DERIVED / PARTIAL / PROPOSED /
                                 TBD / NO EVIDENCE / TBD WITH BEELINE — may be
                                 mixed within one page; state the mix)

LAYOUT:
GRID:                           (per Design System §6 — e.g. "8+4",
                                 "12 full-width", "6+6")
PRIMARY VISUAL:
SECONDARY VISUAL:
COLUMN / RAIL CONTENT:

PRODUCTION TOKENS:              (per Design System §33 — reference by name
                                 only, never restate or override a value)
PAGE GEOMETRY TOKEN:            (§33.1 — normally PAGE-A3-LANDSCAPE with
                                 standard MARGIN/GRID/TITLE-BAND/
                                 PROVENANCE-BAND values; note any page-type
                                 exception explicitly, if any)
TYPE TOKENS:                    (§33.2 — which of TYPE-H1…TYPE-FOOTER are
                                 used on this page)
STATUS TOKENS:                  (§33.4 — which STATUS-* tokens appear)
DOMAIN TOKENS:                  (§33.5 — which DOMAIN-* tokens appear;
                                 BOUNDARY-TRUST if a trust boundary is drawn)
FLOW TOKENS:                    (§33.6 — which FLOW-* tokens appear;
                                 FLOW-CONTROL-DISABLED if any inactive/
                                 not-authorized path is shown)
LINE TOKENS:                    (§33.3 — which LINE-* tokens appear)

MANDATORY CONTENT:
OPTIONAL CONTENT:

STATUS LABELS:                  (which of the §10 semantic states appear on
                                 this page)
TBD / VALIDATION ITEMS:

HOUSEMASTER ELEMENTS:
BEELINE ELEMENTS:
SHARED BOUNDARY:

SOURCE / PROVENANCE:            (fill exactly per Design System §16 —
                                 PAGE ID / SOURCE GATE / SOURCE SECTION(S) /
                                 REFERENCE OBJECT / EVIDENCE STATUS /
                                 REVISION / OPEN TBD COUNT / RELATED PAGE(S))

DO NOT IMPLY:                   (explicit list of claims this page must NOT
                                 be read as making — e.g. "does not imply a
                                 confirmed component location", "does not
                                 imply a topology decision")

RELATED PAGES:

DESIGN STATUS:                  (per Design System §18 A3 PRODUCTION STATUS)
TECH QA STATUS:
OWNER APPROVAL:
```

**Rule (PATCH-10):**

```text
A DESIGNER MAY NOT SUBSTITUTE LOCAL COLOR, LINE, TYPE, FLOW, STATUS, OR
BOUNDARY SEMANTICS FOR THE CANONICAL PRODUCTION TOKENS.
```

## Notes for whoever fills this template

- `SOURCE SECTIONS` must name actual section numbers/IDs from the cited
  `SOURCE FILE` (e.g. "EC-03 §26, §9"), not a paraphrase.
- `DO NOT IMPLY` is not optional filler — every page adapted from an
  evidence-gated source (EC-01/EC-02/EC-03) inherits that source's explicit
  non-claims (e.g. "no topology selected", "no component location
  confirmed") and this field is where those non-claims travel into the
  visual-production brief, so a designer does not accidentally imply more
  certainty than the source supports.
- If a page merges content from more than one source section, list all of
  them in `SOURCE SECTIONS` and ensure `EVIDENCE STATUS` reflects the
  weakest applicable status, not the strongest.
- `STATUS LABELS` should list only the semantic states (Design System §10)
  actually needed on this specific page — not the full canonical list by
  default.
- `PRODUCTION TOKENS` fields reference Design System §33 by token name only
  (e.g. `STATUS-TBD`, `FLOW-CANDIDATE`) — never a hex value, point size, or
  line weight copied and potentially drifted from §33's canonical table.
- This template does not include a field for cost, vendor, or technology
  selection, because no page in this system may contain one (Design System
  §31, EC-03 §9/§11).
