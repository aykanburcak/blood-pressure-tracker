import {INTERPRETATION_DISCLAIMER} from '@/lib/bp/medical-disclaimer'
import {PRIVACY_DETAIL_SCREEN_TITLE} from '@/features/privacy/privacy-detail-copy'

/**
 * Stitch-aligned semantic palette (v1.1 Phase 6). See `.planning/research/STITCH-SOURCE.md`.
 * `colors` merges these with legacy aliases (`dominant`, `accent`, …) for existing screens.
 */
const semantic = {
  surface: '#F9F9FE',
  surfaceContainerLow: '#F3F3F8',
  surfaceContainerHigh: '#E8E8ED',
  surfaceContainerLowest: '#FFFFFF',
  onSurface: '#1A1C1F',
  onSurfaceVariant: '#414755',
  outline: '#717786',
  outlineVariant: '#C1C6D7',
  primary: '#0058BC',
  primaryContainer: '#0070EB',
  onPrimary: '#FFFFFF',
  /** Primary @ ~15% alpha — selected preset chips (Phase 7). */
  primarySelectionFill: 'rgba(0, 88, 188, 0.15)',
  /** Home BP bar chart — extended chart bands (Phase 9). */
  chartBandNormal: '#22C55E',
  chartBandPreHypertension: '#EAB308',
  chartBandStage1: '#F97316',
  chartBandStage2: '#EA580C',
  chartBandStage3: '#C2410C',
  chartBandStage4: '#9A3412',
  chartBandCrisis: '#B91C1C',
  chartBandHypoModerate: '#7DD3FC',
  chartBandHypoSevere: '#38BDF8',
  chartBandHypoExtreme: '#0369A1',
} as const

/** Must match `useFonts` keys in `src/app/_layout.tsx`. */
const fontFamily = {
  display: 'Manrope_700Bold',
  heading: 'Manrope_600SemiBold',
  body: 'Inter_400Regular',
  label: 'Inter_600SemiBold',
} as const

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const

export const typography = {
  body: {
    fontFamily: fontFamily.body,
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 16 * 1.5,
  },
  label: {
    fontFamily: fontFamily.label,
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 14 * 1.35,
  },
  note: {
    fontFamily: fontFamily.label,
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 12 * 1.5,
  },
  heading: {
    fontFamily: fontFamily.heading,
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 20 * 1.2,
  },
  display: {
    fontFamily: fontFamily.display,
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 28 * 1.15,
    letterSpacing: -0.5,
  },
} as const

export const colors = {
  ...semantic,
  /** @deprecated Prefer `surface` — legacy Phase 1 name */
  dominant: semantic.surface,
  /** @deprecated Prefer `surfaceContainerLowest` */
  secondary: semantic.surfaceContainerLowest,
  /** @deprecated Prefer `primary` */
  accent: semantic.primary,
  /** @deprecated Prefer `onSurface` */
  textPrimary: semantic.onSurface,
  /** @deprecated Prefer `onSurfaceVariant` */
  textSecondary: semantic.onSurfaceVariant,
  divider: semantic.outlineVariant,
  placeholderTint: semantic.surfaceContainerLow,
  destructive: '#BA1A1A',
  interpretNormal: '#16A34A',
  interpretElevated: '#CA8A04',
  interpretStage1: '#EA580C',
  interpretStage2: '#C2410C',
  interpretCrisis: '#B91C1C',
} as const

export const radius = {
  sm: 12,
  md: 16,
  lg: 24,
  /** Full pill for primary CTAs (Phase 7). */
  pill: 9999,
} as const

/** Tinted ambient shadow (on-surface hue) — Stitch “soft elevation”, not harsh black. */
export const shadow = {
  card: {
    shadowColor: '#1A1C1F',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.07,
    shadowRadius: 28,
    elevation: 3,
  },
} as const

export const shell = {
  tabBarVisualHeight: 56,
  tabBarTopPadding: 16,
  minHitArea: 44,
} as const

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
  historyEmptyBody:
    'Saved readings will appear here in reverse chronological order.',
  settingsLocalLabel: 'Local storage only',
  settingsLocalDetail:
    'Your data stays on this device unless you choose to export a PDF later.',
  settingsPrivacyLabel: PRIVACY_DETAIL_SCREEN_TITLE,
  settingsPrivacyDetail:
    'How your readings are stored, exported, and backed up',
  /** Settings footnote — optional PDF only when the user chooses (UI-SPEC). */
  settingsExportFootnote:
    'You can export readings as a PDF only when you choose to in the app. Nothing is sent automatically.',
  homeLocalCardBody:
    'Your readings stay on this device. No sign-in is required to keep using the tracker.',
  trendPreviewHint:
    'After you save readings, you will see trends here. Charts stay on this device.',
  /** Home combined trends card — section title (use `textTransform: 'uppercase'` in styles). */
  pressureTrendsSectionTitle: 'Pressure trends',
  pressureTrendsAvgLabel: 'Avg',
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
} as const
