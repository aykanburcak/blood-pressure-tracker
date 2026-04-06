---
status: testing
phase: 01-foundation-and-offline-shell
source:
  - 01-01-SUMMARY.md
  - 01-02-SUMMARY.md
  - 01-03-SUMMARY.md
started: "2026-04-06T12:00:00.000Z"
updated: "2026-04-06T09:27:32Z"
---

## Current Test

number: 2
name: First launch — privacy before dashboard
expected: |
  From a clean install (or after clearing app data), opening the app shows a full-screen privacy experience first (title "Private by default", body about readings staying on device, support line about non-diagnosis). You do not see the tab bar until you tap "Continue Offline". No sign-in, account, or cloud-sync prompts appear.
awaiting: user response

## Tests

### 1. Automated regression suite
expected: `npm test -- --runInBand --watchAll=false` — all tests pass.
result: pass

### 2. First launch — privacy before dashboard
expected: |
  From a clean install (or after clearing app data), opening the app shows a full-screen privacy experience first (title "Private by default", body about readings staying on device, support line about non-diagnosis). You do not see the tab bar until you tap "Continue Offline". No sign-in, account, or cloud-sync prompts appear.
result: pending

### 3. After acknowledgement — main dashboard without sign-in
expected: |
  After "Continue Offline", you land on the main tab shell with Home selected. You can use Home, History, and Settings without creating an account or signing in. Tab order left-to-right is Home, History, Settings.
result: pending

### 4. Home empty state (dashboard shape)
expected: |
  On Home, you see a large "Blood Pressure" title, a prominent card with "No readings yet" and supporting copy, a second card explaining local-only behavior, and a third muted area suggesting trends appear after saved readings. The screen does not feel like a blank template.
result: pending

### 5. History empty list
expected: |
  On History, you see the "History" title, a short line about reverse chronological order, and a card-shaped list area containing "No history yet" and the approved empty copy. No "coming soon" or sample readings.
result: pending

### 6. Settings — local-only and export boundary
expected: |
  On Settings, you see "Local storage only" with detail about the device and optional PDF later, an "About this app" row, and a muted footnote that export is only when you choose it—nothing implies automatic upload or cloud sync.
result: pending

### 7. Offline / no network blocking
expected: |
  With mobile data and Wi‑Fi off (airplane mode), you can still open the app, complete or pass the privacy gate (if applicable), and browse Home, History, and Settings without errors or forced online prompts.
result: pending

## Summary

total: 7
passed: 1
issues: 0
pending: 6
skipped: 0
blocked: 0

## Gaps

[none yet]
