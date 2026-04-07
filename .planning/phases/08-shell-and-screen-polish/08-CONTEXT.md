# Phase 8: Shell & screen polish — Context

**Gathered:** 2026-04-07  
**Status:** Ready for planning

<domain>
## Phase Boundary

Close **DS-08, DS-09, DS-10** for milestone v1.1: align **tab bar** (and optionally **stack header** chrome) with Stitch tonal system, do a **targeted screen pass** to reduce divider-heavy UI in favor of spacing/surfaces where it fits the product, and **refresh PDF HTML/CSS** so printouts use the same palette as the app (without loading custom webfonts in the template unless explicitly chosen). **Out of scope:** new features, WHO/medical copy changes, Health Connect, new routes.

</domain>

<decisions>
## Implementation Decisions

### Tab bar (DS-08)

- **D-01:** **No `expo-glass-effect` on the tab bar** in the default Phase 8 plan — solid bar only (performance + predictable Android). Revisit only if a follow-up explicitly requests blur.
- **D-02:** Tab bar **background** uses **`colors.surface`** (or `dominant` — same hex) so it matches the cool app canvas; **active tint** `colors.primary`, **inactive** `colors.textSecondary`. Keep safe-area height logic in `(tabs)/_layout.tsx`.
- **D-03:** **Stack / modal headers** (add reading, edit, export, privacy-info): extend **React Navigation theme** in root `_layout.tsx` so `headerStyle.backgroundColor` and title colors align with `surface` + `onSurface` / `textSecondary` for subtitles if any — **minimal** change, no custom header components unless needed.

### Screen polish (DS-09)

- **D-04:** **Settings** `SurfaceCard`: remove **hairline dividers** between rows; use **`marginVertical` / `gap`** on sections so Export / Local / Privacy blocks separate by **space** only (Stitch “divider ban” where safe). Preserve reading order and accessibility.
- **D-05:** **History list rows** (`HistoryReadingRow`): **remove bottom border**; separate rows with **vertical margin** or list `ItemSeparatorComponent` as **transparent spacing** (e.g. `marginBottom: spacing.sm` on row container) — no 1px rules between items.
- **D-06:** **Home / History headers / empty states** — quick audit: replace stray legacy grays only if hard-coded; otherwise rely on theme. **Export report** screen: already updated in Phase 7; re-check section labels vs Stitch spacing only if obvious.
- **D-07:** **Privacy** first-run and **privacy-info** — align background/header with `ScreenContainer` + tokens; no copy changes.

### PDF report (DS-10)

- **D-08:** Update **`buildBpReportHtml`** inline CSS to Stitch-aligned neutrals: body text **`#1A1C1F`**, muted **`#414755`**, table borders **`#C1C6D7`**, header row background **`#F3F3F8`**, table cell backgrounds white. Keep **`font-family: system-ui, sans-serif`** (no bundled Inter in PDF unless adding `@font-face` base64 — **out of scope** for default plan).
- **D-09:** Extend **`bp-report-html.test.ts`** assertions if color strings or structure change (e.g. snapshot substring checks for new hex or class names).

### the agent's Discretion

- Exact tab bar **border top** (hairline `outlineVariant`) — add only if bar blends into content on device.
- **History** list padding tweaks after border removal.
- Whether **Settings** needs a single **grouped** visual (e.g. one inner padding block) vs. three spaced blocks.

</decisions>

<specifics>
## Specific Ideas

- Stitch: glass nav optional; we default **solid** for Phase 8.
- Phase 6–7 tokens are source of truth; PDF uses **literal hex** matching those tokens (document in comment next to CSS).

</specifics>

<canonical_refs>
## Canonical References

- `.planning/ROADMAP.md` — Phase 8 row, DS-08–DS-10.
- `.planning/REQUIREMENTS.md` — DS-08, DS-09, DS-10.
- `.planning/research/STITCH-SOURCE.md` — shell + layering notes.
- `src/app/(tabs)/_layout.tsx` — tab chrome.
- `src/app/_layout.tsx` — `ThemeProvider` / stack options.
- `src/features/export/bp-report-html.ts` — PDF template.
- `src/app/(tabs)/settings.tsx`, `src/features/readings/HistoryReadingRow.tsx` — dividers.

</canonical_refs>

<code_context>
## Existing Code Insights

- Tabs use `colors.secondary` (white) for tab bar bg today — will shift to **`surface`** for tonal match with `ScreenContainer`.
- Settings uses `StyleSheet.hairlineWidth` dividers between `InfoRow`s.
- History rows use `borderBottomWidth: 1` + `colors.divider`.

</code_context>

<deferred>
## Deferred Ideas

- Tab bar **blur** / `expo-glass-effect`.
- **Webfont** in PDF for Inter/Manrope parity.
- **Dark mode** PDF and shell.

</deferred>

---

*Phase: 08-shell-and-screen-polish*  
*Context gathered: 2026-04-07*
