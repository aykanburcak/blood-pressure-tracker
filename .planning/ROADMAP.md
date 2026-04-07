# Roadmap: Blood Pressure Tracker

## Milestones

- ✅ **v1.0 Android v1** — Phases 1–5 (shipped **2026-04-06**). [`.planning/milestones/v1.0-ROADMAP.md`](milestones/v1.0-ROADMAP.md).
- 🔄 **v1.1 Stitch design alignment** — Phases **6–8** (this milestone). v1.0 phase folders remain under `.planning/phases/01-*`…`05-*` as archive; **new work** uses `06-*`, `07-*`, `08-*`.
- 📋 **Later** — Engagement / ecosystem backlog in `.planning/REQUIREMENTS.md`.

## v1.1 — Active roadmap

| Phase | Name | Goal | Requirements | Success criteria (summary) |
|-------|------|------|--------------|----------------------------|
| **6** | Tokens & typography | Stitch-aligned color system, radii, shadows; Manrope + Inter | DS-01, DS-02, DS-03 | Dominant screen bg and semantic colors match STITCH-SOURCE; fonts load on cold start with fallback documented; tsc + tests green |
| **7** | Core components | Buttons, cards, chips match Stitch | DS-04, DS-05, DS-06, DS-07 | Primary/secondary buttons and cards match spec in light mode; chips readable; snapshot or RNTL where valuable |
| **8** | Shell & screen polish | Tabs, key flows, PDF | DS-08, DS-09, DS-10 | Tab bar acceptable on Android; Home/History/Settings/add/edit pass visual checklist; PDF still legible |

### Phase 6 — Tokens & typography

- **Depends on:** —  
- **Delivers:** Updated `src/lib/theme` (and related) per DS-01–03; font loading in root layout if required.  
- **Discussion:** [`.planning/phases/06-tokens-and-typography/06-CONTEXT.md`](phases/06-tokens-and-typography/06-CONTEXT.md)

### Phase 7 — Core components

- **Depends on:** Phase 6  
- **Delivers:** `PrimaryButton`, `SurfaceCard`, interpretation chip styles, any shared input chrome touched by DS-04–07.  
- **Discussion:** [`.planning/phases/07-core-components/07-CONTEXT.md`](phases/07-core-components/07-CONTEXT.md)

### Phase 8 — Shell & screen polish

- **Depends on:** Phase 7  
- **Delivers:** `(tabs)/_layout` and screen-level spacing/dividers; PDF HTML/CSS token alignment.

---

## Next action

Phase **6** done; Phase **7** discussed. Run **`/gsd-plan-phase 7`** for buttons, cards, chips (DS-04–DS-07).

---

*Updated: 2026-04-07 — milestone v1.1 roadmap (phases 6–8).*
