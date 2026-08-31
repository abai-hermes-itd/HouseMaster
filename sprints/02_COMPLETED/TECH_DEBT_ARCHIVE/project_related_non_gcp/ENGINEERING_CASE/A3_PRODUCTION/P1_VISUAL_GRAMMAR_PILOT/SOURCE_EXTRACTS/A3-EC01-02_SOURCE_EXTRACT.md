# A3-EC01-02 — Source Extract (RECONSTRUCTED, P6-01D)

## Reconstruction notice

This file did not exist prior to P6-01D. The original `A3-EC01-02_SOURCE_EXTRACT.md`
referenced by the frozen IR (hash `46632eaf10afb3df5af27fa80831fa3778a35f8c39191b46fe3dff4032d6191b`,
per `A3-EC01-02_v1.0_LAYOUT_MANIFEST.md`) was never found on disk during the
P6-01A forensic audit and is not reconstructable from memory. This document
is instead a **faithful transcription** of the already-approved, already-assembled
output — it introduces no new claims, facts, or interpretation.

Two sources were used, both already part of this repository, neither reread
from upstream EC-01 material:

1. The rendered, approved PDF: `ASSEMBLY\005_A3-EC01-02_SEM-MCD-001_Identity_Geometry_Fact_Sheet.pdf`
   (byte/timestamp-identical to `PDF_REVIEW\A3-EC01-02_v1.1_DRAWIO_REVIEW.drawio.pdf`,
   confirming this PDF is the visual-patch (`v1.1`) render of the frozen `v1.0` IR).
2. `A3-EC01-02_v1.0_LAYOUT_MANIFEST.md` (geometry, tokens, and IR-status record).

Where the manifest's own stated totals (10 facts, 4 claims, 4 guardrails,
6 do-not-imply items) could not be mapped one-for-one to items literally
visible on the approved PDF, that is stated explicitly below rather than
padded to match. No source content is invented.

## Control

- Page: A3-EC01-02
- Title: SEM-MCD-001 Identity & Geometry Fact Sheet
- Stage: P1_VISUAL_GRAMMAR_PILOT
- Source gate: EC-01
- Reference object: SEM-MCD-001
- IR status (per PDF footer and manifest): v1.0 FROZEN (freeze_status: OWNER_APPROVED)
- Source linkage status (per PDF footer): LINKED
- Rendered/assembled version: v1.1 (visual-only patch of the same frozen v1.0 IR — the manifest states its own purpose is "to allow future visual patches to modify the Drawio directly, without re-reading the frozen Evidence IR"; no semantic change between v1.0 and v1.1)
- Related pages (per PDF footer): A3-EC01-01, A3-EC01-03, A3-EC01-04, A3-EC01-06

## Core thesis (verbatim from approved PDF)

"SEM-MCD-001 has a documented building identity and basic geometric facts, while exact footprint geometry remains evidence-limited."

## Status vocabulary shown on page

VERIFIED / DERIVED / PARTIAL / TBD (mixed-status strip, per PDF header)

## Primary semantic unit — Identity & Geometry facts

| # | Field | Value (verbatim) | Status |
|---:|---|---|---|
| 1 | Reference ID (internal, explicitly "not an evidentiary fact") | SEM-MCD-001 | N/A — styled without a status chip per manifest §4 note |
| 2 | Location | г. Семей, пр. Шакарима, 13 «А» | VERIFIED |
| 3 | Cadastral number | 05.252.025.162/543:13а | VERIFIED |
| 4 | BTI case | 209 | VERIFIED |
| 5 | Floors | 9 | VERIFIED |
| 6 | Entrances | 3 | DERIVED |
| 7 | Footprint character | Stepped / non-rectangular footprint character only — no dimension, scale, or area implied | PARTIAL / SCHEMATIC |
| 8 | Exact footprint area | TBD | TBD |
| 9 | Precise footprint dimensions | TBD | TBD |

Reconstruction note: the frozen record states 10 facts. 9 discrete fields are directly
transcribable from the approved PDF (table above). A 10th fact referenced in the
original frozen count could not be independently identified from the PDF or manifest
alone and is not invented here.

## Footprint schematic (per manifest §5, geometry only — not a fact table row)

Five simple rectangles composed into a stepped outline, per manifest coordinates
(mm): `(100,175,40,20)`, `(140,175,15,15)`, `(100,195,55,15)`, `(140,210,15,15)`,
`(100,225,55,20)`. Caption (verbatim, also shown on PDF): "Stepped / non-rectangular
footprint character only — no dimension, scale, or area implied." No dimension
label, scale bar, or area figure is present on or near the shape.

## Evidence rail — three groups (verbatim from approved PDF)

### A. IDENTITY
- SOURCE: EC-01 §3
- WHAT IT SHOWS: Location, cadastral identity, BTI case, floor count
- WHAT IT SUPPORTS: Specific documented building identity
- WHAT IT DOES NOT SUPPORT: Complete building geometry
- CONFIDENCE: HIGH / VERIFIED for directly documented fields

### B. BASIC GEOMETRY
- SOURCE: EC-01 §3/§4 via frozen source extract
- WHAT IT SHOWS: 9 floors; 3 entrances; stepped/non-rectangular footprint character
- WHAT IT SUPPORTS: Basic geometry and building organization
- WHAT IT DOES NOT SUPPORT: Precise footprint dimensions or area
- CONFIDENCE: Mixed — VERIFIED / DERIVED / PARTIAL

### C. UNRESOLVED GEOMETRY
- WHAT IT SHOWS: Evidence gap
- WHAT IT SUPPORTS: Explicitly unresolved exact footprint geometry
- WHAT IT DOES NOT SUPPORT: Exact area; exact dimensions
- CONFIDENCE: TBD
- TBD items: Exact footprint area; precise footprint dimensions

Reconstruction note: the frozen record states 4 "claims." The 3 evidence-group
"WHAT IT SUPPORTS" statements above (A/B/C) are directly visible. A 4th claim
referenced in the original count could not be independently identified from the
PDF or manifest alone and is not invented here.

## Guardrails (verbatim from approved PDF — exactly 4, matches frozen record count)

1. DOCUMENTED IDENTITY ≠ COMPLETE GEOMETRY
2. FOOTPRINT SHAPE ≠ EXACT DIMENSIONS
3. VISUAL REALISM ≠ EVIDENCE CERTAINTY
4. PARTIAL ≠ VERIFIED

## Do-not-imply items (verbatim / directly derived from approved PDF)

1. Complete building geometry is not supported (group A).
2. Precise footprint dimensions or area is not supported (group B).
3. Exact area is not supported (group C).
4. Exact dimensions is not supported (group C).
5. No dimension is implied by the footprint schematic (caption).
6. No scale is implied by the footprint schematic (caption).

This enumeration reaches 6 items and is consistent with the frozen record's
stated count of 6 do-not-imply items.

## Provenance

- PAGE: A3-EC01-02
- SOURCE GATE: EC-01
- SOURCE: A3-EC01-02_SOURCE_EXTRACT.md (this file — reconstructed; original not recoverable)
- IR: v1.0 FROZEN
- SOURCE LINKAGE: LINKED
- EVIDENCE: VERIFIED / DERIVED / PARTIAL / TBD
- REFERENCE OBJECT: SEM-MCD-001
- RELATED: A3-EC01-01, A3-EC01-03, A3-EC01-04, A3-EC01-06

`NEXT GATE = SEMANTIC REVIEW (RECONSTRUCTED CHAIN)`
