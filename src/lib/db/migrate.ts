import type { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';

import migrations from '../../../drizzle/migrations';

export async function runReadingsMigrations(
  db: ExpoSQLiteDatabase<Record<string, unknown>>,
): Promise<void> {
  await migrate(db, migrations);
}
