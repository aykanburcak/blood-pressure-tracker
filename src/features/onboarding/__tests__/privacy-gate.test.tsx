import { renderRouter, screen, userEvent, waitFor } from 'expo-router/testing-library';

import { CONTINUE_OFFLINE_LABEL, PRIVACY_TITLE } from '@/features/onboarding/privacy-copy';
import * as flags from '@/lib/storage/app-shell-flags';

jest.mock('@/lib/storage/app-shell-flags');

const mockedFlags = flags as jest.Mocked<typeof flags>;

describe('privacy gate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows the privacy screen when acknowledgement is unset', async () => {
    mockedFlags.getPrivacyAcknowledged.mockResolvedValue(false);
    renderRouter('./src/app', { initialUrl: '/' });

    await waitFor(() => {
      expect(screen.getByText(PRIVACY_TITLE)).toBeTruthy();
    });
    expect(screen.getByLabelText(CONTINUE_OFFLINE_LABEL)).toBeTruthy();
  });

  it('persists acknowledgement and opens the tab shell', async () => {
    mockedFlags.getPrivacyAcknowledged.mockResolvedValue(false);
    mockedFlags.setPrivacyAcknowledged.mockResolvedValue(undefined);
    renderRouter('./src/app', { initialUrl: '/' });

    await waitFor(() => expect(screen.getByText(PRIVACY_TITLE)).toBeTruthy());

    await userEvent.press(screen.getByLabelText(CONTINUE_OFFLINE_LABEL));

    await waitFor(() => {
      expect(mockedFlags.setPrivacyAcknowledged).toHaveBeenCalledWith(true);
    });

    await waitFor(() => {
      expect(screen.getByTestId('tab-home')).toBeTruthy();
      expect(screen.getByTestId('screen-home')).toBeTruthy();
    });
  });

  it('bypasses the privacy route when already acknowledged', async () => {
    mockedFlags.getPrivacyAcknowledged.mockResolvedValue(true);
    renderRouter('./src/app', { initialUrl: '/' });

    await waitFor(() => {
      expect(screen.getByTestId('tab-home')).toBeTruthy();
    });
    expect(screen.queryByText(PRIVACY_TITLE)).toBeNull();
  });
});
