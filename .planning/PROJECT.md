# Blood Pressure Tracker

## What This Is

Blood Pressure Tracker is an Android app built with React Native (Expo) for people who want a calm, private, low-friction way to log and understand their blood pressure readings. It is a minimalist, design-first utility inspired by Apple Health: record a reading, see immediate WHO-based context, review trends, and export a PDF for clinicians—without accounts or cloud sync in v1.

## Core Value

Logging and understanding a blood pressure reading should feel instant, private, and visually clear.

## Requirements

### Validated (v1.0 — shipped 2026-04-06)

- **v1.0:** Full Android v1 scope: offline shell (CORE-01–03), manual logging (LOG-01–04), persisted history (HIST-01–04), WHO interpretation (INTP-01–03), trend chart + summaries (TRND-01–03), PDF export + share (EXPT-01–03), privacy copy + no ads/account/sync + backup posture (PRIV-01–02). Evidence: `.planning/milestones/v1.0-REQUIREMENTS.md`, phase UAT/VERIFICATION under `.planning/phases/`.

### Active

- Next milestone scope **not** defined here — use `/gsd-new-milestone` and `.planning/REQUIREMENTS.md` backlog.

### Out of Scope

- Account creation, login, and cloud sync in v1 — shipped without them; still out of scope for the v1 product line unless a future milestone explicitly adds optional sync.
- iOS release — Android-first; Apple Health dominates iOS reference space.
- Medication tracking, weight logs, and broader health dashboards — single-purpose BP tracker.
- Notes and reminders — deferred past v1 (candidates for v1.1+).
- Raw CSV export in v1 — PDF covers doctor visit handoff.
- Medical diagnosis or treatment recommendations — WHO-style labels only, explicit non-diagnostic copy.

## Context

Shipped **v1.0** as a local-only Expo SDK 55 app: SQLite readings, Skia/Victory trends, expo-print PDF, Settings **Privacy & data**, `allowBackup: false` for Android. Target remains Google Play with high polish and calm visuals.

Next product bets (when planned): reminders, notes, Health Connect, app lock — see `.planning/REQUIREMENTS.md` candidates.

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

*Last updated: 2026-04-06 after v1.0 milestone complete*
