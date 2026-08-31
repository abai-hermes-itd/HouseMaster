# A3-EC02-02 — SOURCE EXTRACT

## Control

| Field | Value |
|---|---|
| Page ID | A3-EC02-02 |
| Graph ID | A3-EC02-02 |
| Production number | P1-04 |
| IR type | GRAPH |
| Status | REVIEW |
| Allowed source | `EC-02_PHYSICAL_TO_OBSERVATION_SEM-MCD-001_v0.3_REVIEW.md` |
| Source sections used | §1; §3–§3.1; §4a–§4a.4; §9; §14–§14.1; §16.1; §17; §18 / A3-EC02-02 |
| EC-01 read | NO |
| EC-03 read | NO |
| TECH read | NO |
| Other sources read | NO |

## Canonical purpose

Show the engineering observation chain from the physical MCD to an accepted HouseMaster observation without conflating physical condition, connectivity, observation, evidence, or engineering state.

## Direct A3 extraction instruction from EC-02

EC-02 §18 defines the A3-EC02-02 Hero Graph as:

`SEM-MCD-001 → PHYSICAL SYSTEMS → OBSERVABLE CONDITIONS → OBSERVATION POINTS → MACHINE / HUMAN / DOCUMENTARY → EVIDENCE → HOUSEMASTER → BUILDING STATE`

## Required source-bounded meanings

| Concept | Extracted meaning | Source reference | Confidence |
|---|---|---|---|
| Physical MCD | SEM-MCD-001 is the physical building context from which legitimate observation candidates are considered | EC-02 §1; §18 | HIGH |
| Observed object / engineering component | An evidence-backed physical system, zone, component candidate, or observable condition; not proof of a known component location | EC-02 §1; §3; §14 | HIGH |
| Observation point | A physical/engineering concept that can exist conceptually without an installed device; all current candidates are L1 and not siteable | EC-02 §3; §3.1 | HIGH |
| Machine / human / documentary channel | Machine and human channels are co-applicable, not sequential; documentary evidence is a canonical observation-taxonomy class | EC-02 §4a.1; §14.1 | HIGH |
| Connectivity / transport | Applies conceptually to machine-capable candidates; environment, power, RF, topology, and deployment remain TBD. Human/documentary-only candidates imply no device/connectivity requirement | EC-02 §17 | HIGH |
| HouseMaster integration / acceptance | A conceptual HouseMaster boundary only. EC-02 does not define an API, integration contract, or data schema | EC-02 §1; §18 | HIGH |
| Canonical observation | Machine observation, human observation, documentary evidence, or derived observation; a signal/observation is not automatically an engineering fact | EC-02 §14.1 | HIGH |
| Evidence | Observation with timestamp, component context, and provenance; distinct from the observation itself | EC-02 §16.1; §18 | HIGH |
| Domain linkage | HouseMaster Building State / domain-interpretation path. Observation may lead to symptom, defect, risk, or action only through domain rules and professional validation | EC-02 §4a; §16.1; §18 | HIGH |

## Preserved distinctions

- PHYSICAL STATE ≠ OBSERVATION
- OBSERVATION ≠ EVIDENCE
- CONNECTIVITY EVENT ≠ ENGINEERING EVENT
- ACCEPTED DATA ≠ ENGINEERING TRUTH

## Graph extraction

### Nodes

| ID | Label | Domain | Status | Source ref | Confidence | What it means | What it does not mean |
|---|---|---|---|---|---|---|---|
| N-01 | PHYSICAL MCD | PHYSICAL BUILDING | DOCUMENTED_CONTEXT | EC-02 §1; §18 | HIGH | SEM-MCD-001 as the physical reference context | Every object, location, or condition is already known |
| N-02 | OBSERVED OBJECT / ENGINEERING COMPONENT | PHYSICAL / ENGINEERING | EVIDENCE_BOUNDED | EC-02 §1; §3; §14 | HIGH | An evidence-bounded target and observable condition | A component location is confirmed or a device exists |
| N-03 | OBSERVATION POINT | OBSERVABILITY | L1_CONCEPTUAL_CANDIDATE | EC-02 §3; §3.1 | HIGH | A conceptual physical/engineering point for observation | A siteable or field-instantiated point |
| N-04 | DEVICE / HUMAN OBSERVATION CHANNEL | OBSERVATION ACQUISITION | CONCEPTUAL_CHANNEL | EC-02 §4a.1; §14.1 | HIGH | Machine and/or human observation; documentary evidence may accompany the record | A sensor, model, protocol, or installed device has been selected |
| N-05 | CONNECTIVITY / TRANSPORT WHERE APPLICABLE | CONNECTIVITY | CONDITIONAL_TBD | EC-02 §17 | HIGH | A conditional transport stage for machine-capable observations | Connectivity topology, RF, power, provisioning, or an engineering event |
| N-06 | HOUSEMASTER INTEGRATION / ACCEPTANCE | HOUSEMASTER BOUNDARY | CONCEPTUAL_BOUNDARY | EC-02 §1; §18 | HIGH | Conceptual entry into HouseMaster for acceptance and interpretation | A defined API, integration contract, schema, or verified engineering truth |
| N-07 | CANONICAL OBSERVATION | HOUSEMASTER OBSERVATION | DEFINED_TAXONOMY | EC-02 §14.1 | HIGH | A machine, human, documentary, or derived observation represented in the canonical taxonomy | Evidence by itself, a defect, or an engineering fact |
| N-08 | EVIDENCE / PROVENANCE | EVIDENCE | PROVENANCE_REQUIRED | EC-02 §16.1; §18 | HIGH | Observation supported by timestamp, component context, and provenance | The observation and evidence are interchangeable or the engineering condition is verified |
| N-09 | DOMAIN LINKAGE / BUILDING STATE | HOUSEMASTER DOMAIN | DOMAIN_RULE_GATED | EC-02 §4a; §16.1; §18 | HIGH | Linkage toward Building State and possible symptom/defect/risk/action interpretation | An automatic defect conclusion or verified engineering truth |

### Edges

| ID | From → To | Label | Domain | Status | Source ref | Confidence | What it means | What it does not mean |
|---|---|---|---|---|---|---|---|---|
| E-01 | N-01 → N-02 | scopes physical target | PHYSICAL / ENGINEERING | EXPLICIT | EC-02 §1; §18 | HIGH | Observation begins from an evidence-bounded physical context | The target location or topology is known |
| E-02 | N-02 → N-03 | defines candidate observation point | OBSERVABILITY | L1_CANDIDATE | EC-02 §3; §3.1 | HIGH | The physical target can be mapped to a conceptual observation point | The point can be sited or instantiated |
| E-03 | N-03 → N-04 | observed through applicable channel | OBSERVATION ACQUISITION | CONCEPTUAL | EC-02 §4a.1; §14.1 | HIGH | Observation may be machine, human, or documentary | A device decision has been made |
| E-04 | N-04 → N-05 | machine path where applicable | CONNECTIVITY | CONDITIONAL | EC-02 §17 | HIGH | Machine-capable observations may require future transport | Every observation requires connectivity or a topology is selected |
| E-05 | N-04 → N-06 | human/documentary path | HUMAN / DOCUMENTARY | EXPLICIT_BYPASS | EC-02 §4a.3; §17 | HIGH | Human/documentary observations can enter HouseMaster without device connectivity | Human observation is dependent on a machine channel |
| E-06 | N-05 → N-06 | transport to acceptance boundary | CONNECTIVITY / INTEGRATION | CONCEPTUAL | EC-02 §1; §17; §18 | HIGH | Transport, when applicable, precedes HouseMaster acceptance | A connectivity event is an engineering event or an API is defined |
| E-07 | N-06 → N-07 | accept and represent | HOUSEMASTER OBSERVATION | CONCEPTUAL | EC-02 §1; §14.1; §18 | HIGH | Accepted input is represented as a canonical observation | Accepted data is engineering truth |
| E-08 | N-07 → N-08 | attach context and provenance | EVIDENCE | REQUIRED | EC-02 §16.1; §18 | HIGH | Timestamp, component context, and provenance establish an evidence-bearing record | Observation and evidence are the same semantic object |
| E-09 | N-07 → N-09 | link observation to domain interpretation | HOUSEMASTER DOMAIN | DOMAIN_RULE_GATED | EC-02 §4a; §16.1 | HIGH | Canonical observation can be interpreted in the HouseMaster domain | A defect or engineering state is automatically verified |
| E-10 | N-08 → N-09 | support domain interpretation | EVIDENCE / DOMAIN | DOMAIN_RULE_GATED | EC-02 §4a; §16.1; §18 | HIGH | Evidence supports domain interpretation and Building State | Evidence alone proves defect, risk, or engineering truth |

## Guardrails

- OBSERVATION ≠ EVIDENCE
- DEVICE SIGNAL ≠ DEFECT
- CONNECTIVITY STATE ≠ ENGINEERING STATE
- ACCEPTED EVENT ≠ VERIFIED ENGINEERING FACT

## Counts

| Measure | Count |
|---|---:|
| Nodes | 9 |
| Edges | 10 |
| Guardrails | 4 |

ALAU AI is not required by the extracted A3-EC02-02 source logic and is excluded from this page.

