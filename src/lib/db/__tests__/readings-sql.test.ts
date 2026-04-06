import path from 'node:path';

import Database from 'better-sqlite3';
import { desc, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

import { readings } from '../schema';
import {
  deleteReadingFromDb,
  getReadingByIdFromDb,
  getTrendWindowStatsFromDb,
  listReadingsForChartFromDb,
  listReadingsFromDb,
  listReadingsInRangeFromDb,
  updateReadingInDb,
} from '../readings-queries';

const drizzleFolder = path.join(process.cwd(), 'drizzle');

/**
 * Jest mocks `expo-sqlite` without `openDatabaseSync` (privacy gate uses async API only).
 * This suite runs the same Drizzle schema + bundled migrations against better-sqlite3 in Node.
 *
 * Repository: listReadings, getReadingById, updateReading, deleteReading,
 * listReadingsForChart, getTrendWindowStats — same SQL as readings-queries.ts helpers
 * tested here (shared SQL contract with readings-repository.ts).
 */
describe('readings SQL (better-sqlite3)', () => {
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

  it('listReadings (queries) orders newest measuredAt first; getById, update, delete', () => {
    const t1 = 1_800_000_000_000;
    const t2 = 1_800_086_400_000;
    const t3 = 1_800_172_800_000;

    db.insert(readings).values({
      id: 'a',
      systolic: 110,
      diastolic: 70,
      pulse: null,
      measuredAt: t1,
      createdAt: t1,
    }).run();
    db.insert(readings).values({
      id: 'b',
      systolic: 120,
      diastolic: 80,
      pulse: null,
      measuredAt: t2,
      createdAt: t2,
    }).run();
    db.insert(readings).values({
      id: 'c',
      systolic: 130,
      diastolic: 85,
      pulse: null,
      measuredAt: t3,
      createdAt: t3,
    }).run();

    const listed = listReadingsFromDb(db);
    expect(listed.map((r) => r.systolic)).toEqual([130, 120, 110]);

    expect(getReadingByIdFromDb(db, 'b')?.diastolic).toBe(80);
    expect(getReadingByIdFromDb(db, 'missing')).toBeNull();

    updateReadingInDb(db, 'b', { systolic: 118, diastolic: 76, pulse: 60, measuredAt: t2 });
    expect(getReadingByIdFromDb(db, 'b')?.systolic).toBe(118);

    deleteReadingFromDb(db, 'b');
    expect(getReadingByIdFromDb(db, 'b')).toBeNull();
    expect(listReadingsFromDb(db).map((r) => r.systolic)).toEqual([130, 110]);
  });

  it('listReadingsForChart returns ascending measuredAt', () => {
    const t1 = 1000;
    const t2 = 2000;
    const t3 = 3000;
    db.insert(readings).values({
      id: 'x3',
      systolic: 100,
      diastolic: 60,
      pulse: null,
      measuredAt: t3,
      createdAt: t3,
    }).run();
    db.insert(readings).values({
      id: 'x1',
      systolic: 110,
      diastolic: 70,
      pulse: null,
      measuredAt: t1,
      createdAt: t1,
    }).run();
    db.insert(readings).values({
      id: 'x2',
      systolic: 120,
      diastolic: 80,
      pulse: null,
      measuredAt: t2,
      createdAt: t2,
    }).run();

    const chart = listReadingsForChartFromDb(db, { startMs: 0 });
    expect(chart.map((r) => r.measuredAt)).toEqual([t1, t2, t3]);
    expect(chart.map((r) => r.systolic)).toEqual([110, 120, 100]);
  });

  it('getTrendWindowStats counts and averages rolling windows', () => {
    const nowMs = 1_900_000_000_000;
    const day = 86_400_000;

    db.insert(readings).values({
      id: 'r1',
      systolic: 120,
      diastolic: 80,
      pulse: null,
      measuredAt: nowMs - 2 * day,
      createdAt: nowMs - 2 * day,
    }).run();
    db.insert(readings).values({
      id: 'r2',
      systolic: 140,
      diastolic: 90,
      pulse: null,
      measuredAt: nowMs - 8 * day,
      createdAt: nowMs - 8 * day,
    }).run();
    db.insert(readings).values({
      id: 'r3',
      systolic: 100,
      diastolic: 65,
      pulse: null,
      measuredAt: nowMs - 20 * day,
      createdAt: nowMs - 20 * day,
    }).run();
    db.insert(readings).values({
      id: 'r4',
      systolic: 160,
      diastolic: 100,
      pulse: null,
      measuredAt: nowMs - 40 * day,
      createdAt: nowMs - 40 * day,
    }).run();

    const stats = getTrendWindowStatsFromDb(db, nowMs);

    expect(stats.last7.count).toBe(1);
    expect(stats.last7.avgSystolic).toBe(120);
    expect(stats.last7.avgDiastolic).toBe(80);

    expect(stats.last30.count).toBe(3);
    expect(stats.last30.avgSystolic).toBe(Math.round((120 + 140 + 100) / 3));
    expect(stats.last30.avgDiastolic).toBe(Math.round((80 + 90 + 65) / 3));
  });

  it('listReadingsInRangeFromDb is inclusive on startMs and endMs, ascending order', () => {
    const startMs = 1000;
    const endMs = 2000;

    db.insert(readings).values({
      id: 'below',
      systolic: 100,
      diastolic: 60,
      pulse: null,
      measuredAt: 999,
      createdAt: 999,
    }).run();
    db.insert(readings).values({
      id: 'at-start',
      systolic: 110,
      diastolic: 70,
      pulse: null,
      measuredAt: startMs,
      createdAt: startMs,
    }).run();
    db.insert(readings).values({
      id: 'mid',
      systolic: 120,
      diastolic: 80,
      pulse: null,
      measuredAt: 1500,
      createdAt: 1500,
    }).run();
    db.insert(readings).values({
      id: 'at-end',
      systolic: 130,
      diastolic: 85,
      pulse: null,
      measuredAt: endMs,
      createdAt: endMs,
    }).run();
    db.insert(readings).values({
      id: 'above',
      systolic: 140,
      diastolic: 90,
      pulse: null,
      measuredAt: 2001,
      createdAt: 2001,
    }).run();

    const inRange = listReadingsInRangeFromDb(db, { startMs, endMs });
    expect(inRange.map((r) => r.id)).toEqual(['at-start', 'mid', 'at-end']);
  });
});
