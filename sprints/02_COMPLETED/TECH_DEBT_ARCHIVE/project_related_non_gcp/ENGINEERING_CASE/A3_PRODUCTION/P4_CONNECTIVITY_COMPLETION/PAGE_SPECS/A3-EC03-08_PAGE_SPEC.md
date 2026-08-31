# A3-EC03-08 — PAGE SPEC

## Control

| Field | Value |
|---|---|
| Page ID / Graph ID | A3-EC03-08 |
| Production | P4-05 |
| Canonical title | Master Device & Connectivity Matrix |
| Source | EC-03 §33; direct definitions §§16–19 and §25 |
| Page type | PT-04 MASTER MATRIX |
| IR type | DEVICE_CONNECTIVITY_MASTER_MATRIX |
| IR status | FROZEN |
| Page spec status | PAGE_SPEC_READY |
| Drawio / PDF | NOT CREATED / NOT CREATED |

## Page purpose

Provide one complete engineering integration sheet for all 16 EC-03 device/connectivity candidates, preserving their 12 source-defined attribute dimensions and unresolved readiness/topology states.

## Primary engineering question

**What is the complete source-backed device-and-connectivity requirement signature for each of the 16 candidates, and which physical-readiness and topology uncertainties remain unresolved?**

## One-sentence thesis

All 16 candidates are conceptually ready, physically not ready, and remain uninstalled; Direct/Edge labels express plausibility only and select no topology.

## A3 information architecture

- Format: A3 landscape.
- Primary semantic structure: 16-row × 13-column master matrix.
- First column: primary candidate identity.
- Remaining 12 columns: secondary attribute dimensions.
- The page may be split into synchronized matrix bands at Drawio design time only if all 16 row identities remain aligned, the 13 canonical columns remain present exactly once, and no semantic split or new page ID is introduced.
- No final Drawio geometry is defined at this gate.

## Primary semantic structure

`DEVICE_CONNECTIVITY_CANDIDATE_RECORD` — 16 records in source order, `DEV-CAND-001` through `DEV-CAND-016`.

Each row must retain exactly one value for each secondary dimension:

1. OBS ID
2. Observable condition
3. Device Function set
4. Device Class
5. Traffic pattern
6. Uplink/downlink
7. Connectivity Profile ID
8. Pattern class
9. Store-and-forward
10. Reachability importance
11. Physical readiness
12. Conceptual architecture readiness

Relationship count: `16 × 12 = 192` record-to-attribute relationships.

## Secondary semantic structure

### Function-set legend

- `FSET-MEASURE`: `MEASURE / TIMESTAMP / BUFFER / STORE / FORWARD / REPORT STATUS`.
- `FSET-READ`: `READ INTERFACE / COUNT / TIMESTAMP / BUFFER / STORE / FORWARD / REPORT STATUS`.
- `FSET-DETECT`: `DETECT / TIMESTAMP / BUFFER / STORE / FORWARD / REPORT STATUS`.

### Pattern-class summary

- `DIRECT-FRIENDLY = 2`
- `EDGE-FRIENDLY = 5`
- `BOTH PLAUSIBLE = 8`
- `TBD = 1`
- `FINAL TOPOLOGY SELECTED = 0`

### Readiness summary

- Physical readiness: `L1 — NOT READY = 16`.
- Conceptual architecture readiness: `READY = 16`.
- Basement zone-existence-gated: `DEV-CAND-009 / 010 / 011`.
- Roof access-gated: `DEV-CAND-014`.

## Reading order

1. Canonical title, engineering question, and epistemic thesis.
2. Status legend distinguishing candidate, readiness, plausibility, TBD, and not-selected meanings.
3. Master matrix header from DEV ID through Conceptual architecture readiness.
4. Sixteen rows in canonical DEV order.
5. Pattern-class and readiness summaries.
6. Two Open/TBD items.
7. Eight guardrails.
8. Source/reference footer.

## Responsibility treatment

- Responsibility domain count: `0`.
- EC-03 §33 is provider-neutral and assigns no row to a Beeline or HouseMaster responsibility domain.
- Do not import Beeline internal architecture, HouseMaster integration functions, or ownership markings from other pages.
- Connectivity profiles remain provider-neutral requirements.

## Trust / Access boundary and planes

- Trust / Access / Integration Boundary: `NOT APPLICABLE`; do not render.
- DATA / CONTROL / OPERATIONS planes: `NOT APPLICABLE`; plane count `0`; do not render.

## Status treatment

| Status | Required presentation meaning |
|---|---|
| `CANDIDATE` | Not installed. |
| `L1 — NOT READY` | Physical readiness not established; not proof of absence. |
| `READY` | Conceptual architecture ready; not implemented or deployed. |
| `DIRECT-FRIENDLY` | Direct plausibility; not selection. |
| `EDGE-FRIENDLY` | Edge plausibility; not selection. |
| `BOTH PLAUSIBLE` | Both patterns plausible; co-applicable, not sequential, not selected. |
| `TBD` | Pattern class unresolved for DEV-CAND-014. |
| `NOT SELECTED` | No candidate has a final topology decision. |

Do not use ranking, weighted scoring, severity heatmaps, recommendation marks, winner colors, or deployment badges.

## Open/TBD treatment

Show exactly two aggregate unresolved items:

1. `EC03-08-TBD-01` — physical readiness / location across all 16 candidates = `L1 — NOT READY / NOT ESTABLISHED`; includes basement zone-existence gates and roof access gate; validation owner not established in assigned source scope.
2. `EC03-08-TBD-02` — final Direct/Edge topology selection = `NOT SELECTED`; `DEV-CAND-014` pattern class = `TBD`; validation owner not established in assigned source scope.

Do not resolve, assign owners, or add survey outcomes.

## Guardrail treatment

Render exactly eight guardrails:

1. `DEVICE CANDIDATE ≠ INSTALLED DEVICE`.
2. `L1 — NOT READY ≠ PROVED ABSENCE`.
3. `CONCEPTUAL ARCHITECTURE READY ≠ IMPLEMENTED OR DEPLOYED`.
4. `DIRECT-FRIENDLY / EDGE-FRIENDLY / BOTH PLAUSIBLE / TBD = PLAUSIBILITY, NOT TOPOLOGY SELECTION`.
5. `CONNECTIVITY PROFILE ≠ SIM / TARIFF / APN / VPN / NETWORK TECHNOLOGY / OPERATOR PRODUCT`.
6. `UPLINK + DOWNLINK ≠ ENGINEERING ACTUATION`.
7. `D-CLASS-05 IS CONCEPTUAL ONLY; NO EDGE-01 IS NAMED OR PLACED`.
8. `MASTER MATRIX VALUES ARE SOURCE-REUSED; NO CELL MAY BE INVENTED OR NORMALIZED`.

## Visual hierarchy requirements

1. Canonical title and primary engineering question.
2. Candidate/readiness/topology epistemic status band.
3. Dominant master matrix with fixed row order and fixed column order.
4. Compact function-set and status legends.
5. Pattern/readiness distribution summary subordinate to the matrix.
6. Two-item Open/TBD panel.
7. Eight-guardrail band.
8. Provenance/reference footer.

Readability takes priority over forcing all cell text into a single dense visual block. A synchronized banded matrix is permitted; omission, merging, reordering, or semantic abbreviation without a visible legend is not.

## Prohibited visual inference

- No device icon implying installation.
- No network topology, Direct/Edge flow diagram, selection arrow, or winner treatment.
- No SIM/eSIM, gateway, APN/private networking, VPN, radio/network technology, broker, protocol, payload, API, IAM, certificate, encryption, cloud, coverage, RF, SLA, commercial, or site-survey implementation.
- No Trust / Access boundary or DATA / CONTROL / OPERATIONS plane visualization.
- No numeric normalization of LOW / MEDIUM / HIGH or pattern plausibility.
- No ALAU AI, Drawio, PDF, export, freeze, Visual QA, or assembly artifact at this gate.

## Provenance/reference footer

Show:

- `PAGE / GRAPH: A3-EC03-08`
- `PRODUCTION: P4-05`
- `TITLE: MASTER DEVICE & CONNECTIVITY MATRIX`
- `TYPE: PT-04 MASTER MATRIX`
- `SOURCE: EC-03 §33`
- `DIRECT DEFINITIONS: §§16–19 / §25`
- `REFERENCE CONTEXT: SEM-MCD-001`
- `PRIMARY UNITS: 16`
- `SECONDARY DIMENSIONS: 12`
- `RELATIONSHIPS: 192`
- `RESPONSIBILITY DOMAINS: 0`
- `PLANES: 0`
- `OPEN/TBD: 2`
- `GUARDRAILS: 8`
- `IR: FROZEN / PAGE SPEC: PAGE_SPEC_READY`

## Visual QA criteria for next production phase

1. A3 landscape intent is retained.
2. Canonical title and PT-04 type are exact.
3. All 16 DEV rows appear once in source order.
4. All 13 canonical columns appear once and preserve source order.
5. OBS IDs preserve the source mapping, including DEV-014→OBS-015, DEV-015→OBS-017, and DEV-016→OBS-018.
6. Function-set legend expands all source functions exactly.
7. Pattern distribution is 2 / 5 / 8 / 1 and no topology is selected.
8. All 16 physical-readiness cells remain `L1 — NOT READY` with extra gates preserved.
9. All 16 conceptual-readiness cells remain `READY` without deployed/implemented inference.
10. Two Open/TBD items and eight guardrails are visible.
11. No responsibility domain, Trust boundary, or plane is imported.
12. No unsupported provider, network, security, device, site, or commercial implementation appears.

## Gate

`NEXT GATE = SEMANTIC REVIEW`
