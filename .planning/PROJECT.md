# Blood Pressure Tracker

## What This Is

Blood Pressure Tracker is an Android app built with React Native (Expo) for people who want a calm, private, low-friction way to log and understand their blood pressure readings. It is a minimalist, design-first utility inspired by Apple Health: record a reading, see immediate WHO-based context, review trends, and export a PDF for clinicians—without accounts or cloud sync in v1.

## Core Value

Logging and understanding a blood pressure reading should feel instant, private, and visually clear.

## Requirements

### Validated (v1.0 — shipped 2026-04-06)

- **v1.0:** Full Android v1 scope: offline shell (CORE-01–03), manual logging (LOG-01–04), persisted history (HIST-01–04), WHO interpretation (INTP-01–03), trend chart + summaries (TRND-01–03), PDF export + share (EXPT-01–03), privacy copy + no ads/account/sync + backup posture (PRIV-01–02). Evidence: `.planning/milestones/v1.0-REQUIREMENTS.md`, phase UAT/VERIFICATION under `.planning/phases/`.

### Active (v1.1 — in progress)

- **v1.1:** Align app visual system and shared components with Stitch reference **Apple Health BP Tracker** ([Stitch project](https://stitch.withgoogle.com/projects/7766087000680671419)): tokens (color, type, radius, shadow), primary/secondary buttons, cards/surfaces, tab chrome, interpretation chips. See `.planning/REQUIREMENTS.md` (DS-*) and `.planning/research/STITCH-SOURCE.md`.

### Out of Scope

- Account creation, login, and cloud sync in v1 — shipped without them; still out of scope for the v1 product line unless a future milestone explicitly adds optional sync.
- iOS release — Android-first; Apple Health dominates iOS reference space.
- Medication tracking, weight logs, and broader health dashboards — single-purpose BP tracker.
- Notes and reminders — deferred past v1 (candidates for v1.1+).
- Raw CSV export in v1 — PDF covers doctor visit handoff.
- Medical diagnosis or treatment recommendations — WHO-style labels only, explicit non-diagnostic copy.

## Context

Shipped **v1.0** as a local-only Expo SDK 55 app: SQLite readings, Skia/Victory trends, expo-print PDF, Settings **Privacy & data**, `allowBackup: false` for Android. Target remains Google Play with high polish and calm visuals.

**v1.1 in flight:** Stitch-aligned design system (see Current Milestone below). **After v1.1:** promote engagement/ecosystem items from `.planning/REQUIREMENTS.md` backlog (reminders, notes, Health Connect, app lock, etc.).

## Constraints

- **Platform:** Android for v1 release; iOS optional later.
- **Tech stack:** React Native / Expo, New Architecture–friendly toolchain per `AGENTS.md`.
- **Privacy:** Local-first; no backend in v1.
- **Scope:** Single-purpose BP logging and review.
- **UX:** Design-led, minimal chrome.
- **Medical boundary:** WHO-based guidance only; not a diagnostic tool.
- **Export:** PDF for v1.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Ship Android first | Play opportunity; iOS crowded | ✓ Shipped v1.0 Android |
| v1 fully offline and private | Trust + speed to ship | ✓ No account/sync/ads |
| v1 = logging, trends, PDF | Core loop without bloat | ✓ Delivered |
| Polish over breadth | Differentiator | ✓ Ongoing bar |
| WHO interpretation + non-diagnostic framing | User context without diagnosis | ✓ In-app + PDF |
| PDF-only export | Doctor handoff without scope creep | ✓ expo-print + share |
| `allowBackup: false` | Align manifest with privacy story | ✓ Phase 5 |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each milestone** (`/gsd-complete-milestone`): full review of sections; move shipped work to Validated; refresh Active for the next milestone.

---

## Current Milestone: v1.1 Stitch design alignment

**Goal:** Refresh the design system and core UI components so the app visually matches the approved Stitch reference (Apple Health–style BP tracker) without changing product scope or medical framing.

**Target features:**

- Theme tokens and typography roles aligned to Stitch (cool surfaces, primary blues, Manrope/Inter).
- Component pass: primary CTA, secondary actions, `SurfaceCard` / screen backgrounds, WHO chips.
- Tab shell and key screens (Home, History, Settings, add/edit reading) reviewed for spacing, dividers, and elevation per Stitch guidelines.
- Optional: glass-style tab bar using `expo-glass-effect` only if it meets Android polish bar.

---

*Last updated: 2026-04-07 — milestone v1.1 started (`/gsd-new-milestone`)*
