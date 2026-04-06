import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const readings = sqliteTable('readings', {
  id: text('id').primaryKey().notNull(),
  systolic: integer('systolic').notNull(),
  diastolic: integer('diastolic').notNull(),
  pulse: integer('pulse'),
  measuredAt: integer('measured_at', { mode: 'number' }).notNull(),
  createdAt: integer('created_at', { mode: 'number' }).notNull(),
});

export type ReadingRow = typeof readings.$inferSelect;
export type ReadingInsert = typeof readings.$inferInsert;
