import * as SQLite from 'expo-sqlite';

const DB_NAME = 'app-shell.db';
const PRIVACY_ACK_KEY = 'privacy_acknowledged';

async function ensureTable(db: Awaited<ReturnType<typeof SQLite.openDatabaseAsync>>) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS app_flags (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );
  `);
}

/**
 * Whether the user has completed the one-time local-only privacy acknowledgement.
 * Absent / corrupt rows are treated as not acknowledged.
 */
export async function getPrivacyAcknowledged(): Promise<boolean> {
  try {
    const db = await SQLite.openDatabaseAsync(DB_NAME);
    await ensureTable(db);
    const row = await db.getFirstAsync<{ value: string }>(
      'SELECT value FROM app_flags WHERE key = ?',
      PRIVACY_ACK_KEY,
    );
    return row?.value === '1';
  } catch {
    return false;
  }
}

export async function setPrivacyAcknowledged(value: boolean): Promise<void> {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  await ensureTable(db);
  if (value) {
    await db.runAsync(
      'INSERT OR REPLACE INTO app_flags (key, value) VALUES (?, ?)',
      PRIVACY_ACK_KEY,
      '1',
    );
  } else {
    await db.runAsync('DELETE FROM app_flags WHERE key = ?', PRIVACY_ACK_KEY);
  }
}
