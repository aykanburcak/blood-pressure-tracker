import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Alert } from 'react-native';

import { EditReadingScreen } from '@/features/readings/EditReadingScreen';
import * as readingsRepo from '@/lib/db/readings-repository';

jest.mock('@react-native-community/datetimepicker', () => 'DateTimePicker');

const mockBack = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    back: () => mockBack(),
  },
}));

jest.mock('@/lib/db/readings-repository', () => ({
  getReadingById: jest.fn(),
  updateReading: jest.fn().mockResolvedValue(undefined),
  deleteReading: jest.fn().mockResolvedValue(undefined),
}));

const getReadingById = readingsRepo.getReadingById as jest.Mock;
const updateReading = readingsRepo.updateReading as jest.Mock;
const deleteReading = readingsRepo.deleteReading as jest.Mock;

describe('EditReadingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads row into fields and calls updateReading on save', async () => {
    const measuredAt = 1_700_000_000_000;
    getReadingById.mockResolvedValue({
      id: 'rid-1',
      systolic: 120,
      diastolic: 80,
      pulse: 72,
      measuredAt,
      createdAt: measuredAt,
    });

    render(<EditReadingScreen readingId="rid-1" />);

    expect(await screen.findByDisplayValue('120')).toBeTruthy();
    expect(screen.getByDisplayValue('80')).toBeTruthy();
    expect(screen.getByDisplayValue('72')).toBeTruthy();

    fireEvent.changeText(screen.getByLabelText('Systolic'), '122');
    fireEvent.press(screen.getByLabelText('Save changes'));

    await waitFor(() => {
      expect(updateReading).toHaveBeenCalledWith(
        'rid-1',
        expect.objectContaining({
          systolic: 122,
          diastolic: 80,
          measuredAt,
        }),
      );
    });
    expect(mockBack).toHaveBeenCalled();
  });

  it('deleteReading runs when Alert destructive action is confirmed', async () => {
    const measuredAt = 1_700_000_000_000;
    getReadingById.mockResolvedValue({
      id: 'rid-del',
      systolic: 110,
      diastolic: 70,
      pulse: null,
      measuredAt,
      createdAt: measuredAt,
    });

    const alertSpy = jest.spyOn(Alert, 'alert');

    render(<EditReadingScreen readingId="rid-del" />);

    await screen.findByDisplayValue('110');

    fireEvent.press(screen.getByLabelText('Delete reading'));

    expect(alertSpy).toHaveBeenCalled();
    const buttons = alertSpy.mock.calls[0][2] as {
      text: string;
      style?: string;
      onPress?: () => void;
    }[];
    const del = buttons.find((b) => b.text === 'Delete');
    expect(del?.onPress).toBeDefined();
    del?.onPress?.();

    await waitFor(() => {
      expect(deleteReading).toHaveBeenCalledWith('rid-del');
    });
    expect(mockBack).toHaveBeenCalled();

    alertSpy.mockRestore();
  });
});
