# A3-EC03-08 — SOURCE EXTRACT

## Control

| Field | Value |
|---|---|
| Page ID | A3-EC03-08 |
| Canonical title | Master Device & Connectivity Matrix |
| Production | P4-05 |
| Page type | PT-04 MASTER MATRIX |
| Source domain | EC-03 |
| Exact assigned source section | EC-03 §33 — MASTER DEVICE & CONNECTIVITY MATRIX |
| Directly required definitions | EC-03 §16 Device Class Model; §17 Connectivity Profile Model; §18 Traffic Pattern Model; §19 Uplink / Downlink Model; §25 Pattern-Selection Matrix |
| Source status | v0.3 — REVIEW ONLY |
| Semantic compile status | COMPLETE — NOT FROZEN |

## Canonical source scope

- Registry entries: A3-EC03-08 only.
- Primary source: EC-03 §33.
- Direct definitions used only to interpret §33 codes: §§16–19 and §25.
- EC-00, EC-01, EC-02, unrelated EC-03 sections, prior P4 outputs, Drawio, manifests, and PDFs are excluded.

## Page purpose

Consolidate all 16 EC-03 device/connectivity candidates into one provider-neutral engineering matrix that preserves observation linkage, function, class, traffic, directionality, connectivity profile, Direct/Edge plausibility, buffering/reachability needs, and readiness without converting candidates into installed or selected architecture.

## Primary engineering question

What is the complete source-backed device-and-connectivity requirement signature for each of the 16 candidates, and which physical-readiness and topology uncertainties remain unresolved?

## Function-set definitions used by the matrix

| Extract ID | Exact source function set |
|---|---|
| FSET-MEASURE | `MEASURE / TIMESTAMP / BUFFER / STORE / FORWARD / REPORT STATUS` |
| FSET-READ | `READ INTERFACE / COUNT / TIMESTAMP / BUFFER / STORE / FORWARD / REPORT STATUS` |
| FSET-DETECT | `DETECT / TIMESTAMP / BUFFER / STORE / FORWARD / REPORT STATUS` |

The extract IDs are normalization aids for this artifact only; the function names remain source-exact.

## Source-supported candidate records

| DEV ID | OBS ID | Observable condition | Function set | Device class | Traffic pattern | Uplink/downlink | Profile | Pattern class | Store-and-forward | Reachability | Physical readiness | Conceptual readiness |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| DEV-CAND-001 | OBS-CAND-001 | Temperature condition (heating entry) | FSET-MEASURE | D-CLASS-01 | PERIODIC TELEMETRY | UPLINK ONLY | CP-CAND-001 | BOTH PLAUSIBLE | HIGH | MEDIUM | L1 — NOT READY | READY |
| DEV-CAND-002 | OBS-CAND-002 | Pressure condition (heating entry) | FSET-MEASURE | D-CLASS-01 | PERIODIC TELEMETRY | UPLINK ONLY | CP-CAND-001 | BOTH PLAUSIBLE | HIGH | MEDIUM | L1 — NOT READY | READY |
| DEV-CAND-003 | OBS-CAND-003 | Flow/consumption condition (heating metering) | FSET-READ | D-CLASS-03 | COUNTER/METERING | UPLINK + DOWNLINK | CP-CAND-002 | BOTH PLAUSIBLE | HIGH | LOW | L1 — NOT READY | READY |
| DEV-CAND-004 | OBS-CAND-004 | Pressure condition (CW entry) | FSET-MEASURE | D-CLASS-01 | PERIODIC TELEMETRY | UPLINK ONLY | CP-CAND-001 | BOTH PLAUSIBLE | HIGH | MEDIUM | L1 — NOT READY | READY |
| DEV-CAND-005 | OBS-CAND-005 | Flow condition (CW entry) | FSET-MEASURE | D-CLASS-01 | PERIODIC TELEMETRY | UPLINK ONLY | CP-CAND-001 | BOTH PLAUSIBLE | HIGH | MEDIUM | L1 — NOT READY | READY |
| DEV-CAND-006 | OBS-CAND-006 | Flow/consumption condition (CW metering) | FSET-READ | D-CLASS-03 | COUNTER/METERING | UPLINK + DOWNLINK | CP-CAND-002 | BOTH PLAUSIBLE | HIGH | LOW | L1 — NOT READY | READY |
| DEV-CAND-007 | OBS-CAND-007 | Temperature/availability condition (hot water) | FSET-MEASURE | D-CLASS-01 | PERIODIC TELEMETRY | UPLINK ONLY | CP-CAND-001 | DIRECT-FRIENDLY | HIGH | MEDIUM | L1 — NOT READY | READY |
| DEV-CAND-008 | OBS-CAND-008 | Leakage indication (hot water) | FSET-DETECT | D-CLASS-04 | STATE CHANGE | UPLINK ONLY | CP-CAND-003 | DIRECT-FRIENDLY | HIGH | HIGH | L1 — NOT READY | READY |
| DEV-CAND-009 | OBS-CAND-009 | Water-presence/flooding indication (basement) | FSET-DETECT | D-CLASS-04 | EVENT-DRIVEN | UPLINK ONLY | CP-CAND-003 | EDGE-FRIENDLY | HIGH | HIGH | L1 — NOT READY (also zone-existence-gated) | READY |
| DEV-CAND-010 | OBS-CAND-010 | Temperature condition (basement) | FSET-MEASURE | D-CLASS-02 | PERIODIC TELEMETRY | UPLINK ONLY | CP-CAND-004 | EDGE-FRIENDLY | MEDIUM | LOW | L1 — NOT READY (also zone-existence-gated) | READY |
| DEV-CAND-011 | OBS-CAND-011 | Humidity condition (basement) | FSET-MEASURE | D-CLASS-02 | PERIODIC TELEMETRY | UPLINK ONLY | CP-CAND-004 | EDGE-FRIENDLY | MEDIUM | LOW | L1 — NOT READY (also zone-existence-gated) | READY |
| DEV-CAND-012 | OBS-CAND-012 | Supply-availability condition (electrical) | FSET-DETECT | D-CLASS-04 | STATE CHANGE | UPLINK ONLY | CP-CAND-003 | BOTH PLAUSIBLE | HIGH | HIGH | L1 — NOT READY | READY |
| DEV-CAND-013 | OBS-CAND-013 | Outage/event condition (electrical) | FSET-DETECT | D-CLASS-04 | EVENT-DRIVEN | UPLINK ONLY | CP-CAND-003 | BOTH PLAUSIBLE | HIGH | HIGH | L1 — NOT READY | READY |
| DEV-CAND-014 | OBS-CAND-015 | Moisture/water-ingress condition (roof) | FSET-DETECT | D-CLASS-04 | EVENT-DRIVEN | UPLINK ONLY | CP-CAND-001 | TBD | HIGH | MEDIUM | L1 — NOT READY (also access-gated) | READY |
| DEV-CAND-015 | OBS-CAND-017 | Availability/operational condition (lift) | FSET-DETECT | D-CLASS-04 | STATE CHANGE | UPLINK ONLY | CP-CAND-003 | EDGE-FRIENDLY | HIGH | HIGH | L1 — NOT READY | READY |
| DEV-CAND-016 | OBS-CAND-018 | Outage/event condition (lift) | FSET-DETECT | D-CLASS-04 | EVENT-DRIVEN | UPLINK ONLY | CP-CAND-003 | EDGE-FRIENDLY | HIGH | HIGH | L1 — NOT READY | READY |

## Source-supported relationships

- Primary semantic units: 16 candidate records.
- Secondary attribute dimensions per record: 12.
- Deterministic record-to-attribute relationships: `16 × 12 = 192`.
- Every DEV candidate links to exactly one OBS candidate, one observable condition, one function set, one device class, one traffic pattern, one uplink/downlink class, one connectivity profile, one pattern class, one store-and-forward value, one reachability-importance value, one physical-readiness state, and one conceptual-readiness state.

## Status and distribution summaries

| Dimension | Distribution / state |
|---|---|
| Candidate status | 16 CANDIDATES; 0 installed devices established |
| Pattern class | DIRECT-FRIENDLY 2; EDGE-FRIENDLY 5; BOTH PLAUSIBLE 8; TBD 1 |
| Topology selection | NOT SELECTED for every candidate |
| Physical readiness | L1 — NOT READY for all 16; DEV-009/010/011 also zone-existence-gated; DEV-014 also access-gated |
| Conceptual architecture readiness | READY for all 16; READY does not mean implemented or deployed |
| Uplink/downlink | UPLINK ONLY 14; UPLINK + DOWNLINK 2 |
| Actuation implication | NONE; UPLINK + DOWNLINK does not imply engineering actuation |
| Provider-side implementation | NOT ESTABLISHED |

## Responsibility ownership

EC-03 §33 does not assign candidate rows to Beeline or HouseMaster responsibility domains. The matrix is provider-neutral. Responsibility domain count for this page is `0`; no Beeline internal architecture or HouseMaster integration boundary is imported.

## Open / TBD items

| ID | Scope | State | Validation owner |
|---|---|---|---|
| EC03-08-TBD-01 | Physical readiness / candidate location across all 16 rows, including basement zone-existence gates and roof access gate | L1 — NOT READY / NOT ESTABLISHED | NOT ESTABLISHED IN ASSIGNED SOURCE SCOPE |
| EC03-08-TBD-02 | Final Direct/Edge topology selection; DEV-CAND-014 pattern class specifically unresolved | NOT SELECTED; DEV-CAND-014 = TBD | NOT ESTABLISHED IN ASSIGNED SOURCE SCOPE |

## Guardrails

1. `DEVICE CANDIDATE ≠ INSTALLED DEVICE`.
2. `L1 — NOT READY ≠ PROVED ABSENCE`.
3. `CONCEPTUAL ARCHITECTURE READY ≠ IMPLEMENTED OR DEPLOYED`.
4. `DIRECT-FRIENDLY / EDGE-FRIENDLY / BOTH PLAUSIBLE / TBD = PLAUSIBILITY, NOT TOPOLOGY SELECTION`.
5. `CONNECTIVITY PROFILE ≠ SIM / TARIFF / APN / VPN / NETWORK TECHNOLOGY / OPERATOR PRODUCT`.
6. `UPLINK + DOWNLINK ≠ ENGINEERING ACTUATION`.
7. `D-CLASS-05 IS CONCEPTUAL ONLY; NO EDGE-01 IS NAMED OR PLACED`.
8. `MASTER MATRIX VALUES ARE SOURCE-REUSED; NO CELL MAY BE INVENTED OR NORMALIZED`.

## Explicit exclusions

- No installed-device, SIM/eSIM, gateway, APN/private networking, VPN, network technology, protocol, broker, payload, API, IAM, certificate, encryption, cloud, coverage, RF, SLA, commercial, or site-survey implementation.
- No topology selection and no ranking of Direct versus Edge.
- No Trust / Access / Integration Boundary.
- No DATA / CONTROL / OPERATIONS planes.
- No SEM-MCD-001 fact beyond its role as the EC-03 reference context.
- No ALAU AI, Drawio, PDF, export, freeze, Visual QA, or assembly artifact.

## Provenance

- `A3-P0_PAGE_REGISTRY_v0.4_REVIEW.md` — A3-EC03-08 entry.
- `A3-P0_PAGE_REGISTRY_v0.4.csv` — A3-EC03-08 entry.
- `EC-03_DEVICE_CONNECTIVITY_SEM-MCD-001_v0.3_REVIEW.md` — §33.
- Direct definitions only: EC-03 §§16–19 and §25.

`NEXT GATE = SEMANTIC REVIEW`
