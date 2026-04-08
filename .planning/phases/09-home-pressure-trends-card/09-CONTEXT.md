# Phase 9: Home pressure trends card — Context

**Gathered:** 2026-04-08  
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver a **single Home card** that replaces the current **two-card** layout (latest-reading hero + separate trend card) when trend data is relevant: show **average** systolic/diastolic for the same readings as the chart, a **bar** chart (not a line chart) on Home, and **per-reading bar colors** from the extended **Blood Pressure Chart** in `.planning/REQUIREMENTS.md` (HOME-04 appendix). Preserve sparse/empty behavior and **INTERPRETATION_DISCLAIMER** visibility (**HOME-06**). **Do not** change History’s line chart, PDF, or WHO threshold strings for other surfaces (v1.2 out-of-scope).

</domain>

<decisions>
## Implementation Decisions

### Layout and data (HOME-01, HOME-02, HOME-05)
- **D-01:** **One** `SurfaceCard` (or equivalent) contains: (a) section title for the combined block, (b) **average** `sys/dia` + **mmHg** + an **“Avg”** (or equivalent) label matching the Stitch-style reference, (c) optional **interpretation chip** tied to the averages (see **D-11**), (d) chart area, (e) **INTERPRETATION_DISCLAIMER** remains in this card when the card shows real data (same legal/medical boundary as today’s hero).
- **D-02:** Averages are **arithmetic means** over the **same rows** used for the Home chart: `listReadingsForChart()` → `buildBpChartSeries` input set (currently **rolling 90 days** from `readings-queries.ts`, ascending order). If only **one** reading exists in that window, averages equal that reading’s sys/dia; chart stays **sparse** (skeleton + hint) per **HOME-05**.
- **D-03:** **Zero readings:** retain a calm empty state inside the unified card (reuse `EmptyStatePanel` patterns from current hero); **do not** leave a second ghost card below for trends.
- **D-04:** **Primary CTA** (“Add reading”) stays **between** screen title and the combined card (same vertical order as today: title → main card → CTA is **not** required; follow current `index.tsx` order unless plan specifies — **keep CTA below the combined card** to match existing muscle memory).

### Bar chart encoding (HOME-03)
- **D-05:** **Bar chart on Home only** — `BpTrendChart` stays line-based for **History** unless a later milestone says otherwise. Implement a **Home-specific** bar component (e.g. `BpHomeBarChart`) or a `variant="line" | "bar"` prop **used only from Home** to avoid accidental History changes.
- **D-06:** **Paired values:** For each reading (one x position), render **two adjacent narrow vertical bars** (systolic and diastolic), **same fill color** for both (that reading’s risk band per HOME-04). Y-axis is **mmHg** with a shared domain derived from data (pad headroom for legibility). This satisfies “paired S/D preserved” without a new tooltip requirement in v1.2 (press/long-press is **agent discretion**).
- **D-07:** **X-axis:** sparse date ticks (e.g. weekly/monthly anchors) consistent with Stitch reference; exact tick strategy is **agent discretion** as long as labels stay readable on small width.

### Risk colors (HOME-04)
- **D-08:** Add a **pure function** module (e.g. `src/lib/bp/bp-chart-bands.ts`) that maps `(systolic, diastolic)` → **band enum** + **fill color** (token keys from `src/lib/theme/tokens.ts`). Logic follows REQUIREMENTS appendix: classify S and D into bands, take **most severe** band; **green-family** (low normal, normal/ideal, high normal) maps to one or more **green** semantic chart tokens (planner picks 1–3 hexes; document in UI-SPEC if needed).
- **D-09:** **Boundaries:** Use **inclusive** min/max on closed intervals from the appendix; for open-ended rows (`>210`, `<50`), match standard table conventions and **unit-test** edge cases (e.g. 120 sys, 80 dia).
- **D-10:** **WHO vs chart:** Bar colors use the **extended chart** only. **WHO `classifyBloodPressure`** remains for **chip label + chip background** (see D-11) — do not replace WHO strings on Home with new diagnostic-style labels.

### Status chip (average row)
- **D-11:** The chip above/next to the average uses **existing WHO** classification: `classifyBloodPressure(round(avgSys), round(avgDia))` with **`getInterpretationChipBackground`** — same component language as the rest of the app. (Extended chart is **visual** on bars; WHO chip keeps product copy consistent.)

### the agent's Discretion
- Exact title string (“Pressure trends” vs all-caps styling) using existing `typography` / `copy` patterns  
- Bar corner radius (capsule tops), chart height in compact mode, and Skia/Victory `Bar` API details  
- Whether to extract a tiny shared “avg from rows” helper next to `buildBpChartSeries`  
- Updating `home-latest-reading.test.tsx` (and adding tests for `bp-chart-bands`) — scope in PLAN

</decisions>

<specifics>
## Specific Ideas

- Visual target: Stitch **combined card** (screenshot in project assets): uppercase section label, large avg, chip on the right, capsule bars, sparse date labels.
- User explicitly requested **green** bars for acceptable/normal bands per the **Blood Pressure Chart** image series.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Milestone and requirements
- `.planning/ROADMAP.md` — Phase 9 goal and success criteria  
- `.planning/REQUIREMENTS.md` — HOME-01–HOME-06 and **Appendix: Blood Pressure Chart bands**  
- `.planning/PROJECT.md` — Current Milestone v1.2, medical boundary  

### Prior phase context
- `.planning/phases/03-history-and-trends/03-CONTEXT.md` — Trend pairing, Victory/Skia stack, sparse chart rule  

### Product / stack
- `AGENTS.md` — Chart stack, privacy, Android focus  

### Implementation touchpoints
- `src/app/(tabs)/index.tsx` — Home layout to merge  
- `src/features/trends/bp-chart-data.ts` — Series builder  
- `src/features/trends/BpTrendChart.tsx` — Line chart (History); reference only for Home bar sibling  
- `src/lib/db/readings-queries.ts` — `listReadingsForChartFromDb` (90d window)  
- `src/lib/bp/who-classification.ts` — Chip classification  
- `src/lib/bp/interpretation-chip.ts` — Chip fills  
- `src/lib/bp/medical-disclaimer.ts` — `INTERPRETATION_DISCLAIMER`  
- `src/lib/theme/tokens.ts` — New chart band colors  

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable assets
- **`SurfaceCard`**, **`ScreenContainer`**, **`PrimaryButton`**, **`EmptyStatePanel`**, theme **`typography` / `colors` / `spacing` / `radius`**  
- **`buildBpChartSeries`**, **`listReadingsForChart`** — same data pipe for averages + bars  
- **`classifyBloodPressure`**, **`getInterpretationChipBackground`**, **`INTERPRETATION_DISCLAIMER`**

### Established patterns
- Home loads **`getLatestReading`** + **`listReadingsForChart`** on **`useFocusEffect`**  
- Sparse chart: **`chartSeries.kind === 'sparse'`** when `<2` points in `buildBpChartSeries`  
- Charts: **`victory-native`** `CartesianChart` + Skia (see `BpTrendChart`)

### Integration points
- **`src/app/(tabs)/index.tsx`** — primary refactor surface  
- New **`bp-chart-bands`** (or similar) consumed by Home bar component only for fills  

</code_context>

<deferred>
## Deferred Ideas

- **History** line → bar conversion; **PDF** bar charts — out of scope v1.2 per REQUIREMENTS  
- Tooltip / scrubber on bars — optional follow-up if bars feel opaque  

**Reviewed todos:** None matched phase 9 (`todo match-phase` returned 0).

</deferred>

---

*Phase: 09-home-pressure-trends-card*  
*Context gathered: 2026-04-08*
