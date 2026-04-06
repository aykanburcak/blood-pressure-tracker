import path from 'node:path';

import Database from 'better-sqlite3';
import { desc, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

import { readings } from '../schema';

const drizzleFolder = path.join(process.cwd(), 'drizzle');

/**
 * Jest mocks `expo-sqlite` without `openDatabaseSync` (privacy gate uses async API only).
 * This suite runs the same Drizzle schema + bundled migrations against better-sqlite3 in Node.
 */
describe('readings SQL', () => {
  let sqlite: Database.Database;
  let db: ReturnType<typeof drizzle<{ readings: typeof readings }>>;

  beforeEach(() => {
    sqlite = new Database(':memory:');
    db = drizzle(sqlite, { schema: { readings } });
    migrate(db, { migrationsFolder: drizzleFolder });
  });

  afterEach(() => {
    sqlite.close();
  });

  it('creates readings via migration and inserts a row', () => {
    const measuredAt = Date.now();
    db.insert(readings)
      .values({
        id: 'test-id-1',
        systolic: 120,
        diastolic: 80,
        pulse: null,
        measuredAt,
        createdAt: measuredAt,
      })
      .run();

    const row = db.select().from(readings).where(eq(readings.id, 'test-id-1')).get();
    expect(row?.systolic).toBe(120);
    expect(row?.diastolic).toBe(80);
  });

  it('returns latest row by measuredAt then createdAt', () => {
    const earlier = Date.now() - 86_400_000;
    const later = Date.now();
    db.insert(readings)
      .values({
        id: 'older',
        systolic: 110,
        diastolic: 70,
        pulse: null,
        measuredAt: earlier,
        createdAt: earlier,
      })
      .run();
    db.insert(readings)
      .values({
        id: 'newer',
        systolic: 125,
        diastolic: 82,
        pulse: null,
        measuredAt: later,
        createdAt: later,
      })
      .run();

    const row = db
      .select()
      .from(readings)
      .orderBy(desc(readings.measuredAt), desc(readings.createdAt))
      .get();
    expect(row?.id).toBe('newer');
    expect(row?.systolic).toBe(125);
  });
});
