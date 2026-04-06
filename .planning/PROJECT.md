# Blood Pressure Tracker

## What This Is

Blood Pressure Tracker is an Android app built with React Native for people who want a calm, private, low-friction way to log and understand their blood pressure readings. It is designed as a minimalist, design-first utility inspired by Apple Health, with the interface getting out of the way so users can record a reading, see immediate context, and review trends without noise or account friction.

## Core Value

Logging and understanding a blood pressure reading should feel instant, private, and visually clear.

## Requirements

### Validated

- **Phase 2 (2026-04-06):** Manual logging loop, SQLite persistence, WHO-based latest-reading context on Home, non-diagnostic framing — see `02-UAT.md` and `02-VERIFICATION.md` under `.planning/phases/02-core-logging-and-interpretation/`.
- **Phase 3 (2026-04-07):** History list, edit/delete, rolling-window summaries, paired BP trend chart (Skia/Victory), Expo-safe Drizzle journal migration — see `03-UAT.md` and `03-VERIFICATION.md` under `.planning/phases/03-history-and-trends/`.

### Active

- [x] Users can log blood pressure readings manually in seconds with minimal friction.
- [x] Users can immediately understand each reading through clean visual context and WHO-based status indicators.
- [x] Users can review their history and trends in polished, minimalist charts.
- [ ] Users can export their blood pressure history as a PDF for medical appointments.

### Out of Scope

- Account creation, login, and cloud sync — v1 prioritizes privacy, speed to ship, and zero onboarding friction.
- iOS release — the initial product is intentionally Android-only.
- Medication tracking, weight logs, and broader health tracking — the product is a single-purpose blood pressure tracker, not a general health suite.
- Notes and reminders — deferred to a later iteration to keep v1 focused on core logging, trends, and export.
- Raw CSV export — PDF alone covers the primary doctor-sharing use case for v1.
- Medical diagnosis or treatment recommendations — the app may show WHO-based interpretation only and must remain clearly non-diagnostic.

## Context

The target audience is a broad Google Play Store audience rather than a single personal-use scenario. The desired product experience is inspired by Apple Health: minimalist, calm, high-fidelity, and immediately useful. The first two minutes of use matter heavily:

- The app should open directly into a clean dashboard without account setup.
- A brief privacy-first message should make local-only storage explicit.
- The primary action should be obvious and centered on adding a reading.
- Data entry should feel fast with large, easy-to-use input controls, current date/time defaults, and one-tap save.
- Saving a reading should immediately unlock value through visual feedback, color-coded interpretation, and a living trend chart.

The product strategy is design-first. The app does not need feature breadth to compete; it needs a level of polish and clarity that makes users prefer it over noisier alternatives. The hardest UX challenge is chart and interaction polish rather than basic typography and spacing. V1 data storage is local-only, both to strengthen trust for sensitive health data and to avoid backend and account complexity early.

## Constraints

- **Platform**: Android only — Apple Health already occupies the iOS reference space, so the release target is Google Play.
- **Tech stack**: React Native — implementation must suit a production-quality Android app in this ecosystem.
- **Privacy**: Fully offline and local-first — no backend, account system, or cloud sync in v1.
- **Scope**: Single-purpose product — avoid adjacent health features that dilute the core blood pressure use case.
- **UX bar**: High-fidelity, minimalist polish — design quality is a core differentiator, not a nice-to-have.
- **Medical boundary**: WHO-based status guidance only — the app must clearly avoid implying medical advice or diagnosis.
- **Export**: PDF only — enough for doctor visits without expanding scope into broader data portability formats.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Ship Android first | The market opportunity is Google Play, while Apple already offers a strong default on iOS | — Pending |
| Keep v1 fully offline and private | Removes onboarding and backend complexity while increasing trust for sensitive data | — Pending |
| Focus v1 on manual logging, trends, and PDF export | Covers the core utility loop without feature bloat | — Pending |
| Compete on polish rather than breadth | The product advantage is a calm, beautiful, single-purpose experience | — Pending |
| Use WHO-based interpretation with explicit non-medical-advice limits | Users need immediate context, but the app must avoid crossing into diagnosis | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check -> still the right priority?
3. Audit Out of Scope -> reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-05 after initialization*
