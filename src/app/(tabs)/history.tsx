import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing, typography } from '@/lib/theme';

/** Structural shell — empty-state layout completed in plan 01-03 */
export default function HistoryTab() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.inner} testID="screen-history">
        <Text style={styles.title}>History</Text>
        <Text style={styles.caption}>Saved readings will appear here in reverse chronological order.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.dominant,
  },
  inner: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['3xl'],
  },
  title: {
    ...typography.display,
    color: colors.textPrimary,
  },
  caption: {
    marginTop: spacing.sm,
    ...typography.body,
    color: colors.textSecondary,
  },
});
