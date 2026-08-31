# A3-EC03-05 — SOURCE EXTRACT

## Control

| Field | Value |
|---|---|
| Page ID | A3-EC03-05 |
| Canonical title | Connectivity State / Reachability |
| Stage | P4_CONNECTIVITY_COMPLETION |
| Source gate | EC-03 — Device & Connectivity Architecture |
| Source file | `EC-03_DEVICE_CONNECTIVITY_SEM-MCD-001_v0.3_REVIEW.md` |
| Exact source sections | §21 HOUSEMASTER CANONICAL CONNECTIVITY STATE MODEL; §24 REACHABILITY / HEARTBEAT SEMANTICS |
| Registry page type | PT-07 FAILURE/STATE MODEL |
| Extraction status | SEMANTIC COMPILE — NOT FROZEN |
| Reference object | SEM-MCD-001 — г. Семей, пр. Шакарима, 13 «А» |

## Canonical source scope

Only EC-03 §21 and §24 are extracted. The EC-03 control header is retained solely for document identity, review status, and the SEM-MCD-001 reference anchor. No EC-00, EC-01, EC-02, site-survey, commercial, network-implementation, or unrelated EC-03 content is incorporated.

## Engineering question supported by the source

How should HouseMaster represent connectivity state and interpret reachability evidence without treating proposed HouseMaster states as Beeline internal network states or inferring an engineering condition from transport silence alone?

## Established source statements

### §21 — Proposed HouseMaster connectivity-state vocabulary

The source defines seven proposed HouseMaster-side integration states and explicitly states that they are not asserted to be Beeline internal network states.

| ID | Connectivity state | Meaning in the HouseMaster integration model |
|---|---|---|
| CS-01 | `UNKNOWN` | No connectivity information has ever been received for this device/profile. |
| CS-02 | `PROVISIONED` | A connectivity profile has been conceptually associated with a device, but reachability has not yet been confirmed. |
| CS-03 | `REACHABLE` | The device's connectivity path is currently confirmed responsive. |
| CS-04 | `UNREACHABLE` | The device's connectivity path is currently not responding; cause is not yet classified. |
| CS-05 | `DEGRADED` | The connectivity path is responsive but exhibiting reduced quality, such as delayed delivery, without being fully unreachable. |
| CS-06 | `SUSPENDED` | Connectivity has been intentionally paused by administrative action; this is not a fault. |
| CS-07 | `DECOMMISSIONED` | The device/connectivity profile has been retired and is no longer expected to report. |

### §24 — Reachability / heartbeat semantics

The source defines four reachability conditions and separates observation state, permitted HouseMaster knowledge, and prohibited inference.

| ID | Reachability condition | Observation state | What HouseMaster may know | What HouseMaster must NOT infer |
|---|---|---|---|---|
| RC-01 | No engineering observation received | No new data since last known state | That no update has arrived | That the underlying engineering condition is unchanged, healthy, or failed |
| RC-02 | Device unreachable | Connectivity path not responding | That the connectivity path is down | That the physical device or engineering component has failed |
| RC-03 | Device reachable but no engineering event | Connectivity confirmed responsive, but no telemetry/event content | That the transport path itself is functioning | That absence of an event necessarily means `normal`; silence may be expected for event-driven candidates, while for continuous/periodic candidates it may indicate an unclassified device or interface issue |
| RC-04 | Device reachable and observation delivered | Connectivity and content both confirmed | That the reported value/event is available for domain interpretation | That the delivered value is automatically a verified engineering fact; it remains subject to Observation → Symptom → Defect gating |

The source defines no heartbeat interval, timeout value, or polling frequency.

## Architectural propositions

| ID | Proposition | Source status |
|---|---|---|
| AP-01 | HouseMaster uses a canonical connectivity-state vocabulary at its integration boundary. | PROPOSED; joint validation required |
| AP-02 | Reachability evidence and engineering observation evidence are distinct. | EXPLICIT SOURCE SEMANTIC |
| AP-03 | Transport responsiveness constrains what HouseMaster may know but does not by itself establish physical or engineering condition. | EXPLICIT SOURCE SEMANTIC |
| AP-04 | Delivered content remains subject to HouseMaster domain interpretation and evidence gating. | EXPLICIT SOURCE SEMANTIC |

## Open / TBD items

| ID | Item | State | Validation owner |
|---|---|---|---|
| EC03-05-TBD-01 | Validate the seven-state HouseMaster canonical integration vocabulary jointly; do not map it to Beeline internal states without evidence. | PROPOSED / JOINT VALIDATION REQUIRED | JOINT HOUSEMASTER × BEELINE VALIDATION |
| EC03-05-TBD-02 | Heartbeat interval | NOT DEFINED | NOT ESTABLISHED IN §21 OR §24 |
| EC03-05-TBD-03 | Timeout value | NOT DEFINED | NOT ESTABLISHED IN §21 OR §24 |
| EC03-05-TBD-04 | Polling frequency | NOT DEFINED | NOT ESTABLISHED IN §21 OR §24 |

## Responsibility and boundary statements

| Domain | Preserved responsibility / boundary |
|---|---|
| HouseMaster | Owns the proposed integration-state vocabulary, permitted-knowledge semantics, domain interpretation, and evidence gating. |
| Beeline | Remains the connectivity/transport domain. The seven HouseMaster states are not asserted to be Beeline internal network states. No Beeline implementation or capability is inferred. |

Trust / Access boundary detail is not present in §21 or §24 and is therefore not included on this page. DATA / CONTROL / OPERATIONS plane decomposition is not specified in these sections and is not introduced.

## Guardrails

1. `HOUSEMASTER CONNECTIVITY STATES ≠ BEELINE INTERNAL NETWORK STATES`.
2. `NO UPDATE ≠ UNCHANGED / HEALTHY / FAILED ENGINEERING CONDITION`.
3. `UNREACHABLE CONNECTIVITY PATH ≠ FAILED PHYSICAL DEVICE OR ENGINEERING COMPONENT`.
4. `REACHABLE WITH NO EVENT ≠ NECESSARILY NORMAL`.
5. `DELIVERED OBSERVATION ≠ VERIFIED ENGINEERING FACT`.
6. `NO HEARTBEAT INTERVAL / TIMEOUT / POLLING FREQUENCY IS DEFINED`.

## Source fact versus design interpretation

| Classification | Content |
|---|---|
| SOURCE FACT | Seven named proposed HouseMaster connectivity states with meanings. |
| SOURCE FACT | Four reachability conditions with explicit may-know / must-not-infer semantics. |
| SOURCE FACT | The states are not asserted to be Beeline internal states. |
| SOURCE FACT | No heartbeat interval, timeout value, or polling frequency is defined. |
| DESIGN INTERPRETATION FOR PAGE GRAMMAR | Present the seven-state vocabulary and the four reachability conditions as coordinated but separate visual zones. |
| DESIGN INTERPRETATION FOR PAGE GRAMMAR | Do not draw transition arrows because §21 establishes state meanings, not transition order, causality, or allowed transitions. |

## Explicit exclusions

- No Direct-versus-Edge selection or topology.
- No deployed device, SIM/eSIM, gateway, APN, private network, protocol, cloud service, coverage, SLA, or commercial term.
- No heartbeat, timeout, or polling value.
- No Beeline internal state mapping.
- No Trust / Access boundary diagram.
- No ALAU AI.
- No SEM-MCD-001 installed-device inference.

## Provenance

- `A3-P0_PAGE_REGISTRY_v0.4_REVIEW.md` — A3-EC03-05 registry entry.
- `A3-P0_PAGE_REGISTRY_v0.4.csv` — A3-EC03-05 registry entry.
- `EC-03_DEVICE_CONNECTIVITY_SEM-MCD-001_v0.3_REVIEW.md` — §21 and §24 only, plus the control header for source identity and reference anchor.

`NEXT GATE = SEMANTIC REVIEW`
