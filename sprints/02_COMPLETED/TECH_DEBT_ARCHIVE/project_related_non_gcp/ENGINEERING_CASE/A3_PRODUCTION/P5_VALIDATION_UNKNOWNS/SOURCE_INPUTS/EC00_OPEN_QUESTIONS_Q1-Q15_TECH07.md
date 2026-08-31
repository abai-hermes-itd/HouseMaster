# JOINT TECHNICAL VALIDATION — OPEN QUESTIONS

Operator Inputs Required to Convert the Reference Architecture into a Validated Pilot Architecture

Вопросы для совместной технической валидации HouseMaster × Beeline

## HOW TO USE THIS PAGE

HouseMaster Technical Integration Pack describes a reference integration architecture, not the assumed internal architecture of Beeline.

Operator-side components, interfaces, constraints and operational parameters that cannot be reliably defined without Beeline input are intentionally marked TBD WITH BEELINE.

Questions Q1–Q15 are used to validate these areas jointly.

They do not require Beeline to confirm the proposed model.

For each question, Beeline may confirm the reference assumption, propose an alternative mechanism, identify a constraint, or determine that the capability is not required for the pilot.

The objective is not to document the entire internal Beeline infrastructure.

The objective is to identify the minimum integration surface required for a safe, manageable and technically validated HouseMaster × Beeline pilot.

## VALIDATION / DECISION MODEL

Four possible outcomes per question:

CONFIRM — Reference model applies.

REPLACE — Use Beeline actual / alternative mechanism.

CONSTRAIN — Apply technical / security / operational limit.

REMOVE — Not used in pilot.

These are architecture-validation outcomes, not commercial statuses.

## TBD WITH BEELINE

TBD WITH BEELINE means:

Operator-specific implementation detail requiring validation with Beeline.

It does NOT mean:

- architecture error
- missing HouseMaster design
- assumed Beeline capability
- commitment by Beeline

## BEELINE INFORMATION BOUNDARY

Beeline is not being asked to disclose its entire internal network or platform architecture.

Only information required to validate the agreed integration surface is needed.

---

# Q1–Q8 — TECH-01, TECH-02, TECH-03

## TECH-01 Connectivity / Signal Path

### Q1
What IoT/M2M connectivity models can Beeline support for a Connected Building pilot?

DECISION: TBD
OWNER / NOTE: ______________________

### Q2
Which transport options and connectivity-state events can be exposed to an external domain platform such as HouseMaster?

DECISION: TBD
OWNER / NOTE: ______________________

### Q3
What network-side constraints should be assumed for basement, technical-room and other difficult indoor MCD environments?

DECISION: TBD
OWNER / NOTE: ______________________

## TECH-02 Identity / Lifecycle

### Q4
Which SIM/eSIM/M2M identity objects and lifecycle states can Beeline expose to HouseMaster?

DECISION: TBD
OWNER / NOTE: ______________________

### Q5
What provisioning, activation, suspension, replacement and deactivation interfaces are available or feasible?

DECISION: TBD
OWNER / NOTE: ______________________

## TECH-03 API / Data

### Q6
Which operator APIs, events or integration interfaces are available for connectivity management and telemetry/event exchange?

DECISION: TBD
OWNER / NOTE: ______________________

### Q7
Which data objects may cross the Beeline ↔ HouseMaster boundary, and what restrictions apply?

DECISION: TBD
OWNER / NOTE: ______________________

### Q8
Which interaction model is preferred: synchronous API, asynchronous events, webhook/callback, message transport, or another operator-approved mechanism?

DECISION: TBD
OWNER / NOTE: ______________________

---

# Q9–Q15 — TECH-04, TECH-05, TECH-06, TECH-07

## TECH-04 Security / Trust

### Q9
What authentication, authorization and trust model would Beeline require for HouseMaster integration?

DECISION: TBD
OWNER / NOTE: ______________________

### Q10
What security, audit, logging, credential and incident-response requirements must the pilot satisfy?

DECISION: TBD
OWNER / NOTE: ______________________

## TECH-05 Deployment / Cloud

### Q11
What infrastructure or cloud role, if any, should Beeline play in the pilot architecture?

DECISION: TBD
OWNER / NOTE: ______________________

### Q12
What Kazakhstan data-residency, resilience, backup, DR and deployment constraints should be incorporated into the validated architecture?

DECISION: TBD
OWNER / NOTE: ______________________

## TECH-06 Operations / SLA

### Q13
How should operational responsibility be divided between Beeline connectivity operations and HouseMaster building-domain operations?

DECISION: TBD
OWNER / NOTE: ______________________

### Q14
What incident, escalation, observability, support and SLA/SLO interfaces can be agreed for the pilot?

DECISION: TBD
OWNER / NOTE: ______________________

## TECH-07 Pilot

### Q15
What minimum pilot scope, technical acceptance criteria, participants and duration would Beeline consider sufficient to make a scale-up decision?

DECISION: TBD
OWNER / NOTE: ______________________

---

## TECH-08A — End-to-End Integration Topology

Operator-specific nodes marked [TBD WITH BEELINE] in TECH-08A are resolved through the relevant Q1–Q15 validation tracks.

REFERENCE ARCHITECTURE ≠ BEELINE INTERNAL ARCHITECTURE

VALIDATED PILOT ARCHITECTURE ≠ PRODUCTION ARCHITECTURE

## VALIDATION PIPELINE

HOUSEMASTER REFERENCE ARCHITECTURE
+
BEELINE TECHNICAL INPUT
→
JOINT VALIDATION
→
VALIDATED PILOT ARCHITECTURE

TBD
→
CONFIRM / REPLACE / CONSTRAIN / REMOVE
→
PILOT DESIGN

## EXPECTED OUTPUT — after the Joint Technical Validation session

- Confirmed integration capabilities
- Agreed alternative mechanisms
- Documented technical constraints
- Removed out-of-scope assumptions
- Assigned unresolved TBDs
- Validated integration surface
- Inputs for Pilot Architecture v0.1
