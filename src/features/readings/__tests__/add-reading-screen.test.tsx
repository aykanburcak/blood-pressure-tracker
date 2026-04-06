import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import React from 'react';

import { AddReadingScreen } from '@/features/readings/AddReadingScreen';

jest.mock('@react-native-community/datetimepicker', () => 'DateTimePicker');

const mockBack = jest.fn();
jest.mock('expo-router', () => ({
  router: {
    back: () => mockBack(),
  },
}));

const mockInsert = jest.fn().mockResolvedValue('reading-id-1');
jest.mock('@/lib/db/readings-repository', () => ({
  insertReading: (...args: unknown[]) => mockInsert(...args),
}));

describe('AddReadingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls insertReading and navigates back when save succeeds', async () => {
    render(<AddReadingScreen />);

    fireEvent.changeText(screen.getByLabelText('Systolic'), '120');
    fireEvent.changeText(screen.getByLabelText('Diastolic'), '80');

    fireEvent.press(screen.getByLabelText('Save reading'));

    await waitFor(() => {
      expect(mockInsert).toHaveBeenCalledTimes(1);
    });

    expect(mockInsert.mock.calls[0][0]).toMatchObject({
      systolic: 120,
      diastolic: 80,
      pulse: null,
    });
    expect(typeof mockInsert.mock.calls[0][0].measuredAt).toBe('number');

    await waitFor(() => {
      expect(mockBack).toHaveBeenCalled();
    });
  });

  it('does not call insertReading when systolic is out of range', async () => {
    render(<AddReadingScreen />);

    fireEvent.changeText(screen.getByLabelText('Systolic'), '50');
    fireEvent.changeText(screen.getByLabelText('Diastolic'), '40');

    fireEvent.press(screen.getByLabelText('Save reading'));

    await waitFor(() => {
      expect(mockInsert).not.toHaveBeenCalled();
    });
    expect(mockBack).not.toHaveBeenCalled();
  });
});
