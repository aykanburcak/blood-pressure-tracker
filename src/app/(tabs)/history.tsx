import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyStatePanel } from '@/components/ui/EmptyStatePanel';
import { AppGradientBackground } from '@/components/ui/AppGradientBackground';
import { ScreenTitle } from '@/components/ui/ScreenTitle';
import { SurfaceCard } from '@/components/ui/SurfaceCard';
import { TrendSummaryStrip } from '@/features/trends/TrendSummaryStrip';
import { HistoryReadingRow } from '@/features/readings/HistoryReadingRow';
import type { ReadingRow } from '@/lib/db/schema';
import {
  getTrendWindowStats,
  listReadings,
  type TrendWindowStats,
} from '@/lib/db/readings-repository';
import { copy, colors, spacing, typography } from '@/lib/theme';

const emptyStats: TrendWindowStats = {
  last7: { count: 0, avgSystolic: null, avgDiastolic: null },
  last30: { count: 0, avgSystolic: null, avgDiastolic: null },
};

export default function HistoryTab() {
  const [readings, setReadings] = useState<ReadingRow[]>([]);
  const [stats, setStats] = useState<TrendWindowStats>(emptyStats);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      void (async () => {
        const now = Date.now();
        const [rows, win] = await Promise.all([
          listReadings(),
          getTrendWindowStats(now),
        ]);
        if (!cancelled) {
          setReadings(rows);
          setStats(win);
        }
      })();
      return () => {
        cancelled = true;
      };
    }, []),
  );

  const header = (
    <>
      <TrendSummaryStrip stats={stats} />
      <Text style={styles.readingsTitle}>Recent readings</Text>
    </>
  );

  return (
    <AppGradientBackground>
      <SafeAreaView edges={['top']} style={styles.safe}>
        <View style={styles.inner} testID="screen-history">
          <ScreenTitle>History</ScreenTitle>
          <FlatList
            contentContainerStyle={styles.listContent}
            data={readings}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <SurfaceCard style={styles.emptyCard}>
                <View style={styles.emptyInner}>
                  <EmptyStatePanel title={copy.historyEmptyTitle} body={copy.historyEmptyBody} />
                </View>
              </SurfaceCard>
            }
            ListHeaderComponent={header}
            renderItem={({ item }) => (
              <HistoryReadingRow
                item={item}
                onPress={() => router.push(`/edit-reading/${item.id}`)}
              />
            )}
            scrollEnabled
          />
        </View>
      </SafeAreaView>
    </AppGradientBackground>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  inner: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['3xl'],
    paddingBottom: spacing['2xl'],
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: spacing['2xl'],
  },
  readingsTitle: {
    ...typography.label,
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  emptyCard: {
    minHeight: 200,
  },
  emptyInner: {
    paddingVertical: spacing.lg,
    justifyContent: 'center',
  },
});
