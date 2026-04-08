import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CartesianChart } from 'victory-native';
import { Path, Skia } from '@shopify/react-native-skia';

import { getBpChartBarColor } from '@/lib/bp/bp-chart-bands';

import type { BpChartSeries } from '@/features/trends/bp-chart-data';

export type BpHomeBarChartSeries = Extract<BpChartSeries, { kind: 'ok' }>;

type Props = {
  series: BpHomeBarChartSeries;
};

export function BpHomeBarChart({ series }: Props) {
  const chartHeight = 160;
  const maxY = Math.max(
    140,
    ...series.data.flatMap((d) => [d.systolic, d.diastolic]),
  );
  const yMax = Math.ceil(maxY * 1.08);

  return (
    <View style={[styles.host, { height: chartHeight }]} testID="bp-home-bar-chart">
      <CartesianChart
        data={series.data}
        domain={{ y: [0, yMax] }}
        domainPadding={{ left: 16, right: 12, top: 20, bottom: 12 }}
        xKey="measuredAt"
        yKeys={['systolic', 'diastolic']}
      >
        {({ points, chartBounds, yScale }) => {
          const y0 = yScale(0);
          const n = series.data.length;
          const slotW =
            n >= 2 &&
            typeof points.systolic[0]?.x === 'number' &&
            typeof points.systolic[1]?.x === 'number'
              ? Math.abs(points.systolic[1]!.x - points.systolic[0]!.x)
              : (chartBounds.right - chartBounds.left) / Math.max(n, 1);
          const barW = slotW * 0.34;
          const gap = slotW * 0.1;
          const r = Math.min(5, barW / 2);

          const els: React.ReactNode[] = [];

          for (let i = 0; i < n; i++) {
            const ps = points.systolic[i];
            const pd = points.diastolic[i];
            if (typeof ps?.y !== 'number' || typeof pd?.y !== 'number') {
              continue;
            }
            const cx = ps.x;
            const color = getBpChartBarColor(
              series.data[i].systolic,
              series.data[i].diastolic,
            );
            const leftBarCenter = cx - barW / 2 - gap / 2;
            const rightBarCenter = cx + barW / 2 + gap / 2;
            const xLeft = leftBarCenter - barW / 2;
            const xRight = rightBarCenter - barW / 2;

            const addBar = (top: number, x: number, key: string) => {
              const h = y0 - top;
              if (h <= 0) {
                return;
              }
              const p = Skia.Path.Make();
              p.addRRect(Skia.RRectXY(Skia.XYWHRect(x, top, barW, h), r, r));
              els.push(
                <Path key={key} path={p} style="fill" color={color} antiAlias />,
              );
            };

            addBar(ps.y, xLeft, `${i}-sys`);
            addBar(pd.y, xRight, `${i}-dia`);
          }

          return <>{els}</>;
        }}
      </CartesianChart>
    </View>
  );
}

const styles = StyleSheet.create({
  host: {
    width: '100%',
  },
});
