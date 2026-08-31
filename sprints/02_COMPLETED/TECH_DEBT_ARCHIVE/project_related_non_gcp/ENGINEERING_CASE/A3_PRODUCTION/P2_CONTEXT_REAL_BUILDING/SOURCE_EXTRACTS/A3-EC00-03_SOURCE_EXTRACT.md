# A3-EC00-03 — SOURCE EXTRACT

## Control

- Page: `A3-EC00-03`
- Stage: `P2_CONTEXT_REAL_BUILDING`
- Production number: `P2-02`
- Case assembly number: `003`
- IR type: `REGISTER / AXIOM SYSTEM`
- Status: `REVIEW`
- Reference: `SEM-MCD-001 — Semey, Shakarima 13A`

## EC-00 source-linkage condition

The A3-P0 registry defines A3-EC00-03 as the canonical Architecture Axioms page and states that ten recurring axioms govern the architecture. Its intended TECH-08 primary source remains `SOURCE LINKAGE PENDING` because the primary EC-00 artifact is not located in the current workspace.

This extract therefore uses only the minimum linked and owner-approved Engineering Case material that directly supports each axiom. It does not claim review of the missing TECH-08 artifact.

## Minimum source set used

1. `A3-P0_PAGE_REGISTRY_v0.4_REVIEW.md`
   - A3-EC00-03 definition, ten-axiom purpose and `SOURCE LINKAGE PENDING`
2. `EC-02_PHYSICAL_TO_OBSERVATION_SEM-MCD-001_v0.3_REVIEW.md`
   - §4a Observation Architecture and Channel B independence
3. `EC-03_DEVICE_CONNECTIVITY_SEM-MCD-001_v0.3_REVIEW.md`
   - §3 identity/connectivity principles
   - §9a Beeline/HouseMaster responsibility boundary
   - §22 device/connectivity/engineering interpretation guardrails
4. `A3-P0_CASE_DESIGN_SYSTEM_v0.4_REVIEW.md`
   - §11 HouseMaster, Beeline, trust-boundary and ALAU AI roles
5. Owner-approved frozen `A3-EC00-01_GRAPH_IR.yaml`
   - BC-03 acceptance semantics and seven frozen architecture guardrails

No unrelated Engineering Case source was reopened.

## Source-supported axioms

### A. STATE SEPARATION

#### AX-01 — CONNECTIVITY STATE ≠ ENGINEERING STATE

- Why: connectivity/reachability says whether a path responds; engineering state requires domain evidence and interpretation.
- Prevents: treating reachability, degradation or restoration as component/building condition.
- Operational consequence: HouseMaster stores connectivity state separately from engineering state and does not close/open engineering findings from connectivity alone.
- Source: EC-03 §§21–22; frozen A3-EC00-01 guardrails.

#### AX-02 — NETWORK HEALTH ≠ BUILDING HEALTH

- Why: operator/network availability and physical-building condition are different domains.
- Prevents: declaring a building healthy because the network is healthy, or failed because the network is unavailable.
- Operational consequence: network telemetry may qualify data availability but never substitutes for engineering evidence.
- Source: EC-03 §22; frozen A3-EC00-01 guardrails.

#### AX-08 — DEVICE OFFLINE ≠ COMPONENT FAILED

- Why: device silence may originate in device, power, local edge or connectivity failure and does not identify physical-component state.
- Prevents: false engineering-failure inference from missing telemetry.
- Operational consequence: create an observation/evidence gap and investigate root cause; do not create a component defect automatically.
- Source: EC-03 §22.

### B. IDENTITY SEPARATION

#### AX-03 — DEVICE IDENTITY ≠ SIM IDENTITY

- Why: HouseMaster internal device/domain identity must remain independent from operator SIM/eSIM identity.
- Prevents: loss of engineering history or domain identity when SIM/device connectivity identifiers change.
- Operational consequence: map connectivity identity to HouseMaster identity; never derive HouseMaster IDs from SIM identifiers.
- Source: EC-03 §3; frozen A3-EC00-01 guardrails.

### C. EVIDENCE / ENGINEERING TRUTH

#### AX-04 — OBSERVATION ≠ EVIDENCE ≠ DEFECT

- Why: an observation becomes evidence only with adequate context/provenance, and evidence supports a defect only through domain rules/professional validation.
- Prevents: raw signal, note or photo being treated as a verified defect.
- Operational consequence: preserve explicit acceptance, provenance and engineering-validation gates.
- Source: EC-02 §4a; frozen A3-EC00-01 guardrails.

#### AX-05 — AI SIGNAL ≠ ENGINEERING FACT

- Why: ALAU AI is downstream decision-support, not the engineering system of record or truth source.
- Prevents: model output from overwriting evidence-backed HouseMaster state.
- Operational consequence: store AI signals separately and require evidence/domain validation before any engineering-state change.
- Source: A3-P0 §11; frozen A3-EC00-01 guardrails.

#### AX-09 — HUMAN EVIDENCE ≠ MACHINE DEPENDENCE

- Why: EC-02 Channel B remains available through HouseMaster PWA independently of Channel A, Beeline connectivity or device procurement.
- Prevents: architecture diagrams and operations from treating all evidence as IoT-generated.
- Operational consequence: maintain a direct human/documentary evidence path into HouseMaster acceptance with provenance requirements.
- Source: EC-02 §4a.3; frozen A3-EC00-01 human/documentary bypass.

### D. AUTHORITY / OWNERSHIP

#### AX-06 — AI RECOMMENDATION ≠ AUTHORIZED DECISION

- Why: analytics/prediction may advise but does not possess engineering-control authority by default.
- Prevents: autonomous action or workflow state change from an AI recommendation alone.
- Operational consequence: route recommendations through a human or otherwise authorized decision/workflow gate.
- Source: A3-P0 §11; frozen A3-EC00-01 guardrails and downstream boundary.

#### AX-07 — HOSTING ≠ DOMAIN OWNERSHIP

- Why: infrastructure placement/connectivity/hosting does not transfer HouseMaster's engineering-domain responsibility.
- Prevents: Beeline or another hosting provider being treated as owner of HouseMaster identities, evidence, state, history or workflow.
- Operational consequence: preserve HouseMaster as independent system of record in contracts, schemas and responsibility models.
- Source: A3-P0 §11; EC-03 §9a; frozen A3-EC00-01 guardrails.

#### AX-10 — HOUSEMASTER DOMAIN ACCEPTANCE ≠ OWNERSHIP TRANSFER

- Why: the trust/integration boundary admits or creates a canonical HouseMaster record where acceptance rules pass; this is not transfer of domain ownership.
- Prevents: boundary crossing being interpreted as Beeline ownership surrender/assumption or external ownership of HouseMaster domain records.
- Operational consequence: `housemaster_domain_acceptance = true`; `canonical_domain_record_created_where_acceptance_rules_pass = true`; `ownership_transfer = false`.
- Source: owner-approved frozen A3-EC00-01 BC-03; EC-03 §9a.

## Architecture consequence by domain

### REAL BUILDING

- Physical source of engineering reality.
- Physical condition is not created by connectivity, HouseMaster or AI.

### BEELINE

- Connectivity / IoT-M2M / SIM-eSIM / operator transport.
- Connectivity state where exposed.
- Not HouseMaster engineering-domain owner.
- Not building-condition authority.

### HOUSEMASTER

- Independent domain system of record.
- Owns domain identities, observation/evidence state, engineering state, history and workflow.
- Accepts, validates and maps data at the trust/integration boundary.

### ALAU AI

- Downstream intelligence, prediction and decision-support.
- Not system of record, engineering-truth source or autonomous-control authority.

### HUMAN / DOCUMENTARY CHANNEL

- Can create evidence-bearing input without Beeline connectivity.
- Requires context/provenance and must not be rendered as IoT-dependent.

## Duplicate check

- Canonical statements compared by normalized wording: `0 duplicates`.
- No axiom is repeated under multiple IDs.
- Family membership is single-valued: each axiom belongs to exactly one of four groups.

## Explicit exclusions

- No network topology or implementation flow.
- No Beeline product, API/schema, SLA, installed device or engineering fact is invented.
- No autonomous ALAU AI authority or HouseMaster ownership transfer is introduced.
- No Drawio, PDF or 3D artifact is created.

