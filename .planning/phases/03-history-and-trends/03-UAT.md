---
status: testing
phase: 03-history-and-trends
source:
  - 03-01-SUMMARY.md
  - 03-02-SUMMARY.md
  - 03-03-SUMMARY.md
started: "2026-04-06T21:00:00.000Z"
updated: "2026-04-06T23:30:00.000Z"
---

## Current Test

number: 5
name: Trend summaries (7d / 30d)
expected: |
  History header shows "Recent averages", Last 7 days and Last 30 days with mmHg and reading counts. Counts match how many readings fall in each rolling window (rough sanity: not obviously wrong vs your data).
awaiting: user response

## Tests

### 1. Automated regression suite
expected: `npm test -- --runInBand --watchAll=false` — all tests pass.
result: pass

### 2. History list and open edit
expected: |
  History shows readings newest-first; row shows BP, time, WHO label; tap opens Edit reading with matching values.
result: pass

### 3. Edit saves and History updates
expected: |
  On Edit reading, change systolic or diastolic (valid values), tap Save changes, return to History. The same row shows updated numbers (order may change if you changed measured time).
result: pass

### 4. Delete — cancel vs confirm
expected: |
  Open a reading, tap Delete reading, tap Cancel — stay on edit with data intact. Open again, Delete, confirm Delete — returns to History and that row is gone.
result: pass

### 5. Trend summaries (7d / 30d)
expected: |
  History header shows "Recent averages", Last 7 days and Last 30 days with mmHg and reading counts. Counts match how many readings fall in each rolling window (rough sanity: not obviously wrong vs your data).
result: pending

### 6. Chart — paired trend or placeholder
expected: |
  With 0–1 readings in the chart window, you see placeholder copy about adding more readings. With 2+ readings in the last 90 days, you see a chart area with two distinct lines (systolic vs diastolic), not a single series only. Use a development build if Expo Go does not render Skia.
result: pending

## Summary

total: 6
passed: 4
issues: 0
pending: 2
skipped: 0
blocked: 0

## Gaps

(none yet)
