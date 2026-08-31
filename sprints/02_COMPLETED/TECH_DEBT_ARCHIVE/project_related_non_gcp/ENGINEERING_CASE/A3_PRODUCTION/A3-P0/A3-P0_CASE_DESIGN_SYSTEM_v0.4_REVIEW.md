# A3-P0 — CASE DESIGN SYSTEM
### Publication Architecture for the HouseMaster × Beeline Connected Building Engineering Case
**Reference building:** SEM-MCD-001 — г. Семей, пр. Шакарима, 13 «А»
**Task:** HM-BEELINE-A3-P0 (base) + CORR-01 + CORR-02 + CORR-03 (exact patch — final freeze preconditions) · MODE: PUBLICATION ARCHITECTURE / CONTENT EXTRACTION / NO FINAL RENDERING
**Status:** v0.4 — REVIEW ONLY
**PRODUCTION FREEZE: PENDING OWNER APPROVAL**

## CHANGELOG — v0.3 → v0.4 (CORR-03: Exact File Patch — Final Freeze Preconditions)

**Exact-patch revision, PATCH-01…PATCH-12 as specified, no substitute
criteria applied.** Key changes to this file: (1) EC-00 wording rewritten
per PATCH-01 — EC-00 is stated as an approved, closed gate with `SOURCE
LINKAGE STATUS: SOURCE LINKAGE PENDING`, not as a gate that "did not exist";
(2) premature freeze language removed per PATCH-02 — this document's own
status line no longer claims closed preconditions; freeze readiness is
reported only via the exact `READY FOR OWNER APPROVAL` / `NOT READY` tokens;
(3) new §33 Production Tokens added per PATCH-03…06 (page geometry,
typography, line, status, domain, flow tokens), and §6/§10 updated to
reference these exact values instead of deferring them; (4) §18 Page Status
Model replaced with the three-axis model per PATCH-07. See the companion
Page Registry v0.4 changelog for PATCH-08…11 (registry schema, thesis
wording, counts) and the Final Report for full PATCH-01…12 / 30-check
acceptance results.

## CHANGELOG — v0.2 → v0.3 (CORR-02: Freeze Preconditions Only)

**Correction-only revision, again finding no defect in this document's
design rules (§§1–32 unchanged in substance).** The gaps closed this pass —
Evidence Level vocabulary conformance, a Freeze Preconditions Checklist, and
an Owner Sign-off block — live entirely in the companion **Page Registry**
document; see its own v0.3 changelog. This document is republished at v0.3
only to keep its version number and filename cross-references in step.

## CHANGELOG — v0.1 → v0.2 (CORR-01: Production Freeze & Registry Consistency)

**Correction-only revision.** No design rule, grid, page type, color
semantic, or ID convention defined in §§1–32 below is changed — this
correction found no defect in the design-system *rules*. The defects
corrected this pass were arithmetic errors in the companion **Page
Registry** document's summary totals (CORE page count, PT-04 matrix page
count), not in this document. See
`A3-P0_PAGE_REGISTRY_v0.4_REVIEW.md`'s own changelog for the specifics.

This document is republished as v0.2 solely to keep its version number in
step with the frozen registry it describes, and to add one clarifying
cross-reference: the Page Registry (§20–24, §30 pointers below) is now
**frozen** as of its own v0.2 — see that document's "Production Freeze
Statement" for what that means and does not mean.

---

## 0. WHAT THIS GATE IS AND IS NOT

This is a production-architecture gate, not a design deliverable. It fixes
the rules by which any approved engineering Markdown becomes a controlled A3
sheet. **No final page is rendered here.** This document, together with
`A3-P0_PAGE_REGISTRY_v0.4_REVIEW.md`, `A3-P0_PAGE_REGISTRY_v0.4.csv`, and
`A3-P0_PAGE_SPEC_TEMPLATE_v0.4.md`, is the complete production system.

```text
THIS IS NOT: a presentation deck; a marketing brochure; a startup pitch;
a visual redesign of engineering meaning; final graphic production.

THIS IS: a publication system; page taxonomy; grid and hierarchy;
evidence/provenance language; a page registry; an extraction map from
approved EC documents; production rules for all future A3 sheets.
```

---

## 1. SOURCE-OF-TRUTH RULE

```text
APPROVED ENGINEERING MD
        ↓
A3 PAGE EXTRACTION
        ↓
A3 PAGE SPEC
        ↓
VISUAL PRODUCTION
        ↓
TECHNICAL QA
        ↓
APPROVED A3 SHEET
        ↓
CASE ASSEMBLY
```

```text
A3 SHEET IS NOT THE SOURCE OF TRUTH.
```

If engineering semantics change: **MD first → Page Spec second → A3
rendering third.** A graphic is never edited first and left to silently
diverge from its engineering source. Any correction to a rendered page must
trace back to a corrected MD (or, if the MD is already correct, a
production-only fix that changes no engineering claim).

### 1.1 — Approved gates used as source this session

```text
EC-00 — TECHNICAL CONTEXT
GATE STATUS: APPROVED / CLOSED

SOURCE LINKAGE STATUS:
SOURCE LINKAGE PENDING

PRIMARY SOURCE ARTIFACT:
NOT LOCATED IN CURRENT WORKSPACE

SECONDARY REFERENCE SOURCES:
Technical Integration Pack
Joint Technical Validation / Open Questions

NOTE:
The EC-00 gate is approved and closed.
The current workspace search did not locate its primary source artifact.
Absence of a located artifact does not mean EC-00 did not exist.
```

```text
EC-01 — Real MCD Baseline / SEM-MCD-001        (v0.3)  SOURCE LINKAGE: LINKED
EC-02 — Physical Building → Observation Architecture   (v0.3)  SOURCE LINKAGE: LINKED
EC-03 — Device & Connectivity Architecture      (v0.3)  SOURCE LINKAGE: LINKED
```

---

## 2. INPUT DISCOVERY METHOD

Every page proposed in the registry was extracted by reading the actual
approved documents (not by reusing old extraction notes blindly):

- `EC-01_REAL_MCD_BASELINE_SEM-MCD-001_v0.3_REVIEW.md`
- `EC-02_PHYSICAL_TO_OBSERVATION_SEM-MCD-001_v0.3_REVIEW.md`
- `EC-03_DEVICE_CONNECTIVITY_SEM-MCD-001_v0.3_REVIEW.md`
- Technical Integration Pack (TECH-01…TECH-08C) and Joint Technical
  Validation / Open Questions — secondary reference sources for the
  approved, closed EC-00 gate, whose primary source artifact carries
  `SOURCE LINKAGE STATUS: SOURCE LINKAGE PENDING` per §1.1

Where a source document had already self-declared A3 page IDs (EC-02 §18,
EC-03 §34), those IDs are **preserved unchanged** (§17, §21, §22 of this
document) rather than re-invented.

---

## 3. OUTPUT FILES OF THIS GATE

```text
ENGINEERING_CASE/A3_PRODUCTION/A3-P0_CASE_DESIGN_SYSTEM_v0.4_REVIEW.md   (this file)
ENGINEERING_CASE/A3_PRODUCTION/A3-P0_PAGE_REGISTRY_v0.4_REVIEW.md
ENGINEERING_CASE/A3_PRODUCTION/A3-P0_PAGE_REGISTRY_v0.4.csv
ENGINEERING_CASE/A3_PRODUCTION/A3-P0_PAGE_SPEC_TEMPLATE_v0.4.md
```

No PDF, no final Drawio, no PPTX, and no rendered art is produced at this
gate.

---

## 4. PUBLICATION FORMAT

```text
FORMAT:            A3 Landscape
SIZE:               420 × 297 mm
ORIENTATION:        Landscape

PRODUCT TYPE:       Engineering Technical Dossier / Technical Atlas

PRIMARY AUDIENCE:   Beeline technical specialists —
                     IoT/M2M · Integration/API · Network/Connectivity ·
                     Security · Architecture · Operations

SECONDARY AUDIENCE: Technical decision-makers who need to understand the
                     architecture without reading every source MD
```

This is explicitly **not** an executive presentation. No page in this system
is designed for a non-technical audience.

---

## 5. CORE DESIGN PRINCIPLES

```text
ENGINEERING CLARITY
EVIDENCE FIRST
LOW VISUAL NOISE
HIGH INFORMATION DENSITY
EXPLICIT RESPONSIBILITY BOUNDARIES
VISIBLE TBD / UNKNOWN STATES
CONSISTENT SEMANTIC LANGUAGE
TRACEABILITY TO SOURCE
```

Every page must let a technical reader distinguish, at a glance:

```text
FACT · DERIVED · PROPOSED · TBD · NO EVIDENCE · VALIDATION REQUIRED
```

**Visual polish never implies certainty the source does not contain.** A
page with more open TBDs than facts should look exactly like that — density
of unresolved items is information, not a design failure to hide.

---

## 6. MASTER GRID

```text
A3 LANDSCAPE — 12-COLUMN MASTER GRID
```

| Page family | Column split | Use |
|---|---|---|
| Narrative pages | 4 + 4 + 4 | Three editorial columns (per BUILDING-01/EC's existing narrative convention: requirement → evidence channel → HouseMaster boundary) |
| Graph-led pages | 8 + 4 | Hero graph (8) + commentary rail (4) |
| Matrix pages | 12 (full width) | Matrices are first-class content, not squeezed into a rail |
| Comparison pages | 6 + 6 | Two-sided comparison (e.g. Direct vs Edge) |
| Evidence pages | 7 + 5 | Source/evidence visual (7) + structured interpretation (5) |

### 6.1 — Zones common to every page

```text
SAFE MARGIN:         MARGIN-TOP/BOTTOM/LEFT/RIGHT = 15 mm each (§33.1)
GUTTER:               GRID-GUTTER = 6 mm between grid columns (§33.1)
TITLE BAND:           TITLE-BAND-HEIGHT = 28 mm (§33.1) — fixed height across
                       the whole dossier — Page ID + Section/Gate + Title +
                       one-sentence thesis
MAIN CONTENT ZONE:    MAIN-CONTENT-HEIGHT = 225 mm (§33.1) — the 12-column
                       grid area below the title band
FOOTER / PROVENANCE STRIP:  PROVENANCE-BAND-HEIGHT = 14 mm (§33.1) — see §16
PAGE ID LOCATION:     top-left of the title band and repeated, small, in the
                       footer strip
SOURCE/REFERENCE LOCATION:  footer strip, right-aligned
```

Exact values for every token above are defined once, canonically, in §33.1
— this section states where each zone sits, §33.1 states its exact
dimension.

Dimensions are **not** chosen to make any existing A3 engineering graph
(TECH-08A/B/C, BUILDING-01A–F, EC-03's reference flows) unreadable — the
grid wraps around already-legible content, not the reverse.

---

## 7. PAGE ANATOMY

**Minimum, every page:**

```text
PAGE ID
SECTION / GATE
TITLE
ONE-SENTENCE ENGINEERING THESIS
MAIN CONTENT AREA
STATUS / EVIDENCE LANGUAGE
SOURCE / PROVENANCE STRIP
REVISION / REVIEW STATUS
```

**Optional, as applicable:**

```text
TBD WITH BEELINE
DECISION REQUIRED
REFERENCE OBJECT
FIELD VALIDATION REQUIRED
RELATED PAGE
```

No decorative slogan, tagline, or marketing phrase appears on a technical
page. The "one-sentence engineering thesis" is a claim traceable to the
source MD, not a headline written for effect.

---

## 8. PAGE TYPE TAXONOMY

| Page Type | Purpose | Recommended layout | Density | Typical content | Avoid |
|---|---|---|---|---|---|
| PT-01 NARRATIVE | Frame the engineering question before showing mechanism | 4+4+4 | MEDIUM | Requirement → evidence channel → HouseMaster boundary | Turning the narrative into a sales pitch |
| PT-02 HERO ARCHITECTURE | Show one primary flow/topology at a glance | 8+4 | LOW/MEDIUM | Single dominant graph + guardrail callouts | Cramming a second unrelated diagram onto the same sheet |
| PT-03 REAL MCD / EVIDENCE | Anchor claims to the real building | 7+5 | MEDIUM | Source fragment + what it shows/supports/does not support | Presenting a photo or plan without a provenance caption |
| PT-04 MASTER MATRIX | Dense, authoritative reference table | 12 (full width) | HIGH | Full candidate/fact register | Truncating rows to "make it fit" |
| PT-05 COMPARISON | Two-sided, undecided trade-off | 6+6 | MEDIUM | Criterion-by-criterion rating (LOW/MEDIUM/HIGH/TBD) | Declaring a winner |
| PT-06 REFERENCE FLOW | One concrete worked example end-to-end | 8+4 | MEDIUM | Named candidate walked through the full architecture | Substituting a generic flow for the actual reference candidate |
| PT-07 FAILURE / STATE MODEL | Show state transitions and failure domains | 8+4 or 12 | MEDIUM/HIGH | State table, failure-domain table, guardrail callouts | Implying a failure domain equals an engineering defect |
| PT-08 TBD / VALIDATION REGISTER | Make unresolved items visible and countable | 12 (full width) | HIGH | Numbered TBD/question list with status | Silently shortening the list to look more finished |
| PT-09 DECISION / BOUNDARY | Show who owns what | 6+6 or 8+4 | LOW/MEDIUM | Responsibility matrix, boundary diagram | Blurring the HouseMaster/Beeline line for visual symmetry |
| PT-10 WORKSHOP SHEET | Compact extract for a live session | Varies, always LOW/MEDIUM density | LOW/MEDIUM | Reused content from a CORE page, trimmed | Creating new engineering content not present in the source page |

No page type is forced into another type's layout — a matrix that needs
full-width stays full-width even on an otherwise narrative-heavy dossier.

---

## 9. TYPOGRAPHIC SYSTEM

Roles, not a proprietary font selection:

```text
H1 — page title
H2 — section heading
H3 — block heading
BODY
TABLE
ANNOTATION
STATUS LABEL
FOOTER / SOURCE
```

**Requirements:**
- Legible at printed A3, when projected, and when exported to PDF.
- No "presentation footnote" typography — the smallest text on any page
  (table/annotation) must remain practically readable at arm's length on a
  printed A3 sheet, not just theoretically present.
- Table/matrix text may run smaller than body text but must stay above that
  practical-legibility floor; if it would not, the matrix is split (§13), not
  shrunk further.
- Minimum acceptable hierarchy: H1 > H2 > H3 > BODY ≥ TABLE ≥ ANNOTATION ≈
  STATUS LABEL > FOOTER. No two adjacent levels may be visually
  indistinguishable.

Do not optimize for fitting everything onto one sheet at the cost of
legibility — splitting into two pages (§28) is preferred over shrinking type
past the floor above.

---

## 10. COLOR / STATUS SEMANTICS

Required semantic states, each with one dedicated visual treatment reused
identically across every page:

```text
VERIFIED
DERIVED
PARTIAL
PROPOSED / CONCEPTUAL
TBD
NO EVIDENCE
TBD WITH BEELINE
RISK / FAILURE
HOUSEMASTER DOMAIN
BEELINE DOMAIN
SHARED / TRUST BOUNDARY
```

**Explicit rule:** red is not the default color for "unknown." `TBD` and `NO
EVIDENCE` get a distinct, calm, neutral treatment (e.g. a hatched or dashed
fill, not a saturated alarm color) — reserving stronger visual weight
(without necessarily being red either) for `RISK / FAILURE`, which is a
different concept entirely:

```text
UNKNOWN ≠ ERROR ≠ FAILURE
```

`VERIFIED`/`DERIVED`/`PARTIAL` form one calm gradient (most-to-least
confident); `HOUSEMASTER DOMAIN`/`BEELINE DOMAIN`/`SHARED BOUNDARY` form a
second, independent color family (domain ownership, not confidence) so the
two systems of meaning are never visually confused with each other.
**Canonical colors for every semantic state above are fixed, exactly, in
§33.4 (status tokens) and §33.5 (domain tokens) — literal hex values are no
longer deferred.** No future palette may collapse these two independent
meanings into one color axis.

---

## 11. DOMAIN VISUAL LANGUAGE

### HOUSEMASTER represents:
```text
engineering domain · system of record · observation/evidence · building
state · workflow/domain interpretation
```

### BEELINE represents:
```text
connectivity · operator transport · SIM/eSIM lifecycle · network/
connectivity state · operator-side observability where validated
```

### TRUST / INTEGRATION BOUNDARY
Must be **visually explicit** on every page that crosses it — never implied
by proximity alone. This mirrors TECH-01/TECH-04's existing "BEELINE /
HOUSEMASTER TRUST & API BOUNDARY" concept; the visual system does not invent
a new boundary, it makes the existing one legible.

### ALAU AI (when it later appears)
```text
downstream intelligence / decision-support
```
**Never** visually positioned as source of engineering truth, control
authority, or system of record — consistent with BUILDING-01F's existing
guardrails (`AI SIGNAL ≠ ENGINEERING FACT`, etc.), which this system carries
forward, not redefines.

---

## 12. GRAPH RULES

- Direction preferably left→right or top→bottom.
- One primary causal/data flow per page; secondary flows are visually
  subordinate (thinner, lighter, or annotated as secondary).
- Domain boundaries (HouseMaster/Beeline/shared) are explicit, not implied.
- `DATA` / `CONTROL` / `OPERATIONS` planes stay visually distinct wherever a
  source diagram already distinguishes them (as TECH-08A already does).
- The same axiom is not repeated more than once per sheet.
- Guardrails (e.g. `DEVICE OFFLINE ≠ COMPONENT FAILED`) use callouts, not
  buried footnotes.
- No decorative 3D where it would obscure topology.
- Every arrow has semantic meaning — never purely decorative connectors.

**Minimum arrow/element vocabulary:**

```text
SOLID ARROW         — confirmed data/causal flow
DASHED ARROW         — candidate/conceptual flow, not yet confirmed
BOUNDARY             — domain or trust boundary line
CANDIDATE            — a proposed-but-unconfirmed object (e.g. OC-xxx,
                        DEV-CAND-xxx)
TBD                  — explicitly unresolved node/edge
FAILURE PATH         — a failure-domain-specific route (per EC-03 §29)
HUMAN EVIDENCE PATH   — Channel B (per BUILDING-01D)
MACHINE DATA PATH     — Channel A (per BUILDING-01D)
```

---

## 13. TABLE / MATRIX RULES

- Row hierarchy: group rows by system/zone/gate before sorting by ID, so a
  reader scans by engineering meaning first, ID second.
- Zebra striping is allowed only as a reading aid, never to encode status —
  status has its own color system (§10).
- **Maximum useful columns before split:** roughly 8–9 at full A3 width with
  the typographic floor from §9; EC-03's Master Device & Connectivity Matrix
  (13 columns) exceeds this and must be split into logical sub-views for
  print (e.g. identity/role columns on one view, connectivity-requirement
  columns on another) rather than shrunk to fit.
- **15–20+ column engineering matrices** (e.g. a future EC-04 identity
  matrix) are handled the same way: split by logical concern, cross-referenced
  by the same row ID, never compressed past the legibility floor.
- Status labels are fixed short tokens (`VERIFIED`, `TBD`, `P1`, `HIGH`,
  etc.) — never paragraph-length prose inside a cell.
- No cell may contain more than roughly one sentence of free text; longer
  reasoning belongs in an adjacent annotation rail, not inside the matrix.
- **Page continuation convention:** a split matrix repeats its Page ID with a
  letter suffix (e.g. `A3-EC03-08a`, `A3-EC03-08b`) and both carry a
  `RELATED PAGE` cross-reference (§29) to each other — this is a
  print-continuation convention, not a new canonical Page ID (§17 still
  governs ID assignment).

**Principle:** if a master matrix cannot be read at A3 within the
typographic floor, it is split into logical views. Type size is never
reduced indefinitely to force a fit.

---

## 14. REAL-MCD EVIDENCE PAGE RULES

Every SEM-MCD-001 evidence page distinguishes:

```text
SOURCE
WHAT IT SHOWS
WHAT IT SUPPORTS
WHAT IT DOES NOT SUPPORT
CONFIDENCE
TBD
```

Future visual material may include a cadastral document fragment, a
technical-passport fragment, a real building photograph, a plan, a 3D
reconstruction, or an annotated engineering image — **every one of them
carries this same six-field provenance caption**, no exceptions.

```text
VISUAL REALISM ≠ EVIDENCE CERTAINTY
```

A crisp photograph of the 2006 land letter (SRC-005) is exactly as
"real-looking" as a hypothetical rendered 3D massing model — but one is
`VERIFIED` and the other, until footprint geometry closes (EC-01 TBD-001),
is not. The caption is what carries the actual epistemic weight, not the
image quality.

---

## 15. 3D / IMAGE RULES

Future Blender/3D visuals may be used only as:

```text
EXPLANATORY SPATIAL MODEL
```

unless the specific geometry/state shown is itself evidence-backed at the
same fidelity.

**Mandatory visual states, applied per-element within a 3D visual, not just
per-page:** `VERIFIED` · `DERIVED` · `ASSUMED` · `PARTIAL` · `TBD`. A single
3D sheet may need to show a `VERIFIED` floor count alongside a `TBD`
footprint outline in the same image — the visual system must support mixed
confidence within one graphic, not force an all-or-nothing label per page.

**A polished 3D render never gets to imply certainty about unknown
infrastructure** (e.g. heating-node location, per EC-01 §13/EC-02 §6) purely
because the rendering itself looks finished. This directly extends the
3D-Pipeline's own standing rule (project summary §3, "DO NOT MODEL UNKNOWN
INFORMATION AS FACT") into the publication layer.

---

## 16. PROVENANCE STRIP

One universal footer structure, used identically on every page:

```text
PAGE ID
SOURCE GATE
SOURCE SECTION(S)
REFERENCE OBJECT           (SEM-MCD-001, or "reference architecture" for
                             EC-00-family pages)
EVIDENCE STATUS
REVISION
OPEN TBD COUNT
RELATED PAGE(S)
```

For Beeline-dependent pages, optionally append:

```text
JOINT VALIDATION REQUIRED
```

Kept compact — this strip is a reference index, not a second body of text.

---

## 17. PAGE ID SYSTEM

```text
A3-EC00-01, A3-EC00-02, …
A3-EC01-01, …
A3-EC02-01, …
A3-EC03-01, …
A3-EC04-xx, A3-EC05-xx, …   (future gates)
A3-P0-xx                     (production-system pages, e.g. this document set)
```

**Workshop extracts never create a second source Page ID.** A workshop deck
entry instead carries:

```text
SOURCE PAGE:      A3-EC03-06
WORKSHOP ORDER:   WS-05
```

One canonical page may therefore appear, unchanged in ID, across several
different compilations (full dossier, workshop deck, future appendix).

---

## 18. PAGE STATUS MODEL

Three **independent** axes — never conflated into one status field:

```text
ENGINEERING SOURCE STATUS:
APPROVED
DRAFT
SUPERSEDED

SOURCE LINKAGE STATUS:
LINKED
SOURCE LINKAGE PENDING

A3 PRODUCTION STATUS:
IDENTIFIED
CONTENT EXTRACTED
PAGE SPEC READY
DESIGN READY
RENDERED REVIEW
TECH QA
VISUAL QA
OWNER APPROVED
FROZEN
SUPERSEDED
```

`SOURCE LINKAGE STATUS` records whether a page's cited source gate has a
primary source artifact actually located in the current workspace
(`LINKED`) or not (`SOURCE LINKAGE PENDING`) — this is independent of
whether the gate itself is `APPROVED` (per `ENGINEERING SOURCE STATUS`).
Per §1.1, EC-00 is `APPROVED / CLOSED` as a gate, but its primary source
artifact is `SOURCE LINKAGE PENDING`; EC-01/02/03 are both `APPROVED` and
`LINKED`.

Example: `ENGINEERING SOURCE STATUS: APPROVED` / `SOURCE LINKAGE STATUS:
LINKED` / `A3 PRODUCTION STATUS: PAGE SPEC READY` — a page can have fully
approved, linked engineering content while still being early in its own
production pipeline.

At the close of A3-P0, every page in the registry is at `A3 PRODUCTION
STATUS: CONTENT EXTRACTED` (source sections identified and a thesis
drafted) — none has reached `PAGE SPEC READY`, and **zero pages are
`RENDERED`.**

---

## 19. PAGE SPEC TEMPLATE

Defined as a standalone reusable file:
`A3-P0_PAGE_SPEC_TEMPLATE_v0.4.md` (see that file for the fillable template
itself — it is not duplicated here to avoid two diverging copies).

---

## 20–24. PAGE REGISTRY, EC PAGE SETS

The actual page inventory (EC-00…EC-03), preserved EC-02/EC-03 IDs, and
per-gate page counts are maintained in
`A3-P0_PAGE_REGISTRY_v0.4_REVIEW.md` and its CSV twin — not duplicated here,
to keep this document the **rules** file and the registry the **data** file.

---

## 25. CASE CONTENT ARCHITECTURE — ORDERING LOGIC

The dossier is **not** ordered by file chronology (EC-00 → EC-01 → EC-02 →
EC-03 in strict section order). It is ordered by reader logic:

```text
WHY THIS CASE EXISTS
   ↓
WHAT REAL BUILDING WE ARE TALKING ABOUT
   ↓
WHAT IS PHYSICALLY KNOWN
   ↓
WHAT CAN BE OBSERVED
   ↓
HOW OBSERVATION BECOMES MACHINE/HUMAN EVIDENCE
   ↓
HOW DEVICE/CONNECTIVITY ARCHITECTURE SERVES IT
   ↓
WHAT BEELINE MUST VALIDATE
   ↓
WHAT REMAINS UNKNOWN
```

The realized page-by-page sequence following this logic is in the Page
Registry document (§25 there).

---

## 26. WORKSHOP EXTRACTION LOGIC (selection criteria only — not finalized)

A future 10–15 page workshop subset must be formed by these criteria, not by
this document finalizing the actual subset:

```text
must establish shared vocabulary
must show responsibility boundaries
must expose real integration questions
must show the real MCD
must show Direct vs Edge
must show failure behavior
must show TBD WITH BEELINE
must avoid internal editorial detail
```

Candidate pages meeting these criteria are flagged in the Page Registry's
`Workshop Candidate` column — currently more pages are flagged than the
eventual 10–15 target, deliberately: final trimming is a later, separate
decision, not made here.

---

## 27. PAGE DENSITY RULES

```text
LOW DENSITY      — a handful of large elements, generous whitespace
MEDIUM DENSITY    — a primary visual plus a modest supporting table/rail
HIGH DENSITY      — full-width matrices, registers, TBD lists
```

| Page type | Typical density |
|---|---|
| PT-02 Hero Architecture | LOW/MEDIUM |
| PT-01 Narrative | MEDIUM |
| PT-04 Master Matrix | HIGH |
| PT-10 Workshop decision page | LOW/MEDIUM |
| PT-08 TBD/Validation Register | HIGH |
| PT-05 Comparison | MEDIUM |
| PT-06 Reference Flow | MEDIUM |
| PT-07 Failure/State Model | MEDIUM/HIGH |
| PT-09 Decision/Boundary | LOW/MEDIUM |
| PT-03 Real MCD/Evidence | MEDIUM |

Not every page may be forced into a dense engineering table merely for
consistency — density follows content, not house style.

---

## 28. CONTENT SPLITTING RULE

One MD section becomes **one A3 page** by default. It becomes **two or more**
when:

- two genuinely different engineering questions are being answered;
- one matrix would fall below the typographic floor (§9/§13) at full width;
- a single page would otherwise combine architecture + failure logic +
  decision register (three distinct page types worth of content);
- visual hierarchy would become ambiguous (no single dominant element).

**Example already identified in this registry:** EC-03's Master Device &
Connectivity Matrix (§33, 13 columns, 16 rows) is flagged for a probable
future split into `A3-EC03-08a`/`A3-EC03-08b` at design time (§13), even
though it remains **one** canonical page entry (`A3-EC03-08`) in this
registry — splitting is a layout decision applied at Page Spec / design
time, not a reason to fork the canonical ID now.

Never split merely for visual decoration.

---

## 29. CROSS-REFERENCE SYSTEM

Compact syntax, used in the provenance strip (§16):

```text
RELATED:
A3-EC02-02
A3-EC03-02
A3-EC03-06
```

No more than a short list per page — the dossier is not turned into
hyperlink clutter. Cross-references point to pages that materially help
interpret the current one (e.g. a Reference Flow page relates to its
Comparison and Failure-Domain pages), not to every tangentially related
sheet in the case.

---

## 30. PRODUCTION REGISTER SUMMARY

Totals and current status are maintained in the Page Registry document
(§30 there) to avoid two diverging counts.

---

## 31. DO NOT DO

This gate, and every future A3 production step governed by this system, does
**not**:

- rewrite engineering content;
- change EC-00…EC-03 semantics;
- create new architecture;
- select telecom technologies;
- change Beeline/HouseMaster boundaries;
- create final diagrams;
- create PDF, PPTX, or Drawio;
- generate images;
- create decorative art;
- create fake source references;
- reduce text until engineering meaning is lost;
- silently resolve TBDs;
- make the dossier look like an investor pitch.

---

## 32. ACCEPTANCE-TEST CROSS-REFERENCE

| # | Question | Answered in |
|---|---|---|
| 1 | Canonical A3 format? | §4 |
| 2 | Grid used? | §6 |
| 3 | Page types? | §8 |
| 4 | Evidence states shown how? | §10 |
| 5 | HouseMaster vs Beeline distinguished how? | §11 |
| 6 | Integration boundary shown how? | §11 |
| 7 | TBD / NO EVIDENCE shown how? | §10 |
| 8 | Real-MCD evidence pages built how? | §14 |
| 9 | Matrices handled how? | §13 |
| 10 | 3D visuals prevented from implying false certainty how? | §15 |
| 11 | Page ID convention? | §17 |
| 12 | Page lifecycle/status model? | §18 |
| 13 | Page Spec format? | §19 + `A3-P0_PAGE_SPEC_TEMPLATE_v0.4.md` |
| 14 | EC-00 pages, exactly which? | Page Registry §EC-00 |
| 15 | EC-01 pages, exactly which? | Page Registry §EC-01 |
| 16 | EC-02 IDs preserved? | Page Registry §EC-02; confirmed unchanged |
| 17 | EC-03 IDs preserved? | Page Registry §EC-03; confirmed unchanged |
| 18 | Recommended case order? | §25 (rule) + Page Registry (realized order) |
| 19 | Likely workshop pages? | §26 (criteria) + Page Registry (`Workshop Candidate` column) |
| 20 | Can a designer build a page without inventing content? | Yes — every field in the Page Spec Template traces to a named source section |
| 21 | Can an engineer trace every page to approved source sections? | Yes — Page Registry `Source Sections` column |
| 22 | Are zero final A3 pages rendered at this gate? | Yes — confirmed in Final Report |

---

## 33. PRODUCTION TOKENS

**(CORR-03, new)** Exact, canonical values. No designer substitutes a local
value for any token below (§33.7).

### 33.1 — PAGE GEOMETRY

```text
PAGE-A3-LANDSCAPE
WIDTH = 420 mm
HEIGHT = 297 mm

MARGIN-TOP = 15 mm
MARGIN-BOTTOM = 15 mm
MARGIN-LEFT = 15 mm
MARGIN-RIGHT = 15 mm

GRID-COLUMNS = 12
GRID-GUTTER = 6 mm

TITLE-BAND-HEIGHT = 28 mm
PROVENANCE-BAND-HEIGHT = 14 mm

MAIN-CONTENT-HEIGHT =
297 - 15 - 15 - 28 - 14
= 225 mm
```

### 33.2 — TYPOGRAPHY TOKENS

```text
TYPE-H1 = 22 pt / 26 pt / bold
TYPE-H2 = 15 pt / 18 pt / semibold
TYPE-H3 = 11 pt / 14 pt / semibold
TYPE-BODY = 9.5 pt / 13 pt / regular
TYPE-TABLE = 8.5 pt / 11 pt / regular
TYPE-ANNOTATION = 8 pt / 10 pt / regular
TYPE-STATUS = 8 pt / 10 pt / semibold
TYPE-FOOTER = 7.5 pt / 9 pt / regular

FONT CLASS:
neutral technical sans-serif
```

**Hard rule:** `CONTENT MUST BE SPLIT BEFORE TYPE IS REDUCED BELOW TOKEN
MINIMUM.` This is the exact value that operationalizes §9's typographic
floor and §13's matrix-splitting rule — those sections' qualitative
"legibility floor" language now resolves to these tokens.

### 33.3 — LINE TOKENS

```text
LINE-PRIMARY-FLOW = 1.5 pt SOLID
LINE-SECONDARY-FLOW = 1.0 pt SOLID
LINE-CANDIDATE = 1.0 pt DASHED
LINE-BOUNDARY = 1.25 pt SOLID
LINE-TRUST-BOUNDARY = 1.75 pt DASHED
LINE-FAILURE = 1.5 pt DASHED
LINE-TABLE = 0.5 pt SOLID
```

**Semantics:**

```text
SOLID   = confirmed / active / explicit structural relation
DASHED  = candidate / conceptual / unresolved / validation-dependent relation
DOTTED  = contextual reference only; no active flow
```

**Rule:** `A DESIGNER MUST NEVER DECIDE LOCALLY WHAT A DASHED LINE MEANS.`
This is the exact resolution of §12's line-vocabulary section — `DASHED
ARROW`, `CANDIDATE`, `TBD`, and `FAILURE PATH` all now map onto the named
tokens above rather than a free interpretation.

### 33.4 — STATUS TOKENS

```text
STATUS-VERIFIED
  fill #E8F5E9   border #2E7D32   text #1B5E20

STATUS-DERIVED
  fill #EEF5E9   border #689F38   text #33691E

STATUS-PARTIAL
  fill #FFF8E1   border #F9A825   text #7A5A00

STATUS-PROPOSED
  fill #E3F2FD   border #1976D2   text #0D47A1

STATUS-TBD
  fill #F5F5F5   border #757575 dashed   text #424242

STATUS-NO-EVIDENCE
  fill #FAFAFA   border #9E9E9E   text #616161

STATUS-TBD-BEELINE
  fill #FFF3E0   border #EF6C00   text #8A3B00

STATUS-RISK
  fill #FFEBEE   border #C62828   text #8E0000
```

**Rule:** `UNKNOWN ≠ ERROR ≠ FAILURE` — `STATUS-TBD` and `STATUS-NO-EVIDENCE`
use calm, neutral greys; `STATUS-RISK` is the only token carrying alarm-red,
reserved for genuine risk/failure, never for an ordinary unknown (this is
the exact token-level enforcement of §10's rule).

### 33.5 — DOMAIN TOKENS

```text
DOMAIN-HOUSEMASTER
  fill #E8F0FE   border #2457A6   text #153A73

DOMAIN-BEELINE
  fill #FFF7CC   border #D6A700   text #665000

DOMAIN-SHARED
  fill #F3E8FF   border #7B4AB5   text #4C267A

DOMAIN-ALAU-AI
  fill #E8F7F2   border #2E7D6E   text #185246
```

```text
BOUNDARY-TRUST = LINE-TRUST-BOUNDARY
```

```text
ALAU AI:
downstream intelligence / decision-support only
ALAU AI ≠ system of record
ALAU AI ≠ control authority
ALAU AI ≠ engineering truth source
```

### 33.6 — FLOW TOKENS

```text
FLOW-MACHINE-DATA    = LINE-PRIMARY-FLOW / filled arrow / SOLID
FLOW-HUMAN-EVIDENCE   = LINE-SECONDARY-FLOW / filled arrow / SOLID
FLOW-DOMAIN-STATE     = LINE-PRIMARY-FLOW / filled arrow / SOLID
FLOW-CONNECTIVITY     = LINE-PRIMARY-FLOW / filled arrow / SOLID
FLOW-CANDIDATE        = LINE-CANDIDATE / open arrow / DASHED
FLOW-FAILURE          = LINE-FAILURE / filled arrow / DASHED

FLOW-CONTROL-DISABLED:
  1.0 pt DASHED
  no arrowhead
  label = NOT ACTIVE / NOT AUTHORIZED / NOT IMPLEMENTED
```

`FLOW-CONTROL-DISABLED` is the token-level enforcement of TECH-04's existing
principle that commands require stronger control than telemetry, and of
BUILDING-01F's "no autonomous control" guardrail — it is drawn, if drawn at
all, explicitly as inactive, never as a live flow.

### 33.7 — TOKEN SUBSTITUTION RULE

```text
A DESIGNER MAY NOT SUBSTITUTE LOCAL COLOR, LINE, TYPE, FLOW, STATUS, OR
BOUNDARY SEMANTICS FOR THE CANONICAL PRODUCTION TOKENS ABOVE.
```

Every token in §33.1–§33.6 is the single source of truth for its category.
A Page Spec (§19, `A3-P0_PAGE_SPEC_TEMPLATE_v0.4.md`) references these
tokens by name; it does not restate or reinterpret their values.
