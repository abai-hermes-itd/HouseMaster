# A3-EC02-03 — Page Spec

## Control

- PAGE ID: `A3-EC02-03`
- TITLE: `Master Observability Matrix`
- STAGE: `P3_OBSERVABILITY_COMPLETION`
- PRODUCTION NO.: `P3-02`
- CASE ASSEMBLY NO.: `013`
- SOURCE GATE: `EC-02`
- SOURCE FILE: `EC-02_PHYSICAL_TO_OBSERVATION_SEM-MCD-001_v0.3_REVIEW.md`
- SOURCE SECTIONS: `§3–§4a`, `§8–§17`, especially `§15`, `§15.x`, `§15.y`
- SOURCE LINKAGE STATUS: `LINKED`
- PRIMARY PAGE TYPE: `PT-04 MASTER MATRIX`
- SECONDARY CHARACTERISTIC: `NONE`
- IR TYPE: `MATRIX / OBSERVABILITY MASTER REGISTER`
- PAGE SPEC STATUS: `PAGE_SPEC_READY`
- OWNER APPROVAL: `APPROVED FOR RENDERING`
- GRAPH ID: `A3-EC02-03-OBSERVABILITY-MASTER-MATRIX`
- REFERENCE OBJECT: `SEM-MCD-001 — Semey, Shakarima 13A`

## Purpose

Present the complete source-backed EC-02 observation-candidate register for `SEM-MCD-001`, keeping engineering context, Human/Machine applicability, source confidence, candidate readiness, provenance, validation requirements, unresolved implementation inputs, and downstream restrictions visible in one canonical matrix.

## Primary audience

HouseMaster engineering/domain teams, building specialists, telecom/connectivity specialists, and technical workshop participants who require a common evidence-gated register before later implementation decisions.

## Engineering question

For every EC-02 observable condition, what belongs to the engineering context, how can Human and/or Machine channels observe it conceptually, what evidence is required, what remains unvalidated, and what must not yet be inferred?

## One-sentence thesis

`MASTER OBSERVABILITY MATRIX ≠ DEVICE DEPLOYMENT PLAN` — the register defines evidence-gated observation candidates, not installed devices or selected connectivity.

## Content and evidence status

- CONTENT STATUS: `REVIEW`
- EVIDENCE STATUS: `VERIFIED / PARTIAL / TBD / CONCEPTUAL` mix retained per row.
- SYSTEM-EXISTENCE AND LOCATION STATUS: separate fields; system existence never promotes component location.
- SEMANTIC CHANGE REQUIRES OWNER GATE: `YES`
- RENDERING MAY PROMOTE CONFIDENCE: `NO`

## Primary page logic

This is the full Master Matrix page. It must answer for each of the 18 rows:

1. What engineering condition is observed?
2. Where in engineering context does it belong?
3. What is the Observation Point status?
4. Can Human observe it?
5. Can Machine observe it conceptually?
6. What evidence/provenance is required?
7. What validation remains required?
8. What must not yet be inferred?

## Required matrix columns

Render the frozen row semantics through these compact publication columns:

1. `ID`
2. `ENGINEERING CONTEXT`
3. `OBSERVABLE CONDITION / QUESTION`
4. `OBSERVATION POINT STATUS`
5. `HUMAN CHANNEL`
6. `MACHINE CHANNEL`
7. `EVIDENCE / PROVENANCE`
8. `VALIDATION / OPEN ITEMS`
9. `DOWNSTREAM RESTRICTION`

The Graph IR retains the expanded fields behind each publication column:

- `observation_candidate_id`;
- `oc_id`;
- `engineering_system`;
- `building_zone_component_context`;
- `engineering_question`;
- `observable_condition`;
- `observation_point_definition`;
- `observation_point_status`;
- `human_channel_applicability`;
- `machine_channel_applicability`;
- `human_observation_form`;
- `machine_observation_form`;
- `device_candidate_status`;
- `installed_device_status`;
- `exact_location_status`;
- `site_validation_required`;
- `connectivity_required_if_machine`;
- `provenance_requirement`;
- `source_ref`;
- `source_confidence`;
- `validation_status`;
- `what_it_means`;
- `what_it_does_not_mean`;
- `open_items`;
- `downstream_restriction`.

No field may be dropped semantically to simplify the publication matrix. If a field is compacted into a token or a row note, the mapping must remain explicit in the layout manifest.

## Matrix row set

Render exactly the source-backed row set:

`OBS-CAND-001…OBS-CAND-018`

- Row count: `18`.
- `OBS-CAND-001` is included as an ordinary reference row, not visually privileged.
- No row may be added, removed, merged, promoted, or demoted.
- Do not duplicate the detailed `A3-EC02-04` worked example.

## Channel model

Human and Machine remain:

- `CO-APPLICABLE`;
- `NOT SEQUENTIAL`;
- `NOT MUTUALLY EXCLUSIVE`.

Do not rank either channel as superior.

### Human / Documentary

Preserve only row-supported forms: inspection, checklist, manual reading, visual assessment, photo, note, act, documentary or maintenance record. Conditional access/gauge/interface requirements must remain visible. Human must not be styled as fallback-only or lower-trust.

### Machine

Machine applicability is conceptual. Preserve row-supported data forms: scalar measurement, counter/interface reading, binary state, and event capture. Machine rows may be described as capable of timestamping, buffering, or forwarding, but must not imply a selected sensor, vendor, installed device, mounting point, local protocol, SIM identity, RF result, API, sampling interval, threshold, or coverage.

`OBS-CAND-014` and `OBS-CAND-016` remain `DOCUMENTARY/HUMAN` in the current source model and do not acquire a machine-connectivity requirement.

## Observation Point readiness

- Valid matrix rows: `L1 — CONCEPTUAL CANDIDATE`.
- L1 row count: `18`.
- L2+ siteable count: `0`.
- Confirmed Observation Point location count: `0`.
- Site-validation-required row count: `18`.
- Installation-ready count: `0`.
- Installed device count: `0 CONFIRMED`; actual physical presence remains `NOT ESTABLISHED`.

Preserve:

- `OBSERVATION POINT ≠ DEVICE`;
- `CANDIDATE ≠ INSTALLED DEVICE`;
- `TBD LOCATION ≠ NO PHYSICAL COMPONENT`;
- `SYSTEM EXISTS ≠ COMPONENT LOCATION KNOWN`.

## Evidence / provenance model

Every row retains where applicable:

`CLAIM / OBSERVATION`
`→ OBJECT CONTEXT`
`→ OBSERVATION POINT`
`→ CHANNEL`
`→ TIME`
`→ SOURCE / ACTOR / DEVICE`
`→ ATTACHMENT / RECORD`
`→ SOURCE REFERENCE`
`→ CONFIDENCE`
`→ VALIDATION STATUS`

Do not invent actual record values.

Preserve:

- `event_time ≠ recorded / received time`;
- `NO EVENT ≠ NORMAL CONDITION`;
- `NO NEW OBSERVATION ≠ UNCHANGED ENGINEERING STATE`;
- `OBSERVATION ≠ EVIDENCE`;
- `EVIDENCE ≠ DEFECT`.

Observation becomes evidence only when context/provenance criteria pass. Engineering interpretation remains domain/professional-validation gated.

## Connectivity boundary

For each Machine/Both row, use only the compact semantic token:

`CONNECTIVITY IF MACHINE: REQUIRED / TBD / DOWNSTREAM VALIDATION`

For `OBS-CAND-014` and `OBS-CAND-016`, show:

`CONNECTIVITY IF MACHINE: NOT REQUIRED FOR CURRENT HUMAN/DOCUMENTARY MODEL`

Do not render Direct, Edge, SIM, network topology, RF, API, payload, provisioning, or Beeline-internal architecture.

## Secondary panel — Observability status summary

Show source-derived metrics only:

- total candidate rows: `18`;
- observation channels: `2`;
- observation class: `BOTH 16 / DOCUMENTARY-HUMAN 2`;
- L1 row-level candidates: `18`;
- L2+ siteable: `0`;
- installed devices: `0 CONFIRMED / ACTUAL STATUS NOT ESTABLISHED`;
- confirmed Observation Point locations: `0`;
- site-validation-required rows: `18`;
- installation-ready: `0`;
- observable now through Human: `8`;
- observable after field mapping: `10`.

Do not turn summary metrics into a score, maturity ladder, or coverage percentage.

## Tertiary panel — Channel / evidence legend

Channel tokens:

- `HUMAN`
- `MACHINE`
- `BOTH`
- `TBD`

Evidence/status tokens:

- `VERIFIED`
- `PARTIAL`
- `TBD`
- `NO EVIDENCE`
- `CONCEPTUAL / CANDIDATE`

This is an evidence/channel legend, not severity or risk.

## Open / TBD themes

Retain per row where applicable:

- exact Observation Point location;
- component/node location;
- device mounting location;
- installed-device status;
- field/site validation;
- accessible gauge/interface existence;
- power/environment/access constraints;
- machine-channel feasibility;
- connectivity feasibility;
- provenance completeness;
- source uncertainty/confidence upgrade;
- hot-water and sewer ontology gaps.

Do not close open items by table design.

## Required guardrails

1. `MASTER OBSERVABILITY MATRIX ≠ DEVICE DEPLOYMENT PLAN`
2. `OBSERVATION POINT ≠ DEVICE`
3. `CANDIDATE ≠ INSTALLED DEVICE`
4. `SYSTEM EXISTS ≠ COMPONENT LOCATION KNOWN`
5. `MATRIX ROW COVERAGE ≠ FULL BUILDING OBSERVABILITY`

Supporting rules:

- `HUMAN OBSERVATION ≠ MACHINE DEPENDENCE`
- `OBSERVATION ≠ EVIDENCE`
- `EVIDENCE ≠ DEFECT`
- `UNKNOWN ≠ ABSENT`
- `CONNECTIVITY STATE ≠ ENGINEERING STATE`
- `NO EVENT ≠ NORMAL CONDITION`
- `TBD LOCATION ≠ NO PHYSICAL COMPONENT`

## Coverage exclusions

- No coverage percentage.
- No observability score.
- No sensor-coverage target.
- No maturity score.
- Matrix row coverage does not claim completeness of building observability.

## Layout

- FORMAT: `A3 LANDSCAPE`
- GRID: `12 FULL-WIDTH`
- PRIMARY VISUAL: `18-ROW MASTER OBSERVABILITY MATRIX`
- SECONDARY VISUAL: `OBSERVABILITY STATUS SUMMARY`
- TERTIARY VISUAL: `CHANNEL / EVIDENCE LEGEND`
- DENSITY: `HIGH`

The matrix is first-class content. Do not shrink text below A3-P0 minimums. If visual compilation cannot retain legibility, use the A3-P0 logical-splitting rule without changing this canonical Page ID or semantic row set; any split remains a rendering decision gated at Drawio compile.

## Mandatory content

- All 18 source rows.
- All nine publication columns.
- Human and Machine applicability.
- Separate system-existence and location status.
- L1/L2+ readiness and validation state.
- Per-row provenance/source confidence.
- Per-row open items and downstream restriction.
- Five required guardrails.
- Summary and legend panels.
- Provenance footer and related-page boundary.

## Optional content

- Compact grouping by engineering system, provided row order and row identity remain intact.
- Compact source-ref markers.
- No separate `OBS-CAND-001` callout.

## Production tokens

Reference canonical A3-P0 tokens by name only:

- PAGE GEOMETRY: `PAGE-A3-LANDSCAPE` and canonical margin/grid/title/provenance bands.
- TYPE: `TYPE-H1`, `TYPE-H2`, `TYPE-H3`, `TYPE-BODY`, `TYPE-TABLE`, `TYPE-ANNOTATION`, `TYPE-STATUS`, `TYPE-FOOTER`.
- STATUS: `STATUS-VERIFIED`, `STATUS-PARTIAL`, `STATUS-PROPOSED`, `STATUS-TBD`, `STATUS-NO-EVIDENCE`.
- DOMAIN: HouseMaster observation/evidence semantics; Beeline only as downstream Machine connectivity boundary if shown.
- FLOW/LINE: matrix/table lines; no network flow field is required.

No local replacement of canonical token semantics is allowed.

## Status labels

- `VERIFIED`: system existence where source-backed.
- `PARTIAL`: basement, roof, and lift-count context where source-backed.
- `TBD`: locations, interfaces, access, constraints, and feasibility.
- `CONCEPTUAL / CANDIDATE`: L1 Observation Points and Machine capability.
- `NO EVIDENCE`: legend/reference only; do not assign it to a row not carrying that source status.

## Source / provenance footer

- PAGE ID: `A3-EC02-03`
- SOURCE GATE: `EC-02`
- SOURCE: `EC-02_PHYSICAL_TO_OBSERVATION_SEM-MCD-001_v0.3_REVIEW.md`
- SOURCE SECTIONS: `§3–§4a; §8–§17; §15; §15.x; §15.y`
- REFERENCE OBJECT: `SEM-MCD-001 — Semey, Shakarima 13A`
- EVIDENCE STATUS: `VERIFIED / PARTIAL / TBD / CONCEPTUAL MIX`
- REVISION: `IR REVIEW`
- OPEN/TBD: `PER ROW; NO ITEM CLOSED`
- RELATED PAGES: `A3-EC02-01`, `A3-EC02-02`, `A3-EC02-04`

## Do not imply

- that this matrix is a device deployment plan;
- that a candidate is an installed device;
- that an Observation Point is a device;
- that system existence confirms a component location;
- that the 18 rows constitute full building-observability coverage;
- an installed-device count beyond `0 confirmed / actual status not established`;
- a confirmed Observation Point location;
- a sensor, vendor, mounting point, protocol, SIM, RF result, API, threshold, interval, topology, or coverage;
- Direct or Edge selection;
- automatic evidence, defect, or engineering-state inference;
- ALAU AI participation.

## Related pages

- `A3-EC02-01` — narrative / conceptual observability meaning.
- `A3-EC02-02` — hero physical-to-observation graph.
- `A3-EC02-03` — master observability matrix.
- `A3-EC02-04` — detailed `OBS-CAND-001` reference example.

## Counts to preserve

- Matrix rows: `18`
- Observation channels: `2`
- L1 candidates: `18`
- L2+ siteable: `0`
- Installed devices: `0 CONFIRMED / ACTUAL STATUS NOT ESTABLISHED`
- Confirmed Observation Point locations: `0`
- Site-validation-required rows: `18`
- Guardrails: `5`

## Production status

- DESIGN STATUS: `PAGE_SPEC_READY`
- TECH QA STATUS: `NOT STARTED`
- OWNER APPROVAL: `APPROVED FOR RENDERING`
- DRAWIO CREATED: `0`
- PDF CREATED: `0`
- NEXT GATE: `SEMANTIC REVIEW`
