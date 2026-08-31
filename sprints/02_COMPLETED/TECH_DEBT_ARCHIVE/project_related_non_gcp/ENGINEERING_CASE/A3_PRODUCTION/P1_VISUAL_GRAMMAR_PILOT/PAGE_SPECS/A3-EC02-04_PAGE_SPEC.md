# A3-EC02-04 — PAGE SPEC

## Control

| Field | Value |
|---|---|
| Page ID / Graph ID | A3-EC02-04 |
| Production number | P1-05 |
| Title | Reference Observation — OBS-CAND-001 |
| IR type | FLOW |
| Page spec status | PAGE_SPEC_READY |
| Owner approval | APPROVED FOR VISUAL COMPILATION |
| Semantic source | `A3-EC02-04_GRAPH_IR.yaml` |
| Drawio | NOT CREATED |
| PDF | NOT CREATED |

## Purpose

Show one concrete reference observation from physical condition through observation capture, provenance, HouseMaster acceptance and domain linkage, while preserving the difference between observation, evidence and engineering conclusion.

## Source-backed example

Render only the EC-02-selected reference candidate:

- Observation: `OBS-CAND-001`
- Observation point: `OC-001`
- System: `HEATING — VERIFIED`
- Physical context: `Heating system entry (component location TBD)`
- Observable condition: `Temperature condition (supply/return)`
- Observation class: `BOTH (Machine + Human)`
- Specific component: `TBD`
- Location: `TBD`

Do not substitute a different example.

## Flow specification

Render all 11 flow steps in IR order:

`SEM-MCD-001 → ENGINEERING SYSTEM — HEATING → PHYSICAL CONTEXT / COMPONENT CANDIDATE → OBSERVABLE CONDITION — TEMPERATURE → OBSERVATION POINT — OC-001 / OBS-CAND-001 → OBSERVATION CHANNEL — MACHINE AND/OR HUMAN → RAW / CAPTURED OBSERVATION → CONTEXT + TIMESTAMP + PROVENANCE → EVIDENCE-BEARING RECORD → HOUSEMASTER ACCEPTANCE → DOMAIN LINKAGE / HOUSEMASTER BUILDING STATE`

This is a production decomposition of the exact EC-02 §16.1 sequence. The visual must retain the source order and must not imply implementation detail.

## Step requirements

Every flow step must preserve:

- ID
- label
- semantic role
- domain
- status
- source reference
- confidence
- required context
- what it means
- what it does not mean

The page may use a compact annotation rail keyed by step ID for long `required_context`, `what_it_means`, and `what_it_does_not_mean` fields.

## Edge requirements

Render all 10 edges in source order. Every edge must preserve:

- ID
- from
- to
- label
- status
- source reference
- what it means
- what it does not mean

## Provenance block

Make these fields visible without inventing values:

| Field | Display value |
|---|---|
| Observation time / timestamp | REQUIRED; VALUE TBD |
| Observed object / component context | Heating system entry candidate; specific component/location TBD |
| Observation channel | Machine measurement and/or human note; actual channel TBD |
| Source / actor / device provenance | REQUIRED; ACTOR TBD; DEVICE TBD |
| Evidence attachment / context | Component context required; attachment TBD |

TBD values must remain visibly unresolved.

## Critical distinctions

Make all four separations explicit:

- OBSERVATION ≠ EVIDENCE
- EVIDENCE ≠ DEFECT
- DEVICE / HUMAN INPUT ≠ ENGINEERING FACT
- ACCEPTED RECORD ≠ VERIFIED BUILDING STATE

## Guardrail band

Render verbatim:

- OBSERVATION ≠ EVIDENCE
- EVIDENCE ≠ DEFECT
- CAPTURED DATA ≠ ENGINEERING TRUTH
- DOMAIN INTERPRETATION REQUIRES RULES / VALIDATION

## Status treatment

- `VERIFIED` applies only to the physical heating-system basis.
- `PROPOSED` / candidate statuses apply to observation architecture and record-flow stages.
- `TBD_SITE_SURVEY`, channel TBD, and provenance values TBD must remain visibly unresolved.
- HouseMaster acceptance must not visually imply engineering validation.
- Domain linkage must show `RULES_VALIDATION_REQUIRED`.

## Provenance footer

Show:

- `PAGE: A3-EC02-04`
- `GRAPH: A3-EC02-04`
- `PRODUCTION: P1-05`
- `SOURCE GATE: EC-02`
- `SOURCE: EC-02_PHYSICAL_TO_OBSERVATION_SEM-MCD-001_v0.3_REVIEW.md`
- `REFERENCE OBSERVATION: OBS-CAND-001 / OC-001`
- `IR: REVIEW`
- `PAGE SPEC: REVIEW`
- `IR TYPE: FLOW`
- `STEPS: 11`
- `EDGES: 10`
- `GUARDRAILS: 4`

## Production constraints

- Do not show ALAU AI.
- Do not introduce Beeline internal connectivity architecture.
- Do not invent a sensor, device installation, component location, protocol, API, schema, actor, timestamp value, attachment, defect, or engineering truth.
- Do not create Drawio, PDF, or 3D output at this gate.

## Gate

NEXT GATE: SEMANTIC REVIEW
