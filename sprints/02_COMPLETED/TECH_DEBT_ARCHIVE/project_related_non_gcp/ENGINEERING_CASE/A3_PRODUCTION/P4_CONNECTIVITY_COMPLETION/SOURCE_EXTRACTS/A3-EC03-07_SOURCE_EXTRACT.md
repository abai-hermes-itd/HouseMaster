# A3-EC03-07 — SOURCE EXTRACT

## Control

| Field | Value |
|---|---|
| Page ID | A3-EC03-07 |
| Canonical title | Reference Heating Flow |
| Stage | P4_CONNECTIVITY_COMPLETION |
| Source gate | EC-03 — Device & Connectivity Architecture |
| Source file | `EC-03_DEVICE_CONNECTIVITY_SEM-MCD-001_v0.3_REVIEW.md` |
| Exact source section | §26 REFERENCE DIRECT CONNECTIVITY FLOW — concrete worked instance |
| Registry page type | PT-06 REFERENCE FLOW |
| Extraction status | SEMANTIC COMPILE — NOT FROZEN |
| Reference object | SEM-MCD-001 — г. Семей, пр. Шакарима, 13 «А» |

## Canonical source scope

Only the A3-EC03-07 registry entry, the EC-03 control header, and EC-03 §26 are used. Section 26 contains both the Direct-pattern reference template and the concrete `OBS-CAND-001` / `DEV-CAND-001` heating worked instance. No unrelated EC-00, EC-01, EC-02, or EC-03 content is incorporated.

## Engineering question

How does the established heating object at SEM-MCD-001 trace through the `OBS-CAND-001` / `DEV-CAND-001` candidate and a reference Direct Connectivity pattern into HouseMaster Observation, Evidence, and Building State without instantiating network technology or deployment?

## Established source statements

1. The reference object is `SEM-MCD-001 — г. Семей, пр. Шакарима, 13 «А»`.
2. `HEATING` is marked `VERIFIED`.
3. The heating entry remains a candidate and its location is `TBD`.
4. The worked instance uses `OBS-CAND-001` and `DEV-CAND-001` for the heating temperature condition.
5. Device functions are `MEASURE / TIMESTAMP / BUFFER / STORE / FORWARD / REPORT STATUS`.
6. The connectivity profile is `CP-CAND-001` with `MEDIUM` latency, `MEDIUM` loss tolerance, `HIGH` store-and-forward, `MEDIUM` reachability importance, and `FIXED` mobility.
7. The source walks this candidate through the `Direct Connectivity Pattern`, `Beeline Access / Transport`, `HouseMaster Trust / Integration Boundary`, and `HouseMaster Integration Edge`.
8. The HouseMaster-side semantic handoff continues through `Observation`, `Evidence`, and `Building State`.
9. No real network technology, protocol, or product is instantiated anywhere in the flow.

## Canonical flow stages and handoffs

| Order | Stage ID | Source label | Semantic status |
|---:|---|---|---|
| 01 | RF-01 | SEM-MCD-001 | ESTABLISHED REFERENCE OBJECT |
| 02 | RF-02 | HEATING — VERIFIED | ESTABLISHED SOURCE FACT |
| 03 | RF-03 | Heating entry candidate — location TBD | CANDIDATE / TBD |
| 04 | RF-04 | OBS-CAND-001 | CANDIDATE |
| 05 | RF-05 | DEV-CAND-001 | CANDIDATE |
| 06 | RF-06 | Device Functions | PROPOSED ARCHITECTURE |
| 07 | RF-07 | Connectivity Profile — CP-CAND-001 | CANDIDATE |
| 08 | RF-08 | Direct Connectivity Pattern | PROPOSED ARCHITECTURAL ALTERNATIVE / REFERENCE WALK-THROUGH ONLY |
| 09 | RF-09 | Beeline Access / Transport | RESPONSIBILITY DOMAIN HANDOFF; IMPLEMENTATION NOT ESTABLISHED |
| 10 | RF-10 | HouseMaster Trust / Integration Boundary | PROPOSED BOUNDARY; IMPLEMENTATION NOT ESTABLISHED |
| 11 | RF-11 | HouseMaster Integration Edge | PROPOSED ARCHITECTURE; IMPLEMENTATION NOT ESTABLISHED |
| 12 | RF-12 | Observation | HOUSEMASTER DOMAIN SEMANTIC STAGE |
| 13 | RF-13 | Evidence | HOUSEMASTER DOMAIN SEMANTIC STAGE |
| 14 | RF-14 | Building State | HOUSEMASTER DOMAIN SEMANTIC STAGE |

The source gives one directed handoff between each consecutive stage, for 13 handoffs total.

## Proposed / candidate architecture

| Object | Classification | Preserved meaning |
|---|---|---|
| Heating entry | CANDIDATE / LOCATION TBD | Existence of heating is verified; the candidate entry location is not established. |
| `OBS-CAND-001` | CANDIDATE | Reference observation candidate for heating temperature condition. |
| `DEV-CAND-001` | CANDIDATE | Reference device candidate; not an installed device. |
| Device Functions | PROPOSED ARCHITECTURE | Six conceptual functions; no device implementation is established. |
| `CP-CAND-001` | CANDIDATE | Conceptual connectivity profile with five source-defined characteristics. |
| Direct Connectivity Pattern | PROPOSED ARCHITECTURAL ALTERNATIVE | Used for this worked reference flow; not selected as deployed architecture and does not eliminate Edge as an alternative. |
| HouseMaster Trust / Integration Boundary | PROPOSED BOUNDARY | Required in the source flow; no concrete security or interface implementation is established. |
| HouseMaster Integration Edge | PROPOSED ARCHITECTURE | Source-named integration stage; not an implemented API or cloud service. |

## Responsibility and boundary statements

| Domain | Source-applicable responsibility |
|---|---|
| Beeline | `Access / Transport`; no internal network implementation, product, protocol, topology, coverage, SLA, or commercial detail is established. |
| HouseMaster | `Trust / Integration Boundary`, `Integration Edge`, and the semantic progression `Observation → Evidence → Building State`. |

The Trust / Access boundary is applicable because §26 explicitly includes `HouseMaster Trust / Integration Boundary`. The page must show the boundary handoff without inventing authentication, API, security, protocol, payload, or infrastructure details.

DATA / CONTROL / OPERATIONS planes are not explicitly defined in §26 and are not introduced.

## Open / TBD items

| ID | Item | State | Validation owner |
|---|---|---|---|
| EC03-07-TBD-01 | Heating entry candidate location | TBD / NOT ESTABLISHED | NOT ESTABLISHED IN §26 |

## Validation ownership

- Heating existence status: `VERIFIED` in source.
- Heating entry candidate location: validation required; owner not established in §26.
- Beeline access/transport implementation: not established and not inferred.
- Trust/integration implementation: not established and not inferred.

## Guardrails

1. `HEATING VERIFIED ≠ HEATING ENTRY LOCATION ESTABLISHED`.
2. `OBS-CAND-001 / DEV-CAND-001 / CP-CAND-001 = CANDIDATES, NOT DEPLOYED INSTANCES`.
3. `REFERENCE DIRECT FLOW ≠ DIRECT TOPOLOGY SELECTION`.
4. `BEELINE ACCESS / TRANSPORT ≠ BEELINE INTERNAL IMPLEMENTATION`.
5. `HOUSEMASTER TRUST / INTEGRATION BOUNDARY ≠ IMPLEMENTED API OR SECURITY DESIGN`.
6. `NO REAL NETWORK TECHNOLOGY / PROTOCOL / PRODUCT IS INSTANTIATED`.

## Source fact versus design interpretation

| Classification | Content |
|---|---|
| ESTABLISHED SOURCE FACT | SEM-MCD-001 is the reference object and heating is verified. |
| ESTABLISHED SOURCE FACT | The exact 14-stage flow order and embedded device/profile characteristics are listed in §26. |
| ESTABLISHED SOURCE FACT | Heating entry candidate location is TBD. |
| ESTABLISHED SOURCE FACT | No real network technology, protocol, or product is instantiated. |
| PROPOSED / CANDIDATE | Observation, device, connectivity profile, Direct pattern, trust/integration boundary, and integration edge retain their source candidate/proposed status. |
| DESIGN INTERPRETATION FOR PAGE GRAMMAR | Group the 14 stages into reference/context, device/connectivity, Beeline handoff, and HouseMaster semantic zones while preserving one continuous 13-handoff order. |
| DESIGN INTERPRETATION FOR PAGE GRAMMAR | Use boundary styling at the Beeline-to-HouseMaster handoff, without depicting an implementation. |

## Explicit exclusions

- No installed device or SIM/eSIM inventory.
- No gateway deployment, APN/private networking, protocol, API capability, network topology, coverage, SLA, cloud service, security implementation, timing value, commercial term, or site-survey result.
- No Direct/Edge selection; Edge remains an unselected architectural alternative outside this worked reference flow.
- No verified observation or verified defect is inferred from the flow.
- No DATA / CONTROL / OPERATIONS plane visualization.
- No ALAU AI.
- No Drawio or PDF at this gate.

## Provenance

- `A3-P0_PAGE_REGISTRY_v0.4_REVIEW.md` — A3-EC03-07 registry entry.
- `A3-P0_PAGE_REGISTRY_v0.4.csv` — A3-EC03-07 registry entry.
- `EC-03_DEVICE_CONNECTIVITY_SEM-MCD-001_v0.3_REVIEW.md` — §26 only, plus the control header for source identity and SEM-MCD-001 reference anchor.

`NEXT GATE = SEMANTIC REVIEW`
