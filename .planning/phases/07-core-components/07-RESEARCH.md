# Phase 7 — Research notes (core components)

**Date:** 2026-04-07

## Primary tint (selected chips)

- Use **8-digit hex** `#0058BC26` (~15% alpha) or **`rgba(0, 88, 188, 0.15)`** for selected export preset background so it matches `colors.primary` without a second source of truth.
- React Native `backgroundColor` accepts `#RRGGBBAA` on supported versions; if any test environment fails, use `rgba` from a tiny helper.

## WHO chip fill

- Category colors from `getInterpretationColor` are full hex; convert to rgba with **~20%** alpha for fill, keep label `colors.textPrimary`.

## Pressed state

- **`transform: [{ scale: 0.98 }]`** can clip on Android if parent has `overflow: hidden`; **opacity** on `pressed` is the safer default for `PrimaryButton`.
