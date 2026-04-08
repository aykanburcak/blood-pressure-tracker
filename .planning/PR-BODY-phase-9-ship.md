## Summary

**Milestone v1.2 — Phase 9: Home pressure trends card** (on branch `feat/v1.1-stitch-design-alignment`, which also contains **v1.1 Stitch** phases 6–8 work already on this branch).

**Goal:** One Home card with **average** systolic/diastolic (90‑day chart window), WHO interpretation chip on those averages, non-diagnostic disclaimer, and a **bar chart** with fills from the extended **Blood Pressure Chart** bands (`bp-chart-bands`). History keeps the **line** chart.

**Planning:** `.planning/phases/09-home-pressure-trends-card/` (CONTEXT, UI-SPEC, `09-01-PLAN.md`). Formal `09-VERIFICATION.md` is **not** in repo — please run **device UAT** before merge if not already done.

**Implementation highlights:** `listReadingsForChart`-driven Home only; `BpHomeBarChart` uses Victory `CartesianChart` + Skia paths — **one capsule range bar per reading** (diastolic → systolic). `getBpChartBand` / `getBpChartBarColor`; Jest coverage for bands + Home tests.

## Changes (commits ahead of previous remote tip)

| Area | Notes |
|------|--------|
| **v1.2 planning** | `PROJECT.md`, `REQUIREMENTS.md` (HOME-* + BP appendix), `ROADMAP`, `STATE`, Phase 9 discuss/plan docs |
| **Home** | Single `SurfaceCard` (`home-pressure-trends-card`), avg row + chip + sparse/chart + disclaimer |
| **Chart** | `BpHomeBarChart.tsx`, range bars, risk colors |
| **Domain** | `bp-chart-bands.ts` + tests, `averageReadingsForChart`, theme `chartBand*` + copy keys |
| **UI** | `SurfaceCard` optional `testID` |
| **Follow-up** | `feat: refine home and history layouts` (latest tip — layout polish) |

## Requirements addressed

| ID | Description |
|----|-------------|
| **HOME-01** | One primary Home card for summary + chart |
| **HOME-02** | Average matches mean of chart rows (rounded in UI) |
| **HOME-03** | Home bar chart; History unchanged |
| **HOME-04** | Bar color from extended BP chart logic |
| **HOME-05** | Empty / single-reading states in unified card |
| **HOME-06** | Disclaimer on Home when data shows |

See `.planning/REQUIREMENTS.md` (milestone v1.2).

## Verification

- [x] **Automated:** `npx tsc --noEmit` and `npm test` (Jest) green before push.
- [ ] **Human / device:** Home averages, range bar colors vs readings, sparse state, disclaimer; History line chart and any layout tweaks in latest commit.

## Key decisions

- Extended chart colors for **bars**; **WHO** chip text/background unchanged for averages.
- One **range bar** per reading (sys top, dia bottom), not twin side-by-side bars.

---

*PR body for `/gsd-ship` — paste into GitHub when opening the PR. Base branch: `master` (confirm in UI).*

**Compare:** https://github.com/aykanburcak/blood-pressure-tracker/compare/master...feat/v1.1-stitch-design-alignment
