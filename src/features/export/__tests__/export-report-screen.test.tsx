import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';

import ExportReportScreen from '@/app/export-report';
import * as pdf from '@/features/export/generate-bp-pdf';
import * as repo from '@/lib/db/readings-repository';

jest.mock('expo-router', () => ({
  useFocusEffect: (cb: () => void) => {
    const React = require('react');
    React.useEffect(() => {
      cb();
    }, [cb]);
  },
}));

jest.mock('@/lib/db/readings-repository', () => ({
  listReadingsInRange: jest.fn(),
}));

jest.mock('@/features/export/generate-bp-pdf', () => ({
  generateBpPdfFromHtml: jest.fn().mockResolvedValue({ uri: 'file:///tmp/test.pdf' }),
  deletePdfFile: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('expo-sharing', () => ({
  isAvailableAsync: jest.fn().mockResolvedValue(true),
  shareAsync: jest.fn().mockResolvedValue(undefined),
}));

const listReadingsInRange = repo.listReadingsInRange as jest.Mock;
const generateBpPdfFromHtml = pdf.generateBpPdfFromHtml as jest.Mock;

describe('ExportReportScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('disables generate when there are no readings in range', async () => {
    listReadingsInRange.mockResolvedValue([]);

    const { getByTestId } = render(
      <NavigationContainer>
        <ExportReportScreen />
      </NavigationContainer>,
    );

    await waitFor(() => {
      expect(getByTestId('export-generate-pdf')).toBeDisabled();
    });
  });

  it('calls generateBpPdfFromHtml when generate is pressed and readings exist', async () => {
    listReadingsInRange.mockResolvedValue([
      {
        id: 'a',
        systolic: 120,
        diastolic: 80,
        pulse: null,
        measuredAt: 1_700_000_000_000,
        createdAt: 1_700_000_000_000,
      },
    ]);

    const { getByTestId } = render(
      <NavigationContainer>
        <ExportReportScreen />
      </NavigationContainer>,
    );

    await waitFor(() => {
      expect(getByTestId('export-generate-pdf')).not.toBeDisabled();
    });

    fireEvent.press(getByTestId('export-generate-pdf'));

    await waitFor(() => {
      expect(generateBpPdfFromHtml).toHaveBeenCalled();
    });
  });
});
