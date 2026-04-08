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

### Active (v1.2 — in progress)

- **v1.2:** Single **Pressure trends** card on Home: combined average blood pressure + bar chart (replace separate latest-reading card + line chart card). Bar colors encode per-reading risk band using the product **Blood Pressure Chart** (greens for acceptable/normal band, blues for hypotension, yellow→red for elevated through crisis). Layout reference: Stitch-style combined card (capsule bars, sparse date ticks). See `.planning/REQUIREMENTS.md` (HOME-*).

### Out of Scope

- Account creation, login, and cloud sync in v1 — shipped without them; still out of scope for the v1 product line unless a future milestone explicitly adds optional sync.
- iOS release — Android-first; Apple Health dominates iOS reference space.
- Medication tracking, weight logs, and broader health dashboards — single-purpose BP tracker.
- Notes and reminders — deferred past v1 (candidates for backlog).
- Raw CSV export in v1 — PDF covers doctor visit handoff.
- Medical diagnosis or treatment recommendations — WHO-style labels for copy; chart colors are visual context only, with existing non-diagnostic framing preserved.

## Context

Shipped **v1.0** and **v1.1** as local-only Expo SDK 55 app: SQLite readings, Skia/Victory trends, Stitch-aligned UI, expo-print PDF, Settings **Privacy & data**, `allowBackup: false` for Android.

**v1.2** refines the Home trend surface: one card, averages, bar visualization, and extended color semantics from the internal BP chart (without changing WHO wording for clinical labels where those are shown).

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
| v1.2 Home = one trends card | Less scroll, clearer “pressure over time” story | In progress |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each milestone** (`/gsd-complete-milestone`): full review of sections; move shipped work to Validated; refresh Active for the next milestone.

---

## Current Milestone: v1.2 Home pressure trends card

**Goal:** Unify the Home “latest reading” and “blood pressure over time” surfaces into one card that highlights **average** blood pressure for the charted window and uses a **bar chart** with **risk-colored** bars per the Blood Pressure Chart (green for acceptable / normal band).

**Target features:**

- Single `SurfaceCard` (or equivalent) containing: section title (e.g. pressure trends), **avg** systolic/diastolic + unit, optional status chip aligned to the dominant or average category, and the chart region.
- **Bar chart** replacing the current Home line chart for this block; bars use rounded (“capsule”) tops where feasible; x-axis ticks sparse like the reference (e.g. weekly anchors).
- **Color mapping:** Implement discrete bands matching the provided BP chart (hypotension blues, normal greens, pre-hypertension yellow, stages orange/red, crisis red). Readings whose systolic **and** diastolic fall in the combined “acceptable / normal” bands render **green** bars; otherwise use the worst applicable band for that reading.
- Preserve empty / sparse-data behavior (copy, skeleton, or hint) inside the unified layout.
- Keep existing non-diagnostic disclaimer visibility on Home as appropriate after layout merge.

---

*Last updated: 2026-04-08 — milestone v1.2 started (`/gsd-new-milestone`)*
