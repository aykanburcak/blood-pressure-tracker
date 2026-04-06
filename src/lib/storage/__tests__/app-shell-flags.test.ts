import { getPrivacyAcknowledged, setPrivacyAcknowledged } from '../app-shell-flags';

describe('app-shell-flags', () => {
  it('defaults privacy acknowledgement to false when unset', async () => {
    await expect(getPrivacyAcknowledged()).resolves.toBe(false);
  });

  it('persists a true acknowledgement', async () => {
    await setPrivacyAcknowledged(true);
    await expect(getPrivacyAcknowledged()).resolves.toBe(true);
  });
});
