import { openDatabaseSync } from 'expo-sqlite';
import { desc } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/expo-sqlite';

import { readings, type ReadingRow } from './schema';
import { runReadingsMigrations } from './migrate';

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
  const row = db
    .select()
    .from(readings)
    .orderBy(desc(readings.measuredAt), desc(readings.createdAt))
    .get();
  return row ?? null;
}
