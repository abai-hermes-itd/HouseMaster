# A3-EC01-06 — Page Spec

## Control

- Page ID: A3-EC01-06
- Title: Site Survey & 3D Readiness Handoff
- Stage: P2_CONTEXT_REAL_BUILDING
- Production No.: P2-06
- Case assembly No.: NOT YET ASSIGNED (page not yet compiled to Assembly/PDF)
- Source gate: EC-01
- Source file: EC-01_REAL_MCD_BASELINE_SEM-MCD-001_v0.3_REVIEW.md
- Source sections: EC-01 §11, §12, §13
- Source linkage status: LINKED
- Primary page type: PT-06 (REFERENCE FLOW)
- Secondary characteristic: TBD REGISTER
- IR type: REFERENCE_FLOW / 3D_READINESS_HANDOFF_MATRIX
- Page spec status: PAGE_SPEC_READY
- Owner approval: NOT YET SUBMITTED
- Graph ID: A3-EC01-06-3D-READINESS-HANDOFF
- Reference building: SEM-MCD-001 — Semey, Shakarima 13A

## Purpose

Close the EC-01 page set by showing which site-survey and MCD-baseline facts are actually usable for 3D massing and pilot work today, versus which remain blocked pending field validation — a practical handoff, not a repeat evidence summary.

## Primary audience

HouseMaster + Beeline joint engineering review (per Design System §4 — same audience class as other EC-01 handoff pages).

## Engineering question

What EC-01 site-survey and MCD-baseline facts are actually usable for 3D massing and pilot work today, and which remain blocked pending field validation?

## One-sentence thesis

3D massing may proceed on floor count and footprint shape alone; nothing else is ready.

## Content status

CONTENT EXTRACTED (per Page Registry `A3 Production Status`).

## Evidence status

Mixed — VERIFIED / DERIVED / PARTIAL / TBD / NO EVIDENCE. State the mix; do not collapse to a single token.

## Primary visual — 3D Usability Matrix

Render exactly 7 rows, source order preserved, with these columns:

FACT → DIRECT USE IN BLENDER? → USE AS CONSTRAINT? → NEEDS FIELD CONFIRMATION? → DO NOT MODEL

### Required rows

1. 9 floors — YES / — / NO / —
2. Stepped (non-rectangular) footprint outline (Image 3) — NO (dimensions incomplete) / YES — DERIVED constraint on massing shape, supersedes a simple-rectangle assumption / YES, before final massing / —
3. Footprint area (site-coverage) — NO, not established / NO — 1,248 m² and 550 m² are building-area sub-categories, not footprint values, per owner-approved taxonomy / YES — requires a dimensioned plan or field survey / do not model any area-derived footprint
4. 3 entrance/staircase cores — no exact coordinates / YES, as section-count constraint / YES (exact spacing) / —
5. Floor plan room layout (SRC-004 photographed sheets) — PARTIALLY, legible portions may be digitized as a DERIVED reference for one representative floor / YES / YES, for illegible dimensions / —
6. Roof/basement — NO / NO / YES / do not invent
7. Engineering rooms/risers — NO / NO / YES / do not invent — no location evidence exists

Row count: 7. Rows needing field confirmation: 6 of 7 (all except row 1).

## Secondary visual — Site Survey Data Gap List

Present as 5 categories (not a re-registered per-item count):

1. PHYSICAL
2. ENGINEERING
3. DEVICE DEPLOYMENT
4. CONNECTIVITY
5. DOCUMENTATION

Each category shows its verbatim source items as compact list text. Category count: 5.

Note: the former area-taxonomy reconciliation gap under Documentation is resolved per the owner-approved taxonomy (§0b/§5, CORR-02) and must not be shown as an open documentation gap.

## Tertiary visual — Reference Component Candidate

Show HEAT-03 as a single reference-candidate block:

- Question: can a real HEAT-03 (or equivalent heating mixing/elevator node) be identified from primary evidence reviewed this session?
- Answer: NO EVIDENCE.
- Supporting evidence: existence of a central heating connection confirmed; no basement plan, mixing-node location, or riser topology legible.
- Boundary statement: HEAT-03 and all other HEAT-xx component IDs remain unassigned ontology candidates, not instantiated facts.

This block cites the same fact tracked as `CI-03` on A3-EC01-05; it must not be rendered as a second, independent open-item register entry — one cross-reference line is sufficient.

## Layout

- Grid: 8+4 (matrix + gap list primary rail, HEAT-03 reference block in secondary rail).
- Primary visual: 3D Usability Matrix (7 rows).
- Secondary visual: Site Survey Data Gap List (5 categories).
- Column / rail content: HEAT-03 reference block; guardrail band.

## Production tokens

- Page geometry token: PAGE-A3-LANDSCAPE (standard MARGIN/GRID/TITLE-BAND/PROVENANCE-BAND values; no exception).
- Type tokens: TYPE-H1, TYPE-H2, TYPE-BODY, TYPE-TABLE, TYPE-FOOTER (per Design System §33.2).
- Status tokens: STATUS-VERIFIED, STATUS-DERIVED, STATUS-PARTIAL, STATUS-TBD, STATUS-NO-EVIDENCE (per Design System §33.4).
- Domain tokens: DOMAIN-HOUSEMASTER (per Design System §33.5); no BOUNDARY-TRUST — this page draws no HouseMaster/Beeline boundary.
- Flow tokens: none — this page is a reference/status matrix, not a data-flow diagram.
- Line tokens: LINE-TABLE-GRID (per Design System §33.3).

## Mandatory content

- All 7 usability-matrix rows in source order.
- All 5 gap-list categories.
- The HEAT-03 reference block with its NO EVIDENCE answer.
- Both guardrails (below).
- Provenance / review footer.

## Optional content

- Compact secondary annotation linking a gap category to the matrix rows it explains (presentation aid only; must not create a new taxonomy or relationship type beyond what §12's own table states).

## Status labels

VERIFIED, DERIVED, PARTIAL, TBD, NO EVIDENCE (per Design System §10 — only the states actually needed on this page).

## TBD / validation items

6 field-confirmation requirements (matrix rows 2–7) plus the HEAT-03 NO EVIDENCE finding. Total open/TBD item count: 7.

## HouseMaster elements

3D Usability Matrix, Site Survey Data Gap List, HEAT-03 reference block — all HouseMaster-side engineering content.

## Beeline elements

None directly rendered as Beeline-owned content on this page; the Connectivity gap category references "TBD WITH BEELINE / SITE SURVEY" items as HouseMaster-side open questions, not Beeline commitments.

## Shared boundary

None drawn on this page.

## Source / provenance

- PAGE ID: A3-EC01-06
- SOURCE GATE: EC-01
- SOURCE SECTION(S): §11, §12, §13
- REFERENCE OBJECT: SEM-MCD-001
- EVIDENCE STATUS: Mixed (VERIFIED / DERIVED / PARTIAL / TBD / NO EVIDENCE)
- REVISION: v0.1 (first compile)
- OPEN TBD COUNT: 7
- RELATED PAGE(S): A3-EC01-01, A3-EC01-03, A3-EC01-04, A3-EC01-05

## Do not imply

- Does not imply any 3D geometry has been created or modified — unknown engineering geometry remains unknown in 3D (§12 principle, preserved as guardrail GR-01).
- Does not imply a confirmed footprint, entrance-core spacing, roof/basement layout, or engineering-room/riser location.
- Does not imply HEAT-03 exists or is absent (guardrail GR-02).
- Does not imply a Direct/Edge connectivity topology decision.
- Does not imply the Connectivity gap items are answered, owned, or Beeline-committed.
- Does not restate or re-resolve A3-EC01-05's Conflict/TBD/Confidence register; the HEAT-03 fact is cross-referenced (CI-03), not re-opened as a new item.

## Guardrails

1. Unknown engineering geometry remains unknown in 3D — this EC-01 does not create or modify any 3D geometry. (§12)
2. HEAT-03 and all other HEAT-xx component IDs from BUILDING-01A remain unassigned ontology candidates, not instantiated facts. (§13)

Guardrail count: 2.

## Related pages

A3-EC01-01, A3-EC01-03, A3-EC01-04, A3-EC01-05.

## Design status / TECH QA status / owner approval

- Design status: PAGE SPEC READY (per Design System §18 A3 Production Status track — page spec content complete; not yet visually compiled).
- Tech QA status: NOT YET REVIEWED.
- Owner approval: NOT YET SUBMITTED.

## Status

- IR: FROZEN
- Page spec: PAGE_SPEC_READY
- Drawio created: 0
- PDF created: 0
- Next gate: DRAWIO COMPILE
