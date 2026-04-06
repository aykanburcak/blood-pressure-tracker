import { buildBpChartSeries } from '../bp-chart-data';

describe('buildBpChartSeries', () => {
  it('returns sparse for 0 or 1 rows', () => {
    expect(buildBpChartSeries([]).kind).toBe('sparse');
    expect(
      buildBpChartSeries([
        {
          id: 'a',
          systolic: 120,
          diastolic: 80,
          pulse: null,
          measuredAt: 1,
          createdAt: 1,
        },
      ]).kind,
    ).toBe('sparse');
  });

  it('preserves index pairing for sorted input', () => {
    const rows = [
      {
        id: 'a',
        systolic: 110,
        diastolic: 70,
        pulse: null,
        measuredAt: 100,
        createdAt: 100,
      },
      {
        id: 'b',
        systolic: 120,
        diastolic: 80,
        pulse: null,
        measuredAt: 200,
        createdAt: 200,
      },
      {
        id: 'c',
        systolic: 100,
        diastolic: 60,
        pulse: null,
        measuredAt: 300,
        createdAt: 300,
      },
    ];
    const r = buildBpChartSeries(rows);
    expect(r.kind).toBe('ok');
    if (r.kind !== 'ok') return;
    expect(r.data).toHaveLength(3);
    expect(r.data.map((p) => p.measuredAt)).toEqual([100, 200, 300]);
    expect(r.data.map((p) => p.systolic)).toEqual([110, 120, 100]);
    expect(r.data.map((p) => p.diastolic)).toEqual([70, 80, 60]);
  });
});
