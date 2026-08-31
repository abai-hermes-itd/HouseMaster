# A3-EC02-01 — Source Extract

## Control

- Page ID: `A3-EC02-01`
- Title: `Observability Narrative`
- Stage: `P3_OBSERVABILITY_COMPLETION`
- Production No.: `P3-01`
- Case Assembly No.: `011`
- IR type: `NARRATIVE / OBSERVABILITY MODEL`
- Status: `REVIEW`
- Reference object: `SEM-MCD-001 — Semey, Shakarima 13A`
- Primary semantic authority: `EC-02_PHYSICAL_TO_OBSERVATION_SEM-MCD-001_v0.3_REVIEW.md`
- Source sections used: `§1–§4a`, `§8–§14.1`, `§15`, `§16–§16.2`, `§18`
- Registry references used: `A3-P0_PAGE_REGISTRY_v0.4_REVIEW.md` entry for `A3-EC02-01`; `A3-P0_PAGE_SPEC_TEMPLATE_v0.4.md`
- Source reread outside required EC-02 context: `NO`

## Extracted page purpose

Explain how a source-backed physical condition at `SEM-MCD-001` can become a provenance-bearing HouseMaster observation without merging the physical object, observable condition, observation point, channel, observation, evidence, defect, or building state.

The page is a conceptual narrative. It is not the hero graph, the 18-row observability matrix, the detailed reference-observation sheet, a device deployment plan, or a connectivity design.

## Canonical thesis

`OBSERVABILITY ≠ SENSORIZATION`

HouseMaster begins with an engineering question that requires evidence. A device is one possible observation channel; it is not the starting point or a prerequisite for observability.

Source basis:

- EC-02 §3: an Observation Point is a physical/engineering concept that exists whether or not a device is installed.
- EC-02 §4a.1–§4a.3: Machine and Human are co-applicable domain channels; Human remains usable independently of machine deployment and Beeline connectivity.
- EC-02 §18: the narrative page uses the sequence physical building / engineering question → observable condition and evidence channel → HouseMaster state.

## Canonical semantic sequence

The EC-02 narrative sequence preserved for this page is:

`SEM-MCD-001 / PHYSICAL BUILDING`
`→ ENGINEERING SYSTEM / ZONE / COMPONENT CONTEXT`
`→ OBSERVABLE CONDITION`
`→ OBSERVATION POINT CANDIDATE`
`→ MACHINE AND/OR HUMAN / DOCUMENTARY CHANNEL`
`→ OBSERVATION`
`→ PROVENANCE / CONTEXT GATE`
`→ EVIDENCE`
`→ DOMAIN / PROFESSIONAL VALIDATION`
`→ RULE-GATED DOMAIN INTERPRETATION`
`→ DEFECT AND/OR BUILDING STATE ONLY WHERE RULES PASS`

This preserves the more explicit EC-02 acceptance boundary rather than implying a direct physical-condition-to-state conversion.

## Narrative blocks extracted

### NB-01 — What is observability?

Observability is the ability to associate a physical condition with a real building context, an Observation Point, an appropriate channel, time and source context, provenance, and a HouseMaster-accepted observation record. It does not require full sensor coverage.

### NB-02 — What is an Observation Point?

An Observation Point is a physical/engineering concept attached to a building, system, component, or zone context. It identifies where or under what condition an observation can be made. It may be served by human inspection, a future device, or more than one channel. It is not itself a device and does not prove that a device is installed.

### NB-03 — How do Human and Machine channels coexist?

The channels are co-applicable, not sequential, and not mutually exclusive.

- Channel A — Machine / Device-Assisted: a future measurement, state, counter, or event produced or forwarded through a device where later evidence and design permit it.
- Channel B — Human / Documentary: inspection, checklist, manual reading, field assessment, photo, note, act, passport, service record, or inspection record through a provenance-bearing HouseMaster workflow where applicable.

Human observation is not a fallback-only or lower-trust channel by default. Channel suitability depends on the engineering question and evidence criteria.

### NB-04 — When does an observation become evidence?

An incoming observation becomes evidence only when required object context and provenance criteria pass. Evidence may then enter domain or professional validation. Defect or building-state assertions remain separately rule-gated.

`OBSERVATION → PROVENANCE / CONTEXT GATE → EVIDENCE → DOMAIN / PROFESSIONAL VALIDATION → RULE-GATED INTERPRETATION`

### NB-05 — Why does connectivity not equal engineering state?

Machine connectivity is a downstream transport boundary for a machine-capable observation. It can affect delivery or availability of an observation but cannot create engineering truth. Loss of the observation channel is an evidence gap or connectivity question, not proof of physical failure.

Human path: `REAL BUILDING → HUMAN / DOCUMENTARY OBSERVATION → HOUSEMASTER`

Machine path: `REAL BUILDING → MACHINE OBSERVATION CANDIDATE → CONNECTIVITY BOUNDARY → HOUSEMASTER`

No Beeline topology, Direct/Edge choice, SIM, API, payload, RF, provisioning, or coverage claim belongs on this page.

### NB-06 — What remains unknown for SEM-MCD-001?

All EC-02 physical observation candidates remain conceptual and non-siteable in the current evidence base. Exact observation-point locations, component/device mounting positions, installed-device status, machine coverage, field validation, site power/environment/access constraints, and connectivity feasibility remain open or TBD as applicable.

No unknown is closed by page composition.

## Two-channel model

### Channel A — Machine / Device-Assisted

- Status: `CONCEPTUAL / CANDIDATE`
- EC-02 basis: §4a, §14.1, §15.x, §17
- May measure, timestamp, buffer, or forward where a future implementation supports those functions.
- Does not mean a sensor, meter interface, protocol, mounting point, or installed device exists.
- Connectivity is downstream of the observation/device function.

### Channel B — Human / Documentary

- Status: `AVAILABLE IN PRINCIPLE WHERE ACCESS AND CONTEXT ALLOW`
- EC-02 basis: §4a.1–§4a.3, §14.1, §15.x
- Includes inspection/checklist/manual reading/field assessment and documentary evidence such as photo or act where applicable.
- Does not depend on machine-channel deployment or Beeline connectivity.
- Retains the same need for building/object context and provenance.

Channel relationship: `CO-APPLICABLE / NOT SEQUENTIAL / NOT MUTUALLY EXCLUSIVE`.

## Observation Point model

- Concept type: physical / engineering.
- Context attachment: building / system / component / zone.
- Function: identifies the physical place or condition at which an observation may be made.
- Channel dependency: none; a point can exist conceptually without a device.
- Current SEM-MCD-001 readiness: `L1 — CONCEPTUAL CANDIDATE` for valid candidates; `L2+ = 0`.
- Installation implication: none.
- Location implication: none; no exact location may be inferred.

## HouseMaster acceptance and provenance model

HouseMaster owns observation/evidence semantics, anchors the record to engineering context, preserves provenance, applies acceptance rules, and maintains domain history/state.

Required fields where applicable:

- building / object context;
- system / component / zone context;
- observation point;
- observation channel;
- `event_time`;
- recorded / received time;
- actor / source / device identity;
- attachment / photo reference;
- source provenance;
- confidence / validation status.

Time boundary required by the approved page brief:

- `event_time ≠ recorded / received time`;
- later recording or receipt does not rewrite when the physical observation occurred;
- no event does not prove a normal condition;
- no new observation does not prove an unchanged engineering state.

Values not established by EC-02 remain `TBD`; the page defines fields and boundaries, not fabricated record values.

## Compact reference candidate

Only one compact candidate is retained on this narrative page to demonstrate the model without duplicating `A3-EC02-03` or `A3-EC02-04`.

### OBS-CAND-001 — Heating temperature condition

- observation_candidate_id: `OBS-CAND-001`
- OC ID: `OC-001`
- building/system context: `SEM-MCD-001 / HEATING — system existence VERIFIED`
- observable condition: `Temperature condition at heating system-entry context`
- observation point status: `CANDIDATE / L1`
- human-observation applicability: `YES — general assessment observable now in principle`
- machine-observation applicability: `YES — pending field-confirmed siting`
- device candidate status: `CONCEPTUAL / NOT SELECTED / NOT INSTALLED`
- location status: `TBD — component location not established`
- provenance/source_ref: `EC-02 §15 OBS-CAND-001; §16; EC-01 BF-015 referenced by EC-02`
- confidence: `VERIFIED system existence / TBD component location`
- validation requirement: `Field-confirm heating-entry location before any machine device can be sited; preserve provenance/context acceptance`
- what_it_does_not_mean: `Does not instantiate HEAT-xx, prove a device exists, establish a mounting point, select a channel implementation, or define connectivity.`

## Required guardrails

1. `OBSERVABILITY ≠ SENSORIZATION`
2. `OBSERVATION POINT ≠ DEVICE`
3. `OBSERVATION ≠ EVIDENCE`
4. `EVIDENCE ≠ DEFECT`
5. `HUMAN OBSERVATION ≠ MACHINE DEPENDENCE`

Supporting rules, excluded from the guardrail count:

- `PHYSICAL CONDITION ≠ OBSERVATION`
- `NO NEW OBSERVATION ≠ NO PHYSICAL CHANGE`
- `CONNECTIVITY STATE ≠ ENGINEERING STATE`
- `DEVICE CANDIDATE ≠ INSTALLED DEVICE`
- `OBSERVABILITY ≠ FULL SENSOR COVERAGE`

`VISUAL COVERAGE ≠ OBSERVABILITY COVERAGE` is retained as an owner-required supporting boundary; no coverage visualization or percentage is created.

## Open / TBD items retained

1. Exact physical observation-point locations — `TBD`.
2. Device mounting locations — `TBD`.
3. Installed-device status — `TBD / NOT ESTABLISHED`.
4. Machine-observation coverage — `TBD`.
5. Site validation — `REQUIRED / NOT COMPLETED`.
6. Power, environmental, and access constraints at candidate points — `TBD`.
7. Connectivity feasibility — `TBD`; downstream machine-channel concern only.

EC-02-specific items remain open: `TBD-EC02-01…04`. Existing EC-01 TBDs are referenced only through EC-02 and are not reopened.

## Page boundaries

- A3-EC02-01: narrative / conceptual meaning.
- A3-EC02-02: hero physical-to-observation graph.
- A3-EC02-03: full 18-row master observability matrix.
- A3-EC02-04: detailed `OBS-CAND-001` worked example.

This page excludes network topology, device deployment, Direct/Edge selection, sensor/device counts, protocols/APIs, RF assumptions, coverage percentages, maturity scoring, ALAU AI, Drawio, PDF, and 3D.

## Extract counts

- Narrative blocks: `6`
- Semantic objects: `16`
- Relationships: `22`
- Observation channels: `2`
- Observation candidates included on this page: `1`
- Guardrails: `5`
- Open/TBD items summarized: `7`

