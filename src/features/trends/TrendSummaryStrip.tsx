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
    <View style={styles.row}>
      <SurfaceCard style={styles.statCard}>
          <Text style={styles.label}>Last 7 days</Text>
          <Text style={styles.value}>
            {fmtAvg(stats.last7.avgSystolic)} / {fmtAvg(stats.last7.avgDiastolic)} mmHg
          </Text>
          <Text style={styles.count}>{stats.last7.count} readings</Text>
      </SurfaceCard>
      <SurfaceCard style={styles.statCard}>
          <Text style={styles.label}>Last 30 days</Text>
          <Text style={styles.value}>
            {fmtAvg(stats.last30.avgSystolic)} / {fmtAvg(stats.last30.avgDiastolic)} mmHg
          </Text>
          <Text style={styles.count}>{stats.last30.count} readings</Text>
      </SurfaceCard>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  statCard: {
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
    color: colors.textPrimary,
    fontWeight: '400',
  },
});
