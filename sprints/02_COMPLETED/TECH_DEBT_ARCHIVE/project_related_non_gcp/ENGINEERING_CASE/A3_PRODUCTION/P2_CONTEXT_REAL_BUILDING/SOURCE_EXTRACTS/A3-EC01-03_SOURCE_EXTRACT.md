# A3-EC01-03 — Source Extract

## Control

- Page: A3-EC01-03
- Title: Area Taxonomy
- Stage: P2_CONTEXT_REAL_BUILDING
- Production No.: P2-04
- Case Assembly No.: 006
- Status: REVIEW
- Reference building: SEM-MCD-001 — Semey, Shakarima 13A
- Allowed source: EC-01_REAL_MCD_BASELINE_SEM-MCD-001_v0.3_REVIEW.md
- Source scope read: §0b, §4, §5, §12, §14, §15, §16, §17 and the corresponding final-report statements
- Source read outside required EC-01 context: NO

## Canonical interpretation

The four headline figures are four distinct semantic area categories. They are not four competing measurements of one area, are not an arithmetic decomposition, and do not establish the exact building footprint.

## Area records

### AREA-01

- Value: 1,248
- Unit: m²
- Canonical label: TOTAL USEFUL BUILDING AREA
- Semantic scope: Total useful area of the building as fixed in the owner-approved taxonomy.
- Source status: ASSIGNED
- Provenance: Owner-approved project-baseline taxonomy, EC-01 CORR-02 (§0b, §5.0, BF-026)
- What it means: Total useful area of the building under the approved taxonomy.
- What it does not mean: Building footprint; common area only; land parcel area.
- Validation status: TAXONOMY FIXED; NOT INDEPENDENTLY RE-DERIVED
- Unresolved items: Exact footprint remains TBD independently.

### AREA-02

- Value: 550
- Unit: m²
- Canonical label: COMMON / SHARED BUILDING AREA
- Semantic scope: Entrances, stair landings and flights, lift shafts, technical rooms, and basement according to the approved area semantics.
- Source status: ASSIGNED
- Provenance: Owner-approved project-baseline taxonomy, EC-01 CORR-02 (§0b, §5.0, BF-027)
- What it means: Common/shared building-area category under the approved taxonomy.
- What it does not mean: Total useful building area; exact basement area; building footprint.
- Validation status: TAXONOMY FIXED; NOT INDEPENDENTLY RE-DERIVED
- Unresolved items: Exact basement area and exact footprint remain TBD.

### AREA-03

- Value: 6,403.8
- Unit: m²
- Canonical label: CADASTRAL BUILDING AREA
- Semantic scope: Cadastral building-area category associated with the building record.
- Source status: VERIFIED FIGURE; CATEGORY PER OWNER-APPROVED TAXONOMY
- Provenance: SRC-006, official condominium-registration certificate; EC-01 §5.1, BF-010; category fixed by CORR-02
- What it means: The verified 6,403.8 m² figure in the cadastral building-area category.
- What it does not mean: Exact footprint unless separately confirmed; adjacent territory; total useful area.
- Validation status: FIGURE VERIFIED; FOOTPRINT NOT VALIDATED
- Unresolved items: Exact footprint/site-coverage geometry remains TBD-001.

### AREA-04

- Value: 15,020
- Unit: m²
- Canonical label: ADJACENT / ASSOCIATED TERRITORY
- Semantic scope: Adjacent/associated territory category linked to the building context.
- Source status: PARTIAL; CATEGORY PER OWNER-APPROVED TAXONOMY
- Provenance: SRC-001/002 compiled passport family; EC-01 §5.2, BF-011; category fixed by CORR-02
- Source value qualifier: Approximate in EC-01 (≈15,020)
- What it means: The adjacent/associated territory category in the approved taxonomy.
- What it does not mean: Building area; building footprint; confirmed legal parcel boundary unless explicitly proven by source.
- Validation status: PARTIAL; LEGAL BOUNDARY NOT ESTABLISHED BY THIS VALUE
- Unresolved items: Exact legal/site boundary and exact footprint are not established by this figure.

## Non-conflict finding

- 6,403.8 m² and 15,020 m² are different cadastral area categories.
- Conflict between 6,403.8 and 15,020: NO.
- EC-01 CONFLICT-002 is resolved as DIFFERENT CADASTRAL AREA CATEGORIES.
- No arithmetic reconciliation is required.

## Footprint and geometry

- EXACT BUILDING FOOTPRINT AREA: NOT ESTABLISHED / TBD (TBD-001).
- STEPPED / NON-RECTANGULAR GEOMETRY: PARTIAL.
- Shape evidence exists, but the full dimension set is incomplete.
- No area value on this page closes footprint, coordinates, dimensions, facade, basement, or site-boundary questions.
- Authoritative geometry or field survey is required.

## Provenance principle

AREA CLAIM
→ CATEGORY
→ SOURCE
→ STATUS
→ VALIDATION REQUIREMENT

ASSIGNED, PARTIAL, and VERIFIED must remain separate. A category decision does not promote a source figure, and a verified figure does not verify geometry.

## Prohibited inferences

- No ratios.
- No summation.
- No hidden geometry.
- No footprint derivation.
- No site-boundary derivation.
- No equation such as 1,248 + 550 = 6,403.8.
- No equation such as 6,403.8 + … = 15,020.

## Required guardrails

1. AREA CATEGORY ≠ FOOTPRINT
2. CADASTRAL BUILDING AREA ≠ ADJACENT TERRITORY
3. TOTAL USEFUL AREA ≠ COMMON / SHARED AREA
4. AREA VALUE ≠ VERIFIED GEOMETRY
5. TAXONOMY ≠ SITE SURVEY

