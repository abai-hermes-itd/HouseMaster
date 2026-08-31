# A3-EC03-06 — SOURCE EXTRACT

## Control

- Page: `A3-EC03-06`
- IR type: `STATE_MODEL / MATRIX-HYBRID`
- Allowed source: `EC-03_DEVICE_CONNECTIVITY_SEM-MCD-001_v0.3_REVIEW.md`
- Source SHA-256: `9DDB72B5A4FC480F7FFD9BBD4656502267D6DE3B569970FED6FEC2A6E8D5545B`
- Read scope: EC-03 §§9a, 21–24 and 29 only
- Status: `REVIEW`

## Failure-domain source model

EC-03 §29 explicitly defines seven distinct failure domains:

| ID | Failure domain | Responsibility status | What becomes unavailable | What may remain valid | Observable signal |
|---|---|---|---|---|---|
| F-01 | PHYSICAL DEVICE FAILURE | BUILDING / FIELD | Observations from the specific device | Last known building state; observations from other devices | Device silent or reporting an implausible value |
| F-02 | LOCAL POWER FAILURE | BUILDING / FIELD | Observations from devices on the affected power circuit | Observations from unaffected circuits; last known state | Multiple devices unreachable together, correlated with a power-availability candidate if present |
| F-03 | LOCAL EDGE / AGGREGATION FAILURE | BUILDING / FIELD, or JOINT if its connectivity is operator-managed | Observations from every device behind that aggregation function | Direct-connected devices or devices behind another aggregation group | Multiple devices unreachable together, correlated by physical cluster |
| F-04 | ACCESS / RADIO CONNECTIVITY FAILURE | TBD WITH BEELINE | Observations from affected devices or aggregation group | Last known building state | Connectivity becomes `UNREACHABLE` / `DEGRADED` |
| F-05 | OPERATOR TRANSPORT FAILURE | BEELINE | Observations across potentially many devices/buildings sharing the path | Last known building state | Correlated connectivity loss beyond one building's pattern |
| F-06 | HOUSEMASTER INTEGRATION EDGE FAILURE | HOUSEMASTER | New observations cannot be ingested even if connectivity is healthy | Existing already-ingested building state | Referenced ingress/processing health signals |
| F-07 | HOUSEMASTER PROCESSING FAILURE | HOUSEMASTER | Domain interpretation of ingested observations may be delayed | Raw ingested observations if durably stored; existing building state | Processing backlog/latency |

Source axiom: `FAILURE DOMAIN ≠ ENGINEERING DEFECT DOMAIN`.

## HouseMaster connectivity-state model

EC-03 §21 defines seven proposed HouseMaster-side integration states. They are not asserted to be Beeline internal network states.

| State | Source meaning |
|---|---|
| UNKNOWN | No connectivity information has ever been received for the device/profile |
| PROVISIONED | A profile is conceptually associated, but reachability is not confirmed |
| REACHABLE | The connectivity path is currently confirmed responsive |
| UNREACHABLE | The connectivity path is currently not responding; cause is not classified |
| DEGRADED | The path responds with reduced quality, such as delayed delivery |
| SUSPENDED | Connectivity is intentionally paused; this is not a fault |
| DECOMMISSIONED | The device/profile is retired and no longer expected to report |

`UNREACHABLE` states only that the expected path is not responding. It does not distinguish device fault, connectivity fault, local power loss, aggregation failure, operator transport failure, or another root cause.

## Timing and store-and-forward model

EC-03 §23 fixes the sequence:

`PHYSICAL OBSERVATION → event_time CREATED → LOCAL BUFFER / STORE → TRANSPORT UNAVAILABLE → CONNECTIVITY RESTORED → BUFFERED OBSERVATION FORWARDED → received_time CREATED → HOUSEMASTER PROCESSES USING ORIGINAL event_time`

- `event_time` is the time the observation was created.
- `received_time` is the time HouseMaster receives it.
- `event_time ≠ received_time` when buffering/recovery delays delivery.
- Delayed delivery does not rewrite original `event_time`.
- Buffered observations may be forwarded after connectivity restoration.
- Connectivity loss may create a temporary observation/evidence gap.
- No buffer size, retention period, retry interval, heartbeat interval, timeout or polling frequency is defined.

## Interpretation boundaries

EC-03 §§22 and 24 preserve these distinctions:

- Device unreachable means the connectivity path is not responding; it does not prove that the physical device or engineering component failed.
- No observation received means no update has arrived; it does not prove the engineering condition is unchanged, healthy or failed.
- A reachable device with no event does not automatically mean normal condition.
- A delivered observation is available for domain interpretation; it is not automatically a verified engineering fact.
- Last confirmed building state may remain valid while new data is absent; absence of new data is not itself a state change.
- Connectivity restoration does not close an engineering defect.

## Required guardrails

1. `DEVICE OFFLINE ≠ COMPONENT FAILED`
2. `EDGE OFFLINE ≠ BUILDING FAILURE`
3. `NETWORK HEALTH ≠ BUILDING HEALTH`
4. `CONNECTIVITY STATE ≠ ENGINEERING STATE`

Supporting source-backed distinctions:

- `OBSERVATION GAP ≠ ENGINEERING DEFECT`
- `DELAYED DELIVERY ≠ LATE EVENT CREATION`

## Explicit unresolved items

- Root cause for `UNREACHABLE`: `UNCLASSIFIED UNTIL FURTHER EVIDENCE`
- F-04 precise ownership boundary: `TBD WITH BEELINE`
- RF thresholds: `NOT DEFINED`
- Retry interval: `NOT DEFINED`
- Buffer size / retention period: `NOT DEFINED`
- Heartbeat interval / timeout / polling frequency: `NOT DEFINED`
- SLA: `NOT DEFINED`
- Monitoring product / alarm implementation: `NOT DEFINED`
- Failure-domain-specific recovery mechanisms: `NOT DESIGNED`

## Exclusions

- No source outside EC-03 was read.
- No Beeline internal topology, RF threshold, retry interval, SLA, monitoring product, alarm, device hardware or recovery implementation is asserted.
- No device/connectivity failure is interpreted as component or building failure.
- No Drawio, PDF or 3D artifact is created by this semantic compile.

