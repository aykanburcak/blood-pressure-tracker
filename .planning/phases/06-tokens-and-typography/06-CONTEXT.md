# Phase 6: Tokens & typography — Context

**Gathered:** 2026-04-07  
**Status:** Planned — see `06-01-PLAN.md`

<domain>
## Phase Boundary

Update **`src/lib/theme`** (and root font loading only as needed) so **DS-01, DS-02, DS-03** are satisfied: Stitch-aligned semantic colors, radii/shadow direction, and Manrope + Inter with documented fallbacks. **Out of scope for Phase 6:** button/chip component shapes (Phase 7), tab bar glass (Phase 8), screen-level layout reflows, PDF HTML (Phase 8). Phase 6 may add `fontFamily` to typography tokens and wire fonts in `app` root layout; it must not break existing screens (same component APIs, new visual values).

</domain>

<decisions>
## Implementation Decisions

### Color system (DS-01)

- **D-01:** Canonical action blues follow Stitch **Material mapping**: `primary` **`#0058BC`**, `primaryContainer` / emphasis **`#0070EB`**. The Stitch **`#007AFF`** override is **not** the default CTA fill in Phase 6; reserve for Phase 7+ only if a specific control needs iOS-style accent (planner documents if used).
- **D-02:** Add a **semantic palette** aligned to `.planning/research/STITCH-SOURCE.md`: at minimum `surface` (`#F9F9FE`), `surfaceContainerLow` (`#F3F3F8`), `surfaceContainerHigh` (`#E8E8ED`), `surfaceContainerLowest` / card (`#FFFFFF`), `onSurface` (`#1A1C1F`), `onSurfaceVariant` (`#414755`), `outline` (`#717786`), `outlineVariant` (`#C1C6D7`), primary pair above, plus keep **interpretation** greens/ambers/oranges/reds **readable** on new surfaces (tune if contrast fails WCAG on `#F9F9FE` / white).
- **D-03:** **Backward compatibility:** Existing exports `colors.dominant`, `colors.secondary`, `colors.accent`, `colors.textPrimary`, etc. remain in the public theme API for Phase 6 but are **implemented as aliases** to the new semantic names (or documented one-shot migration if we rename in the same PR — planner chooses minimal churn path). Goal: no mass edit of every screen in Phase 6 unless trivial.

### Typography (DS-02)

- **D-04:** Load **Manrope** and **Inter** via **`expo-font`** using **`@expo-google-fonts/manrope`** and **`@expo-google-fonts/inter`** (add dependencies). Weights: at least Manrope **600** (headings) and Inter **400** / **600** (body / label).
- **D-05:** **`useFonts`** in the **root layout** (`src/app/_layout.tsx` or documented entry); **hide splash screen** only after fonts resolve or timeout — prefer **blocking** splash until fonts load for consistent first paint (planner: short timeout + fallback to system font if needed).
- **D-06:** Map roles: **`display`** and **`heading`** → Manrope; **`body`** and **`label`** → Inter. Optional **letter-spacing** tweak on large display (Stitch editorial −2% ≈ **-0.5px** at 28–34sp) — **agent discretion** within readability bounds.
- **D-07:** **Dark mode:** not part of Phase 6; light-only palette. No `useColorScheme` branching in this phase unless already present for system bars only.

### Radius & shadow (DS-03)

- **D-08:** Keep **card corners** in the **lg / xl** feel (current `radius` 12–24 is acceptable); optionally add **`radius.pill`** or document **9999** for Phase 7 buttons without changing button components in Phase 6.
- **D-09:** **Shadow:** move toward Stitch ambient shadow — tint **`#1A1C1F`**, **low opacity (4–8%)**, **larger blur** (e.g. 24–32) vs current tight card shadow; verify on Android elevation where applicable.

### the agent's Discretion

- Exact semantic **token naming** (`surfaceContainerHigh` vs `surfaceHigh`) as long as STITCH-SOURCE is traceable.
- Whether interpretation colors get **slightly** desaturated for the cooler background or stay as-is until Phase 7 visual QA.
- Minor **font size** steps for `display` / `heading` to match Stitch scale without blowing layout.
- **Tests:** update snapshots if font loading or color changes affect RNTL output.

</decisions>

<specifics>
## Specific Ideas

- Stitch file: [Apple Health BP Tracker](https://stitch.withgoogle.com/projects/7766087000680671419); numeric digest in `.planning/research/STITCH-SOURCE.md`.
- User intent: closer visual match to Stitch; **no** change to WHO logic or medical copy.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Milestone & reqs

- `.planning/ROADMAP.md` — Phase 6 goal, success criteria, DS-01–DS-03.
- `.planning/REQUIREMENTS.md` — DS-01, DS-02, DS-03 checkboxes and acceptance intent.

### Design source

- `.planning/research/STITCH-SOURCE.md` — Hex values, typography roles, shadow/radius notes.

### Product

- `.planning/PROJECT.md` — Current Milestone v1.1, constraints (Android, offline, design-led).

### Prior UI spec (historical)

- `.planning/phases/01-foundation-and-offline-shell/01-UI-SPEC.md` — Pre-Stitch baseline; superseded for **tokens** where Phase 6 conflicts, but **flows and copy** still valid.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable assets

- `src/lib/theme/tokens.ts` — Single source for `spacing`, `typography`, `colors`, `radius`, `shadow`, `shell`, `copy`.
- `src/lib/theme/index.ts` (if present) — Re-exports; keep stable import paths for `@/lib/theme`.

### Patterns

- Screens import `colors`, `typography`, `spacing`, `radius`, `shadow` from `@/lib/theme` — aliasing strategy avoids wide refactors in Phase 6.

### Integration points

- Root `src/app/_layout.tsx` — Font loading + splash; must coexist with existing providers (`SafeAreaProvider`, privacy gate, etc.).
- **PDF** generation uses inline styles — Phase 6 does not rewrite PDF; Phase 8 aligns HTML/CSS to new palette.

</code_context>

<deferred>
## Deferred Ideas

- **Glass tab bar** — Phase 8 (DS-08).
- **Primary button gradient** — Phase 7 (DS-04); Phase 6 only supplies tokens.
- **Dark theme** — Backlog / later milestone unless explicitly added to v1.1.
- **Spacing “information clusters”** — Mostly Phase 8–9 screen polish; Phase 6 may add tokens only if needed for font line-height safety.

</deferred>

---

*Phase: 06-tokens-and-typography*  
*Context gathered: 2026-04-07*
