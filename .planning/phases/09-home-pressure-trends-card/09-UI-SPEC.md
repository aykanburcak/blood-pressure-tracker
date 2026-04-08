# Phase 9: Home pressure trends card — UI-SPEC

**Status:** Design contract for planning / execution  
**References:** `09-CONTEXT.md`, Stitch combined-card mock, `.planning/REQUIREMENTS.md` (HOME-* + BP appendix)

## Card container

- Single `SurfaceCard` `padded="lg"`, same elevation rhythm as current Home hero.
- **testID:** `home-pressure-trends-card` on the outer card wrapper.

## Header row

- **Title:** `copy.pressureTrendsSectionTitle` — short, uppercase or letter-spaced label (`typography.label` + `colors.textSecondary`), e.g. **PRESSURE TRENDS** styling intent (exact string in `tokens.ts` `copy`).
- **Layout:** Title on first line; below it a **row** with primary average on the left, optional chip on the right (flex row, `alignItems: 'center'`, `justifyContent: 'space-between'`).

## Average block

- **Numbers:** `Math.round(avgSystolic) / Math.round(avgDiastolic)` in `typography.display` / `colors.textPrimary`, same visual weight as current hero BP.
- **Suffix:** `mmHg` under or beside average using `typography.label` + `colors.textSecondary`.
- **Avg label:** Small **“Avg”** (`copy.pressureTrendsAvgLabel`) next to the fraction or right-aligned in the number row per Stitch mock.

## Status chip

- WHO `classifyBloodPressure(round(avgSys), round(avgDia))` + existing chip text + `getInterpretationChipBackground` — no new label system.

## Chart region

- **Sparse (<2 points in series):** skeleton lines + `copy.trendPreviewHint` inside the same card (reuse current skeleton styles).
- **Ok (≥2 points):** compact height ≈ **160** dp (match current `BpTrendChart` compact).
- **Bars:** Two slim vertical bars per reading, **rounded top** (`roundedCorners` top-only where API allows); shared fill from `getBpChartBarFill` for that reading.
- **Y-axis:** mmHg, low clutter; **X-axis:** sparse date labels (e.g. ≤4 ticks across domain).

## Disclaimer

- Full `INTERPRETATION_DISCLAIMER` below chart block, `typography.body` + `colors.textSecondary`, same copy as today.

## Screen order

- `ScreenTitle` → **combined card** → `PrimaryButton` Add reading → `copy.homeLocalCardBody` footnote.

## Chart colors (semantic)

| Band (product) | Token key (add to `semantic`) | Notes |
|----------------|------------------------------|--------|
| Green family (low / normal / high normal) | `chartBandNormal` | Single fill for all three “acceptable” rows |
| Pre-hypertension | `chartBandPreHypertension` | Yellow family |
| Stage 1–2 | `chartBandStage1`, `chartBandStage2` | Distinct oranges |
| Stage 3–4 | `chartBandStage3`, `chartBandStage4` | Darker orange / red-orange |
| Crisis | `chartBandCrisis` | Red |
| Hypotension (moderate → extreme) | `chartBandHypoModerate`, `chartBandHypoSevere`, `chartBandHypoExtreme` | Light → dark blue |

Executor maps appendix rows → enum → one of the above keys; exact hexes chosen for contrast on `surfaceContainerLowest` card interior.

## Out of scope (this spec)

- Pulse line on Home; History chart; PDF.
