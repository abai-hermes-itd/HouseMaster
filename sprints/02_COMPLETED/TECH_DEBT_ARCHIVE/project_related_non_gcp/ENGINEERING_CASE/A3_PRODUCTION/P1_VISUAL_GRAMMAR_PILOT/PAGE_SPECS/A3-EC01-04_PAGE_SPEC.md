# A3-EC01-04 — PAGE SPEC

## Control

| Field | Value |
|---|---|
| Page ID | A3-EC01-04 |
| Title | Engineering Systems — Existence vs Location |
| IR type | MATRIX |
| Page spec status | PAGE_SPEC_READY |
| Owner approval | APPROVED FOR VISUAL COMPILATION |
| Semantic source | `A3-EC01-04_GRAPH_IR.yaml` |
| Drawio | NOT CREATED |
| PDF | NOT CREATED |

## Page thesis

Engineering systems are assessed separately at system-existence and component-location levels; confirmed system existence does not imply known component locations.

## Required reading order

1. Page title and canonical thesis.
2. Semantic distinction: `SYSTEM EXISTS ≠ COMPONENT LOCATION KNOWN`.
3. Nine-row engineering systems matrix.
4. Guardrail band.
5. Provenance and review-status footer.

## Matrix specification

Render one row for each `matrix.rows` entry in `A3-EC01-04_GRAPH_IR.yaml`, in source order.

| Column | Required content |
|---|---|
| SYSTEM | System name exactly as stored in the IR |
| EXISTENCE STATUS | VERIFIED, PARTIAL, or TBD; applies only to system existence |
| SOURCE / EVIDENCE | Source reference and evidence statement from the IR |
| LOCATION STATUS | Location status only; all nine rows are TBD |
| WHAT IS KNOWN | Evidence-bounded known statement from the IR |
| WHAT REMAINS TBD | Unresolved existence, topology, confirmation, and/or component-location statement from the IR |

The source/evidence cell must carry provenance confidence without converting a secondary claim into a verified fact. The lift count/one-per-entrance association remains PARTIAL even though lift-system existence is VERIFIED.

## Status logic

| Scope | VERIFIED | PARTIAL | TBD |
|---|---:|---:|---:|
| System existence | 6 | 1 | 2 |
| Component/node location | 0 | 0 | 9 |

Location status must not inherit the existence status. No matrix cell may imply a confirmed entry point, meter, mixing node, manifold, board, lift position, basement route, or other component/node location.

## Guardrail band

Render all four statements verbatim:

- DOCUMENTED SYSTEM ≠ DOCUMENTED COMPONENT LOCATION
- SYSTEM EXISTENCE ≠ AS-BUILT ENGINEERING SCHEME
- VISUAL SCHEMATIC ≠ FIELD-VERIFIED LOCATION
- TBD LOCATION ≠ SYSTEM ABSENT

## Provenance footer

Show:

- `PAGE: A3-EC01-04`
- `SOURCE GATE: EC-01`
- `SOURCE: EC-01_REAL_MCD_BASELINE_SEM-MCD-001_v0.3_REVIEW.md`
- `IR: REVIEW`
- `PAGE SPEC: REVIEW`
- `IR TYPE: MATRIX`
- `SYSTEMS: 9`
- `EXISTENCE: VERIFIED 6 / PARTIAL 1 / TBD 2`
- `LOCATIONS: TBD 9`

## Production constraints

- Preserve all system names, evidence statuses, source references, known statements, TBD statements, and guardrails from the IR.
- Do not infer component locations or topology.
- Do not invent a basement layout or engineering nodes.
- Do not represent the matrix as an as-built engineering scheme.
- Do not create Drawio, PDF, or 3D output at this gate.

## Gate

NEXT GATE: SEMANTIC REVIEW
