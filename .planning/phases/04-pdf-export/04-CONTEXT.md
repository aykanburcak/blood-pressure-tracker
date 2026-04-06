# Phase 4: PDF Export — Context

**Gathered:** 2026-04-07  
**Status:** Ready for planning  
**Source:** Roadmap success criteria + `AGENTS.md` stack (no separate discuss-phase)

## Phase boundary

Deliver clinician-oriented PDF reports from **local SQLite** readings for a **user-selected time range**, using **HTML → PDF** (`expo-print`) and **Android share/save** (`expo-sharing` + `expo-file-system`). No cloud, no automatic upload.

## Implementation decisions

### Product

- **Range model:** User picks a window with **presets** (aligned with existing trend windows: last 7 days, last 30 days, last 90 days) plus **custom** start/end via native date pickers. Range is **inclusive** on `measuredAt` ms: `startMs <= measuredAt <= endMs`.
- **Entry point:** **Settings** primary row “Export PDF” → dedicated stack screen (keeps History focused; footnote copy already references export).
- **Empty range:** If zero readings in range, **block** PDF generation with inline message (no empty PDF).

### Technical

- **Query:** New repository helper `listReadingsInRange(startMs, endMs)` — rows **ascending** by `measuredAt` (then `createdAt`) for chronological report tables.
- **Report body:** Static HTML template built in TypeScript; include **WHO-style labels per row** via existing `classifyBloodPressure` and **non-diagnostic disclaimer** via `medical-disclaimer` (same boundary as Phase 2).
- **File lifecycle:** Write PDF under `FileSystem.cacheDirectory` with a deterministic filename pattern; after **successful** share intent, **delete** temp file when possible (best-effort `deleteAsync`).

### Out of scope (v1)

- CSV/JSON export, email integration beyond system share sheet, printing without share, iOS.

## Canonical references

- `.planning/ROADMAP.md` — Phase 4 goal and success criteria  
- `.planning/REQUIREMENTS.md` — EXPT-01, EXPT-02, EXPT-03  
- `AGENTS.md` — PDF-only export, offline-first  
- `src/lib/db/readings-repository.ts`, `src/lib/db/readings-queries.ts` — data access patterns  
- `src/lib/bp/who-classification.ts`, `src/lib/bp/medical-disclaimer.ts` — report wording  
- `src/lib/theme/tokens.ts` — `copy` for Settings/export strings  

---

*Phase: 04-pdf-export*
