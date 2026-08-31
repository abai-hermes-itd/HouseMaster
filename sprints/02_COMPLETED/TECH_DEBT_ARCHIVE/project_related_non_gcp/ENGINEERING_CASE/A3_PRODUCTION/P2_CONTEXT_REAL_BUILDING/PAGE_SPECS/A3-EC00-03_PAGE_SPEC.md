# A3-EC00-03 — PAGE SPEC

## Control

- Page ID: `A3-EC00-03`
- Title: `Architecture Axioms`
- Stage: `P2_CONTEXT_REAL_BUILDING`
- Production number: `P2-02`
- Case assembly number: `003`
- IR type: `REGISTER / AXIOM SYSTEM`
- Page spec status: `PAGE_SPEC_READY`
- Owner approval: `APPROVED FOR VISUAL COMPILATION`
- Semantic source: `A3-EC00-03_GRAPH_IR.yaml`
- EC-00 primary source linkage: `SOURCE LINKAGE PENDING`
- Reference: `SEM-MCD-001 — Semey, Shakarima 13A`

## Purpose

Provide a workshop-ready reference register of the non-negotiable architecture separations governing connectivity, identity, evidence, engineering truth, authority and domain ownership.

## Canonical thesis

Connectivity, identity, observation, evidence, engineering state, ownership and AI authority are separate semantic concerns; no infrastructure or analytical layer may silently inherit HouseMaster engineering-domain authority.

## Primary visual — axiom register

Required columns:

1. `AXIOM`
2. `SEPARATION / RULE`
3. `WHAT IT PREVENTS`
4. `OPERATIONAL CONSEQUENCE`

Each row must remain individually addressable by stable ID `AX-01…AX-10` and must use the exact canonical statement from the Graph IR.

## Grouping

Render four non-overlapping semantic families:

### A. STATE SEPARATION

- AX-01 `CONNECTIVITY STATE ≠ ENGINEERING STATE`
- AX-02 `NETWORK HEALTH ≠ BUILDING HEALTH`
- AX-08 `DEVICE OFFLINE ≠ COMPONENT FAILED`

### B. IDENTITY SEPARATION

- AX-03 `DEVICE IDENTITY ≠ SIM IDENTITY`

### C. EVIDENCE / ENGINEERING TRUTH

- AX-04 `OBSERVATION ≠ EVIDENCE ≠ DEFECT`
- AX-05 `AI SIGNAL ≠ ENGINEERING FACT`
- AX-09 `HUMAN EVIDENCE ≠ MACHINE DEPENDENCE`

### D. AUTHORITY / OWNERSHIP

- AX-06 `AI RECOMMENDATION ≠ AUTHORIZED DECISION`
- AX-07 `HOSTING ≠ DOMAIN OWNERSHIP`
- AX-10 `HOUSEMASTER DOMAIN ACCEPTANCE ≠ OWNERSHIP TRANSFER`

Do not repeat an axiom in more than one group.

## Secondary visual — architecture consequence by domain

Show five responsibility cards:

### REAL BUILDING

- Physical source of engineering reality.
- Physical condition is not software, connectivity or AI state.

### BEELINE

- Connectivity / IoT-M2M / SIM-eSIM / operator transport.
- Connectivity state where exposed.
- Not HouseMaster engineering-domain owner.
- Not building-condition authority.

### HOUSEMASTER

- Independent domain system of record.
- Owns domain identities, observation/evidence state, engineering state, history and workflow.
- Accepts, validates and maps input at the trust/integration boundary.

### ALAU AI

- Downstream intelligence / prediction / decision-support.
- Not system of record, engineering-truth source or autonomous-control authority.

### HUMAN / DOCUMENTARY CHANNEL

- May create evidence-bearing input without Beeline connectivity.
- Must not be shown as dependent on IoT.
- Remains subject to provenance and HouseMaster acceptance rules.

## Required AX-10 operational note

Display compactly and exactly:

- `housemaster_domain_acceptance = true`
- `canonical_domain_record_created_where_acceptance_rules_pass = true`
- `ownership_transfer = false`

## Status / provenance

- Axiom register status: `PROPOSED / CONCEPTUAL — REVIEW`
- EC-00 primary TECH-08 source linkage: `SOURCE LINKAGE PENDING`
- AX-08 source support: `EC-03 §22`
- AX-09 source support: `EC-02 §4a.3`
- AX-10 source support: `OWNER-APPROVED FROZEN BC-03`
- Duplicate canonical statements: `0`

## Readability requirements

- A3 landscape.
- Axiom register is the dominant visual.
- Domain-consequence cards are secondary and must not displace register readability.
- Preserve table typography at or above A3-P0 minimum.
- Use group bands only for semantic family; do not use color as evidence confidence.
- Make axiom IDs and canonical statements scannable during workshop discussion.

## Rendering exclusions for the next gate

- No network topology or implementation data flow.
- No Beeline product, API/schema, SLA, installed device or invented engineering fact.
- No autonomous-control arrow or implied HouseMaster ownership transfer.
- No Drawio or PDF until semantic review/freeze.

## Counts

- Axioms: `10`
- Groups: `4`
- Domain consequences: `5`
- Duplicate axioms found: `NO`
- SEM-MCD-001 referenced: `YES`
