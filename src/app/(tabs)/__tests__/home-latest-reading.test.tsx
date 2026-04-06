import { NavigationContainer } from '@react-navigation/native';
import { render, screen, waitFor } from '@testing-library/react-native';
import React from 'react';

import HomeTab from '@/app/(tabs)/index';
import { copy } from '@/lib/theme';

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

const mockGetLatest = jest.fn();
const mockListReadingsForChart = jest.fn();
jest.mock('@/lib/db/readings-repository', () => ({
  getLatestReading: (...args: unknown[]) => mockGetLatest(...args),
  listReadingsForChart: (...args: unknown[]) => mockListReadingsForChart(...args),
}));

describe('HomeTab latest reading', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockListReadingsForChart.mockResolvedValue([]);
  });

  it('shows empty state when no readings', async () => {
    mockGetLatest.mockResolvedValue(null);

    render(
      <NavigationContainer>
        <HomeTab />
      </NavigationContainer>,
    );

    await waitFor(() => {
      expect(mockGetLatest).toHaveBeenCalled();
      expect(mockListReadingsForChart).toHaveBeenCalled();
    });

    expect(screen.getByText('No readings yet')).toBeTruthy();
    expect(screen.getByText(copy.trendPreviewHint)).toBeTruthy();
  });

  it('shows BP and interpretation when a reading exists', async () => {
    mockGetLatest.mockResolvedValue({
      id: 'r1',
      systolic: 118,
      diastolic: 75,
      pulse: null,
      measuredAt: 1_704_000_000_000,
      createdAt: 1_704_000_000_000,
    });

    render(
      <NavigationContainer>
        <HomeTab />
      </NavigationContainer>,
    );

    await waitFor(() => {
      expect(screen.getByText(/118\s*\/\s*75/)).toBeTruthy();
    });

    expect(screen.getByText('Normal')).toBeTruthy();
    expect(
      screen.getByText('This is not a medical diagnosis. Talk to a clinician about your readings.'),
    ).toBeTruthy();
    expect(screen.getByText(copy.trendPreviewHint)).toBeTruthy();
  });

  it('shows live trend chart when at least two chart readings exist', async () => {
    mockGetLatest.mockResolvedValue({
      id: 'r1',
      systolic: 118,
      diastolic: 75,
      pulse: null,
      measuredAt: 1_704_000_000_000,
      createdAt: 1_704_000_000_000,
    });
    mockListReadingsForChart.mockResolvedValue([
      {
        id: 'a',
        systolic: 120,
        diastolic: 80,
        pulse: null,
        measuredAt: 1_000,
        createdAt: 1_000,
      },
      {
        id: 'b',
        systolic: 118,
        diastolic: 75,
        pulse: null,
        measuredAt: 2_000,
        createdAt: 2_000,
      },
    ]);

    render(
      <NavigationContainer>
        <HomeTab />
      </NavigationContainer>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('bp-trend-chart')).toBeTruthy();
    });

    expect(screen.getByText('Blood pressure over time')).toBeTruthy();
    expect(screen.queryByText(copy.trendPreviewHint)).toBeNull();
  });
});
