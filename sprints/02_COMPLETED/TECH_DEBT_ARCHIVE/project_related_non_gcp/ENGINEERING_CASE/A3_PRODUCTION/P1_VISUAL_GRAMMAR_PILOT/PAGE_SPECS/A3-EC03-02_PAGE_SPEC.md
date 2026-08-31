# A3-EC03-02 — PAGE SPEC

## Control

| Field | Value |
|---|---|
| Page ID / Graph ID | A3-EC03-02 |
| Production number | P1-06 |
| Title | Direct Connectivity Pattern |
| IR type | FLOW |
| Page spec status | PAGE_SPEC_READY |
| Owner approval | APPROVED FOR VISUAL COMPILATION |
| Semantic source | `A3-EC03-02_GRAPH_IR.yaml` |
| Drawio | NOT CREATED |
| PDF | NOT CREATED |

## Purpose

Show the approved direct-connectivity pattern from a field device / observation point through Beeline connectivity toward HouseMaster, while preserving identity, connectivity, trust, transport and engineering-state boundaries.

## Source-backed reference

- Observation: `OBS-CAND-001`
- Device candidate: `DEV-CAND-001`
- Connectivity profile: `CP-CAND-001`
- Physical context: Heating entry candidate; location TBD
- Direct suitability: PLAUSIBLE
- Edge suitability: PLAUSIBLE
- Classification: BOTH PLAUSIBLE
- Final topology selected: NO

Direct Connectivity must be presented as one reference deployment pattern. Do not imply that it is the only valid topology. Edge Aggregation remains a non-exclusive alternative whose detailed semantics belong to A3-EC03-03.

## Frozen flow specification

Render all 14 steps in this exact order:

`SEM-MCD-001 → HEATING — VERIFIED → Heating entry candidate — location TBD → OBS-CAND-001 → DEV-CAND-001 → DEVICE FUNCTIONS → CONNECTIVITY PROFILE — CP-CAND-001 → DIRECT CONNECTIVITY PATTERN → BEELINE ACCESS / TRANSPORT → HOUSEMASTER TRUST / INTEGRATION BOUNDARY → HOUSEMASTER INTEGRATION EDGE → OBSERVATION → EVIDENCE → BUILDING STATE`

Render all 13 edges from the IR in matching source order.

## Step and edge fields

Every step must preserve ID, label, semantic role, domain, status, source reference, confidence, what it means, and what it does not mean.

Every edge must preserve ID, from, to, label, status, source reference, what it means, and what it does not mean.

Long meanings/non-meanings may be placed in a compact keyed annotation rail if needed for readability.

## Identity inset

Render two independent identity lanes:

| Lane | Visible fields |
|---|---|
| HouseMaster internal identity | `device_id: TBD`; assigned only at deployment; does not depend on ICCID / IMSI / MSISDN |
| Beeline/operator connectivity identity | `SIM/eSIM: TBD`; `ICCID: TBD`; `IMSI: TBD`; `MSISDN: TBD`; operator-owned |

Place `DEVICE IDENTITY ≠ SIM IDENTITY` between the lanes. Do not show an actual ID or assignment.

## Connectivity inset

Show without filling missing values:

- Actual connectivity state: TBD.
- RF coverage: TBD.
- SIM assignment: TBD.
- Provisioning state: TBD.
- Heartbeat interval / timeout: TBD.
- CP-CAND-001 store-and-forward value: HIGH.
- `event_time ≠ received_time`.
- Connectivity states shown, if any, are proposed HouseMaster integration states, not Beeline internal network states.

## Critical distinctions

- DEVICE IDENTITY ≠ SIM IDENTITY
- CONNECTIVITY STATE ≠ ENGINEERING STATE
- DEVICE OFFLINE ≠ COMPONENT FAILED
- NETWORK HEALTH ≠ BUILDING HEALTH
- VALID SIM ≠ TRUSTED ENGINEERING STATE
- event_time ≠ received_time

## Guardrail band

Render verbatim:

- DEVICE IDENTITY ≠ SIM IDENTITY
- CONNECTIVITY STATE ≠ ENGINEERING STATE
- DEVICE OFFLINE ≠ COMPONENT FAILED
- VALID SIM ≠ TRUSTED ENGINEERING STATE

## Domain treatment

Keep these domains visibly distinct:

1. Physical building / engineering context.
2. Observation and conceptual device candidate.
3. Provider-neutral connectivity profile.
4. Beeline access / transport responsibility.
5. Shared trust / integration boundary.
6. HouseMaster integration, observation, evidence, and Building State.

Domain color must not encode evidence certainty. Trust boundary styling must not imply a trusted engineering state.

## Provenance footer

Show:

- `PAGE: A3-EC03-02`
- `GRAPH: A3-EC03-02`
- `PRODUCTION: P1-06`
- `SOURCE GATE: EC-03`
- `SOURCE: EC-03_DEVICE_CONNECTIVITY_SEM-MCD-001_v0.3_REVIEW.md`
- `REFERENCE: OBS-CAND-001 / DEV-CAND-001 / CP-CAND-001`
- `PATTERN: DIRECT REFERENCE / BOTH PLAUSIBLE / NOT SELECTED`
- `IR: REVIEW`
- `PAGE SPEC: REVIEW`
- `IR TYPE: FLOW`
- `STEPS: 14`
- `EDGES: 13`
- `GUARDRAILS: 4`

## Production constraints

- Do not show ALAU AI.
- Do not invent an installed device, SIM assignment, RF coverage, protocol, API, schema, provisioning state, heartbeat/timeout value, or engineering condition.
- Do not represent HouseMaster connectivity states as Beeline internal network states.
- Do not make HouseMaster IDs depend on ICCID, IMSI, or MSISDN.
- Do not create Drawio, PDF, or 3D output at this gate.

## Gate

NEXT GATE: SEMANTIC REVIEW
