import type { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';
import type { SQLiteDatabase } from 'expo-sqlite';

import migrations from '../../../drizzle/migrations';

/**
 * Drizzle 0.45.x builds the journal table with `SERIAL PRIMARY KEY`, which Expo's native
 * SQLite rejects. Pre-create `__drizzle_migrations` with valid SQLite DDL so migrate()'s
 * `CREATE TABLE IF NOT EXISTS` is a no-op. See drizzle-team/drizzle-orm#2969.
 *
 * Use `execAsync` (not `execSync`): on Android, `NativeDatabase.execSync` has been observed
 * to throw NullPointerException while `execAsync` is stable for the same DDL.
 */
const DRIZZLE_MIGRATIONS_TABLE_SQL = `CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  hash text NOT NULL,
  created_at numeric
);`;

export async function runReadingsMigrations(
  sqlite: SQLiteDatabase,
  db: ExpoSQLiteDatabase<Record<string, unknown>>,
): Promise<void> {
  await sqlite.execAsync(DRIZZLE_MIGRATIONS_TABLE_SQL);
  await migrate(db, migrations);
}
