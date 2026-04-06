import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { EmptyStatePanel } from '@/components/ui/EmptyStatePanel';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ScreenTitle } from '@/components/ui/ScreenTitle';
import { SurfaceCard } from '@/components/ui/SurfaceCard';
import { copy, colors, radius, spacing, typography } from '@/lib/theme';

export default function HomeTab() {
  return (
    <ScreenContainer>
      <View testID="screen-home">
        <ScreenTitle>Blood Pressure</ScreenTitle>

        <SurfaceCard padded="lg" style={styles.hero}>
          <EmptyStatePanel title={copy.emptyStateHeading} body={copy.emptyStateBody} />
          <View style={styles.slots}>
            <View style={styles.slot} accessibilityLabel="Systolic placeholder" />
            <View style={styles.slot} accessibilityLabel="Diastolic placeholder" />
          </View>
        </SurfaceCard>

        <SurfaceCard style={styles.gap}>
          <Text style={styles.cardBody}>{copy.homeLocalCardBody}</Text>
        </SurfaceCard>

        <SurfaceCard style={styles.gap}>
          <View style={styles.trendLines}>
            <View style={styles.trendLine} />
            <View style={[styles.trendLine, styles.trendLineShort]} />
            <View style={styles.trendLine} />
          </View>
          <Text style={styles.trendCopy}>{copy.trendPreviewHint}</Text>
        </SurfaceCard>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    marginBottom: spacing.lg,
  },
  slots: {
    flexDirection: 'row',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  slot: {
    flex: 1,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: colors.placeholderTint,
  },
  gap: {
    marginBottom: spacing.lg,
  },
  cardBody: {
    ...typography.body,
    color: colors.textPrimary,
  },
  trendLines: {
    marginBottom: spacing.md,
  },
  trendLine: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.placeholderTint,
    marginBottom: spacing.sm,
    width: '100%',
  },
  trendLineShort: {
    width: '72%',
  },
  trendCopy: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
