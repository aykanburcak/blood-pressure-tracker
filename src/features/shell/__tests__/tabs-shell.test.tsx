import { renderRouter, screen, userEvent, waitFor } from 'expo-router/testing-library';
import { within } from '@testing-library/react-native';

import * as flags from '@/lib/storage/app-shell-flags';
import { copy } from '@/lib/theme';

jest.mock('@/lib/storage/app-shell-flags');

const mockedFlags = flags as jest.Mocked<typeof flags>;

describe('Phase 1 tab shell', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedFlags.getPrivacyAcknowledged.mockResolvedValue(true);
  });

  it('renders Home with hero, local-only card, and trend preview', async () => {
    renderRouter('./src/app', { initialUrl: '/(tabs)' });

    await waitFor(() => expect(screen.getByTestId('screen-home')).toBeTruthy());
    expect(screen.getByText('Blood Pressure')).toBeTruthy();
    expect(screen.getByText(copy.emptyStateHeading)).toBeTruthy();
    expect(screen.getByText(copy.emptyStateBody)).toBeTruthy();
    expect(screen.getByText(copy.homeLocalCardBody)).toBeTruthy();
    expect(screen.getByText(copy.trendPreviewHint)).toBeTruthy();
  });

  it('shows History with list container and approved empty copy', async () => {
    renderRouter('./src/app', { initialUrl: '/(tabs)' });

    await userEvent.press(screen.getByTestId('tab-history'));

    const historyRoot = await waitFor(() => screen.getByTestId('screen-history'));
    expect(within(historyRoot).getByText('History')).toBeTruthy();
    expect(within(historyRoot).getByText(copy.historyEmptyTitle)).toBeTruthy();
    expect(within(historyRoot).getByText(copy.historyEmptyBody)).toBeTruthy();
    expect(within(historyRoot).queryByText(/coming soon/i)).toBeNull();
  });

  it('shows Settings local-only rows and export-boundary footnote', async () => {
    renderRouter('./src/app', { initialUrl: '/(tabs)' });

    await userEvent.press(screen.getByTestId('tab-settings'));

    const settingsRoot = await waitFor(() => screen.getByTestId('screen-settings'));
    expect(within(settingsRoot).getByText('Settings')).toBeTruthy();
    expect(within(settingsRoot).getByText(copy.settingsLocalLabel)).toBeTruthy();
    expect(within(settingsRoot).getByText(copy.settingsLocalDetail)).toBeTruthy();
    expect(within(settingsRoot).getByText(copy.settingsAboutLabel)).toBeTruthy();
    expect(within(settingsRoot).getByText(copy.settingsExportFootnote)).toBeTruthy();
    expect(within(settingsRoot).queryByText(/coming soon/i)).toBeNull();
  });

  it('exposes Home, History, and Settings tab targets', async () => {
    renderRouter('./src/app', { initialUrl: '/(tabs)' });

    await waitFor(() => {
      expect(screen.getByTestId('tab-home')).toBeTruthy();
      expect(screen.getByTestId('tab-history')).toBeTruthy();
      expect(screen.getByTestId('tab-settings')).toBeTruthy();
    });
  });
});
