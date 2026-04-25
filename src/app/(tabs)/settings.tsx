import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { InfoRow } from '@/components/ui/InfoRow';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ScreenTitle } from '@/components/ui/ScreenTitle';
import { SurfaceCard } from '@/components/ui/SurfaceCard';
import { copy, spacing } from '@/lib/theme';

export default function SettingsTab() {
  return (
    <ScreenContainer>
      <View testID="screen-settings">
        <ScreenTitle>Settings</ScreenTitle>
        <SurfaceCard padded="lg" style={styles.card}>
          <View style={styles.rows}>
            <InfoRow title={copy.settingsLocalLabel} detail={copy.settingsLocalDetail} />
            <InfoRow
              accessibilityLabel={copy.settingsPrivacyLabel}
              detail={copy.settingsPrivacyDetail}
              showChevron
              testID="settings-privacy"
              title={copy.settingsPrivacyLabel}
              onPress={() => router.push('/privacy-info')}
            />
          </View>
        </SurfaceCard>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  rows: {
    gap: spacing.md,
  },
});
