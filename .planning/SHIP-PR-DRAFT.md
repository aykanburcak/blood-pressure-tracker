# Draft PR — Blood Pressure Tracker v1.0 (manual ship)

Use this when `gh` CLI and `git remote` are configured. Branch suggestion: **`release/v1.0-android`** → base **`main`** (or your default).

## Title

```
Milestone v1.0: Android blood pressure tracker (offline, PDF, privacy)
```

## Body

```markdown
## Summary

**Milestone: v1.0 Android v1** (Phases 1–5, archived under `.planning/milestones/v1.0-*`).

Offline-first Expo SDK 55 app: local SQLite readings, WHO-based interpretation, history and Skia/Victory trends, PDF export via expo-print + share, Privacy & data screen, `android.allowBackup: false`, release checklist for Play.

**Post–milestone fixes on this branch**

- Tab bar respects **bottom safe area** (`SafeAreaProvider` + `useSafeAreaInsets`) so Android gesture navigation no longer overlaps tabs.
- **Android add/edit reading:** sequential **date → time** pickers (`useBpDateTimePicker`) instead of unsupported `datetime` mode (fixes dismiss crash).

## Verification

- [x] `npx tsc --noEmit`
- [x] `npm test` — 16 suites / 45 tests
- [x] Phase 4 & 5 UAT passed on device (see `.planning/phases/04-pdf-export/04-UAT.md`, `05-privacy-and-release-hardening/05-UAT.md`)
- [ ] CI (if configured)
- [ ] `.planning/RELEASE-CHECKLIST.md` before Play production

## Requirements

All v1 IDs in `.planning/milestones/v1.0-REQUIREMENTS.md` (CORE, LOG, HIST, INTP, TRND, EXPT, PRIV).

## Key files (high level)

- `src/app/(tabs)/_layout.tsx`, `src/app/_layout.tsx` — safe area
- `src/features/readings/useBpDateTimePicker.tsx` — Android date/time flow
- `src/features/privacy/*`, `app.json` — Phase 5 privacy / backup
- `src/features/export/*` — PDF pipeline

```

## Commands (after `git remote add origin …` and `brew install gh` / `gh auth login`)

```bash
git push -u origin release/v1.0-android
gh pr create --base main --head release/v1.0-android --title "Milestone v1.0: Android blood pressure tracker (offline, PDF, privacy)" --body-file .planning/SHIP-PR-DRAFT.md
```

(Adjust `--body` to paste only the fenced **Body** section contents, or use a trimmed file without the outer markdown wrapper.)
