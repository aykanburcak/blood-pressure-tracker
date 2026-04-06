import { Redirect } from 'expo-router';
import React from 'react';

import { usePrivacyGate } from '@/features/onboarding/usePrivacyGate';

export default function Index() {
  const gate = usePrivacyGate();

  if (gate === 'loading') {
    return null;
  }

  if (gate === 'needs_privacy') {
    return <Redirect href="/privacy" />;
  }

  return <Redirect href="/(tabs)" />;
}
