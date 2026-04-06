const mockPrivacyValue: { current?: string } = {};

jest.mock('victory-native', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    CartesianChart: () => React.createElement(View, { testID: 'cartesian-chart-mock' }),
    Line: () => null,
  };
});

jest.mock('@shopify/react-native-skia', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Mock = () => React.createElement(View);
  return {
    Canvas: ({ children }: { children?: React.ReactNode }) =>
      React.createElement(View, null, children),
    Group: View,
    Path: Mock,
    Line: Mock,
    Text: Mock,
    useFont: () => null,
    useImage: () => null,
    useVideo: () => null,
    vec: (x: number, y: number) => ({ x, y }),
    Skia: { PaintStyle: { Fill: 0, Stroke: 1 } },
  };
});

jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: jest.fn(async () => ({
    execAsync: jest.fn(async () => undefined),
    getFirstAsync: jest.fn(async (_q: unknown, key: string) => {
      if (key !== 'privacy_acknowledged') return null;
      return mockPrivacyValue.current === undefined ? null : { value: mockPrivacyValue.current };
    }),
    runAsync: jest.fn(async (q: unknown, ...params: string[]) => {
      const sql = String(q);
      if (sql.includes('DELETE')) {
        mockPrivacyValue.current = undefined;
        return;
      }
      if (params[0] === 'privacy_acknowledged') {
        mockPrivacyValue.current = params[1];
      }
    }),
  })),
}));

const emptyTrendStats = {
  last7: { count: 0, avgSystolic: null as number | null, avgDiastolic: null as number | null },
  last30: { count: 0, avgSystolic: null as number | null, avgDiastolic: null as number | null },
};

jest.mock('@/lib/db/readings-repository', () => ({
  READINGS_DB_FILE: 'readings.db',
  getLatestReading: jest.fn().mockResolvedValue(null),
  insertReading: jest.fn().mockResolvedValue('mock-reading-id'),
  listReadings: jest.fn().mockResolvedValue([]),
  getReadingById: jest.fn().mockResolvedValue(null),
  updateReading: jest.fn().mockResolvedValue(undefined),
  deleteReading: jest.fn().mockResolvedValue(undefined),
  listReadingsForChart: jest.fn().mockResolvedValue([]),
  getTrendWindowStats: jest.fn().mockResolvedValue(emptyTrendStats),
}));

beforeEach(() => {
  mockPrivacyValue.current = undefined;
});
