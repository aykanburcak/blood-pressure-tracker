## Summary

**Milestone v1.1: Stitch design alignment** (Phases 6–8)

**Goal:** Align the Android app with the Stitch “Apple Health BP Tracker” reference: semantic tokens, typography, core components, shell polish, and PDF export styling—without changing WHO/medical semantics.

**Planning status:** Phase 8 executed per roadmap; formal `*-VERIFICATION.md` for v1.1 not present in repo—please run device UAT before merge if not already done.

This PR bundles **13 commits** on top of `origin/master`: Phase 6–8 implementation, planning artifacts, Settings/History polish, PDF token alignment, and follow-up **native stack header / safe area** fixes (`headerStatusBarHeight`, `SafeAreaProvider` nesting).

## Changes (high level)

### Phase 6 — Tokens & typography (DS-01–DS-03)
- Stitch-aligned semantic palette, Manrope + Inter loading, radii/shadows.

### Phase 7 — Core components (DS-04–DS-07)
- Pill primary button, `SurfaceCard` radius, interpretation chips, form/InfoRow surfaces.

### Phase 8 — Shell & screen polish (DS-08–DS-10)
- Tab bar: surface background, primary active tint; light-mode navigation theme for modal stack headers.
- Settings: spacing instead of hairline dividers; History list without row borders.
- PDF HTML/CSS aligned with semantic neutrals; tests extended.

### Navigation fixes (post–Phase 8)
- Root navigation under `SafeAreaProvider`; `headerStatusBarHeight` from safe area so modal headers (New reading, Export report, Privacy) clear status bar / notch (elements `Header` ignores `headerStyle.paddingTop`).

## Requirements addressed

| ID | Area |
|----|------|
| DS-01 – DS-03 | Tokens & typography |
| DS-04 – DS-07 | Components |
| DS-08 – DS-10 | Shell, screens, PDF |

See `.planning/REQUIREMENTS.md` (v1.1 section).

## Verification

- [x] **Automated:** `npx tsc --noEmit` and `npx jest` green on latest branch tip before push.
- [ ] **Human / device:** Tab bar, modal headers, Settings, History, export PDF on Android (and iOS if applicable)—confirm header spacing and visual checklist.

## Key decisions

- Solid tab bar (no `expo-glass-effect`) for Phase 8 default.
- PDF uses `system-ui` + literal hex matching `tokens` (no bundled webfonts in template).

---

*PR body generated for `/gsd-ship` — 2026-04-07.*
