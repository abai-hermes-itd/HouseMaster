# A3-EC01-05 — Page Spec

## Control

- Page ID: A3-EC01-05
- Title: Conflicts / TBDs / Confidence
- Stage: P2_CONTEXT_REAL_BUILDING
- Production No.: P2-05
- Case Assembly No.: 008
- IR type: REGISTER / CONFIDENCE MATRIX
- Page spec status: PAGE_SPEC_READY
- Owner approval: APPROVED FOR VISUAL COMPILATION
- Graph ID: A3-EC01-05-CONFIDENCE-REGISTER
- Reference building: SEM-MCD-001 — Semey, Shakarima 13A

## Purpose

Show unresolved, disputed, partial, and evidence-limited facts of SEM-MCD-001 as controlled engineering states with explicit sources, closure actions, and downstream restrictions.

## Core thesis

AN OPEN ITEM
≠
A DATA ERROR

A conflict, TBD, partial fact, or evidence-limited claim remains controlled until new source-backed evidence or field validation closes it.

## Primary visual — Conflict / TBD / Confidence Register

Render exactly 12 rows with these columns:

ITEM
→ CURRENT STATUS
→ CONFIDENCE
→ WHY OPEN
→ REQUIRED CLOSURE
→ DOWNSTREAM RESTRICTION

The source reference and responsible validation layer may be shown as compact secondary text within the row or in an adjacent annotation rail. No row may imply severity.

### Required rows

1. CI-01 — EXACT BUILDING FOOTPRINT — NOT ESTABLISHED / TBD
2. CI-02 — STEPPED / NON-RECTANGULAR GEOMETRY — PARTIAL
3. CI-03 — HEAT-03 — NO EVIDENCE
4. CI-04 — APARTMENT COUNT 81 VS 78 — DISPUTED / OPEN
5. CI-05 — LAND-LETTER MISMATCH — OPEN
6. CI-06 — BASEMENT / TECHNICAL-SPACE PLAN + HEIGHT — TBD
7. CI-07 — ENGINEERING NODE / COMPONENT LOCATIONS — TBD
8. CI-08 — OBSERVATION / DEVICE LOCATIONS AND INSTALLATION CONSTRAINTS — TBD
9. CI-09 — CONNECTIVITY FEASIBILITY AT CANDIDATE POINTS — TBD
10. CI-10 — FACADE / ELEVATIONS — TBD
11. CI-11 — INVENTORY NUMBER / YEAR CONFIRMATION — PARTIAL / TBD
12. CI-12 — SOURCE-REGISTER CONTENT — TBD

All row details, sources, closure actions, impacts, and downstream restrictions are frozen in the Graph IR.

## Active conflicts

- CONFLICT-004 — land-letter reference number/date mismatch — OPEN.
- CONFLICT-005 — apartment count 81 vs 78 — OPEN.

Active conflict count: 2.

Do not resolve either conflict visually and do not choose one value.

## Secondary visual — Confidence / Evidence States

The full vocabulary contains 7 source-supported states:

- VERIFIED
- DERIVED
- PARTIAL
- ASSIGNED
- DISPUTED / OPEN
- TBD
- NO EVIDENCE

The unresolved-item ladder must emphasize:

VERIFIED
PARTIAL
DISPUTED / OPEN
TBD
NO EVIDENCE

This is not a severity ladder. It is an epistemic/evidence-state legend. ASSIGNED and DERIVED remain visible as distinct vocabulary tokens but must not be confused with direct verification.

## Tertiary visual — Resolved / Not-a-conflict

Show both resolved non-conflict records:

1. 1,248 m² ≠ 550 m²
   - TOTAL USEFUL BUILDING AREA vs COMMON / SHARED BUILDING AREA
   - CONFLICT: NO

2. 6,403.8 m² ≠ ≈15,020 m²
   - CADASTRAL BUILDING AREA vs ADJACENT / ASSOCIATED TERRITORY
   - CONFLICT: NO

Resolved non-conflict count: 2.

Area-taxonomy conflict active: NO.

## Provenance rail

CLAIM
→ SOURCE
→ STATUS
→ CONFIDENCE
→ VALIDATION ACTION

No visual representation may promote confidence.

## Required downstream restrictions

- Footprint TBD → do not treat 3D as verified as-built geometry.
- Engineering-node location TBD → do not assign installation location.
- Observation/device location TBD → do not claim installed device.
- Connectivity feasibility TBD → do not select Direct or Edge topology.
- Apartment-count conflict OPEN → do not silently choose 78 or 81.
- HEAT-03 NO EVIDENCE → do not infer existence or absence.

## Guardrails

1. OPEN ITEM ≠ DATA ERROR
2. UNKNOWN ≠ ABSENT
3. PARTIAL ≠ VERIFIED
4. NO EVIDENCE ≠ PROVED ABSENCE
5. VISUAL CONFIDENCE ≠ SOURCE CONFIDENCE

## Supporting rules

- OPEN CONFLICT ≠ OWNER DECISION
- TBD LOCATION ≠ NO PHYSICAL COMPONENT
- ASSIGNED TAXONOMY ≠ VERIFIED GEOMETRY

## Counts

- Open items: 12
- Active conflicts: 2
- Resolved non-conflicts: 2
- Confidence states: 7
- Guardrails: 5

## Rendering constraints for the next gate

- Register is primary.
- Confidence legend is secondary and must not read as severity.
- Resolved area-taxonomy note is tertiary.
- Preserve all 12 rows.
- No status promotion.
- No silent conflict resolution.
- No geometry, component location, device, or topology inference.
- No severity or risk score.
- No Drawio, PDF, or 3D at this gate.

## Status

- IR: REVIEW
- Page spec: REVIEW
- Drawio created: 0
- PDF created: 0
- Next gate: SEMANTIC REVIEW
