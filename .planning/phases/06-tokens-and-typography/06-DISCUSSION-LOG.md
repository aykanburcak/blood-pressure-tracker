# Phase 6: Tokens & typography — Discussion log

**Date:** 2026-04-07  
**Command:** `/gsd-discuss-phase 6`  
**Mode:** Async (no interactive gray-area picker in session) — **recommended defaults** applied per `STITCH-SOURCE.md` and roadmap.

## Gray areas considered

| Topic | Options | Resolution |
|-------|---------|--------------|
| Primary blue | Material `#0058BC` / `#0070EB` vs Apple `#007AFF` | **Material pair** for primary actions; `#007AFF` deferred unless Phase 7 needs a distinct “link” accent. |
| Token migration | Big-bang rename vs semantic + aliases | **Semantic palette + aliases** for legacy `dominant` / `secondary` / `accent` / `text*` to limit Phase 6 file churn. |
| Font packages | Google Fonts npm vs local assets | **`@expo-google-fonts/manrope`** + **`@expo-google-fonts/inter`**. |
| Splash / load | Block on fonts vs async swap | **Prefer block** until fonts ready; planner may add short timeout + system fallback. |
| Dark mode | In Phase 6 | **No** — light only. |
| Radius | ROUND_EIGHT vs large cards | **Keep large card radii**; optional `pill` token for Phase 7; align numeric scale with Stitch where obvious. |
| Shadows | Current vs ambient tinted | **Tinted `onSurface`, lower opacity, larger blur** per Stitch doc. |

## User prompts captured

- Align app with Stitch [Apple Health BP Tracker](https://stitch.withgoogle.com/projects/7766087000680671419) (milestone v1.1).

## Next step

`/gsd-plan-phase 6` (or `/gsd-research-phase 6` if planner wants a short font/Android shadow note first).
