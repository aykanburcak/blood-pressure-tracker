import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { InfoRow } from '@/components/ui/InfoRow';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ScreenTitle } from '@/components/ui/ScreenTitle';
import { SurfaceCard } from '@/components/ui/SurfaceCard';
import { copy, colors, spacing, typography } from '@/lib/theme';

export default function SettingsTab() {
  return (
    <ScreenContainer>
      <View testID="screen-settings">
        <ScreenTitle>Settings</ScreenTitle>
        <SurfaceCard padded="lg" style={styles.card}>
          <InfoRow
            accessibilityLabel={copy.settingsExportPdfTitle}
            detail={copy.settingsExportPdfDetail}
            showChevron
            testID="settings-export-pdf"
            title={copy.settingsExportPdfTitle}
            onPress={() => router.push('/export-report')}
          />
          <View style={styles.divider} />
          <InfoRow title={copy.settingsLocalLabel} detail={copy.settingsLocalDetail} />
          <View style={styles.divider} />
          <InfoRow title={copy.settingsAboutLabel} showChevron />
        </SurfaceCard>
        <Text style={styles.footnote}>{copy.settingsExportFootnote}</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
    marginVertical: spacing.xs,
  },
  footnote: {
    ...typography.body,
    fontSize: 14,
    lineHeight: 14 * 1.35,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});
