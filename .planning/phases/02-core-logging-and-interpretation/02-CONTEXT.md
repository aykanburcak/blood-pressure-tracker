# Phase 2: Core Logging and Interpretation - Context

**Gathered:** 2026-04-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 2 delivers the first real data loop: a dedicated add-reading flow with validation, durable SQLite storage for readings, immediate post-save feedback, and WHO-based (non-diagnostic) interpretation surfaced on the Home dashboard—including after app restart. It does **not** implement full history browsing, editing, deleting, charts, PDF export, or Settings-driven privacy copy beyond what Phase 1 already shipped.

</domain>

<decisions>
## Implementation Decisions

### Add-reading flow and navigation
- **D-12:** The primary path to log a reading should be a **dedicated add-reading screen** (not an in-tab modal sheet as the only option), reachable from an obvious **Home primary CTA** consistent with Phase 1’s “no FAB” shell direction.
- **D-13:** After a successful save, the user should return to **Home** and see the **latest reading summary** updated without requiring a manual refresh (INTP-03, roadmap success criterion 3).

### Fields, defaults, and validation
- **D-14:** **Systolic** and **diastolic** are required; **pulse** is **optional** but supported in the same form when provided (LOG-01).
- **D-15:** **Measured date/time** defaults to **now** and remains user-adjustable before save (LOG-02).
- **D-16:** Save is blocked when required fields are missing or fail **Zod-validated plausibility ranges** at the entry boundary; exact numeric bounds are **agent discretion** but must be consistent, documented in code, and easy to tune (LOG-03).

### Persistence and stack alignment
- **D-17:** Readings persist in **SQLite** via **`expo-sqlite`** with a **typed schema and migrations** path aligned with project stack guidance (**Drizzle ORM** when introduced in this phase) (HIST-04).
- **D-18:** Phase 1 **`app-shell-flags`** storage remains separate; readings live in their own relational table(s), not in the flags key-value surface.

### Interpretation and medical boundary
- **D-19:** Each saved reading’s **WHO-based category** is computed deterministically from systolic/diastolic using **standard WHO band tables**; presentation uses **calm color support** (chip/badge/row accent) without alarmist language (INTP-01, INTP-02).
- **D-20:** The add-reading and/or dashboard surfaces must include **explicit non-diagnostic framing** (short disclaimer adjacent to interpretation), consistent with `PROJECT.md` and requirements (INTP-02).

### History tab scope in Phase 2
- **D-21:** **HIST-01** (browse history) is **Phase 3**. For Phase 2, the **History** tab may remain the Phase 1 **empty-state structure** or show a **minimal “readings exist” hint** without building the full reverse-chronological list UX—that list is explicitly deferred to Phase 3. **HIST-04** is satisfied by **Home showing the latest persisted reading after relaunch** (and by persistence existing for later phases).

### Agent discretion
- Exact visual layout of numeric inputs (single screen vs stepped sections), haptics, and microcopy tone within the calm Apple Health–inspired direction
- Whether add-reading is a stack screen vs tab-hidden route, as long as navigation is obvious and testable
- Specific WHO color tokens vs reusing `src/lib/theme/tokens.ts` with small extensions

</decisions>

<specifics>
## Specific Ideas

- Reuse `ScreenContainer`, `SurfaceCard`, `PrimaryButton`, and typography rhythm from Phase 1 for a cohesive first data experience.
- Prefer **one primary “Save reading”** action with disabled state or inline validation errors rather than multi-step wizards for v1 speed.
- Immediate confirmation can be **inline on Home** (updated summary card) rather than a separate success modal, unless a modal improves clarity during implementation.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase definition
- `.planning/ROADMAP.md` — Phase 2 goal, success criteria, and requirements mapping.
- `.planning/REQUIREMENTS.md` — `LOG-01`–`LOG-04`, `HIST-04`, `INTP-01`–`INTP-03`.

### Product and stack
- `.planning/PROJECT.md` — Core value, UX bar, medical boundary, offline-first constraints.
- `AGENTS.md` — Prescribed stack notes for Expo, SQLite/Drizzle, Zod, DateTimePicker.

### Prior phase UX contract
- `.planning/phases/01-foundation-and-offline-shell/01-CONTEXT.md` — Shell/tab/privacy decisions carried forward.
- `.planning/phases/01-foundation-and-offline-shell/01-UI-SPEC.md` — Visual direction for dashboard and empty states (interpretation colors may extend tokens in Phase 2).

### Project state
- `.planning/STATE.md` — Current sequencing and workflow position.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable assets
- `src/components/ui/ScreenContainer.tsx`, `ScreenTitle.tsx`, `SurfaceCard.tsx`, `EmptyStatePanel.tsx`, `PrimaryButton.tsx`, `InfoRow.tsx`
- `src/lib/theme/tokens.ts` and `src/lib/theme/index.ts`
- Tab shell: `src/app/(tabs)/_layout.tsx`, `src/app/(tabs)/index.tsx`, `src/app/(tabs)/history.tsx`, `src/app/(tabs)/settings.tsx`
- Privacy gate: `src/features/onboarding/usePrivacyGate.ts`, `src/lib/storage/app-shell-flags.ts`
- Tests: `src/test/render.tsx`, `src/test/setup.ts`, feature tests under `src/features/**/__tests__/`

### Established patterns
- Expo Router with root stack in `src/app/_layout.tsx` and entry `src/app/index.tsx`
- SQLite already used for shell flags via `expo-sqlite` in `app-shell-flags.ts`

### Integration points
- Home tab becomes the surface for **latest reading summary** and the **primary CTA** into add-reading.
- New persistence layer should be introduced as a small **readings** module (schema + queries) consumed by Home and the add-reading screen.

### Gaps relative to Phase 2
- No Drizzle schema/migrations or readings table yet.
- No add-reading route, WHO interpretation module, or datetime picker wiring yet.

</code_context>
