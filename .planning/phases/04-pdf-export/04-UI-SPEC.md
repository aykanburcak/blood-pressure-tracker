---
phase: 4
slug: pdf-export
status: approved
created: 2026-04-07
---

# Phase 4 — UI Design Contract

> PDF export flow. Extends `01-UI-SPEC.md`, `02-UI-SPEC.md`, `03-UI-SPEC.md`, and `04-CONTEXT.md`.

## Design system

| Property | Value |
|----------|-------|
| Primitives | `ScreenContainer`, `ScreenTitle`, `SurfaceCard`, `PrimaryButton`, `InfoRow`, theme `copy` / `spacing` / `typography` |
| Navigation | Stack screen from Settings (card presentation consistent with add/edit reading) |

## Settings

- Add **tappable** `InfoRow` (or equivalent list row) **above** or **below** the existing local-only card:  
  - **Title:** `Export PDF`  
  - **Detail:** one line, e.g. `Create a report for your doctor`  
  - **Action:** `router.push('/export-report')` (exact path must match `app` file)  
- Keep existing `settingsExportFootnote` visible below.

## Export report screen

**Title (header):** `Export report`

**Layout (top → bottom):**

1. **Range presets** — segmented control or vertical chip list: `Last 7 days`, `Last 30 days`, `Last 90 days`, `Custom`.  
2. **Custom panel** (visible only when Custom): two labeled rows — **Start date**, **End date** — using `@react-native-community/datetimepicker` in **date** mode, same interaction pattern as add-reading (confirm/cancel if applicable).  
3. **Summary line** — e.g. `12 readings in this range` or `No readings in this range` (computed from DB).  
4. **Primary button:** `Generate PDF` — **disabled** when count is 0 or while generation in progress.  
5. **Secondary action** (after successful generation): `Share` — enabled when a PDF URI is ready; calls share API.  
6. **Error state:** non-blocking `Text` in `colors.textSecondary` or `Alert` on hard failure.

**Loading:** Disable primary button + show `ActivityIndicator` or button label `Generating…` during `printToFileAsync`.

**Accessibility:** Primary button `accessibilityLabel` includes `Generate PDF`; Share `accessibilityLabel` `Share PDF report`.

## Copy boundaries

- Include short non-diagnostic disclaimer on screen (reuse or mirror `medical-disclaimer` tone) above or below actions.  
- Do not promise diagnosis or treatment.

## Empty state

- Zero readings in app globally: can reuse tone from History empty or short line on export screen before range selection.
