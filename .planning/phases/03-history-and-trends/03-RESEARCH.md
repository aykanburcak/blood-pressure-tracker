# Phase 3: History and Trends — Research

**Researched:** 2026-04-06  
**Domain:** Readings list/edit/delete, Skia-backed trend charts, SQLite aggregates with Drizzle  
**Confidence:** HIGH (stack guidance + Phase 2 patterns)

<user_constraints>
## User Constraints (from `03-CONTEXT.md`)

- History tab: reverse-chron list + navigate to edit by id (D-30, D-31).  
- Edit uses Zod gate; delete with `Alert` then hard delete (D-32–D-34).  
- Trends on History: summaries + dual-series line chart, paired data per row (D-35–D-37).  
- Victory Native XL + Skia + Reanimated; dev build after native deps (D-36).  
- Rolling 7d/30d windows in ms (D-38).

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Research takeaway |
|----|-------------------|
| HIST-01 | `listReadings()` + `FlatList` + `useFocusEffect` reload; empty state when count 0. |
| HIST-02 | `getReadingById` + edit route; `updateReading` after `readingInputSchema.safeParse`. |
| HIST-03 | `deleteReading` after confirm; list removes row on return. |
| TRND-01 | Skia + Victory Native line chart; x = `measuredAt`, y1/y2 = SBP/DBP from same rows. |
| TRND-02 | Repository helpers: avg SBP/DBP + count for 7d and 30d windows from SQLite. |
| TRND-03 | Do not chart SBP and DBP from independent unsorted streams — map one row → one x with two y values. |

</phase_requirements>

## Summary

**Data layer:** Extend `readings-repository.ts` with Drizzle `select`/`update`/`delete` — no schema migration if hard-delete only. Add **`listReadings`**, **`getReadingById`**, **`updateReading`**, **`deleteReading`**, **`listReadingsBetween(startMs,endMs)`** (ascending by `measuredAt` for chart), and **`getTrendWindowStats()`** returning structured averages + counts for 7d and 30d. Validate with **better-sqlite3** tests mirroring Phase 2 `readings-sql` style.

**UI:** Replace History empty-only shell with **summary strip + chart region + list**. Add **`edit-reading/[id]`** stack screen; register in `src/app/_layout.tsx`. Reuse add-reading field layout and DateTimePicker patterns.

**Charts:** Install `@shopify/react-native-skia` and `victory-native` via `npx expo install` (versions compatible with Expo SDK 55). Follow Victory Native XL + Expo prebuild workflow — **Expo Go may not suffice** after Skia; use **development build** for implementation verification.

**Pitfalls:** Large lists — use `keyExtractor` on `id`, avoid inline `renderItem` recreation where measurable; chart performance — limit plotted points to windowed query (e.g. last 90 days cap) if list grows large (agent discretion, document in code comment).

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | `jest-expo` + `@testing-library/react-native` |
| Config file | `jest.config.js` |
| Quick run command | `npm test -- --runInBand --watchAll=false` |
| Full suite command | Same |
| Estimated runtime | ~60s |

### Phase Requirements → Test Map

| Req ID | Behavior | Test type | Automated command |
|--------|----------|-----------|-------------------|
| HIST-01 | List shows rows newest-first | RNTL + repo | `npm test -- --runInBand --watchAll=false` |
| HIST-02 | Edit saves valid changes | RNTL + repo | same |
| HIST-03 | Delete removes row | RNTL + repo | same |
| TRND-01 | Chart component renders with mock data | RNTL (mock Skia if needed) | same |
| TRND-02 | Window stats match fixture DB | unit / better-sqlite3 | same |
| TRND-03 | Chart data array preserves SBP/DBP pairs | unit | same |

### Sampling Rate

- After each task: `npm test -- --runInBand --watchAll=false`  
- Before UAT: full suite green  

### Wave 0 Gaps

- If Skia breaks Jest, add `jest.mock('@shopify/react-native-skia')` or test chart logic via pure **data selector** tests + shallow render — document in plan 03-03.

## Security Domain (ASVS-lite)

| Concern | Note |
|---------|------|
| Local data | Edit/delete only affect local SQLite; no new trust boundary vs Phase 2 |
| IDOR N/A | No multi-user server; validate `getReadingById` returns null → edit screen shows not-found |

## RESEARCH COMPLETE
