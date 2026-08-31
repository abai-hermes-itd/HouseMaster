# A3-EC03-02 — SOURCE EXTRACT

## Control

| Field | Value |
|---|---|
| Page ID / Graph ID | A3-EC03-02 |
| Production number | P1-06 |
| IR type | FLOW |
| Status | REVIEW |
| Allowed source | `EC-03_DEVICE_CONNECTIVITY_SEM-MCD-001_v0.3_REVIEW.md` |
| Source sections used | §8; §9a–§9a.1; §17; §21–§26; §34 |
| EC-01 read | NO |
| EC-02 read | NO |
| TECH read | NO |
| Other sources read | NO |

## Source-backed direct pattern

EC-03 §26 defines the reference Direct Connectivity flow using `OBS-CAND-001 / DEV-CAND-001` for the heating-temperature condition.

Exact source sequence:

`SEM-MCD-001 → HEATING — VERIFIED → Heating entry candidate — location TBD → OBS-CAND-001 → DEV-CAND-001 → Device Functions (MEASURE / TIMESTAMP / BUFFER / STORE / FORWARD / REPORT STATUS) → Connectivity Profile CP-CAND-001 → Direct Connectivity Pattern → Beeline Access / Transport → HouseMaster Trust / Integration Boundary → HouseMaster Integration Edge → Observation → Evidence → Building State`

The source explicitly states that no real network technology, protocol, or product is instantiated.

## Pattern status

| Field | Source-backed value |
|---|---|
| Reference observation | OBS-CAND-001 |
| Reference device candidate | DEV-CAND-001 |
| Physical context | Heating entry candidate; location TBD |
| Connectivity profile | CP-CAND-001 |
| Profile signature | MEDIUM latency; MEDIUM loss tolerance; HIGH store-and-forward; MEDIUM reachability importance; FIXED mobility |
| Direct suitability | Plausible |
| Edge suitability | Plausible |
| Pattern classification | BOTH PLAUSIBLE |
| Final topology selected | NO |

Direct Connectivity is rendered as one source-defined deployment pattern, not the only valid topology. Edge Aggregation remains a co-applicable alternative reference; its semantics belong to A3-EC03-03.

## Identity model

| Identity scope | Value | Status | Required distinction |
|---|---|---|---|
| HouseMaster internal device/domain identity | `device_id` | TBD; assigned only at deployment | Independent of SIM identity |
| Connectivity profile | CP-CAND-001 requirements signature | CANDIDATE | Profile ≠ SIM / tariff / APN / VPN / network technology / operator product |
| Beeline/operator connectivity identity | SIM/eSIM and related identifiers | TBD; operator-owned | Must not define HouseMaster device identity |

HouseMaster IDs do not depend on ICCID, IMSI, or MSISDN. No actual device ID, SIM assignment, or provisioning state is established.

## Connectivity and state model

- HouseMaster canonical connectivity states are proposed integration states, not asserted Beeline internal network states.
- `UNREACHABLE` means the connectivity path is not responding; cause remains unclassified.
- Device reachability does not establish device health, component health, or engineering state.
- CP-CAND-001 has HIGH store-and-forward value.
- Buffered observations preserve original `event_time`; `event_time ≠ received_time`.
- No heartbeat interval, timeout, RF condition, polling frequency, buffer size, retention period, or retry interval is defined.

## Flow steps

| ID | Label | Semantic role | Domain | Status | Source ref | Confidence | What it means | What it does not mean |
|---|---|---|---|---|---|---|---|---|
| S-01 | SEM-MCD-001 | Physical reference context | PHYSICAL BUILDING | REFERENCE_CONTEXT | EC-03 §26 | HIGH | Building context for the reference direct pattern | A deployment location or topology is confirmed |
| S-02 | HEATING — VERIFIED | Evidence-backed engineering system | ENGINEERING SYSTEM | VERIFIED | EC-03 §26 | HIGH | Heating-system existence is the physical basis | A component, device, or engineering state is verified |
| S-03 | Heating entry candidate — location TBD | Candidate physical context | PHYSICAL / ENGINEERING | TBD_SITE_SURVEY | EC-03 §26 | HIGH | Candidate context for observation/device architecture | A heating-entry component or location is confirmed |
| S-04 | OBS-CAND-001 | Observation requirement | OBSERVABILITY | CANDIDATE | EC-03 §26 | HIGH | Heating-temperature observation candidate | An installed observation point or accepted observation |
| S-05 | DEV-CAND-001 | Conceptual field-device role | DEVICE CANDIDATE | PLANNED_CONCEPTUAL | EC-03 §8; §26 | HIGH | Conceptual device candidate associated with the observation | An installed/registered/active device or assigned `device_id` |
| S-06 | DEVICE FUNCTIONS | Technology-neutral device functions | DEVICE FUNCTION | CONCEPTUAL | EC-03 §26 | HIGH | MEASURE / TIMESTAMP / BUFFER / STORE / FORWARD / REPORT STATUS | A sensor model, device product, protocol, buffer size, or retry policy |
| S-07 | CONNECTIVITY PROFILE — CP-CAND-001 | Provider-neutral transport requirements | CONNECTIVITY PROFILE | CANDIDATE | EC-03 §17; §26 | HIGH | MEDIUM/MEDIUM/HIGH/MEDIUM/FIXED requirements signature | A SIM, tariff, APN, VPN, network technology, or operator product |
| S-08 | DIRECT CONNECTIVITY PATTERN | Reference deployment pattern | CONNECTIVITY PATTERN | BOTH_PLAUSIBLE_NOT_SELECTED | EC-03 §25; §26 | HIGH | Direct is a plausible pattern for the reference candidate | Direct is selected, mandatory, or the only valid topology |
| S-09 | BEELINE ACCESS / TRANSPORT | Connectivity-domain transport | BEELINE CONNECTIVITY DOMAIN | CONCEPTUAL_TBD | EC-03 §9a; §26 | HIGH | Conceptual operator access/transport stage | RF coverage, SIM assignment, provisioning, product, or internal network architecture |
| S-10 | HOUSEMASTER TRUST / INTEGRATION BOUNDARY | Trust and responsibility boundary | SHARED TRUST BOUNDARY | REFERENCED_NOT_DESIGNED | EC-03 §9a–§9a.1; §26 | HIGH | Boundary between connectivity responsibility and HouseMaster ingestion/domain responsibility | A new trust decision, API boundary design, or trusted engineering state |
| S-11 | HOUSEMASTER INTEGRATION EDGE | HouseMaster ingress and mapping edge | HOUSEMASTER DOMAIN | REFERENCED_NOT_IMPLEMENTED | EC-03 §9a; §26 | HIGH | Conceptual authenticate/validate/normalize/map entry | An implemented gateway, endpoint, protocol, API, or schema |
| S-12 | OBSERVATION | Canonical observation content | HOUSEMASTER OBSERVATION | CONCEPTUAL_OUTPUT | EC-03 §26 | HIGH | Observation delivered for domain interpretation | Evidence, defect, or verified engineering fact |
| S-13 | EVIDENCE | Provenance-bearing evidence record | EVIDENCE | PROVENANCE_REQUIRED | EC-03 §26 | HIGH | Observation supported as evidence | A defect or engineering conclusion |
| S-14 | BUILDING STATE | Rules-gated domain linkage | HOUSEMASTER DOMAIN | DOMAIN_RULE_GATED | EC-03 §22; §24; §26 | HIGH | Building-state interpretation remains subject to domain rules/validation | Connectivity health, a valid SIM, or delivered data automatically establishes building health |

## Edges

| ID | From | To | Label | Status | Source ref | What it means | What it does not mean |
|---|---|---|---|---|---|---|---|
| E-01 | S-01 | S-02 | scopes verified heating system | EXPLICIT | EC-03 §26 | Reference flow is scoped to heating | Other systems or conditions are inferred |
| E-02 | S-02 | S-03 | defines candidate physical context | TBD_SITE_SURVEY | EC-03 §26 | Heating existence permits a heating-entry candidate | Component location is known |
| E-03 | S-03 | S-04 | maps context to observation candidate | CANDIDATE | EC-03 §26 | Candidate context supports OBS-CAND-001 | Observation is installed or accepted |
| E-04 | S-04 | S-05 | maps observation to device candidate | PLANNED_CONCEPTUAL | EC-03 §8; §26 | DEV-CAND-001 is the conceptual device role for the observation | An installed device or assigned identity exists |
| E-05 | S-05 | S-06 | requires technology-neutral functions | CONCEPTUAL | EC-03 §26 | The candidate requires the listed functions | A sensor/product implementation is selected |
| E-06 | S-06 | S-07 | associates transport requirements | CANDIDATE | EC-03 §17; §26 | Device functions are paired with CP-CAND-001 requirements | A SIM or operator product is assigned |
| E-07 | S-07 | S-08 | applies direct reference pattern | BOTH_PLAUSIBLE_NOT_SELECTED | EC-03 §25; §26 | Direct is shown as a plausible reference pattern | Edge Aggregation is invalid or Direct is selected |
| E-08 | S-08 | S-09 | enters operator access / transport | CONCEPTUAL_TBD | EC-03 §9a; §26 | The direct pattern uses conceptual Beeline access/transport | RF, provisioning, technology, product, or internal topology is known |
| E-09 | S-09 | S-10 | crosses trust / integration boundary | REFERENCED | EC-03 §9a–§9a.1; §26 | Connectivity responsibility hands off toward HouseMaster ingestion | SIM validity establishes trusted engineering state |
| E-10 | S-10 | S-11 | enters HouseMaster integration edge | REFERENCED_NOT_IMPLEMENTED | EC-03 §9a; §26 | Data reaches the conceptual HouseMaster integration edge | An endpoint, API, schema, or protocol is implemented |
| E-11 | S-11 | S-12 | authenticates / validates / normalizes / maps conceptually | CONCEPTUAL | EC-03 §9a; §26 | HouseMaster-side integration can produce canonical observation content | Delivered data is automatically engineering truth |
| E-12 | S-12 | S-13 | attaches evidence context | PROVENANCE_REQUIRED | EC-03 §26 | Observation becomes evidence-bearing | Observation and evidence are identical or evidence proves defect |
| E-13 | S-13 | S-14 | supports rules-gated building-state interpretation | DOMAIN_RULE_GATED | EC-03 §22; §24; §26 | Evidence can support Building State through domain interpretation | Network health, connectivity restoration, or evidence automatically proves building health |

## Required guardrails

- DEVICE IDENTITY ≠ SIM IDENTITY
- CONNECTIVITY STATE ≠ ENGINEERING STATE
- DEVICE OFFLINE ≠ COMPONENT FAILED
- VALID SIM ≠ TRUSTED ENGINEERING STATE

## Counts

| Measure | Count |
|---|---:|
| Flow steps | 14 |
| Edges | 13 |
| Guardrails | 4 |

ALAU AI is excluded.

