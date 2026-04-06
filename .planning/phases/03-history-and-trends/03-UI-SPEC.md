---
phase: 3
slug: history-and-trends
status: approved
shadcn_initialized: false
preset: none
created: 2026-04-06
reviewed_at: 2026-04-06
---

# Phase 3 — UI Design Contract

> History browsing, edit/delete, and trend surfaces. Extends `01-UI-SPEC.md`, `02-UI-SPEC.md`, and `03-CONTEXT.md`.

---

## Design System

| Property | Value |
|----------|-------|
| Primitives | Reuse `ScreenContainer`, `ScreenTitle`, `SurfaceCard`, `PrimaryButton`, `EmptyStatePanel`, typography/spacing from `src/lib/theme` |
| Interpretation | Reuse Phase 2 interpretation tokens for optional row subtitle or chip |

---

## History tab layout (top → bottom)

1. **Screen title:** `History` (existing `ScreenTitle`).  
2. **Support line:** One line of secondary text — e.g. “Newest readings first.” (agent may keep or shorten existing copy).  
3. **Trend summary strip** (`SurfaceCard` or grouped text):  
   - **Last 7 days:** average systolic / average diastolic (integers or one decimal — pick one and stay consistent) + `n` readings.  
   - **Last 30 days:** same pattern.  
   - If count is 0 for a window, show `—` for averages and `0 readings`.  
4. **Chart card** (`SurfaceCard`):  
   - Title: `Trend` or `Blood pressure over time` (pick one).  
   - Dual lines: **systolic** (warmer hue) and **diastolic** (cooler hue) — distinct from interpretation crisis red for chart lines.  
   - **Sparse state:** &lt; 2 points in chart window — show muted placeholder inside card: short line + “Add more readings to see a trend.”  
5. **List card** or full-bleed list below: reverse-chron rows; divider or whitespace per Phase 1 density.

**Scrolling:** Prefer **single** `ScrollView` wrapping summary + chart + list only if list is short; for many rows use **list header** components (`ListHeaderComponent`) so the list virtualizes. Agent picks the pattern that keeps 60fps on mid-range Android.

---

## History row

| Element | Rule |
|---------|------|
| Primary | `SBP / DBP` large enough to scan (e.g. `typography.heading` scale) |
| Secondary | Locale date/time for `measuredAt` |
| Optional | Pulse if non-null, tertiary style |
| Optional | Small WHO label or tinted chip (reuse classifier) |
| Touch | Entire row navigates to edit |

---

## Edit reading screen

| Element | Copy / rule |
|---------|-------------|
| Title | `Edit reading` |
| Fields | Same labels as add-reading (`Systolic`, `Diastolic`, `Pulse (optional)`, `Date and time`) |
| Primary | `Save changes` |
| Destructive | `Delete reading` — text button or outlined, **below** save; triggers `Alert.alert` with Cancel / Delete |
| Back | Stack header back returns to History without saving |

Invalid data: same inline error behavior as add-reading; no save until Zod passes.

---

## Copywriting (additions)

| Element | Copy |
|---------|------|
| Chart empty | `Add a few more readings to see your trend.` (or UI-SPEC sparse state) |
| Delete alert title | `Delete this reading?` |
| Delete alert message | `This cannot be undone.` |
| Delete confirm | `Delete` |
| Delete cancel | `Cancel` |
| Edit not found | `Reading not found` + back or auto-dismiss |

Tone: calm, non-clinical, consistent with Phase 1–2.

---

## Navigation

- Stack screen: `edit-reading/[id]` registered next to `add-reading` in root stack (`src/app/_layout.tsx`).  
- History → `router.push` with string path `/edit-reading/${id}` (or object form per Expo Router 55 docs).

---

## Accessibility

- Row: `accessibilityRole="button"` or link with label including BP and date.  
- Delete: ensure screen reader announces destructive action (label on button + alert).

---

## Out of scope (Phase 3)

- Export UI, Settings privacy overhaul, reminders, Health Connect.
