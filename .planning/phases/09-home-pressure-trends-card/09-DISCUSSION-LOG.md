# Phase 9: Home pressure trends card — Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.  
> Decisions are captured in `09-CONTEXT.md`.

**Date:** 2026-04-08  
**Phase:** 9 — Home pressure trends card  
**Mode:** Synthesis (no interactive gray-area menu in session) — decisions locked from milestone requirements, roadmap success criteria, Phase 3 context, and codebase scout.

---

## Roadmap / tooling fix

| Topic | Notes | Outcome |
|-------|--------|---------|
| GSD `init phase-op 9` | ROADMAP used `### Phase 9 — Name`; parser requires `Phase 9:` | Updated `.planning/ROADMAP.md` heading to `### Phase 9: Home pressure trends card` |

---

## Gray areas resolved (synthesis)

### Combined card structure

| Option | Description | Selected |
|--------|-------------|----------|
| A | Single card: avg + chip + bars + disclaimer | ✓ |
| B | Card + separate disclaimer row | |
| C | Disclaimer only below card | |

**User's choice (inherited from milestone):** One primary card including disclaimer when showing data (**D-01**).

---

### Bar encoding (sys/dia)

| Option | Description | Selected |
|--------|-------------|----------|
| A | Two adjacent bars per reading, same risk color | ✓ |
| B | Single bar height = systolic only | |
| C | Floating bar from diastolic to systolic | |

**Rationale:** Preserves pairing (HOME-03) without depending on candlestick support; same color communicates one risk judgment per reading.

---

### Average chip semantics

| Option | Description | Selected |
|--------|-------------|----------|
| A | WHO classification on rounded (avgSys, avgDia) | ✓ |
| B | Extended chart label on averages (new copy) | |

**Rationale:** REQUIREMENTS out-of-scope avoids new WHO strings elsewhere; bars carry extended chart colors; chip stays consistent with app interpretation language (**D-11**).

---

### Chart scope

| Option | Description | Selected |
|--------|-------------|----------|
| A | Home bar chart only; History unchanged | ✓ |
| B | Shared bar chart everywhere | |

**Rationale:** Explicit v1.2 out-of-scope for History/PDF.

---

## the agent's Discretion

Title casing, bar pixel specs, tick formatter details, optional press/tooltip — see CONTEXT **the agent's Discretion**.

## Deferred Ideas

- History/PDF bar charts; interactive bar tooltips — deferred.
