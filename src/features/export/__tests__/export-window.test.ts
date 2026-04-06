import { localDayBoundsRange, rollingPresetRange } from '../export-window';

describe('export-window', () => {
  it('rollingPresetRange 7d spans exactly seven days in ms', () => {
    const nowMs = 1_700_000_000_000;
    const { startMs, endMs } = rollingPresetRange('7d', nowMs);
    expect(endMs).toBe(nowMs);
    expect(endMs - startMs).toBe(7 * 86_400_000);
  });

  it('localDayBoundsRange orders two consecutive local days', () => {
    const startDay = new Date(2024, 0, 2);
    const endDay = new Date(2024, 0, 3);
    const { startMs, endMs } = localDayBoundsRange(startDay, endDay);
    expect(startMs).toBeLessThan(endMs);
    expect(endMs - startMs).toBeGreaterThan(0);
  });

  it('localDayBoundsRange throws when end is before start', () => {
    expect(() =>
      localDayBoundsRange(new Date(2024, 5, 10), new Date(2024, 5, 1)),
    ).toThrow(RangeError);
    expect(() =>
      localDayBoundsRange(new Date(2024, 5, 10), new Date(2024, 5, 1)),
    ).toThrow(/Invalid range/);
  });
});
