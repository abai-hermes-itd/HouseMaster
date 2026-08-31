# A3-EC03-06 — PAGE SPEC

## Control

- Page ID: `A3-EC03-06`
- Title: `Failure Domains`
- Stage: `P1_VISUAL_GRAMMAR_PILOT`
- Production number: `P1-08`
- IR type: `STATE_MODEL / MATRIX-HYBRID`
- Page spec status: `PAGE_SPEC_READY`
- Semantic source: `A3-EC03-06_GRAPH_IR.yaml`
- Owner approval: `APPROVED FOR VISUAL COMPILATION`

## Purpose

Show seven separate source-defined failure domains and make immediately clear what becomes unavailable, what may remain operational, what the symptom may indicate, and what the failure does not prove.

## Canonical thesis

Device, power, aggregation, access, transport and HouseMaster integration/processing failures are distinct failure domains; none alone proves engineering-component failure or building failure.

## Primary page logic

Use a failure-domain matrix as the primary visual. Do not render a single linear network flow or an internal Beeline network topology.

Required columns:

1. `FAILURE DOMAIN`
2. `RESPONSIBILITY LAYER`
3. `OBSERVABLE EFFECT`
4. `DATA / CONNECTIVITY CONSEQUENCE`
5. `WHAT REMAINS OPERATIONAL`
6. `WHAT IT DOES NOT PROVE`
7. `RECOVERY / NEXT CHECK`

## Failure-domain rows

Render all seven source-defined domains without merging or renumbering:

1. `F-01 PHYSICAL DEVICE FAILURE`
2. `F-02 LOCAL POWER FAILURE`
3. `F-03 LOCAL EDGE / AGGREGATION FAILURE`
4. `F-04 ACCESS / RADIO CONNECTIVITY FAILURE`
5. `F-05 OPERATOR TRANSPORT FAILURE`
6. `F-06 HOUSEMASTER INTEGRATION EDGE FAILURE`
7. `F-07 HOUSEMASTER PROCESSING FAILURE`

The matrix must visually preserve:

`F-01 ≠ F-02 ≠ F-03 ≠ F-04 ≠ F-05 ≠ F-06 ≠ F-07`

and:

`ALL FAILURE DOMAINS ≠ ENGINEERING COMPONENT FAILURE ≠ BUILDING FAILURE`.

## Responsibility encoding

- F-01: `BUILDING / FIELD`
- F-02: `BUILDING / FIELD`
- F-03: `BUILDING / FIELD`, or `JOINT` if the aggregation function's own connectivity is operator-managed
- F-04: `TBD WITH BEELINE`
- F-05: `BEELINE`
- F-06: `HOUSEMASTER`
- F-07: `HOUSEMASTER`

Responsibility color must not be used as a proxy for severity or engineering status.

## Connectivity-state support panel

Label the panel exactly as `HOUSEMASTER INTEGRATION STATES — NOT BEELINE INTERNAL NETWORK STATES`.

Show all seven states:

- `UNKNOWN`
- `PROVISIONED`
- `REACHABLE`
- `UNREACHABLE`
- `DEGRADED`
- `SUSPENDED`
- `DECOMMISSIONED`

Make `UNREACHABLE` visually explicit as: `EXPECTED PATH NOT RESPONDING · ROOT CAUSE UNCLASSIFIED`.

Do not map `UNREACHABLE` directly to any single failure-domain row.

## Timing / store-and-forward support panel

Show the source sequence compactly:

`event_time CREATED → LOCAL BUFFER / STORE → TRANSPORT UNAVAILABLE → CONNECTIVITY RESTORED → BUFFERED OBSERVATION FORWARDED → received_time CREATED`

Required statements:

- `event_time = observation creation time`
- `received_time = HouseMaster receipt time`
- `event_time ≠ received_time WHEN BUFFERED`
- `DELAYED DELIVERY DOES NOT REWRITE event_time`
- `CONNECTIVITY LOSS MAY CREATE A TEMPORARY EVIDENCE GAP`
- `CONNECTIVITY LOSS ≠ ENGINEERING FAILURE`

Unresolved values remain explicit:

- Buffer size: `NOT DEFINED`
- Retention period: `NOT DEFINED`
- Retry interval: `NOT DEFINED`
- Heartbeat / timeout / polling frequency: `NOT DEFINED`

## Required guardrails

1. `DEVICE OFFLINE ≠ COMPONENT FAILED`
2. `EDGE OFFLINE ≠ BUILDING FAILURE`
3. `NETWORK HEALTH ≠ BUILDING HEALTH`
4. `CONNECTIVITY STATE ≠ ENGINEERING STATE`

Supporting distinctions may appear as secondary notes:

- `OBSERVATION GAP ≠ ENGINEERING DEFECT`
- `DELAYED DELIVERY ≠ LATE EVENT CREATION`

## Matrix content authority

Each row's exact values for responsibility, affected function, observable symptom, immediate consequence, remaining operational scope, non-proof semantics, recovery/buffering behavior, source reference, confidence and unresolved items come from `A3-EC03-06_GRAPH_IR.yaml` and must not be shortened in a way that changes meaning.

## Rendering constraints for the next gate

- A3 landscape.
- Matrix is the primary visual; states and timing are supporting panels.
- Preserve readable typography; split supporting content into panels before reducing text below the A3-P0 minimum.
- Do not use arrows that visually imply failure propagation into engineering or building state.
- Do not render Beeline internal topology, RF thresholds, retries, SLA, monitoring products, alarms or device hardware.
- Do not add root-cause attribution to `UNREACHABLE`.
- Do not create Drawio or PDF until semantic review/freeze is complete.

## Counts

- Failure domains: `7`
- Connectivity states: `7`
- Guardrails: `4`
- Timing model included: `YES`
- Store-and-forward included: `YES`
