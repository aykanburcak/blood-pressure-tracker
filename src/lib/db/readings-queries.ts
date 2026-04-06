import { and, asc, avg, count, desc, eq, gte, lte } from 'drizzle-orm';
import type { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core';

import { readings, type ReadingRow } from './schema';

export type TrendWindowBucket = {
  count: number;
  avgSystolic: number | null;
  avgDiastolic: number | null;
};

export type TrendWindowStats = {
  last7: TrendWindowBucket;
  last30: TrendWindowBucket;
};

type ReadingsDb = BaseSQLiteDatabase<'sync', unknown, { readings: typeof readings }>;

function roundAvg(value: unknown): number | null {
  if (value == null) return null;
  const n = Number(value);
  return Number.isFinite(n) ? Math.round(n) : null;
}

export function listReadingsFromDb(db: ReadingsDb): ReadingRow[] {
  return db
    .select()
    .from(readings)
    .orderBy(desc(readings.measuredAt), desc(readings.createdAt))
    .all();
}

export function getReadingByIdFromDb(db: ReadingsDb, id: string): ReadingRow | null {
  const row = db.select().from(readings).where(eq(readings.id, id)).get();
  return row ?? null;
}

export function updateReadingInDb(db: ReadingsDb, id: string, values: ReadingRowUpdate): void {
  db.update(readings)
    .set({
      systolic: values.systolic,
      diastolic: values.diastolic,
      pulse: values.pulse ?? null,
      measuredAt: values.measuredAt,
    })
    .where(eq(readings.id, id))
    .run();
}

export function deleteReadingFromDb(db: ReadingsDb, id: string): void {
  db.delete(readings).where(eq(readings.id, id)).run();
}

export type ReadingRowUpdate = {
  systolic: number;
  diastolic: number;
  pulse?: number | null;
  measuredAt: number;
};

export function listReadingsForChartFromDb(
  db: ReadingsDb,
  options?: { startMs?: number; nowMs?: number },
): ReadingRow[] {
  const nowMs = options?.nowMs ?? Date.now();
  const startMs = options?.startMs ?? nowMs - 90 * 86_400_000;
  return db
    .select()
    .from(readings)
    .where(gte(readings.measuredAt, startMs))
    .orderBy(asc(readings.measuredAt), asc(readings.createdAt))
    .all();
}

export function listReadingsInRangeFromDb(
  db: ReadingsDb,
  range: { startMs: number; endMs: number },
): ReadingRow[] {
  const { startMs, endMs } = range;
  return db
    .select()
    .from(readings)
    .where(and(gte(readings.measuredAt, startMs), lte(readings.measuredAt, endMs)))
    .orderBy(asc(readings.measuredAt), asc(readings.createdAt))
    .all();
}

function windowBucket(db: ReadingsDb, cutoffMs: number): TrendWindowBucket {
  const row = db
    .select({
      n: count(),
      asbp: avg(readings.systolic),
      adbp: avg(readings.diastolic),
    })
    .from(readings)
    .where(gte(readings.measuredAt, cutoffMs))
    .get();

  const c = Number(row?.n ?? 0);
  return {
    count: c,
    avgSystolic: c === 0 ? null : roundAvg(row?.asbp),
    avgDiastolic: c === 0 ? null : roundAvg(row?.adbp),
  };
}

export function getTrendWindowStatsFromDb(db: ReadingsDb, nowMs: number): TrendWindowStats {
  return {
    last7: windowBucket(db, nowMs - 7 * 86_400_000),
    last30: windowBucket(db, nowMs - 30 * 86_400_000),
  };
}

export function getLatestReadingFromDb(db: ReadingsDb): ReadingRow | null {
  const row = db
    .select()
    .from(readings)
    .orderBy(desc(readings.measuredAt), desc(readings.createdAt))
    .get();
  return row ?? null;
}
