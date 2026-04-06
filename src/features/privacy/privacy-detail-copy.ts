import { INTERPRETATION_DISCLAIMER } from '@/lib/bp/medical-disclaimer';

/** Stack header title — re-exported via `copy.settingsPrivacyLabel` in tokens. */
export const PRIVACY_DETAIL_SCREEN_TITLE = 'Privacy & data';

export type PrivacyDetailSection = {
  title: string;
  body: string;
};

/**
 * Long-form privacy / data handling (PRIV-02). Order is fixed for scannable layout.
 * Android backup sentence matches `expo.android.allowBackup: false` in app.json.
 */
export const PRIVACY_DETAIL_SECTIONS: PrivacyDetailSection[] = [
  {
    title: 'Local storage',
    body: 'Your blood pressure readings are stored in a database on this device. The app does not send readings to our servers—we do not operate a cloud service for your health data in version 1.',
  },
  {
    title: 'What we do not include',
    body: 'There is no account sign-in, no cloud sync, and no advertising in this version of the app. You can use logging, history, trends, and PDF export without creating an account.',
  },
  {
    title: 'PDF export',
    body: 'A report is created only when you tap Generate PDF and only includes readings you already saved. Sharing uses the system share sheet: you choose where a file goes (for example email or Files). Nothing is uploaded automatically by the app.',
  },
  {
    title: 'Offline use and analytics',
    body: 'Core features work without an internet connection. This build does not ship third-party analytics or advertising SDKs. Re-check release notes if you install a different build later.',
  },
  {
    title: 'Android backup',
    body: 'Automatic backup of this app’s data to Google is turned off. Your readings stay on the device unless you export a PDF or copy data yourself. Moving to a new phone depends on your device and Google account tools—that is outside this app.',
  },
  {
    title: 'Medical information',
    body: INTERPRETATION_DISCLAIMER,
  },
];
