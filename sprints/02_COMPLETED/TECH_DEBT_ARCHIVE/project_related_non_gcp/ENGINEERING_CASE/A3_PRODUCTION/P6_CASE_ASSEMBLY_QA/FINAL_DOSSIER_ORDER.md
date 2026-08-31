# A3 Case — Final Dossier Order (P6-02)

## Status

- Gate: P6-02 FINAL DOSSIER ORDER & ASSEMBLY
- Scope of this document: **order specification only** — no PDF merge performed, no file created/modified/deleted/moved outside this document
- Preceding gate: P6-01 (six-finding forensic audit → correction → source recovery), PASSED
- Canonical page count: 23
- Pipeline-backed: 22
- Legacy/conceptual exception: 1 (A3-EC00-02, flagged explicitly below — not silently presented as equivalent to the other 22)

## Ordering source

The sequence below reproduces the "recommended current ordering" already on record in
`A3-P0_PAGE_REGISTRY_v0.4_REVIEW.md` (narrative-section groupings), cross-checked
against the individually-numbered Assembly PDFs that already exist per production
stage. **Assembly PDF numbers reflect production/creation order, not final reading
order** — the two are intentionally different, which is the reason this ordering
document exists.

## Final dossier sequence (1–23)

| # | Page ID | Title | Narrative section | Stage | Assembly PDF | Status |
|---:|---|---|---|---|---|---|
| 1 | A3-EC00-01 | Reference Architecture Overview | WHY THIS CASE EXISTS | P2 | `P2_CONTEXT_REAL_BUILDING/ASSEMBLY/001_A3-EC00-01_Reference_Architecture_Overview.pdf` | Pipeline-backed |
| 2 | **A3-EC00-02** | **System Responsibility Model** | WHY THIS CASE EXISTS | P1 | `P1_VISUAL_GRAMMAR_PILOT/ASSEMBLY/002_A3-EC00-02_System_Responsibility_Model.pdf` | **⚠ LEGACY / CONCEPTUAL EXCEPTION — no GRAPH_IR / PAGE_SPEC / SOURCE_EXTRACT / Drawio exists. Authoritative sources TECH-02 and TECH-03 are confirmed `NOT_INGESTED` (P6-01E). This PDF is retained as a proposed/conceptual artifact by explicit owner decision, not as evidence-backed content equal to the other 22 pages.** |
| 3 | A3-EC00-03 | Architecture Axioms | WHY THIS CASE EXISTS | P2 | `P2_CONTEXT_REAL_BUILDING/ASSEMBLY/003_A3-EC00-03_Architecture_Axioms.pdf` | Pipeline-backed |
| 4 | A3-EC01-01 | Why the Real Building Anchors This Case | WHAT REAL BUILDING | P2 | `P2_CONTEXT_REAL_BUILDING/ASSEMBLY/004_A3-EC01-01_Reference_Building_Evidence_Anchor.pdf` | Pipeline-backed |
| 5 | A3-EC01-02 | Identity & Geometry Fact Sheet | WHAT REAL BUILDING | P1 | `P1_VISUAL_GRAMMAR_PILOT/ASSEMBLY/005_A3-EC01-02_SEM-MCD-001_Identity_Geometry_Fact_Sheet.pdf` | Pipeline-backed — provenance chain **reconstructed** (P6-01D, finding F4); see reconstruction notice in its SOURCE_EXTRACT/GRAPH_IR/PAGE_SPEC |
| 6 | A3-EC01-03 | Area Taxonomy — Resolved Evidence Story | WHAT IS PHYSICALLY KNOWN | P2 | `P2_CONTEXT_REAL_BUILDING/ASSEMBLY/006_A3-EC01-03_Area_Taxonomy.pdf` | Pipeline-backed |
| 7 | A3-EC01-04 | Engineering Systems — Existence vs. Location | WHAT IS PHYSICALLY KNOWN | P1 | `P1_VISUAL_GRAMMAR_PILOT/ASSEMBLY/007_A3-EC01-04_Engineering_Systems_Existence_vs_Location.pdf` | Pipeline-backed |
| 8 | A3-EC02-01 | Narrative | WHAT CAN BE OBSERVED | P3 | `P3_OBSERVABILITY_COMPLETION/ASSEMBLY/011_A3-EC02-01_Observability_Narrative.pdf` | Pipeline-backed |
| 9 | A3-EC02-02 | Hero Graph | WHAT CAN BE OBSERVED | P1 | `P1_VISUAL_GRAMMAR_PILOT/ASSEMBLY/012_A3-EC02-02_Hero_Graph_Physical_MCD_to_HouseMaster_Observation.pdf` | Pipeline-backed |
| 10 | A3-EC02-03 | Master Observability Matrix | WHAT CAN BE OBSERVED | P3 | `P3_OBSERVABILITY_COMPLETION/ASSEMBLY/013_A3-EC02-03_Master_Observability_Matrix.pdf` | Pipeline-backed |
| 11 | A3-EC02-04 | Reference Observation | HOW OBSERVATION BECOMES EVIDENCE | P1 | `P1_VISUAL_GRAMMAR_PILOT/ASSEMBLY/014_A3-EC02-04_Reference_Observation_OBS-CAND-001.pdf` | Pipeline-backed |
| 12 | A3-EC03-01 | Narrative | HOW DEVICE/CONNECTIVITY SERVES IT | P4 | `P4_CONNECTIVITY_COMPLETION/ASSEMBLY/015_A3-EC03-01_Connectivity_Entry_Architecture.pdf` | Pipeline-backed |
| 13 | A3-EC03-02 | Direct Connectivity Pattern | HOW DEVICE/CONNECTIVITY SERVES IT | P1 | `P1_VISUAL_GRAMMAR_PILOT/ASSEMBLY/016_A3-EC03-02_Direct_Connectivity_Pattern.pdf` | Pipeline-backed |
| 14 | A3-EC03-03 | Edge Aggregation Pattern | HOW DEVICE/CONNECTIVITY SERVES IT | P1 | `P1_VISUAL_GRAMMAR_PILOT/ASSEMBLY/017_A3-EC03-03_Edge_Aggregation_Pattern.pdf` | Pipeline-backed |
| 15 | A3-EC03-04 | Direct vs Edge Matrix | HOW DEVICE/CONNECTIVITY SERVES IT | P4 | `P4_CONNECTIVITY_COMPLETION/ASSEMBLY/018_A3-EC03-04_Direct_vs_Edge_Matrix.pdf` | Pipeline-backed |
| 16 | A3-EC03-07 | Reference Heating Flow | HOW DEVICE/CONNECTIVITY SERVES IT | P4 | `P4_CONNECTIVITY_COMPLETION/ASSEMBLY/021_A3-EC03-07_Reference_Heating_Flow.pdf` | Pipeline-backed |
| 17 | A3-EC03-06 | Failure Domains | HOW DEVICE/CONNECTIVITY SERVES IT | P1 | `P1_VISUAL_GRAMMAR_PILOT/ASSEMBLY/020_A3-EC03-06_Failure_Domains.pdf` | Pipeline-backed |
| 18 | A3-EC03-05 | Connectivity State / Reachability | HOW DEVICE/CONNECTIVITY SERVES IT | P4 | `P4_CONNECTIVITY_COMPLETION/ASSEMBLY/019_A3-EC03-05_Connectivity_State_Reachability.pdf` | Pipeline-backed |
| 19 | A3-EC03-08 | Master Device & Connectivity Matrix | HOW DEVICE/CONNECTIVITY SERVES IT | P4 | `P4_CONNECTIVITY_COMPLETION/ASSEMBLY/022_A3-EC03-08_Master_Device_Connectivity_Matrix.pdf` | Pipeline-backed |
| 20 | A3-EC00-04 | Scope & Open Questions | WHAT BEELINE MUST VALIDATE | P5 | `P5_VALIDATION_UNKNOWNS/ASSEMBLY/023_A3-EC00-04_Scope_Open_Questions.pdf` | Pipeline-backed |
| 21 | A3-EC03-09 | TBD With Beeline | WHAT BEELINE MUST VALIDATE | P5 | `P5_VALIDATION_UNKNOWNS/ASSEMBLY/024_A3-EC03-09_TBD_With_Beeline.pdf` | Pipeline-backed — rendered from `v1.1` (60 unmerged STATUS/ANSWER/OWNER/DECISION cells); `v1.0` and `v1.1` layout manifests both on record |
| 22 | A3-EC01-05 | Conflicts, TBDs & Confidence | WHAT REMAINS UNKNOWN | P2 | `P2_CONTEXT_REAL_BUILDING/ASSEMBLY/008_A3-EC01-05_Conflicts_TBDs_Confidence.pdf` | Pipeline-backed |
| 23 | A3-EC01-06 | Site Survey & 3D Readiness Handoff | WHAT REMAINS UNKNOWN | P2 | `P2_CONTEXT_REAL_BUILDING/ASSEMBLY/025_A3-EC01-06_Site_Survey_3D_Readiness_Handoff.pdf` | Pipeline-backed |

## Count reconciliation

- 23 rows above = 23 canonical pages ✅
- 22 rows marked "Pipeline-backed" ✅
- 1 row marked "LEGACY / CONCEPTUAL EXCEPTION" (A3-EC00-02) ✅
- Matches the P6-01G PASS condition exactly (23 / 22 / 1 / 0 unresolved blocking / 0 unresolved non-blocking)

## Observation (non-blocking, logged for awareness)

Assembly PDF numbers 009 and 010 are not assigned to any page in the current
inventory — every other integer from 001 to 025 is accounted for exactly once.
This gap does not affect the 23-page count or the ordering above; it is noted
here only so it isn't mistaken later for a missing page. No action taken.

## What this document does NOT do

- Does not create, modify, delete, or move any of the 23 source Assembly PDFs, or any Drawio, GRAPH_IR, PAGE_SPEC, or SOURCE_EXTRACT.
- Does not alter A3-EC00-02's classification or content.

## Merge status — COMPLETE

The 23 Assembly PDFs listed above were concatenated, in the exact order given (1→23),
into one bound final dossier PDF:

- **Output:** `A3_PRODUCTION/P6_CASE_ASSEMBLY_QA/A3-CASE_FINAL_DOSSIER_v1.0.pdf`
- **Total pages:** 25 (22 of the 23 source PDFs are single-page; A3-EC02-03 — Master Observability Matrix, position 10 — is 3 pages, rendered as "LOGICAL RENDER 1/3, 2/3, 3/3")
- **Method:** direct page-level concatenation (`pypdf`), no page re-rendering, no content alteration — each source PDF's pages are carried through byte-for-byte as embedded page objects
- **Verified:** output page count (25) matches source page counts exactly; page 1 confirmed as A3-EC00-01 (Reference Architecture Overview); final page (25) confirmed as A3-EC01-06 (Site Survey & 3D Readiness Handoff); page 10 confirmed as A3-EC02-03's first of three pages
- **No cover page or section-divider was inserted** — A3-EC00-02's legacy/conceptual exception status is recorded in this order document and in the case's own audit trail (P6-01A–G), not stamped onto the merged PDF itself; flag this if you want it visually marked inside the bound document too
- No source Assembly PDF, Drawio, GRAPH_IR, PAGE_SPEC, or SOURCE_EXTRACT was modified in producing the merge
