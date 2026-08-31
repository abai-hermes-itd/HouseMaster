# EC-01 — REAL MCD BASELINE
### Reference Building Evidence Baseline for Connected Building Architecture
**Reference object:** SEM-MCD-001 — г. Семей, пр. Шакарима, 13 «А»
**Task:** HM-BEELINE-EC-01 (base) + CORR-01 (area-semantics correction) + CORR-02 (owner-approved area taxonomy applied) · Gate 2 of 12 · MODE: SOURCE AUDIT / EVIDENCE BASELINE
**Status:** v0.3 — REVIEW ONLY

---

## 0. CHANGELOG — v0.1 → v0.2 (CORR-01: Area Semantics Correction)

v0.1 registered CONFLICT-002 as a direct numeric conflict between two "total area"
figures (SRC-006: 6,403.80 m² vs SRC-001/002: ≈15,020 m² / 12,710 m²), implicitly
treating both as measurements of the same quantity ("total building area"). That
framing was **not evidence-safe**: neither source states its area methodology
(whether balconies/loggias are included at a discount coefficient, whether
common/technical space is included, whether the figure is a sum of registered
apartment areas or a full gross building area, and whether SRC-006 registers the
whole building or only a defined portion of it under that specific condominium
object number). Presenting the two figures as a like-for-like conflict risked
implying a resolution ("one of them is simply wrong") that the evidence does not
support.

**Correction applied in this revision:**
- §5 (Area/Volume Facts) rewritten to tag each figure with its **documented area
  category** (where stated) instead of a bare "total area" label, and to state
  explicitly which figures are *not known* to be measuring the same thing.
- §14 (Master Fact Table) — BF-010/BF-011 statuses and notes revised to reflect
  definitional ambiguity rather than asserting a resolved numeric contradiction.
- §15 (Conflict Register) — CONFLICT-002 re-scoped from "numeric area conflict" to
  "**area-definition ambiguity, unconfirmed whether directly comparable**"; a new
  CONFLICT-002B is *not* created — this remains one conflict entry, corrected in
  place, per the no-silent-resolution rule (the underlying uncertainty is not
  resolved, only the previous mischaracterization of it is fixed).
- §16 (TBD Register) — new TBD-010 added: obtain/confirm the area-methodology
  definitions (МОП inclusion, balcony/loggia coefficient, gross vs net, partial vs
  whole-building registration) before either figure family is used for any
  engineering or 3D purpose.
- §17 (Confidence Summary) and §19 (Final Report) wording adjusted to match.
- No other section of v0.1 is modified. No fact status elsewhere in the document is
  changed by this correction.

---

## 0b. CHANGELOG — v0.2 → v0.3 (CORR-02: Apply Owner-Approved Area Taxonomy)

This revision applies an **owner-approved project-baseline area taxonomy**, supplied
directly by the project owner (task HM-BEELINE-EC-01-CORR-02). Per instruction, this
taxonomy is applied **exactly as given, without new source interpretation, without
challenge, and without reopening it.**

**Canonical taxonomy applied:**

1. **1,248 m² = Total Useful Building Area** (общая полезная площадь здания)
2. **550 m² = Common / Shared Building Area** (общедомовая площадь) — entrances,
   stair landings, stair flights, lift shafts, technical rooms, basement
3. **6,403.80 m² and ≈15,020 m² = different cadastral area categories** — building
   area vs. adjacent/associated territory — not competing measurements of the same
   parameter

**Consequences applied in this revision:**
- The former **CONFLICT-001 / GAP-001** ("1,248 m² vs 550 m² footprint dispute") is
  **RESOLVED — DIFFERENT SEMANTIC AREA CATEGORIES.** Neither figure is a footprint
  value; both describe building-area sub-categories, not site coverage. All
  "footprint dispute" / "competing measurement" language tied to this pair is
  removed. **The building's exact footprint (site-coverage) geometry remains
  independently unknown** — this is a *geometry* gap (TBD-001), not an *area
  semantics* gap, and is explicitly preserved as TBD per instruction §E.
- The former **CONFLICT-002** ("6,403.80 m² vs ≈15,020 m² total-area conflict",
  itself reframed once already under CORR-01) is **RESOLVED — DIFFERENT CADASTRAL
  AREA CATEGORIES.** SRC-006's family (6,403.80 m² / 5,640.00 m²) is treated as the
  **building area** cadastral category; SRC-001/002's family (≈15,020 m² / 12,710 m²
  / 7,270 m²) is treated as the **adjacent/associated territory** cadastral category,
  applying the owner-approved taxonomy consistently across the full figure sets from
  each source rather than only the two headline numbers.
- §1, §4, §5, §10, §11, §12, §14 (BF-008, BF-010–013), §15, §16 (TBD-002, TBD-010),
  §17, §19 updated accordingly. Sections §2, §3, §6, §7, §8, §9, §13, §18 are
  **unchanged** — including 9 floors = VERIFIED, the stepped/non-rectangular
  footprint *shape* evidence (Image 3, BF-009), engineering-system existence
  findings, HEAT-03 = NO EVIDENCE, the 81-vs-78 apartment-count dispute
  (CONFLICT-005, still OPEN), and CONFLICT-004 (still OPEN).
- No new source interpretation, web research, area calculation, or geometric
  inference was performed. No engineering component was invented. EC-02 was not
  started.

---

## 1. EXECUTIVE EVIDENCE SUMMARY

This document audits every source file made available in this session (project files,
uploaded images of the archival BTI дело №209, uploaded PDFs of the TECH/BUILDING-01
series, and the "Цифровая метрика" public-data document) and separates what is
**officially documented**, what is **derived**, what is **assumed**, and what remains
**unknown** about SEM-MCD-001.

This session's evidence base contains several area figures for the building that,
in earlier revisions of this document, were mischaracterized as competing
measurements. **(Resolved in v0.3, CORR-02, per owner-approved area taxonomy):**
1,248 m² and 550 m² are **different building-area sub-categories** (total useful
area vs. common/shared area), not a footprint dispute; 6,403.80 m² and ≈15,020 m²
are **different cadastral area categories** (building area vs. adjacent/associated
territory), not competing totals. Neither pairing is treated as an open conflict in
this revision — see §5 and §0b for the applied taxonomy, and §15 for the resolved
conflict-register entries. **The building's exact footprint (site-coverage)
geometry is a separate, still-unresolved question** (TBD-001) — resolving the area
taxonomy does not establish exact footprint coordinates, dimensions, or facade/
basement geometry.

A third, lower-confidence source (public directories: 2GIS/Yandex/BizGid) describes a
building with a different construction period and storey count and is logged as a
low-reliability outlier (**CONFLICT-003**), not used for any fact.

---

## 2. SOURCE REGISTRY

| Source ID | File / Document | Type | Authority | Date | Content | Reliability | Notes |
|---|---|---|---|---|---|---|---|
| SRC-001 | `ТЕХНИЧЕСКИЙ ПАСПОРТ.docx` | Compiled/secondary text document | Self-described as "actualized version based on inventory case №209, Form 03, cover, original floor plans + 2006 letter" | undated (project session) | Full building parameters, wear tables, floor plans, apartment schedule | **SECONDARY / DERIVED** — not itself a scan of an original document; treat every field as a claim requiring corroboration, not as a primary fact | Ends with an offer to "prepare a clean BTI form / DWG / Revit model" — confirms this is an AI/human-authored reconstruction, not the archival original |
| SRC-002 | `ЦИФРОВОЙ ТЕХНИЧЕСКИЙ ПАСПОРТ.docx` | Compiled/secondary text document | Same status as SRC-001 | "актуален на декабрь 2025" | Same parameters, restated; adds resident count estimate, KSK chairman name | **SECONDARY / DERIVED / PARTIAL ESTIMATE** | Resident count explicitly "примерно"; chairman name flagged "уточнять" in its own text |
| SRC-003 | `#поэтажные планы и экспликации помещений .docx` | Compiled/secondary table | "На основании предоставленных фото поэтажного плана... и обложки дела №209" | undated | Room-by-room floor schedules, apartment areas | **SECONDARY / DERIVED** from photos — the photos themselves are SRC-004, not this table | Internally flags its own 81 vs 78 apartment-count discrepancy |
| SRC-004 | Images 3, 5, 6, 7, 9, 10–17, 20, 21 (uploaded photographs) | Photographs of archival technical-passport pages, дело №209 | **PRIMARY / OFFICIAL** (physical BTI case file) | Handwritten dates visible, era consistent with Soviet/early-post-Soviet BTI forms | Case cover ("ДЕЛО № 209"), footprint schematic, floor plans (multiple floors), a systems checklist ("Технические сведения о благоустройстве"), area/volume calculation sheets | **PRIMARY but PARTIALLY ILLEGIBLE** — many handwritten figures cannot be read with confidence at the supplied resolution | Highest-authority source available in this session; used wherever legible |
| SRC-005 | Images 1, 2 (uploaded photographs) | Official letter, Отдел архитектуры и градостроительства г. Семипалатинска | **PRIMARY / OFFICIAL** | № 02-454, 08.09.2006 | Land-boundary project (ситуационная схема) for the 9-storey building №13, addressed to Председателю КСК «Шакарима, 13» Амреновой Ж.М.; states 4,676.25 m² common-use land + 124.8 m² gas-tank plot | **PRIMARY / OFFICIAL** | Reference number/date **do not match** the "Исх. № 02-457 от 07.08.2006" cited in SRC-001/SRC-002 — logged as CONFLICT-004 |
| SRC-006 | Images 8, 19 (uploaded photographs) | Свидетельство о государственной регистрации объекта кондоминиума № 2004/1/2426 (Kazakh + Russian copies) | **PRIMARY / OFFICIAL** (RGP "Центр по недвижимости", ВКО, МЮ РК) | Issued 22/11/2004, based on собрание протокол 27/03/2004 | Cadastral number, floor count, total area, useful residential area, owner-shares field | **PRIMARY / OFFICIAL** | Two independent scans (KZ + RU) show identical numbers — internally consistent, high confidence for the fields it actually contains |
| SRC-007 | "Цифровая метрика МКД..." (uploaded PDF, this turn) | Public-aggregator compilation | Explicitly self-described as based on BizGid.kz, Yandex.Maps, 2GIS, КСК registry, **not** BTI | "на ноябрь 2025" | Alternative building description for "1А/13А" | **LEVEL 3 / SECONDARY, LOW RELIABILITY** | Describes a 5-storey 1985–1990 building at "1А" and a 9-storey 2005–2010 building at "13А" — conflicts with every primary source on year built and (for 1А) storey count; document itself flags address ambiguity |
| SRC-008 | `REAL_MCD_SOURCE_REGISTER_3D-S0_v0.2.xlsx` | Project register | Internal | — | — | **NOT READABLE THIS SESSION** — file returned no extractable content | Cannot be used to cross-check; treat prior 3D-S0 register as referenced only via SRC-009 |
| SRC-009 | `HOUSEMASTER_BEELINE_PROJECT_KNOWLEDGE_SUMMARY.md` | Project continuity summary | Internal / prior-session digest | — | Restates SEM-MCD-001 identity, GAP-001 (prior name), S0-GATE status | **TERTIARY — project memory, not building evidence** | Used only to confirm project continuity; GAP-001 is superseded in this document by CONFLICT-001, now RESOLVED per CORR-02 — see §0b |
| SRC-010 | Image 20 (uploaded photograph) | Archival passport worksheet, area breakdown | **PRIMARY / OFFICIAL** | — | "Изготовление жилого фонда" table, handwritten totals (4000, 17145, 17145, 1385, 1490…) | **PRIMARY but LOW LEGIBILITY / UNMAPPED** | Numbers cannot be confidently attributed to a named quantity from the image alone — logged as TBD, not used in the fact table |
| SRC-011 | Image 9 (uploaded photograph) | Archival area/volume calculation sheet | **PRIMARY / OFFICIAL** | — | Multiple handwritten area/volume formulas (e.g. "…=8033 m²", "…=4536 m²", floor-area sums ≈950.2 m² per floor, ≈2259 m² for 2 floors, volume figures) | **PRIMARY but interpretation UNCERTAIN** | A 1,248 m²-family figure appears independently in the underlying arithmetic; not independently re-interpreted in this revision — **(CORR-02)** the 1,248 m² value itself is now categorized per the owner-approved taxonomy as Total Useful Building Area (§0b/§5), not footprint |

**Reliability legend used above:** PRIMARY/OFFICIAL (Level 1) · SECONDARY/DERIVED (Level 3–4, compiled from Level 1 by a prior session) · LOW RELIABILITY (Level 3, public aggregator).

---

## 3. BUILDING IDENTITY CARD

| Field | Value | Source | Status |
|---|---|---|---|
| HouseMaster reference ID | `SEM-MCD-001` | project convention (SRC-009) | ASSIGNED (internal ID, not a BTI fact) |
| Current address | г. Семей, пр. Шакарима, 13 «А» | SRC-005, SRC-006, SRC-001/002 | **VERIFIED** (independently confirmed by two primary sources) |
| Historical address | пр. Комсомола (Семипалатинск), 13 «А» | SRC-001/002 only | **PARTIAL** — not seen in any primary image reviewed this session |
| City / Region | г. Семей, Абайская обл. (ранее ВКО) | SRC-005, SRC-006 | **VERIFIED** |
| Cadastral number | 05.252.025.162/543:13а | SRC-006 (both language copies) | **VERIFIED** |
| Inventory № | 23161 | SRC-001/002 only | **PARTIAL** — claimed by secondary compilation, not independently legible in the primary cover image (SRC-004/Image 10) |
| BTI case ("дело") № | 209 | SRC-004, Image 10 ("ДЕЛО № 209") | **VERIFIED** — directly legible on the case-folder cover |
| Year built | 1978 | SRC-001/002 only | **PARTIAL** — plausible, consistent with case-file era, but not independently confirmed by a legible primary field this session |
| Floors (residential) | 9 | SRC-006 ("Этаж-Этажность 9") | **VERIFIED** |
| Technical basement / подполье | Present | SRC-001/002 only | **PARTIAL** |
| Entrances (подъезды) | 3 | SRC-001/002; DERIVED support from repeated 3-staircase pattern visible across multiple floor-plan photos (SRC-004) | **DERIVED** |
| Apartment count | 81 (27×1-к / 27×2-к / 27×3-к) | SRC-001/002/003 | **PARTIAL / INTERNALLY DISPUTED** — SRC-003 itself notes an alternate count of 78; SRC-006's "78/78" shares field is a different quantity (ownership shares, not apartments) but the numeric coincidence with the "78" alternate count is flagged, not resolved — see CONFLICT-005 |
| Condominium object / registration № | 2004/1/2426 | SRC-006 | **VERIFIED** |
| KSK / management | КСК «Шакарима, 13» | SRC-005, SRC-001/002 | **VERIFIED** (KSK name appears on the 2006 official letter) |
| Registered owner-share holder named in condominium certificate | Амренова Жибек Мухтарбаевна, 04/07/1947 г.р. | SRC-006 | **VERIFIED** (as the person named on the registration certificate — role/capacity not further interpreted here) |

---

## 4. GEOMETRY & SPATIAL BASELINE

| Parameter | Value | Source | Status |
|---|---|---|---|
| Overall footprint (site-coverage area) | **NOT ESTABLISHED — TBD (TBD-001)** | — | **TBD** — **(CORR-02)** 1,248 m² and 550 m², previously discussed here as candidate footprint values, are **not footprint figures** under the owner-approved area taxonomy (§0b, §5): 1,248 m² = total useful building area, 550 m² = common/shared building area. Neither may be used as, or back-calculated into, a footprint/site-coverage value. The building's actual footprint area remains unknown pending an original dimensioned site plan or field survey. |
| Footprint shape | **Non-rectangular, stepped/staggered outline** along the long facade | SRC-004, Image 3 ("Схематический план") — directly legible stepped polygon with dimension callouts (14.30, 7.10, 4.10, 4.44, etc.) | **VERIFIED (shape), PARTIAL (full dimension set)** — several dimension labels are legible, others are not; this is a **significant new geometric fact** not previously captured in the project's BUILDING-HYP-v0.2 long-facade/constant-depth assumption and should be flagged to the 3D track (see §11) |
| Sections | 3 | derived from apartment/entrance structure above | **DERIVED** |
| Floors above ground | 9 | SRC-006 | **VERIFIED** |
| Floor-to-floor height | 3.00 m (implied) | SRC-001/002 only | **PARTIAL** |
| Residential clear height | 2.80 m | SRC-001/002 only | **PARTIAL** |
| Roof geometry | Flat, rolled roofing, internal drainage | SRC-001/002; partially corroborated by "Кровля" row present in SRC-004/Image 5 systems checklist | **PARTIAL** (existence of a roof-type field is primary; the specific "flat/rolled/internal-drainage" description is secondary) |
| Stair/lift cores | Multiple per floor plate (2–3 visible per photographed sheet) | SRC-004 (Images 7, 11–17, 21) | **VERIFIED (existence/count of cores per sheet), TBD (exact core count/position per full building)** |
| Orientation | Not established | — | **TBD** |
| Plot relationship | Total plot 4,676.25 m² (SRC-005). SRC-005's own text associates 1,248 m² with "building + отмостка" within that plot; under the owner-approved taxonomy (§0b) 1,248 m² is separately defined as total useful building area, not a site-coverage figure — this apparent double role of the 1,248 m² figure is noted but not adjudicated here | SRC-005 | **VERIFIED for the plot total (4,676.25 m²)**; the 1,248 m² figure's relationship to actual site coverage is **TBD (TBD-001)**, per the owner-approved taxonomy |

---

## 5. AREA / VOLUME FACTS

**(CORR-02)** This section applies the **owner-approved project-baseline area
taxonomy** exactly as supplied (task HM-BEELINE-EC-01-CORR-02). The taxonomy is
treated as a settled project decision, not as a new source interpretation — it is
not re-derived, re-checked against the archival images, or challenged here.

### 5.0 — Owner-approved area taxonomy (applied, not re-derived)

| Value | Owner-approved category | Definition (as supplied) |
|---|---|---|
| **1,248 m²** | **Total Useful Building Area** (общая полезная площадь здания) | — |
| **550 m²** | **Common / Shared Building Area** (общедомовая площадь) | Entrances, stair landings, stair flights, lift shafts, technical rooms, basement |
| **6,403.80 m²** (and, by consistent extension, its component 5,640.00 m²) | **Building Area** (cadastral category) | Per SRC-006, the condominium-registration certificate |
| **≈15,020.0 m²** (and, by consistent extension, its components 12,710.0 m² / 7,270.0 m² / ≈2,310.0 m²) | **Adjacent / Associated Territory** (cadastral category) | Per SRC-001/002, the compiled passport |

These four categories are **not four measurements of one parameter** — they are
four distinct semantic categories. No pair among them is treated as a conflict in
this revision merely because the numeric values differ.

**Explicitly separate from the above:** the total registered land plot, 4,676.25 m²
(SRC-005, §4/BF-023), is a distinct, already-VERIFIED figure and is not part of this
taxonomy exercise.

### 5.1 — SRC-006 family (Building Area cadastral category)

| Value | Unit | Field label (as stated in source) | Owner-approved category | Source | Status |
|---|---|---|---|---|---|
| 6,403.80 | m² | "Площадь общая" | Building Area (cadastral) | SRC-006 | **VERIFIED (figure)**, category per owner-approved taxonomy |
| 5,640.00 | m² | "Площадь жилая, полезная" | Building Area (cadastral), residential component | SRC-006 | **VERIFIED (figure)**, category per owner-approved taxonomy |
| 78/78 | — | "Доли (участвующих)" | Not an area fact | SRC-006 | **VERIFIED (field value)**; meaning (ownership shares vs. apartment count) not confirmed — unrelated to the area taxonomy |

### 5.2 — SRC-001/002 family (Adjacent/Associated Territory cadastral category)

| Value | Unit | Field label (as stated in source) | Owner-approved category | Source | Status |
|---|---|---|---|---|---|
| 12,710.0 | m² | "Общая площадь всех квартир" | Adjacent/Associated Territory (cadastral), sub-component | SRC-001/002 | **PARTIAL / DERIVED** |
| 7,270.0 | m² | "Жилая площадь" | Adjacent/Associated Territory (cadastral), sub-component | SRC-001/002 | **PARTIAL** |
| ≈2,310.0 | m² | "Площадь МОП" | Adjacent/Associated Territory (cadastral), sub-component | SRC-001/002 | **PARTIAL** |
| ≈15,020.0 | m² | "Общая площадь здания" | Adjacent/Associated Territory (cadastral) | SRC-001/002 | **PARTIAL** |
| 15,120 | m³ | "Строительный объём" | Volume — outside this area taxonomy | SRC-001/002 | **PARTIAL** — text itself shows this as a back-calculation ("550 м² × 27.5 м"); note this back-calculation used the 550 m² common/shared-area figure algebraically, which this taxonomy does not treat as a footprint value — the volume figure's own derivation is therefore also of uncertain basis, but is not itself re-opened as a conflict here |

### 5.3 — Application note

Per the owner-approved taxonomy, §5.1 and §5.2 describe **different cadastral
categories** and are not merged, compared, or treated as competing. No figure in
this section is used to derive, confirm, or imply an exact footprint (site-coverage)
value — that remains a separate, open geometry question (TBD-001, §4, §12).

---

## 6. CONSTRUCTION BASELINE

| Element | Value | Source | Status |
|---|---|---|---|
| Wall material | Кирпич глиняный красный; наружные 640 мм; внутренние несущие 510/380 мм | SRC-001/002 | **PARTIAL** — plausible for the era, not independently confirmed by a legible primary field |
| Foundation | Ленточный сборный ж/б + бутобетон | SRC-001/002 | **PARTIAL** |
| Floor slabs | Сборные ж/б многопустотные плиты | SRC-001/002; existence of a "Перекрытия" field on SRC-004/Image 5 checklist | **PARTIAL** |
| Roof | Плоская, рулонная, внутренний водосток | SRC-001/002; "Кровля" field present in SRC-004/Image 5 | **PARTIAL** |
| Lifts | 3, one per entrance | SRC-001/002; "Лифты" row present with a mark in SRC-004/Image 5 checklist | **EXISTENCE VERIFIED** (a lift system exists), **count PARTIAL** |
| Garbage chutes | 3, one per entrance | SRC-001/002; "Мусоропровод" row present with a mark in SRC-004/Image 5 | **EXISTENCE VERIFIED**, count PARTIAL |
| Gas supply | Absent (electric kitchens) | SRC-001/002 | **TBD** — the SRC-004/Image 5 checklist has rows for "с газ. колонкой" / "с дров. колонкой" whose marks could not be read with confidence this session |
| Windows | Original wood, largely replaced with PVC | SRC-001/002 | **ASSUMED/PARTIAL** — plausible narrative, not a documented fact |

---

## 7. ENGINEERING SYSTEMS EVIDENCE

For each system, existence / topology / component-location are kept strictly separate
per the task's instruction.

| System | Existence | Topology | Component location |
|---|---|---|---|
| Отопление (Heating) | **VERIFIED** — marked row on SRC-004/Image 5 checklist; corroborated by SRC-001/002 | TBD | TBD |
| ХВС (Cold water) | **VERIFIED** — marked row, SRC-004/Image 5 | TBD | TBD |
| ГВС (Hot water) | **VERIFIED** — marked row, SRC-004/Image 5 ("Горячее водоснабжение") | TBD | TBD |
| Канализация (Sewer) | **VERIFIED** — marked row, SRC-004/Image 5 | TBD | TBD |
| Электроснабжение (Power) | **VERIFIED** — marked row, SRC-004/Image 5 | TBD | TBD |
| Вентиляция (Ventilation) | Row present on checklist ("Вентиляция"); mark legibility uncertain | **TBD** | TBD |
| Лифты (Lifts) | **VERIFIED** (see §6) | TBD | TBD |
| Газоснабжение (Gas) | **TBD** — checklist rows present, mark uncertain; secondary docs claim absent | TBD | TBD |
| Кровельный водосток (Roof drainage) | **PARTIAL** — "internal drainage" claimed only by SRC-001/002 | TBD | TBD |

No component-level location (entry point, metering node, mixing node, distribution
manifold) is confirmed for any system in this session's material.

---

## 8. SPATIAL ZONES (HouseMaster mapping — physical baseline only)

```
BUILDING (SEM-MCD-001)
├── ROOF                     — existence: PARTIAL (roof-type field only in secondary docs)
├── RESIDENTIAL FLOORS (1–9) — existence: VERIFIED (9 floors, SRC-006); layouts: PARTIAL (photographed but partly illegible)
├── ENTRANCES / SECTIONS (3) — DERIVED
├── BASEMENT / ТЕХПОДПОЛЬЕ    — existence: PARTIAL (secondary docs only)
├── TECHNICAL ROOMS           — TBD (none individually located)
└── EXTERNAL CONNECTION ZONES — TBD
```

No sensors, observation points, or Beeline connectivity are populated at this
baseline layer, per instruction §11.

---

## 9. HOUSEMASTER SEMANTIC MAPPING

| Physical fact | HM semantic candidate | Evidence status | Can instantiate? |
|---|---|---|---|
| Heating system documented | SYSTEM: HEATING | VERIFIED (existence) | Partial — system object yes, components no |
| Cold water system documented | SYSTEM: COLD WATER | VERIFIED (existence) | Partial |
| Hot water system documented | SYSTEM: HOT WATER | VERIFIED (existence) | Partial |
| Sewer system documented | SYSTEM: SEWER | VERIFIED (existence) | Partial |
| Power system documented | SYSTEM: ELECTRICAL | VERIFIED (existence) | Partial |
| Lift system documented | SYSTEM: LIFTS | VERIFIED (existence) | Partial |
| Garbage chute documented | COMPONENT candidate | VERIFIED (existence) | Partial |
| Heat entry node location | COMPONENT candidate: `HEAT-01` | TBD | **NO** |
| Heating mixing/elevator node | COMPONENT candidate: `HEAT-03` | NO EVIDENCE (see §13) | **NO** |
| Cold water entry | COMPONENT candidate: `CWS-01` | TBD | **NO** |
| Building footprint polygon | Massing constraint | PARTIAL (shape verified, full dimensions not) | Partial — usable as DERIVED constraint only |
| 9-storey residential stack | FLOOR × 9 | VERIFIED | Yes |
| 3 entrance cores | SECTION × 3 | DERIVED | Yes, as DERIVED |

---

## 10. CONNECTIVITY RELEVANCE MATRIX

| Building fact | Why it matters to Beeline/IoT | Confirmed? | Required before pilot? |
|---|---|---|---|
| Technical basement presence | Likely EDGE-01/gateway or basement-sensor location | PARTIAL | Yes |
| Basement wall/depth | Radio propagation context for basement devices | TBD | Yes |
| 3 separate entrance cores | Possible per-entrance riser/meter separation → possible per-entrance connectivity nodes | DERIVED | Yes |
| Electrical entry / board location | Possible power source for EDGE gateway | TBD | Yes |
| Roof access | Possible roof-sensor / antenna siting | TBD | No (not required before pilot, but useful) |
| Building footprint / massing | General site context for RF planning | **TBD (TBD-001)** — **(CORR-02)** no longer framed as an area conflict; simply an unresolved geometry fact | Not required before pilot, but blocks precise siting diagrams |
| Number of lift/garbage-chute risers | Possible vertical routing for device cabling | PARTIAL | No |

No RF coverage evaluation is performed here; that remains explicitly
`TBD WITH BEELINE / SITE SURVEY` per TECH-01…07.

---

## 11. SITE SURVEY DATA GAP LIST

**Physical:** exact entrance layout and numbering vs. the documented "3 подъезда";
basement access point(s); technical-room locations; roof access; verification of the
stepped footprint outline (Image 3) against as-built conditions.

**Engineering:** heat entry and metering-node location; water entry/meter location;
electrical main board location; sewer collector/outlet location; confirmation of gas
presence/absence.

**Device deployment:** mounting positions, available power, environmental
conditions, access restrictions — none currently known.

**Connectivity:** cellular signal conditions, basement/technical-room penetration,
candidate EDGE-01 location, direct-cellular feasibility — all `TBD WITH BEELINE /
SITE SURVEY`.

**Documentation:** a legible cover-page confirmation of inventory № 23161 and year
built 1978; an original dimensioned site/footprint plan or field survey to establish
actual site-coverage geometry (TBD-001) — **(CORR-02)** the area-taxonomy
reconciliation previously requested here (former §5.1 vs §5.2, former GAP-001) is
resolved per the owner-approved taxonomy in §0b/§5 and is no longer a documentation
gap.

---

## 12. 3D USABILITY MATRIX

| Fact | Direct use in Blender? | Use as constraint? | Needs field confirmation? | Do not model |
|---|---|---|---|---|
| 9 floors | Yes | — | No | — |
| Stepped (non-rectangular) footprint outline, Image 3 | No (dimensions incomplete) | **Yes — DERIVED constraint on massing shape**, supersedes a simple-rectangle assumption | Yes, before final massing | — |
| Footprint area (site-coverage) | No — not established | No — **(CORR-02)** 1,248 m² and 550 m² are building-area sub-categories (useful / common-shared), not footprint values, per owner-approved taxonomy; do not back-calculate a footprint from either figure or from the 6,403.80 m² / ≈15,020 m² cadastral-category figures | Yes — requires a dimensioned plan or field survey | Do not model any area-derived footprint |
| 3 entrance/staircase cores | No exact coordinates | Yes, as section-count constraint | Yes (exact spacing) | — |
| Floor plan room layout (SRC-004 photographed sheets) | Partially — legible portions may be digitized as a DERIVED reference for one representative floor | Yes | Yes, for illegible dimensions | — |
| Roof/basement | No | No | Yes | Do not invent |
| Engineering rooms/risers | No | No | Yes | **Do not invent** — no location evidence exists |

Principle honored: unknown engineering geometry remains unknown in 3D. This EC-01
does not create or modify any 3D geometry.

---

## 13. REFERENCE COMPONENT CANDIDATE — `HEAT-03`

**Question:** Can a real `HEAT-03` (or equivalent heating mixing/elevator node) be
identified in SEM-MCD-001 from primary evidence reviewed this session?

**Answer: NO EVIDENCE.**

The only primary evidence touching heating is the marked "Отопление" (Центральное
отопление) row on the SRC-004/Image 5 systems checklist, which confirms the
**existence** of a central heating connection only. No basement plan, no mixing-node
location, and no riser topology were legible in any reviewed source. `HEAT-03` and
all other `HEAT-xx` component IDs from BUILDING-01A remain unassigned ontology
candidates, not instantiated facts, per §13 of the task instructions.

No alternative, more clearly documented component candidate was identified either.

---

## 14. MASTER FACT TABLE

| Fact ID | Category | Parameter | Value | Unit | Source ID | Status | Eng. relevance | 3D usable | Pilot usable | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| BF-001 | Identity | Current address | пр. Шакарима, 13А, Семей | — | SRC-005, SRC-006 | VERIFIED | Low | No | Yes | — |
| BF-002 | Identity | Cadastral № | 05.252.025.162/543:13а | — | SRC-006 | VERIFIED | Low | No | Yes | — |
| BF-003 | Identity | BTI case № | 209 | — | SRC-004 (Image 10) | VERIFIED | Low | No | Yes | Legible on cover |
| BF-004 | Identity | Inventory № | 23161 | — | SRC-001/002 | PARTIAL | Low | No | Yes | Not independently confirmed |
| BF-005 | Identity | Year built | 1978 | — | SRC-001/002 | PARTIAL | Medium | No | No | Affects wear/lifecycle assumptions |
| BF-006 | Geometry | Floors | 9 | floors | SRC-006 | VERIFIED | High | Yes | Yes | — |
| BF-007 | Geometry | Entrances | 3 | — | SRC-001/002 + DERIVED (SRC-004) | DERIVED | High | Yes | Yes | — |
| BF-008 | Geometry | Footprint (site-coverage) area | **not established** | m² | — | **TBD (TBD-001)** | Critical | No | No | **(CORR-02)** 1,248 m² and 550 m² are no longer represented as footprint values or as a conflict — see §0b/§5. Footprint remains an open geometry question |
| BF-009 | Geometry | Footprint shape | stepped/non-rectangular | — | SRC-004 (Image 3) | PARTIAL | Critical | Yes (as constraint) | No | New finding this session; unchanged by CORR-02 |
| BF-010 | Area | "Площадь общая" — Building Area (cadastral category) | 6,403.80 | m² | SRC-006 | VERIFIED (figure), category per owner-approved taxonomy | Medium | No | Yes | **(CORR-02)** resolved — not compared to BF-011, different cadastral category |
| BF-011 | Area | "Общая площадь здания" — Adjacent/Associated Territory (cadastral category) | ≈15,020.0 | m² | SRC-001/002 | PARTIAL, category per owner-approved taxonomy | Medium | No | No | **(CORR-02)** resolved — not compared to BF-010, different cadastral category |
| BF-012 | Area | "Площадь жилая, полезная" — Building Area, residential component | 5,640.00 | m² | SRC-006 | VERIFIED (figure), category per owner-approved taxonomy | Low | No | Yes | **(CORR-02)** resolved — no longer compared to BF-013 |
| BF-013 | Area | "Жилая площадь" — Adjacent/Associated Territory, residential sub-component | 7,270.0 | m² | SRC-001/002 | PARTIAL, category per owner-approved taxonomy | Low | No | No | **(CORR-02)** resolved — no longer compared to BF-012 |
| BF-026 | Area | "Total Useful Building Area" (owner-approved taxonomy) | 1,248 | m² | Owner-approved baseline (CORR-02) | **ASSIGNED (taxonomy decision, not independently re-derived from source imagery)** | Low | No | No | Not a footprint value — see §0b |
| BF-027 | Area | "Common / Shared Building Area" (owner-approved taxonomy) | 550 | m² | Owner-approved baseline (CORR-02) | **ASSIGNED (taxonomy decision, not independently re-derived from source imagery)** | Low | No | No | Includes entrances, stair landings/flights, lift shafts, technical rooms, basement; not a footprint value — see §0b |
| BF-014 | Identity | Apartment count | 81 (or 78, disputed) | units | SRC-001/002/003 | **PARTIAL / DISPUTED** | Medium | No | No | See CONFLICT-005 |
| BF-015 | Systems | Central heating | present | — | SRC-004 (Image 5) | VERIFIED (existence only) | High | No | Yes | Topology TBD |
| BF-016 | Systems | Cold water | present | — | SRC-004 (Image 5) | VERIFIED (existence only) | High | No | Yes | Topology TBD |
| BF-017 | Systems | Hot water | present | — | SRC-004 (Image 5) | VERIFIED (existence only) | High | No | Yes | Topology TBD |
| BF-018 | Systems | Sewer | present | — | SRC-004 (Image 5) | VERIFIED (existence only) | High | No | Yes | Topology TBD |
| BF-019 | Systems | Electrical | present | — | SRC-004 (Image 5) | VERIFIED (existence only) | High | No | Yes | Topology TBD |
| BF-020 | Systems | Lifts | 3 (one/entrance) | units | SRC-001/002; existence via SRC-004 | PARTIAL (count), VERIFIED (existence) | Medium | No | Yes | — |
| BF-021 | Systems | Garbage chutes | 3 (one/entrance) | units | SRC-001/002; existence via SRC-004 | PARTIAL (count), VERIFIED (existence) | Low | No | No | — |
| BF-022 | Systems | Gas supply | absent (claimed) | — | SRC-001/002 | **TBD** | Low | No | No | Checklist mark illegible |
| BF-023 | Legal | Land plot total | 4,676.25 | m² | SRC-005 | VERIFIED | Low | No | No | — |
| BF-024 | Legal | Land-letter figure associated with "building + отмостка" | 1,248 | m² | SRC-005 | VERIFIED (as a land-letter figure) | Medium | No | No | **(CORR-02)** per owner-approved taxonomy this numeric value corresponds to the "Total Useful Building Area" category (BF-026), not a footprint/site-coverage figure; no longer linked to BF-008 as a conflict |
| BF-025 | Legal | Condominium registration № | 2004/1/2426 | — | SRC-006 | VERIFIED | Low | No | No | — |

---

## 15. CONFLICT REGISTER

| Conflict ID | Fact | Source A | Source B | Difference | Impact | Current status | Resolution method |
|---|---|---|---|---|---|---|---|
| CONFLICT-001 (= former GAP-001) | Building area figures 1,248 m² / 550 m² — **formerly mischaracterized as a footprint dispute** | SRC-005 (land letter): 1,248 m² | SRC-001/002 (compiled passport): 550 m² | — | None — not a footprint parameter | **RESOLVED — DIFFERENT SEMANTIC AREA CATEGORIES** (CORR-02, owner-approved taxonomy: 1,248 m² = Total Useful Building Area; 550 m² = Common/Shared Building Area). **Note:** the building's actual footprint/site-coverage geometry remains separately unestablished — tracked as TBD-001, not as a conflict | Closed by owner-approved taxonomy; no further resolution action required for the area semantics. Footprint geometry itself: original BTI plan / site plan / dimensioned drawing / field measurement (TBD-001) |
| CONFLICT-002 | Building area figures 6,403.80 m² / ≈15,020 m² — **formerly framed as an area-definition ambiguity (CORR-01)** | SRC-006 (registration certificate): "Площадь общая" 6,403.80 m²; "Площадь жилая, полезная" 5,640.00 m² | SRC-001/002 (compiled passport): "Общая площадь здания" ≈15,020 m²; "Жилая площадь" 7,270 m² | — | None — not competing measurements | **RESOLVED — DIFFERENT CADASTRAL AREA CATEGORIES** (CORR-02, owner-approved taxonomy: SRC-006 family = Building Area cadastral category; SRC-001/002 family = Adjacent/Associated Territory cadastral category) | Closed by owner-approved taxonomy; no further resolution action required |
| CONFLICT-003 | Building description (year built, storeys) | SRC-004/SRC-005/SRC-006 (primary): 1978, 9 storeys | SRC-007 (public aggregator): "1А" 5-storey 1985–1990 / "13А" 9-storey 2005–2010 | Fully inconsistent | Low — SRC-007 is explicitly low-reliability and self-flags address ambiguity | **CLOSED for this baseline** — SRC-007 excluded from the fact table as non-authoritative | None required; retain as a logged outlier only |
| CONFLICT-004 | Land-act letter reference | SRC-001/002 text: "Исх. № 02-457 от 07.08.2006" | SRC-005 (actual photographed letter): № 02-454, 08.09.2006 | Different № and date | Medium — suggests SRC-001/002 paraphrased or misquoted the primary letter rather than transcribing it | **OPEN** | Re-check SRC-001/002 authorship against the actual letter image; treat SRC-001/002 legal citations as unverified until corrected |
| CONFLICT-005 | Apartment count | SRC-001/002/003: 81 (27/27/27) | SRC-003 (internal note) and SRC-006 "78/78" shares field: 78 | 3-unit difference | Medium — affects per-unit area assumptions | **OPEN** | Confirm against original экспликация or field count; note "78/78" may be an unrelated ownership-shares field, not an apartment count — do not assume equivalence |

---

## 16. BUILDING TBD REGISTER

| TBD ID | Unknown | Why needed | Required for | Resolution source | Priority |
|---|---|---|---|---|---|
| TBD-001 | Exact footprint (site-coverage) dimensions/coordinates | Massing, site placement | 3D, pilot siting | Original BTI plan / site plan / field survey | **CRITICAL** — **(CORR-02)** scope clarified: this is purely a geometry gap; it is not resolved by, and does not depend on, the area taxonomy in §0b/§5 |
| ~~TBD-002~~ | ~~Reconciliation of §5.1 vs §5.2 area figures~~ | — | — | — | **CLOSED (CORR-02) — RESOLVED — DIFFERENT CADASTRAL AREA CATEGORIES.** No reconciliation required; §5.1 and §5.2 are not competing measurements per the owner-approved taxonomy |
| TBD-003 | Basement plan and height | Basement geometry, engineering routing, EDGE-01 siting | 3D, IoT, pilot | Original basement plan / field survey | High |
| TBD-004 | Facade photos/elevations | Facade proportions, window/balcony geometry | 3D | Field photography | High |
| TBD-005 | Engineering-node locations (heat entry, meters, boards) | Component instantiation (HEAT-01 etc.) | Engineering, IoT, pilot | Field survey with a specialist | High |
| TBD-006 | Confirmed apartment count (81 vs 78) | Unit-schedule accuracy | 3D, engineering | Original экспликация / field count | Medium |
| TBD-007 | Gas supply existence | Completeness of systems baseline | Engineering | Legible checklist re-read / field confirmation | Low |
| TBD-008 | Inventory № 23161, year built 1978 | Independent primary confirmation | Documentation completeness | Higher-resolution scan of cover/Form 03 page | Medium |
| TBD-009 | Content of `REAL_MCD_SOURCE_REGISTER_3D-S0_v0.2.xlsx` (SRC-008) | Unknown whether it duplicates or supersedes any fact here | Documentation continuity | Re-upload / re-extract the file | Medium |
| ~~TBD-010~~ | ~~Area methodology/scope for SRC-006's "Площадь общая" / "Площадь жилая, полезная" fields~~ | — | — | — | **CLOSED (CORR-02)** — category assigned by owner-approved taxonomy (Building Area, cadastral); no further methodology lookup required for this baseline |

---

## 17. CONFIDENCE SUMMARY

```
Identity          PARTIAL   (core address/cadastral VERIFIED; year/inventory № PARTIAL)
Geometry          PARTIAL / TBD (footprint site-coverage area unestablished — TBD-001, a geometry gap, NOT an area conflict; shape newly PARTIAL-VERIFIED)
Area/Volume       RESOLVED (taxonomy) (owner-approved area taxonomy applied CORR-02; former CONFLICT-001/CONFLICT-002 both RESOLVED — DIFFERENT SEMANTIC/CADASTRAL AREA CATEGORIES; no area figure implies a footprint value)
Construction      PARTIAL   (materials plausible, not independently primary-confirmed)
Engineering       PARTIAL   (existence of all 5 core systems VERIFIED; topology/components entirely TBD)
Connectivity      TBD       (no site survey performed; nothing beyond generic relevance mapping)
3D readiness      LIMITED   (floor count and a DERIVED non-rectangular footprint-shape constraint usable; exact footprint area/dimensions and all engineering geometry must not be modeled yet — TBD-001 unaffected by the area-taxonomy resolution)
Pilot readiness   NOT READY (blocked on TBD-003, TBD-005, and Beeline-side site survey)
```

---

## 18. INPUTS FOR EC-02 — PHYSICAL → OBSERVATION

| Object | Evidence status | Possible observation relevance | Additional validation required? |
|---|---|---|---|
| Central heating system (existence) | VERIFIED | Candidate for a future heat-entry/heating observation point, location TBD | Yes — node location |
| Cold/hot water systems (existence) | VERIFIED | Candidate for water-entry/meter observation points | Yes — node location |
| Electrical system (existence) | VERIFIED | Candidate for power-board observation point | Yes — node location |
| Sewer system (existence) | VERIFIED | Candidate for basement collector observation | Yes — node location |
| Lifts (existence, count PARTIAL) | PARTIAL | Candidate for lift-status observation, one per entrance | Yes — confirm 3-lift count and locations |
| Basement zone (existence) | PARTIAL | Candidate for the "basement water/environment" observation pattern established in BUILDING-01B/D | Yes — basement plan needed first |
| Roof zone | PARTIAL | Candidate for roof-moisture observation (optional, per BUILDING-01B) | Yes — roof plan/access needed |
| 3 entrance cores | DERIVED | Possible per-entrance grouping for future observation/connectivity design | Yes — exact core positions |

No observation points, devices, or connectivity mappings are created in this
document.

---

## 19. FINAL REPORT

1. **File created:** `EC-01_REAL_MCD_BASELINE_SEM-MCD-001_v0.3_REVIEW.md` (v0.2 preserved for audit history)
2. **CONFLICT-001 status:** **RESOLVED — DIFFERENT SEMANTIC AREA CATEGORIES**, per owner-approved taxonomy (1,248 m² = Total Useful Building Area; 550 m² = Common/Shared Building Area). No longer a footprint dispute.
3. **CONFLICT-002 status:** **RESOLVED — DIFFERENT CADASTRAL AREA CATEGORIES**, per owner-approved taxonomy (6,403.80 m² family = Building Area; ≈15,020 m² family = Adjacent/Associated Territory).
4. **BF-008 correction:** no longer states "Footprint area = 1,248 vs 550 / CONFLICT"; now reads "Footprint (site-coverage) area — not established — TBD (TBD-001)", decoupled from the resolved area-taxonomy figures. New facts BF-026/BF-027 record the taxonomy-assigned 1,248 m² and 550 m² values under their owner-approved category labels.
5. **TBD-002 status:** **CLOSED (CORR-02)** — reconciliation no longer required; struck through in the register, retained for audit history.
6. **TBD-010 status:** **CLOSED (CORR-02)** — area methodology assigned by owner-approved taxonomy; struck through in the register, retained for audit history.
7. **Revised area taxonomy:** applied exactly as supplied — see §0b and §5.0 (four distinct categories: Total Useful Building Area 1,248 m²; Common/Shared Building Area 550 m²; Building Area [cadastral] 6,403.80 m²; Adjacent/Associated Territory [cadastral] ≈15,020 m² — none treated as competing with another).
8. **Revised Geometry status:** §4's footprint row now reads "NOT ESTABLISHED — TBD (TBD-001)" instead of "DISPUTED"; the previously-logged 1,248 m² / 550 m² figures are no longer presented as candidate footprint values anywhere in the document. The stepped/non-rectangular footprint **shape** evidence (BF-009, Image 3) is unchanged and preserved.
9. **Revised 3D readiness:** §12's footprint-area row no longer frames a "dispute" — it states that footprint geometry must come from archival plans, dimensioned geometry, facade evidence, photographs, or field verification, and that no area figure (from either the resolved taxonomy or elsewhere) may be used to derive a footprint. The stepped-outline geometric evidence remains usable as a DERIVED massing constraint.
10. **Remaining genuinely OPEN conflicts:** CONFLICT-004 (land-letter reference number/date mismatch, SRC-001/002 vs SRC-005) and CONFLICT-005 (81 vs 78 apartment count) — both unchanged by this correction. CONFLICT-003 (public-aggregator outlier) remains closed as non-authoritative.
11. **HEAT-03 confirmation:** remains **NO EVIDENCE** — unchanged.
12. **81 vs 78 apartment count confirmation:** remains **OPEN** (CONFLICT-005) — unchanged.
13. **Confirmation — no new facts inferred:** no source was re-interpreted, no web research was performed, no area was calculated, and no geometry was inferred from any area value. The owner-approved taxonomy was applied as supplied, and only the two new taxonomy-record facts (BF-026, BF-027) were added, explicitly tagged as taxonomy assignments rather than independently re-derived source findings.
14. **Confirmation — EC-02 not started:** no observation points, device architecture, 3D geometry, or pilot configuration were created in this revision.

---

# STOP.

Per task instructions, EC-01 does not automatically proceed to EC-02, observation
points, device architecture, 3D geometry, TECH-03, or pilot configuration. Waiting
for separate owner approval before Gate 3/12.
