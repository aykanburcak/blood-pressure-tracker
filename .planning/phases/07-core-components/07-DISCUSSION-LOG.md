# Phase 7: Core components — Discussion log

**Date:** 2026-04-07  
**Command:** `/gsd-discuss-phase 7`  
**Mode:** Async — recommended defaults from Stitch + codebase scout (no interactive menu).

## Gray areas → resolutions

| Topic | Resolution |
|-------|------------|
| Primary button gradient | **Solid `primary`** in Phase 7; gradient optional later (`expo-linear-gradient`). |
| Pill vs large radius | **`radius.pill`** for primary CTA. |
| Secondary pressables | **`surfaceContainerHigh`**, no hard border; selected preset = primary tint. |
| SurfaceCard radius | **`radius.lg`** + white / `surfaceContainerLowest`. |
| WHO chip | **Centralized** helper or component; soft alpha fill + on-surface text; optional ghost border only if contrast fails. |
| Form inputs | **`surfaceContainerLow`** background; focus ring **discretionary**. |
| Delete / destructive | **Unchanged** semantic (destructive). |

## Files reviewed

- `PrimaryButton.tsx`, `SurfaceCard.tsx`, `index.tsx` (chip), `export-report.tsx`, `AddReadingScreen.tsx`, `EditReadingScreen.tsx`, `InfoRow.tsx`

## Next step

`/gsd-plan-phase 7`
