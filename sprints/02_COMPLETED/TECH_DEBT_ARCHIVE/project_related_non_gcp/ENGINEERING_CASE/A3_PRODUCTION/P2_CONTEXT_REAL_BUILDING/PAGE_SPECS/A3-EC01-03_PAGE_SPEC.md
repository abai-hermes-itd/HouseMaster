# A3-EC01-03 — Page Spec

## Control

- Page ID: A3-EC01-03
- Title: Area Taxonomy
- Stage: P2_CONTEXT_REAL_BUILDING
- Production No.: P2-04
- Case Assembly No.: 006
- IR type: MATRIX / TAXONOMY
- Page spec status: PAGE_SPEC_READY
- Owner approval: APPROVED FOR VISUAL COMPILATION
- Graph ID: A3-EC01-03-AREA-TAXONOMY
- Reference building: SEM-MCD-001 — Semey, Shakarima 13A

## Purpose

Explain the four distinct area categories used for SEM-MCD-001 and prevent their values from being misread as competing measurements, arithmetic components, footprint values, verified geometry, or a confirmed legal/site boundary.

## Canonical thesis

THESE FOUR FIGURES
≠
FOUR COMPETING MEASUREMENTS OF ONE AREA

They describe different semantic area categories.

## Primary visual — Area Taxonomy Matrix

Render four rows and preserve the following column logic:

CATEGORY
→ VALUE
→ SEMANTIC MEANING
→ SOURCE / STATUS
→ WHAT IT DOES NOT MEAN

### AREA-01

- Value: 1,248 m²
- Category: TOTAL USEFUL BUILDING AREA
- Meaning: Total useful area of the building as fixed in the approved taxonomy.
- Source / status: OWNER-APPROVED TAXONOMY / ASSIGNED
- Does not mean: Building footprint; common area only; land parcel area.

### AREA-02

- Value: 550 m²
- Category: COMMON / SHARED BUILDING AREA
- Meaning: Common/shared areas including entrances, stair landings and flights, lift shafts, technical rooms, and basement according to the approved area semantics.
- Source / status: OWNER-APPROVED TAXONOMY / ASSIGNED
- Does not mean: Total useful building area; exact basement area; building footprint.

### AREA-03

- Value: 6,403.8 m²
- Category: CADASTRAL BUILDING AREA
- Meaning: Cadastral building-area category associated with the building record.
- Source / status: SRC-006 / VERIFIED FIGURE; CATEGORY PER OWNER-APPROVED TAXONOMY
- Does not mean: Exact footprint unless separately confirmed; adjacent territory; total useful area.

### AREA-04

- Value: 15,020 m²
- Category: ADJACENT / ASSOCIATED TERRITORY
- Meaning: Adjacent/associated territory category linked to the building context.
- Source / status: SRC-001/002 / PARTIAL; CATEGORY PER OWNER-APPROVED TAXONOMY
- Source value qualifier: Approximate in EC-01.
- Does not mean: Building area; building footprint; confirmed legal parcel boundary unless the source explicitly proves it.

## Secondary visual — Relationship / Non-equivalence Model

Show distinct semantic categories without arithmetic hierarchy:

- TOTAL USEFUL AREA ≠ COMMON / SHARED AREA
- CADASTRAL BUILDING AREA ≠ ADJACENT TERRITORY
- ALL FOUR AREA CATEGORIES ≠ EXACT BUILDING FOOTPRINT
- ANY AREA VALUE ≠ VERIFIED GEOMETRY

Explicitly prohibit:

- 1,248 + 550 = 6,403.8
- 6,403.8 + … = 15,020
- any ratio or summation not already source-approved

The 6,403.8 m² and 15,020 m² values are not conflicting. They belong to different cadastral area categories.

## Tertiary visual — Footprint / Geometry Open Items

- EXACT BUILDING FOOTPRINT AREA = NOT ESTABLISHED / TBD
- STEPPED / NON-RECTANGULAR GEOMETRY = PARTIAL
- Shape evidence exists; the complete dimension set does not.
- AUTHORITATIVE GEOMETRY / SURVEY REQUIRED

No area figure may close footprint, coordinates, dimensions, facade, basement, or site-boundary questions.

## Provenance rail

AREA CLAIM
→ CATEGORY
→ SOURCE
→ STATUS
→ VALIDATION REQUIREMENT

The rail must keep ASSIGNED, PARTIAL, and VERIFIED visibly distinct. Owner-approved category assignment does not promote source confidence. A verified figure does not verify geometry.

## Required guardrails

1. AREA CATEGORY ≠ FOOTPRINT
2. CADASTRAL BUILDING AREA ≠ ADJACENT TERRITORY
3. TOTAL USEFUL AREA ≠ COMMON / SHARED AREA
4. AREA VALUE ≠ VERIFIED GEOMETRY
5. TAXONOMY ≠ SITE SURVEY

## Counts and statuses

- Area category count: 4
- Guardrail count: 5
- Footprint status: NOT ESTABLISHED / TBD
- Geometry status: PARTIAL
- Conflict between 6,403.8 and 15,020: NO
- Provenance model included: YES

## Rendering constraints for the next gate

- Matrix is primary.
- Non-equivalence model is secondary.
- Footprint/geometry open-items panel is tertiary but visually prominent.
- Do not imply conflict between the four values.
- Do not imply arithmetic decomposition or nesting.
- Do not derive ratios.
- Do not infer building footprint, site boundary, geometry, or 3D.
- Do not promote ASSIGNED or PARTIAL to VERIFIED.
- Do not create a Drawio, PDF, or 3D artifact at this gate.

## Status

- IR: REVIEW
- Page spec: REVIEW
- Drawio created: 0
- PDF created: 0
- Next gate: SEMANTIC REVIEW
