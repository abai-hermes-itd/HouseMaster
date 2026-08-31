# A3-EC03-04 — SOURCE EXTRACT

## Control

| Field | Canonical value |
|---|---|
| Page ID | A3-EC03-04 |
| Production / assembly | P4-02 / 018 |
| Canonical title | Direct vs Edge Matrix |
| Primary page type | PT-05 COMPARISON |
| Secondary characteristic | NONE |
| Source gate | EC-03 |
| Source section | EC-03 §28 |
| Evidence level | Conceptual |
| Source linkage | LINKED |
| Extract status | REVIEW |

## Registry authority

The canonical A3-P0 registry defines:

- Title: `Direct vs Edge Matrix`.
- Type: `PT-05 COMPARISON`.
- Source: `EC-03 §28`.
- Engineering thesis: `Fifteen criteria compared; no topology winner declared`.
- Main visual: `Comparison matrix`.
- Beeline relevance: `HIGH`.

## Exact page purpose and engineering question

Purpose: compare Direct Connectivity and Edge Aggregation across the fifteen canonical EC-03 criteria using `LOW / MEDIUM / HIGH / TBD` ratings and short reasoning, without recommending or selecting either topology and without using cost figures.

Engineering question: **How do Direct Connectivity and Edge Aggregation compare across the fifteen canonical criteria, while preserving both as unselected architectural alternatives?**

## Canonical semantic entities

### Alternatives

1. `DIRECT CONNECTIVITY` — plausible alternative.
2. `EDGE AGGREGATION` — plausible alternative.

Frozen relationship: `CO-APPLICABLE / NOT SEQUENTIAL / NOT SELECTED`.

### Rating vocabulary

`LOW / MEDIUM / HIGH / TBD`, with source wording such as `MEDIUM–HIGH` and `HIGHER` preserved where used.

## Canonical 15-criterion comparison

| # | Criterion | Direct Connectivity | Edge Aggregation |
|---:|---|---|---|
| 01 | Operator-facing connectivity identity count | HIGH — one per device | LOW — one per aggregation group |
| 02 | Device independence | HIGH — each device operates without dependency on another local device | LOW — devices depend on the shared aggregation function's availability |
| 03 | Local power dependency | LOW — only the device itself needs power | MEDIUM–HIGH — the aggregation function also needs power, adding a dependency; exact value TBD pending site survey |
| 04 | Buffering | Per-device (distributed) | Can be centralized at the aggregation function, or still per-device — TBD |
| 05 | Aggregation | Not applicable | Native to this pattern |
| 06 | Physical distribution | Devices spread across the building without a common local node | Devices cluster around a common local node |
| 07 | Maintenance complexity | MEDIUM — more individual connectivity endpoints to manage | MEDIUM — fewer connectivity endpoints, but one added local component to maintain |
| 08 | Lifecycle complexity | MEDIUM — device lifecycle only | MEDIUM–HIGH — device lifecycle plus aggregation-function lifecycle |
| 09 | Failure-domain size | LOW per device (isolated failure) | HIGHER for the group — an aggregation-function failure affects all devices behind it; EC-03 §28 references §29 F-03 |
| 10 | Single-point-of-failure exposure | LOW | HIGHER — the aggregation function is a candidate single point of failure for its group |
| 11 | Local protocol dependency | NONE — no local link required | TBD — an unspecified local link would be required between devices and the aggregation function |
| 12 | Operator visibility | Per-device connectivity state | Per-aggregation-group connectivity state, with device-level detail potentially reduced |
| 13 | Site-survey dependency | Per-device location only | Per-device location plus aggregation-function location and local-link feasibility |
| 14 | Scalability | MEDIUM — each additional device adds its own connectivity identity | HIGH within a cluster — additional devices can join an existing aggregation function without new external connectivity identities |
| 15 | Replacement impact | LOW — replacing one device does not affect others | MEDIUM — replacing the aggregation function could affect all devices behind it; replacing one device does not |

## Exact statuses and non-decisions

- Evidence/status: `CONCEPTUAL`.
- Direct: `PLAUSIBLE ALTERNATIVE`.
- Edge: `PLAUSIBLE ALTERNATIVE`.
- Relationship: `CO-APPLICABLE / NOT SEQUENTIAL`.
- Selection: `NOT SELECTED`.
- EC-03 §28 declares no winner, recommendation, topology selection or cost figure.

## Relevant identity and responsibility boundaries

- Operator-facing connectivity identity count is a comparison criterion; it is not a physical device or SIM inventory.
- `one per device` and `one per aggregation group` describe comparative architecture, not instantiated identities.
- Beeline remains the connectivity/transport partner for operator-facing connectivity concerns.
- HouseMaster remains the independent domain layer/system of record; the comparison does not transfer engineering interpretation or evidence validity to transport.
- The Trust/API boundary and HouseMaster integration functions are not primary content of §28 and are not added to this page.

## Open / TBD items

| Item ID | Subject | Current status | Source ref | Validation owner | Required closure | Downstream restriction | What it does not mean |
|---|---|---|---|---|---|---|---|
| EC03-04-TBD-01 | Edge local-power dependency exact value | TBD pending site survey | EC-03 §28, criterion 03 | Site survey / engineering validation | Confirm aggregation-function power conditions | No physical Edge feasibility or deployment conclusion | Does not prove Edge is infeasible |
| EC03-04-TBD-02 | Edge buffering placement | TBD: centralized or per-device | EC-03 §28, criterion 04 | Joint device/integration architecture validation | Determine required buffering responsibility | No buffer implementation or retention design | Does not imply buffering is absent |
| EC03-04-TBD-03 | Edge local-link dependency | TBD: unspecified local link | EC-03 §28, criteria 11 and 13 | Joint validation, including Beeline where transport boundary is affected | Validate local-link and site feasibility | No protocol, RF, gateway or topology selection | Does not establish a local protocol |
| EC03-04-TBD-04 | Direct versus Edge selection | NOT SELECTED | EC-03 §28 final statement | Joint architecture/site decision gate | Close evidence and decision criteria at a later gate | Neither alternative may be rendered as default/deployed | Does not mean both must be deployed |

## Guardrails

1. `NO TOPOLOGY WINNER DECLARED`.
2. `NO TOPOLOGY RECOMMENDED OR SELECTED`.
3. `NO COST FIGURE USED`.
4. `ARCHITECTURAL OPTION ≠ DEPLOYMENT DECISION`.

## Relationship to adjacent EC-03 sheets

- `A3-EC03-01` establishes the connectivity entry and responsibility architecture; this page does not repeat it.
- `A3-EC03-02` renders the Direct reference pattern; this page compares it without selecting it.
- `A3-EC03-03` renders the Edge reference pattern; this page compares it without placing or instantiating an aggregation function.
- `A3-EC03-06` owns the detailed failure-domain model; this page carries only the criterion-level failure-domain and single-point-of-failure comparison, including the source cross-reference to §29 F-03.

## Explicit exclusions

No Drawio, PDF, 3D, ALAU AI, finance, monetization, marketing, resident UX, CAPEX or predictive analytics. No vendor, network technology, site topology, installed device, SIM/eSIM inventory, gateway, `EDGE-01`, RF result, protocol, API, schema, credentials, certificates, APN or VPN configuration is introduced.
