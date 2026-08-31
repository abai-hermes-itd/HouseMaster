# A3-EC03-04 — PAGE SPEC

## Control

| Field | Value |
|---|---|
| Page ID / Graph ID | A3-EC03-04 |
| Production / assembly | P4-02 / 018 |
| Canonical title | Direct vs Edge Matrix |
| Source gate / section | EC-03 / §28 |
| Source linkage status | LINKED |
| Primary page type | PT-05 COMPARISON |
| Secondary characteristic | NONE |
| IR type | CRITERION_BY_ALTERNATIVE_COMPARISON_MATRIX |
| IR status | FROZEN |
| Page spec status | PAGE_SPEC_READY |
| Evidence status | CONCEPTUAL |
| Drawio / PDF | NOT CREATED / NOT CREATED |

## Purpose

Compare Direct Connectivity and Edge Aggregation across the fifteen canonical EC-03 criteria using the source's `LOW / MEDIUM / HIGH / TBD` vocabulary and short reasoning, without recommending or selecting either topology and without introducing cost figures.

## Primary engineering question

**How do Direct Connectivity and Edge Aggregation compare across the fifteen canonical criteria, while preserving both as unselected architectural alternatives?**

## One-sentence thesis

Fifteen criteria are compared; no topology winner is declared.

## A3 landscape intent

- Format: A3 landscape technical publication.
- Primary layout: `6 + 6` comparison logic expressed as a full-width three-column matrix: criterion, Direct, Edge.
- Density: high enough to preserve all fifteen rows, but no row may be removed, merged, reordered or reduced to a rating without its source reasoning.
- Production tokens: reference A3-P0 Design System §33 by name only.

## Primary visual

One dominant 15-row comparison matrix with exactly three semantic columns:

1. Criterion.
2. Direct Connectivity.
3. Edge Aggregation.

The Direct and Edge columns must have equal visual weight. Neither may be positioned, colored or annotated as preferred, default, selected or deployed.

## Reading direction

Top to bottom by canonical criterion order; within each row, left to right from criterion to Direct and Edge values. Direct and Edge are read in parallel, not sequentially.

## Frozen row order

1. Operator-facing connectivity identity count.
2. Device independence.
3. Local power dependency.
4. Buffering.
5. Aggregation.
6. Physical distribution.
7. Maintenance complexity.
8. Lifecycle complexity.
9. Failure-domain size.
10. Single-point-of-failure exposure.
11. Local protocol dependency.
12. Operator visibility.
13. Site-survey dependency.
14. Scalability.
15. Replacement impact.

Render the exact Direct and Edge values and reasoning from the IR. Preserve `MEDIUM–HIGH`, `HIGHER`, `NONE`, `Not applicable` and `TBD` where the source uses them; do not normalize them into an invented scoring system.

## Semantic hierarchy

1. Canonical title and thesis.
2. Equal Direct / Edge alternative headers with shared status `CO-APPLICABLE / NOT SEQUENTIAL / NOT SELECTED`.
3. Fifteen-row comparison matrix.
4. Four-item open/TBD panel.
5. Rating vocabulary legend and four guardrails.
6. Reference/provenance footer.

## Alternative and identity separation

- Direct: `PLAUSIBLE ALTERNATIVE`.
- Edge: `PLAUSIBLE ALTERNATIVE`.
- Operator-facing connectivity identity count is a comparative architecture property, not an inventory.
- `one per device` and `one per aggregation group` do not instantiate a device, connectivity identity, SIM/eSIM, aggregation function or gateway.
- Do not create or place `EDGE-01`.

## Responsibility separation

- Beeline remains `CONNECTIVITY / TRANSPORT PARTNER`; operator-facing connectivity identity and operator visibility are the source-linked criteria relevant to its domain.
- HouseMaster remains `INDEPENDENT DOMAIN LAYER / SYSTEM OF RECORD`; the matrix does not give transport ownership of engineering interpretation, evidence validity or defect classification.
- Responsibility context must remain subordinate to the comparison matrix.
- Do not render the Trust/API boundary or HouseMaster integration functions; they are not part of the EC-03 §28 comparison.

## Data / control / operations treatment

- Data plane is not a primary visual on this page.
- Control plane remains `NOT ENABLED BY DEFAULT`; remote actuation is out of scope.
- Operations relevance appears only through the source rows for maintenance complexity, lifecycle complexity, operator visibility and replacement impact.
- Do not invent Beeline internal implementation.

## Supporting panels

### Rating vocabulary

Show a compact neutral legend: `LOW / MEDIUM / HIGH / TBD`, plus a note that the matrix uses source-preserved qualifiers and reasoning rather than a calculated score or severity heatmap.

### Open / TBD panel

Show exactly four unresolved items:

1. `EC03-04-TBD-01` — Edge local-power dependency exact value; site survey required.
2. `EC03-04-TBD-02` — Edge buffering placement; joint device/integration validation required.
3. `EC03-04-TBD-03` — unspecified Edge local link and site feasibility; joint validation required, including Beeline where its boundary is affected.
4. `EC03-04-TBD-04` — Direct versus Edge selection; not selected, later decision gate required.

Do not resolve these items or convert them into implementation assumptions.

### Guardrail band

Render exactly:

1. `NO TOPOLOGY WINNER DECLARED`.
2. `NO TOPOLOGY RECOMMENDED OR SELECTED`.
3. `NO COST FIGURE USED`.
4. `ARCHITECTURAL OPTION ≠ DEPLOYMENT DECISION`.

## Failure-domain treatment

The failure-domain-size and single-point-of-failure rows remain in the matrix. The Edge failure-domain row may carry the compact source cross-reference `RELATED: A3-EC03-06 / EC-03 §29 F-03`.

Do not reproduce the seven failure domains or turn this page into A3-EC03-06.

## Adjacent-page differentiation

- `A3-EC03-01` — connectivity entry architecture; not repeated.
- `A3-EC03-02` — Direct reference flow; compared here but not repeated or selected.
- `A3-EC03-03` — Edge reference flow; compared here but not repeated or instantiated.
- `A3-EC03-06` — detailed failure domains; only a compact cross-reference is allowed.

## Reference object

Show in the provenance/footer, not as a device diagram:

- `SEM-MCD-001 — Semey, Shakarima 13A`.
- Installed devices: `0 CONFIRMED`.
- Actual installed-device presence: `NOT ESTABLISHED`.
- `0 CONFIRMED ≠ PROVED ABSENCE`.

## Production-token references

- Page geometry: `PAGE-A3-LANDSCAPE`, standard margin/grid/title/provenance bands.
- Type: `TYPE-H1`, `TYPE-H2`, `TYPE-H3`, `TYPE-TABLE`, `TYPE-ANNOTATION`, `TYPE-STATUS`, `TYPE-FOOTER`.
- Status: `STATUS-PROPOSED`, `STATUS-TBD`, `STATUS-TBD-BEELINE` only where applicable.
- Domain: `DOMAIN-BEELINE`, `DOMAIN-HOUSEMASTER` for compact responsibility context only.
- Line/table: `LINE-TABLE`; do not use flow arrows as the primary visual.

## Source / provenance footer

Show:

- `PAGE: A3-EC03-04`
- `GRAPH: A3-EC03-04`
- `PRODUCTION: P4-02`
- `ASSEMBLY: 018`
- `SOURCE GATE: EC-03`
- `SOURCE SECTION: §28`
- `REFERENCE: SEM-MCD-001`
- `EVIDENCE: CONCEPTUAL`
- `IR: REVIEW`
- `PAGE SPEC: REVIEW`
- `TYPE: PT-05 COMPARISON`
- `CRITERIA: 15`
- `ALTERNATIVES: 2`
- `OPEN/TBD: 4`
- `GUARDRAILS: 4`
- `RELATED: A3-EC03-01 / 02 / 03 / 06`

## Visual exclusions

- No topology flow, network map, deployment diagram, gateway diagram, sensor/device icons, SIM inventory, RF result or site topology.
- No winner badge, recommendation, ranking total, weighted score, cost figure or severity heatmap.
- No concrete API, payload, protocol, schema, credentials, certificates, APN or VPN design.
- No Drawio, PDF, 3D, ALAU AI, finance, monetization, marketing, resident UX, CAPEX or predictive analytics at this gate.

## Gate

NEXT GATE: SEMANTIC REVIEW
