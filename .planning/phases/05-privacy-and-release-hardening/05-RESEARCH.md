# Phase 5: Privacy and Release Hardening — Research

**Date:** 2026-04-06  
**Phase:** 05 — Privacy and Release Hardening

## Questions answered

1. **How should we align Android backup with “local-only” messaging?**  
   - Expo supports **`android.allowBackup`** in `app.json` (merged into the application manifest on prebuild). Setting **`allowBackup: false`** disables Android Auto Backup for the app’s **entire** app data (including SQLite, SharedPreferences, etc.). This is the lowest-friction CNG-friendly option and matches a strict reading of “we do not rely on cloud backup of your readings.”  
   - **Granular exclusion** (backup prefs but not `database` domain) requires a **`fullBackupContent` / `dataExtractionRules`** XML resource and a **config plugin** (or checked-in `android/` after eject-style workflow) so merges survive prebuild. Higher maintenance for marginal gain in v1.  
   **Recommendation for planning:** Use **`expo.android.allowBackup: false`** unless product later demands backing up non-health prefs only.

2. **Where do privacy strings live so first-run and Settings stay consistent?**  
   - Keep **Phase 1 gate strings** in `privacy-copy.ts` (tests depend on exact title / continue label).  
   - Add a **dedicated module** for long-form sections (e.g. `privacy-detail-copy.ts`) consumed by a new stack screen; re-export or dedupe overlapping lines into `tokens.ts` `copy` where Settings rows need short labels.

3. **Play Console / Data safety (in-repo alignment)**  
   - No third-party analytics or ads in current `package.json` — Data safety form should declare **no collection** (or only what Play requires for “health” apps), consistent with in-app copy.  
   - **`.planning/RELEASE-CHECKLIST.md`** should list: permissions in manifest vs `app.json`, dependency grep for `analytics|sentry|firebase|adjust|appsflyer`, version code, and “copy review” pointers to `privacy-detail-copy` and `tokens.copy`.

4. **Network / OTA**  
   - No `expo-updates` in dependencies — do **not** claim “never uses network”; use **“core features work without internet”** and **“no analytics or ad SDKs in this build.”**

## Validation Architecture

_Not applicable — Phase 5 is policy, copy, and manifest alignment; verification is checklist + RNTL + manual Play form._

## RESEARCH COMPLETE

Planner may proceed. Prefer **`allowBackup: false`** for v1; document tradeoff (no Android Auto Backup for app data) in release checklist.
