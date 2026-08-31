# A3-EC00-01 — PAGE SPEC

## Control

- Page ID: `A3-EC00-01`
- Title: `Reference Architecture Overview`
- Stage: `P2_CONTEXT_REAL_BUILDING`
- Production number: `P2-01`
- Case assembly number: `001`
- IR type: `GRAPH / ARCHITECTURE OVERVIEW`
- Page spec status: `PAGE_SPEC_READY`
- Owner approval: `APPROVED FOR VISUAL COMPILATION`
- Semantic source: `A3-EC00-01_GRAPH_IR.yaml`
- EC-00 source linkage: `SOURCE LINKAGE PENDING`

## Purpose

Orient the reader to the complete source-grounded conceptual architecture around the real reference building without implying implementation topology, installed devices, transferred ownership or autonomous control.

## Canonical thesis

SEM-MCD-001 is the physical source of engineering reality; Beeline serves machine connectivity, HouseMaster remains the independent engineering-domain system of record, and ALAU AI operates only downstream as decision-support over evidence-backed HouseMaster state.

## Primary visual

Layered architecture overview with six explicit vertical or horizontal responsibility layers:

1. `REAL BUILDING / PHYSICAL DOMAIN`
2. `OBSERVATION / FIELD LAYER`
3. `BEELINE CONNECTIVITY LAYER`
4. `HOUSEMASTER TRUST / INTEGRATION BOUNDARY`
5. `HOUSEMASTER DOMAIN SYSTEM OF RECORD`
6. `ALAU AI — DOWNSTREAM DECISION-SUPPORT`

The visual must read as an architecture map, not a deployment diagram, network topology or product architecture.

## Reference anchor

`SEM-MCD-001 — Semey, Shakarima 13A` must be the dominant physical anchor at the start of the architecture.

The anchor must visibly contain:

- physical engineering systems;
- evidence-gated component context;
- physical condition as the source of observation.

Do not render a generic building icon without the canonical ID/address.

## Main conceptual paths

### Machine observation path

`REAL BUILDING → PHYSICAL CONDITION → CANDIDATE DEVICE / OBSERVATION → [DIRECT OR EDGE PATTERN — NOT SELECTED] → BEELINE ACCESS / TRANSPORT → HOUSEMASTER TRUST / INTEGRATION → HOUSEMASTER OBSERVATION / EVIDENCE → DOMAIN STATE`

### Human/documentary evidence bypass

`REAL BUILDING → HUMAN OBSERVATION → PHOTO / DOCUMENTARY EVIDENCE + TIMESTAMP / PROVENANCE → HOUSEMASTER TRUST / INTEGRATION → HOUSEMASTER OBSERVATION / EVIDENCE`

This bypass must be visually obvious and must not cross the Beeline Connectivity layer.

### Downstream decision-support path

`HOUSEMASTER EVIDENCE-BACKED BUILDING STATE → ALAU AI ANALYTICS / PREDICTION / DECISION-SUPPORT → HUMAN / AUTHORIZED DECISION OR WORKFLOW → HOUSEMASTER HISTORY / WORKFLOW`

No reverse control path to the physical building is permitted.

## HouseMaster domain core

Render the domain system-of-record chain as separate semantic objects:

`BUILDING → SYSTEM → COMPONENT → OBSERVATION → EVIDENCE → DEFECT → BUILDING STATE → HISTORY / WORKFLOW`

Required gating:

- Component identities/locations remain evidence-gated.
- Observation does not visually merge with Evidence.
- Evidence does not visually merge with Defect.
- Defect and Building State require domain rules / professional validation.
- HouseMaster remains the independent system of record.

## Connectivity implementation alternatives

Under the Beeline Connectivity layer show two subordinate, equal-status pattern cards:

- `DIRECT CONNECTIVITY — PLAUSIBLE / NOT SELECTED`
- `EDGE AGGREGATION — PLAUSIBLE / NOT SELECTED`

Do not show either as the default, winner or mandatory route.

## Identity separation

Make visible:

- HouseMaster domain/device identities are independent.
- SIM/eSIM / M2M identity belongs to operator connectivity where applicable.
- `DEVICE IDENTITY ≠ SIM IDENTITY`.

No ICCID, IMSI, MSISDN, SIM assignment or installed-device identity may be invented.

## Connectivity state

Label as connectivity/reachability information where exposed and represented separately in HouseMaster integration.

Do not present HouseMaster proposed integration states as Beeline internal network states.

Dominant distinction: `CONNECTIVITY STATE ≠ ENGINEERING STATE`.

## ALAU AI placement

ALAU AI must be visually downstream of `HOUSEMASTER BUILDING STATE`.

Allowed role:

- analytics;
- prediction;
- decision-support.

Explicit non-roles:

- not system of record;
- not engineering-truth source;
- not domain owner;
- not autonomous engineering control.

Its only outgoing semantic path is a recommendation/signal to a human or authorized workflow gate.

## Secondary visual — ownership / responsibility legend

| Layer | Ownership / responsibility |
|---|---|
| REAL BUILDING | Physical source of engineering reality |
| OBSERVATION / FIELD | Human/documentary and candidate machine observation with provenance |
| BEELINE | Connectivity / IoT-M2M / SIM-eSIM / operator transport / exposed connectivity state |
| TRUST / INTEGRATION | Explicit crossing; no HouseMaster domain-ownership transfer |
| HOUSEMASTER | Domain identities, observation/evidence, engineering state, history/workflow, system of record |
| ALAU AI | Downstream analytics/prediction/decision-support only |

Responsibility colors must encode ownership layer only, not confidence, evidence status or authority.

## Visible boundaries

- Physical boundary around SEM-MCD-001 and its systems/components/condition.
- Observation/Field boundary around human, documentary and candidate-device channels.
- Beeline Connectivity boundary around operator identity/access/transport/connectivity state.
- Explicit HouseMaster Trust/Integration boundary.
- HouseMaster Domain Core boundary.
- ALAU AI downstream boundary separated from HouseMaster system-of-record state.

## Required guardrails

1. `CONNECTIVITY STATE ≠ ENGINEERING STATE`
2. `NETWORK HEALTH ≠ BUILDING HEALTH`
3. `DEVICE IDENTITY ≠ SIM IDENTITY`
4. `OBSERVATION ≠ EVIDENCE ≠ DEFECT`
5. `AI SIGNAL ≠ ENGINEERING FACT`
6. `AI RECOMMENDATION ≠ AUTHORIZED DECISION`
7. `HOSTING ≠ DOMAIN OWNERSHIP`

## Evidence / status treatment

- Page-level architecture status: `PROPOSED / CONCEPTUAL`.
- EC-00 primary source linkage: `SOURCE LINKAGE PENDING` must be visible in provenance.
- SEM-MCD-001 address: `VERIFIED`.
- Engineering-system existence: `MIXED — VERIFIED / PARTIAL / TBD`.
- Components and locations: `TBD` unless source-backed.
- Candidate devices: `CONCEPTUAL_L1 / NONE INSTALLED`.
- Direct and Edge patterns: `PLAUSIBLE / NOT SELECTED`.
- Trust/integration implementation: `REFERENCED / NOT IMPLEMENTED`.
- ALAU integration/models/hosting: `TBD`.

## Unresolved-items rail

Show compactly:

- EC-00 primary artifact: `SOURCE LINKAGE PENDING`
- Installed devices / confirmed sensor locations: `NONE CONFIRMED`
- Direct vs Edge: `NOT SELECTED`
- Beeline internal topology/products: `NOT ASSERTED`
- API / payload / trust implementation: `TBD / NOT DESIGNED`
- Domain rules / professional validation: `REQUIRED`
- ALAU models / hosting / integration: `TBD`
- Autonomous control: `NOT AUTHORIZED / OUT OF SCOPE`

## Rendering constraints for the next gate

- A3 landscape.
- Primary visual is the six-layer architecture overview.
- Secondary visual is the ownership/responsibility legend.
- Human/documentary bypass must be at least as legible as the machine path.
- Connectivity patterns remain visually subordinate alternatives.
- No internal Beeline topology, products, APIs, payload schemas, device installations, sensor locations or selected topology.
- No control arrows from ALAU AI to the real building.
- No Drawio or PDF until semantic review/freeze.

## Counts

- Nodes: `24`
- Edges: `31`
- Domains: `6`
- Guardrails: `7`
- SEM-MCD-001 included: `YES`
- Human evidence bypass included: `YES`
- ALAU AI downstream: `YES`
