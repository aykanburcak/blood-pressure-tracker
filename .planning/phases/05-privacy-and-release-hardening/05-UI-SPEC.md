# Phase 5 — UI design contract: Privacy & data (in-app)

**Phase:** 05-privacy-and-release-hardening  
**Screens:** Privacy detail (post-onboarding), Settings touchpoints

## Privacy detail stack screen (`/privacy-info` or equivalent)

- **Purpose:** Satisfy **PRIV-02** — user can re-read how data is stored, export boundaries, and non-diagnostic framing.
- **Entry:** Settings row (**Privacy** or wired **About**) → `router.push` to stack route with **standard header** (back chevron), title **“Privacy & data”** (or match `copy` constant).
- **Layout:** `ScreenContainer`-style safe area; vertical scroll; **section spacing** consistent with Settings (`spacing.md` / `lg` cards if using `SurfaceCard`, or plain `Text` blocks — calm, not dense legal wall).
- **Typography:** `typography.body` for paragraphs; `typography.label` or small caps section headers for **Local storage**, **Export**, **What we don’t do**, **Device backup** (exact headings from copy module).
- **Content:** Structured sections (order fixed in copy module); **no** interactive inputs; optional footnote repeating short non-diagnostic line from `medical-disclaimer` if not already adjacent on screen.
- **States:** Single static content state; no loading.

## Settings

- **Privacy / About row:** Chevron + `onPress` navigates to privacy detail route; accessibility label matches title string.
- **Existing rows:** Unchanged layout; footnote under card remains for export.

## First-run privacy gate (`/privacy`)

- **Unchanged** Phase 1 layout: short card, **Continue Offline** primary; do not route first-time users to long-form screen before acknowledge.

## Visual parity

- Background `colors.dominant`, cards `colors.secondary`, text `textPrimary` / `textSecondary`, match `export-report` / Settings.
