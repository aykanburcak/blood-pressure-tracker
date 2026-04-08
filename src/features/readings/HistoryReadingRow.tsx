import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { classifyBloodPressure } from '@/lib/bp/who-classification';
import type { ReadingRow } from '@/lib/db/schema';
import { colors, radius, shadow, spacing, typography } from '@/lib/theme';

type Props = {
  item: ReadingRow;
  onPress: () => void;
};

export function HistoryReadingRow({ item, onPress }: Props) {
  const who = classifyBloodPressure(item.systolic, item.diastolic);
  const when = new Date(item.measuredAt).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <Pressable
      accessibilityLabel={`Blood pressure ${item.systolic} over ${item.diastolic}, ${when}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
      <View style={styles.main}>
        <Text style={styles.bp}>
          {item.systolic} / {item.diastolic}
        </Text>
        <Text style={styles.meta}>{when}</Text>
        {item.pulse != null ? <Text style={styles.pulse}>Pulse {item.pulse}</Text> : null}
        <Text style={styles.who}>{who.label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.lg,
    ...shadow.card,
  },
  rowPressed: {
    opacity: 0.92,
  },
  main: {
    gap: spacing.xs,
  },
  bp: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  meta: {
    ...typography.body,
    color: colors.textSecondary,
  },
  pulse: {
    ...typography.body,
    color: colors.textSecondary,
  },
  who: {
    ...typography.label,
    color: colors.textSecondary,
  },
});
