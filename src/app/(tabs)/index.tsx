import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { EmptyStatePanel } from '@/components/ui/EmptyStatePanel';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ScreenTitle } from '@/components/ui/ScreenTitle';
import { SurfaceCard } from '@/components/ui/SurfaceCard';
import { buildBpChartSeries, type BpChartSeries } from '@/features/trends/bp-chart-data';
import { BpTrendChart } from '@/features/trends/BpTrendChart';
import { getInterpretationChipBackground } from '@/lib/bp/interpretation-chip';
import { classifyBloodPressure } from '@/lib/bp/who-classification';
import { INTERPRETATION_DISCLAIMER } from '@/lib/bp/medical-disclaimer';
import { getLatestReading, listReadingsForChart } from '@/lib/db/readings-repository';
import type { ReadingRow } from '@/lib/db/schema';
import { copy, colors, radius, spacing, typography } from '@/lib/theme';

export default function HomeTab() {
  const [latest, setLatest] = useState<ReadingRow | null>(null);
  const [chartSeries, setChartSeries] = useState<BpChartSeries>({ kind: 'sparse' });

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      void (async () => {
        const [latestRow, chartRows] = await Promise.all([
          getLatestReading(),
          listReadingsForChart(),
        ]);
        if (!cancelled) {
          setLatest(latestRow);
          setChartSeries(buildBpChartSeries(chartRows));
        }
      })();
      return () => {
        cancelled = true;
      };
    }, []),
  );

  const interpretation = latest
    ? classifyBloodPressure(latest.systolic, latest.diastolic)
    : null;
  return (
    <ScreenContainer>
      <View testID="screen-home">
        <ScreenTitle>Blood Pressure</ScreenTitle>

        <SurfaceCard padded="lg" style={styles.hero}>
          {latest ? (
            <View>
              <Text style={styles.bpDisplay} testID="home-bp-display">
                {latest.systolic} / {latest.diastolic}
              </Text>
              <Text style={styles.mmhg}>mmHg</Text>
              {latest.pulse != null ? (
                <Text style={styles.pulseLine}>Pulse {latest.pulse}</Text>
              ) : null}
              <Text style={styles.measuredAt}>
                {new Date(latest.measuredAt).toLocaleString(undefined, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </Text>
              {interpretation ? (
                <View
                  accessibilityLabel={`Status ${interpretation.label}`}
                  style={[
                    styles.chip,
                    { backgroundColor: getInterpretationChipBackground(interpretation.category) },
                  ]}>
                  <Text style={styles.chipText}>
                    {interpretation.label}
                  </Text>
                </View>
              ) : null}
              <Text style={styles.disclaimer}>{INTERPRETATION_DISCLAIMER}</Text>
            </View>
          ) : (
            <>
              <EmptyStatePanel title={copy.emptyStateHeading} body={copy.emptyStateBody} />
              <View style={styles.slots}>
                <View style={styles.slot} accessibilityLabel="Systolic placeholder" />
                <View style={styles.slot} accessibilityLabel="Diastolic placeholder" />
              </View>
            </>
          )}
        </SurfaceCard>

        <View style={styles.ctaWrap}>
          <PrimaryButton
            accessibilityLabel={copy.logReadingCta}
            label={copy.logReadingCta}
            onPress={() => router.push('/add-reading')}
          />
        </View>

        <SurfaceCard style={styles.gap}>
          <Text style={styles.cardBody}>{copy.homeLocalCardBody}</Text>
        </SurfaceCard>

        <SurfaceCard style={styles.trendCardOuter} padded="lg">
          {chartSeries.kind === 'sparse' ? (
            <>
              <View style={styles.trendLines} testID="home-trend-skeleton">
                <View style={styles.trendLine} />
                <View style={[styles.trendLine, styles.trendLineShort]} />
                <View style={styles.trendLine} />
              </View>
              <Text style={styles.trendCopy}>{copy.trendPreviewHint}</Text>
            </>
          ) : (
            <>
              <Text style={styles.trendCardTitle}>Blood pressure over time</Text>
              <BpTrendChart series={chartSeries} compact />
            </>
          )}
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
  ctaWrap: {
    marginBottom: spacing.lg,
  },
  gap: {
    marginBottom: spacing.lg,
  },
  trendCardOuter: {
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  trendCardTitle: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
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
  bpDisplay: {
    ...typography.display,
    color: colors.textPrimary,
  },
  mmhg: {
    ...typography.label,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  pulseLine: {
    ...typography.body,
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  measuredAt: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  chip: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    marginTop: spacing.md,
  },
  chipText: {
    ...typography.label,
    color: colors.textPrimary,
  },
  disclaimer: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
});
