# Phase 3: History and Trends — Context

**Gathered:** 2026-04-06  
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 3 turns persisted readings into **reviewable history** and **trend surfaces**: reverse-chronological list, per-reading **edit** and **delete**, a **timeline chart** that keeps systolic and diastolic paired per underlying row, and **recent-period summaries** computed from SQLite (not transient UI state). It does **not** implement PDF export (Phase 4), Settings privacy copy expansion beyond Phase 1 (Phase 5), or cloud sync.

</domain>

<decisions>
## Implementation Decisions

### History list (HIST-01)
- **D-30:** The **History** tab is the primary surface for browsing saved readings in **reverse chronological order** by `measuredAt` (tie-breaker: `createdAt` desc), matching the repository ordering contract from Phase 2.
- **D-31:** Use **`FlatList`** (or `FlashList` only if already in repo — **not** added in Phase 3) with row tap navigating to an **edit** screen for that reading id.

### Edit and delete (HIST-02, HIST-03)
- **D-32:** **Edit** reuses the same **Zod** rules as add (`readingInputSchema` / shared parse path) before calling `updateReading`; **measuredAt** remains user-adjustable.
- **D-33:** **Delete** is **hard delete** from SQLite with a **native confirmation dialog** (`Alert.alert`) before calling `deleteReading`; no soft-delete column in v1 unless schema change is unavoidable (default: avoid schema change).
- **D-34:** Edit screen lives at **`src/app/edit-reading/[id].tsx`** (stack route sibling to `add-reading`) with standard stack **back** affordance.

### Trends (TRND-01, TRND-02, TRND-03)
- **D-35:** **Chart + summaries** render on the **History** tab **above** the list: a compact **trend summary strip** (e.g. last 7 days and last 30 days averages + reading counts) and a **line chart** with **two series** (systolic, diastolic) sharing the **same x-axis** (measurement time), preserving pairing by using one query row per reading for points.
- **D-36:** Chart stack matches **AGENTS.md**: **`victory-native`** (Victory Native XL) + **`@shopify/react-native-skia`** + existing **`react-native-reanimated`**; **development build** is expected after adding Skia (document in plan, not Expo Go-only).
- **D-37:** **Empty / sparse data:** If fewer than two points, show a calm **chart placeholder** (copy + muted graphic) rather than a broken chart; summaries may show **0** count and **em dash** or “—” for averages per UI-SPEC.

### Period definitions (TRND-02)
- **D-38:** “Last 7 days” and “Last 30 days” are **rolling windows** from the **device’s current time** at query execution: `measuredAt >= Date.now() - N * 86400000` (agent may use `date-fns` if already present; otherwise raw ms math).

### Agent discretion
- Exact chart height, axis tick density, and summary card layout within Phase 1 spacing rhythm  
- Whether edit screen duplicates form markup vs extracts a shared presentational block from `AddReadingScreen`  
- Pull-to-refresh on History (optional; focus refresh is minimum)

</decisions>

<specifics>
## Specific Ideas

- Reuse **WHO classification** + interpretation tokens for **list row** secondary label (optional chip) for quick context without opening edit.
- After successful **update** or **delete**, `router.back()` to History and list reflects changes via **focus reload** (same pattern as Home).

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase definition
- `.planning/ROADMAP.md` — Phase 3 goal, success criteria, requirement IDs  
- `.planning/REQUIREMENTS.md` — `HIST-01`–`HIST-03`, `TRND-01`–`TRND-03`

### Product and stack
- `.planning/PROJECT.md` — Core value, medical boundary, offline-first  
- `AGENTS.md` — Chart stack recommendation, SQLite/Drizzle, Android focus  

### Prior phases
- `.planning/phases/02-core-logging-and-interpretation/02-CONTEXT.md` — Persistence and validation boundaries  
- `.planning/phases/02-core-logging-and-interpretation/02-UI-SPEC.md` — Add-reading and interpretation chrome  
- `.planning/phases/01-foundation-and-offline-shell/01-UI-SPEC.md` — Shell, tabs, typography  

### Code
- `src/lib/db/readings-repository.ts`, `src/lib/db/schema.ts`  
- `src/features/readings/AddReadingScreen.tsx`, `src/lib/bp/reading-schema.ts`  
- `src/app/_layout.tsx`, `src/app/(tabs)/history.tsx`

</canonical_refs>
