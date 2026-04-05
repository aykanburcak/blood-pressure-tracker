---
phase: 1
slug: foundation-and-offline-shell
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-05
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | jest-expo + @testing-library/react-native |
| **Config file** | none — Wave 0 installs and configures test harness |
| **Quick run command** | `npm test -- --runInBand --watchAll=false` |
| **Full suite command** | `npm test -- --runInBand --watchAll=false` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm test -- --runInBand --watchAll=false`
- **After every plan wave:** Run `npm test -- --runInBand --watchAll=false`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 45 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 0 | CORE-01 | — | App shell launches without auth or network gate | integration | `npm test -- --runInBand --watchAll=false` | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 0 | CORE-02 | — | Privacy gate renders locally and can be acknowledged once | integration | `npm test -- --runInBand --watchAll=false` | ❌ W0 | ⬜ pending |
| 01-01-03 | 01 | 0 | CORE-03 | — | Tabs and shell render without remote dependencies | integration | `npm test -- --runInBand --watchAll=false` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `package.json` — create project scripts for `test`
- [ ] `jest.config.*` or Expo Jest preset wiring — configure test runner
- [ ] `test/render.tsx` — shared render helper for routed screen tests
- [ ] `src/app/__tests__/privacy-gate.test.tsx` — privacy gate coverage for CORE-02
- [ ] `src/app/__tests__/tabs-shell.test.tsx` — shell and tab coverage for CORE-01 and CORE-03
- [ ] `jest-expo` and `@testing-library/react-native` — install framework dependencies

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| First-launch splash-to-privacy flow feels smooth on Android emulator/device | CORE-01, CORE-02 | Perceived polish and launch timing are hard to trust from Jest alone | Launch the Android app from a clean install, verify splash clears quickly, privacy screen appears first, then acknowledge and confirm tab shell opens |
| Empty-state Home, History, and Settings screens feel like real product surfaces rather than placeholders | CORE-01, CORE-03 | Visual completeness and product feel require human review | Open each tab on Android, verify no “coming soon” messaging and each screen has intentional empty-state structure |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 45s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
