# A3-EC01-01 — Source Extract

## Control

- Page: `A3-EC01-01`
- Title: `Reference Building / Evidence Anchor`
- Stage: `P2_CONTEXT_REAL_BUILDING`
- Production No.: `P2-03`
- Case Assembly No.: `004`
- Status: `REVIEW`
- Allowed source: `EC-01_REAL_MCD_BASELINE_SEM-MCD-001_v0.3_REVIEW.md`
- Source SHA-256: `FE935FB0C81F375F252EEB5BE8A52915F34D07DADDC6B2774FDD5EA16F5B5E01`
- Source scope read: identity, area taxonomy, geometry, engineering-system existence, conflicts/TBD, site validation, and 3D-readiness sections only

## Reference anchor

`SEM-MCD-001` is the assigned HouseMaster reference identifier for the real building at Semey, Shakarima 13A. It is not a BTI fact and does not replace cadastral or inventory identifiers.

## Verified facts used by this page

| ID | Fact | Status | Source reference |
|---|---|---|---|
| VF-01 | Current address: Semey, Shakarima 13A | VERIFIED | EC-01 §3 / §14 |
| VF-02 | Cadastral number is documented in the EC-01 identity record | VERIFIED | EC-01 §3 / §14 |
| VF-03 | BTI case number: 209 | VERIFIED | EC-01 §3 / §14 |
| VF-04 | Storeys: 9 | VERIFIED | EC-01 §3 / §14 |
| VF-05 | Central heating system existence | VERIFIED | EC-01 §7 / §14 |
| VF-06 | Cold-water system existence | VERIFIED | EC-01 §7 / §14 |
| VF-07 | Hot-water system existence | VERIFIED | EC-01 §7 / §14 |
| VF-08 | Sewer system existence | VERIFIED | EC-01 §7 / §14 |
| VF-09 | Power-supply system existence | VERIFIED | EC-01 §7 / §14 |
| VF-10 | Lift system existence | VERIFIED | EC-01 §7 / §14 |

Verified fact count for this page: **10**.

## Partial, disputed, and unresolved items

| ID | Item | Status | Required closure / validation |
|---|---|---|---|
| U-01 | Exact building footprint | TBD | Survey / authoritative plan |
| U-02 | Full stepped/non-rectangular geometry and dimensions | PARTIAL | Field measurement / authoritative geometry |
| U-03 | HEAT-03 | NO EVIDENCE | Source-backed evidence or explicit rejection |
| U-04 | Apartment count: 81 versus 78 | DISPUTED / OPEN | Resolve `CONFLICT-005` |
| U-05 | Land-letter mismatch | OPEN | Resolve `CONFLICT-004` |
| U-06 | Basement / technical-space plan and height | TBD | Site validation / authoritative plan |
| U-07 | Engineering-node and component locations | TBD | Site survey / engineering documentation |
| U-08 | Observation-point and device mounting locations / constraints | TBD | Site survey; no installed devices confirmed |
| U-09 | Connectivity feasibility at candidate points | TBD | Site survey; do not select Direct or Edge topology |
| U-10 | Facade / elevations | TBD | Authoritative elevations or field capture |
| U-11 | Inventory number and year confirmation | PARTIAL / TBD | Confirm source identity records |
| U-12 | Source-register file content | TBD | Validate `TBD-009` source-register content |

Open/TBD item count for this page: **12**.

## Area taxonomy — subordinate context only

The owner-approved taxonomy is preserved without re-derivation:

- `1,248 m²` — Total Useful Building Area; assigned taxonomy.
- `550 m²` — Common/Shared Building Area; assigned taxonomy.
- `6,403.80 m²` — cadastral Building Area; verified figure with owner-approved category.
- `≈15,020 m²` — Adjacent/Associated Territory; partial figure with owner-approved category.

These figures are not treated as conflicting and none establishes the exact building footprint.

## Engineering-system existence boundary

Nine system rows are documented in EC-01: existence is `VERIFIED` for 6, `PARTIAL` for 1, and `TBD` for 2. All specific component/node locations remain `TBD`; confirmed component/node locations = `0`. This page uses the six verified existence facts only as evidence anchors and does not infer topology or location.

## Provenance model

Every page claim must retain this chain:

`CLAIM → SOURCE REFERENCE → CONFIDENCE → VALIDATION STATUS`

Assigned HouseMaster identifiers, verified document facts, derived values, partial facts, disputes, and TBD items must remain visibly distinct. Validation may update status only through new source-backed evidence or site inspection; visual rendering cannot promote confidence.

## Site validation and 3D boundary

- Site inspection is required to close footprint, basement, facade, engineering-node, observation-point/device-placement, and connectivity-feasibility gaps.
- Photo/documentary evidence must retain timestamp, actor/source, object context, and attachment provenance where available; missing fields remain unresolved.
- 3D or semantic mapping may represent only evidence-backed geometry and explicitly marked unknowns.
- `3D MODEL ≠ VERIFIED AS-BUILT GEOMETRY`.

## Generic-template distinction

`VALIDATED REFERENCE BUILDING ≠ GENERIC TEMPLATE`

SEM-MCD-001 may support a repeatable MCD pattern only after facts, provenance, unknowns, and validation gates remain attached. Generic abstraction cannot overwrite building-specific evidence or unresolved items.

## Guardrails

1. `DOCUMENTED FACT ≠ VERIFIED AS-BUILT CONDITION`
2. `AREA TAXONOMY ≠ BUILDING FOOTPRINT`
3. `SYSTEM EXISTS ≠ COMPONENT LOCATION KNOWN`
4. `CANDIDATE DEVICE / OBSERVATION POINT ≠ INSTALLED DEVICE`
5. `VALIDATED REFERENCE BUILDING ≠ GENERIC TEMPLATE`

