---
phase: 2
slug: core-logging-and-interpretation
status: approved
shadcn_initialized: false
preset: none
created: 2026-04-06
reviewed_at: 2026-04-06
---

# Phase 2 — UI Design Contract

> Extends Phase 1 shell with add-reading flow, interpretation chrome, and Home “latest reading” state. Aligned to `02-CONTEXT.md` and `01-UI-SPEC.md`.

---

## Design System (delta from Phase 1)

| Property | Value |
|----------|-------|
| Tool | none |
| Component library | none (reuse Phase 1 primitives) |
| Date/time | `@react-native-community/datetimepicker` (Expo-installed) |

All Phase 1 spacing, typography, radius, shadow, and shell rules **remain in force**.

---

## Interpretation palette (new)

Calm, non-alarmist fills for category chips or row accents only — not full-screen red washes.

| Token | Hex | Use |
|-------|-----|-----|
| `interpretNormal` | `#22C55E` | Normal |
| `interpretElevated` | `#EAB308` | Elevated |
| `interpretStage1` | `#F97316` | High blood pressure (Stage 1) |
| `interpretStage2` | `#EA580C` | High blood pressure (Stage 2) |
| `interpretCrisis` | `#B91C1C` | Hypertensive crisis |

Text on chips: **white** on crisis only; **#111827** on lighter chips if contrast requires, or use soft tinted background at 12–16% opacity of the hue with dark text.

---

## Copywriting Contract (additions)

| Element | Copy |
|---------|------|
| Home primary action (when on Home) | `Add reading` |
| Add-reading screen title | `New reading` |
| Save button | `Save reading` |
| Systolic label | `Systolic` |
| Diastolic label | `Diastolic` |
| Pulse label | `Pulse (optional)` |
| Measured time label | `Date and time` |
| Field helper (units) | `mmHg` where appropriate |
| Interpretation disclaimer (short) | `This is not a medical diagnosis. Talk to a clinician about your readings.` |

Tone: same as Phase 1 — calm, direct, non-clinical. No `Get started`, no treatment advice.

---

## Navigation Contract (delta)

- Root `Stack` gains a sibling route **`add-reading`** (file: `src/app/add-reading.tsx`) **above** tabs in the stack so it can cover the tab shell with a standard back affordance.
- **No FAB.** The entry to `add-reading` is a **full-width primary button** on Home placed **below** the summary hero card (or immediately under the title if layout requires — prefer below hero for visual hierarchy).
- After successful save, navigate **back** to the tab shell (Home). Do not leave the user on an empty success modal unless a blocking error requires it.

---

## Home — Two states

### A. No readings (unchanged empty hero)

Keep Phase 1 empty hero content. **Additionally** show the `Add reading` primary button between the hero card and the local-only secondary card (or directly under hero card padding).

### B. Latest reading present

Replace the inner empty-state block of the hero card with:

1. Large latest **SBP / DBP** presentation (e.g. `120 / 80` style) using `display` or `heading` typography scale.
2. Optional pulse line: `Pulse 72` or omitted if null.
3. **Measured at** line using locale-friendly date/time (`date-fns` optional if already added; otherwise `Intl` — agent discretion).
4. WHO **category chip** (label from classifier) using interpretation palette.
5. Disclaimer text in **secondary** typography under the chip.

Do **not** add charts or history list here (Phase 3).

---

## Add-reading screen

Single scrollable screen:

1. Title: `New reading`
2. **Systolic** and **Diastolic** numeric inputs (large touch targets, `keyboardType="number-pad"` or numeric variant).
3. **Pulse (optional)** — empty means null in DB.
4. **Date and time** — shows current selection; tapping opens the platform picker.
5. Inline validation messages **under** offending fields when invalid or out of range.
6. Sticky/footer **Save reading** primary button — disabled when Zod parse fails, OR enabled with save action that no-ops and shows errors (pick one pattern and test it).

---

## History tab (Phase 2)

No reverse-chronological list yet (`HIST-01` is Phase 3). Optional: one subtle line under empty state: `Your latest reading appears on the Home tab.` — **agent discretion**; must not contradict Phase 1 copy.

---

## Offline

Identical to Phase 1: no network for logging, storage, or interpretation.

---

## Accessibility

- Save button and numeric fields expose `accessibilityLabel` where placeholders are ambiguous.
- Category chip exposes label + category text for screen readers.
