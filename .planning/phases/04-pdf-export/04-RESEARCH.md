# Phase 4: PDF Export — Research

**Researched:** 2026-04-07  
**Domain:** Expo SDK 55 HTML-to-PDF, Android share, SQLite range queries  
**Confidence:** HIGH (stack matches `AGENTS.md` / `STACK.md`)

## Phase requirements

| ID | Takeaway |
|----|----------|
| EXPT-01 | `listReadingsInRange` + UI range selection + `expo-print.printToFileAsync({ html })` |
| EXPT-02 | `expo-sharing.shareAsync(uri)` after PDF exists; guard with `Sharing.isAvailableAsync()` |
| EXPT-03 | HTML report: title, date generated, range summary, table (date, SBP, DBP, pulse), period aggregates, WHO label per row, disclaimer |

## Summary

**Dependencies:** Add with `npx expo install expo-print expo-sharing expo-file-system` (versions pinned by Expo for SDK 55). Development build not strictly required for these modules vs Skia; verify on Android emulator/device.

**Data:** Extend `readings-queries.ts` with `listReadingsInRangeFromDb(db, { startMs, endMs })` using Drizzle `and(gte(readings.measuredAt, startMs), lte(readings.measuredAt, endMs))` and `orderBy(asc(measuredAt), asc(createdAt))`. Mirror pattern in `readings-sql.test.ts` with better-sqlite3.

**PDF pipeline:** Build HTML string in a pure module (no RN views). Call `Print.printToFileAsync({ html, base64: false })` — returns `{ uri }`. Prefer **A4**-friendly CSS (`@page`, `body` font stack). Keep styles inline or in `<style>` for predictable rendering.

**Share:** `Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Share report' })`. On failure, show `Alert` with message from `error` (no PII).

**Privacy:** PDF is user-initiated only; temp file in cache — delete after share to reduce residual footprint on shared devices.

**Pitfalls:** Very large exports — table can be long; acceptable for v1 (medical visits). If needed later, cap rows with footnote “Showing first N” (deferred). HTML injection not applicable if only numeric/date cells; still format numbers as strings without raw user HTML.

## Validation Architecture

### Test framework

| Property | Value |
|----------|-------|
| Framework | `jest-expo` + `@testing-library/react-native` |
| Config file | `jest.config.js` |
| Quick run command | `npm test -- --runInBand --watchAll=false` |
| Full suite command | Same |
| Estimated runtime | ~60–90s |

### Phase requirements → tests

| Req ID | Behavior | Test type | Command |
|--------|----------|-----------|---------|
| EXPT-01 | Range query returns inclusive window | better-sqlite3 | `npm test` |
| EXPT-01 | HTML contains range label + row count | unit | `npm test` |
| EXPT-02 | Share invoked with PDF URI | RNTL + mocks | `npm test` |
| EXPT-03 | HTML contains disclaimer + table headers | unit | `npm test` |

### Sampling rate

- After each task: `npm test -- --runInBand --watchAll=false`  
- Before UAT: full suite green  

### Wave 0 gaps

- Mock `expo-print`, `expo-sharing`, `expo-file-system` in RNTL tests for export screen (`jest.mock`).

## Security domain (ASVS-lite)

| Concern | Note |
|---------|------|
| Local temp file | Cache URI could be scraped by other apps with storage access — mitigate with delete-after-share and documented risk |
| No network | Share sheet is user-controlled; no automatic exfil |

## RESEARCH COMPLETE
