# A3-EC01-01 — Page Spec

## Control

- Page ID: `A3-EC01-01`
- Title: `Reference Building / Evidence Anchor`
- Stage: `P2_CONTEXT_REAL_BUILDING`
- Production No.: `P2-03`
- Case Assembly No.: `004`
- IR type: `GRAPH / EVIDENCE-ANCHOR LOGIC`
- Page spec status: `PAGE_SPEC_READY`
- Owner approval: `APPROVED FOR VISUAL COMPILATION`
- Graph ID: `A3-EC01-01-EVIDENCE-ANCHOR`

## Page purpose

Show why `SEM-MCD-001 — Semey, Shakarima 13A` is the real-building evidence anchor for the HouseMaster × Beeline architecture: documented facts, source references, confidence, explicit unknowns, site validation, semantic modeling, connectivity/integration design, and repeatability must remain connected without promoting assumptions into engineering truth.

## Canonical page thesis

`SEM-MCD-001` is a source-backed real-building reference, not a generic template. It can support a repeatable MCD pattern only when building-specific evidence, provenance, validation status, and unresolved items remain visible.

## Primary visual

An evidence-anchor graph dominated by this chain:

`SEM-MCD-001 → REAL BUILDING → SOURCE-BACKED FACTS → EXPLICIT UNKNOWNS → SITE VALIDATION → SEMANTIC BUILDING MODEL → CONNECTIVITY / INTEGRATION DESIGN → REPEATABLE MCD PATTERN`

The chain must not imply that each stage is complete. Status tokens must remain visible.

## Required supporting logic

### Provenance rail

`CLAIM → SOURCE REFERENCE → CONFIDENCE → VALIDATION STATUS`

The provenance rail is a gate into the semantic building model. Visual rendering must not raise confidence or close TBD items.

### Observation and connectivity candidates

`REAL BUILDING → OBSERVATION-POINT CANDIDATES → DEVICE CANDIDATES`

Then show equal-status alternatives:

- `DIRECT CONNECTIVITY — PLAUSIBLE / NOT SELECTED`
- `EDGE AGGREGATION — PLAUSIBLE / NOT SELECTED`

Candidate devices and observation points are conceptual and unresolved. No installed device, component location, RF condition, SIM assignment, local protocol, or topology may be inferred.

### Validation inputs

- Site survey / inspection closes only evidence-backed items.
- Photo / documentary validation retains object context, timestamp, actor/source, and attachment provenance where available.
- Missing provenance remains `TBD`.
- 3D / semantic mapping is representational and evidence-constrained; it is not verified as-built geometry.

### Failure / risk interpretation

Connectivity and integration signals may inform rule-gated interpretation but cannot prove engineering component failure or building condition. Failure/risk interpretation remains subordinate to HouseMaster evidence and domain rules.

## Reference anchor content

Show prominently:

- `SEM-MCD-001`
- `Semey, Shakarima 13A — VERIFIED`
- `HouseMaster reference ID — ASSIGNED`
- `REAL BUILDING / PHYSICAL SOURCE OF ENGINEERING REALITY`

Do not make the assigned ID look like a BTI or cadastral fact.

## Fact and unknown registers

### Verified facts

Render or summarize exactly `10` verified facts from the frozen semantic package:

- address;
- cadastral number documented;
- BTI case 209;
- 9 storeys;
- existence of heating, cold water, hot water, sewer, power, and lifts.

### Open / TBD items

Render or summarize exactly `12` open/TBD items:

- exact footprint;
- full stepped geometry/dimensions;
- HEAT-03 no evidence;
- apartment-count conflict;
- land-letter mismatch;
- basement/technical spaces;
- engineering-node/component locations;
- observation/device locations and installation constraints;
- connectivity feasibility;
- facade/elevations;
- inventory number/year confirmation;
- source-register content.

## Area taxonomy panel

Area taxonomy must be subordinate to the main graph:

- `1,248 m²` — Total Useful Building Area — `ASSIGNED`;
- `550 m²` — Common/Shared Building Area — `ASSIGNED`;
- `6,403.80 m²` — cadastral Building Area — `VERIFIED`;
- `≈15,020 m²` — Adjacent/Associated Territory — `PARTIAL`.

Display the rule: `AREA TAXONOMY ≠ BUILDING FOOTPRINT`.

## System-existence note

Keep compact and subordinate:

- systems: `9`;
- existence: `VERIFIED 6 / PARTIAL 1 / TBD 2`;
- specific component/node locations: `TBD 9`;
- confirmed component/node locations: `0`.

Display the rule: `SYSTEM EXISTS ≠ COMPONENT LOCATION KNOWN`.

## Generic-template distinction

Include a visually explicit comparison:

`VALIDATED REFERENCE BUILDING ≠ GENERIC TEMPLATE`

The generic-template node must read as an insufficient shortcut. It must not visually generate the repeatable pattern without the SEM-MCD-001 evidence, provenance, unknown, and validation chain.

## Required guardrails

1. `REAL BUILDING ≠ GENERIC TEMPLATE`
   - SEM-MCD-001 is the validation anchor, not universal geometry.
2. `VISUAL REALISM ≠ VERIFIED DATA`
   - Rendering quality or apparent realism cannot promote evidence confidence.
3. `UNKNOWN ≠ ABSENT`
   - TBD or unresolved component, geometry, or location information does not prove that the physical entity does not exist.
4. `3D GEOMETRY ≠ SOURCE OF TRUTH`
   - 3D or semantic representation remains constrained by evidence and provenance.
5. `REPEATABLE PATTERN ≠ IDENTICAL BUILDINGS`
   - Validated architectural learning may generalize without asserting that other MCDs have identical geometry, systems, topology, or installation constraints.

Secondary rules / notes, excluded from the canonical guardrail count:

- `AREA TAXONOMY ≠ BUILDING FOOTPRINT`
- `SYSTEM EXISTS ≠ COMPONENT LOCATION KNOWN`
- `CANDIDATE DEVICE / OBSERVATION POINT ≠ INSTALLED DEVICE`

## Counts to preserve

- Nodes: `22`
- Edges: `28`
- Guardrails: `5`
- Verified facts: `10`
- Open/TBD items: `12`

## Visual hierarchy for later compilation

1. SEM-MCD-001 anchor and main evidence-to-repeatability chain.
2. Provenance rail and explicit-unknown validation gate.
3. Observation/device and Direct/Edge candidate branches.
4. Area taxonomy, system-existence note, and failure/risk interpretation.
5. Guardrail band and status/provenance footer.

No network topology, building plan, 3D object, installed-device placement, or selected connectivity pattern is specified by this page spec.

## Status and provenance

- Architecture role: `REFERENCE BUILDING / EVIDENCE ANCHOR`
- Page semantics: `REVIEW`
- SEM-MCD-001 included: `YES`
- Provenance model included: `YES`
- Generic-template distinction included: `YES`
- Source read outside required EC-01 context: `NO`
- Drawio created: `0`
- PDF created: `0`
