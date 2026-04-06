import { openDatabaseSync } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';

import { readings, type ReadingRow } from './schema';
import { runReadingsMigrations } from './migrate';
import {
  deleteReadingFromDb,
  getLatestReadingFromDb,
  getReadingByIdFromDb,
  getTrendWindowStatsFromDb,
  listReadingsForChartFromDb,
  listReadingsFromDb,
  updateReadingInDb,
  type TrendWindowStats,
} from './readings-queries';

export type { TrendWindowStats };
export type { TrendWindowBucket } from './readings-queries';

export const READINGS_DB_FILE = 'readings.db';

export async function getReadingsDb(databaseName: string = READINGS_DB_FILE) {
  const expoDb = openDatabaseSync(databaseName);
  const db = drizzle(expoDb, { schema: { readings } });
  await runReadingsMigrations(db);
  return db;
}

export type InsertReadingValues = {
  systolic: number;
  diastolic: number;
  pulse?: number | null;
  measuredAt: number;
};

function newReadingId(): string {
  const c = globalThis.crypto as Crypto | undefined;
  if (c?.randomUUID) {
    return c.randomUUID();
  }
  return `r-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export async function insertReading(
  input: InsertReadingValues & { databaseName?: string },
): Promise<string> {
  const { databaseName, ...rest } = input;
  const db = await getReadingsDb(databaseName ?? READINGS_DB_FILE);
  const id = newReadingId();
  db.insert(readings)
    .values({
      id,
      systolic: rest.systolic,
      diastolic: rest.diastolic,
      pulse: rest.pulse ?? null,
      measuredAt: rest.measuredAt,
      createdAt: Date.now(),
    })
    .run();
  return id;
}

export async function getLatestReading(
  databaseName: string = READINGS_DB_FILE,
): Promise<ReadingRow | null> {
  const db = await getReadingsDb(databaseName);
  return getLatestReadingFromDb(db);
}

export async function listReadings(databaseName: string = READINGS_DB_FILE): Promise<ReadingRow[]> {
  const db = await getReadingsDb(databaseName);
  return listReadingsFromDb(db);
}

export async function getReadingById(
  id: string,
  databaseName: string = READINGS_DB_FILE,
): Promise<ReadingRow | null> {
  const db = await getReadingsDb(databaseName);
  return getReadingByIdFromDb(db, id);
}

export async function updateReading(
  id: string,
  values: InsertReadingValues,
  databaseName: string = READINGS_DB_FILE,
): Promise<void> {
  const db = await getReadingsDb(databaseName);
  updateReadingInDb(db, id, values);
}

export async function deleteReading(id: string, databaseName: string = READINGS_DB_FILE): Promise<void> {
  const db = await getReadingsDb(databaseName);
  deleteReadingFromDb(db, id);
}

export async function listReadingsForChart(
  databaseName: string = READINGS_DB_FILE,
  options?: { startMs?: number },
): Promise<ReadingRow[]> {
  const db = await getReadingsDb(databaseName);
  return listReadingsForChartFromDb(db, options);
}

export async function getTrendWindowStats(
  nowMs: number,
  databaseName: string = READINGS_DB_FILE,
): Promise<TrendWindowStats> {
  const db = await getReadingsDb(databaseName);
  return getTrendWindowStatsFromDb(db, nowMs);
}
