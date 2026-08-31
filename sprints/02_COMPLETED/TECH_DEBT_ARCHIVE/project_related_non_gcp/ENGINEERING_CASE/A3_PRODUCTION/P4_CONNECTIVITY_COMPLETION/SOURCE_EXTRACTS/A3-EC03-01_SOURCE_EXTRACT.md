# A3-EC03-01 — SOURCE EXTRACT

## Control

| Field | Value |
|---|---|
| Page ID | A3-EC03-01 |
| Production | P4-01 |
| Case assembly | 013 |
| Source gate | EC-03 |
| Source | `EC-03_DEVICE_CONNECTIVITY_SEM-MCD-001_v0.3_REVIEW.md` |
| Reference building | `SEM-MCD-001` — г. Семей, пр. Шакарима, 13 «А» |
| Extraction status | REVIEW |

## Page-specific canonical extraction

EC-03 §34 defines `A3-EC03-01 — Narrative` as a three-column A3 landscape technical-publication page:

1. Observation requirement.
2. Device Function / Device identity.
3. Connectivity Profile / Beeline boundary.

Canonical thesis from EC-03 §34:

> Connectivity serves an observation requirement; it does not define the engineering meaning of the observation.

## Connectivity entry chain

EC-03 §9a supplies the source-backed conceptual chain used by this page:

`DEVICE ROLE → CONNECTIVITY PATH (Direct Cellular OR Edge Aggregation; undecided and co-applicable) → BEELINE CONNECTIVITY DOMAIN → BEELINE / HOUSEMASTER TRUST & API BOUNDARY → HOUSEMASTER INTEGRATION GATEWAY → HOUSEMASTER DOMAIN CORE`

The HouseMaster Domain Core preserves the engineering chain `Building → System → Component → Observation`. Every physical component and device placement remains candidate/TBD until site validation.

## Responsibility boundary

EC-03 §9a.1 assigns:

- Beeline: device connectivity, SIM, network, transport, connectivity status.
- HouseMaster: ingestion, domain mapping, interpretation, defect, workflow, evidence, building state.
- The crossing point is the referenced Beeline / HouseMaster Trust & API Boundary and HouseMaster Integration Gateway; no endpoint, protocol, schema, or implementation is established here.

Therefore transport carries readings/states and connectivity status toward HouseMaster, but neither transport nor connectivity state determines engineering meaning.

## Observation-to-connectivity handoff

EC-03 §§1, 5, 8 and 32 preserve the evidence-gated handoff:

`ENGINEERING OBSERVATION NEED → MACHINE-CAPABLE OBSERVATION CANDIDATE → FIELD / SITE VALIDATION → CONCEPTUAL DEVICE ROLE / IDENTITY → CONNECTIVITY REQUIREMENT → TRANSPORT BOUNDARY`

- All 16 machine-capable EC-03 candidates are L1 conceptual and not installation-ready.
- Installed/site-ready candidate count is 0.
- No device, SIM, connectivity profile, component ID, or `EDGE-01` placement is instantiated.
- Observation point, device candidate, device identity, connectivity profile and SIM/eSIM remain distinct concepts.

## Direct / Edge status

EC-03 §§3 and 6 define Direct Cellular and Edge Aggregation as alternative, co-applicable conceptual topologies. Neither is selected. No `EDGE-01` is named, placed, or instantiated for `SEM-MCD-001`.

`ARCHITECTURAL OPTION ≠ DEPLOYMENT DECISION`

## Data, control and operations distinctions

- Data plane: readings/states (scalar, event or counter), observation delivery and original event time.
- Control plane: not enabled by default; telemetry/observation is in scope and remote actuation is out of scope (EC-03 §20).
- Operations plane: connectivity status, reachability/lifecycle/diagnostic context and failure-domain signals; exact Beeline exposure and operating model remain TBD (EC-03 §§21, 24, 29, 30).

No Beeline internal implementation is asserted.

## Trust / Access gate

EC-03 §9a places a distinct `BEELINE / HOUSEMASTER TRUST & API BOUNDARY`, inherited from referenced TECH architecture and not designed by EC-03. The HouseMaster Integration Gateway is described only by the existing conceptual functions `authenticate / validate / normalize / map`. Credentials, certificates, keys, IAM, VPN and APN designs are not present in this extraction.

## Minimum integration surface

The minimum conceptual content crossing from transport into the HouseMaster integration edge is:

1. Reading/state content: scalar, event or counter.
2. Source/device and connectivity-profile identity references, all TBD until deployment.
3. Connectivity/delivery status exposed at the agreed boundary.
4. Original `event_time`, distinct from HouseMaster `received_time` for delayed/buffered delivery.
5. Integration outcome needed for validation/normalization/mapping, without defining an API or payload schema.

## Failure and unknown boundary

EC-03 §§9b, 21, 22, 24 and 29 preserve these boundaries:

- No observation or message produces an evidence gap, not proof of normal or failed engineering state.
- Device-side failure, local power failure, local aggregation failure, access/radio failure, operator transport failure, HouseMaster Integration Edge failure and HouseMaster processing failure are distinct conceptual failure domains.
- Beeline responsibility is established for operator transport failure; access/radio ownership remains `TBD WITH BEELINE`; HouseMaster owns its integration and processing failures.
- Connectivity restoration does not close an engineering defect.

## Open source-backed register

The five EC-03-specific TBDs in §12 remain open:

- `TBD-EC03-01` — power availability at candidate locations.
- `TBD-EC03-02` — physical access for installation/maintenance.
- `TBD-EC03-03` — RF/connectivity environment at candidate locations.
- `TBD-EC03-04` — Direct versus Edge engineering/cost preference for candidate clusters.
- `TBD-EC03-05` — metering-interface existence for heating and cold-water candidates.

The fifteen Beeline validation questions `Q-CONN-01…Q-CONN-15` in EC-03 §30 also remain unanswered, covering service models, SIM/eSIM lifecycle, exposed connectivity states, delivery/retry behavior, authentication model, private-connectivity options, RF/site-survey support, operator-side observability, incident exposure, provisioning interfaces, lifecycle events, device/gateway onboarding, edge/gateway ownership and pilot monitoring/escalation.

## Guardrails extracted for this page

1. `CONNECTIVITY STATE ≠ ENGINEERING STATE`
2. `TRANSPORT ≠ DOMAIN INTERPRETATION`
3. `OBSERVATION POINT ≠ DEVICE`
4. `CANDIDATE ≠ INSTALLED DEVICE`
5. `ARCHITECTURAL OPTION ≠ DEPLOYMENT DECISION`
6. `DEVICE OFFLINE ≠ COMPONENT FAILED`
7. `NETWORK HEALTH ≠ BUILDING HEALTH`
8. `CONNECTIVITY RESTORED ≠ ENGINEERING DEFECT CLOSED`
9. `FAILURE DOMAIN ≠ ENGINEERING DEFECT DOMAIN`
10. `CONNECTIVITY ≠ CONTROL AUTHORITY`
11. `event_time ≠ received_time`

## Exclusions preserved

No vendor/product/network technology/protocol is selected. No installed sensor, device, SIM, gateway, RF result, mounting point, concrete payload, API endpoint, production topology, remote actuation, ALAU AI, 3D, financial or marketing content is introduced.
