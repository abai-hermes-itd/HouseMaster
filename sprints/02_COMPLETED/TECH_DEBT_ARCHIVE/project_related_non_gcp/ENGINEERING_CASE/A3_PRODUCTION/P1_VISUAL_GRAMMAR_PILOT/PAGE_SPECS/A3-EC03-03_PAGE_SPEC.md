# A3-EC03-03 — PAGE SPEC

## Control

- Page ID: `A3-EC03-03`
- Title: `Edge Aggregation Pattern`
- Stage: `P1_VISUAL_GRAMMAR_PILOT`
- Production number: `P1-07`
- IR type: `FLOW`
- Page spec status: `PAGE_SPEC_READY`
- Semantic source: `A3-EC03-03_GRAPH_IR.yaml`
- Owner approval: `APPROVED FOR VISUAL COMPILATION`

## Purpose

Show the source-approved Edge Aggregation pattern from a conceptual local observation-device input through a conceptual 1:N aggregation role, shared connectivity, Beeline access/transport and HouseMaster acceptance, while keeping identity, aggregation responsibility, connectivity, trust, observation, evidence and engineering state separate.

## Canonical thesis

Edge Aggregation groups and forwards observations through a shared connectivity path; it does not absorb device identities, perform HouseMaster domain interpretation, or establish engineering truth.

## Primary flow — frozen source order for review

1. `SEM-MCD-001`
2. `HEATING — VERIFIED`
3. `Heating observation candidate — location TBD`
4. `Local observation device — DEV-CAND-001`
5. `DEVICE FUNCTIONS`
6. `CONCEPTUAL EDGE AGGREGATION FUNCTION`
7. `SHARED CONNECTIVITY PROFILE`
8. `BEELINE ACCESS / TRANSPORT`
9. `HOUSEMASTER TRUST / INTEGRATION BOUNDARY`
10. `HOUSEMASTER INTEGRATION EDGE`
11. `OBSERVATION`
12. `EVIDENCE`
13. `BUILDING STATE`

The reference flow uses `OBS-CAND-001 / DEV-CAND-001` exactly as EC-03 §27. The aggregation role is visibly `1:N` and may receive multiple local device candidates, as defined by EC-03 §6; no extra installed devices or locations are asserted.

## Pattern classification panel

- `EDGE AGGREGATION: PLAUSIBLE / NOT SELECTED`
- `DIRECT CONNECTIVITY: PLAUSIBLE / CO-APPLICABLE`
- `REFERENCE CLASSIFICATION: BOTH_PLAUSIBLE`
- `FINAL TOPOLOGY SELECTED: NO`

The page must not visually imply that Edge Aggregation is mandatory, selected, superior, or the only valid topology.

## Required semantic separation

- The Edge/Aggregation role is a transport/grouping function, not HouseMaster domain logic.
- The Edge role has no engineering authority.
- Underlying device identities remain independent and visible as distinct from any future edge/gateway identity.
- HouseMaster domain IDs remain independent of SIM/eSIM, ICCID, IMSI and MSISDN.
- Connectivity state remains separate from engineering state.
- Edge offline does not imply device failure, component failure or building failure.
- Network health does not imply building health.
- Observation, evidence and building state remain separate stages.

## Identity inset

Show two non-collapsing identity layers:

**HouseMaster / domain identities**

- Underlying `device_id`: `TBD`
- Edge/aggregation identity: `TBD IF INSTANTIATED`
- Underlying device identities absorbed by edge identity: `NO`

**Beeline / operator connectivity identity**

- SIM/eSIM: `TBD`
- ICCID: `TBD`
- IMSI: `TBD`
- MSISDN: `TBD`

Dominant distinction: `DEVICE IDENTITY ≠ SIM IDENTITY`.

## Aggregation / buffering inset

- Aggregation function: `CONCEPTUAL CANDIDATE ONLY`
- Named or placed as `EDGE-01`: `NO`
- Hardware/product: `TBD / NOT SELECTED`
- Gateway model: `TBD / NOT SELECTED`
- Local link/protocol: `TBD / NOT SELECTED`
- Shared connectivity profile instance: `TBD`
- Store-and-forward: `SOURCE-SUPPORTED`
- Original `event_time` preserved: `YES`
- `event_time ≠ received_time`
- Buffer size / retention / retry interval: `TBD`

## Failure-domain inset

Visually separate:

- `F-01 PHYSICAL DEVICE FAILURE`
- `F-03 LOCAL EDGE / AGGREGATION FAILURE`
- `F-04 ACCESS / RADIO CONNECTIVITY FAILURE`
- `F-05 OPERATOR TRANSPORT FAILURE`
- `F-06 HOUSEMASTER INTEGRATION EDGE FAILURE`

Do not merge these failure domains or map any of them directly to an engineering defect/building failure.

## Required guardrails

1. `EDGE AGGREGATION ≠ DOMAIN INTERPRETATION`
2. `EDGE OFFLINE ≠ BUILDING FAILURE`
3. `DEVICE IDENTITY ≠ SIM IDENTITY`
4. `CONNECTIVITY STATE ≠ ENGINEERING STATE`

## Status vocabulary

Use exact tokens from the Graph IR, including:

- `VERIFIED`
- `TBD_SITE_SURVEY`
- `PLANNED_CONCEPTUAL`
- `CONCEPTUAL`
- `CANDIDATE_NOT_NAMED_NOT_PLACED`
- `CONCEPTUAL_TBD`
- `REFERENCED_NOT_DESIGNED`
- `REFERENCED_NOT_IMPLEMENTED`
- `CONCEPTUAL_OUTPUT`
- `PROVENANCE_REQUIRED`
- `DOMAIN_RULE_GATED`

## Rendering constraints for the next gate

- A3 landscape.
- Flow is the primary visual.
- Make the 1:N aggregation role visible without inventing devices, locations or local-link technology.
- Keep Direct Connectivity visible only as a co-applicable alternative reference.
- Use dashed/candidate visual treatment for the aggregation function, shared profile and unresolved connectivity fields.
- Do not render an engineering schematic or Beeline internal network architecture.
- Do not introduce edge hardware, gateway product, protocol, API, schema, SIM assignment, RF coverage or provisioning state.
- Do not create Drawio or PDF until the semantic review/freeze gate is complete.

## Counts

- Flow steps: `13`
- Edges: `12`
- Guardrails: `4`
