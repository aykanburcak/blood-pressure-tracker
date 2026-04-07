# Phase 7: Core components — Context

**Gathered:** 2026-04-07  
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement **DS-04–DS-07** by updating shared UI building blocks and the **interpretation chip** pattern so they match the Stitch “Clinical Atelier” component rules, **using Phase 6 tokens** (`colors.surface*`, `primary`, `radius.pill`, typography, shadow). In scope: `PrimaryButton`, `SurfaceCard`, WHO status chip presentation, and **secondary / recessed pressable surfaces** used for date pickers, export range chips, and similar controls. **Touch form field chrome** where it is clearly shared (`TextInput` / date row backgrounds on add/edit reading). **Out of scope:** tab bar, stack headers, full screen layout sweeps, PDF HTML, list row structure beyond chip/pressable styling — those are **Phase 8** (DS-08–DS-10). No changes to WHO thresholds, labels, or medical copy.

</domain>

<decisions>
## Implementation Decisions

### Primary CTA (DS-04)

- **D-01:** **`PrimaryButton`** uses **pill shape**: `borderRadius: radius.pill` (9999), full-width behavior unchanged, `minHeight` / hit area unchanged.
- **D-02:** Fill is **solid** `colors.primary` (`#0058BC` via token). **No new dependency** for linear gradients in the default Phase 7 plan; optional follow-up: add `expo-linear-gradient` and a `LinearGradient` wrapper for primary → `primaryContainer` if product insists on exact Stitch gradient.
- **D-03:** Label color **on-primary white** `#FFFFFF` (acceptable literal or add `colors.onPrimary` in tokens during implementation — planner picks one place as source of truth).
- **D-04:** Pressed state: keep subtle **opacity** scale-down (~0.96) or opacity on press consistent with Stitch “physical depression”; **agent discretion** between scale and opacity if Android rendering differs.

### Secondary / recessed pressables (DS-05)

- **D-05:** **Unselected** export preset chips, **date/time rows** (add + edit reading, export custom range), and similar tappable fields use **`colors.surfaceContainerHigh`** as default background **without** a visible 1px border; pressed state = slight opacity or tonal shift only.
- **D-06:** **Selected** export preset chip uses **primary-tinted** background (e.g. `primary` at ~12–18% opacity) and **primary** label color — not a second “accent” hex.
- **D-07:** **Destructive** actions (e.g. delete reading) **stay** clearly destructive; do not restyle as “secondary.” **InfoRow** disclosure chevron row: use same **surfaceContainerHigh** press target as other secondary surfaces where it reads as navigation, not primary action.

### Cards (DS-06)

- **D-08:** **`SurfaceCard`** uses **`radius.lg`** (24) and **`colors.surfaceContainerLowest`** / `colors.secondary` (already white) for fill; shadow remains `shadow.card`. Padding API unchanged.
- **D-09:** Screen roots already sit on **`colors.dominant`** / `surface` from Phase 6 — no change required unless a screen hard-coded an old hex (grep and fix only if found).

### WHO interpretation chip (DS-07)

- **D-10:** Replace ad-hoc **`${chipColor}22`** on Home with a **single helper or small component** (e.g. `interpretationChipColors(category)` or `InterpretationChip`) so all WHO chips use a **consistent soft fill** (roughly **18–22%** alpha of category color, tuned per category for legibility) and **on-surface** text (`colors.textPrimary` / `onSurface`) for the label — text remains the hero per Stitch.
- **D-11:** Optional **ghost edge**: 1px `outlineVariant` at **~15% opacity** only if contrast testing on white card fails; otherwise no border.

### Form field chrome (DS-05 / DS-06 overlap)

- **D-12:** **`TextInput`** surfaces on add/edit reading: background **`surfaceContainerLow`**, border **none** by default; border radius align with cards (**`radius.md`** or **`lg`** — pick one consistently for fields in this phase).
- **D-13:** **Focus / active** state: Phase 7 may use **minimal** RN focus styling (e.g. `placeholderTextColor` only) unless `TextInput` focus ring is trivial; **full** Stitch “2px primary ghost border on focus” is **nice-to-have** — **agent discretion** to implement if low effort.

### the agent's Discretion

- Exact **alpha** values for chip fills and selected preset chips after visual check on device.
- Whether to introduce **`SecondaryButton`** as a named component vs. **shared styles** only for `Pressable` rows.
- Small **test** updates (RNTL) if styles change accessibility tree or testIDs.

</decisions>

<specifics>
## Specific Ideas

- Stitch reference: `.planning/research/STITCH-SOURCE.md` — primary gradient pair documented for future gradient CTA.
- Current **`PrimaryButton`**: `radius.md`, `colors.accent` (now maps to primary), white label on **`colors.secondary`** — must switch label to **white on primary** explicitly.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Milestone

- `.planning/ROADMAP.md` — Phase 7 goal, DS-04–DS-07, success criteria.
- `.planning/REQUIREMENTS.md` — DS-04–DS-07 acceptance text.

### Prior phase

- `.planning/phases/06-tokens-and-typography/06-CONTEXT.md` — Token boundaries; Phase 7 must not re-litigate font/color system.
- `.planning/phases/06-tokens-and-typography/06-UI-SPEC.md` — Hex reference for surfaces.

### Design source

- `.planning/research/STITCH-SOURCE.md` — Button, card, chip, input principles.

### Code entry points

- `src/components/ui/PrimaryButton.tsx`
- `src/components/ui/SurfaceCard.tsx`
- `src/app/(tabs)/index.tsx` — interpretation chip
- `src/app/export-report.tsx` — preset chips, date rows
- `src/features/readings/AddReadingScreen.tsx`, `EditReadingScreen.tsx` — inputs, date rows, delete
- `src/components/ui/InfoRow.tsx` — secondary pressable

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable assets

- **`PrimaryButton`** — single primary primitive; all major CTAs use it (Home, export, add reading, privacy).
- **`SurfaceCard`** — hero cards and list empty panels.
- **Export presets** — inline `Pressable` + `StyleSheet` chip pattern to unify with DS-05/DS-06.

### Patterns

- No **`expo-linear-gradient`** in repo today; solid primary avoids new native module in the default plan.
- **Interpretation color** comes from `getInterpretationColor` + inline alpha string on Home.

### Integration points

- **`colors.accent`** aliases **`primary`** — PrimaryButton can use `colors.primary` for clarity after Phase 6.
- **Tests** — `tabs-shell`, `home-latest-reading`, export/add/edit screens may assert colors indirectly via text; prefer stable `testID`s over snapshot color.

</code_context>

<deferred>
## Deferred Ideas

- **Linear gradient** primary CTA — optional enhancement after solid pill ships.
- **Tab bar / glass** — Phase 8 (DS-08).
- **PDF theme** — Phase 8 (DS-10).
- **Full divider removal** on History list — Phase 9 / DS-09 unless trivially tied to a shared list wrapper in Phase 8.

</deferred>

---

*Phase: 07-core-components*  
*Context gathered: 2026-04-07*
