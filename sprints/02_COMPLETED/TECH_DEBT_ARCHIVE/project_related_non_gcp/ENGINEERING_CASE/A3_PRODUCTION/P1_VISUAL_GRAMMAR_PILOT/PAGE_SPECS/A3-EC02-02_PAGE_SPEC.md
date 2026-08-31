# A3-EC02-02 — PAGE SPEC

## Control

| Field | Value |
|---|---|
| Page ID | A3-EC02-02 |
| Graph ID | A3-EC02-02 |
| Production number | P1-04 |
| Title | Hero Graph — Physical MCD to HouseMaster Observation |
| IR type | GRAPH |
| Page spec status | PAGE_SPEC_READY |
| Owner approval | APPROVED FOR VISUAL COMPILATION |
| Semantic source | `A3-EC02-02_GRAPH_IR.yaml` |
| Drawio | NOT CREATED |
| PDF | NOT CREATED |

## Canonical purpose

Show the engineering observation chain from the physical MCD to an accepted HouseMaster observation without conflating physical condition, connectivity, observation, evidence, or engineering state.

## Primary graph

Render a left-to-right engineering-domain graph with these primary nodes in order:

`PHYSICAL MCD → OBSERVED OBJECT / ENGINEERING COMPONENT → OBSERVATION POINT → DEVICE / HUMAN OBSERVATION CHANNEL → CONNECTIVITY / TRANSPORT WHERE APPLICABLE → HOUSEMASTER INTEGRATION / ACCEPTANCE → CANONICAL OBSERVATION → DOMAIN LINKAGE / BUILDING STATE`

Add `EVIDENCE / PROVENANCE` as a distinct supporting node linked from `CANONICAL OBSERVATION` and into `DOMAIN LINKAGE / BUILDING STATE`. It must not merge visually or semantically with the observation node.

## Conditional transport branch

- Machine-capable path: `DEVICE / HUMAN OBSERVATION CHANNEL → CONNECTIVITY / TRANSPORT WHERE APPLICABLE → HOUSEMASTER INTEGRATION / ACCEPTANCE`.
- Human/documentary path: `DEVICE / HUMAN OBSERVATION CHANNEL → HOUSEMASTER INTEGRATION / ACCEPTANCE` without implying device connectivity.
- Connectivity is conditional and must not be drawn as mandatory for every observation.
- No Direct Cellular, Edge Aggregation, SIM/eSIM, RF, protocol, API, schema, or Beeline internal topology may be added.

## Node requirements

Render all 9 nodes from `A3-EC02-02_GRAPH_IR.yaml`. Every node must preserve:

- ID
- label
- domain
- status
- source reference
- confidence
- what it means
- what it does not mean

The hero view may place `what_it_means` and `what_it_does_not_mean` in a compact annotation rail keyed by node ID if placing both inside every node would reduce readability.

## Edge requirements

Render all 10 edges from `A3-EC02-02_GRAPH_IR.yaml`. Every edge must preserve:

- ID
- label
- domain
- status
- source reference
- confidence
- what it means
- what it does not mean

The graph must keep E-04 conditional, E-05 as the human/documentary bypass, and E-08/E-10 as evidence/provenance support rather than a replacement for canonical observation.

## Dominant distinctions

Make these distinctions immediately visible and keep their semantic scopes separate:

- PHYSICAL STATE ≠ OBSERVATION
- OBSERVATION ≠ EVIDENCE
- CONNECTIVITY EVENT ≠ ENGINEERING EVENT
- ACCEPTED DATA ≠ ENGINEERING TRUTH

## Guardrail band

Render all four guardrails verbatim:

- OBSERVATION ≠ EVIDENCE
- DEVICE SIGNAL ≠ DEFECT
- CONNECTIVITY STATE ≠ ENGINEERING STATE
- ACCEPTED EVENT ≠ VERIFIED ENGINEERING FACT

## Domain treatment

Use distinct visual domains for:

1. Physical building / engineering context.
2. Observation candidate and acquisition concepts.
3. Conditional connectivity / transport.
4. HouseMaster integration, canonical observation, evidence, and domain linkage.

Domain color must not encode evidence certainty. Conditional/TBD status must remain visually distinct from domain ownership.

## Provenance footer

Show:

- `PAGE: A3-EC02-02`
- `GRAPH: A3-EC02-02`
- `PRODUCTION: P1-04`
- `SOURCE GATE: EC-02`
- `SOURCE: EC-02_PHYSICAL_TO_OBSERVATION_SEM-MCD-001_v0.3_REVIEW.md`
- `IR: REVIEW`
- `PAGE SPEC: REVIEW`
- `IR TYPE: GRAPH`
- `NODES: 9`
- `EDGES: 10`
- `GUARDRAILS: 4`

## Production constraints

- Preserve all node and edge labels, domains, statuses, source references, confidence levels, meanings, non-meanings, and guardrails from the IR.
- Do not show ALAU AI.
- Do not reinterpret Beeline internal architecture.
- Do not invent sensors, installed devices, component locations, topology, or basement layout.
- Do not represent accepted data, a connectivity event, a device signal, an observation, or evidence as verified engineering truth.
- Do not create Drawio, PDF, or 3D output at this gate.

## Gate

NEXT GATE: SEMANTIC REVIEW
