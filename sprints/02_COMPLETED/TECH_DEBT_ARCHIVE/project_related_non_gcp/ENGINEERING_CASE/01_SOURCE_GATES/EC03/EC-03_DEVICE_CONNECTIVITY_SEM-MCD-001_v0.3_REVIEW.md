# EC-03 — DEVICE & CONNECTIVITY ARCHITECTURE
### Conceptual, Technology-Neutral, Evidence-Gated Architecture
**Reference object:** SEM-MCD-001 — г. Семей, пр. Шакарима, 13 «А»
**Task:** HM-BEELINE-EC-03 (base) + CORR-01 (architecture completion) + CORR-02 (structural completion) · Gate 4 of 12 · MODE: CONCEPTUAL ARCHITECTURE / TECHNOLOGY-NEUTRAL / EVIDENCE-GATED
**Status:** v0.3 — REVIEW ONLY
**Primary input:** `EC-02_PHYSICAL_TO_OBSERVATION_SEM-MCD-001_v0.3_REVIEW.md`
**Secondary references:** `EC-01_REAL_MCD_BASELINE_SEM-MCD-001_v0.3_REVIEW.md`, BUILDING-01B (Device + Connectivity Overlay), TECH-01, TECH-02

---

## 0a. CHANGELOG — v0.2 → v0.3 (CORR-02: Structural Completion of Device & Connectivity Architecture)

**§§1–14, including §9a and §9b, are preserved exactly as approved** — the full
evidence/architecture base (`DEV-CAND-001…016`, `OBS-CAND` mappings, EC-02
requirement values, `Device ID ≠ SIM/eSIM identity`, `Component ≠ Device`,
`Connectivity State ≠ Engineering State`, Direct Connectivity/Edge Aggregation
as co-applicable with no final selection, `HEAT-03 = NO EVIDENCE`, no
instantiated device/`EDGE-01`/SIM, no network technology or protocol
selection, no remote actuation, Reference Device Candidate `DEV-CAND-001`) is
unchanged.

**The former v0.2 §15 ("Next-Gate Handoff") and §16 ("Final Report") are
superseded** by the structural completion below — their content is folded
into the new §31 (EC-04 handoff) and §36 (Final Report) respectively, so no
information is lost, only reorganized into the required structure.

**New sections §15–§36 added**, per exact structural-completion requirements:
Device Function Model, Device Class Model, Connectivity Profile Model,
Traffic Pattern Model, Uplink/Downlink Model, Control Plane Boundary,
Connectivity State Model, Device×Connectivity×Engineering Interpretation
Matrix, Store-and-Forward Model, Reachability/Heartbeat Semantics,
Pattern-Selection Matrix, Reference Direct Connectivity Flow, Reference Edge
Aggregation Flow, Direct-vs-Edge Comparison, Failure Domain Model, TBD-with-
Beeline Connectivity Validation Register, EC-04 Handoff, Site Survey Handoff,
Master Device & Connectivity Matrix, A3 Case Extraction Notes, Confidence/
Completion Summary, Final Report.

**The next gate is fixed and owner-approved: `EC-04 — IDENTITY & LIFECYCLE`**
(not provisional, not API design — see §31).

---

## 0. CHANGELOG — v0.1 → v0.2 (CORR-01: Complete Device & Connectivity Architecture)

**Per explicit instruction, §§1–14 are preserved exactly as written**, including
`DEV-CAND-001…016`, the EC-02 `OBS-CAND` mappings, the L1-conceptual/L2-L3-
installation distinction, Direct Cellular and Edge Aggregation as
co-applicable (undecided) patterns, the absence of any product/protocol/
network-technology selection, `Device ID ≠ SIM identity`, `HEAT-03 = NO
EVIDENCE`, the Reference Device Candidate `DEV-CAND-001`, and every existing
physical/evidence status.

**Additive completions in this revision:**

1. **New §9a — Conceptual Device-to-HouseMaster Data Flow.** v0.1 defined
   device roles, a candidate register, and connectivity requirements as
   separate pieces but never assembled them into one end-to-end conceptual
   flow. This gap is closed with a technology-neutral flow (Device Role →
   Connectivity Path → Beeline/HouseMaster Trust Boundary → Integration
   Gateway → Domain Core), reusing TECH-01's existing layer names as
   reference points only — no new boundary, gateway, or protocol is designed.
2. **New §9b — Runtime / Failure Mode Model.** Extends EC-02 §16.2's
   observation-level Normal/Engineering Event/Channel Loss states to the
   device/connectivity layer, using each candidate's already-established
   loss-tolerance and store-and-forward values (§9) — no new value is
   invented, no recovery mechanism is designed.
3. **§15 (former "Inputs for the Next Gate") corrected.** The former section
   was a loose two-column list with a vague gate reference. It is replaced by
   a properly gated per-candidate readiness table, consistent with the
   pattern already established in EC-02 §17, and the next-gate reference is
   corrected to be explicit about what it is (provisionally scoped, not
   authoritatively named) rather than hand-wavy.
4. **§16 (Final Report) updated** to reflect items 1–3. §§1–14 content is
   otherwise **byte-for-byte unchanged**.

No vendor, product, protocol, network technology, device, SIM, connectivity
profile, or `EDGE-01` placement is introduced anywhere in this revision.

---

## 1. PURPOSE AND SCOPE

EC-03 answers: **for each machine-capable observation candidate identified in
EC-02, what conceptual device role and conceptual connectivity topology would
serve it — expressed as requirements, not products?**

Per the corrected gating logic established in EC-02 v0.3 (§14–§17):

```text
CONCEPTUAL EC-03 READINESS ≠ PHYSICAL INSTALLATION READINESS
L1    → conceptual architecture allowed (this document)
L2/L3 → physical siting / deployment allowed (not reached by any candidate yet)
```

All 16 `MACHINE`/`BOTH` candidates from EC-02 are at readiness level **L1** — this
document therefore proceeds with **conceptual** device-role and
connectivity-topology architecture for all 16, while explicitly marking every
one of them **not installable** until site survey evidence exists.

EC-03 explicitly does **not**:

- select a vendor, product line, or manufacturer;
- select a specific device or sensor model;
- select a Beeline commercial product or tariff;
- confirm RF coverage, signal strength, or basement/technical-room penetration;
- design a final API, schema, or integration contract (TECH-03 territory);
- design production deployment, SLA, or operations procedure (TECH-05/06
  territory);
- instantiate any device, SIM, or connectivity profile in SEM-MCD-001;
- perform or simulate a site survey.

---

## 2. INPUT BASIS

EC-03 uses only facts and candidates already recorded in EC-01 v0.3 and EC-02
v0.3, at their existing status. No source is re-read, no observation candidate
is re-derived, and no readiness level is changed.

Carried forward without change:
- 12 observation candidates (OC-001…OC-012), L0–L3 readiness scale — unchanged
- 18 observable-condition candidates (OBS-CAND-001…018) — unchanged
- 16 `MACHINE`/`BOTH` candidates (OBS-CAND-001…013, 015, 017, 018) — carried
  forward as the device/connectivity population for this document
- 2 `DOCUMENTARY/HUMAN`-only candidates (OBS-CAND-014, 016) — carried forward
  as **no-device** entries (§7)
- `HEAT-03` — **NO EVIDENCE** (unchanged; no device is proposed for it)
- Technology-neutral connectivity requirements per candidate (EC-02 §15.y) —
  reused, not recalculated
- Ontology gaps (hot water, sewer) — both **NON-BLOCKING** for conceptual work
  (EC-02 §17.x) — unchanged, not resolved here

---

## 3. DEVICE & CONNECTIVITY ARCHITECTURE PRINCIPLES (applied, not new)

EC-03 inherits, without modification, the standing principles already
established in TECH-02 and BUILDING-01B:

```text
Component ≠ Device ≠ Connectivity Profile ≠ SIM/eSIM
HouseMaster internal Device ID never depends on Beeline SIM identity
Device is replaceable; the Engineering Component retains its own continuous
  history
Direct Cellular and Edge Aggregation are alternative, co-applicable topologies
  — not sequential stages, and not a decision this document makes
No API name, platform name, MQTT broker, cloud service, SIM-management API,
  private APN, or VPN architecture is asserted anywhere until Beeline
  technical validation (TECH-01…07)
```

Consistent with this, **no `EDGE-01` placement decision, no Direct-Cellular
vs. Edge-Aggregation choice, and no `HEAT-xx`/`CWS-xx`/`SEWER-xx`/`POWER-xx`
component ID is instantiated in this document.** Where BUILDING-01B's topology
model is used below, it is applied as a **framework for expressing
requirements**, not as an architectural decision for SEM-MCD-001.

---

## 4. CONCEPTUAL DEVICE ROLE TAXONOMY

A **device role** is a technology-neutral functional description of what a
future device would need to do — not a product category, brand, or protocol.

```text
DEVICE ROLE CLASS
├── CONTINUOUS SCALAR SENSOR ROLE     produces a scalar reading at high/continuous frequency (e.g. temperature, pressure, flow)
├── EVENT/STATE SENSOR ROLE           produces a binary state or discrete event (e.g. availability, presence/absence, outage)
├── METERING/COUNTER INTERFACE ROLE   produces or exposes a cumulative counter/consumption value, typically periodic
└── AGGREGATION ROLE (conceptual)     a candidate grouping function for multiple device roles sharing a connectivity path — not placed, not named EDGE-01 here
```

No role above implies a specific sensor technology, communication protocol, or
manufacturer. A single physical device could in principle satisfy more than
one role (e.g. a combined temperature+pressure transmitter) — this document
does not decide device consolidation, which is a later, evidence- and
cost-gated engineering decision.

---

## 5. DEVICE CANDIDATE REGISTER

Stable IDs `DEV-CAND-001…016`, one per `MACHINE`/`BOTH` observable-condition
candidate from EC-02 §15. Every row traces to an `OBS-CAND` ID and, through it,
to an EC-01 fact. **No row implies a component location, brand, model, or
protocol.**

| DEV ID | OBS ID | OC ID | Physical context | Device role (conceptual) | Data characteristic (from EC-02) | Priority (from EC-02) | Install readiness |
|---|---|---|---|---|---|---|---|
| DEV-CAND-001 | OBS-CAND-001 | OC-001 | Heating entry (location TBD) | CONTINUOUS SCALAR SENSOR ROLE | SCALAR | P2 | NOT READY (L1) |
| DEV-CAND-002 | OBS-CAND-002 | OC-001 | Heating entry (location TBD) | CONTINUOUS SCALAR SENSOR ROLE | SCALAR | P2 | NOT READY (L1) |
| DEV-CAND-003 | OBS-CAND-003 | OC-002 | Heating metering (location TBD; interface existence TBD) | METERING/COUNTER INTERFACE ROLE | COUNTER | P4 | NOT READY (L1) |
| DEV-CAND-004 | OBS-CAND-004 | OC-004 | Cold water entry (location TBD) | CONTINUOUS SCALAR SENSOR ROLE | SCALAR | P2 | NOT READY (L1) |
| DEV-CAND-005 | OBS-CAND-005 | OC-004 | Cold water entry (location TBD) | CONTINUOUS SCALAR SENSOR ROLE | SCALAR | P2 | NOT READY (L1) |
| DEV-CAND-006 | OBS-CAND-006 | OC-005 | Cold water metering (location TBD; interface existence TBD) | METERING/COUNTER INTERFACE ROLE | COUNTER | P4 | NOT READY (L1) |
| DEV-CAND-007 | OBS-CAND-007 | OC-006 | Hot water (location TBD) | CONTINUOUS SCALAR SENSOR ROLE | SCALAR | P2 | NOT READY (L1) |
| DEV-CAND-008 | OBS-CAND-008 | OC-006 | Hot water (location TBD) | EVENT/STATE SENSOR ROLE | EVENT/BINARY | P1 | NOT READY (L1) |
| DEV-CAND-009 | OBS-CAND-009 | OC-007 | Basement (zone PARTIAL) | EVENT/STATE SENSOR ROLE | EVENT | P1 | NOT READY (L1) — additionally zone-existence-gated |
| DEV-CAND-010 | OBS-CAND-010 | OC-007 | Basement (zone PARTIAL) | CONTINUOUS SCALAR SENSOR ROLE | SCALAR | P3 | NOT READY (L1) — additionally zone-existence-gated |
| DEV-CAND-011 | OBS-CAND-011 | OC-007 | Basement (zone PARTIAL) | CONTINUOUS SCALAR SENSOR ROLE | SCALAR | P3 | NOT READY (L1) — additionally zone-existence-gated |
| DEV-CAND-012 | OBS-CAND-012 | OC-008 | Electrical board (location TBD) | EVENT/STATE SENSOR ROLE | BINARY STATE | P1 | NOT READY (L1) |
| DEV-CAND-013 | OBS-CAND-013 | OC-008 | Electrical board (location TBD) | EVENT/STATE SENSOR ROLE | EVENT | P1 | NOT READY (L1) |
| DEV-CAND-014 | OBS-CAND-015 | OC-010 | Roof (access TBD) | EVENT/STATE SENSOR ROLE | EVENT | P2 | NOT READY (L1) — additionally access-gated (TBD-004) |
| DEV-CAND-015 | OBS-CAND-017 | OC-011 | Lift, per entrance (location TBD) | EVENT/STATE SENSOR ROLE | BINARY STATE | P1 | NOT READY (L1) |
| DEV-CAND-016 | OBS-CAND-018 | OC-011 | Lift, per entrance (location TBD) | EVENT/STATE SENSOR ROLE | EVENT | P1 | NOT READY (L1) |

**`DEV-CAND` numbering is independent of `OBS-CAND` numbering** (EC-02's
`OBS-CAND-014` and `OBS-CAND-016` are `DOCUMENTARY/HUMAN` only and receive no
`DEV-CAND` — see §7).

**Total device candidates: 16. Installable (site-ready) candidates: 0.**

---

## 6. CONCEPTUAL CONNECTIVITY TOPOLOGY MODEL

Per BUILDING-01B, two connectivity topologies are **co-applicable, not
sequential**, and neither is selected here:

```text
TOPOLOGY A — DIRECT CELLULAR
  Device → own connectivity path → Beeline network
  (no aggregation point)

TOPOLOGY B — EDGE AGGREGATION
  Device (×N) → conceptual aggregation point → shared connectivity path →
  Beeline network
  (the aggregation point is a candidate concept only in this document — it is
  not named, placed, or instantiated as "EDGE-01" for SEM-MCD-001)
```

### 6.1 — Topology suitability per device candidate (conceptual, not a decision)

| DEV ID | Conceptually compatible with Topology A? | Conceptually compatible with Topology B? | Note |
|---|---|---|---|
| DEV-CAND-001, 002 | Yes | Yes | Co-located with DEV-CAND-003 (same physical context: heating entry) — natural aggregation candidate, not decided |
| DEV-CAND-003 | Yes | Yes | Same context as above |
| DEV-CAND-004, 005 | Yes | Yes | Co-located with DEV-CAND-006 (cold water entry) — natural aggregation candidate, not decided |
| DEV-CAND-006 | Yes | Yes | Same context as above |
| DEV-CAND-007, 008 | Yes | Yes | Hot water context — no confirmed co-location with another system's entry point |
| DEV-CAND-009, 010, 011 | Yes | Yes | All three basement candidates share a physical context (basement, zone PARTIAL) — natural aggregation candidate if/when zone existence is confirmed |
| DEV-CAND-012, 013 | Yes | Yes | Electrical board context |
| DEV-CAND-014 | Yes | Yes | Roof — a single candidate, aggregation less relevant unless combined with other future roof-level candidates (none currently defined) |
| DEV-CAND-015, 016 | Yes | Yes | Per-entrance lift candidates (×3 structural grouping, OC-012) — natural **per-entrance** aggregation candidate, consistent with the three-entrance-core structural fact (BF-007, DERIVED) |

**No topology is chosen.** The table above only records where physical
co-location (already evidenced or structurally derived, never invented) makes
an aggregation candidate *plausible* for later evaluation — actual topology
selection is a cost/engineering decision reserved for a later gate, after site
survey.

### 6.2 — Relationship to the three entrance cores (OC-012)

OC-012 (three entrance cores, DERIVED) remains, as in EC-02, a **structural
grouping concept, not a device or connectivity decision**. It is referenced
here only to note that **if** Edge Aggregation is later selected for
entrance-scoped candidates (e.g. lifts, DEV-CAND-015/016), a natural grouping
boundary would be per-entrance — this is a plausibility note, not a design.

---

## 7. NO-DEVICE CANDIDATES (DOCUMENTARY/HUMAN CHANNEL ONLY)

| OBS ID | OC ID | Observable condition | Why no device candidate |
|---|---|---|---|
| OBS-CAND-014 | OC-009 | Sewer — overflow/backflow indication | `DOCUMENTARY/HUMAN` per EC-02 §15.x; no BUILDING-01B ontology OP for sewer (§7, non-blocking); addressed entirely through HouseMaster PWA (Channel B) |
| OBS-CAND-016 | OC-010 | Roof — visual defect evidence | `DOCUMENTARY/HUMAN` per EC-02 §15.x; inherently visual/photo evidence, not a machine target |

These remain observable **today**, in principle, through human inspection —
independent of any device or Beeline connectivity decision — exactly as
established in EC-02 §4a.3.

---

## 8. IDENTITY & LIFECYCLE MODEL (per TECH-02, applied — not instantiated)

For every `DEV-CAND`, the eventual HouseMaster identity chain would follow
TECH-02's canonical model. **No actual ID is assigned in this document** — the
chain below is shown to confirm the architecture is ready to receive real
identities once a candidate reaches L2/L3, not to create them prematurely.

```text
BUILDING (SEM-MCD-001)
  → SYSTEM (e.g. Heating — VERIFIED per EC-01)
    → COMPONENT (candidate only — no HEAT-xx/CWS-xx/etc. instantiated)
      → DEVICE (HouseMaster device_id — TBD, assigned only at deployment)
        → CONNECTIVITY PROFILE (TBD — provider-neutral until Beeline validation)
          → SIM/eSIM (Beeline/operator-owned — TBD, out of scope for EC-03)
```

Per TECH-02's standing principle, **HouseMaster's internal Device ID would
never depend on the Beeline SIM identifier**, and **Device identity is
independent of Component identity** — a device serving `DEV-CAND-001` could be
replaced without resetting the engineering history of whatever heating
component is eventually confirmed at the heating entry.

| DEV ID | HouseMaster Device ID | Connectivity Profile | SIM/eSIM | Status |
|---|---|---|---|---|
| DEV-CAND-001…016 (all) | TBD | TBD | TBD (Beeline/operator-owned) | **PLANNED (conceptual only)** — none `REGISTERED`, `INSTALLED`, or `ACTIVE` per TECH-02's lifecycle model |

---

## 9. TECHNOLOGY-NEUTRAL CONNECTIVITY REQUIREMENTS (rolled up from EC-02 §15.y)

This table reuses EC-02's already-established requirement values; it is not
recalculated here. It is repeated for EC-03 self-containment only.

| DEV ID | OBS ID | Latency sensitivity | Loss tolerance | Store-and-forward value | Connectivity-loss detection importance |
|---|---|---|---|---|---|
| DEV-CAND-001 | OBS-CAND-001 | MEDIUM | MEDIUM | HIGH | MEDIUM |
| DEV-CAND-002 | OBS-CAND-002 | MEDIUM | MEDIUM | HIGH | MEDIUM |
| DEV-CAND-003 | OBS-CAND-003 | LOW | HIGH | HIGH | LOW |
| DEV-CAND-004 | OBS-CAND-004 | MEDIUM | MEDIUM | HIGH | MEDIUM |
| DEV-CAND-005 | OBS-CAND-005 | MEDIUM | MEDIUM | HIGH | MEDIUM |
| DEV-CAND-006 | OBS-CAND-006 | LOW | HIGH | HIGH | LOW |
| DEV-CAND-007 | OBS-CAND-007 | MEDIUM | MEDIUM | HIGH | MEDIUM |
| DEV-CAND-008 | OBS-CAND-008 | HIGH | LOW | HIGH | HIGH |
| DEV-CAND-009 | OBS-CAND-009 | HIGH | LOW | HIGH | HIGH |
| DEV-CAND-010 | OBS-CAND-010 | LOW | MEDIUM | MEDIUM | LOW |
| DEV-CAND-011 | OBS-CAND-011 | LOW | MEDIUM | MEDIUM | LOW |
| DEV-CAND-012 | OBS-CAND-012 | HIGH | LOW | HIGH | HIGH |
| DEV-CAND-013 | OBS-CAND-013 | HIGH | LOW | HIGH | HIGH |
| DEV-CAND-014 | OBS-CAND-015 | MEDIUM | MEDIUM | HIGH | MEDIUM |
| DEV-CAND-015 | OBS-CAND-017 | HIGH | LOW | HIGH | HIGH |
| DEV-CAND-016 | OBS-CAND-018 | HIGH | LOW | HIGH | HIGH |

**Forbidden and not used anywhere in this document:** NB-IoT, LTE-M, LTE/4G/5G,
Wi-Fi, LoRaWAN, MQTT, HTTP, or any Beeline product name. These rows describe
**requirements** a future connectivity design would need to satisfy.

---

## 9a. CONCEPTUAL DEVICE-TO-HOUSEMASTER DATA FLOW (new, CORR-01)

**(CORR-01)** §§4–9 defined device roles, the candidate register, topology
candidates, identity shape, and connectivity requirements as separate pieces.
This section assembles them into one **technology-neutral conceptual flow**,
applicable to every `DEV-CAND`, without adding any new architectural element,
boundary, or decision beyond what TECH-01/TECH-02 already establish as
reference architecture.

```text
DEVICE ROLE (§4)
   ↓  (produces a reading/state per its role — scalar, event, or counter)
CONNECTIVITY PATH (§6 — Topology A: Direct Cellular, OR Topology B: Edge
   Aggregation — undecided, co-applicable)
   ↓
BEELINE CONNECTIVITY DOMAIN
   (SIM/eSIM, transport, connectivity status — Beeline-owned, per TECH-02)
   ↓
BEELINE / HOUSEMASTER TRUST & API BOUNDARY
   (existing TECH-01/TECH-04 boundary, referenced only — not designed here)
   ↓
HOUSEMASTER INTEGRATION GATEWAY
   (existing TECH-01 L3 concept — authenticate/validate/normalize/map;
   referenced only, no implementation, endpoint, or protocol asserted)
   ↓
HOUSEMASTER DOMAIN CORE
   (Building → System → Component → Observation, per BUILDING-01C — the
   Component itself remains a candidate/TBD for every DEV-CAND per §8)
```

This flow **does not introduce** a new gateway, boundary, or trust decision —
it only shows where each `DEV-CAND`'s conceptual output would eventually enter
the already-existing TECH-01/BUILDING-01C architecture. Nothing here is
implementable without the identity, topology, and site-survey gaps already
logged in §8, §6, and §12 being closed first.

### 9a.1 — Trust boundary placement (referenced, not designed)

Per TECH-01/TECH-04 (unchanged, reused as-is):

```text
Beeline responsibility:     Device connectivity → SIM → network → transport →
                             connectivity status
HouseMaster responsibility: Ingestion → domain mapping → interpretation →
                             defect → workflow → evidence → building state
```

Every `DEV-CAND` in §5 would sit on the Beeline side of this boundary until it
crosses into the HouseMaster Integration Gateway — this placement is inherited
from the existing TECH-series architecture, not created by EC-03.

---

## 9b. RUNTIME / FAILURE MODE MODEL (new, CORR-01)

**(CORR-01)** Extends EC-02 §16.2's observation-level runtime states to the
device/connectivity layer, using only the loss-tolerance and
store-and-forward values already established in §9 for each `DEV-CAND`. No
new value is invented and no recovery mechanism is designed — this is a
conceptual state model only, consistent with TECH-01's existing "Operating
Modes" and BUILDING-01B's "Offline Capability" annotation.

```text
NORMAL
  device produces expected reading/state on its established temporal class
  (§5/§9) → observation received → HouseMaster state continuity
  (per BUILDING-01E — no threshold/rule is defined here)

ENGINEERING EVENT
  device reports an abnormal reading/state → domain interpretation /
  professional validation (per BUILDING-01E's existing guardrail:
  ABNORMAL OBSERVATION ≠ VERIFIED ENGINEERING FAILURE)

CONNECTIVITY LOSS
  device output unavailable → evidence gap, not a component failure
  (per BUILDING-01E's existing guardrail: DEVICE OFFLINE ≠ COMPONENT FAILED)
  → §9's Store-and-forward value and Connectivity-loss detection importance
  indicate how much this matters per candidate, not how it is technically
  solved

RECOVERY
  connectivity restored → buffered/retained data (where store-and-forward
  value is HIGH) → reconciliation → HouseMaster state resumes
  (mechanism itself remains TECH-01/TECH-06 territory — not designed here)
```

### 9b.1 — Per-candidate runtime sensitivity (derived from existing §9 values, not new)

| Connectivity-loss detection importance (from §9) | `DEV-CAND` IDs | Runtime implication (conceptual only) |
|---|---|---|
| HIGH | 008, 009, 012, 013, 015, 016 | A connectivity gap for these candidates should be flagged with higher operational attention once a future operations layer exists (TECH-06 territory) — not designed here |
| MEDIUM | 001, 002, 004, 005, 007, 014 | Gap is meaningful but less time-critical |
| LOW | 003, 006, 010, 011 | Gap is tolerable for longer periods without immediate operational concern, consistent with these candidates' HIGH loss tolerance in §9 |

No alerting, escalation, or SLA value is assigned — this table only restates
existing §9 values in a runtime-oriented view.

---

## 10. POWER & ENVIRONMENT REQUIREMENTS MODEL (conceptual — nothing invented)

For every `DEV-CAND`, three environmental questions must eventually be
answered by site survey before installation. **No value is assumed or
invented here** — the table only records that the question exists and remains
open.

| Question | Applies to | Current status |
|---|---|---|
| Is mains/local power available at the candidate location? | All 16 `DEV-CAND` | TBD — no power-availability evidence exists for any location in EC-01/EC-02 |
| What is the ambient environment (indoor conditioned, indoor unconditioned, basement, roof-exposed)? | All 16 `DEV-CAND` | TBD, except that OC-007 candidates (009–011) are known to be basement-associated *if* the basement zone existence is field-confirmed, and OC-010 (014) is roof-exposed *if* roof access is confirmed |
| Is physical access for installation/maintenance realistically available? | All 16 `DEV-CAND` | TBD — no access survey has occurred |

No RF, signal-strength, or coverage assumption is made anywhere in this
document — RF/coverage evaluation is explicitly `TBD WITH BEELINE / SITE
SURVEY` per TECH-01…07 and is not reproduced or estimated here.

---

## 11. EXPLICIT NON-SCOPE CONFIRMATION

To make the gate boundary unambiguous, this document confirms it does **not**
contain:

- any vendor, manufacturer, or product-line name;
- any specific device or sensor model;
- any Beeline commercial product, tariff, or SKU;
- any RF coverage, signal-strength, or penetration confirmation;
- any final API, schema, or integration-contract element (reserved for
  TECH-03-aligned future work);
- any production deployment, SLA, or operations design (TECH-05/06 territory);
- any instantiated device, SIM, connectivity profile, or `EDGE-01` placement
  for SEM-MCD-001;
- any site survey activity, simulated or real;
- any instantiated `HEAT-xx` / `CWS-xx` / `SEWER-xx` / `POWER-xx` component ID.

---

## 12. TBD REGISTER (EC-03-specific)

| TBD ID | Unknown | Why needed | Required for | Priority |
|---|---|---|---|---|
| TBD-EC03-01 | Power availability at every candidate location | Device feasibility | Site survey, EC-04+ | High |
| TBD-EC03-02 | Physical access conditions for installation/maintenance | Device feasibility | Site survey, EC-04+ | High |
| TBD-EC03-03 | RF/connectivity environment at each candidate location | Topology and connectivity feasibility | Beeline site survey | High (owned by TECH-01…07, not EC-03) |
| TBD-EC03-04 | Whether Edge Aggregation grouping (per system-entry co-location or per-entrance) is cost/engineering-preferable to Direct Cellular for any candidate cluster | Topology decision | A later, explicitly gated architecture step (not this document) | Medium |
| TBD-EC03-05 | Metering-interface existence for heating and cold-water metering (DEV-CAND-003, 006) | Confirms whether a METERING/COUNTER INTERFACE ROLE device is even applicable, or whether a retrofit/adapter is needed | Site survey | Medium |

All EC-01/EC-02 TBDs (TBD-001…TBD-009, TBD-EC02-01…04) remain open exactly as
recorded and are not restated in full here.

---

## 13. REFERENCE DEVICE CANDIDATE

Consistent with EC-02's Reference Observation Candidate (`OBS-CAND-001`), this
document defines one corresponding **Reference Device Candidate** for
continuity into later gates.

```text
REFERENCE DEVICE CANDIDATE

DEV ID:                                  DEV-CAND-001
OBS ID:                                  OBS-CAND-001
OC ID:                                   OC-001
System:                                  HEATING — VERIFIED (BF-015)
SPECIFIC COMPONENT:                      TBD (no HEAT-xx instantiated)
Device role (conceptual):                CONTINUOUS SCALAR SENSOR ROLE
Data characteristic:                     SCALAR
Priority:                                P2 — operational condition relevance
Latency sensitivity:                     MEDIUM
Loss tolerance:                          MEDIUM
Store-and-forward value:                 HIGH
Connectivity-loss detection importance:  MEDIUM
Topology candidates:                     Direct Cellular OR Edge Aggregation (co-applicable; undecided)
Identity chain readiness:                Conceptually defined (§8); no ID instantiated
Install readiness:                       NOT READY (L1)

VERIFIED:                                Central heating system exists in SEM-MCD-001 (BF-015)
TBD:                                     Component location; power availability; access; RF/connectivity environment; topology selection
SITE SURVEY MUST ESTABLISH:              Physical location of the heating entry point (EC-01 TBD-005), before this candidate can move from L1 to L2

WHY THIS CANDIDATE WAS SELECTED:         Continuity with EC-02's Reference Observation Candidate; demonstrates the full chain from EC-01 evidence →
                                          EC-02 observation candidate → EC-03 device role/connectivity requirement, without inventing any component,
                                          product, or topology decision.
```

---

## 14. CONFIDENCE SUMMARY

```
Device candidates (DEV-CAND)        16, all mapped 1:1 to EC-02 MACHINE/BOTH
                                     observable-condition candidates
Device role distribution            CONTINUOUS SCALAR SENSOR ROLE: 7
                                     EVENT/STATE SENSOR ROLE: 7
                                     METERING/COUNTER INTERFACE ROLE: 2
No-device (documentary/human only)  2 (OBS-CAND-014, 016)
Install readiness                   0 of 16 installable (all NOT READY, L1)
Topology decisions made             0 — Direct Cellular and Edge Aggregation
                                     remain co-applicable candidates for every
                                     device, per BUILDING-01B
Identity/lifecycle instantiations   0 — all Device ID / Connectivity Profile /
                                     SIM fields are TBD, per TECH-02
Power/environment facts established 0 — all TBD, no value invented
Ontology gaps carried forward       2 (hot water, sewer) — both NON-BLOCKING
                                     for this conceptual layer, unchanged
```

---

## 15. DEVICE FUNCTION MODEL

**(CORR-02)**

```text
DEVICE FUNCTION
=
the minimum technical capability required to convert an observable
physical condition into a machine observation and make that observation
available for transport
```

Canonical function set: `MEASURE` · `DETECT` · `COUNT` · `READ INTERFACE` ·
`TIMESTAMP` · `BUFFER` · `STORE` · `FORWARD` · `REPORT STATUS`

No hardware is selected below — each row lists only the functional
capabilities a device role (§4) would need, in principle, to serve the
observable condition.

| DEV ID | OBS ID | Observable condition | Required Device Functions | Reason |
|---|---|---|---|---|
| DEV-CAND-001 | OBS-CAND-001 | Temperature condition (heating entry) | MEASURE, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | SCALAR, continuous — requires a measurement function plus the standard transport-support functions |
| DEV-CAND-002 | OBS-CAND-002 | Pressure condition (heating entry) | MEASURE, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | Same reasoning as DEV-CAND-001 |
| DEV-CAND-003 | OBS-CAND-003 | Flow/consumption (metering) condition (heating metering) | READ INTERFACE, COUNT, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | COUNTER — reads an existing/candidate metering interface rather than measuring directly |
| DEV-CAND-004 | OBS-CAND-004 | Pressure condition (cold water entry) | MEASURE, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | SCALAR, continuous |
| DEV-CAND-005 | OBS-CAND-005 | Flow condition (cold water entry) | MEASURE, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | SCALAR, continuous |
| DEV-CAND-006 | OBS-CAND-006 | Flow/consumption (metering) condition (cold water metering) | READ INTERFACE, COUNT, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | COUNTER — same reasoning as DEV-CAND-003 |
| DEV-CAND-007 | OBS-CAND-007 | Temperature/availability condition (hot water) | MEASURE, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | SCALAR, continuous |
| DEV-CAND-008 | OBS-CAND-008 | Leakage/water-presence indication (hot water) | DETECT, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | EVENT/BINARY — a detection function, not a measurement |
| DEV-CAND-009 | OBS-CAND-009 | Water-presence/flooding indication (basement) | DETECT, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | EVENT — matches BUILDING-01B's basement-water detection pattern |
| DEV-CAND-010 | OBS-CAND-010 | Temperature condition (basement) | MEASURE, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | SCALAR, periodic |
| DEV-CAND-011 | OBS-CAND-011 | Humidity condition (basement) | MEASURE, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | SCALAR, periodic |
| DEV-CAND-012 | OBS-CAND-012 | Supply-availability condition (electrical) | DETECT, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | BINARY STATE — a state-detection function |
| DEV-CAND-013 | OBS-CAND-013 | Outage/event condition (electrical) | DETECT, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | EVENT |
| DEV-CAND-014 | OBS-CAND-015 | Moisture/water-ingress condition (roof) | DETECT, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | EVENT — optional/pilot-TBD per BUILDING-01B |
| DEV-CAND-015 | OBS-CAND-017 | Availability/operational condition (lift) | DETECT, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | BINARY STATE |
| DEV-CAND-016 | OBS-CAND-018 | Outage/event condition (lift) | DETECT, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | EVENT |

No hardware, sensor technology, or manufacturer is implied by any function
name above.

---

## 16. DEVICE CLASS MODEL

**(CORR-02)** Conceptual classes only — no hardware is selected and
`D-CLASS-05` is never instantiated as real equipment (no `EDGE-01` is named).

```text
D-CLASS-01   Direct-connected observation device
D-CLASS-02   Locally aggregated observation device
D-CLASS-03   Existing meter/interface reader
D-CLASS-04   Event/state detector
D-CLASS-05   Gateway / Edge aggregation function (conceptual only — not placed)
```

| DEV ID | Plausible Device Class | Alternative Class | Why | Physical/site dependency |
|---|---|---|---|---|
| DEV-CAND-001 | D-CLASS-01 | D-CLASS-02 | Scalar measurement at a system entry; could be aggregated with DEV-CAND-002/003 if co-located device count justifies it | Heating-entry location TBD (EC-01 TBD-005) |
| DEV-CAND-002 | D-CLASS-01 | D-CLASS-02 | Same physical context as DEV-CAND-001 | Same |
| DEV-CAND-003 | D-CLASS-03 | D-CLASS-02 | Reads an existing/candidate metering interface, not a raw measurement | Metering-interface existence TBD (TBD-EC03-05) |
| DEV-CAND-004 | D-CLASS-01 | D-CLASS-02 | Scalar measurement at cold-water entry | CW-entry location TBD |
| DEV-CAND-005 | D-CLASS-01 | D-CLASS-02 | Same physical context as DEV-CAND-004 | Same |
| DEV-CAND-006 | D-CLASS-03 | D-CLASS-02 | Metering-interface reader | Metering-interface existence TBD |
| DEV-CAND-007 | D-CLASS-01 | D-CLASS-02 | Scalar measurement, hot water | Hot-water location TBD |
| DEV-CAND-008 | D-CLASS-04 | D-CLASS-02 | Leakage detection, hot water | Same as DEV-CAND-007 |
| DEV-CAND-009 | D-CLASS-04 | D-CLASS-02 | Water-presence detection; basement candidates form a natural co-location cluster | Basement zone existence PARTIAL (TBD-003, TBD-EC02-04) |
| DEV-CAND-010 | D-CLASS-02 | D-CLASS-01 | Periodic scalar reading, co-located with DEV-CAND-009/011 | Same |
| DEV-CAND-011 | D-CLASS-02 | D-CLASS-01 | Same reasoning as DEV-CAND-010 | Same |
| DEV-CAND-012 | D-CLASS-04 | D-CLASS-02 | State detection at electrical board | Board location TBD |
| DEV-CAND-013 | D-CLASS-04 | D-CLASS-02 | Event detection, same context as DEV-CAND-012 | Same |
| DEV-CAND-014 | D-CLASS-04 | D-CLASS-01 | Roof event detection, currently an isolated candidate | Roof access TBD (TBD-004) |
| DEV-CAND-015 | D-CLASS-04 | D-CLASS-02 | Per-entrance lift state; entrance-core grouping (OC-012) makes per-entrance aggregation plausible | Per-entrance lift location TBD (TBD-EC02-01) |
| DEV-CAND-016 | D-CLASS-04 | D-CLASS-02 | Same reasoning as DEV-CAND-015 | Same |

`D-CLASS-05` (Gateway/Edge aggregation function) is referenced only as a
concept above (in the "Alternative Class" = `D-CLASS-02` cases) — it is never
assigned a name, location, or instance.

---

## 17. CONNECTIVITY PROFILE MODEL

**(CORR-02)**

```text
CONNECTIVITY PROFILE
=
a provider-neutral set of transport requirements associated with
a Device or Edge Function
```

Explicitly:

```text
Connectivity Profile ≠ SIM
Connectivity Profile ≠ tariff
Connectivity Profile ≠ APN
Connectivity Profile ≠ VPN
Connectivity Profile ≠ network technology
Connectivity Profile ≠ operator product
```

Candidates are grouped by matching requirement signature from §9 (latency /
loss tolerance / store-and-forward / connectivity-loss detection importance),
plus a new **mobility class** dimension — all 16 `DEV-CAND` are building-fixed
installations; no mobile device candidate has been identified anywhere in
EC-01/EC-02, so mobility class is `FIXED` throughout.

| Profile ID | DEV IDs | Latency | Loss tolerance | Store-and-forward | Reachability importance | Mobility | Notes |
|---|---|---|---|---|---|---|---|
| CP-CAND-001 | DEV-CAND-001, 002, 004, 005, 007, 014 | MEDIUM | MEDIUM | HIGH | MEDIUM | FIXED | Continuous/periodic scalar and roof-event candidates sharing a MEDIUM/MEDIUM/HIGH/MEDIUM signature (§9) |
| CP-CAND-002 | DEV-CAND-003, 006 | LOW | HIGH | HIGH | LOW | FIXED | Metering/counter candidates — least time-sensitive, highest loss tolerance |
| CP-CAND-003 | DEV-CAND-008, 009, 012, 013, 015, 016 | HIGH | LOW | HIGH | HIGH | FIXED | Safety/incident-relevant event and binary-state candidates (P1) |
| CP-CAND-004 | DEV-CAND-010, 011 | LOW | MEDIUM | MEDIUM | LOW | FIXED | Basement periodic scalar candidates — lowest urgency |

No provider-side object (SIM, APN, VPN, tariff, network technology) is
instantiated by any profile above.

---

## 18. TRAFFIC PATTERN MODEL

**(CORR-02)** Canonical classes: `PERIODIC TELEMETRY` · `EVENT-DRIVEN` ·
`STATE CHANGE` · `COUNTER / METERING` · `HEARTBEAT / REACHABILITY`. No byte
count, bitrate, interval, or payload size is defined anywhere below.

| DEV ID | OBS ID | Primary traffic pattern | Secondary traffic pattern | Why |
|---|---|---|---|---|
| DEV-CAND-001 | OBS-CAND-001 | PERIODIC TELEMETRY | HEARTBEAT/REACHABILITY | Continuous scalar reading |
| DEV-CAND-002 | OBS-CAND-002 | PERIODIC TELEMETRY | HEARTBEAT/REACHABILITY | Continuous scalar reading |
| DEV-CAND-003 | OBS-CAND-003 | COUNTER/METERING | HEARTBEAT/REACHABILITY | Cumulative consumption value |
| DEV-CAND-004 | OBS-CAND-004 | PERIODIC TELEMETRY | HEARTBEAT/REACHABILITY | Continuous scalar reading |
| DEV-CAND-005 | OBS-CAND-005 | PERIODIC TELEMETRY | HEARTBEAT/REACHABILITY | Continuous scalar reading |
| DEV-CAND-006 | OBS-CAND-006 | COUNTER/METERING | HEARTBEAT/REACHABILITY | Cumulative consumption value |
| DEV-CAND-007 | OBS-CAND-007 | PERIODIC TELEMETRY | HEARTBEAT/REACHABILITY | Continuous scalar reading |
| DEV-CAND-008 | OBS-CAND-008 | STATE CHANGE | EVENT-DRIVEN | Binary/event leakage indication |
| DEV-CAND-009 | OBS-CAND-009 | EVENT-DRIVEN | HEARTBEAT/REACHABILITY | Discrete water-presence event |
| DEV-CAND-010 | OBS-CAND-010 | PERIODIC TELEMETRY | HEARTBEAT/REACHABILITY | Periodic scalar reading |
| DEV-CAND-011 | OBS-CAND-011 | PERIODIC TELEMETRY | HEARTBEAT/REACHABILITY | Periodic scalar reading |
| DEV-CAND-012 | OBS-CAND-012 | STATE CHANGE | EVENT-DRIVEN | Binary supply-availability state |
| DEV-CAND-013 | OBS-CAND-013 | EVENT-DRIVEN | HEARTBEAT/REACHABILITY | Discrete outage event |
| DEV-CAND-014 | OBS-CAND-015 | EVENT-DRIVEN | HEARTBEAT/REACHABILITY | Discrete moisture-ingress event |
| DEV-CAND-015 | OBS-CAND-017 | STATE CHANGE | EVENT-DRIVEN | Binary lift-availability state |
| DEV-CAND-016 | OBS-CAND-018 | EVENT-DRIVEN | HEARTBEAT/REACHABILITY | Discrete lift-outage event |

---

## 19. UPLINK / DOWNLINK MODEL

**(CORR-02)** Classification: `UPLINK ONLY` · `UPLINK + DOWNLINK` · `TBD`.
Remote actuation is out of scope for this gate (§20) — every row below
confirms `NO` for actuation implication.

| DEV ID | Uplink/downlink class | Why | Does this imply actuation? |
|---|---|---|---|
| DEV-CAND-001 | UPLINK ONLY | Reports a measurement | NO |
| DEV-CAND-002 | UPLINK ONLY | Reports a measurement | NO |
| DEV-CAND-003 | UPLINK + DOWNLINK | Reading an existing/candidate metering interface may conceptually benefit from an occasional diagnostic/config query (e.g. re-sync of counter reference) | NO |
| DEV-CAND-004 | UPLINK ONLY | Reports a measurement | NO |
| DEV-CAND-005 | UPLINK ONLY | Reports a measurement | NO |
| DEV-CAND-006 | UPLINK + DOWNLINK | Same reasoning as DEV-CAND-003 | NO |
| DEV-CAND-007 | UPLINK ONLY | Reports a measurement | NO |
| DEV-CAND-008 | UPLINK ONLY | Reports a detection event | NO |
| DEV-CAND-009 | UPLINK ONLY | Reports a detection event | NO |
| DEV-CAND-010 | UPLINK ONLY | Reports a measurement | NO |
| DEV-CAND-011 | UPLINK ONLY | Reports a measurement | NO |
| DEV-CAND-012 | UPLINK ONLY | Reports a state | NO |
| DEV-CAND-013 | UPLINK ONLY | Reports an event | NO |
| DEV-CAND-014 | UPLINK ONLY | Reports an event | NO |
| DEV-CAND-015 | UPLINK ONLY | Reports a state | NO |
| DEV-CAND-016 | UPLINK ONLY | Reports an event | NO |

Where `UPLINK + DOWNLINK` is listed, the conceptually justified downlink use
is limited to configuration, lifecycle management, clock/time
synchronization, or diagnostics — never engineering actuation (valve, pump,
switch, or lift control).

---

## 20. CONTROL PLANE — NOT ENABLED BY DEFAULT

```text
TELEMETRY / OBSERVATION = IN SCOPE
REMOTE ACTUATION        = OUT OF SCOPE
```

Explicitly prohibited in this and every EC-03 revision:

- valve actuation;
- pump control;
- electrical switching;
- lift control;
- remote engineering commands;
- autonomous control by HouseMaster;
- autonomous control by ALAU AI.

```text
CONNECTIVITY ≠ CONTROL AUTHORITY
```

This is consistent with, and does not modify, TECH-04's existing principle
that commands require stronger control than telemetry and remain
optional/future, subject to Beeline/device architecture confirmation — no
such confirmation exists, and none is asserted here.

---

## 21. HOUSEMASTER CANONICAL CONNECTIVITY STATE MODEL

Proposed HouseMaster-side integration states — **not asserted to be Beeline
internal network states.**

| Connectivity State | Meaning in HouseMaster integration model |
|---|---|
| `UNKNOWN` | No connectivity information has ever been received for this device/profile |
| `PROVISIONED` | A connectivity profile has been conceptually associated with a device, but reachability has not yet been confirmed |
| `REACHABLE` | The device's connectivity path is currently confirmed responsive |
| `UNREACHABLE` | The device's connectivity path is currently not responding, cause not yet classified |
| `DEGRADED` | The connectivity path is responsive but exhibiting reduced quality (e.g. delayed delivery), without being fully unreachable |
| `SUSPENDED` | Connectivity has been intentionally paused (administrative action), not a fault |
| `DECOMMISSIONED` | The device/connectivity profile has been retired and is no longer expected to report |

> These are proposed HouseMaster canonical integration states for joint
> validation. They are NOT asserted to be Beeline internal network states.

---

## 22. DEVICE STATE × CONNECTIVITY STATE × ENGINEERING INTERPRETATION

| Scenario | Device state | Connectivity state | Observation availability | Engineering interpretation |
|---|---|---|---|---|
| 1. Device healthy / connectivity unavailable | Healthy (assumed, not confirmable) | UNREACHABLE | Not available | No engineering conclusion possible — evidence gap only |
| 2. Device failed / connectivity available | Failed | REACHABLE | Possibly available but invalid/erroneous, or absent despite reachability | Requires domain investigation; connectivity being available does not confirm the device or the engineering component is healthy |
| 3. Device silent / cause unknown | Unknown | UNKNOWN or UNREACHABLE | Not available | Cause (device fault vs. connectivity fault vs. power loss) cannot be distinguished without further evidence — must not be assumed |
| 4. Observation missing / previous valid building state retained | Unknown | UNREACHABLE or DEGRADED | Not available | Per BUILDING-01E, the last confirmed building state remains valid until new evidence arrives — absence of new data is not itself a state change |
| 5. Connectivity degraded / observation delayed | Assumed healthy | DEGRADED | Delayed | Observation is late, not necessarily wrong; urgency depends on the candidate's latency sensitivity (§9) |
| 6. Connectivity restored / buffered observations arrive | Assumed healthy | REACHABLE (recently restored) | Available, backlog | Per §23, `event_time` of buffered observations must be preserved and distinguished from `received_time` |
| 7. Connectivity restored / engineering defect remains open | Healthy or unhealthy — connectivity says nothing about this | REACHABLE | Available | Restoration of connectivity does not itself close any engineering defect — defect closure requires its own domain validation (BUILDING-01E) |

Mandatory guardrails, unchanged and reaffirmed:

```text
DEVICE OFFLINE ≠ COMPONENT FAILED
CONNECTIVITY RESTORED ≠ ENGINEERING DEFECT CLOSED
NETWORK HEALTH ≠ BUILDING HEALTH
```

---

## 23. STORE-AND-FORWARD MODEL

```text
PHYSICAL OBSERVATION
      ↓
event_time CREATED
      ↓
LOCAL BUFFER / STORE
      ↓
TRANSPORT UNAVAILABLE
      ↓
CONNECTIVITY RESTORED
      ↓
BUFFERED OBSERVATION FORWARDED
      ↓
received_time CREATED
      ↓
HOUSEMASTER PROCESSES USING ORIGINAL event_time
```

```text
event_time ≠ received_time
```

Values below reuse the existing HIGH/MEDIUM/LOW store-and-forward values from
§9 — none is recalculated.

| DEV ID | Store-and-forward value | Why | Needed conceptually? |
|---|---|---|---|
| DEV-CAND-001 | HIGH | Continuity of a trend matters for engineering interpretation | Yes |
| DEV-CAND-002 | HIGH | Same reasoning | Yes |
| DEV-CAND-003 | HIGH | A missed counter interval must be reconciled, not lost | Yes |
| DEV-CAND-004 | HIGH | Same as DEV-CAND-001 | Yes |
| DEV-CAND-005 | HIGH | Same as DEV-CAND-001 | Yes |
| DEV-CAND-006 | HIGH | Same as DEV-CAND-003 | Yes |
| DEV-CAND-007 | HIGH | Same as DEV-CAND-001 | Yes |
| DEV-CAND-008 | HIGH | A leakage event must not be silently lost | Yes |
| DEV-CAND-009 | HIGH | A flooding event must not be silently lost | Yes |
| DEV-CAND-010 | MEDIUM | Low-urgency periodic reading; a gap is tolerable but should still be recoverable | Yes, moderately |
| DEV-CAND-011 | MEDIUM | Same as DEV-CAND-010 | Yes, moderately |
| DEV-CAND-012 | HIGH | A power-availability change must not be silently lost | Yes |
| DEV-CAND-013 | HIGH | Same as DEV-CAND-012 | Yes |
| DEV-CAND-014 | HIGH | A moisture-ingress event must not be silently lost | Yes |
| DEV-CAND-015 | HIGH | A lift-availability change must not be silently lost | Yes |
| DEV-CAND-016 | HIGH | Same as DEV-CAND-015 | Yes |

No buffer size, retention period, or retry interval is defined anywhere in
this document.

---

## 24. REACHABILITY / HEARTBEAT SEMANTICS

Explicit distinctions, applied without a heartbeat interval being defined:

| Reachability condition | Observation state | What HouseMaster may know | What HouseMaster must NOT infer |
|---|---|---|---|
| No engineering observation received | No new data since last known state | That no update has arrived | That the underlying engineering condition is unchanged, healthy, or failed |
| Device unreachable | Connectivity path not responding | That the connectivity path is down | That the physical device or the engineering component has failed (§22, guardrail) |
| Device reachable but no engineering event | Connectivity confirmed responsive, but no telemetry/event content | That the transport path itself is functioning | That the absence of an event necessarily means "normal" — for event-driven candidates, silence is expected between events, but for continuous/periodic candidates it may indicate a device or interface issue not yet classified |
| Device reachable and observation delivered | Connectivity and content both confirmed | That the reported value/event is available for domain interpretation | That the delivered value is automatically a verified engineering fact — it remains subject to BUILDING-01E's Observation → Symptom → Defect gating |

No heartbeat interval, timeout value, or polling frequency is defined
anywhere in this document.

---

## 25. PATTERN-SELECTION MATRIX

**(CORR-02)** Classification differentiated per candidate — not a uniform
"both plausible" result. Classes: `DIRECT-FRIENDLY` · `EDGE-FRIENDLY` ·
`BOTH PLAUSIBLE` · `TBD`. **No final topology is selected.**

| DEV ID | OBS ID | Physical context | Traffic pattern | Direct suitability | Edge suitability | Classification | Why | Site-survey dependency |
|---|---|---|---|---|---|---|---|---|
| DEV-CAND-001 | OBS-CAND-001 | Heating entry (shared context with 002, 003) | PERIODIC TELEMETRY | Plausible | Plausible | BOTH PLAUSIBLE | System-entry measurement cluster — matches the "cluster, both plausible" pattern | Heating-entry location (TBD-005) |
| DEV-CAND-002 | OBS-CAND-002 | Heating entry (shared with 001, 003) | PERIODIC TELEMETRY | Plausible | Plausible | BOTH PLAUSIBLE | Same cluster as DEV-CAND-001 | Same |
| DEV-CAND-003 | OBS-CAND-003 | Heating metering (shared with 001/002 context) | COUNTER/METERING | Plausible | Plausible | BOTH PLAUSIBLE | Small, low-urgency cluster; either pattern is workable | Same, plus metering-interface existence (TBD-EC03-05) |
| DEV-CAND-004 | OBS-CAND-004 | Cold water entry (shared with 005, 006) | PERIODIC TELEMETRY | Plausible | Plausible | BOTH PLAUSIBLE | System-entry measurement cluster | CW-entry location (TBD-005) |
| DEV-CAND-005 | OBS-CAND-005 | Cold water entry (shared with 004, 006) | PERIODIC TELEMETRY | Plausible | Plausible | BOTH PLAUSIBLE | Same cluster as DEV-CAND-004 | Same |
| DEV-CAND-006 | OBS-CAND-006 | Cold water metering (shared with 004/005 context) | COUNTER/METERING | Plausible | Plausible | BOTH PLAUSIBLE | Same reasoning as DEV-CAND-003 | Same, plus metering-interface existence |
| DEV-CAND-007 | OBS-CAND-007 | Hot water (isolated, no confirmed co-located system) | PERIODIC TELEMETRY | Plausible | Weak | DIRECT-FRIENDLY | Isolated observation point — no confirmed physical cluster to justify aggregation | Hot-water location (TBD-005) |
| DEV-CAND-008 | OBS-CAND-008 | Hot water (same context as 007) | STATE CHANGE | Plausible | Weak | DIRECT-FRIENDLY | Small pair (007+008); insufficient cluster size to strongly favor aggregation | Same |
| DEV-CAND-009 | OBS-CAND-009 | Basement (shared with 010, 011) | EVENT-DRIVEN | Weak | Plausible | EDGE-FRIENDLY | Cluster of multiple co-located basement candidates — matches the canonical "cluster favors aggregation" pattern | Basement zone existence PARTIAL (TBD-003, TBD-EC02-04) |
| DEV-CAND-010 | OBS-CAND-010 | Basement (shared with 009, 011) | PERIODIC TELEMETRY | Weak | Plausible | EDGE-FRIENDLY | Same cluster as DEV-CAND-009 | Same |
| DEV-CAND-011 | OBS-CAND-011 | Basement (shared with 009, 010) | PERIODIC TELEMETRY | Weak | Plausible | EDGE-FRIENDLY | Same cluster as DEV-CAND-009 | Same |
| DEV-CAND-012 | OBS-CAND-012 | Electrical board (shared with 013) | STATE CHANGE | Plausible | Plausible | BOTH PLAUSIBLE | Two co-located candidates — small cluster, either pattern workable | Board location (TBD-005) |
| DEV-CAND-013 | OBS-CAND-013 | Electrical board (shared with 012) | EVENT-DRIVEN | Plausible | Plausible | BOTH PLAUSIBLE | Same reasoning as DEV-CAND-012 | Same |
| DEV-CAND-014 | OBS-CAND-015 | Roof (isolated candidate, access unconfirmed) | EVENT-DRIVEN | Unknown | Unknown | TBD | Poorly known physical context — roof access itself is unconfirmed (TBD-004); no basis yet to prefer either pattern | Roof access (TBD-004) |
| DEV-CAND-015 | OBS-CAND-017 | Lift, per entrance (×3 structural candidate, OC-012) | STATE CHANGE | Weak | Plausible | EDGE-FRIENDLY | Natural per-entrance aggregation candidate, consistent with the DERIVED three-entrance-core structural fact | Per-entrance lift location (TBD-EC02-01) |
| DEV-CAND-016 | OBS-CAND-018 | Lift, per entrance (×3 structural candidate, OC-012) | EVENT-DRIVEN | Weak | Plausible | EDGE-FRIENDLY | Same reasoning as DEV-CAND-015 | Same |

Distribution: `DIRECT-FRIENDLY` — 2 · `EDGE-FRIENDLY` — 5 · `BOTH PLAUSIBLE`
— 8 · `TBD` — 1. **No topology is selected for any candidate; this table
records plausibility only.**

---

## 26. REFERENCE DIRECT CONNECTIVITY FLOW

Using the Reference Observation/Device Candidate (`OBS-CAND-001` /
`DEV-CAND-001` — Heating temperature condition):

```text
SEM-MCD-001
   ↓
HEATING — VERIFIED
   ↓
Heating entry candidate — location TBD
   ↓
OBS-CAND-001
   ↓
DEV-CAND-001
   ↓
Device Functions
   MEASURE / TIMESTAMP / BUFFER / STORE / FORWARD / REPORT STATUS
   ↓
Connectivity Profile
   (CP-CAND-001 — MEDIUM latency, MEDIUM loss tolerance, HIGH store-and-
   forward, MEDIUM reachability importance, FIXED mobility)
   ↓
Direct Connectivity Pattern
   ↓
Beeline Access / Transport
   ↓
HouseMaster Trust / Integration Boundary
   ↓
HouseMaster Integration Edge
   ↓
Observation
   ↓
Evidence
   ↓
Building State
```

No real network technology, protocol, or product is instantiated anywhere in
this flow.

---

## 27. REFERENCE EDGE AGGREGATION FLOW

Using the same observation/device candidate, shown under the alternative
(undecided) topology for comparison purposes only:

```text
SEM-MCD-001
   ↓
HEATING — VERIFIED
   ↓
Heating observation candidate — location TBD
   ↓
Local observation device (DEV-CAND-001, conceptually — same candidate as §26)
   ↓
Device Functions
   MEASURE / TIMESTAMP / BUFFER / STORE / FORWARD / REPORT STATUS
   ↓
Conceptual Edge Aggregation Function
   (candidate concept only — not named, not placed, not "EDGE-01")
   ↓
Shared Connectivity Profile
   ↓
Beeline Access / Transport
   ↓
HouseMaster Trust / Integration Boundary
   ↓
HouseMaster Integration Edge
   ↓
Observation
   ↓
Evidence
   ↓
Building State
```

No gateway is named or placed; no local aggregation protocol (e.g. any
short-range wireless or wired bus standard) is invented or implied.

---

## 28. DIRECT VS EDGE COMPARISON

Ratings use `LOW` / `MEDIUM` / `HIGH` / `TBD` plus short reasoning. **No
winner is declared and no cost figure is used anywhere in this section.**

| Criterion | Direct Connectivity | Edge Aggregation |
|---|---|---|
| Operator-facing connectivity identity count | HIGH — one per device | LOW — one per aggregation group |
| Device independence | HIGH — each device operates without dependency on another local device | LOW — devices depend on the shared aggregation function's availability |
| Local power dependency | LOW — only the device itself needs power | MEDIUM–HIGH — the aggregation function also needs power, adding a dependency (exact value TBD pending site survey) |
| Buffering | Per-device (distributed) | Can be centralized at the aggregation function, or still per-device — TBD |
| Aggregation | Not applicable | Native to this pattern |
| Physical distribution | Devices spread across the building without a common local node | Devices cluster around a common local node |
| Maintenance complexity | MEDIUM — more individual connectivity endpoints to manage | MEDIUM — fewer connectivity endpoints, but one added local component to maintain |
| Lifecycle complexity | MEDIUM — device lifecycle only | MEDIUM–HIGH — device lifecycle plus aggregation-function lifecycle |
| Failure-domain size | LOW per device (isolated failure) | HIGHER for the group — an aggregation-function failure affects all devices behind it (see §29, F-03) |
| Single-point-of-failure exposure | LOW | HIGHER — the aggregation function is a candidate single point of failure for its group |
| Local protocol dependency | NONE — no local link required | TBD — an unspecified local link would be required between devices and the aggregation function |
| Operator visibility | Per-device connectivity state | Per-aggregation-group connectivity state, with device-level detail potentially reduced |
| Site-survey dependency | Per-device location only | Per-device location **plus** aggregation-function location and local-link feasibility |
| Scalability | MEDIUM — each additional device adds its own connectivity identity | HIGH within a cluster — additional devices can join an existing aggregation function without new external connectivity identities |
| Replacement impact | LOW — replacing one device does not affect others | MEDIUM — replacing the aggregation function could affect all devices behind it; replacing one device does not |

No topology is recommended or selected based on this comparison.

---

## 29. FAILURE DOMAIN MODEL

```text
F-01  PHYSICAL DEVICE FAILURE
F-02  LOCAL POWER FAILURE
F-03  LOCAL EDGE / AGGREGATION FAILURE
F-04  ACCESS / RADIO CONNECTIVITY FAILURE
F-05  OPERATOR TRANSPORT FAILURE
F-06  HOUSEMASTER INTEGRATION EDGE FAILURE
F-07  HOUSEMASTER PROCESSING FAILURE
```

```text
FAILURE DOMAIN ≠ ENGINEERING DEFECT DOMAIN
```

| Failure ID | Failure domain | What becomes unavailable | What may remain valid | Observable signal | Responsibility status |
|---|---|---|---|---|---|
| F-01 | Physical device failure | Observations from that specific device | Last known building state (per BUILDING-01E); observations from other devices | Device silent, or reporting an implausible value | BUILDING / FIELD |
| F-02 | Local power failure | Observations from the device(s) on that power circuit | Observations from devices on unaffected circuits; last known state | Device(s) unreachable together, correlated with a power-availability candidate (DEV-CAND-012/013) if present | BUILDING / FIELD |
| F-03 | Local Edge/aggregation failure | Observations from every device behind that aggregation function (Edge-Aggregation topology only) | Observations from devices on Direct Connectivity or a different aggregation group | Multiple devices unreachable together, correlated by physical cluster | BUILDING / FIELD, or JOINT if the aggregation function's own connectivity is operator-managed |
| F-04 | Access/radio connectivity failure | Observations from the affected device(s) or aggregation group | Last known building state | Connectivity state transitions to `UNREACHABLE`/`DEGRADED` (§21) | TBD WITH BEELINE |
| F-05 | Operator transport failure | Observations across potentially many devices/buildings sharing that transport path | Last known building state | Correlated connectivity loss beyond a single building's pattern | BEELINE |
| F-06 | HouseMaster Integration Edge failure | New observations cannot be ingested, even if connectivity is healthy | Existing building state (already ingested) | Ingress/processing health signals (per TECH-06, referenced only) | HOUSEMASTER |
| F-07 | HouseMaster processing failure | Domain interpretation of already-ingested observations may be delayed | Raw ingested observations (if durably stored); existing building state | Processing backlog/latency (per TECH-06, referenced only) | HOUSEMASTER |

Beeline responsibility is assigned only where the architecture already
supports it (F-05, and partially F-04); F-04's precise ownership boundary
remains `TBD WITH BEELINE` per TECH-01…07, not asserted here.

---

## 30. TBD WITH BEELINE / CONNECTIVITY VALIDATION REGISTER

Every question below is unanswered by design — this document does not
resolve any of them.

| Q ID | Validation question | Why needed | Status |
|---|---|---|---|
| Q-CONN-01 | What machine-connectivity service models are available for pilot use? | Determines feasible connectivity profiles (§17) | TBD WITH BEELINE |
| Q-CONN-02 | What SIM/eSIM lifecycle capabilities are exposed? | Needed for EC-04's identity/lifecycle design | TBD WITH BEELINE |
| Q-CONN-03 | What connectivity/reachability states can be exposed externally? | Needed to map §21's proposed states to actual Beeline-exposed states | TBD WITH BEELINE |
| Q-CONN-04 | What delivery semantics are available? | Affects §23's store-and-forward assumptions | TBD WITH BEELINE |
| Q-CONN-05 | What retry/reconnect behavior is operator-controlled vs. device-controlled? | Affects §23/§29 failure-recovery boundaries | TBD WITH BEELINE |
| Q-CONN-06 | What authentication/security models are supported? | TECH-04 territory — referenced only, not designed here | TBD WITH BEELINE |
| Q-CONN-07 | What private connectivity options exist if later required? | Affects future connectivity-profile options | TBD WITH BEELINE |
| Q-CONN-08 | What basement/technical-room RF/site-survey support is available? | Directly affects basement-cluster candidates (DEV-CAND-009/010/011) | TBD WITH BEELINE |
| Q-CONN-09 | What operator-side observability can HouseMaster receive? | Affects §21's state-mapping accuracy | TBD WITH BEELINE |
| Q-CONN-10 | How are connectivity incidents exposed? | Affects future TECH-06-aligned operations design | TBD WITH BEELINE |
| Q-CONN-11 | What service-provisioning interfaces exist? | Needed for EC-04's provisioning lifecycle | TBD WITH BEELINE |
| Q-CONN-12 | What lifecycle events are available for SIM/eSIM? | Needed for EC-04's SIM/eSIM lifecycle inventory (§31) | TBD WITH BEELINE |
| Q-CONN-13 | What role can Beeline play in device/gateway onboarding? | Affects Edge Aggregation feasibility (§25/§28) | TBD WITH BEELINE |
| Q-CONN-14 | What edge/gateway ownership patterns are acceptable? | Affects F-03's responsibility assignment (§29) | TBD WITH BEELINE |
| Q-CONN-15 | What pilot monitoring/escalation model is feasible? | TECH-06/TECH-07 territory — referenced only | TBD WITH BEELINE |

No question above is answered in this document.

---

## 31. INPUTS FOR EC-04 — IDENTITY & LIFECYCLE

```text
NEXT GATE:
EC-04 — IDENTITY & LIFECYCLE
OWNER-APPROVED / FIXED
```

| Device Class | Observation relationship | Device identity required? | Connectivity Profile identity required? | SIM/eSIM mapping required? | Replaceable? | Moveable? | Provisioning lifecycle required? | Decommission lifecycle required? |
|---|---|---|---|---|---|---|---|---|
| D-CLASS-01 (Direct-connected observation device) | 1:1 with an observable condition | Yes | Yes | Yes | Yes | Unlikely (fixed installation) | Yes | Yes |
| D-CLASS-02 (Locally aggregated observation device) | 1:1 with an observable condition; shares a connectivity path with siblings | Yes | Shared (at the aggregation function level, TBD) | No (mapped via the aggregation function) | Yes | Unlikely | Yes | Yes |
| D-CLASS-03 (Existing meter/interface reader) | 1:1 with a metering/counter condition | Yes | Yes | Yes | Yes (reader itself; the underlying meter may or may not be) | Unlikely | Yes | Yes |
| D-CLASS-04 (Event/state detector) | 1:1 with an observable condition | Yes | Yes or shared, depending on D-CLASS-01/02 pattern chosen later | Depends on the above | Yes | Unlikely | Yes | Yes |
| D-CLASS-05 (Gateway/Edge aggregation function — conceptual, not placed) | 1:N with multiple observable conditions | Yes, if ever instantiated | Yes | Yes | Yes | Unlikely | Yes | Yes |

### 31.1 — Lifecycle event inventory (definition only — no workflow designed)

```text
OBSERVATION POINT CREATED
OBSERVATION POINT RETIRED

DEVICE CREATED
DEVICE REGISTERED
DEVICE INSTALLED
DEVICE ACTIVATED
DEVICE REPLACED
DEVICE MOVED
DEVICE SUSPENDED
DEVICE DECOMMISSIONED

CONNECTIVITY PROFILE CREATED
CONNECTIVITY PROFILE UPDATED
CONNECTIVITY PROFILE TERMINATED

SIM/eSIM ASSIGNED
SIM/eSIM ACTIVATED
SIM/eSIM REPLACED
SIM/eSIM SUSPENDED
SIM/eSIM RESTORED
SIM/eSIM TERMINATED
```

No workflow, sequencing implementation, or state-machine detail beyond this
named inventory is designed here — that is EC-04's task.

---

## 32. SITE SURVEY HANDOFF

No RF calculation and no signal estimate appears anywhere below.

| Survey category | Relevant DEV-CAND | Why needed | Current status |
|---|---|---|---|
| Physical observation-point location | All 16 | Foundational — every candidate is L1 pending this | TBD (EC-01 TBD-005 and related) |
| Device mounting location | All 16 | Determines D-CLASS-01/02/03/04 feasibility at the specific point | TBD |
| Power availability | All 16 | §10 (EC-03 v0.1) — no value invented | TBD (TBD-EC03-01) |
| Environmental conditions | All 16 | Determines device housing/exposure requirements (not selected here) | TBD |
| Maintenance access | All 16 | Determines long-term serviceability | TBD (TBD-EC03-02) |
| RF/connectivity conditions | All 16 | Owned by TECH-01…07, not EC-03 | TBD WITH BEELINE (TBD-EC03-03) |
| Distance between clustered observation points | DEV-CAND-001/002/003 (heating), 004/005/006 (CW), 009/010/011 (basement), 012/013 (electrical), 015/016 (lift) | Informs Edge Aggregation plausibility (§25) | TBD |
| Possible local aggregation location | Same clusters as above | Would need a physical candidate location if Edge Aggregation is later selected | TBD — no location proposed |
| Local cabling feasibility | Same clusters as above | Relevant to D-CLASS-02/05 feasibility | TBD |
| Building access restrictions | All 16 | General installation/maintenance planning | TBD |

---

## 33. MASTER DEVICE & CONNECTIVITY MATRIX

The central EC-03 engineering table. All values are reused from earlier
sections; none is newly invented here.

| DEV ID | OBS ID | Observable condition | Device Function set | Device Class | Traffic pattern | Uplink/downlink | Connectivity Profile ID | Pattern class | Store-and-forward | Reachability importance | Physical readiness | Conceptual architecture readiness |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| DEV-CAND-001 | OBS-CAND-001 | Temperature condition (heating entry) | MEASURE, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | D-CLASS-01 | PERIODIC TELEMETRY | UPLINK ONLY | CP-CAND-001 | BOTH PLAUSIBLE | HIGH | MEDIUM | L1 — NOT READY | READY |
| DEV-CAND-002 | OBS-CAND-002 | Pressure condition (heating entry) | MEASURE, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | D-CLASS-01 | PERIODIC TELEMETRY | UPLINK ONLY | CP-CAND-001 | BOTH PLAUSIBLE | HIGH | MEDIUM | L1 — NOT READY | READY |
| DEV-CAND-003 | OBS-CAND-003 | Flow/consumption condition (heating metering) | READ INTERFACE, COUNT, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | D-CLASS-03 | COUNTER/METERING | UPLINK + DOWNLINK | CP-CAND-002 | BOTH PLAUSIBLE | HIGH | LOW | L1 — NOT READY | READY |
| DEV-CAND-004 | OBS-CAND-004 | Pressure condition (CW entry) | MEASURE, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | D-CLASS-01 | PERIODIC TELEMETRY | UPLINK ONLY | CP-CAND-001 | BOTH PLAUSIBLE | HIGH | MEDIUM | L1 — NOT READY | READY |
| DEV-CAND-005 | OBS-CAND-005 | Flow condition (CW entry) | MEASURE, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | D-CLASS-01 | PERIODIC TELEMETRY | UPLINK ONLY | CP-CAND-001 | BOTH PLAUSIBLE | HIGH | MEDIUM | L1 — NOT READY | READY |
| DEV-CAND-006 | OBS-CAND-006 | Flow/consumption condition (CW metering) | READ INTERFACE, COUNT, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | D-CLASS-03 | COUNTER/METERING | UPLINK + DOWNLINK | CP-CAND-002 | BOTH PLAUSIBLE | HIGH | LOW | L1 — NOT READY | READY |
| DEV-CAND-007 | OBS-CAND-007 | Temperature/availability condition (hot water) | MEASURE, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | D-CLASS-01 | PERIODIC TELEMETRY | UPLINK ONLY | CP-CAND-001 | DIRECT-FRIENDLY | HIGH | MEDIUM | L1 — NOT READY | READY |
| DEV-CAND-008 | OBS-CAND-008 | Leakage indication (hot water) | DETECT, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | D-CLASS-04 | STATE CHANGE | UPLINK ONLY | CP-CAND-003 | DIRECT-FRIENDLY | HIGH | HIGH | L1 — NOT READY | READY |
| DEV-CAND-009 | OBS-CAND-009 | Water-presence/flooding indication (basement) | DETECT, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | D-CLASS-04 | EVENT-DRIVEN | UPLINK ONLY | CP-CAND-003 | EDGE-FRIENDLY | HIGH | HIGH | L1 — NOT READY (also zone-existence-gated) | READY |
| DEV-CAND-010 | OBS-CAND-010 | Temperature condition (basement) | MEASURE, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | D-CLASS-02 | PERIODIC TELEMETRY | UPLINK ONLY | CP-CAND-004 | EDGE-FRIENDLY | MEDIUM | LOW | L1 — NOT READY (also zone-existence-gated) | READY |
| DEV-CAND-011 | OBS-CAND-011 | Humidity condition (basement) | MEASURE, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | D-CLASS-02 | PERIODIC TELEMETRY | UPLINK ONLY | CP-CAND-004 | EDGE-FRIENDLY | MEDIUM | LOW | L1 — NOT READY (also zone-existence-gated) | READY |
| DEV-CAND-012 | OBS-CAND-012 | Supply-availability condition (electrical) | DETECT, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | D-CLASS-04 | STATE CHANGE | UPLINK ONLY | CP-CAND-003 | BOTH PLAUSIBLE | HIGH | HIGH | L1 — NOT READY | READY |
| DEV-CAND-013 | OBS-CAND-013 | Outage/event condition (electrical) | DETECT, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | D-CLASS-04 | EVENT-DRIVEN | UPLINK ONLY | CP-CAND-003 | BOTH PLAUSIBLE | HIGH | HIGH | L1 — NOT READY | READY |
| DEV-CAND-014 | OBS-CAND-015 | Moisture/water-ingress condition (roof) | DETECT, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | D-CLASS-04 | EVENT-DRIVEN | UPLINK ONLY | CP-CAND-001 | TBD | HIGH | MEDIUM | L1 — NOT READY (also access-gated) | READY |
| DEV-CAND-015 | OBS-CAND-017 | Availability/operational condition (lift) | DETECT, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | D-CLASS-04 | STATE CHANGE | UPLINK ONLY | CP-CAND-003 | EDGE-FRIENDLY | HIGH | HIGH | L1 — NOT READY | READY |
| DEV-CAND-016 | OBS-CAND-018 | Outage/event condition (lift) | DETECT, TIMESTAMP, BUFFER, STORE, FORWARD, REPORT STATUS | D-CLASS-04 | EVENT-DRIVEN | UPLINK ONLY | CP-CAND-003 | EDGE-FRIENDLY | HIGH | HIGH | L1 — NOT READY | READY |

No value in this table is invented — every cell traces to §4, §5, §9, §16–§19,
or §25.

---

## 34. A3 CASE EXTRACTION NOTES

**Definitions only — no artwork or layout is rendered in this document.**

```text
A3 LANDSCAPE
TECHNICAL PUBLICATION
3-COLUMN EDITORIAL GRID FOR NARRATIVE PAGES
```

Future sheets defined:

```text
A3-EC03-01 — Narrative
A3-EC03-02 — Direct Connectivity Pattern
A3-EC03-03 — Edge Aggregation Pattern
A3-EC03-04 — Direct vs Edge Matrix
A3-EC03-05 — Connectivity State / Reachability
A3-EC03-06 — Failure Domains
A3-EC03-07 — Reference Heating Flow
A3-EC03-08 — Master Device & Connectivity Matrix
A3-EC03-09 — TBD With Beeline
```

### A3-EC03-01 — Narrative (three-column structure)

- **Column 1:** Observation requirement.
- **Column 2:** Device Function / Device identity.
- **Column 3:** Connectivity Profile / Beeline boundary.

Key thesis:

> Connectivity serves an observation requirement; it does not define the
> engineering meaning of the observation.

Sources for the remaining sheets: A3-EC03-02/03 → §26/§27; A3-EC03-04 → §28;
A3-EC03-05 → §21/§24; A3-EC03-06 → §29; A3-EC03-07 → §26; A3-EC03-08 → §33;
A3-EC03-09 → §30. No new content is created for these — direct extraction
only.

---

## 35. CONFIDENCE / COMPLETION SUMMARY

**Physical-evidence confidence is unchanged by this section** — the values
below describe structural completeness of this document's conceptual model
only.

```
DEV-CAND count:                     16
Device Functions defined:           9 canonical functions (MEASURE, DETECT,
                                     COUNT, READ INTERFACE, TIMESTAMP, BUFFER,
                                     STORE, FORWARD, REPORT STATUS)
Device Classes defined:             5 (D-CLASS-01…05; D-CLASS-05 not placed)
Connectivity Profiles defined:      4 (CP-CAND-001…004)
Traffic-pattern distribution:       PERIODIC TELEMETRY: 7 · COUNTER/METERING: 2
                                     · STATE CHANGE (primary): 3 · EVENT-DRIVEN
                                     (primary): 4
Uplink-only count:                  14
Uplink+downlink count:              2 (DEV-CAND-003, 006)
TBD downlink count:                 0
Direct-friendly count:              2
Edge-friendly count:                5
Both-plausible count:               8
TBD pattern count:                  1
Connectivity states defined:        7 (UNKNOWN, PROVISIONED, REACHABLE,
                                     UNREACHABLE, DEGRADED, SUSPENDED,
                                     DECOMMISSIONED)
Failure-domain count:               7 (F-01…F-07)
Beeline TBD questions:              15 (Q-CONN-01…15)
EC-04 handoff readiness:            Complete — device-class identity/lifecycle
                                     requirements and lifecycle event inventory
                                     defined (§31)
Installation-ready count:           0 of 16
```

---

## 36. FINAL REPORT

1. **Output file created:** `EC-03_DEVICE_CONNECTIVITY_SEM-MCD-001_v0.3_REVIEW.md` (v0.1, v0.2 preserved for audit history)
2. **§§1–14 preserved:** confirmed byte-identical, including §9a/§9b, as the approved evidence/architecture base
3. **`DEV-CAND` count preserved:** 16 (`DEV-CAND-001…016`), unchanged
4. **Device Function Model completed:** §15, all 16 candidates covered, 9 canonical functions used, no hardware selected
5. **Device Class Model completed:** §16, all 16 candidates covered, `D-CLASS-05` referenced only as a concept, never placed
6. **Connectivity Profile Model completed:** §17, 4 conceptual profiles (`CP-CAND-001…004`) covering all 16 candidates, no provider-side object instantiated
7. **Traffic-pattern distribution:** PERIODIC TELEMETRY 7 · COUNTER/METERING 2 · STATE CHANGE (primary) 3 · EVENT-DRIVEN (primary) 4
8. **Uplink-only / uplink+downlink / TBD distribution:** 14 / 2 / 0
9. **Control Plane boundary completed:** §20 — remote actuation explicitly out of scope, `CONNECTIVITY ≠ CONTROL AUTHORITY` restated
10. **Connectivity State Model completed:** §21, 7 proposed HouseMaster-side states, explicitly not asserted as Beeline internal states
11. **Device State × Connectivity State × Engineering Interpretation matrix completed:** §22, 7 scenarios, all three guardrails restated
12. **Store-and-Forward model completed:** §23, flow diagram plus per-candidate table using only existing §9 values
13. **`event_time ≠ received_time` confirmed:** yes, stated explicitly in §23
14. **Reachability semantics completed:** §24, 4-condition matrix, no heartbeat interval defined
15. **Direct-friendly count:** 2 (`DEV-CAND-007, 008`)
16. **Edge-friendly count:** 5 (`DEV-CAND-009, 010, 011, 015, 016`)
17. **Both-plausible count:** 8 (`DEV-CAND-001, 002, 003, 004, 005, 006, 012, 013`)
18. **TBD pattern count:** 1 (`DEV-CAND-014`)
19. **Reference Direct flow completed:** §26, using `OBS-CAND-001`/`DEV-CAND-001`, no real network technology instantiated
20. **Reference Edge flow completed:** §27, same candidate, no `EDGE-01` named or placed
21. **Direct vs Edge matrix completed:** §28, 15 criteria, `LOW`/`MEDIUM`/`HIGH`/`TBD` only, no winner declared, no costs used
22. **Failure-domain count:** 7 (`F-01…F-07`), §29
23. **Beeline TBD question count:** 15 (`Q-CONN-01…15`), §30, none answered
24. **EC-04 Identity & Lifecycle handoff completed:** §31, device-class table plus full lifecycle-event inventory
25. **EC-04 confirmed owner-approved/fixed next gate:** yes — stated explicitly in §31, not called provisional
26. **Site-survey handoff completed:** §32, 10 categories, no RF calculation or signal estimate
27. **Master Device & Connectivity Matrix completed:** §33, all 16 candidates, all 13 required columns, no invented values
28. **A3 extraction sheets defined:** 9 (`A3-EC03-01…09`), §34, definitions only, no artwork rendered
29. **Confirmation — `Device ID ≠ SIM/eSIM identity`:** reaffirmed in §8 (unchanged) and consistent with §17/§31
30. **Confirmation — `Connectivity State ≠ Engineering State`:** reaffirmed in §21/§22
31. **Confirmation — `Device Offline ≠ Component Failed`:** reaffirmed in §22
32. **Confirmation — `Connectivity Restored ≠ Engineering Defect Closed`:** reaffirmed in §22
33. **Confirmation — no remote actuation enabled:** yes — §20 explicitly prohibits valve/pump/electrical/lift actuation and autonomous control by HouseMaster or ALAU AI
34. **Confirmation — no vendor/product/network technology/protocol selected:** yes — confirmed across §15–§33; forbidden technology list (NB-IoT, LTE-M, LTE/4G/5G, Wi-Fi, LoRaWAN, MQTT, HTTP, Beeline products) remains unused, consistent with §9/§11
35. **Confirmation — no real device/SIM/Connectivity Profile/`EDGE-01` instantiated:** yes — all identities remain `TBD`/conceptual (§8, §17, §31); `D-CLASS-05` and the Edge Aggregation function are never named or placed (§16, §27)
36. **Confirmation — EC-04 was NOT started:** yes — this document defines EC-04's inputs (§31) only; no identity is created, no lifecycle workflow is implemented

---

# STOP.

EC-03 v0.3 is structurally complete per the exact requirements of
HM-BEELINE-EC-03-CORR-02. It does not start EC-04. Waiting for separate owner
approval before Gate 5/12 (`EC-04 — IDENTITY & LIFECYCLE`).
