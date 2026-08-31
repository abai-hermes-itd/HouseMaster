# A3-EC03-03 — SOURCE EXTRACT

## Control

- Page: `A3-EC03-03`
- IR type: `FLOW`
- Allowed source: `EC-03_DEVICE_CONNECTIVITY_SEM-MCD-001_v0.3_REVIEW.md`
- Source SHA-256: `9DDB72B5A4FC480F7FFD9BBD4656502267D6DE3B569970FED6FEC2A6E8D5545B`
- Read scope: EC-03 sections required for the Edge Aggregation pattern only
- Status: `REVIEW`

## Source-backed pattern

EC-03 §6 defines Edge Aggregation as a co-applicable, unselected topology:

`Device (×N) → conceptual aggregation point → shared connectivity path → Beeline network`

The aggregation point is a candidate concept only. It is not named, placed, instantiated as `EDGE-01`, or associated with a hardware product, gateway model, local protocol, API, schema, SIM assignment, RF coverage, or provisioning state.

EC-03 §27 defines the reference sequence using `OBS-CAND-001` / `DEV-CAND-001` for comparison with the direct pattern:

1. `SEM-MCD-001`
2. `HEATING — VERIFIED`
3. `Heating observation candidate — location TBD`
4. `Local observation device (DEV-CAND-001, conceptually — same candidate as §26)`
5. `Device Functions — MEASURE / TIMESTAMP / BUFFER / STORE / FORWARD / REPORT STATUS`
6. `Conceptual Edge Aggregation Function — candidate concept only; not named, not placed, not EDGE-01`
7. `Shared Connectivity Profile`
8. `Beeline Access / Transport`
9. `HouseMaster Trust / Integration Boundary`
10. `HouseMaster Integration Edge`
11. `Observation`
12. `Evidence`
13. `Building State`

## Pattern classification

- Direct Connectivity and Edge Aggregation are alternative, co-applicable patterns.
- Edge Aggregation is not selected or mandatory.
- The reference candidate `DEV-CAND-001` is `BOTH PLAUSIBLE` in EC-03 §25.
- Direct suitability: `PLAUSIBLE`.
- Edge suitability: `PLAUSIBLE`.
- Final topology selected: `NO`.
- Source basis: EC-03 §§3, 6, 25, 27.

## Identity boundaries

- Each HouseMaster device/domain identity remains independent.
- A future HouseMaster `device_id` is `TBD` and does not depend on SIM/eSIM identity.
- An aggregation function may have its own identity if later instantiated; it does not absorb the identities or engineering histories of underlying devices/components.
- SIM/eSIM is operator/connectivity identity and remains `TBD`.
- ICCID, IMSI and MSISDN are not assigned or used as HouseMaster domain IDs.
- Source basis: EC-03 §§3, 8, 16, 31.

## Aggregation and timing boundaries

- Store-and-forward preserves an observation created at original `event_time` and forwards it after connectivity recovery.
- `event_time ≠ received_time`.
- HouseMaster processing uses the original `event_time`.
- No buffer size, retention period or retry interval is defined.
- Loss of edge connectivity creates an observation/evidence gap; it does not prove an engineering failure.
- Local Edge/Aggregation failure and physical-device failure are separate failure domains (`F-03` and `F-01`).
- Aggregation does not convert an observation into evidence, a defect, engineering truth, or building state.
- Source basis: EC-03 §§21–24, 29.

## Required guardrails

1. `EDGE AGGREGATION ≠ DOMAIN INTERPRETATION`
2. `EDGE OFFLINE ≠ BUILDING FAILURE`
3. `DEVICE IDENTITY ≠ SIM IDENTITY`
4. `CONNECTIVITY STATE ≠ ENGINEERING STATE`

## Explicit unresolved items

- Installed devices: `TBD / NONE INSTANTIATED`
- Edge hardware or product: `TBD / NOT SELECTED`
- Gateway model: `TBD / NOT SELECTED`
- Aggregation location: `TBD / NOT PLACED`
- Local link/protocol: `TBD / NOT SELECTED`
- Shared connectivity profile instance: `TBD`
- SIM assignment: `TBD`
- RF coverage: `TBD`
- Provisioning state: `TBD`
- API/schema: `TBD / NOT DESIGNED`

## Exclusions

- No source outside EC-03 was read.
- No installed device, edge hardware, gateway, local link, protocol, API, schema, SIM assignment, RF condition or provisioning state is asserted.
- No engineering condition is inferred from connectivity.
- No Drawio, PDF or 3D artifact is created by this semantic compile.

