import { useEffect, useState } from 'react';

import { getPrivacyAcknowledged } from '@/lib/storage/app-shell-flags';

export type PrivacyGateState = 'loading' | 'needs_privacy' | 'ready';

/**
 * Resolves local privacy acknowledgement once on mount.
 * On read errors, defaults to showing the privacy gate (fail-safe).
 */
export function usePrivacyGate(): PrivacyGateState {
  const [state, setState] = useState<PrivacyGateState>('loading');

  useEffect(() => {
    let cancelled = false;
    getPrivacyAcknowledged()
      .then((ack) => {
        if (!cancelled) setState(ack ? 'ready' : 'needs_privacy');
      })
      .catch(() => {
        if (!cancelled) setState('needs_privacy');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
