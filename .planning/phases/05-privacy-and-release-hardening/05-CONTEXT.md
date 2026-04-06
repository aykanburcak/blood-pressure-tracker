# Phase 5: Privacy and Release Hardening - Context

**Gathered:** 2026-04-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Align **shipped behavior** and **in-app messaging** with the **local-only** product promise: **PRIV-01** (no ads, accounts, or cloud-sync flows in v1) and **PRIV-02** (users can read clear copy on **device storage**, **export**, and **limits of the app’s role**). Include **Android release hygiene** (backup rules, dependency reality check, Play Console alignment artifacts) without adding new product capabilities.

</domain>

<decisions>
## Implementation Decisions

### In-app privacy surface (PRIV-02)

- **D-01:** Provide a **reviewable, long-form in-app privacy / data screen** (not only the first-run gate) that covers: readings stored **locally** (SQLite on device); **no** account, **no** cloud sync, **no** ads in v1; **PDF export is user-initiated only**—shared destinations are chosen by the user/OS share sheet, not sent automatically by the app.
- **D-02:** Keep the **first-run `/privacy` route** as the **short** onboarding gate per Phase 1; add a **Settings entry** (wire the existing **About** row or add a **Privacy** row) that navigates to the **same or extended** content so returning users can re-read policy without resetting the gate.
- **D-03:** **Single source of truth** for privacy strings: extend `src/features/onboarding/privacy-copy.ts` (or add a sibling module e.g. `privacy-detail-copy.ts`) and **import from screens**; align `src/lib/theme/tokens.ts` `copy.*` where it duplicates privacy/export boundaries so wording does not drift.

### Android backup and platform boundaries

- **D-04:** **Exclude application database / sensitive app data from Android auto-backup** by default (manifest `allowBackup` / `fullBackupContent` / `dataExtractionRules` or Expo-supported equivalent) so the **simple story “on this device”** is not undermined by silent cloud backup of SQLite. Planner/researcher to confirm exact **Expo SDK 55** config path (prebuild/CNG).
- **D-05:** **Privacy copy must mention** that **device backups and transfers** are controlled by the **OS/Google account**, in plain language, once backup behavior is implemented—so claims stay honest without sounding like legal boilerplate.

### Release and Play Store alignment

- **D-06:** Add a **repo-local checklist** at `.planning/RELEASE-CHECKLIST.md` for v1: **Data safety** questionnaire alignment (no collection, no ads, health data handling as applicable), **permissions** vs `app.json` / manifest, **dependency audit** (no analytics/ad SDKs), **version/build** notes, and pointer to **in-app** privacy strings to keep listing text consistent.

### Third-party and network boundaries

- **D-07:** **v1 dependency baseline:** No `expo-updates` / EAS Update in current `package.json`—privacy copy **must not** claim “never contacts the network” if that becomes false later; for current stack, state that the app **does not require** network for core use and **does not** ship analytics or ad SDKs (re-verify before each release).
- **D-08:** **PRIV-01 enforcement:** Confirm **no** sign-in, **no** sync onboarding, **no** ad containers in UI; **expo-web-browser** / **expo-linking** remain incidental (e.g. future links)—no tracking use in v1.

### the agent's Discretion

- Exact **Android XML vs config plugin** shape for backup exclusion.
- **Privacy screen** layout (sections, order, typography) as long as content satisfies PRIV-02.
- Whether **About** opens **Play Store** listing, **in-app** screen only, or both.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase and requirements

- `.planning/ROADMAP.md` — Phase 5 goal and success criteria
- `.planning/REQUIREMENTS.md` — **PRIV-01**, **PRIV-02**
- `.planning/PROJECT.md` — Privacy, offline-first, export boundary, medical non-diagnostic framing

### Prior phase decisions

- `.planning/phases/01-foundation-and-offline-shell/01-CONTEXT.md` — First-run privacy gate, tab shell, copy discretion
- `.planning/phases/04-pdf-export/04-CONTEXT.md` — PDF user-initiated, share sheet, disclaimer source (`medical-disclaimer`)

### Implementation touchpoints

- `src/features/onboarding/privacy-copy.ts` — First-run privacy strings (Phase 1 spec alignment)
- `src/app/privacy.tsx` — Privacy gate screen
- `src/app/(tabs)/settings.tsx` — Settings rows, export entry, local-storage copy
- `src/lib/theme/tokens.ts` — `copy` for settings/export footnotes
- `src/lib/bp/medical-disclaimer.ts` — Non-diagnostic wording boundary
- `app.json` — Android config; backup rules to be extended per D-04

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- `privacy-copy.ts` — Central first-run strings; extend or split for long-form PRIV-02 content.
- `ScreenContainer`, `SurfaceCard`, `InfoRow`, typography/colors from theme — reuse for Settings-linked privacy screen.
- `INTERPRETATION_DISCLAIMER` / export copy patterns — mirror tone for export boundary text.

### Established Patterns

- Stack routes in `src/app/` (`privacy`, `export-report`); add e.g. `privacy-detail.tsx` or reuse `privacy` with two modes only if it does not break the gate flow (prefer separate route for post-onboarding review).
- Settings uses `router.push` for export; **About** row currently has `showChevron` without `onPress`—Phase 5 should wire navigation.

### Integration Points

- `src/app/_layout.tsx` — Register any new stack screen.
- `app.json` / prebuild output — Android backup and release metadata.

</code_context>

<specifics>
## Specific Ideas

- User selected **all** discuss areas in one shot; sub-decisions follow the **recommended** directions from the discuss-phase prompt (long-form privacy + Settings link, backup exclusion + honest OS note, in-repo release checklist, no OTA/analytics in current deps).

</specifics>

<deferred>
## Deferred Ideas

- **Biometric app lock**, **Health Connect**, **account/sync** — v2 (`REQUIREMENTS.md` ECOS / ENG).
- **iOS** privacy labels and behaviors — out of scope for Android-first v1.

</deferred>

---

*Phase: 05-privacy-and-release-hardening*
*Context gathered: 2026-04-06*
