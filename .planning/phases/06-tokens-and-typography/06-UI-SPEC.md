# Phase 6 — UI-SPEC (token contract only)

**Role:** Design contract for **semantic tokens** delivered in Phase 6. Screen layout and components are Phase 7–8.

## Colors (light)

| Token | Hex | Use |
|-------|-----|-----|
| surface | `#F9F9FE` | Screen background (`dominant` alias) |
| surfaceContainerLow | `#F3F3F8` | Inset / grouped areas |
| surfaceContainerHigh | `#E8E8ED` | Secondary / recessed controls (Phase 7) |
| surfaceContainerLowest | `#FFFFFF` | Cards (`secondary` alias) |
| onSurface | `#1A1C1F` | Primary text (`textPrimary` alias) |
| onSurfaceVariant | `#414755` | Secondary text (`textSecondary` alias) |
| outline | `#717786` | Rare borders |
| outlineVariant | `#C1C6D7` | Ghost borders |
| primary | `#0058BC` | Primary actions (`accent` alias) |
| primaryContainer | `#0070EB` | Emphasis / gradient end (Phase 7) |

Interpretation chip colors: remain vivid; adjust only if contrast on `#F9F9FE` / `#FFFFFF` fails automated or manual check.

## Typography

| Role | Family | Weight |
|------|--------|--------|
| display, heading | Manrope | 600–700 |
| body, label | Inter | 400 / 600 |

Optional: `letterSpacing` ≈ **-0.5** on `display` only.

## Radius

- Keep `sm` / `md` / `lg` in **12–24** range.
- Add **`pill`**: `9999` for Phase 7 buttons.

## Shadow

- Tint **`#1A1C1F`**, opacity **~0.06–0.08**, blur **24–32**, small vertical offset.

---

*Stitch reference: `.planning/research/STITCH-SOURCE.md`*
