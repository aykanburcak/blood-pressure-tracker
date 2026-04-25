import {Ionicons} from '@expo/vector-icons'
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
import {
  BP_CHART_BAND_ORDER,
  getBpChartBand,
  getBpChartBandColor,
  getBpChartBandLabel,
} from '@/lib/bp/bp-chart-bands'
import {listReadingsForChart} from '@/lib/db/readings-repository'
import type {ReadingRow} from '@/lib/db/schema'
import {copy, colors, radius, spacing, typography} from '@/lib/theme'

function frequencyPerDay(rows: ReadingRow[]): number | null {
  if (rows.length === 0) {
    return null
  }

  const dayMs = 86_400_000
  const first = rows[0]?.measuredAt
  const last = rows[rows.length - 1]?.measuredAt

  if (first == null || last == null) {
    return null
  }

  const spanDays = Math.max(1, Math.ceil((last - first + dayMs) / dayMs))
  return rows.length / spanDays
}

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
  const frequency = frequencyPerDay(chartRows)

  const hasReadings = chartRows.length > 0
  const showChart = chartSeries.kind === 'ok'
  const legendBands = BP_CHART_BAND_ORDER.filter((band) =>
    chartRows.some(
      (reading) => getBpChartBand(reading.systolic, reading.diastolic) === band,
    ),
  )

  return (
    <ScreenContainer>
      <View testID="screen-home">
        <ScreenTitle>Blood Pressure Tracker</ScreenTitle>

        {hasReadings ? (
          <View style={styles.summaryRow}>
            <SurfaceCard
              padded="md"
              style={styles.summaryCard}
              testID="home-average-card"
            >
              <Ionicons
                color={colors.primary}
                name="trending-up-outline"
                size={16}
                style={styles.summaryIcon}
              />
              <Text style={styles.summaryLabel}>Average</Text>
              <View style={styles.summaryValueRow}>
                <Text style={styles.summaryValue} testID="home-bp-display">
                  {Math.round(averages!.avgSystolic)}/
                  {Math.round(averages!.avgDiastolic)}
                </Text>
                <Text style={styles.summaryUnit}>mmHg</Text>
              </View>
            </SurfaceCard>

            <SurfaceCard
              padded="md"
              style={styles.summaryCard}
              testID="home-frequency-card"
            >
              <Ionicons
                color={colors.primary}
                name="timer-outline"
                size={16}
                style={styles.summaryIcon}
              />
              <Text style={styles.summaryLabel}>Frequency</Text>
              <View style={styles.summaryValueRow}>
                <Text
                  style={styles.summaryValue}
                  testID="home-frequency-display"
                >
                  {frequency?.toFixed(1)}
                </Text>
                <Text style={styles.summaryUnit}>/day</Text>
              </View>
            </SurfaceCard>
          </View>
        ) : null}

        <SurfaceCard
          padded="lg"
          style={styles.card}
          testID="home-pressure-trends-card"
        >
          <Text style={styles.sectionTitle}>
            {copy.pressureTrendsSectionTitle}
          </Text>

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

              <View style={styles.legend}>
                {legendBands.map((band) => {
                  const color = getBpChartBandColor(band)
                  return (
                    <View key={band} style={styles.legendItem}>
                      <View
                        style={[styles.legendDot, {backgroundColor: color}]}
                      />
                      <Text style={[styles.legendText, {color}]}>
                        {getBpChartBandLabel(band)}
                      </Text>
                    </View>
                  )
                })}
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
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  summaryCard: {
    flex: 1,
  },
  summaryIcon: {
    marginBottom: spacing.xs,
  },
  summaryLabel: {
    ...typography.note,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  summaryValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  summaryValue: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  summaryUnit: {
    ...typography.note,
    color: colors.textSecondary,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
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
  legend: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  legendDot: {
    width: 14,
    height: 14,
    borderRadius: 999,
    flexShrink: 0,
  },
  legendText: {
    ...typography.body,
    fontSize: 12,
    flex: 1,
  },
})
