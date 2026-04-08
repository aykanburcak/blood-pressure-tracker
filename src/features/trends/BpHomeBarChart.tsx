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
  const chartData = series.data.map((reading, slot) => ({
    ...reading,
    slot,
  }));
  const maxY = Math.max(140, ...series.data.map((d) => d.systolic));
  const yMax = Math.ceil(maxY * 1.08);

  return (
    <View style={[styles.host, { height: chartHeight }]} testID="bp-home-bar-chart">
      <CartesianChart
        data={chartData}
        domain={{ y: [0, yMax] }}
        domainPadding={{ left: 16, right: 12, top: 20, bottom: 12 }}
        xKey="slot"
        yKeys={['systolic']}
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
          const barW = Math.min(slotW * 0.58, 40);

          const els: React.ReactNode[] = [];

          for (let i = 0; i < n; i++) {
            const ps = points.systolic[i];
            if (typeof ps?.y !== 'number') {
              continue;
            }
            const cx = ps.x;
            const color = getBpChartBarColor(
              series.data[i].systolic,
              series.data[i].diastolic,
            );
            const topY = ps.y;
            let h = y0 - topY;
            if (h < 10) {
              h = 10;
            }
            const x = cx - barW / 2;
            const cornerR = Math.min(barW / 2, 8);

            const p = Skia.Path.Make();
            p.addRRect(
              Skia.RRectXY(Skia.XYWHRect(x, topY, barW, h), cornerR, cornerR),
            );
            els.push(
              <Path
                key={`bar-${i}`}
                path={p}
                style="fill"
                color={color}
                antiAlias
              />,
            );
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
