import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { EmptyStatePanel } from '@/components/ui/EmptyStatePanel';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ScreenTitle } from '@/components/ui/ScreenTitle';
import { SurfaceCard } from '@/components/ui/SurfaceCard';
import { copy, colors, spacing, typography } from '@/lib/theme';

export default function HistoryTab() {
  return (
    <ScreenContainer>
      <View testID="screen-history">
        <ScreenTitle>History</ScreenTitle>
        <Text style={styles.support}>Saved readings appear here in reverse chronological order.</Text>
        <SurfaceCard style={styles.listCard}>
          <View style={styles.listInner}>
            <EmptyStatePanel title={copy.historyEmptyTitle} body={copy.historyEmptyBody} />
          </View>
        </SurfaceCard>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  support: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    marginTop: -spacing.sm,
  },
  listCard: {
    minHeight: 280,
  },
  listInner: {
    flex: 1,
    minHeight: 240,
    justifyContent: 'center',
    paddingVertical: spacing.lg,
  },
});
