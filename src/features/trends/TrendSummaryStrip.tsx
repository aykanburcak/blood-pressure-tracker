import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SurfaceCard } from '@/components/ui/SurfaceCard';
import type { TrendWindowStats } from '@/lib/db/readings-repository';
import { colors, spacing, typography } from '@/lib/theme';

type Props = {
  stats: TrendWindowStats;
};

function fmtAvg(n: number | null): string {
  return n == null ? '—' : String(n);
}

export function TrendSummaryStrip({ stats }: Props) {
  return (
    <SurfaceCard style={styles.card}>
      <Text style={styles.title}>Recent averages</Text>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Last 7 days</Text>
          <Text style={styles.value}>
            {fmtAvg(stats.last7.avgSystolic)} / {fmtAvg(stats.last7.avgDiastolic)} mmHg
          </Text>
          <Text style={styles.count}>{stats.last7.count} readings</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Last 30 days</Text>
          <Text style={styles.value}>
            {fmtAvg(stats.last30.avgSystolic)} / {fmtAvg(stats.last30.avgDiastolic)} mmHg
          </Text>
          <Text style={styles.count}>{stats.last30.count} readings</Text>
        </View>
      </View>
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    paddingVertical: spacing.md,
  },
  title: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  col: {
    flex: 1,
    gap: spacing.xs,
  },
  label: {
    ...typography.label,
    color: colors.textSecondary,
    fontSize: 12,
  },
  value: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  count: {
    ...typography.label,
    color: colors.textSecondary,
    fontWeight: '400',
  },
});
