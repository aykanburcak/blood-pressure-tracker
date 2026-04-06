const DAY_MS = 86_400_000;

const PRESET_DAYS: Record<'7d' | '30d' | '90d', number> = {
  '7d': 7,
  '30d': 30,
  '90d': 90,
};

/**
 * Rolling window ending at `nowMs` (e.g. last N days of wall-clock duration).
 */
export function rollingPresetRange(
  preset: '7d' | '30d' | '90d',
  nowMs: number,
): { startMs: number; endMs: number } {
  const n = PRESET_DAYS[preset];
  return { endMs: nowMs, startMs: nowMs - n * DAY_MS };
}

function startOfLocalDay(d: Date): number {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.getTime();
}

function endOfLocalDay(d: Date): number {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x.getTime();
}

/**
 * Inclusive calendar range in the runtime local timezone.
 */
export function localDayBoundsRange(
  startDay: Date,
  endDay: Date,
): { startMs: number; endMs: number } {
  const startMs = startOfLocalDay(startDay);
  const endMs = endOfLocalDay(endDay);
  if (endMs < startMs) {
    throw new RangeError('Invalid range: end before start');
  }
  return { startMs, endMs };
}
