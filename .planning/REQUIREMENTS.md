# Requirements: Blood Pressure Tracker

**Milestone v1.2 — Home pressure trends card**  
**Core value:** Logging and understanding a blood pressure reading should feel instant, private, and visually clear.

**Visual references:** Combined card layout (avg + bars); internal **Blood Pressure Chart** for bar colors (greens = acceptable/normal band; graded blues / yellow–orange–red for other bands).

## Shipped baseline

- **v1.0:** [`.planning/milestones/v1.0-REQUIREMENTS.md`](milestones/v1.0-REQUIREMENTS.md) — CORE, LOG, HIST, INTP, TRND, EXPT, PRIV.
- **v1.1:** Design system + shell (DS-01–DS-10) — executed in phases 6–8; see `.planning/phases/06-*` … `08-*` and traceability table in milestone snapshot when archived.

## Milestone v1.2 — Active

### Home — combined trends card (HOME)

- [ ] **HOME-01:** On Home, when the app shows trend data, the user sees **one** primary card that combines the former “latest reading” summary area and the “blood pressure over time” chart (no separate stacked card pair for that content).
- [ ] **HOME-02:** The card headline shows **average** systolic and diastolic (mmHg) for the **same set of readings** represented in the chart (or the same time window), with an “Avg” (or equivalent) label per design reference; units shown clearly.
- [ ] **HOME-03:** The chart in this card is a **bar chart** (not a dual line chart). Each bar corresponds to a **single saved reading** (or, if bucketing is required for density, requirements in the phase plan must state the aggregation rule; default is one bar per reading in the window). Paired systolic/diastolic values remain derivable from the underlying reading (e.g. tooltip, bar encoding, or legend — specified in plan).
- [ ] **HOME-04:** Each bar’s fill color reflects that reading’s **risk band** using the product **Blood Pressure Chart** categories (hypotension blues, normal / acceptable **green**, pre-hypertension yellow, stage 1–4 / crisis orange–red). **Green** applies when the reading falls in the designated acceptable/normal bands (systolic and diastolic within the green-eligible ranges from the chart). When systolic and diastolic imply different bands, use the **more severe** band for color.
- [ ] **HOME-05:** **Sparse / empty states** remain understandable: if there are fewer than two readings (or existing app threshold), the Home surface shows appropriate empty or hint UI **inside** the unified card layout (or a single empty card), not a broken split between two cards.
- [ ] **HOME-06:** **Non-diagnostic** copy remains present on Home where the product already surfaces it (wording may reflow with layout merge; must not remove the medical-boundary message).

## Deferred (not v1.2)

Engagement (reminders, notes), Health Connect, app lock, sync — unchanged backlog; promote in a later milestone.

## Appendix: Blood Pressure Chart bands (for HOME-04)

Discrete bands for **bar fill** (both systolic **S** and diastolic **D** must be evaluated; use **most severe** band when they disagree). Eligibility for **green** = reading falls in one of the **Normal blood pressure** rows below (product “acceptable” band).

| Band (visual) | Systolic (mmHg) | Diastolic (mmHg) |
|----------------|-----------------|------------------|
| Crisis — red | >210 | >120 |
| Stage 4 (label per spec) | 180–210 | 110–120 |
| Stage 3 | 160–179 | 100–109 |
| Stage 2 | 140–159 | 90–99 |
| Pre-hypertension — yellow | 130–139 | 85–89 |
| High normal — light green* | 121–129 | 81–84 |
| Normal / ideal — green* | 100–120 | 65–80 |
| Low normal — teal/cyan* | 90–99 | 60–64 |
| Moderate hypotension — light blue | 70–89 | 40–59 |
| Severe hypotension — medium blue | 50–69 | 35–39 |
| Extreme hypotension — dark blue | <50 | <35 |

\*Treat the three “normal blood pressure” rows as **green-family** fills for **HOME-04** (exact hexes in tokens / UI-SPEC). Boundary rules (inclusive/exclusive endpoints) must be defined once in code and covered by unit tests.

## Out of scope (v1.2)

- Changing **WHO** category **labels** or thresholds used for interpretation **chips** / PDF **clinical** strings (unless an explicit follow-up milestone merges WHO with the extended chart — not in v1.2).
- Replacing History screen chart, PDF charts, or export layout (Home-only unless a small shared helper is extracted).
- New data fields or backend.

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| HOME-01 – HOME-06 | 9 | Shipped in app (`09-01-PLAN` executed 2026-04-08) |

---

*Defined: 2026-04-08 — `/gsd-new-milestone` v1.2*  
*Last updated: 2026-04-08 — roadmap created (Phase 9)*
