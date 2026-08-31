# A3-EC02-04 — SOURCE EXTRACT

## Control

| Field | Value |
|---|---|
| Page ID / Graph ID | A3-EC02-04 |
| Production number | P1-05 |
| IR type | FLOW |
| Status | REVIEW |
| Allowed source | `EC-02_PHYSICAL_TO_OBSERVATION_SEM-MCD-001_v0.3_REVIEW.md` |
| Source sections used | §16; §16.1; §16.2; §18 / A3-EC02-04 |
| EC-01 read | NO |
| EC-03 read | NO |
| TECH read | NO |
| Other sources read | NO |

## Source-backed reference observation

| Field | Source-defined value |
|---|---|
| Observation candidate | `OBS-CAND-001` |
| Observation-point candidate | `OC-001` |
| System | HEATING — VERIFIED |
| Specific component | TBD; no `HEAT-xx` instantiated |
| Physical context | Heating system entry; component location TBD |
| Observable condition | Temperature condition (supply/return) |
| Observation point | CANDIDATE, L1 |
| Observation class | BOTH (Machine + Human) |
| Preferred evidence model | Human general assessment observable now; machine observation pending field-confirmed siting |
| Data characteristic | SCALAR |
| Temporal class | CONTINUOUS/HIGH-FREQUENCY |
| Site-survey dependency | Physical heating-entry location must be established before any machine device can be sited |

Reference-observation source: EC-02 §16. The selected example is not invented for the page.

## Exact source sequence

EC-02 §16.1 defines:

`SEM-MCD-001 → ENGINEERING SYSTEM (Heating — VERIFIED) → PHYSICAL CONTEXT / COMPONENT CANDIDATE (system entry — location TBD) → OBSERVABLE CONDITION (temperature condition) → OBSERVATION POINT (OC-001 / OBS-CAND-001 — CANDIDATE, L1) → OBSERVATION (machine measurement and/or human note — channel TBD by EC-03+) → EVIDENCE (timestamp + component context + provenance) → HOUSEMASTER BUILDING STATE`

The production flow preserves this order. The source-defined `OBSERVATION`, `EVIDENCE`, and `HOUSEMASTER BUILDING STATE` stages are expanded only into the explicit capture, provenance, record, acceptance, and domain-linkage fields required for A3 production; no implementation is introduced.

## Provenance resolution

| Provenance field | Source-supported value | Resolution status |
|---|---|---|
| Observation time / timestamp | Timestamp is required for evidence | Value TBD; no timestamp supplied |
| Observed object / component context | Heating system entry candidate | Specific component and location TBD |
| Observation channel | Machine measurement and/or human note | Actual channel TBD by EC-03+ |
| Source / actor / device provenance | Provenance is required | Actor/device identity TBD; no device is specified |
| Evidence attachment / context | Component context is required | Attachment type/value not specified; TBD |

## Critical distinctions

- OBSERVATION ≠ EVIDENCE
- EVIDENCE ≠ DEFECT
- DEVICE / HUMAN INPUT ≠ ENGINEERING FACT
- ACCEPTED RECORD ≠ VERIFIED BUILDING STATE

## Flow steps

| ID | Label | Semantic role | Domain | Status | Source ref | Confidence | Required context | What it means | What it does not mean |
|---|---|---|---|---|---|---|---|---|---|
| S-01 | SEM-MCD-001 | Physical reference context | PHYSICAL BUILDING | VERIFIED | EC-02 §16.1 | HIGH | Reference object identity | The physical MCD from which the reference observation is scoped | All component locations are known |
| S-02 | ENGINEERING SYSTEM — HEATING | Evidence-backed system context | ENGINEERING SYSTEM | VERIFIED | EC-02 §16; §16.1 | HIGH | BF-015 is referenced inside EC-02; no upstream reread | Central heating system existence is the verified basis for the candidate | A specific heating component or topology is verified |
| S-03 | PHYSICAL CONTEXT / COMPONENT CANDIDATE | Candidate observation context | PHYSICAL / ENGINEERING | TBD_SITE_SURVEY | EC-02 §16; §16.1 | HIGH | Heating system entry; component location TBD | The observation is scoped to a heating-entry candidate | A `HEAT-xx` component or location has been instantiated |
| S-04 | OBSERVABLE CONDITION — TEMPERATURE | Engineering quantity to observe | OBSERVABLE CONDITION | PROPOSED | EC-02 §16; §16.1 | HIGH | Temperature condition (supply/return); no threshold defined | Temperature is the source-selected observable condition | Any temperature value is already captured or abnormal |
| S-05 | OBSERVATION POINT — OC-001 / OBS-CAND-001 | Candidate observation point | OBSERVABILITY | PROPOSED_L1 | EC-02 §16; §16.1 | HIGH | Candidate remains L1; field-confirmed siting required | A conceptual observation point for the reference condition | A siteable or installed observation point |
| S-06 | OBSERVATION CHANNEL — MACHINE AND/OR HUMAN | Capture-channel choice | OBSERVATION ACQUISITION | PROPOSED_CHANNEL_TBD | EC-02 §16; §16.1 | HIGH | Actual channel TBD by EC-03+ | The condition may be observed by machine measurement and/or human note | A sensor, device, installation, or channel decision exists |
| S-07 | RAW / CAPTURED OBSERVATION | Captured observation content | OBSERVATION | PROPOSED | EC-02 §16.1 | MEDIUM | Machine measurement or human note; actual value/time TBD | The immediate captured observation before evidence context is attached | Evidence, defect, or engineering truth |
| S-08 | CONTEXT + TIMESTAMP + PROVENANCE | Evidence-context assembly | PROVENANCE | REQUIRED_VALUES_TBD | EC-02 §16.1 | HIGH | Timestamp required; component context required; provenance required; actual values TBD | The context required to make an observation evidence-bearing | Invented time, actor, device, attachment, or location |
| S-09 | EVIDENCE-BEARING RECORD | Evidence record | EVIDENCE | PROPOSED | EC-02 §16.1 | MEDIUM | Captured observation plus required context and provenance | A record that carries the observation and its provenance context | A defect or verified engineering conclusion |
| S-10 | HOUSEMASTER ACCEPTANCE | Conceptual acceptance boundary | HOUSEMASTER BOUNDARY | PROPOSED | EC-02 §16.1 | MEDIUM | Record acceptance only; no API/schema/protocol defined | Conceptual entry of the evidence-bearing record into HouseMaster | A defined integration contract or engineering validation |
| S-11 | DOMAIN LINKAGE / HOUSEMASTER BUILDING STATE | Domain interpretation destination | HOUSEMASTER DOMAIN | RULES_VALIDATION_REQUIRED | EC-02 §16.1; §16.2 | HIGH | Future domain rules and professional validation | Linkage toward HouseMaster Building State and gated interpretation | An accepted record automatically verifies a defect or building state |

## Edges

| ID | From | To | Label | Status | Source ref | What it means | What it does not mean |
|---|---|---|---|---|---|---|---|
| E-01 | S-01 | S-02 | scopes verified engineering system | EXPLICIT | EC-02 §16.1 | The reference object is narrowed to the verified heating system | Other systems or locations are inferred |
| E-02 | S-02 | S-03 | defines candidate physical context | TBD_SITE_SURVEY | EC-02 §16; §16.1 | Heating existence permits a heating-entry candidate context | The entry component/location is known |
| E-03 | S-03 | S-04 | identifies observable condition | PROPOSED | EC-02 §16; §16.1 | Temperature is selected as the observable condition | A threshold, value, or abnormal state is defined |
| E-04 | S-04 | S-05 | maps condition to candidate OP | PROPOSED_L1 | EC-02 §16.1 | The condition is associated with OC-001 / OBS-CAND-001 | The OP is field-instantiated |
| E-05 | S-05 | S-06 | selects applicable observation channel | CHANNEL_TBD | EC-02 §16; §16.1 | Machine and/or human capture is conceptually applicable | A device or final channel is selected |
| E-06 | S-06 | S-07 | captures observation | PROPOSED | EC-02 §16.1 | A machine measurement or human note can become the captured observation | The captured input is evidence or an engineering fact |
| E-07 | S-07 | S-08 | attaches required context | REQUIRED_VALUES_TBD | EC-02 §16.1 | Timestamp, component context, and provenance are required | Missing values may be invented |
| E-08 | S-08 | S-09 | forms evidence-bearing record | PROPOSED | EC-02 §16.1 | Required context makes the observation evidence-bearing | Evidence verifies a defect |
| E-09 | S-09 | S-10 | presents record for HouseMaster acceptance | PROPOSED | EC-02 §16.1 | The evidence-bearing record reaches the conceptual HouseMaster boundary | An API, protocol, or schema is defined |
| E-10 | S-10 | S-11 | links accepted record to domain interpretation | RULES_VALIDATION_REQUIRED | EC-02 §16.1; §16.2 | The accepted record can support Building State interpretation through future rules/validation | Acceptance establishes verified building state or engineering truth |

## Guardrails

- OBSERVATION ≠ EVIDENCE
- EVIDENCE ≠ DEFECT
- CAPTURED DATA ≠ ENGINEERING TRUTH
- DOMAIN INTERPRETATION REQUIRES RULES / VALIDATION

## Counts

| Measure | Count |
|---|---:|
| Flow steps | 11 |
| Edges | 10 |
| Guardrails | 4 |

ALAU AI and Beeline internal connectivity architecture are not part of the approved A3-EC02-04 source sequence and are excluded.

