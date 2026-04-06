import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing, typography } from '@/lib/theme';

/** Structural shell — empty-state layout completed in plan 01-03 */
export default function HomeTab() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.inner} testID="screen-home">
        <Text style={styles.title}>Blood Pressure</Text>
        <Text style={styles.caption}>Home</Text>
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
