---
phase: 3
slug: history-and-trends
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-06
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | jest 29.x (jest-expo) |
| **Config file** | `jest.config.js` |
| **Quick run command** | `npm test -- --runInBand --watchAll=false` |
| **Full suite command** | `npm test -- --runInBand --watchAll=false` |
| **Estimated runtime** | ~60 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm test -- --runInBand --watchAll=false`
- **After every plan wave:** Full suite
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 90 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 3-01-01 | 01 | 1 | HIST-02 | T-03-01 | Drizzle builders only for mutations | unit | `npm test -- --runInBand --watchAll=false` | ✅ | ⬜ pending |
| 3-01-02 | 01 | 1 | HIST-03 | T-03-01 | delete by id only after UI confirm (UI plan) | unit | same | ✅ | ⬜ pending |
| 3-01-03 | 01 | 1 | TRND-02 | — | N/A | unit | same | ✅ | ⬜ pending |
| 3-02-01 | 02 | 2 | HIST-01 | — | N/A | RNTL | same | Plan adds | ⬜ pending |
| 3-02-02 | 02 | 2 | HIST-02 | — | Zod before update | RNTL | same | Plan adds | ⬜ pending |
| 3-02-03 | 02 | 2 | HIST-03 | T-03-02 | Alert gate before delete | RNTL | same | Plan adds | ⬜ pending |
| 3-03-01 | 03 | 3 | TRND-01 | — | Local-only chart data | RNTL / mock | same | Plan adds | ⬜ pending |
| 3-03-02 | 03 | 3 | TRND-03 | — | Paired series from one query | unit | same | Plan adds | ⬜ pending |

---

## Wave 0 Requirements

- [x] Existing Jest + RNTL from Phase 1–2 cover the harness.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Skia chart renders on device | TRND-01 | GPU / native | Open History with 3+ readings on Android dev build; confirm lines visible and scroll list below. |
| Delete confirm cancels | HIST-03 | Alert UI | Tap delete, cancel, row still present. |

---

## Validation Sign-Off

- [ ] All tasks have automated verify or manual table above
- [ ] Sampling continuity maintained
- [ ] No watch-mode flags
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
