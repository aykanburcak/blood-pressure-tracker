---
status: testing
phase: 02-core-logging-and-interpretation
source:
  - Phase 2 plan execution (02-01 / 02-02 / 02-03); no SUMMARY.md artifacts yet
started: "2026-04-06T12:00:00.000Z"
updated: "2026-04-06T12:00:00.000Z"
---

## Current Test

number: 2
name: Add reading — save and return to Home
expected: |
  From Home after privacy gate, tap "Add reading". Enter valid systolic/diastolic (e.g. 118 and 75), optionally pulse. Open date/time and change if you like. Tap "Save reading". You return to Home (stack dismisses). The hero card shows your reading (e.g. 118 / 75), measured time, a status chip (e.g. Normal for 118/75), and the disclaimer: "This is not a medical diagnosis. Talk to a clinician about your readings."
awaiting: user response

## Tests

### 1. Automated regression suite
expected: `npm test -- --runInBand --watchAll=false` — all tests pass.
result: pass

### 2. Add reading — save and return to Home
expected: |
  Add-reading screen opens from Home CTA; valid data saves; back to Home; latest summary shows BP, time, chip, disclaimer.
result: pending

### 3. Validation — cannot save invalid readings
expected: |
  Enter systolic below 70 or above 250, or diastolic ≥ systolic, or optional pulse out of range. "Save reading" does not navigate away; field-level or form errors appear; no new row appears on Home after dismissing errors with valid data (optional recheck).
result: pending

### 4. Interpretation — label, chip, disclaimer
expected: |
  For a saved reading, the Home hero shows a WHO-style status label on the chip, tint consistent with category, and the full non-diagnostic disclaimer line under the chip.
result: pending

### 5. Persistence after app restart (HIST-04)
expected: |
  After saving at least one reading, force-close the app (swipe away from recents). Relaunch. Home still shows the same latest reading values and interpretation (no empty state unless data was cleared).
result: pending

## Summary

total: 5
passed: 1
issues: 0
pending: 4
skipped: 0
blocked: 0

## Gaps

<!-- Populated when issues are reported -->
