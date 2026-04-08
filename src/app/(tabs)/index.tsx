import {useFocusEffect} from '@react-navigation/native'
import {router} from 'expo-router'
import React, {useCallback, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'

import {EmptyStatePanel} from '@/components/ui/EmptyStatePanel'
import {PrimaryButton} from '@/components/ui/PrimaryButton'
import {ScreenContainer} from '@/components/ui/ScreenContainer'
import {ScreenTitle} from '@/components/ui/ScreenTitle'
import {SurfaceCard} from '@/components/ui/SurfaceCard'
import {
  averageReadingsForChart,
  buildBpChartSeries,
  type BpChartSeries,
} from '@/features/trends/bp-chart-data'
import {BpHomeBarChart} from '@/features/trends/BpHomeBarChart'
import {getInterpretationChipBackground} from '@/lib/bp/interpretation-chip'
import {classifyBloodPressure} from '@/lib/bp/who-classification'
import {INTERPRETATION_DISCLAIMER} from '@/lib/bp/medical-disclaimer'
import {listReadingsForChart} from '@/lib/db/readings-repository'
import type {ReadingRow} from '@/lib/db/schema'
import {copy, colors, radius, spacing, typography} from '@/lib/theme'

export default function HomeTab() {
  const [chartRows, setChartRows] = useState<ReadingRow[]>([])
  const [chartSeries, setChartSeries] = useState<BpChartSeries>({
    kind: 'sparse',
  })

  useFocusEffect(
    useCallback(() => {
      let cancelled = false
      void (async () => {
        const rows = await listReadingsForChart()
        if (!cancelled) {
          setChartRows(rows)
          setChartSeries(buildBpChartSeries(rows))
        }
      })()
      return () => {
        cancelled = true
      }
    }, []),
  )

  const averages = averageReadingsForChart(chartRows)
  const interpretation =
    averages != null
      ? classifyBloodPressure(
          Math.round(averages.avgSystolic),
          Math.round(averages.avgDiastolic),
        )
      : null

  const hasReadings = chartRows.length > 0
  const showChart = chartSeries.kind === 'ok'

  return (
    <ScreenContainer>
      <View testID="screen-home">
        <ScreenTitle>Blood Pressure</ScreenTitle>

        <SurfaceCard
          padded="lg"
          style={styles.card}
          testID="home-pressure-trends-card"
        >
          <Text style={styles.sectionTitle}>{copy.pressureTrendsSectionTitle}</Text>

          {!hasReadings ? (
            <>
              <EmptyStatePanel
                title={copy.emptyStateHeading}
                body={copy.emptyStateBody}
              />
              <View style={styles.slots}>
                <View
                  style={styles.slot}
                  accessibilityLabel="Systolic placeholder"
                />
                <View
                  style={styles.slot}
                  accessibilityLabel="Diastolic placeholder"
                />
              </View>
              <View style={styles.trendLines} testID="home-trend-skeleton">
                <View style={styles.trendLine} />
                <View style={[styles.trendLine, styles.trendLineShort]} />
                <View style={styles.trendLine} />
              </View>
              <Text style={styles.trendCopy}>{copy.trendPreviewHint}</Text>
            </>
          ) : (
            <>
              <View style={styles.avgRow}>
                <View style={styles.avgBlock}>
                  <View style={styles.avgNumbersRow}>
                    <Text style={styles.bpDisplay} testID="home-bp-display">
                      {Math.round(averages!.avgSystolic)} /{' '}
                      {Math.round(averages!.avgDiastolic)}
                    </Text>
                    <Text style={styles.avgLabel}>
                      {copy.pressureTrendsAvgLabel}
                    </Text>
                  </View>
                  <Text style={styles.mmhg}>mmHg</Text>
                </View>
                {interpretation ? (
                  <View
                    accessibilityLabel={`Status ${interpretation.label}`}
                    style={[
                      styles.chip,
                      {
                        backgroundColor: getInterpretationChipBackground(
                          interpretation.category,
                        ),
                      },
                    ]}
                  >
                    <Text style={styles.chipText}>{interpretation.label}</Text>
                  </View>
                ) : null}
              </View>

              {!showChart ? (
                <>
                  <View style={styles.trendLines} testID="home-trend-skeleton">
                    <View style={styles.trendLine} />
                    <View style={[styles.trendLine, styles.trendLineShort]} />
                    <View style={styles.trendLine} />
                  </View>
                  <Text style={styles.trendCopy}>{copy.trendPreviewHint}</Text>
                </>
              ) : (
                <BpHomeBarChart series={chartSeries} />
              )}

              <Text style={styles.disclaimer}>{INTERPRETATION_DISCLAIMER}</Text>
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

        <Text style={styles.noteText}>{copy.homeLocalCardBody}</Text>
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  avgRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  avgBlock: {
    flex: 1,
    minWidth: 0,
  },
  avgNumbersRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  avgLabel: {
    ...typography.label,
    color: colors.textSecondary,
  },
  slots: {
    flexDirection: 'row',
    marginTop: spacing.md,
    marginBottom: spacing.md,
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
  noteText: {
    ...typography.note,
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
  chip: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    maxWidth: '48%',
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
})
