import { INTERPRETATION_DISCLAIMER } from '@/lib/bp/medical-disclaimer';

/** Phase 1 tokens — aligned to `.planning/.../01-UI-SPEC.md` */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

export const typography = {
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 16 * 1.5 },
  label: { fontSize: 14, fontWeight: '600' as const, lineHeight: 14 * 1.35 },
  heading: { fontSize: 20, fontWeight: '600' as const, lineHeight: 20 * 1.2 },
  display: { fontSize: 28, fontWeight: '600' as const, lineHeight: 28 * 1.15 },
} as const;

export const colors = {
  dominant: '#F5F6F2',
  secondary: '#FFFFFF',
  accent: '#4A7CFF',
  destructive: '#D65252',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  divider: '#E5E7EB',
  placeholderTint: '#EEF2F7',
  interpretNormal: '#22C55E',
  interpretElevated: '#EAB308',
  interpretStage1: '#F97316',
  interpretStage2: '#EA580C',
  interpretCrisis: '#B91C1C',
} as const;

export const radius = {
  sm: 12,
  md: 16,
  lg: 24,
} as const;

/** Single shadow style for Phase 1 — `#111827` at ~6% depth */
export const shadow = {
  card: {
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
} as const;

export const shell = {
  tabBarVisualHeight: 56,
  tabBarTopPadding: 16,
  minHitArea: 44,
} as const;

export const copy = {
  primaryCta: 'Continue Offline',
  emptyStateHeading: 'No readings yet',
  emptyStateBody:
    'When you record a blood pressure reading, it will appear here and stay on this device.',
  errorState:
    'Something went wrong loading your local app shell. Close and reopen the app. If the problem continues, restart the device and try again.',
  privacyTitle: 'Private by default',
  privacyBody:
    'Your blood pressure readings stay on this device. No account, cloud sync, or ads are required to use the app.',
  privacySupport:
    'This app helps you log and review readings. It does not provide medical diagnosis or treatment advice.',
  historyEmptyTitle: 'No history yet',
  historyEmptyBody: 'Saved readings will appear here in reverse chronological order.',
  settingsLocalLabel: 'Local storage only',
  settingsLocalDetail: 'Your data stays on this device unless you choose to export a PDF later.',
  settingsAboutLabel: 'About this app',
  /** Settings footnote — optional PDF only when the user chooses (UI-SPEC). */
  settingsExportFootnote:
    'You can export readings as a PDF only when you choose to in the app. Nothing is sent automatically.',
  homeLocalCardBody:
    'Your readings stay on this device. No sign-in is required to keep using the tracker.',
  trendPreviewHint:
    'After you save readings, you will see trends here. Charts stay on this device.',
  logReadingCta: 'Add reading',
  settingsExportPdfTitle: 'Export PDF',
  settingsExportPdfDetail: 'Create a report for your doctor',
  exportReportScreenTitle: 'Export report',
  exportGeneratePdfLabel: 'Generate PDF',
  exportShareLabel: 'Share',
  exportNoReadingsInRange: 'No readings in this range',
  exportGeneratingLabel: 'Generating…',
  exportRangeLast7: 'Last 7 days',
  exportRangeLast30: 'Last 30 days',
  exportRangeLast90: 'Last 90 days',
  exportRangeCustom: 'Custom',
  exportReadingsInRange: (n: number) =>
    `${n} reading${n === 1 ? '' : 's'} in this range`,
  exportDisclaimerShort: INTERPRETATION_DISCLAIMER,
} as const;
