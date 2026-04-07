# Stitch design source — Apple Health BP Tracker

**Project:** `projects/7766087000680671419`  
**URL:** https://stitch.withgoogle.com/projects/7766087000680671419  
**Pulled:** planning milestone start (via Stitch MCP)

## Role

Reference for **v1.1 design-system alignment**. Not a second product spec — adapt tokens and components to this direction while keeping Android + React Native constraints.

## Theme snapshot (authoritative numbers from API)

| Token | Value / note |
|-------|----------------|
| **Light surface** | `#f9f9fe` (surface), cards on `surface_container_lowest` `#ffffff` |
| **Primary** | `#0058bc` → actions; `primary_container` `#0070eb` (gradient pair for CTAs) |
| **On-surface** | `#1a1c1f` (avoid pure black) |
| **On-surface variant** | `#414755` |
| **Outline / ghost border** | `outline` `#717786`, `outline_variant` `#c1c6d7` |
| **Typography** | Headlines **Manrope**, body/labels **Inter** |
| **Roundness** | `ROUND_EIGHT` in Stitch → map to 8pt scale; primary buttons may use pill / `xl` (~24) |
| **Overrides** | `overridePrimaryColor` `#007AFF`, neutral `#F2F2F7` (Apple-ish accents) |

## Design principles (from embedded `designMd`)

- **Tonal layering** instead of heavy borders; avoid 1px dividers for sectioning where possible.
- **Cards:** white (`surface_container_lowest`) on cool surface; radius lg/xl; soft shadow (low opacity, tinted shadow).
- **Primary button:** high contrast fill, pill or large radius; optional linear gradient primary → primary_container.
- **Secondary:** `surface_container_high` fill, no hard border.
- **Chips (e.g. WHO status):** soft fills / subtle gradients, text remains hero.
- **Tab bar / chrome:** “glass” optional — project has `expo-glass-effect`; use only if performance and Android parity are acceptable.
- **Spacing:** intentional clusters + larger gaps (not uniform 8/16 everywhere).

## Screens in project (for visual QA)

Non-hidden instances include IDs mapping to `projects/.../screens/{id}` — use `list_screens` / `get_screen` in Stitch MCP when implementing a specific frame.

## Implementation notes

- **Fonts:** load Manrope + Inter via `expo-font` + `expo-google-fonts` or bundled assets; fallback to system sans if load fails.
- **PDF export:** keep report legible if web fonts differ from app.
- **Medical copy:** unchanged — only visual system moves, not WHO logic.
