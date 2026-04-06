const mockPrivacyValue: { current?: string } = {};

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

jest.mock('@/lib/db/readings-repository', () => ({
  READINGS_DB_FILE: 'readings.db',
  getLatestReading: jest.fn().mockResolvedValue(null),
  insertReading: jest.fn().mockResolvedValue('mock-reading-id'),
}));

beforeEach(() => {
  mockPrivacyValue.current = undefined;
});
