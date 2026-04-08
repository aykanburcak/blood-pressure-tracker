# Roadmap: Blood Pressure Tracker

## Milestones

- ✅ **v1.0 Android v1** — Phases 1–5 (shipped **2026-04-06**). [`.planning/milestones/v1.0-ROADMAP.md`](milestones/v1.0-ROADMAP.md).
- ✅ **v1.1 Stitch design alignment** — Phases **6–8** (executed **2026-04-07**). Plans under `.planning/phases/06-*` … `08-*`.
- 🔄 **v1.2 Home pressure trends card** — **Phase 9** (this milestone).
- 📋 **Later** — Backlog in `.planning/REQUIREMENTS.md` (Deferred).

## v1.2 — Active roadmap

| Phase | Name | Goal | Requirements | Success criteria (summary) |
|-------|------|------|--------------|----------------------------|
| **9** | Home pressure trends card | One Home card: avg BP + bar chart + BP-chart bar colors | HOME-01 – HOME-06 | Home shows a single trends card with avg matching chart data; bars colored per band (green = acceptable); sparse/empty states OK; disclaimer still visible; tests or RNTL for color helper if extracted |

### Phase 9 — Home pressure trends card

- **Depends on:** — (reads existing Home + chart + theme)  
- **Delivers:** Refactor `src/app/(tabs)/index.tsx` (and related components, e.g. chart module): merge cards; compute averages over chart readings; Victory/Skia **bar** series; shared `getBpChartBand(systolic, diastolic)` (or equivalent) with documented thresholds from the Blood Pressure Chart; capsule bar styling and sparse x-axis labels aligned to Stitch reference.  
- **Discussion:** Create `.planning/phases/09-home-pressure-trends-card/09-CONTEXT.md` when starting `/gsd-discuss-phase 9`.

**Success criteria (observable):**

1. With ≥2 readings, Home shows **one** card containing average **sys/dia** and a **bar** chart (no separate duplicate latest + chart cards for that content).  
2. Average matches the arithmetic mean of systolic and diastolic over readings included in the chart window (document any cap on N in PLAN).  
3. At least one reading in the “acceptable / normal” band renders a **green** bar; at least one elevated reading renders a non-green bar in dev fixtures or manual check.  
4. Zero or one reading: UI matches **HOME-05** (hint or empty state) without layout regression.  
5. Disclaimer text still appears on Home as required by **HOME-06**.  
6. `tsc` and existing Jest suites pass; add unit tests for band classification if logic is non-trivial.

---

## Next action

**`/gsd-discuss-phase 9`** (optional) → **`/gsd-plan-phase 9`** → execute Phase 9.

---

*Updated: 2026-04-08 — milestone v1.2 roadmap (Phase 9).*
