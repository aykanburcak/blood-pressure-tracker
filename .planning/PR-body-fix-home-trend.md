## Summary

**Fix: Home tab trend card uses real chart data**

The trend card previously always showed skeleton bars and static copy. It now loads the same chart window as History (`listReadingsForChart`), builds series with `buildBpChartSeries`, and renders `BpTrendChart` when there are at least two points. Sparse state keeps the skeleton plus `trendPreviewHint`. Home uses `BpTrendChart` with `compact` height (160px).

## Changes

- `src/app/(tabs)/index.tsx` — parallel fetch of latest + chart rows on focus; conditional chart vs placeholder
- `src/features/trends/BpTrendChart.tsx` — optional `compact` prop; `testID="bp-trend-chart"` for tests
- `src/app/(tabs)/__tests__/home-latest-reading.test.tsx` — mock `listReadingsForChart`; case for ≥2 readings

## Verification

- [x] `npx tsc --noEmit`
- [x] `npm test` — home-latest-reading (and related suites as run locally)
- [ ] CI (if configured on the repo)

## Requirements

Post–v1.0 UX fix; aligns Home trends with History (`TRND`-style behavior on dashboard).
