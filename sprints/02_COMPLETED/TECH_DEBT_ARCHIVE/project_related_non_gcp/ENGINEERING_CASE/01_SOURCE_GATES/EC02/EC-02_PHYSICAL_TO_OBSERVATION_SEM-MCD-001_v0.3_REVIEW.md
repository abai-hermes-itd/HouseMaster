# EC-02 — PHYSICAL BUILDING → OBSERVATION ARCHITECTURE
### Engineering Domain Mapping for Connected Building Architecture
**Reference object:** SEM-MCD-001 — г. Семей, пр. Шакарима, 13 «А»
**Task:** HM-BEELINE-EC-02 (base) + CORR-01 (semantic observability layer) + CORR-02 (observability matrix + EC-03 handoff completion) · Gate 3 of 12 · MODE: ENGINEERING DOMAIN MAPPING / EVIDENCE-GATED ARCHITECTURE
**Status:** v0.3 — REVIEW ONLY
**Primary input:** `EC-01_REAL_MCD_BASELINE_SEM-MCD-001_v0.3_REVIEW.md`

---

## 0a. CHANGELOG — v0.2 → v0.3 (CORR-02: Complete Observability Matrix and EC-03 Handoff)

**Per explicit instruction, §§1–13 are preserved** except for two narrow, named
corrections and one additive update to §13:

1. **§5 basement rationale corrected.** The unsupported generic-typology
   inference ("technical basements are near-universal for this building type…
   the physical space almost certainly exists") is **removed**. Replaced with
   evidence-safe wording only (`Evidence status: PARTIAL`,
   `Observation candidate: provenance-gated`, `Primary-source or field
   confirmation required`). No confidence increase is derived from building
   typology anywhere in this document.
2. **EC-03 gating logic corrected.** The former statement that EC-03 "may
   consider the following, once site survey evidence exists" is **replaced**.
   The canonical distinction now applied throughout §14–§17:
   ```
   CONCEPTUAL EC-03 READINESS ≠ PHYSICAL INSTALLATION READINESS
   L1  → conceptual architecture allowed
   L2/L3 → physical siting / deployment allowed
   ```
   Conceptual device/connectivity architecture work MAY proceed today at L1,
   explicitly marked conceptual and site-survey-gated; physical
   deployment/installation may not.
3. **§13 (Confidence Summary) extended additively** with new observability
   metrics (§13 itself, below) — no existing physical-object evidence
   confidence line is altered.

**New sections added (§14–§19), replacing the former §14 "Inputs for EC-03" and
former §15 "Final Report," which are superseded by the more complete §17 and
§19 respectively:**
- §14 Observable Condition Model
- §15 SEM-MCD-001 Master Observability Matrix (incl. §15.x Machine/Human/Both
  Decision, §15.y Technology-Neutral Connectivity Requirements)
- §16 Reference Observation Candidate (+ flow, + runtime states)
- §17 Inputs for EC-03 — Device & Connectivity (+ ontology-gap blocking status)
- §18 A3 Case Extraction Notes (definitions only — no rendering)
- §19 Final Report

No sensor, device, SIM/eSIM, network technology, or protocol is selected or
named anywhere in this revision. No source is re-interpreted; no new EC-01 fact
is created.

---

## 0. CHANGELOG — v0.1 → v0.2 (CORR-01: Complete Observation Architecture)

v0.1 answered **what** could be observed and **on what evidence basis** (§4–§8:
candidates OC-001…OC-012, the L0–L3 readiness scale, the OC master register). It
did not yet define the **observation architecture itself** — i.e. for each
candidate, what *kind* of observation is conceptually appropriate (machine vs.
human, continuous vs. periodic), what *class* of data it would conceptually
produce, and how it would connect into HouseMaster's established
Observation→Symptom→Defect domain-interpretation pipeline (BUILDING-01D/01E).
That layer was missing and is added in this revision as new **§4a**.

**This correction is strictly additive:**
- OC-001…OC-012 IDs, their target descriptions, evidence basis, and L0/L1/L2/L3
  readiness levels (§4, §8) are **unchanged**.
- No candidate is promoted or demoted in readiness by this correction. Adding an
  observation-architecture description to an L1 candidate does not make it
  siteable — readiness still depends solely on physical-location evidence (§10).
- No device, sensor model, SIM/M2M, or API element is introduced — "Channel"
  (Machine/Human) and "Observation type" are BUILDING-01D/01E **domain
  concepts**, not hardware choices.
- New: **§4a Observation Architecture / Semantic Observability Layer**.
- §9 (HouseMaster Semantic Mapping), §12 (TBD Register), §13 (Confidence
  Summary), §15 (Final Report) updated to reference the new layer. All other
  sections are unchanged.

---

## 1. PURPOSE AND SCOPE

EC-02 answers one question: **for SEM-MCD-001, what physical objects and zones
could legitimately become HouseMaster observation points, and on what evidence
basis?**

EC-02 defines **WHAT** should be observed and **WHY**, gated strictly by the
evidence status recorded in EC-01 v0.3. It does **not**:

- select sensors, meters, or controller hardware/models;
- design SIM/eSIM or M2M provisioning;
- design any API, integration contract, or data schema;
- decide Beeline connectivity topology (Direct Cellular vs. Edge Aggregation);
- place `EDGE-01` or any device;
- instantiate `HEAT-03` or any other BUILDING-01A component ID without evidence;
- start EC-03 or any later gate.

Everything produced here is a **candidate observation architecture** — a mapping
from evidence-backed physical facts to HouseMaster's `OBSERVATION POINT` concept
(per BUILDING-01B), not a deployment plan.

---

## 2. INPUT BASIS

EC-02 uses only facts already recorded in EC-01 v0.3, at their existing status.
No source is re-read, no image is re-interpreted, and no new area/geometry
calculation is performed. Where EC-01 marks a fact TBD, EC-02 treats the
corresponding observation candidate as **not yet siteable**, not as an
opportunity to fill the gap.

Carried forward without change:
- 9 floors — VERIFIED (BF-006)
- 3 entrances/sections — DERIVED (BF-007)
- Footprint (site-coverage) area — **TBD** (TBD-001, unaffected by the CORR-02 area taxonomy)
- Footprint shape — stepped/non-rectangular — PARTIAL (BF-009)
- Central heating, cold water, hot water, sewer, electrical — **existence VERIFIED**, topology/component-location **TBD** (BF-015–BF-019)
- Lifts — existence VERIFIED, count PARTIAL (BF-020)
- Garbage chutes — existence VERIFIED, count PARTIAL (BF-021)
- Basement / технический подвал — existence PARTIAL (secondary-source only)
- Roof — existence/type PARTIAL
- `HEAT-03` (or any heating mixing/elevator node) — **NO EVIDENCE** (EC-01 §13, unchanged)
- Apartment count 81 vs 78 — **OPEN** (CONFLICT-005, unchanged)
- Land-letter reference mismatch — **OPEN** (CONFLICT-004, unchanged)
- Area taxonomy (1,248 m² useful / 550 m² common-shared / 6,403.80 m² building-cadastral / ≈15,020 m² adjacent-territory) — RESOLVED per CORR-02; **not used for any geometric or siting purpose in this document**

---

## 3. OBSERVATION PHILOSOPHY (per BUILDING-01A/B, applied — not re-derived)

EC-02 inherits, without modification, the standing principles already established
in the BUILDING-01 series:

```
Component ≠ Device ≠ Connectivity Profile ≠ SIM/eSIM
Selective, purpose-driven observability — not "every pipe = a sensor"
Observation Point (OP) is a physical/engineering concept — it exists whether or
  not a device is ever installed there
BUILDING-01A/B component IDs (HEAT-01…04, CWS-01…03, SEWER-01…03, POWER-01…03,
  OP-01…08) are an ontology/comparison framework, NOT evidence that SEM-MCD-001
  actually has these components at these locations
```

Consistent with EC-01 §13's instruction, **no `HEAT-xx`, `CWS-xx`, `SEWER-xx`,
`POWER-xx`, or `OP-xx` ID from BUILDING-01A/B is instantiated as a real SEM-MCD-001
component or observation point in this document.** Where the ontology is used
below, it is explicitly marked as a **candidate mapping**, not an instantiation.

### 3.1 — Observation Readiness Scale (used throughout this document)

| Level | Meaning | Can a real OP be sited today? |
|---|---|---|
| **L0 — NOT A CANDIDATE** | No evidence the underlying system/zone exists | No |
| **L1 — CONCEPTUAL CANDIDATE** | System/zone existence is VERIFIED or PARTIAL, but no component location is known | No — site survey required first |
| **L2 — SITEABLE CANDIDATE** | A specific component/location is documented (plan, photo, or field note) | Not yet reached for any object in this document |
| **L3 — FIELD-INSTANTIATED** | Location field-confirmed and ready for device/connectivity design (EC-03+) | Not yet reached |

**Every observation candidate in this document is currently L1.** No object in
SEM-MCD-001 has a confirmed physical location sufficient to reach L2 in this
session's evidence base.

---

## 4. PHYSICAL ZONE → CANDIDATE OBSERVATION MAPPING

For each EC-01 §18 handoff object, this table records a candidate observation
target, its BUILDING-01B ontology analogue (for naming/comparison only), its
readiness level, and what would be required to advance it.

| Candidate ID | Target (physical) | System | BUILDING-01B analogue (naming reference only) | Evidence basis (EC-01) | Readiness | Advance requires |
|---|---|---|---|---|---|---|
| **OC-001** | Heating system entry/state (location unknown) | HEATING | `OP-01` (Temp/Pressure at HEAT-01) | BF-015 — existence VERIFIED | **L1** | Heat-entry location (TBD-005) |
| **OC-002** | Heating metering (location unknown) | HEATING | `OP-02` (Meter/ctrl at HEAT-02) | BF-015 — existence VERIFIED | **L1** | Metering-node location (TBD-005) |
| **OC-003** | Heating mixing/elevator node | HEATING | `OP-03` (at HEAT-03) | **NO EVIDENCE** (EC-01 §13) | **L0** | No candidate until a component is documented — do not instantiate |
| **OC-004** | Cold water entry (location unknown) | COLD WATER | `OP-04` (at CWS-01) | BF-016 — existence VERIFIED | **L1** | Water-entry location (TBD-005) |
| **OC-005** | Cold water metering (location unknown) | COLD WATER | `OP-05` (at CWS-02) | BF-016 — existence VERIFIED | **L1** | Metering-node location (TBD-005) |
| **OC-006** | Hot water system state (location unknown) | HOT WATER | No direct BUILDING-01B analogue (01B/01A do not separately model ГВС) | BF-017 — existence VERIFIED | **L1** | Node location; also note BUILDING-01A/B ontology gap (§7) |
| **OC-007** | Basement environment (water presence / general condition) | BASEMENT (environment, not a component) | `OP-06` (basement water/flood) | Basement existence — PARTIAL (secondary-source only, no plan) | **L1**, weaker than others — even zone existence is not primary-confirmed | Basement plan/field survey (TBD-003) |
| **OC-008** | Electrical main distribution board (location unknown) | ELECTRICAL | `OP-07` (Power avail. at POWER-02) | BF-019 — existence VERIFIED | **L1** | Board location (TBD-005) |
| **OC-009** | Sewer collector/outlet (location unknown) | SEWER | No BUILDING-01B OP defined for sewer (01B explicitly notes "no OP for sewer in v0.1") | BF-018 — existence VERIFIED | **L1** | Node location; also note BUILDING-01B itself leaves sewer unobserved at OP level (§7) |
| **OC-010** | Roof — moisture/water-ingress condition | ROOF | `OP-08` (Moisture, optional/pilot TBD in 01B) | Roof existence/type — PARTIAL | **L1** | Roof access/plan (TBD-004) |
| **OC-011** | Lift status/availability (per entrance, ×3 candidate) | LIFTS | No BUILDING-01B OP defined for lifts | BF-020 — existence VERIFIED, count PARTIAL | **L1** | Confirm 3-lift count and per-entrance locations |
| **OC-012** | Entrance-core grouping context (×3, not itself an observation target — a spatial grouping candidate for future per-entrance observation design) | STRUCTURE | n/a | BF-007 — DERIVED | **L1 (structural, not a sensor candidate)** | Exact core positions |

**Not listed as a candidate at all (L0, explicitly excluded):** garbage chutes
(BF-021 — existence confirmed, but no engineering/safety observation rationale
identified this session), gas supply (BF-022 — existence itself TBD), any specific
riser or distribution-pipe segment (no location evidence for any riser).

---

## 4a. OBSERVATION ARCHITECTURE / SEMANTIC OBSERVABILITY LAYER (new, CORR-01)

**(CORR-01)** This section completes the observation architecture for each
candidate in §4/§8. It defines, for every candidate, the **conceptual channel**
(per BUILDING-01D's Channel A — Machine / Channel B — Human), the **conceptual
observation type**, and the **conceptual data class** it would produce — and shows
how that observation would enter HouseMaster's existing domain-interpretation
pipeline (BUILDING-01E: Observation → Symptom → Defect → Risk → Action). None of
this selects a device, a sensor model, a polling interval, a protocol, or a
threshold. All of it stays at the level BUILDING-01D/E themselves stay at:
domain concepts, not implementation.

### 4a.1 — Channel and observation-type model (applied, not new)

Per BUILDING-01D, every observation reaching HouseMaster arrives via one or both
of two channels, and per BUILDING-01B/D these channels are **co-applicable, not
sequential**:

```
CHANNEL A — MACHINE OBSERVATION   continuous / event-driven, via a future device
CHANNEL B — HUMAN OBSERVATION     inspection-based, via HouseMaster PWA (Hausmaster)
```

For each EC-02 candidate, this document records which channel(s) are
**conceptually appropriate given the physical nature of the target** — not which
channel Beeline/HouseMaster will actually implement (that remains a later,
evidence- and cost-gated decision, out of scope here).

### 4a.2 — Observation architecture per candidate

| OC ID | Conceptually appropriate channel(s) | Observation type (conceptual) | Conceptual data class (BUILDING-01D "observation_id" style — no schema implied) | Domain-interpretation destination (BUILDING-01E) |
|---|---|---|---|---|
| OC-001 (Heating entry) | Machine (A) + Human (B) | Continuous/event (machine) + periodic inspection (human) | Temperature/pressure measurement (machine); visual/inspection note (human) | → Observation → possible Symptom (e.g. abnormal differential) → Defect (gated by domain rules, not defined here) |
| OC-002 (Heating metering) | Machine (A) | Continuous/event, where a meter interface exists | Meter/pulse or interface reading — existence of an interface itself is TBD (BF-015 confirms the system, not a metering interface) | → Observation only, until interface existence is confirmed |
| OC-003 (Heating mixing/elevator node) | n/a | n/a | n/a | **N/A — L0, no observation architecture defined; see §6** |
| OC-004 (Cold water entry) | Machine (A) + Human (B) | Continuous/event (machine) + periodic inspection (human) | Pressure/flow measurement (machine); visual note (human) | → Observation → possible Symptom → Defect (gated) |
| OC-005 (Cold water metering) | Machine (A) | Continuous/event, where a meter interface exists | Pulse/interface reading — interface existence TBD | → Observation only |
| OC-006 (Hot water) | Machine (A) + Human (B) | Continuous/event (machine) + periodic inspection (human) | Temperature/pressure or availability state (machine); visual note (human) | → Observation → possible Symptom → Defect (gated) — subject to the ontology gap noted in §7 |
| OC-007 (Basement environment) | Machine (A) + Human (B) | Event-driven (machine, e.g. presence/absence) + periodic inspection (human) | Presence/absence event (machine, per the BUILDING-01B basement-water pattern); photo + location note (human) | → Observation → Symptom (e.g. recurrent water presence) → Defect (gated) — per BUILDING-01E's explicit guardrail: **water presence ≠ automatically a pipe defect** |
| OC-008 (Electrical main board) | Machine (A) + Human (B) | Continuous/event (machine, availability) + periodic inspection (human) | Power-availability observation (machine); visual/inspection note (human) | → Observation → possible Symptom → Defect (gated) |
| OC-009 (Sewer collector/outlet) | Human (B) only, as a conceptual default | Periodic inspection | Visual/inspection note; no machine data class proposed, consistent with BUILDING-01B defining no OP for sewer (§7) | → Observation only, pending ontology extension |
| OC-010 (Roof) | Machine (A, optional per BUILDING-01B) + Human (B) | Event-driven (machine, moisture) + periodic inspection (human) | Moisture/water-ingress event (machine, explicitly optional/pilot-TBD in BUILDING-01B); visual note (human) | → Observation → possible Symptom → Defect (gated) |
| OC-011 (Lifts, ×3 candidate) | Machine (A) + Human (B) | Continuous/event (machine, status/availability) + periodic inspection (human) | Status/availability observation (machine); inspection/maintenance note (human) | → Observation → possible Symptom (e.g. repeated fault events) → Defect (gated) |
| OC-012 (Entrance-core grouping) | n/a — structural grouping, not an observation target | n/a | n/a | Not applicable — organizational context only for future per-entrance design |

**No frequency, threshold, or rule value is assigned anywhere in this table.**
Per BUILDING-01E, the Observation→Symptom and Symptom→Defect transitions are
gated by "Domain Rules / Professional Validation" — an engine that does not yet
exist for this project and is explicitly out of scope for EC-02.

### 4a.3 — Why channel/type is a domain concept, not a device decision

Assigning "Machine (A)" to a candidate does not mean a sensor has been selected,
budgeted, or scheduled for installation — it means that, **if and when** a device
is later deployed there (a decision reserved for EC-03+), the resulting
observation would conceptually belong to Channel A. Every candidate that lists
Human (B) remains observable **today**, in principle, through a physical
inspection recorded via HouseMaster PWA, independent of any Beeline connectivity
or device procurement — this mirrors BUILDING-01D's own point that Channel B does
not depend on Channel A.

### 4a.4 — Readiness scale is unaffected

The L0–L3 readiness scale from §3.1 continues to describe **physical siting
readiness only**. Adding a channel/observation-type description to an L1
candidate does not change its readiness level: an L1 candidate with a fully
described observation architecture is still not siteable, because its physical
location remains unknown. Readiness and observation-architecture description are
independent axes; conflating them would misrepresent how close a candidate
actually is to field deployment.

---

## 5. WHY EACH CANDIDATE IS INCLUDED (rationale, not device design)

- **Heating, cold water, electrical (OC-001/002/004/005/008):** these are the
  three systems BUILDING-01B treats as having defined `OP` analogues, and EC-01
  independently confirmed existence for all three. Including them as L1
  candidates keeps the observation architecture aligned with both the evidence
  and the established ontology, without pretending a location is known.
- **Hot water (OC-006):** existence is independently VERIFIED in EC-01 (BF-017,
  from the SRC-004 systems checklist, "Горячее водоснабжение"), but the
  BUILDING-01A/B ontology does not currently define a separate ГВС component or
  OP. This is flagged as an **ontology gap**, not resolved here (§7).
- **Sewer (OC-009):** existence VERIFIED (BF-018); BUILDING-01B explicitly states
  "no observation point defined for sewer in this REVIEW (v0.1)" — the same gap
  is carried forward here rather than inventing an OP where the reference
  architecture itself has none.
- **Basement environment (OC-007):** BUILDING-01B's basement-water observation
  pattern is a relevant analogue. **(CORR-02)**

  ```text
  BASEMENT
  Evidence status: PARTIAL
  Observation candidate: provenance-gated
  Primary-source or field confirmation required
  ```

  This candidate is included because a technical basement/подполье is referenced
  in the secondary-source compiled passport (SRC-001/002) and in EC-01's spatial
  zone mapping, but that reference is **not corroborated by any primary source**
  in EC-01. No generic building-typology assumption is used to raise this
  candidate's confidence — it remains explicitly the **weakest** candidate in
  this table and should not be treated as equivalent in confidence to the
  systems with VERIFIED existence.
- **Roof (OC-010):** included because BUILDING-01B lists roof moisture as an
  optional/pilot-TBD observation category already, and EC-01 records at least
  partial roof-type evidence (Кровля field on the SRC-004 checklist).
- **Lifts (OC-011):** included on engineering-relevance grounds (lift status is a
  common HouseMaster observation category generally) even though BUILDING-01B
  does not itself define a lift OP; existence is VERIFIED.
- **Entrance-core grouping (OC-012):** not a sensor target itself, but recorded
  because three entrance cores are a DERIVED structural fact that will likely
  shape how future per-entrance observation/connectivity is organized (see
  BUILDING-01B's Edge Aggregation pattern, referenced only as a naming precedent,
  not adopted here).

---

## 6. EXPLICITLY NOT CANDIDATES (L0)

| Object | Why excluded |
|---|---|
| `HEAT-03` / any heating mixing-elevator node | NO EVIDENCE (EC-01 §13) — instantiating an OP here would mean inventing a location that does not exist in any source |
| Any specific riser segment (heat, water, sewer, power) | No riser routing evidence anywhere in EC-01 |
| Any specific apartment-level component | Out of scope — BUILDING-01 series and EC-01 do not address in-apartment observation |
| Gas supply infrastructure | Existence itself is TBD (BF-022) |
| Garbage chute condition/fill-level | Existence confirmed, but no documented engineering rationale for this candidate in this evidence set |
| Exact footprint / facade / basement geometry as an "observable" | These are geometry facts (TBD-001, TBD-003, TBD-004), not observation targets — conflating the two would violate the area/geometry vs. observation distinction carried from EC-01 |

---

## 7. ONTOLOGY GAPS IDENTIFIED (flagged only — not resolved in EC-02)

Two gaps in the existing BUILDING-01A/B ontology became visible while mapping
SEM-MCD-001's confirmed systems against it:

1. **Hot water (ГВС) has no dedicated component/OP family** in BUILDING-01A/B,
   even though SEM-MCD-001's hot water existence is independently VERIFIED
   (BF-017) and hot water is architecturally distinct from cold water in the
   compiled passport and the systems checklist.
2. **Sewer has no defined OP** in BUILDING-01B v0.1 (stated explicitly in that
   artifact itself), despite sewer existence also being VERIFIED for SEM-MCD-001
   (BF-018).

These are noted as **candidate feedback to the BUILDING-01 series maintainers**,
not acted on here — per instruction, EC-02 does not modify TECH/BUILDING
artifacts.

---

## 8. OBSERVATION POINT CANDIDATE REGISTER (master table)

| OC ID | System | Readiness | Evidence status of underlying system/zone | Component location known? | Siteable now? | EC-01 fact reference |
|---|---|---|---|---|---|---|
| OC-001 | Heating (entry) | L1 | VERIFIED (existence) | No | No | BF-015 |
| OC-002 | Heating (metering) | L1 | VERIFIED (existence) | No | No | BF-015 |
| OC-003 | Heating (mixing/elevator node) | L0 | NO EVIDENCE | No | No | EC-01 §13 |
| OC-004 | Cold water (entry) | L1 | VERIFIED (existence) | No | No | BF-016 |
| OC-005 | Cold water (metering) | L1 | VERIFIED (existence) | No | No | BF-016 |
| OC-006 | Hot water | L1 | VERIFIED (existence) | No | No | BF-017 |
| OC-007 | Basement environment | L1 (weak) | PARTIAL (secondary only) | No | No | §3, EC-01 §8 |
| OC-008 | Electrical (main board) | L1 | VERIFIED (existence) | No | No | BF-019 |
| OC-009 | Sewer (collector/outlet) | L1 | VERIFIED (existence) | No | No | BF-018 |
| OC-010 | Roof | L1 | PARTIAL | No | No | §6, EC-01 §6 |
| OC-011 | Lifts (×3 candidate) | L1 | VERIFIED (existence), count PARTIAL | No | No | BF-020 |
| OC-012 | Entrance-core grouping | L1 (structural) | DERIVED | Partial (count only, not position) | No | BF-007 |

**Total candidates: 12 (11 observation-target candidates + 1 structural grouping
candidate). Siteable (L2+) candidates: 0.**

**(CORR-01)** For the conceptual channel (Machine/Human), observation type, and
domain-interpretation destination of each candidate above, see the new §4a. That
information is additive and does not change any value in this table.

---

## 9. HOUSEMASTER SEMANTIC MAPPING (extends EC-01 §9)

| Physical fact | HM semantic candidate | Evidence status | Observation candidate | Can instantiate an OP? |
|---|---|---|---|---|
| Heating system documented | SYSTEM: HEATING | VERIFIED (existence) | OC-001, OC-002 | No |
| Cold water system documented | SYSTEM: COLD WATER | VERIFIED (existence) | OC-004, OC-005 | No |
| Hot water system documented | SYSTEM: HOT WATER | VERIFIED (existence) | OC-006 | No |
| Sewer system documented | SYSTEM: SEWER | VERIFIED (existence) | OC-009 | No |
| Electrical system documented | SYSTEM: ELECTRICAL | VERIFIED (existence) | OC-008 | No |
| Lift system documented | SYSTEM: LIFTS | VERIFIED (existence), count PARTIAL | OC-011 | No |
| Basement zone | ZONE: BASEMENT ENVIRONMENT | PARTIAL | OC-007 | No |
| Roof zone | ZONE: ROOF | PARTIAL | OC-010 | No |
| 3 entrance cores | SECTION × 3 | DERIVED | OC-012 | No (structural grouping only) |
| Heating mixing/elevator node (`HEAT-03`) | COMPONENT candidate | NO EVIDENCE | OC-003 | **No — do not instantiate** |

**(CORR-01)** This table is unchanged from v0.1; conceptual channel (Machine/Human)
and observation-type detail for each `Observation candidate` column entry is in
§4a and is not repeated here to avoid duplicated, potentially inconsistent data.

---

## 10. SITE SURVEY DEPENDENCY MAP

Every L1 candidate in §8 depends on the same class of missing evidence already
logged in EC-01's TBD register. This section only cross-references, it does not
duplicate or re-scope those TBDs.

| Observation candidates | Depends on (EC-01 TBD) | Priority (per EC-01) |
|---|---|---|
| OC-001, OC-002, OC-004, OC-005, OC-006, OC-008, OC-009 | TBD-005 — engineering-node locations | High |
| OC-007 | TBD-003 — basement plan and height | High |
| OC-010 | TBD-004 — facade/roof photos and access | High |
| OC-011 | TBD-006 (apartment/unit-adjacent confirmation) + a new lift-location gap (not previously logged — see §12) | Medium |
| OC-012 | TBD-001 — footprint/site geometry, to the extent exact core positions require dimensioned geometry | Critical (shared with geometry track) |

No connectivity-specific (Beeline) site-survey item is added here — those remain
exactly as recorded in EC-01 §11 and are out of scope for EC-02.

---

## 11. EXPLICIT NON-SCOPE CONFIRMATION

To make the gate boundary unambiguous, this document confirms it does **not**
contain:

- any sensor/meter/controller brand, model, or type;
- any SIM/eSIM/M2M provisioning detail;
- any `EDGE-01` placement decision;
- any API, schema, or integration-contract element;
- any Direct-Cellular vs. Edge-Aggregation topology decision for SEM-MCD-001;
- any Beeline-specific capability assumption;
- any instantiated `HEAT-xx` / `CWS-xx` / `SEWER-xx` / `POWER-xx` / `OP-xx` ID beyond
  the candidate (OC-xxx) mappings defined in this document, which are explicitly
  **not** the same thing as BUILDING-01B's `OP-01…08` IDs — no BUILDING-01B ID is
  claimed to exist in SEM-MCD-001 by this document.

---

## 12. NEW TBD REGISTER ENTRIES (EC-02-specific)

| TBD ID | Unknown | Why needed | Required for | Priority |
|---|---|---|---|---|
| TBD-EC02-01 | Per-entrance lift locations (not just count) | Needed to site OC-011 at L2 | Future device/observation design | Medium |
| TBD-EC02-02 | Whether hot water (ГВС) warrants its own component family in the BUILDING-01 ontology, given SEM-MCD-001's independently confirmed ГВС existence | Ontology completeness (§7) | Future BUILDING-01 series maintenance — not EC-02/EC-03 | Low (flagged, not actioned) |
| TBD-EC02-03 | Whether sewer warrants a defined OP in the BUILDING-01 ontology | Ontology completeness (§7) | Future BUILDING-01 series maintenance — not EC-02/EC-03 | Low (flagged, not actioned) |
| TBD-EC02-04 | Basement zone existence itself is only PARTIAL (secondary-source only) — needs primary confirmation before OC-007 can even be treated as a confident L1 candidate | Confidence upgrade for OC-007 | EC-03+, site survey | Medium |

All other open items (TBD-001…TBD-009 from EC-01, CONFLICT-004, CONFLICT-005)
remain as recorded in EC-01 v0.3 and are not restated in full here.

---

## 13. CONFIDENCE SUMMARY

```
Observation candidate count       12 (11 target + 1 structural grouping)
Readiness distribution            L0: 1 (OC-003, excluded)
                                   L1: 11 (all remaining candidates)
                                   L2/L3: 0
Systems with VERIFIED existence   6 of 6 core systems (heating, cold water, hot
                                   water, sewer, electrical, lifts) mapped to at
                                   least one L1 candidate
Zones with only PARTIAL existence 2 (basement, roof) — carried as weaker L1
                                   candidates
Ontology gaps identified          2 (hot water, sewer — flagged only)
Siteable (device-ready) points    0 — none reach L2 in this evidence base
Observation architecture coverage 11 of 11 non-excluded candidates have a defined
                                   conceptual channel/type/destination (§4a);
                                   OC-003 (L0) has none, by design
```

**(CORR-02 addendum — extends, does not alter, the block above):**

```
Observable Conditions:              18 (across 10 valid OC targets; OC-003
                                     excluded, OC-012 not forced into a target)
OBS-CAND count:                     18 (OBS-CAND-001…018)
Priority distribution:              P1: 7 · P2: 6 · P3: 3 · P4: 2
Observation-channel distribution:   BOTH: 16 · DOCUMENTARY/HUMAN: 2 ·
                                     MACHINE-only: 0 · HUMAN-only: 0 · TBD: 0
Temporal-class distribution:        CONTINUOUS/HIGH-FREQUENCY: 5 · PERIODIC: 4 ·
                                     EVENT-DRIVEN: 8 · MANUAL/ON-DEMAND: 1
Observability-status distribution:  OBSERVABLE NOW: 8 · OBSERVABLE AFTER FIELD
                                     MAPPING: 10 · OBSERVABLE AFTER
                                     INSTRUMENTATION: 0 · NOT CURRENTLY
                                     OBSERVABLE: 0
Conceptual EC-03-ready count:       16 (all MACHINE/BOTH candidates)
Installation-ready count:           0 (no candidate has reached L2/L3)
```

---

## 14. OBSERVABLE CONDITION MODEL

**(CORR-02, new)**

```text
OBSERVABLE CONDITION
=
a physical state, value, change or event associated with a building
zone/system/component that can be evidenced by one or more observations
```

Preserved distinctions (unchanged from the BUILDING-01 series, applied here):

```text
PHYSICAL OBJECT ≠ OBSERVABLE CONDITION ≠ OBSERVATION ≠ EVIDENCE ≠ DEFECT
ABNORMAL OBSERVATION ≠ VERIFIED ENGINEERING FAILURE
```

Observable conditions are defined below for every **valid** target OC-001…OC-011.
`OC-003` (L0, NO EVIDENCE) is **excluded** — no observable condition is defined
for a component that has no evidence of existing. `OC-012` (entrance-core
grouping) is **not forced into a measurement target** — it remains a structural
grouping concept only, per its original §4/§4a treatment.

| OC ID | System/Zone | Observable conditions (conceptual, non-exhaustive) |
|---|---|---|
| OC-001 | Heating (entry) | Temperature condition; pressure condition |
| OC-002 | Heating (metering) | Flow/consumption (metering) condition |
| OC-004 | Cold water (entry) | Pressure condition; flow condition |
| OC-005 | Cold water (metering) | Flow/consumption (metering) condition |
| OC-006 | Hot water | Temperature/availability condition; leakage/water-presence indication |
| OC-007 | Basement (environment) | Water-presence/flooding indication; temperature condition; humidity condition |
| OC-008 | Electrical (main board) | Supply-availability condition; outage/event condition |
| OC-009 | Sewer (collector/outlet) | Overflow/backflow indication |
| OC-010 | Roof | Moisture/water-ingress condition; visual defect evidence |
| OC-011 | Lifts | Availability/operational condition; outage/event condition |

Not every condition above requires instrumentation — several (e.g. roof visual
defect evidence, general leak/overflow symptoms) are conceptually served
adequately by human/documentary evidence; this is decided per-condition in §15.

### 14.1 — Canonical observation taxonomy

```text
OBSERVATION
├── MACHINE OBSERVATION       machine-generated measurement/state/counter/event
├── HUMAN OBSERVATION         inspection/checklist/manual reading/field assessment
├── DOCUMENTARY EVIDENCE      photo/act/passport/service record/inspection record
└── DERIVED OBSERVATION       state/value derived from one or more observations
```

Preserved:

```text
MACHINE SIGNAL ≠ ENGINEERING FACT
DERIVED OBSERVATION ≠ VERIFIED DEFECT
```

---

## 15. SEM-MCD-001 MASTER OBSERVABILITY MATRIX

**(CORR-02, new)** — stable IDs `OBS-CAND-001…018`, one row per observable
condition from §14. Every row traces back to an OC ID (§4/§8) and, through it,
to an EC-01 fact. No row implies a component location, sensor model, or
protocol.

| OBS ID | OC ID | Zone | System | Physical context | Observable condition | Physical evidence status | Observation class | Preferred evidence channel | Priority | Data characteristic | Temporal class | Observability status | Site survey required |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| OBS-CAND-001 | OC-001 | TBD (location not established) | Heating | System entry (component location TBD) | Temperature condition | VERIFIED (existence, BF-015); location TBD | BOTH | Human general assessment now; machine pending siting | P2 | SCALAR | CONTINUOUS/HIGH-FREQUENCY | OBSERVABLE NOW (human) | YES — TBD-005 |
| OBS-CAND-002 | OC-001 | TBD | Heating | System entry (component location TBD) | Pressure condition | VERIFIED (existence, BF-015); location TBD | BOTH | Machine (gauge point); human only if gauge accessible | P2 | SCALAR | CONTINUOUS/HIGH-FREQUENCY | OBSERVABLE AFTER FIELD MAPPING | YES — TBD-005 |
| OBS-CAND-003 | OC-002 | TBD | Heating | Metering node (location TBD; interface existence TBD) | Flow/consumption (metering) condition | VERIFIED (system existence, BF-015); metering interface existence TBD | BOTH | Machine (meter interface) or human manual reading | P4 | COUNTER | PERIODIC | OBSERVABLE AFTER FIELD MAPPING | YES — TBD-005 |
| OBS-CAND-004 | OC-004 | TBD | Cold water | System entry (component location TBD) | Pressure condition | VERIFIED (existence, BF-016); location TBD | BOTH | Machine (gauge point) | P2 | SCALAR | CONTINUOUS/HIGH-FREQUENCY | OBSERVABLE AFTER FIELD MAPPING | YES — TBD-005 |
| OBS-CAND-005 | OC-004 | TBD | Cold water | System entry (component location TBD) | Flow condition | VERIFIED (existence, BF-016); location TBD | BOTH | Machine (flow point) | P2 | SCALAR | CONTINUOUS/HIGH-FREQUENCY | OBSERVABLE AFTER FIELD MAPPING | YES — TBD-005 |
| OBS-CAND-006 | OC-005 | TBD | Cold water | Metering node (location TBD; interface existence TBD) | Flow/consumption (metering) condition | VERIFIED (system existence, BF-016); metering interface existence TBD | BOTH | Machine or human manual reading | P4 | COUNTER | PERIODIC | OBSERVABLE AFTER FIELD MAPPING | YES — TBD-005 |
| OBS-CAND-007 | OC-006 | TBD | Hot water | System (location TBD) | Temperature/availability condition | VERIFIED (existence, BF-017); location TBD; ontology gap (§7) | BOTH | Human (tap-level check) now; machine pending siting | P2 | SCALAR | CONTINUOUS/HIGH-FREQUENCY | OBSERVABLE NOW (human) | YES — TBD-005 |
| OBS-CAND-008 | OC-006 | TBD | Hot water | System (location TBD) | Leakage/water-presence indication | VERIFIED (existence, BF-017); location TBD | BOTH | Human (visual) now; machine pending siting | P1 | EVENT / BINARY STATE | EVENT-DRIVEN | OBSERVABLE NOW (human) | YES — TBD-005 |
| OBS-CAND-009 | OC-007 | Basement (existence PARTIAL) | — (zone, not a system) | Basement environment | Water-presence/flooding indication | PARTIAL (secondary-source only) — **(CORR-02)** primary/field confirmation required before this candidate is treated as more than provenance-gated | BOTH | Human/documentary now (if access exists); machine pending zone confirmation | P1 | EVENT | EVENT-DRIVEN | OBSERVABLE AFTER FIELD MAPPING | YES — TBD-003, TBD-EC02-04 |
| OBS-CAND-010 | OC-007 | Basement (existence PARTIAL) | — | Basement environment | Temperature condition | PARTIAL (secondary-source only) | BOTH | Human/documentary or machine, both pending zone confirmation | P3 | SCALAR | PERIODIC | OBSERVABLE AFTER FIELD MAPPING | YES — TBD-003, TBD-EC02-04 |
| OBS-CAND-011 | OC-007 | Basement (existence PARTIAL) | — | Basement environment | Humidity condition | PARTIAL (secondary-source only) | BOTH | Same as above | P3 | SCALAR | PERIODIC | OBSERVABLE AFTER FIELD MAPPING | YES — TBD-003, TBD-EC02-04 |
| OBS-CAND-012 | OC-008 | TBD | Electrical | Main distribution board (location TBD) | Supply-availability condition | VERIFIED (existence, BF-019); location TBD | BOTH | Human (general) now; machine pending siting | P1 | BINARY STATE | EVENT-DRIVEN | OBSERVABLE NOW (human) | YES — TBD-005 |
| OBS-CAND-013 | OC-008 | TBD | Electrical | Main distribution board (location TBD) | Outage/event condition | VERIFIED (existence, BF-019); location TBD | BOTH | Human (general) now; machine pending siting | P1 | EVENT | EVENT-DRIVEN | OBSERVABLE NOW (human) | YES — TBD-005 |
| OBS-CAND-014 | OC-009 | TBD | Sewer | Collector/outlet (location TBD) | Overflow/backflow indication | VERIFIED (system existence, BF-018); no ontology OP defined (§7); location TBD | DOCUMENTARY/HUMAN | Human/documentary (visible symptom) — machine channel TBD pending ontology extension | P1 | EVENT | EVENT-DRIVEN | OBSERVABLE NOW (human) | YES — TBD-005 |
| OBS-CAND-015 | OC-010 | Roof (existence/type PARTIAL) | Roof | Roof surface (access TBD) | Moisture/water-ingress condition | PARTIAL | BOTH | Machine (optional per BUILDING-01B) pending roof access; human pending same | P2 | EVENT | EVENT-DRIVEN | OBSERVABLE AFTER FIELD MAPPING | YES — TBD-004 |
| OBS-CAND-016 | OC-010 | Roof (existence/type PARTIAL) | Roof | Roof surface (access TBD) | Visual defect evidence | PARTIAL | DOCUMENTARY/HUMAN | Photo/inspection, pending roof access | P3 | PHOTO / DOCUMENT | MANUAL/ON-DEMAND | OBSERVABLE AFTER FIELD MAPPING | YES — TBD-004 |
| OBS-CAND-017 | OC-011 | Entrance cores (×3 candidate, position TBD) | Lifts | Lift, per entrance (location TBD) | Availability/operational condition | VERIFIED (existence, BF-020); count PARTIAL; per-unit location TBD | BOTH | Human (general) now; machine pending siting | P1 | BINARY STATE | EVENT-DRIVEN | OBSERVABLE NOW (human) | YES — TBD-EC02-01 |
| OBS-CAND-018 | OC-011 | Entrance cores (×3 candidate, position TBD) | Lifts | Lift, per entrance (location TBD) | Outage/event condition | VERIFIED (existence, BF-020); count PARTIAL; per-unit location TBD | BOTH | Human (general) now; machine pending siting | P1 | EVENT | EVENT-DRIVEN | OBSERVABLE NOW (human) | YES — TBD-EC02-01 |

**No sampling interval, threshold, or rule value is assigned anywhere in this
table.**

### 15.x — Machine / Human / Both Decision

| OBS ID | Observable condition | Machine useful? | Human required? | Preferred model | Reason |
|---|---|---|---|---|---|
| OBS-CAND-001 | Heating — temperature | Yes, for trend/continuity | Yes, for context | BOTH | Engineering question ("is heating adequate?") benefits from continuous trend + periodic human context |
| OBS-CAND-002 | Heating — pressure | Yes | Only if gauge accessible | BOTH (machine-led) | Pressure is not reliably human-readable without an instrument at the point |
| OBS-CAND-003 | Heating — metering | Yes, for billing/consumption accuracy | Yes, as fallback | BOTH | Consumption data benefits from machine accuracy; manual reading is a valid interim |
| OBS-CAND-004 | Cold water — pressure | Yes | Only if gauge accessible | BOTH (machine-led) | Same reasoning as OBS-CAND-002 |
| OBS-CAND-005 | Cold water — flow | Yes | Only if flow point accessible | BOTH (machine-led) | Continuous flow monitoring is engineering-relevant |
| OBS-CAND-006 | Cold water — metering | Yes | Yes, as fallback | BOTH | Same as OBS-CAND-003 |
| OBS-CAND-007 | Hot water — temperature/availability | Yes, for continuity | Yes, tap-level check is simple and immediate | BOTH | Human channel answers the question today; machine adds continuity later |
| OBS-CAND-008 | Hot water — leakage | Useful for early detection | Yes, visual leakage is often human-first-detected | BOTH | Leakage is frequently first noticed by a person; machine adds speed |
| OBS-CAND-009 | Basement — water/flooding | Yes, event detection value is high | Yes, until zone/access confirmed | BOTH | Matches BUILDING-01B's basement-water pattern; human/documentary is the only channel until zone existence is field-confirmed |
| OBS-CAND-010 | Basement — temperature | Useful, low urgency | Yes, as interim | BOTH | Not safety-critical; either channel works once access exists |
| OBS-CAND-011 | Basement — humidity | Useful, low urgency | Yes, as interim | BOTH | Same as OBS-CAND-010 |
| OBS-CAND-012 | Electrical — supply availability | Yes, immediate detection value | Yes, residents/Hausmaster already notice outages | BOTH | The engineering question ("is power available?") is already answerable by people today |
| OBS-CAND-013 | Electrical — outage/event | Yes | Yes | BOTH | Same reasoning |
| OBS-CAND-014 | Sewer — overflow/backflow | Possible in principle, no ontology OP yet | Yes — primary channel today | DOCUMENTARY/HUMAN | No BUILDING-01B OP exists for sewer (§7); human/documentary is the only currently defined channel |
| OBS-CAND-015 | Roof — moisture ingress | Yes, optional per BUILDING-01B | Yes, pending roof access | BOTH | Matches BUILDING-01B's optional/pilot-TBD roof-moisture category |
| OBS-CAND-016 | Roof — visual defect | Not a machine target | Yes — inherently visual | DOCUMENTARY/HUMAN | A visual defect is, by nature, best evidenced by photo/inspection |
| OBS-CAND-017 | Lifts — availability | Yes | Yes, visibly noticeable | BOTH | The engineering question is already answerable by people today |
| OBS-CAND-018 | Lifts — outage/event | Yes | Yes | BOTH | Same reasoning |

**Core thesis applied throughout:** `ENGINEERING QUESTION → APPROPRIATE EVIDENCE
CHANNEL`, never `PHYSICAL OBJECT → SENSOR`. Not every condition is proposed for
instrumentation.

### 15.y — Technology-Neutral Connectivity Requirements

For every `MACHINE` or `BOTH` candidate (16 of 18 — `OBS-CAND-014` and
`OBS-CAND-016` are `DOCUMENTARY/HUMAN` only and are excluded, since they imply no
machine connectivity requirement). **These are requirements, not solutions — no
technology, protocol, or product is named or implied anywhere in this table.**

| OBS ID | Latency sensitivity | Loss tolerance | Store-and-forward value | Connectivity-loss detection importance |
|---|---|---|---|---|
| OBS-CAND-001 | MEDIUM | MEDIUM | HIGH | MEDIUM |
| OBS-CAND-002 | MEDIUM | MEDIUM | HIGH | MEDIUM |
| OBS-CAND-003 | LOW | HIGH | HIGH | LOW |
| OBS-CAND-004 | MEDIUM | MEDIUM | HIGH | MEDIUM |
| OBS-CAND-005 | MEDIUM | MEDIUM | HIGH | MEDIUM |
| OBS-CAND-006 | LOW | HIGH | HIGH | LOW |
| OBS-CAND-007 | MEDIUM | MEDIUM | HIGH | MEDIUM |
| OBS-CAND-008 | HIGH | LOW | HIGH | HIGH |
| OBS-CAND-009 | HIGH | LOW | HIGH | HIGH |
| OBS-CAND-010 | LOW | MEDIUM | MEDIUM | LOW |
| OBS-CAND-011 | LOW | MEDIUM | MEDIUM | LOW |
| OBS-CAND-012 | HIGH | LOW | HIGH | HIGH |
| OBS-CAND-013 | HIGH | LOW | HIGH | HIGH |
| OBS-CAND-015 | MEDIUM | MEDIUM | HIGH | MEDIUM |
| OBS-CAND-017 | HIGH | LOW | HIGH | HIGH |
| OBS-CAND-018 | HIGH | LOW | HIGH | HIGH |

Forbidden and explicitly not used anywhere above or elsewhere in this document:
NB-IoT, LTE-M, LTE/4G/5G, Wi-Fi, LoRaWAN, MQTT, HTTP, or any Beeline product
name. These rows describe **requirements** a future connectivity design would
need to satisfy — they do not propose how to satisfy them.

---

## 16. REFERENCE OBSERVATION CANDIDATE

**Selected: `OBS-CAND-001`** (Heating — temperature condition), per the
following selection criteria:

1. System existence supported by EC-01 (BF-015 — VERIFIED).
2. Physically meaningful — temperature is a directly interpretable engineering
   quantity.
3. Understandable to telecom engineers unfamiliar with building engineering.
4. Machine observation is possible in principle (SCALAR, continuous/high-freq).
5. Useful for illustrating Normal / Engineering Event / Observation Channel
   Loss / Recovery states (§16.2).
6. No unsupported component is invented — the candidate is defined at the
   **system-entry** level, not tied to any specific `HEAT-xx` ID.
7. Remaining site-survey gaps are clearly stated (component location, TBD-005).

```text
REFERENCE OBSERVATION CANDIDATE

OBS ID:                                  OBS-CAND-001
OC ID:                                   OC-001
System:                                  HEATING — VERIFIED
SPECIFIC COMPONENT:                      TBD (no HEAT-xx instantiated)
OBSERVATION POINT:                       CANDIDATE
Physical context:                        Heating system entry (component location TBD)
Observable condition:                    Temperature condition (supply/return)
Evidence status:                         VERIFIED (system existence, BF-015); component location TBD
Observation class:                       BOTH (Machine + Human)
Preferred evidence model:                Human general assessment observable now; machine observation pending field-confirmed siting
Priority:                                P2 — operational condition relevance
Data characteristic:                     SCALAR
Temporal class:                          CONTINUOUS/HIGH-FREQUENCY
Latency sensitivity:                     MEDIUM
Loss tolerance:                          MEDIUM
Store-and-forward value:                 HIGH
Connectivity-loss detection importance:  MEDIUM

VERIFIED:                                Central heating system exists in SEM-MCD-001 (BF-015, SRC-004/Image 5 checklist)
TBD:                                     Heat-entry component location; metering-interface existence; exact riser/mixing-node topology
SITE SURVEY MUST ESTABLISH:              Physical location of the heating entry point (per EC-01 TBD-005), before any machine device can be sited (L1 → L2)

WHY THIS CANDIDATE WAS SELECTED:         Heating is the system with the strongest combination of confirmed existence, physical clarity, and general engineering
                                          legibility to a non-building-specialist audience, while requiring no invented component ID — it demonstrates the full
                                          evidence chain (EC-01 → EC-02 candidate → observable condition → conceptual architecture) without overstating readiness.
```

### 16.1 — Reference Observation Flow

```text
SEM-MCD-001
   ↓
ENGINEERING SYSTEM (Heating — VERIFIED)
   ↓
PHYSICAL CONTEXT / COMPONENT CANDIDATE (system entry — location TBD)
   ↓
OBSERVABLE CONDITION (temperature condition)
   ↓
OBSERVATION POINT (OC-001 / OBS-CAND-001 — CANDIDATE, L1)
   ↓
OBSERVATION (machine measurement and/or human note — channel TBD by EC-03+)
   ↓
EVIDENCE (per BUILDING-01D — timestamp + component context + provenance)
   ↓
HOUSEMASTER BUILDING STATE (per BUILDING-01C/E)
```

### 16.2 — Conceptual runtime states (illustrative, not an implementation design)

```text
NORMAL
  observation received → state continuity
  (temperature within expected range, per future domain rules — not defined here)

ENGINEERING EVENT
  abnormal observation → domain interpretation / professional validation
  (per BUILDING-01E: abnormal observation ≠ verified engineering failure —
  requires Symptom → Defect gating that this document does not perform)

OBSERVATION CHANNEL LOSS
  observation unavailable → evidence gap / connectivity question
  ≠ engineering component failure
  (per BUILDING-01E's existing guardrail: Device Offline ≠ Component Failed)
```

No recovery, reconciliation, or replay mechanism is designed here — that
remains TECH-01/TECH-06 territory, referenced only, not extended.

---

## 17. INPUTS FOR EC-03 — DEVICE & CONNECTIVITY

**(CORR-02)** This section replaces the former (v0.1/v0.2) §14 "Inputs for
EC-03," which incorrectly gated all EC-03 activity behind completed site
survey. The corrected model:

```text
CONCEPTUAL EC-03 READINESS ≠ PHYSICAL INSTALLATION READINESS

L1    → conceptual architecture allowed (channel, data class, priority,
         connectivity-requirement definition — all as already produced in §15)
L2/L3 → physical siting / deployment allowed
```

For every `MACHINE` or `BOTH` candidate (16 of 18):

| OBS ID | OC ID | Physical context | Observable condition | Data characteristic | Temporal class | Priority | Latency sensitivity | Loss tolerance | Store-and-forward value | Environment | Power availability | Connectivity environment | Site verification | Conceptual EC-03 readiness | Installation readiness |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| OBS-CAND-001 | OC-001 | Heating entry (location TBD) | Temperature | SCALAR | CONTINUOUS/HIGH-FREQ | P2 | MEDIUM | MEDIUM | HIGH | TBD | TBD | TBD | TBD | READY FOR CONCEPTUAL EC-03 | INSTALLATION NOT READY |
| OBS-CAND-002 | OC-001 | Heating entry (location TBD) | Pressure | SCALAR | CONTINUOUS/HIGH-FREQ | P2 | MEDIUM | MEDIUM | HIGH | TBD | TBD | TBD | TBD | READY FOR CONCEPTUAL EC-03 | INSTALLATION NOT READY |
| OBS-CAND-003 | OC-002 | Heating metering (location TBD) | Flow/consumption | COUNTER | PERIODIC | P4 | LOW | HIGH | HIGH | TBD | TBD | TBD | TBD | READY FOR CONCEPTUAL EC-03 | INSTALLATION NOT READY |
| OBS-CAND-004 | OC-004 | CW entry (location TBD) | Pressure | SCALAR | CONTINUOUS/HIGH-FREQ | P2 | MEDIUM | MEDIUM | HIGH | TBD | TBD | TBD | TBD | READY FOR CONCEPTUAL EC-03 | INSTALLATION NOT READY |
| OBS-CAND-005 | OC-004 | CW entry (location TBD) | Flow | SCALAR | CONTINUOUS/HIGH-FREQ | P2 | MEDIUM | MEDIUM | HIGH | TBD | TBD | TBD | TBD | READY FOR CONCEPTUAL EC-03 | INSTALLATION NOT READY |
| OBS-CAND-006 | OC-005 | CW metering (location TBD) | Flow/consumption | COUNTER | PERIODIC | P4 | LOW | HIGH | HIGH | TBD | TBD | TBD | TBD | READY FOR CONCEPTUAL EC-03 | INSTALLATION NOT READY |
| OBS-CAND-007 | OC-006 | Hot water (location TBD) | Temperature/availability | SCALAR | CONTINUOUS/HIGH-FREQ | P2 | MEDIUM | MEDIUM | HIGH | TBD | TBD | TBD | TBD | READY FOR CONCEPTUAL EC-03 | INSTALLATION NOT READY |
| OBS-CAND-008 | OC-006 | Hot water (location TBD) | Leakage | EVENT/BINARY | EVENT-DRIVEN | P1 | HIGH | LOW | HIGH | TBD | TBD | TBD | TBD | READY FOR CONCEPTUAL EC-03 | INSTALLATION NOT READY |
| OBS-CAND-009 | OC-007 | Basement (zone PARTIAL) | Water/flooding | EVENT | EVENT-DRIVEN | P1 | HIGH | LOW | HIGH | TBD | TBD | TBD | TBD | READY FOR CONCEPTUAL EC-03 | INSTALLATION NOT READY |
| OBS-CAND-010 | OC-007 | Basement (zone PARTIAL) | Temperature | SCALAR | PERIODIC | P3 | LOW | MEDIUM | MEDIUM | TBD | TBD | TBD | TBD | READY FOR CONCEPTUAL EC-03 | INSTALLATION NOT READY |
| OBS-CAND-011 | OC-007 | Basement (zone PARTIAL) | Humidity | SCALAR | PERIODIC | P3 | LOW | MEDIUM | MEDIUM | TBD | TBD | TBD | TBD | READY FOR CONCEPTUAL EC-03 | INSTALLATION NOT READY |
| OBS-CAND-012 | OC-008 | Electrical board (location TBD) | Supply availability | BINARY STATE | EVENT-DRIVEN | P1 | HIGH | LOW | HIGH | TBD | TBD | TBD | TBD | READY FOR CONCEPTUAL EC-03 | INSTALLATION NOT READY |
| OBS-CAND-013 | OC-008 | Electrical board (location TBD) | Outage/event | EVENT | EVENT-DRIVEN | P1 | HIGH | LOW | HIGH | TBD | TBD | TBD | TBD | READY FOR CONCEPTUAL EC-03 | INSTALLATION NOT READY |
| OBS-CAND-015 | OC-010 | Roof (access TBD) | Moisture ingress | EVENT | EVENT-DRIVEN | P2 | MEDIUM | MEDIUM | HIGH | TBD | TBD | TBD | TBD | READY FOR CONCEPTUAL EC-03 | INSTALLATION NOT READY |
| OBS-CAND-017 | OC-011 | Lift, per entrance (location TBD) | Availability | BINARY STATE | EVENT-DRIVEN | P1 | HIGH | LOW | HIGH | TBD | TBD | TBD | TBD | READY FOR CONCEPTUAL EC-03 | INSTALLATION NOT READY |
| OBS-CAND-018 | OC-011 | Lift, per entrance (location TBD) | Outage/event | EVENT | EVENT-DRIVEN | P1 | HIGH | LOW | HIGH | TBD | TBD | TBD | TBD | READY FOR CONCEPTUAL EC-03 | INSTALLATION NOT READY |

No power, RF, or environmental condition is invented in the `Environment` /
`Power availability` / `Connectivity environment` columns — all remain `TBD`
because no site survey has occurred. This is consistent with, not a violation
of, "conceptual EC-03 readiness": conceptual architecture work does not require
these values, only their **presence as declared requirements** for a future
survey to fill in.

`OBS-CAND-014` and `OBS-CAND-016` (`DOCUMENTARY/HUMAN` only) are **not included**
in this table — they imply no device/connectivity requirement and remain fully
addressable through the human/PWA channel already described in BUILDING-01D.

### 17.x — Ontology Gaps — Blocking Status

| Ontology gap | Blocking for conceptual EC-03? | Why |
|---|---|---|
| Hot water (ГВС) has no dedicated BUILDING-01A/B component/OP family | **NON-BLOCKING** | OC-006/OBS-CAND-007/008 are fully describable as system-level candidates without a formal `HEAT-xx`-style ID; the ontology gap affects future BUILDING-01 documentation, not this document's conceptual architecture |
| Sewer has no defined OP in BUILDING-01B v0.1 | **NON-BLOCKING** | OC-009/OBS-CAND-014 proceeds as `DOCUMENTARY/HUMAN` without needing a machine-side OP definition; conceptual EC-03 work for this candidate does not depend on the gap being closed |

Neither gap is resolved here, per instruction; both remain flagged only (as in
§7, unchanged).

---

## 18. A3 CASE EXTRACTION NOTES

**(CORR-02, new)** — definitions only; **no artwork or layout is rendered in
this document.**

```text
FINAL CASE STANDARD
A3 LANDSCAPE
TECHNICAL PUBLICATION
3-COLUMN EDITORIAL GRID FOR NARRATIVE PAGES
```

### A3-EC02-01 — Narrative

Three columns:
- **Column 1:** Physical building → engineering question.
- **Column 2:** Observable condition → Machine/Human/Documentary evidence.
- **Column 3:** Observation → HouseMaster Building State.

Key thesis: *HouseMaster does not start with the sensor. It starts with the
engineering question that requires evidence.*

### A3-EC02-02 — Hero Graph

```text
SEM-MCD-001 → PHYSICAL SYSTEMS → OBSERVABLE CONDITIONS → OBSERVATION POINTS →
MACHINE / HUMAN / DOCUMENTARY → EVIDENCE → HOUSEMASTER → BUILDING STATE
```

### A3-EC02-03 — Master Observability Matrix

Source: §15 (this document) — no new content, direct extraction only.

### A3-EC02-04 — Reference Observation

Shows, for `OBS-CAND-001` (§16): `VERIFIED` / `PROPOSED` / `TBD — SITE SURVEY`
fields, extracted directly from the §16 candidate block.

---

## 19. FINAL REPORT

1. **Output file created:** `EC-02_PHYSICAL_TO_OBSERVATION_SEM-MCD-001_v0.3_REVIEW.md` (v0.1 and v0.2 preserved for audit history)
2. **OC count preserved:** 12 (OC-001…OC-012), IDs and readiness levels unchanged from v0.2
3. **OBS-CAND count:** 18 (OBS-CAND-001…018)
4. **Observable Condition count:** 18, across 10 valid OC targets (OC-003 excluded — L0/NO EVIDENCE; OC-012 not forced into a measurement target)
5. **P1/P2/P3/P4 distribution:** P1: 7 · P2: 6 · P3: 3 · P4: 2
6. **MACHINE/HUMAN/BOTH/DOCUMENTARY distribution:** BOTH: 16 · DOCUMENTARY/HUMAN: 2 · MACHINE-only: 0 · HUMAN-only: 0
7. **Data-characteristic distribution:** SCALAR: 7 · COUNTER: 2 · EVENT: 6 · BINARY STATE: 2 (some rows tagged EVENT/BINARY jointly, counted under EVENT above) · PHOTO/DOCUMENT: 1
8. **Temporal-class distribution:** CONTINUOUS/HIGH-FREQUENCY: 5 · PERIODIC: 4 · EVENT-DRIVEN: 8 · MANUAL/ON-DEMAND: 1
9. **Observability-status distribution:** OBSERVABLE NOW: 8 · OBSERVABLE AFTER FIELD MAPPING: 10
10. **Selected Reference Observation Candidate:** `OBS-CAND-001` — Heating, temperature condition, system-entry level, `HEAT-xx` not instantiated
11. **Why selected:** strongest combination of VERIFIED system existence, physical/engineering clarity, non-specialist legibility, and a clean evidence chain, without inventing any component ID
12. **What remains TBD:** heat-entry component location; metering-interface existence; all other candidates' component/zone locations (per EC-01 TBD-003/004/005 and EC-02 TBD-EC02-01/04)
13. **Machine-capable candidates handed to EC-03:** 16 of 18 (`OBS-CAND-014` and `OBS-CAND-016` remain `DOCUMENTARY/HUMAN` only)
14. **Conceptual EC-03-ready count:** 16 — all currently at L1, marked `READY FOR CONCEPTUAL EC-03`
15. **Installation-ready count:** 0 — all marked `INSTALLATION NOT READY`, since no candidate has reached L2/L3
16. **Ontology gaps + blocking status:** hot water (NON-BLOCKING), sewer OP (NON-BLOCKING) — both flagged in §7 and §17.x, neither resolved
17. **A3 extraction pages defined:** 4 (A3-EC02-01 Narrative, A3-EC02-02 Hero Graph, A3-EC02-03 Master Observability Matrix, A3-EC02-04 Reference Observation) — definitions only, no artwork rendered
18. **Confirmation — unsupported basement inference removed:** yes, §5 now reads evidence-safe wording only (`PARTIAL` / `provenance-gated` / confirmation required), with no building-typology-based confidence increase anywhere in the document
19. **Confirmation — `HEAT-03 = NO EVIDENCE`:** unchanged; OC-003 remains L0 and is excluded from §14's observable-condition list and from all of §15–§17
20. **Confirmation — conceptual EC-03 readiness separated from installation readiness:** yes, applied throughout §14–§17 via the `L1 → conceptual` / `L2/L3 → installation` distinction; the former "once site survey evidence exists" gating language is removed
21. **Confirmation — no sensor/device/SIM/network/protocol selected:** yes — §15.y and §17 explicitly list forbidden technology names and confirm none are used; all connectivity fields are stated as requirements (LOW/MEDIUM/HIGH/TBD), not solutions
22. **Confirmation — EC-03 was NOT started:** yes — this document defines requirements and candidates only; no device, connectivity, or API design decision is made

---

# STOP.

EC-02 v0.3 does not start EC-03. Waiting for separate owner approval before
Gate 4/12.

