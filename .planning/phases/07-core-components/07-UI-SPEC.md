# Phase 7 — UI-SPEC (components)

Extends [`.planning/phases/06-tokens-and-typography/06-UI-SPEC.md`](../06-tokens-and-typography/06-UI-SPEC.md).

## PrimaryButton

| Property | Value |
|----------|--------|
| Shape | `radius.pill` |
| Fill | `colors.primary` |
| Label | `colors.onPrimary` (`#FFFFFF`) |
| Pressed | Opacity ~0.92 (existing pattern) |

## SurfaceCard

| Property | Value |
|----------|--------|
| Fill | `colors.surfaceContainerLowest` / `secondary` |
| Corner | `radius.lg` |
| Shadow | `shadow.card` |

## Secondary pressable (preset chip, date row, InfoRow)

| State | Background | Text |
|-------|--------------|------|
| Default | `surfaceContainerHigh` | `textPrimary` / `textSecondary` as today |
| Selected (preset only) | Primary @ ~15% alpha | `primary` |
| Pressed | Opacity 0.9 on container | — |

**No** default 1px border on preset chips.

## TextInput / date field (add + edit)

| Property | Value |
|----------|--------|
| Fill | `surfaceContainerLow` |
| Radius | `radius.md` (16) |
| Border | none |

## Interpretation chip (WHO)

| Property | Value |
|----------|--------|
| Fill | Category color @ ~20% alpha |
| Text | `textPrimary` |
| Border | none unless contrast fails |
