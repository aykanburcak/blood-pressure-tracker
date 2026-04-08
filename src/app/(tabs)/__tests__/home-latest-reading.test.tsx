import {NavigationContainer} from '@react-navigation/native'
import {render, screen, waitFor} from '@testing-library/react-native'
import React from 'react'

import HomeTab from '@/app/(tabs)/index'
import {copy} from '@/lib/theme'

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native')
  return {
    ...actual,
    useFocusEffect: (cb: () => void) => {
      const React = require('react')
      React.useEffect(() => {
        cb()
      }, [cb])
    },
  }
})

const mockPush = jest.fn()
jest.mock('expo-router', () => ({
  router: {
    push: (...args: unknown[]) => mockPush(...args),
  },
}))

const mockListReadingsForChart = jest.fn()
jest.mock('@/lib/db/readings-repository', () => ({
  listReadingsForChart: (...args: unknown[]) => mockListReadingsForChart(...args),
}))

describe('HomeTab pressure trends card', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows empty state when no readings', async () => {
    mockListReadingsForChart.mockResolvedValue([])

    render(
      <NavigationContainer>
        <HomeTab />
      </NavigationContainer>,
    )

    await waitFor(() => {
      expect(mockListReadingsForChart).toHaveBeenCalled()
    })

    expect(screen.getByTestId('home-pressure-trends-card')).toBeTruthy()
    expect(screen.getByText('No readings yet')).toBeTruthy()
    expect(screen.getByText(copy.trendPreviewHint)).toBeTruthy()
  })

  it('shows average and interpretation when one reading exists', async () => {
    mockListReadingsForChart.mockResolvedValue([
      {
        id: 'r1',
        systolic: 118,
        diastolic: 75,
        pulse: null,
        measuredAt: 1_704_000_000_000,
        createdAt: 1_704_000_000_000,
      },
    ])

    render(
      <NavigationContainer>
        <HomeTab />
      </NavigationContainer>,
    )

    await waitFor(() => {
      expect(screen.getByText(/118\s*\/\s*75/)).toBeTruthy()
    })

    expect(screen.getByText('Normal')).toBeTruthy()
    expect(
      screen.getByText(
        'This is not a medical diagnosis. Talk to a clinician about your readings.',
      ),
    ).toBeTruthy()
    expect(screen.getByText(copy.trendPreviewHint)).toBeTruthy()
    expect(screen.queryByTestId('bp-home-bar-chart')).toBeNull()
  })

  it('shows bar chart when at least two chart readings exist', async () => {
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
        systolic: 116,
        diastolic: 74,
        pulse: null,
        measuredAt: 2_000,
        createdAt: 2_000,
      },
    ])

    render(
      <NavigationContainer>
        <HomeTab />
      </NavigationContainer>,
    )

    await waitFor(() => {
      expect(screen.getByTestId('bp-home-bar-chart')).toBeTruthy()
    })

    expect(screen.getByTestId('home-pressure-trends-card')).toBeTruthy()
    expect(screen.getByText(/118\s*\/\s*77/)).toBeTruthy()
    expect(screen.queryByText('Blood pressure over time')).toBeNull()
  })
})
