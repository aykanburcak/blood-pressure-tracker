import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CartesianChart, Line } from 'victory-native';

import type { BpChartSeries } from '@/features/trends/bp-chart-data';
import { colors, spacing, typography } from '@/lib/theme';

const SYSTOLIC_COLOR = '#C2410C';
const DIASTOLIC_COLOR = '#2563EB';

type Props = {
  series: BpChartSeries;
};

export function BpTrendChart({ series }: Props) {
  if (series.kind === 'sparse') {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Add a few more readings to see your trend.</Text>
      </View>
    );
  }

  return (
    <View style={styles.chartHost}>
      <CartesianChart
        data={series.data}
        domainPadding={{ left: 16, right: 12, top: 20, bottom: 12 }}
        xKey="measuredAt"
        yKeys={['systolic', 'diastolic']}>
        {({ points }) => (
          <>
            <Line color={SYSTOLIC_COLOR} points={points.systolic} strokeWidth={2} />
            <Line color={DIASTOLIC_COLOR} points={points.diastolic} strokeWidth={2} />
          </>
        )}
      </CartesianChart>
    </View>
  );
}

const styles = StyleSheet.create({
  chartHost: {
    height: 220,
    width: '100%',
  },
  placeholder: {
    minHeight: 160,
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  placeholderText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
