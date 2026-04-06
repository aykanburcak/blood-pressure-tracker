import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useCallback, useState } from 'react';
import { Platform } from 'react-native';

/**
 * Android `@react-native-community/datetimepicker` only supports `date` and `time` modes.
 * Using `datetime` leaves `pickers[mode]` undefined and crashes on unmount (`dismiss` NPE).
 */
export function useBpDateTimePicker(
  measuredAt: Date,
  setMeasuredAt: React.Dispatch<React.SetStateAction<Date>>,
): { openPicker: () => void; picker: React.ReactNode } {
  const [showPicker, setShowPicker] = useState(false);
  const [androidStep, setAndroidStep] = useState<'date' | 'time' | null>(null);

  const closePicker = useCallback(() => {
    setShowPicker(false);
    setAndroidStep(null);
  }, []);

  const openPicker = useCallback(() => {
    if (Platform.OS === 'android') {
      setAndroidStep('date');
    }
    setShowPicker(true);
  }, []);

  const onIosChange = useCallback(
    (_event: DateTimePickerEvent, date?: Date) => {
      if (date) {
        setMeasuredAt(date);
      }
    },
    [setMeasuredAt],
  );

  const onAndroidDateChange = useCallback(
    (event: DateTimePickerEvent, date?: Date) => {
      if (event.type === 'dismissed') {
        closePicker();
        return;
      }
      if (date) {
        setMeasuredAt((prev) => {
          const next = new Date(prev);
          next.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
          return next;
        });
        setAndroidStep('time');
      }
    },
    [closePicker, setMeasuredAt],
  );

  const onAndroidTimeChange = useCallback(
    (event: DateTimePickerEvent, date?: Date) => {
      if (event.type === 'dismissed') {
        closePicker();
        return;
      }
      if (date) {
        setMeasuredAt((prev) => {
          const next = new Date(prev);
          next.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), 0);
          return next;
        });
      }
      closePicker();
    },
    [closePicker, setMeasuredAt],
  );

  const picker =
    showPicker && Platform.OS === 'ios' ? (
      <DateTimePicker
        display="spinner"
        mode="datetime"
        onChange={onIosChange}
        value={measuredAt}
      />
    ) : showPicker && Platform.OS === 'android' && androidStep === 'date' ? (
      <DateTimePicker
        display="default"
        mode="date"
        onChange={onAndroidDateChange}
        value={measuredAt}
      />
    ) : showPicker && Platform.OS === 'android' && androidStep === 'time' ? (
      <DateTimePicker
        display="default"
        mode="time"
        onChange={onAndroidTimeChange}
        value={measuredAt}
      />
    ) : null;

  return { openPicker, picker };
}
