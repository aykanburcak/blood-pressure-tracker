---
status: testing
phase: 04-pdf-export
source:
  - ROADMAP.md Phase 4 success criteria
  - EXPT-01, EXPT-02, EXPT-03 (no phase SUMMARY.md in repo)
started: "2026-04-07T16:00:00.000Z"
updated: "2026-04-07T18:30:00.000Z"
---

## Current Test

number: 3
name: Generate PDF with readings in range
expected: |
  With at least one saved reading whose date falls in the selected preset window (e.g. Last 30 days), tap "Generate PDF". The app does not show a hard error; after a short wait you can tap "Share" (Generate may show "Generating…" while working). Optional — open the produced PDF from a share target and confirm it shows "Blood pressure report", your range, a table with Date / Systolic / Diastolic / Pulse / Status, and the same disclaimer text as in-app.
awaiting: user response

## Tests

### 1. Automated regression suite
expected: `npm test -- --runInBand --watchAll=false` — all tests pass (15 suites / 44 tests at last run).
result: pass

### 2. Settings entry and Export report screen
expected: |
  Open Settings. You see an "Export PDF" row (subtitle about creating a report for your doctor) above the local-storage card. Tap it — a stack screen opens titled "Export report" with a short non-diagnostic disclaimer, preset chips (Last 7 / 30 / 90 days, Custom), a line showing how many readings are in the selected range, and Generate PDF / Share buttons.
result: pass

### 3. Generate PDF with readings in range
expected: |
  With at least one saved reading whose date falls in the selected preset window (e.g. Last 30 days), tap "Generate PDF". The app does not show a hard error; after a short wait you can tap "Share" (Generate may show "Generating…" while working). Optional — open the produced PDF from a share target and confirm it shows "Blood pressure report", your range, a table with Date / Systolic / Diastolic / Pulse / Status, and the same disclaimer text as in-app.
result: pending

### 4. Android share sheet
expected: |
  After a PDF is generated, tap "Share". The system share sheet opens and lets you pick a target (e.g. Drive, Files, email). The shared item is a PDF (not plain text or HTML).
result: pending

### 5. Empty range — Generate disabled
expected: |
  Pick a time range that includes no readings (e.g. Custom dates in the future, or a window before your oldest reading). The summary shows zero readings in range and "Generate PDF" stays disabled (greyed).
result: pending

### 6. Custom range reloads count
expected: |
  Choose Custom, set start and end dates that bracket at least one reading, confirm the reading count updates to a positive number and Generate becomes enabled if count &gt; 0.
result: pending

## Summary

total: 6
passed: 2
issues: 0
pending: 4
skipped: 0
blocked: 0

## Gaps

- truth: "Export screen loads reading count from SQLite without errors"
  status: failed
  reason: "User reported: 0 readings with data present; console NativeDatabase.execSync NPE in migrate.ts"
  severity: blocker
  test: 3
  root_cause: "Pre-migrate DDL used sqlite.execSync; Android threw NPE. Each getReadingsDb also opened/migrated a new connection, increasing race risk."
  fix: "Use execAsync for journal DDL; pass SQLiteDatabase from openDatabaseSync; cache one open+migrate Promise per database filename (readings-repository)."
