---
phase: 4
slug: pdf-export
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-07
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

## Test infrastructure

| Property | Value |
|----------|-------|
| **Framework** | jest 29.x + jest-expo |
| **Config file** | `jest.config.js` |
| **Quick run command** | `npm test -- --runInBand --watchAll=false` |
| **Full suite command** | `npm test -- --runInBand --watchAll=false` |
| **Estimated runtime** | ~60–90s |

## Sampling rate

- **After every task commit:** `npm test -- --runInBand --watchAll=false`
- **After every plan wave:** Full suite (same command)
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 120s

## Per-task verification map

| Task ID | Plan | Wave | Requirement | Threat ref | Secure behavior | Test type | Automated command | File exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 4-01-01 | 01 | 1 | EXPT-01 | T-04-01 | Drizzle range only | unit | `npm test -- --runInBand --watchAll=false --testPathPattern=readings-sql` | ✅ | ⬜ |
| 4-01-02 | 01 | 1 | EXPT-03 | — | Disclaimer in HTML | unit | `npm test -- --runInBand --watchAll=false --testPathPattern=bp-report-html` | ❌ W0 | ⬜ |
| 4-02-01 | 02 | 2 | EXPT-01, EXPT-02 | T-04-02 | Cache path only | manual + typecheck | `npx tsc --noEmit` | ✅ | ⬜ |
| 4-03-01 | 03 | 3 | EXPT-01–03 | T-04-03 | User-initiated share | RNTL | `npm test -- --runInBand --watchAll=false --testPathPattern=export` | ❌ W0 | ⬜ |

## Wave 0 requirements

- [ ] `src/features/export/__tests__/bp-report-html.test.ts` — HTML structure + disclaimer
- [ ] `src/app/__tests__/export-report.test.tsx` (or under `features/export`) — mocked native modules
- [ ] Existing `readings-sql.test.ts` extended for range query

## Manual-only verifications

| Behavior | Requirement | Why manual | Test instructions |
|----------|-------------|------------|-------------------|
| PDF opens in Android viewer | EXPT-03 | Render engine | Generate PDF on device; open from Files or share target; confirm readable table |
| Share sheet lists targets | EXPT-02 | OS UI | Tap Share; pick Drive/Email; confirm attachment is PDF |

## Validation sign-off

- [ ] All tasks have automated verify or manual row above
- [ ] No watch-mode flags in CI commands
- [ ] `nyquist_compliant: true` set when execution complete

**Approval:** pending
