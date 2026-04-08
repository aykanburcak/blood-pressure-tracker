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

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    push: (...args: unknown[]) => mockPush(...args),
  },
}));

jest.mock('@/lib/db/readings-repository', () => ({
  READINGS_DB_FILE: 'readings.db',
  getLatestReading: jest.fn().mockResolvedValue(null),
  insertReading: jest.fn().mockResolvedValue('id'),
  listReadings: jest.fn(),
  getReadingById: jest.fn(),
  updateReading: jest.fn(),
  deleteReading: jest.fn(),
  listReadingsForChart: jest.fn().mockResolvedValue([]),
  getTrendWindowStats: jest.fn().mockResolvedValue({
    last7: { count: 0, avgSystolic: null, avgDiastolic: null },
    last30: { count: 0, avgSystolic: null, avgDiastolic: null },
  }),
}));

const listReadings = readingsRepo.listReadings as jest.Mock;

describe('HistoryTab', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows two readings newest-first when listReadings returns rows', async () => {
    const later = 2_000_000;
    const earlier = 1_000_000;
    listReadings.mockResolvedValue([
      {
        id: 'new',
        systolic: 130,
        diastolic: 85,
        pulse: null,
        measuredAt: later,
        createdAt: later,
      },
      {
        id: 'old',
        systolic: 118,
        diastolic: 76,
        pulse: 60,
        measuredAt: earlier,
        createdAt: earlier,
      },
    ]);

    render(
      <NavigationContainer>
        <HistoryTab />
      </NavigationContainer>,
    );

    expect(await screen.findByText('Recent readings')).toBeTruthy();
    expect(await screen.findByText('130 / 85')).toBeTruthy();
    expect(screen.getByText('118 / 76')).toBeTruthy();
    expect(listReadings).toHaveBeenCalled();
  });
});
