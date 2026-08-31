# A3-EC01-06 — Source Extract

## Control

- Page: A3-EC01-06
- Title: Site Survey & 3D Readiness Handoff
- Stage: P2_CONTEXT_REAL_BUILDING
- Production No.: P2-06
- Case assembly No.: NOT YET ASSIGNED (page not yet compiled to Assembly/PDF)
- Status: REVIEW
- Reference building: SEM-MCD-001 — Semey, Shakarima 13A
- Allowed source: EC-01_REAL_MCD_BASELINE_SEM-MCD-001_v0.3_REVIEW.md
- Source scope read: §11 (site survey data gap list), §12 (3D usability matrix), §13 (reference component candidate HEAT-03)
- Source read outside required EC-01 context: NO

## Core thesis

3D massing may proceed on floor count and footprint shape alone; nothing else is ready.

## Primary engineering question

What EC-01 site-survey and MCD-baseline facts are actually usable for 3D massing and pilot work today, and which remain blocked pending field validation?

## Primary semantic unit — 3D Usability Matrix (§12)

| Order | Fact | Direct use in Blender? | Use as constraint? | Needs field confirmation? | Do not model |
|---:|---|---|---|---|---|
| 1 | 9 floors | Yes | — | No | — |
| 2 | Stepped (non-rectangular) footprint outline, Image 3 | No (dimensions incomplete) | Yes — DERIVED constraint on massing shape, supersedes a simple-rectangle assumption | Yes, before final massing | — |
| 3 | Footprint area (site-coverage) | No — not established | No — 1,248 m² and 550 m² are building-area sub-categories (useful / common-shared), not footprint values, per owner-approved taxonomy; do not back-calculate a footprint from either figure or from the 6,403.80 m² / ≈15,020 m² cadastral-category figures | Yes — requires a dimensioned plan or field survey | Do not model any area-derived footprint |
| 4 | 3 entrance/staircase cores | No exact coordinates | Yes, as section-count constraint | Yes (exact spacing) | — |
| 5 | Floor plan room layout (SRC-004 photographed sheets) | Partially — legible portions may be digitized as a DERIVED reference for one representative floor | Yes | Yes, for illegible dimensions | — |
| 6 | Roof/basement | No | No | Yes | Do not invent |
| 7 | Engineering rooms/risers | No | No | Yes | Do not invent — no location evidence exists |

Primary semantic unit count: 7.
Rows requiring field confirmation: 6 of 7 (all except "9 floors").

Source principle (verbatim): "Principle honored: unknown engineering geometry remains unknown in 3D. This EC-01 does not create or modify any 3D geometry."

## Secondary semantic unit — Site Survey Data Gap List (§11)

| Category | Gap items (verbatim from source) |
|---|---|
| Physical | Exact entrance layout and numbering vs. the documented "3 подъезда"; basement access point(s); technical-room locations; roof access; verification of the stepped footprint outline (Image 3) against as-built conditions |
| Engineering | Heat entry and metering-node location; water entry/meter location; electrical main board location; sewer collector/outlet location; confirmation of gas presence/absence |
| Device deployment | Mounting positions, available power, environmental conditions, access restrictions — none currently known |
| Connectivity | Cellular signal conditions, basement/technical-room penetration, candidate EDGE-01 location, direct-cellular feasibility — all TBD WITH BEELINE / SITE SURVEY |
| Documentation | A legible cover-page confirmation of inventory № 23161 and year built 1978; an original dimensioned site/footprint plan or field survey to establish actual site-coverage geometry (TBD-001) |

Secondary semantic unit count: 5 (categories).

Note (CORR-02, source-verbatim): the area-taxonomy reconciliation formerly requested under Documentation (former §5.1 vs §5.2, former GAP-001) is resolved per the owner-approved taxonomy in §0b/§5 and is no longer a documentation gap.

## Tertiary semantic unit — Reference Component Candidate HEAT-03 (§13)

- Question (source-verbatim): "Can a real `HEAT-03` (or equivalent heating mixing/elevator node) be identified in SEM-MCD-001 from primary evidence reviewed this session?"
- Answer (source-verbatim): "NO EVIDENCE."
- Supporting detail: the only primary evidence touching heating is the marked "Отопление" (Центральное отопление) row on the SRC-004/Image 5 systems checklist, confirming existence of a central heating connection only. No basement plan, mixing-node location, or riser topology was legible in any reviewed source.
- Source-verbatim boundary: "`HEAT-03` and all other `HEAT-xx` component IDs from BUILDING-01A remain unassigned ontology candidates, not instantiated facts, per §13 of the task instructions." No alternative, more clearly documented component candidate was identified either.

Tertiary semantic unit count: 1.

Cross-reference: this same HEAT-03 / NO EVIDENCE fact is independently tracked as item `CI-03` in `A3-EC01-05_SOURCE_EXTRACT.md` (EC-01 §13). It is cited here, not re-registered as a new open item.

## Evidence / status vocabulary present on this page

- VERIFIED — 9 floors (direct Blender use, no confirmation needed).
- DERIVED — stepped footprint treated as a derived massing constraint; representative floor plan treated as a derived reference from legible portions.
- PARTIAL — footprint area and floor-plan dimensions are partially evidenced, not established.
- TBD — entrance-core spacing, roof/basement, engineering-room/riser locations, all §11 gap items.
- NO EVIDENCE — HEAT-03.

Evidence / provenance status count: 5.

## Open / TBD inventory (as presented on this page)

1. Stepped footprint outline — needs field confirmation before final massing.
2. Footprint area / site-coverage geometry — needs a dimensioned plan or field survey.
3. Entrance/staircase core exact spacing — needs field confirmation.
4. Floor plan room layout — illegible dimensions need field confirmation.
5. Roof/basement — needs field confirmation; do not invent.
6. Engineering rooms/risers — needs field confirmation; do not invent, no location evidence exists.
7. HEAT-03 reference candidate — NO EVIDENCE; remains an unassigned ontology candidate.

Open/TBD item count: 7.

## Validation requirements

Each of the 6 matrix rows marked "Needs field confirmation? = Yes" states an explicit field-validation requirement before that fact may be used beyond its current constraint role. Validation requirement count: 6.

## Guardrails (source-verbatim)

1. "Unknown engineering geometry remains unknown in 3D. This EC-01 does not create or modify any 3D geometry." (§12)
2. "`HEAT-03` and all other `HEAT-xx` component IDs from BUILDING-01A remain unassigned ontology candidates, not instantiated facts." (§13)

Guardrail count: 2.

## Explicit exclusions

- No 3D geometry is created or modified by this page or its source.
- No engineering-room, riser, or roof/basement location is invented.
- No footprint is back-calculated from area-taxonomy figures.
- HEAT-03 existence or absence is not inferred.
- No topology, deployment, or installation decision is made.
- No Drawio, PDF, or 3D output at this gate.

## Provenance

All facts, the usability matrix, the gap list, the HEAT-03 finding, and both guardrails trace exclusively to EC-01 §11, §12, and §13.

`NEXT GATE = SEMANTIC REVIEW`
