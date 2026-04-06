import type { ReadingRow } from '@/lib/db/schema';

export type BpChartPoint = {
  measuredAt: number;
  systolic: number;
  diastolic: number;
};

export type BpChartSeries = { kind: 'sparse' } | { kind: 'ok'; data: BpChartPoint[] };

/**
 * Maps persisted rows (ascending by measuredAt) to CartesianChart-ready points.
 * Each index pairs systolic/diastolic from the same reading.
 */
export function buildBpChartSeries(rows: ReadingRow[]): BpChartSeries {
  if (rows.length < 2) {
    return { kind: 'sparse' };
  }
  const data: BpChartPoint[] = rows.map((r) => ({
    measuredAt: r.measuredAt,
    systolic: r.systolic,
    diastolic: r.diastolic,
  }));
  return { kind: 'ok', data };
}
