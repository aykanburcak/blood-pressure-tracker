---
phase: 6
slug: tokens-and-typography
status: draft
nyquist_compliant: false
wave_0_complete: true
created: 2026-04-07
---

# Phase 6 — Validation strategy

## Test infrastructure

| Property | Value |
|----------|-------|
| Framework | jest-expo + RNTL |
| Setup | `src/test/setup.ts` |
| Command | `npm test -- --runInBand --watchAll=false` |
| Typecheck | `npx tsc --noEmit` |

## Sampling

- After each task: `tsc`
- After plan wave complete: full `npm test`
- Before verify-work: full suite green

## Per-task map

| Task | Plan | Requirement | Automated |
|------|------|-------------|-----------|
| 1 | 01 | DS-02 | npm install |
| 2 | 01 | DS-01 | tsc |
| 3 | 01 | DS-03 | tsc |
| 4 | 01 | DS-02 | tsc |
| 5 | 01 | DS-02 | tsc + manual cold start |
| 6 | 01 | DS-01–03 | full jest |

## Manual

| Check | When |
|-------|------|
| Cold start: splash clears, text uses new faces | After Task 5 on device/emulator |
| Card elevation on Android | After Task 3 |
