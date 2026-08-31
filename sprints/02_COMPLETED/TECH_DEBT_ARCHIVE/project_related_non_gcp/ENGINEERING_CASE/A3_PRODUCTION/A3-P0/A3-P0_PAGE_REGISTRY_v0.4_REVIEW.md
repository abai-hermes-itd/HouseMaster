# A3-P0 — PAGE REGISTRY
### Canonical A3 Page Inventory for EC-00…EC-03
**Reference building:** SEM-MCD-001 — г. Семей, пр. Шакарима, 13 «А»
**Status:** v0.4 — REVIEW ONLY
**PRODUCTION FREEZE: PENDING OWNER APPROVAL**
**Companion files:** `A3-P0_CASE_DESIGN_SYSTEM_v0.4_REVIEW.md` (rules),
`A3-P0_PAGE_REGISTRY_v0.4.csv` (same data, machine-readable),
`A3-P0_PAGE_SPEC_TEMPLATE_v0.4.md` (per-page fillable spec)

## CHANGELOG — v0.3 → v0.4 (CORR-03: Exact File Patch — Final Freeze Preconditions)

**Exact-patch revision. PATCH-01…PATCH-12 as specified, no substitute
criteria applied.** No page added, removed, retyped, or renumbered; no
EC-02/EC-03 ID change; no case-order change; no new architecture; nothing
rendered.

1. **EC-00 source-linkage wording (PATCH-01).** All wording stating or
   implying EC-00 "did not exist," was a "proxy," or might be "produced
   later" is removed. EC-00 is now stated as `GATE STATUS: APPROVED /
   CLOSED` with `SOURCE LINKAGE STATUS: SOURCE LINKAGE PENDING` (primary
   source artifact not located in the current workspace; secondary
   reference sources — Technical Integration Pack, Joint Technical
   Validation/Open Questions — unchanged). All 4 `A3-EC00-*` rows now carry
   `Source Linkage Status = SOURCE LINKAGE PENDING`; all 19 EC-01/02/03 rows
   carry `Source Linkage Status = LINKED`.
2. **Premature freeze language removed (PATCH-02).** "PRODUCTION FREEZE
   PRECONDITIONS CLOSED," "frozen production baseline," "all preconditions
   closed," and the CORR-02 self-approval framing are removed. Status is now
   `v0.4 — REVIEW ONLY` / `PRODUCTION FREEZE: PENDING OWNER APPROVAL`. The
   only allowed readiness statement is `FREEZE READINESS: READY FOR OWNER
   APPROVAL` or `FREEZE READINESS: NOT READY` — see Final Report.
3. **Registry schema normalized to 14 columns (PATCH-08).** `Page Type` is
   split into `Primary Page Type` (exactly one per row) and `Secondary
   Characteristic` (`NONE` where not applicable). All `PT-03/PT-05` and
   `PT-06/PT-08` dual-type notations are deleted. `A3-EC01-03`: Primary =
   `PT-03`, Secondary = `COMPARISON`. `A3-EC01-06`: Primary = `PT-06`,
   Secondary = `TBD REGISTER`. The old "dual typing" note is replaced by the
   Primary/Secondary Type Rule (below). `Source Linkage Status` is added as
   its own column (see #1).
4. **A3-EC01-04 thesis wording fixed (PATCH-09).** "All 5 core systems
   confirmed to exist; none has a confirmed component location" is replaced
   everywhere with the exact required wording: "Documented engineering
   systems are confirmed at system-existence level; specific component
   locations remain TBD." No number is introduced.
5. **Counts re-verified against PATCH-11 exact targets** — unchanged:
   TOTAL 23, EC-00/01/02/03 = 4/6/4/9, CORE/SUPPORTING/APPENDIX = 18/4/1,
   PT-01…PT-09 = 5/1/2/3/1/5/2/3/1 (sums to 23). MD↔CSV field parity
   re-verified at 14 columns, 23 rows, 0 mismatches (see Final Report for
   the executed check).

**Not changed:** all 23 Page IDs; EC-02 IDs `A3-EC02-01…04`; EC-03 IDs
`A3-EC03-01…09`; the recommended case order; the Vocabulary Conformance
mapping (still valid — its underlying tokens are unaffected by the schema
change); zero rendered artifacts.

---

## EC-00 — TECHNICAL CONTEXT

```text
GATE STATUS: APPROVED / CLOSED

SOURCE LINKAGE STATUS:
SOURCE LINKAGE PENDING

PRIMARY SOURCE ARTIFACT:
NOT LOCATED IN CURRENT WORKSPACE

SECONDARY REFERENCE SOURCES:
Technical Integration Pack
Joint Technical Validation / Open Questions

NOTE:
The EC-00 gate is approved and closed.
The current workspace search did not locate its primary source artifact.
Absence of a located artifact does not mean EC-00 did not exist.
```

The four `A3-EC00-*` pages below are extracted from the two secondary
reference sources listed above, per Design System §1.1/§2.

---

## EC-00 PAGE SET

| Page ID | Working Title | Primary Page Type | Secondary Characteristic | Source Sections | Why this page exists |
|---|---|---|---|---|---|
| A3-EC00-01 | Reference Architecture Overview | PT-01 NARRATIVE | NONE | Technical Integration Pack — Executive Technical Summary, Architecture Map | Orients a Beeline reader to the seven-stage TECH-01…07 architecture before any SEM-MCD-001-specific content — without it, later pages have no frame |
| A3-EC00-02 | System Responsibility Model | PT-09 DECISION/BOUNDARY | NONE | TECH-02 Responsibility/Ownership Matrix, TECH-03 Source-of-Truth table | Establishes, once, who owns what (Beeline connectivity identity vs. HouseMaster domain identity) — every later page assumes the reader has seen this |
| A3-EC00-03 | Architecture Axioms | PT-01 NARRATIVE | NONE | TECH-08 cross-cutting axioms list (project summary §1) | The ten repeated axioms (`Connectivity ≠ Engineering State`, etc.) recur throughout EC-01…03; one canonical page prevents them being re-explained piecemeal |
| A3-EC00-04 | Scope & Open Questions | PT-08 TBD/VALIDATION REGISTER | NONE | Open Questions Q1–Q15, TECH-07 pilot scope | Sets reader expectations that this case ends in validation questions, not finished answers — anchors the dossier's honesty discipline from page one |

---

## EC-01 PAGE SET

Source: `EC-01_REAL_MCD_BASELINE_SEM-MCD-001_v0.3_REVIEW.md`. Not every EC-01
section became a page — sections that are purely internal audit trail (e.g.
§0a/§0b changelogs) are not proposed as pages; sections that materially
anchor the real building as evidence are.

| Page ID | Working Title | Primary Page Type | Secondary Characteristic | Source Sections | Why this page exists |
|---|---|---|---|---|---|
| A3-EC01-01 | Why the Real Building Anchors This Case | PT-01 NARRATIVE | NONE | EC-01 §1, §0b (taxonomy discipline) | States the provenance discipline (VERIFIED/PARTIAL/DERIVED/TBD) that every later page in the whole dossier depends on |
| A3-EC01-02 | SEM-MCD-001 Identity & Geometry Fact Sheet | PT-03 REAL MCD/EVIDENCE | NONE | EC-01 §3, §4 | The building's actual identity card and geometry baseline, including the newly identified stepped/non-rectangular footprint shape (BF-009) — the single most load-bearing evidence page in the case |
| A3-EC01-03 | Area Taxonomy — A Resolved Evidence Story | PT-03 REAL MCD/EVIDENCE | COMPARISON | EC-01 §0b, §5 | A concrete, teachable example of the dossier's evidence discipline: two figure pairs once mischaracterized as conflicts, resolved by an owner-approved taxonomy — useful for building reader trust in the method itself |
| A3-EC01-04 | Engineering Systems — Existence vs. Location | PT-04 MASTER MATRIX | NONE | EC-01 §7, §14 (BF-015–BF-022) | The single fact every Beeline-facing page later depends on: documented engineering systems are confirmed at system-existence level; specific component locations remain TBD |
| A3-EC01-05 | Conflicts, TBDs & Confidence | PT-08 TBD/VALIDATION REGISTER | NONE | EC-01 §15, §16, §17 | Makes the genuinely open items (CONFLICT-004, CONFLICT-005, the TBD register) visible and countable, rather than buried in prose |
| A3-EC01-06 | Site Survey & 3D Readiness Handoff | PT-06 REFERENCE FLOW | TBD REGISTER | EC-01 §11, §12, §13 | Closes the EC-01 page set on what is actually usable today for 3D/pilot work vs. what is blocked — a practical handoff, not just an evidence summary |

---

## EC-02 PAGE SET (IDs preserved unchanged)

Source: `EC-02_PHYSICAL_TO_OBSERVATION_SEM-MCD-001_v0.3_REVIEW.md` §18. **No
conflict found — all four IDs, titles, and purposes validated as-is against
EC-02 v0.3.**

| Page ID | Working Title | Primary Page Type | Secondary Characteristic | Source Sections | Validated against EC-02 v0.3 |
|---|---|---|---|---|---|
| A3-EC02-01 | Narrative | PT-01 NARRATIVE | NONE | EC-02 §18 (A3-EC02-01 spec), §4a | Confirmed — three-column structure (requirement → evidence channel → HouseMaster state) matches EC-02's own thesis: "HouseMaster does not start with the sensor" |
| A3-EC02-02 | Hero Graph | PT-02 HERO ARCHITECTURE | NONE | EC-02 §18 (A3-EC02-02 spec) | Confirmed — the physical-systems → observable-conditions → observation-points → machine/human/documentary → evidence → building-state chain is EC-02's own canonical flow |
| A3-EC02-03 | Master Observability Matrix | PT-04 MASTER MATRIX | NONE | EC-02 §15 | Confirmed — direct extraction of the 18-row `OBS-CAND` matrix; flagged in the Design System (§13) as a candidate for logical splitting at design time given its column count |
| A3-EC02-04 | Reference Observation | PT-06 REFERENCE FLOW | NONE | EC-02 §16 | Confirmed — `OBS-CAND-001` (heating, temperature condition) remains the correct reference candidate; no change |

---

## EC-03 PAGE SET (IDs preserved unchanged)

Source: `EC-03_DEVICE_CONNECTIVITY_SEM-MCD-001_v0.3_REVIEW.md` §34. **No
conflict found — all nine IDs, titles, and purposes validated as-is against
EC-03 v0.3.**

| Page ID | Working Title | Primary Page Type | Secondary Characteristic | Source Sections | Validated against EC-03 v0.3 |
|---|---|---|---|---|---|
| A3-EC03-01 | Narrative | PT-01 NARRATIVE | NONE | EC-03 §34 (A3-EC03-01 spec) | Confirmed — three-column structure (observation requirement → Device Function/identity → Connectivity Profile/boundary); thesis "connectivity serves an observation requirement" matches EC-03 §34 verbatim |
| A3-EC03-02 | Direct Connectivity Pattern | PT-06 REFERENCE FLOW | NONE | EC-03 §26 | Confirmed — matches the Reference Direct Connectivity Flow exactly |
| A3-EC03-03 | Edge Aggregation Pattern | PT-06 REFERENCE FLOW | NONE | EC-03 §27 | Confirmed — matches the Reference Edge Aggregation Flow; no `EDGE-01` named |
| A3-EC03-04 | Direct vs Edge Matrix | PT-05 COMPARISON | NONE | EC-03 §28 | Confirmed — 15-criterion comparison, no winner declared |
| A3-EC03-05 | Connectivity State / Reachability | PT-07 FAILURE/STATE MODEL | NONE | EC-03 §21, §24 | Confirmed — combines the 7-state connectivity model and the reachability/heartbeat semantics matrix, which share one page naturally |
| A3-EC03-06 | Failure Domains | PT-07 FAILURE/STATE MODEL | NONE | EC-03 §29 | Confirmed — 7 failure domains (F-01…F-07), responsibility statuses included |
| A3-EC03-07 | Reference Heating Flow | PT-06 REFERENCE FLOW | NONE | EC-03 §26 (concrete instance) | Confirmed as a distinct page from A3-EC03-02: §26 is both the generic Direct-pattern template *and* the concrete `DEV-CAND-001` worked example — kept as one page since EC-03 itself presents them together |
| A3-EC03-08 | Master Device & Connectivity Matrix | PT-04 MASTER MATRIX | NONE | EC-03 §33 | Confirmed — 16-row, 13-column matrix; flagged in Design System §13/§28 as a probable future split (`A3-EC03-08a`/`08b`) at design time, ID unchanged for now |
| A3-EC03-09 | TBD With Beeline | PT-08 TBD/VALIDATION REGISTER | NONE | EC-03 §30 | Confirmed — 15 `Q-CONN` questions, none answered |

---

## PRIMARY / SECONDARY TYPE RULE

```text
Each page has exactly one Primary Page Type.
Additional functional traits are recorded only in Secondary Characteristic.
Secondary characteristics are not included in primary type totals.
```

Two pages currently carry a secondary characteristic: `A3-EC01-03`
(Secondary: `COMPARISON`) and `A3-EC01-06` (Secondary: `TBD REGISTER`). All
other pages carry `Secondary Characteristic = NONE`. No page has more than
one Primary Page Type.

---

## FULL PAGE REGISTRY TABLE (14 columns)

| Page ID | Gate | Working Title | Primary Page Type | Secondary Characteristic | Source Sections | Engineering Thesis | Main Visual | Beeline Relevance | Evidence Level | Source Linkage Status | A3 Production Status | Priority | Workshop Candidate |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A3-EC00-01 | EC-00 | Reference Architecture Overview | PT-01 | NONE | Tech Pack — Exec Summary, Arch Map | The reference architecture separates connectivity from engineering state across seven answered questions | Architecture Map (TECH-01–07 flow) | HIGH | PROPOSED (reference arch) | SOURCE LINKAGE PENDING | CONTENT EXTRACTED | CORE | Y |
| A3-EC00-02 | EC-00 | System Responsibility Model | PT-09 | NONE | TECH-02, TECH-03 matrices | Beeline owns connectivity identity; HouseMaster owns domain identity — ownership never transfers | Responsibility/ownership matrix | HIGH | PROPOSED | SOURCE LINKAGE PENDING | CONTENT EXTRACTED | CORE | Y |
| A3-EC00-03 | EC-00 | Architecture Axioms | PT-01 | NONE | TECH-08 axioms | Ten axioms govern every layer, from signal to pilot | Axiom list/wall | MEDIUM | PROPOSED | SOURCE LINKAGE PENDING | CONTENT EXTRACTED | SUPPORTING | N |
| A3-EC00-04 | EC-00 | Scope & Open Questions | PT-08 | NONE | Open Questions Q1–Q15, TECH-07 | Fifteen questions must be jointly validated before pilot design proceeds | Q1–Q15 table | HIGH | TBD WITH BEELINE | SOURCE LINKAGE PENDING | CONTENT EXTRACTED | CORE | Y |
| A3-EC01-01 | EC-01 | Why the Real Building Anchors This Case | PT-01 | NONE | EC-01 §1, §0b | Every claim about SEM-MCD-001 is tagged VERIFIED/PARTIAL/DERIVED/TBD, never assumed | Source→Fact→Provenance→Status chain | MEDIUM | N/A (meta) | LINKED | CONTENT EXTRACTED | CORE | Y |
| A3-EC01-02 | EC-01 | Identity & Geometry Fact Sheet | PT-03 | NONE | EC-01 §3, §4 | SEM-MCD-001 is a 9-floor, 3-entrance brick building; footprint geometry remains unresolved | Identity card + stepped-footprint sketch | MEDIUM | VERIFIED/PARTIAL mix | LINKED | CONTENT EXTRACTED | CORE | Y |
| A3-EC01-03 | EC-01 | Area Taxonomy — Resolved Evidence Story | PT-03 | COMPARISON | EC-01 §0b, §5 | Four distinct area categories were mischaracterized as conflicts until an owner-approved taxonomy clarified them | 4-category comparison table | LOW | RESOLVED (taxonomy) | LINKED | CONTENT EXTRACTED | SUPPORTING | N |
| A3-EC01-04 | EC-01 | Engineering Systems — Existence vs. Location | PT-04 | NONE | EC-01 §7, §14 | Documented engineering systems are confirmed at system-existence level; specific component locations remain TBD. | Systems existence/topology/location matrix | HIGH | VERIFIED(existence)/TBD(location) | LINKED | CONTENT EXTRACTED | CORE | Y |
| A3-EC01-05 | EC-01 | Conflicts, TBDs & Confidence | PT-08 | NONE | EC-01 §15, §16, §17 | Two conflicts remain genuinely open; nine TBDs gate every downstream gate | Conflict/TBD register | MEDIUM | Mixed | LINKED | CONTENT EXTRACTED | SUPPORTING | N |
| A3-EC01-06 | EC-01 | Site Survey & 3D Readiness Handoff | PT-06 | TBD REGISTER | EC-01 §11, §12, §13 | 3D massing may proceed on floor count and footprint shape alone; nothing else is ready | 3D usability matrix | LOW | PARTIAL | LINKED | CONTENT EXTRACTED | APPENDIX | N |
| A3-EC02-01 | EC-02 | Narrative | PT-01 | NONE | EC-02 §18, §4a | HouseMaster does not start with the sensor — it starts with the engineering question | 3-column narrative | MEDIUM | N/A (meta) | LINKED | CONTENT EXTRACTED | CORE | Y |
| A3-EC02-02 | EC-02 | Hero Graph | PT-02 | NONE | EC-02 §18 | Physical systems → observable conditions → observation points → evidence → building state | Hero flow graph | MEDIUM | N/A (meta) | LINKED | CONTENT EXTRACTED | CORE | Y |
| A3-EC02-03 | EC-02 | Master Observability Matrix | PT-04 | NONE | EC-02 §15 | 18 observable conditions span 10 systems/zones, all evidence-gated to L1 | Master observability matrix | HIGH | VERIFIED/PARTIAL mix | LINKED | CONTENT EXTRACTED | CORE | Y |
| A3-EC02-04 | EC-02 | Reference Observation | PT-06 | NONE | EC-02 §16 | The heating temperature candidate demonstrates the full evidence chain without inventing a component | Reference candidate block + flow | HIGH | VERIFIED(existence)/TBD(location) | LINKED | CONTENT EXTRACTED | CORE | Y |
| A3-EC03-01 | EC-03 | Narrative | PT-01 | NONE | EC-03 §34 | Connectivity serves an observation requirement; it does not define the observation's engineering meaning | 3-column narrative | MEDIUM | N/A (meta) | LINKED | CONTENT EXTRACTED | CORE | Y |
| A3-EC03-02 | EC-03 | Direct Connectivity Pattern | PT-06 | NONE | EC-03 §26 | Each device may have its own connectivity path, undecided vs. Edge Aggregation | Direct flow diagram | HIGH | Conceptual | LINKED | CONTENT EXTRACTED | CORE | Y |
| A3-EC03-03 | EC-03 | Edge Aggregation Pattern | PT-06 | NONE | EC-03 §27 | Devices may share a conceptual aggregation function, never named or placed | Edge flow diagram | HIGH | Conceptual | LINKED | CONTENT EXTRACTED | CORE | Y |
| A3-EC03-04 | EC-03 | Direct vs Edge Matrix | PT-05 | NONE | EC-03 §28 | Fifteen criteria compared; no topology winner declared | Comparison matrix | HIGH | Conceptual | LINKED | CONTENT EXTRACTED | CORE | Y |
| A3-EC03-05 | EC-03 | Connectivity State / Reachability | PT-07 | NONE | EC-03 §21, §24 | Seven proposed HouseMaster connectivity states are not Beeline's internal states | State table + reachability matrix | HIGH | Proposed | LINKED | CONTENT EXTRACTED | SUPPORTING | N |
| A3-EC03-06 | EC-03 | Failure Domains | PT-07 | NONE | EC-03 §29 | Seven failure domains span device to HouseMaster processing; failure domain ≠ defect domain | Failure domain table | HIGH | Conceptual | LINKED | CONTENT EXTRACTED | CORE | Y |
| A3-EC03-07 | EC-03 | Reference Heating Flow | PT-06 | NONE | EC-03 §26 (worked instance) | The same OBS-CAND-001/DEV-CAND-001 candidate walked end-to-end through Direct Connectivity | Reference flow, concrete instance | HIGH | VERIFIED(existence)/TBD(location) | LINKED | CONTENT EXTRACTED | CORE | Y |
| A3-EC03-08 | EC-03 | Master Device & Connectivity Matrix | PT-04 | NONE | EC-03 §33 | All 16 device candidates, fully specified except location and topology | Master matrix (candidate split, §13) | HIGH | Mixed | LINKED | CONTENT EXTRACTED | CORE | N |
| A3-EC03-09 | EC-03 | TBD With Beeline | PT-08 | NONE | EC-03 §30 | Fifteen connectivity-validation questions remain fully unanswered | TBD question register | HIGH | TBD WITH BEELINE | LINKED | CONTENT EXTRACTED | CORE | Y |

---

## VOCABULARY CONFORMANCE (Evidence Level column → Design System §10)

Design System §10 canonical states: `VERIFIED` · `DERIVED` · `PARTIAL` ·
`PROPOSED/CONCEPTUAL` · `TBD` · `NO EVIDENCE` · `TBD WITH BEELINE` ·
`RISK/FAILURE` · `HOUSEMASTER DOMAIN` · `BEELINE DOMAIN` ·
`SHARED/TRUST BOUNDARY`. **No new canonical state is added here** — every
free-text value already in the registry is mapped onto this existing list
(or an explicit, documented combination of it); this is normalization, not
redesign. Unchanged from CORR-02.

| Free-text value in use | Canonical mapping | Pages using it |
|---|---|---|
| `PROPOSED (reference arch)` / `Proposed` | `PROPOSED/CONCEPTUAL` | A3-EC00-01, A3-EC00-02, A3-EC00-03, A3-EC03-05 |
| `Conceptual` | `PROPOSED/CONCEPTUAL` | A3-EC03-02, A3-EC03-03, A3-EC03-04, A3-EC03-06 |
| `TBD WITH BEELINE` | `TBD WITH BEELINE` (exact match, no mapping needed) | A3-EC00-04, A3-EC03-09 |
| `VERIFIED/PARTIAL mix` | Combination of `VERIFIED` + `PARTIAL` — both canonical tokens present in one page, not a new state | A3-EC01-02, A3-EC02-03 |
| `VERIFIED(existence)/TBD(location)` | Combination of `VERIFIED` + `TBD` | A3-EC01-04, A3-EC02-04, A3-EC03-07 |
| `PARTIAL` | `PARTIAL` (exact match) | A3-EC01-06 |
| `RESOLVED (taxonomy)` | Treated as `VERIFIED`, scoped to the taxonomy classification itself (per EC-01 v0.3 CORR-02: the owner-approved category assignment is a settled fact) — **not** a new canonical state; the underlying figures it classifies keep their own original statuses | A3-EC01-03 |
| `Mixed` | Page combines more than two canonical tokens — see the page's own `Source Sections` for the specific mix (EC-01 §15–§17 conflict/TBD register spans `PARTIAL`, `TBD`, and open-conflict language) | A3-EC01-05 |
| `N/A (meta)` | Not an evidence-confidence claim at all — these are narrative/hero pages describing the *method* (e.g. "HouseMaster does not start with the sensor") rather than a building fact, so no §10 token applies; retained as an explicit non-claim, not mapped | A3-EC00-03 (axioms), A3-EC01-01, A3-EC02-01, A3-EC02-02, A3-EC03-01 |

Anyone filling a Page Spec (per the template) for one of these pages should
use the **canonical mapping**, not the free-text registry shorthand, in the
Spec's `EVIDENCE STATUS` and `STATUS LABELS` fields.

---

## RECOMMENDED CASE ORDER

Following the reader logic fixed in Design System §25 (not file chronology).
**Unchanged from v0.3.**

```text
 1. A3-EC00-01  Reference Architecture Overview          — WHY THIS CASE EXISTS
 2. A3-EC00-02  System Responsibility Model               — WHY THIS CASE EXISTS
 3. A3-EC00-03  Architecture Axioms                        — WHY THIS CASE EXISTS
 4. A3-EC01-01  Why the Real Building Anchors This Case    — WHAT REAL BUILDING
 5. A3-EC01-02  Identity & Geometry Fact Sheet              — WHAT REAL BUILDING
 6. A3-EC01-03  Area Taxonomy — Resolved Evidence Story     — WHAT IS PHYSICALLY KNOWN
 7. A3-EC01-04  Engineering Systems — Existence vs. Location — WHAT IS PHYSICALLY KNOWN
 8. A3-EC02-01  Narrative                                   — WHAT CAN BE OBSERVED
 9. A3-EC02-02  Hero Graph                                  — WHAT CAN BE OBSERVED
10. A3-EC02-03  Master Observability Matrix                 — WHAT CAN BE OBSERVED
11. A3-EC02-04  Reference Observation                       — HOW OBSERVATION BECOMES EVIDENCE
12. A3-EC03-01  Narrative                                   — HOW DEVICE/CONNECTIVITY SERVES IT
13. A3-EC03-02  Direct Connectivity Pattern                 — HOW DEVICE/CONNECTIVITY SERVES IT
14. A3-EC03-03  Edge Aggregation Pattern                    — HOW DEVICE/CONNECTIVITY SERVES IT
15. A3-EC03-04  Direct vs Edge Matrix                       — HOW DEVICE/CONNECTIVITY SERVES IT
16. A3-EC03-07  Reference Heating Flow                      — HOW DEVICE/CONNECTIVITY SERVES IT
17. A3-EC03-06  Failure Domains                              — HOW DEVICE/CONNECTIVITY SERVES IT
18. A3-EC03-05  Connectivity State / Reachability            — HOW DEVICE/CONNECTIVITY SERVES IT
19. A3-EC03-08  Master Device & Connectivity Matrix          — HOW DEVICE/CONNECTIVITY SERVES IT
20. A3-EC00-04  Scope & Open Questions                       — WHAT BEELINE MUST VALIDATE
21. A3-EC03-09  TBD With Beeline                              — WHAT BEELINE MUST VALIDATE
22. A3-EC01-05  Conflicts, TBDs & Confidence                  — WHAT REMAINS UNKNOWN
23. A3-EC01-06  Site Survey & 3D Readiness Handoff             — WHAT REMAINS UNKNOWN
```

This is a **recommended current ordering**, not a final print sequence — it
will be revisited once EC-04 (Identity & Lifecycle) and later gates add
pages.

---

## WORKSHOP CANDIDATE NOTE

17 of 23 pages are currently flagged `Workshop Candidate: Y` — more than the
eventual 10–15 page target stated in Design System §26. This is intentional:
the flag marks *eligibility* against the six criteria, not a finalized deck.
Final trimming (likely dropping some of the EC-03 Reference/Comparison pages
in favor of the single strongest example, and dropping EC-00-03) is a
separate, later decision. **Unchanged from v0.3.**

---

## PRODUCTION REGISTER SUMMARY

```text
Total A3 pages identified:        23
EC-00 pages:                       4
EC-01 pages:                       6
EC-02 pages:                       4
EC-03 pages:                       9

CORE pages:                       18
SUPPORTING pages:                  4
WORKSHOP candidate pages:         17   (flag, not final subset — see note above)
APPENDIX pages:                    1

Narrative pages (PT-01):           5   (EC00-01, EC00-03, EC01-01, EC02-01, EC03-01)
Hero architecture pages (PT-02):   1   (EC02-02)
Evidence pages (PT-03):            2   (EC01-02, EC01-03 — primary type only;
                                        EC01-03's Secondary Characteristic
                                        "COMPARISON" is not counted in PT-05)
Matrix pages (PT-04):              3   (EC01-04, EC02-03, EC03-08)
Comparison pages (PT-05):          1   (EC03-04)
Reference-flow pages (PT-06):      5   (EC01-06, EC02-04, EC03-02, EC03-03, EC03-07)
Failure/state pages (PT-07):       2   (EC03-05, EC03-06)
TBD/validation pages (PT-08):      3   (EC00-04, EC01-05, EC03-09)
Decision/boundary pages (PT-09):   1   (EC00-02)
```

**Type-count check:** 5+1+2+3+1+5+2+3+1 = **23**, matching PATCH-11's exact
expected distribution and the total page count — no page is double-counted
and none is missing.

**Source linkage distribution:**

```text
LINKED:                 19 of 23  (all EC-01, EC-02, EC-03 pages)
SOURCE LINKAGE PENDING:   4 of 23  (all EC-00 pages)
```

**Current production status distribution:**

```text
ENGINEERING SOURCE STATUS — APPROVED:   23 of 23
SOURCE LINKAGE STATUS — LINKED:         19 of 23
SOURCE LINKAGE STATUS — PENDING:         4 of 23  (EC-00 pages)
A3 PRODUCTION STATUS — CONTENT EXTRACTED: 23 of 23
A3 PRODUCTION STATUS — PAGE SPEC READY:    0 of 23
A3 PRODUCTION STATUS — RENDERED:           0 of 23
```

---

## FREEZE PRECONDITIONS CHECKLIST (re-verified this pass)

| # | Precondition | Status | Evidence |
|---|---|---|---|
| 1 | All 23 Page IDs unique, pattern `A3-EC0{0-3}-{NN}` | ✅ | Enumerated from Full Page Registry Table |
| 2 | EC-02 Page IDs unchanged | ✅ | Re-checked against EC-02 v0.3 §18 |
| 3 | EC-03 Page IDs unchanged | ✅ | Re-checked against EC-03 v0.3 §34 |
| 4 | MD ↔ CSV field parity, 14 columns, 23 rows | ✅ | Row-by-row comparison this pass — see Final Report for exact counts |
| 5 | Type-count/priority-count arithmetic sums to 23 | ✅ | See Production Register Summary above |
| 6 | Evidence Level maps to Design System §10 vocabulary | ✅ | Vocabulary Conformance table above (unchanged from CORR-02) |
| 7 | All four companion files reference each other at the same version | ✅ | All four now cross-reference `v0.4` filenames |
| 8 | Zero rendered artifacts | ✅ | Directory contains only `.md`/`.csv` production files |
| 9 | Registry does not silently duplicate/contradict EC-01/02/03 claims | ✅ | Every thesis cell traces to a named source section |
| 10 | Owner sign-off mechanism exists | ✅ | See Owner Sign-off below — still blank, still not self-approved |
| 11 (new) | EC-00 status stated without implying non-existence | ✅ | See "EC-00 — Technical Context" block above |
| 12 (new) | Primary/Secondary Page Type schema applied with no dual-type notation remaining | ✅ | Full Page Registry Table uses exactly one Primary Page Type per row |

This checklist is evidence for the Final Report's PATCH-12 acceptance
results — it does not itself declare the freeze approved (see Owner
Sign-off).

---

## OWNER SIGN-OFF

```text
FREEZE VERSION:           A3-P0 Page Registry v0.4
PRECONDITIONS CHECKLIST:  12 of 12 items evidenced (see above)
REVIEWED BY:               [blank — owner to complete]
APPROVAL DATE:             [blank — owner to complete]
APPROVED / NOT APPROVED:   [blank — owner to complete]
NOTES:                     [blank — owner to complete]
```

This block is intentionally blank. Neither this document nor any prior
revision self-approves the freeze — approval is an owner action, not a
production-system default. Per PATCH-02, this document's own readiness
statement is limited to the token in the Final Report (`READY FOR OWNER
APPROVAL` or `NOT READY`) and does not claim owner approval itself.
