# A3-EC02-03 — Source Extract

## Control

- Page ID: `A3-EC02-03`
- Title: `Master Observability Matrix`
- Stage: `P3_OBSERVABILITY_COMPLETION`
- Production No.: `P3-02`
- Case Assembly No.: `013`
- IR type: `MATRIX / OBSERVABILITY MASTER REGISTER`
- Status: `REVIEW`
- Reference object: `SEM-MCD-001 — Semey, Shakarima 13A`
- Primary semantic authority: `EC-02_PHYSICAL_TO_OBSERVATION_SEM-MCD-001_v0.3_REVIEW.md`
- Source sections used: `§3–§4a`, `§8–§17`, especially `§15`, `§15.x`, `§15.y`
- Registry reference: `A3-P0_PAGE_REGISTRY_v0.4_REVIEW.md / A3-EC02-03`
- Source reread outside required EC-02 context: `NO`

## Extracted purpose

Create the canonical EC-02 master register of all source-backed observable-condition candidates for `SEM-MCD-001`. The matrix records engineering context, candidate Observation Point readiness, Human/Machine applicability, evidence and provenance requirements, required validation, unresolved implementation inputs, and downstream restrictions.

## Canonical thesis

`MASTER OBSERVABILITY MATRIX ≠ DEVICE DEPLOYMENT PLAN`

The matrix states what engineering conditions may need observation and which evidence channels are conceptually applicable. It does not prove that a device is installed, a location is confirmed, or a connectivity design has been selected.

## Source-truth row set

EC-02 §15 defines exactly `18` stable rows: `OBS-CAND-001…OBS-CAND-018`.

| OBS ID | OC ID | Engineering context | Observable condition | Source class | Preferred channel | Observability status | Site validation |
|---|---|---|---|---|---|---|---|
| OBS-CAND-001 | OC-001 | Heating / system entry; location TBD | Temperature condition | BOTH | Human now; Machine pending siting | OBSERVABLE NOW (human) | YES — TBD-005 |
| OBS-CAND-002 | OC-001 | Heating / system entry; location TBD | Pressure condition | BOTH | Machine; Human if gauge accessible | AFTER FIELD MAPPING | YES — TBD-005 |
| OBS-CAND-003 | OC-002 | Heating / metering node; location and interface TBD | Flow/consumption condition | BOTH | Machine interface or Human manual reading | AFTER FIELD MAPPING | YES — TBD-005 |
| OBS-CAND-004 | OC-004 | Cold water / system entry; location TBD | Pressure condition | BOTH | Machine; Human if gauge accessible | AFTER FIELD MAPPING | YES — TBD-005 |
| OBS-CAND-005 | OC-004 | Cold water / system entry; location TBD | Flow condition | BOTH | Machine; Human if point accessible | AFTER FIELD MAPPING | YES — TBD-005 |
| OBS-CAND-006 | OC-005 | Cold water / metering node; location and interface TBD | Flow/consumption condition | BOTH | Machine or Human manual reading | AFTER FIELD MAPPING | YES — TBD-005 |
| OBS-CAND-007 | OC-006 | Hot water system; location TBD | Temperature/availability condition | BOTH | Human tap check now; Machine pending siting | OBSERVABLE NOW (human) | YES — TBD-005 |
| OBS-CAND-008 | OC-006 | Hot water system; location TBD | Leakage/water-presence indication | BOTH | Human visual now; Machine pending siting | OBSERVABLE NOW (human) | YES — TBD-005 |
| OBS-CAND-009 | OC-007 | Basement environment; zone existence PARTIAL | Water-presence/flooding indication | BOTH | Human/documentary if access; Machine pending zone confirmation | AFTER FIELD MAPPING | YES — TBD-003 / TBD-EC02-04 |
| OBS-CAND-010 | OC-007 | Basement environment; zone existence PARTIAL | Temperature condition | BOTH | Human/documentary or Machine after zone confirmation | AFTER FIELD MAPPING | YES — TBD-003 / TBD-EC02-04 |
| OBS-CAND-011 | OC-007 | Basement environment; zone existence PARTIAL | Humidity condition | BOTH | Human/documentary or Machine after zone confirmation | AFTER FIELD MAPPING | YES — TBD-003 / TBD-EC02-04 |
| OBS-CAND-012 | OC-008 | Electrical main board; location TBD | Supply-availability condition | BOTH | Human now; Machine pending siting | OBSERVABLE NOW (human) | YES — TBD-005 |
| OBS-CAND-013 | OC-008 | Electrical main board; location TBD | Outage/event condition | BOTH | Human now; Machine pending siting | OBSERVABLE NOW (human) | YES — TBD-005 |
| OBS-CAND-014 | OC-009 | Sewer collector/outlet; location TBD; ontology OP undefined | Overflow/backflow indication | DOCUMENTARY/HUMAN | Human/documentary primary; Machine TBD pending ontology extension | OBSERVABLE NOW (human) | YES — TBD-005 |
| OBS-CAND-015 | OC-010 | Roof surface; existence/type PARTIAL; access TBD | Moisture/water-ingress condition | BOTH | Human and optional Machine pending access | AFTER FIELD MAPPING | YES — TBD-004 |
| OBS-CAND-016 | OC-010 | Roof surface; existence/type PARTIAL; access TBD | Visual defect evidence | DOCUMENTARY/HUMAN | Photo/inspection | AFTER FIELD MAPPING | YES — TBD-004 |
| OBS-CAND-017 | OC-011 | Lift per entrance; count PARTIAL; location TBD | Availability/operational condition | BOTH | Human now; Machine pending siting | OBSERVABLE NOW (human) | YES — TBD-EC02-01 |
| OBS-CAND-018 | OC-011 | Lift per entrance; count PARTIAL; location TBD | Outage/event condition | BOTH | Human now; Machine pending siting | OBSERVABLE NOW (human) | YES — TBD-EC02-01 |

## Source-truth summary

- Matrix rows: `18`.
- Observation channels: `2` — Human and Machine.
- Channel relationship: `CO-APPLICABLE / NOT SEQUENTIAL / NOT MUTUALLY EXCLUSIVE`.
- Observation class distribution: `BOTH 16 / DOCUMENTARY-HUMAN 2`.
- Machine-capable rows: `16`.
- Human/documentary applicable rows: `18`, including conditional/access-gated forms.
- L1 row-level candidate count: `18`.
- L2/L3 siteable count: `0`.
- Confirmed Observation Point location count: `0`.
- Site-validation-required row count: `18`.
- Installation-ready count: `0`.
- Installed device count: `0 CONFIRMED`; actual installed-device presence is `NOT ESTABLISHED`, not proved absent.
- Observability status: `OBSERVABLE NOW (human) 8 / AFTER FIELD MAPPING 10`.
- Source confidence mix: system existence `VERIFIED` for heating, cold water, hot water, sewer, electrical and lifts; basement and roof context `PARTIAL`; all physical candidate locations remain `TBD`.

## Readiness and location model

- `L1 — CONCEPTUAL CANDIDATE`: system/zone existence is supported at `VERIFIED` or `PARTIAL`, but the component/location is not known.
- `L2 — SITEABLE CANDIDATE`: not reached by any source-backed row.
- `L3 — FIELD-INSTANTIATED`: not reached by any source-backed row.

Preserved boundaries:

- `OBSERVATION POINT ≠ DEVICE`.
- `CANDIDATE ≠ INSTALLED DEVICE`.
- `TBD LOCATION ≠ NO PHYSICAL COMPONENT`.
- `SYSTEM EXISTS ≠ COMPONENT LOCATION KNOWN`.

## Channel model

### Human / Documentary

Source-backed forms include inspection, visual assessment, manual reading, photo, note, and documentary/maintenance record where applicable. Applicability may depend on physical access or an accessible gauge/interface. Human is not a lower-trust or fallback-only channel by default.

### Machine

Machine applicability is conceptual only. Source-backed data forms include scalar measurement, counter/interface reading, binary state, event, and photo/document is explicitly excluded from Machine for `OBS-CAND-016`. A machine-capable row does not imply a selected sensor, vendor, installed device, mounting point, local protocol, SIM, RF result, API, sampling interval, threshold, or coverage.

For the 16 Machine/Both rows, connectivity is retained only as `REQUIRED / TBD / DOWNSTREAM VALIDATION`. `OBS-CAND-014` and `OBS-CAND-016` have no current machine-connectivity requirement in the approved model.

## Evidence, provenance, and time model

Each row retains, where applicable:

`CLAIM / OBSERVATION → OBJECT CONTEXT → OBSERVATION POINT → CHANNEL → TIME → SOURCE / ACTOR / DEVICE → ATTACHMENT / RECORD → SOURCE REFERENCE → CONFIDENCE → VALIDATION STATUS`

No actual record values are created.

Preserved time boundaries:

- `event_time ≠ recorded / received time`.
- `NO EVENT ≠ NORMAL CONDITION`.
- `NO NEW OBSERVATION ≠ UNCHANGED ENGINEERING STATE`.

Preserved evidence boundaries:

- `OBSERVATION ≠ EVIDENCE`.
- `EVIDENCE ≠ DEFECT`.
- Observation becomes evidence only after provenance/context criteria pass.
- Engineering meaning remains domain/professional-validation gated.

## Open / TBD themes retained per row where applicable

- exact Observation Point physical location;
- component/node location;
- device mounting location;
- installed-device status;
- site/field validation;
- accessible gauge or metering-interface existence;
- basement/roof existence or access confirmation;
- power/environment/access constraints;
- machine-channel feasibility;
- connectivity feasibility;
- provenance completeness;
- source confidence upgrade;
- hot-water/sewer ontology gaps where applicable.

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

## Coverage and scoring exclusions

- Matrix row coverage does not establish completeness of building observability.
- No coverage percentage.
- No observability score.
- No sensor-coverage target.
- No maturity score.

## Related-page boundary

- `A3-EC02-01`: narrative / conceptual meaning.
- `A3-EC02-02`: hero physical-to-observation graph.
- `A3-EC02-03`: full 18-row master register.
- `A3-EC02-04`: detailed `OBS-CAND-001` worked example.

## Extract counts

- Matrix rows: `18`
- Observation channels: `2`
- L1 candidates: `18`
- L2+ siteable: `0`
- Installed devices: `0 CONFIRMED / ACTUAL STATUS NOT ESTABLISHED`
- Confirmed Observation Point locations: `0`
- Guardrails: `5`

