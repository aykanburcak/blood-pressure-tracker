# Quick Task 260427-g2h

## Task

Generate a public privacy policy page for Blood Pressure Tracker based on the app's actual v1 privacy posture.

## Outputs

- `docs/privacy-policy.md`
- `docs/privacy-policy.html`

## Source Facts Used

- App name: `Blood Pressure Tracker`
- Platform posture: Android-only v1
- Data model: readings stored locally on device
- No account creation, no cloud sync, no ads in v1
- PDF export is user-initiated and shared through the system share sheet
- Android backup disabled via `expo.android.allowBackup: false`
- WHO-based guidance is informational and non-diagnostic

## Notes

- Contact details were not declared in the repo, so the policy includes explicit placeholders for support email and optional contact page URL.
- The page was written as publish-ready public copy, not as in-app microcopy.

