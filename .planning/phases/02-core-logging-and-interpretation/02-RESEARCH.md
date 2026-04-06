# Phase 2: Core Logging and Interpretation — Research

**Researched:** 2026-04-06  
**Domain:** SQLite/Drizzle persistence for readings, Zod validation, WHO-style BP classification, Expo add-reading UX  
**Confidence:** HIGH (stack docs + existing Phase 1 patterns)

<user_constraints>
## User Constraints (from `02-CONTEXT.md`)

- Dedicated add-reading screen from Home primary CTA; no FAB (D-12).
- After save, Home shows latest summary without manual refresh (D-13).
- Systolic/diastolic required; pulse optional (D-14).
- Date/time defaults to now, user-adjustable (D-15).
- Zod plausibility ranges at boundary (D-16); bounds documented in code.
- Readings in SQLite with Drizzle + migrations; separate from `app_flags` / `app-shell.db` (D-17, D-18) — use a **dedicated DB file** (e.g. `readings.db`) so Phase 1 raw SQL in `app-shell-flags.ts` stays untouched.
- WHO-based category + calm colors + non-diagnostic disclaimer (D-19, D-20).
- Full History list deferred to Phase 3 (D-21); `HIST-04` via persisted latest on Home after relaunch.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Research takeaway |
|----|-------------------|
| LOG-01 | Single form: numeric fields + optional pulse + datetime; `@react-native-community/datetimepicker` via `npx expo install`. |
| LOG-02 | Default `measuredAt` = `Date.now()` in component state; picker updates same state. |
| LOG-03 | Zod `.superRefine` or separate refine for cross-field BP rules; disable Save until valid or show inline errors. |
| LOG-04 | One primary `Save reading` (or UI-SPEC label); `router.back()` or `replace` to tabs after successful insert. |
| HIST-04 | Drizzle schema + migration applied on open; `getLatestReading()` reads after process restart (manual smoke + Jest insert round-trip where feasible). |
| INTP-01 | Deterministic classifier from SBP/DBP using adult office-style bands; evaluate **crisis → stage 2 → stage 1 → elevated → normal**. |
| INTP-02 | UI chip/badge uses interpretation palette; adjacent static disclaimer string (not toast-only). |
| INTP-03 | Home loads latest row on focus/mount from repo, not in-memory singleton only. |
</phase_requirements>

## Summary

Phase 2 should introduce **`drizzle-orm`** with the **Expo SQLite** driver and **drizzle-kit** for SQL migrations checked into `drizzle/`, following the official Drizzle Expo guide. [CITED: https://orm.drizzle.team/docs/get-started/expo-new] Migrations run at app startup against a **new** database file (recommended: `readings.db`) to satisfy D-18 without refactoring `app-shell.db`.

Validation and interpretation logic should live in **pure TypeScript modules** tested with Jest (no UI), matching AGENTS.md guidance for Zod at boundaries. WHO-aligned adult categories for planning (exact thresholds implemented in code + tests in Plan 02-02):

1. **Hypertensive crisis** — SBP ≥ 180 **or** DBP ≥ 120  
2. **High (Stage 2)** — SBP ≥ 140 **or** DBP ≥ 90 (and not crisis)  
3. **High (Stage 1)** — SBP 130–139 **or** DBP 80–89 (and not 1–2)  
4. **Elevated** — SBP 120–129 **and** DBP < 80  
5. **Normal** — SBP < 120 **and** DBP < 80  

Plausibility input ranges (D-16, tunable): systolic **70–250**, diastolic **40–150**, pulse **30–220** when present; reject diastolic ≥ systolic.

**Primary recommendation:** Plan as three waves — (1) DB + repo + migration tests, (2) Zod + WHO classifier + tokens, (3) Router screen + Home wiring + RNTL tests.

## Standard Stack (additions)

| Package | Role | Notes |
|---------|------|--------|
| `drizzle-orm` | Typed queries + schema | Expo SQLite adapter from Drizzle docs |
| `drizzle-kit` (dev) | Generate SQL migrations | `dialect: 'sqlite'`; commit `drizzle/` output |
| `zod` | Form + insert boundary validation | Version per AGENTS (4.x) |
| `@react-native-community/datetimepicker` | Native date/time | `npx expo install` for Expo 55 compatibility |

## Pitfalls

- **Do not** use `drizzle-kit push` against a remote server as the Phase 2 gate — mobile ships **bundled SQL** migrations. Generate with `drizzle-kit generate` and apply via `migrate` API on device. [CITED: https://orm.drizzle.team/docs/get-started/expo-new]
- **Metro + Drizzle:** avoid importing `drizzle-kit` in app code; keep kit dev-only.
- **jest-expo + SQLite:** reuse patterns from `app-shell-flags` tests; use unique DB name or cleanup between tests if opening `readings.db`.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | `jest-expo` + `@testing-library/react-native` (existing) |
| Config file | `jest.config.js` (existing) |
| Quick run command | `npm test -- --runInBand --watchAll=false` |
| Full suite command | Same |
| Estimated runtime | ~45s |

### Phase Requirements → Test Map

| Req ID | Behavior | Test type | Automated command | File exists? |
|--------|----------|-----------|-------------------|--------------|
| LOG-01 | Fields present on add-reading screen | RNTL | `npm test -- --runInBand --watchAll=false` | Plan 03 adds tests |
| LOG-02 | Default time is “now” | RNTL / unit | same | Plan 03 |
| LOG-03 | Invalid values block save | RNTL + Zod unit | same | Plans 02 + 03 |
| LOG-04 | Save inserts and returns | RNTL + repo integration | same | Plans 01 + 03 |
| HIST-04 | Row survives reopen | Manual + repo test | same + device | Plan 01 + manual |
| INTP-01 | WHO category stable | unit | same | Plan 02 |
| INTP-02 | Disclaimer + color contract | RNTL string + token | same | Plans 02 + 03 |
| INTP-03 | Home shows latest | RNTL | same | Plan 03 |

### Sampling Rate

- After each task: `npm test -- --runInBand --watchAll=false`
- Before UAT: full suite green

### Wave 0 Gaps

- None for Jest — Phase 1 already installed the harness.

## Security Domain (ASVS-lite)

| Concern | Mitigation |
|---------|------------|
| SQLite injection | Drizzle parameterized queries only; no string-concat SQL in app code |
| Invalid health data | Zod ranges + cross-field checks before insert |
| Misleading medical claims | Fixed disclaimer copy + label “not a diagnosis” adjacent to interpretation |

## Sources

- https://orm.drizzle.team/docs/get-started/expo-new  
- https://docs.expo.dev/versions/latest/sdk/sqlite/  
- https://docs.expo.dev/versions/latest/sdk/date-time-picker/  
- https://zod.dev/  
- Project: `AGENTS.md`, `02-CONTEXT.md`, Phase 1 `01-RESEARCH.md` patterns  

**Valid until:** 2026-05-06 for Expo 55 / Drizzle minors.
