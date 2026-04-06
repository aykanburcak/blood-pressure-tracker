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
} as const;
