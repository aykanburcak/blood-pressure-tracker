# Phase 6 — Research notes (tokens & typography)

**Date:** 2026-04-07  
**Scope:** DS-01–DS-03 execution choices.

## Expo + Google Fonts

- **`@expo-google-fonts/manrope`** and **`@expo-google-fonts/inter`** ship font binaries; **`expo-font`** is already a dependency (`useFonts`).
- Import named font objects (e.g. `Manrope_600SemiBold`, `Inter_400Regular`) and pass a single map to **`useFonts`** from `expo-font` (or the package’s `useFonts` re-export if identical — prefer one hook in root layout).
- **Splash:** `expo-splash-screen` — `SplashScreen.preventAutoHideAsync()` before load, `hideAsync()` after `useFonts` resolves true. On failure, hide splash anyway to avoid deadlock (log in dev).

## Android

- **`elevation`** on `shadow.card` still matters for cards; pair with iOS shadow props. Tune after visual check.
- No new native permissions for bundled Google fonts.

## Testing

- Jest: mock **`expo-font`** / **`@expo-google-fonts/*`** or **`useFonts`** returning `loaded: true` in setup so RNTL suites do not hang or throw.
- Snapshot drift expected when default font changes — update snapshots intentionally after visual sign-off.

## References

- [Expo Font](https://docs.expo.dev/versions/latest/sdk/font/)
- [Using Google Fonts](https://github.com/expo/google-fonts)
- `.planning/research/STITCH-SOURCE.md`
