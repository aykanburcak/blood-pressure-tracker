---
phase: 2
slug: core-logging-and-interpretation
status: draft
nyquist_compliant: false
wave_0_complete: true
created: 2026-04-06
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | jest-expo + @testing-library/react-native |
| **Config file** | `jest.config.js` |
| **Quick run command** | `npm test -- --runInBand --watchAll=false` |
| **Full suite command** | `npm test -- --runInBand --watchAll=false` |
| **Estimated runtime** | ~45 seconds |

---

## Sampling Rate

- **After every task commit:** `npm test -- --runInBand --watchAll=false`
- **After every plan wave:** `npm test -- --runInBand --watchAll=false`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test type | Automated command | File exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | HIST-04 | T-02-01 | Parameterized SQL via ORM | unit/integration | `npm test -- --runInBand --watchAll=false` | ✅ | ⬜ pending |
| 02-01-02 | 01 | 1 | HIST-04 | T-02-01 | Migration applied before insert | integration | same | ✅ | ⬜ pending |
| 02-02-01 | 02 | 1 | INTP-01 | T-02-02 | Deterministic classification | unit | same | ✅ | ⬜ pending |
| 02-02-02 | 02 | 1 | INTP-02 | T-02-03 | Non-diagnostic copy centralized | unit | same | ✅ | ⬜ pending |
| 02-03-01 | 03 | 2 | LOG-01, LOG-02, LOG-03, LOG-04 | T-02-04 | Validated insert only | RNTL | same | ✅ | ⬜ pending |
| 02-03-02 | 03 | 2 | INTP-03 | — | Latest from DB, not mock | RNTL | same | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure from Phase 1 covers Wave 0. No new framework install required for validation.

---

## Manual-Only Verifications

| Behavior | Requirement | Why manual | Test instructions |
|----------|-------------|------------|-------------------|
| Latest reading after force-quit | HIST-04 | Process lifecycle | Save one reading, force-close app, reopen; Home shows same values and category. |
| Date/time picker on Android device | LOG-02 | Native control | Open add-reading, change date and time, save; confirm stored timestamp matches selection (± test tolerance). |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or documented manual substitute
- [ ] Sampling continuity: no three consecutive tasks without automated verify
- [ ] No watch-mode flags in commands
- [ ] `nyquist_compliant: true` set when phase execution complete

**Approval:** pending
