# Blood Pressure Tracker

## What This Is

Blood Pressure Tracker is an Android app built with React Native (Expo) for people who want a calm, private, low-friction way to log and understand their blood pressure readings. It is a minimalist, design-first utility inspired by Apple Health: record a reading, see immediate WHO-based context, review trends, and export a PDF for clinicians—without accounts or cloud sync in v1.

## Core Value

Logging and understanding a blood pressure reading should feel instant, private, and visually clear.

## Requirements

### Validated (v1.0 — shipped 2026-04-06)

- **v1.0:** Full Android v1 scope: offline shell (CORE-01–03), manual logging (LOG-01–04), persisted history (HIST-01–04), WHO interpretation (INTP-01–03), trend chart + summaries (TRND-01–03), PDF export + share (EXPT-01–03), privacy copy + no ads/account/sync + backup posture (PRIV-01–02). Evidence: `.planning/milestones/v1.0-REQUIREMENTS.md`, phase UAT/VERIFICATION under `.planning/phases/`.

### Validated (v1.1 — Stitch design alignment, shipped 2026-04-07)

- **v1.1:** Design system and shell aligned to Stitch **Apple Health BP Tracker** (tokens, typography, components, tab chrome, screen polish, PDF token pass). Requirements DS-01–DS-10 in `.planning/milestones/` snapshot when archived; see executed plans under `.planning/phases/06-*` … `08-*`.

### Validated (v1.2 — shipped 2026-04-08)

- **v1.2:** Single **Pressure trends** card on Home: average systolic/diastolic for the chart window + **bar** chart (one range bar per reading), bar colors from the **Blood Pressure Chart** bands (green-family for acceptable/normal; worst band when sys/dia disagree). Requirements HOME-01–HOME-06 in [`.planning/milestones/v1.2-REQUIREMENTS.md`](milestones/v1.2-REQUIREMENTS.md); executed plan `09-01-PLAN.md`.

### Active

- *None — run `/gsd-new-milestone` for the next version line.*

### Out of Scope

- Account creation, login, and cloud sync in v1 — shipped without them; still out of scope for the v1 product line unless a future milestone explicitly adds optional sync.
- iOS release — Android-first; Apple Health dominates iOS reference space.
- Medication tracking, weight logs, and broader health dashboards — single-purpose BP tracker.
- Notes and reminders — deferred past v1 (candidates for backlog).
- Raw CSV export in v1 — PDF covers doctor visit handoff.
- Medical diagnosis or treatment recommendations — WHO-style labels for copy; chart colors are visual context only, with existing non-diagnostic framing preserved.

## Context

Shipped **v1.0** and **v1.1** as local-only Expo SDK 55 app: SQLite readings, Skia/Victory trends, Stitch-aligned UI, expo-print PDF, Settings **Privacy & data**, `allowBackup: false` for Android.

**v1.2** shipped the unified Home trends card (averages + capsule range bars + BP-chart colors). Further product scope awaits the next milestone.

## Constraints

- **Platform:** Android for v1 release; iOS optional later.
- **Tech stack:** React Native / Expo, New Architecture–friendly toolchain per `AGENTS.md`.
- **Privacy:** Local-first; no backend in v1.
- **Scope:** Single-purpose BP logging and review.
- **UX:** Design-led, minimal chrome.
- **Medical boundary:** WHO-based guidance for user-facing interpretation strings; chart coloring follows the separate BP chart spec for visual risk bands — not a new diagnosis claim.
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
| v1.2 Home = one trends card | Less scroll, clearer “pressure over time” story | ✓ Shipped v1.2 |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each milestone** (`/gsd-complete-milestone`): full review of sections; move shipped work to Validated; refresh Active for the next milestone.

---

## Next milestone

**v1.2** is complete. Start the next cycle with **`/gsd-new-milestone`** when you have the next product slice defined.

---

*Last updated: 2026-04-08 — v1.2 closed (`/gsd-complete-milestone`)*
