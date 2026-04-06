---
status: draft
phase: 02-core-logging-and-interpretation
updated: "2026-04-06"
---

## Phase 2 UAT

Run `/gsd-verify-work` for Phase 2 after reviewing implementation.

### Suggested checks

1. **Automated:** `npm test -- --runInBand --watchAll=false`
2. **Add reading:** From Home, tap **Add reading**, enter valid BP, optional pulse, adjust date/time, **Save reading** — returns to Home with updated summary.
3. **Validation:** Out-of-range or diastolic ≥ systolic — save blocked with visible errors; no row written.
4. **Interpretation:** Latest card shows WHO-style label, tinted chip, and disclaimer line.
5. **Persistence:** Force-close app after save — Home still shows the same latest reading (HIST-04).
