import { NavigationContainer } from '@react-navigation/native';
import { render, screen } from '@testing-library/react-native';
import React from 'react';

import HistoryTab from '@/app/(tabs)/history';
import * as readingsRepo from '@/lib/db/readings-repository';

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useFocusEffect: (cb: () => void) => {
      const React = require('react');
      React.useEffect(() => {
        cb();
      }, [cb]);
    },
  };
});

jest.mock('expo-router', () => ({
  router: { push: jest.fn() },
}));

jest.mock('@/lib/db/readings-repository', () => ({
  READINGS_DB_FILE: 'readings.db',
  getLatestReading: jest.fn().mockResolvedValue(null),
  insertReading: jest.fn().mockResolvedValue('id'),
  listReadings: jest.fn().mockResolvedValue([]),
  getReadingById: jest.fn(),
  updateReading: jest.fn(),
  deleteReading: jest.fn(),
  listReadingsForChart: jest.fn().mockResolvedValue([
    {
      id: '1',
      systolic: 120,
      diastolic: 80,
      pulse: null,
      measuredAt: 1000,
      createdAt: 1000,
    },
    {
      id: '2',
      systolic: 118,
      diastolic: 76,
      pulse: null,
      measuredAt: 2000,
      createdAt: 2000,
    },
  ]),
  getTrendWindowStats: jest.fn().mockResolvedValue({
    last7: { count: 1, avgSystolic: 120, avgDiastolic: 80 },
    last30: { count: 2, avgSystolic: 119, avgDiastolic: 78 },
  }),
}));

const getTrendWindowStats = readingsRepo.getTrendWindowStats as jest.Mock;

describe('HistoryTab trends header', () => {
  it('shows summary averages from getTrendWindowStats', async () => {
    render(
      <NavigationContainer>
        <HistoryTab />
      </NavigationContainer>,
    );

    expect(await screen.findByText('Recent averages')).toBeTruthy();
    expect(screen.getByText(/120.*\/.*80/)).toBeTruthy();
    expect(screen.getByText('1 readings')).toBeTruthy();
    expect(getTrendWindowStats).toHaveBeenCalled();
  });
});
