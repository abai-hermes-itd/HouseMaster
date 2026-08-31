# A3-EC01-05 — Source Extract

## Control

- Page: A3-EC01-05
- Title: Conflicts / TBDs / Confidence
- Stage: P2_CONTEXT_REAL_BUILDING
- Production No.: P2-05
- Case Assembly No.: 008
- Status: REVIEW
- Reference building: SEM-MCD-001 — Semey, Shakarima 13A
- Allowed source: EC-01_REAL_MCD_BASELINE_SEM-MCD-001_v0.3_REVIEW.md
- Source scope read: geometry, site gaps, HEAT-03, master fact table, conflict register, TBD register, confidence summary, and owner-approved area-taxonomy resolutions
- Source read outside required EC-01 context: NO

## Core thesis

AN OPEN ITEM ≠ A DATA ERROR

A conflict, TBD, partial fact, or evidence-limited claim is a controlled engineering state until new source-backed evidence or field validation closes it.

## Confidence / status vocabulary

- VERIFIED
- DERIVED
- PARTIAL
- ASSIGNED
- DISPUTED / OPEN
- TBD
- NO EVIDENCE

These are epistemic/evidence states, not severity scores.

## Open / confidence register

| ID | Subject | Current value / statement | Status | Confidence | Source reference | Required closure | Downstream restriction |
|---|---|---|---|---|---|---|---|
| CI-01 | Exact building footprint | Not established | NOT ESTABLISHED / TBD | TBD | EC-01 §4; BF-008; TBD-001 | Authoritative geometry / field survey | Do not treat 3D as verified as-built geometry |
| CI-02 | Stepped / non-rectangular geometry | Shape evidenced; full dimension set incomplete | PARTIAL | PARTIAL | EC-01 §4; SRC-004 Image 3; BF-009 | Authoritative geometry / measurement | Do not finalize footprint geometry or massing dimensions |
| CI-03 | HEAT-03 | No component-level evidence | NO EVIDENCE | NO EVIDENCE | EC-01 §13 | Source-backed evidence or explicit rejection | Do not infer existence or absence |
| CI-04 | Apartment count | 81 vs 78 | DISPUTED / OPEN | DISPUTED / OPEN | EC-01 §3; BF-014; CONFLICT-005 | Resolve source conflict / authoritative record | Do not silently choose 78 or 81 |
| CI-05 | Land-letter mismatch | 02-457 / 07.08.2006 vs 02-454 / 08.09.2006 | OPEN | DISPUTED / OPEN | EC-01 §2; CONFLICT-004 | Authoritative cadastral / land documentation | Do not treat the secondary legal citation as confirmed |
| CI-06 | Basement / technical-space plan + height | Not established | TBD | TBD | EC-01 §11; TBD-003 | Site survey / authoritative plan | Do not model basement geometry or select a technical-space installation point |
| CI-07 | Engineering node / component locations | Not established | TBD | TBD | EC-01 §11; TBD-005 | Site survey / engineering documentation | Do not assign installation location |
| CI-08 | Observation / device locations and installation constraints | None known | TBD | TBD | EC-01 §11 | Site survey | Do not claim installed device or confirmed mounting location |
| CI-09 | Connectivity feasibility at candidate points | Not evaluated | TBD | TBD | EC-01 §10–§11 | Field/network validation with Beeline | Do not select Direct or Edge topology |
| CI-10 | Facade / elevations | Not established | TBD | TBD | EC-01 §11; TBD-004 | Authoritative elevations / field capture | Do not finalize facade proportions or geometry |
| CI-11 | Inventory number / year confirmation | 23161 / 1978 not independently primary-confirmed | PARTIAL / TBD | PARTIAL | EC-01 §3; BF-004; BF-005; TBD-008 | Confirm source identity records | Do not present both identity fields as fully verified |
| CI-12 | Source-register content | Artifact content unreadable / unvalidated | TBD | TBD | EC-01 §2 SRC-008; TBD-009 | Validate source-register artifact | Do not use the register to supersede or corroborate facts |

Open item count: 12.

## Active conflicts

1. CONFLICT-004 — land-letter reference number/date mismatch — OPEN.
2. CONFLICT-005 — apartment count 81 vs 78 — OPEN.

Active conflict count: 2.

## Resolved / not-a-conflict records

1. CONFLICT-001 — 1,248 m² and 550 m² — RESOLVED: TOTAL USEFUL BUILDING AREA vs COMMON / SHARED BUILDING AREA.
2. CONFLICT-002 — 6,403.8 m² and ≈15,020 m² — RESOLVED: CADASTRAL BUILDING AREA vs ADJACENT / ASSOCIATED TERRITORY.

Resolved non-conflict count: 2.

Area-taxonomy conflict active: NO.

## Area taxonomy boundary

- 1,248 m² = TOTAL USEFUL BUILDING AREA — ASSIGNED.
- 550 m² = COMMON / SHARED BUILDING AREA — ASSIGNED.
- 6,403.8 m² = CADASTRAL BUILDING AREA — VERIFIED FIGURE; category owner-approved.
- ≈15,020 m² = ADJACENT / ASSOCIATED TERRITORY — PARTIAL; category owner-approved.

None of these figures establishes exact footprint geometry.

## Confidence principle

CLAIM
→ SOURCE
→ STATUS
→ CONFIDENCE
→ VALIDATION ACTION

No visual representation may promote confidence.

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

