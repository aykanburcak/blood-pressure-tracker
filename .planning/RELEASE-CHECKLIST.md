# Release checklist (v1 — Google Play)

Use this before uploading to **Internal testing** or **Production**. It supports **Data safety** alignment and in-app copy consistency. It does not replace legal review.

## Play Console — Data safety

- [ ] **Data collection:** Declare what the app collects. For this product: no account, no server-side health database; align with **in-app** `src/features/privacy/privacy-detail-copy.ts`.
- [ ] **Health data:** If Play classifies BP readings as health data, answer categories consistently with local-only storage and **no** cloud sync in v1.
- [ ] **Ads:** None in v1 — confirm **No** ads declaration matches the shipped binary.
- [ ] **Data sharing:** No third-party analytics SDKs in `package.json` for this release — verify again after any dependency change.

## Manifest / Expo config

- [ ] `app.json` → `expo.android.allowBackup` is **`false`** (no Android Auto Backup to Google for app data).
- [ ] `app.json` **plugins** match expectations: `expo-router`, `expo-splash-screen`, `expo-sqlite`, `@react-native-community/datetimepicker`, `expo-sharing` — no unexpected tracking plugins added.
- [ ] After native changes: run `npx expo prebuild` (or EAS) once and spot-check merged **AndroidManifest.xml** if debugging backup/permissions.

## Dependencies (quick audit)

Run from repo root; expect **no** matches unless you intentionally added tooling:

```bash
rg -i 'sentry|firebase|amplitude|segment|mixpanel|adjust|appsflyer|crashlytics|bugsnag' package.json package-lock.json
```

- [ ] No unexplained matches in **dependencies** (devDependencies for test-only tools may be OK—still disclose if Play asks).

## In-app copy review

- [ ] `src/features/privacy/privacy-detail-copy.ts` — long-form privacy & data (PRIV-02).
- [ ] `src/features/onboarding/privacy-copy.ts` — first-run gate (Phase 1 strings).
- [ ] `src/lib/theme/tokens.ts` — `copy` for Settings / export footnotes.
- [ ] Export screen disclaimer still matches `src/lib/bp/medical-disclaimer.ts`.

## Build / store listing

- [ ] **Version** / **versionCode** bumped per Play rules (EAS: `eas.json` / `app.json` `version`).
- [ ] **Short / full description** on Play does not promise cloud sync, accounts, or features marked v2 in `REQUIREMENTS.md`.
- [ ] **Screenshots** reflect current UI (Settings → Privacy & data, Export report).

## Pre-submission smoke (device or emulator)

- [ ] First-run privacy gate → Continue → tabs.
- [ ] Settings → **Privacy & data** → scroll all sections.
- [ ] Export PDF + share still works for a range with readings.

---

*Last updated: Phase 5 — Privacy and Release Hardening*
