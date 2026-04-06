import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { readingInputSchema } from '@/lib/bp/reading-schema';
import { insertReading } from '@/lib/db/readings-repository';
import { colors, spacing, typography } from '@/lib/theme';

import { useBpDateTimePicker } from './useBpDateTimePicker';

export function AddReadingScreen() {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');
  const [measuredAt, setMeasuredAt] = useState(() => new Date());
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const { openPicker, picker } = useBpDateTimePicker(measuredAt, setMeasuredAt);

  const save = useCallback(async () => {
    setFormError(null);
    setFieldErrors({});

    const payload: {
      systolic: string;
      diastolic: string;
      measuredAt: Date;
      pulse?: string;
    } = {
      systolic,
      diastolic,
      measuredAt,
    };
    if (pulse.trim() !== '') {
      payload.pulse = pulse;
    }

    const parsed = readingInputSchema.safeParse(payload);
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      const next: Record<string, string> = {};
      if (flat.fieldErrors.systolic?.[0]) next.systolic = flat.fieldErrors.systolic[0];
      if (flat.fieldErrors.diastolic?.[0]) next.diastolic = flat.fieldErrors.diastolic[0];
      if (flat.fieldErrors.pulse?.[0]) next.pulse = flat.fieldErrors.pulse[0];
      if (flat.fieldErrors.measuredAt?.[0]) next.measuredAt = flat.fieldErrors.measuredAt[0];
      setFieldErrors(next);
      if (Object.keys(next).length === 0) {
        setFormError('Check your entries and try again.');
      }
      return;
    }

    setSaving(true);
    try {
      await insertReading({
        systolic: parsed.data.systolic,
        diastolic: parsed.data.diastolic,
        pulse: parsed.data.pulse ?? null,
        measuredAt: parsed.data.measuredAt.getTime(),
      });
      router.back();
    } finally {
      setSaving(false);
    }
  }, [systolic, diastolic, pulse, measuredAt]);

  return (
    <ScreenContainer>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <View style={styles.field}>
          <Text style={styles.label}>Systolic (mmHg)</Text>
          <TextInput
            accessibilityLabel="Systolic"
            keyboardType="number-pad"
            onChangeText={setSystolic}
            placeholder="120"
            style={styles.input}
            value={systolic}
          />
          {fieldErrors.systolic ? <Text style={styles.error}>{fieldErrors.systolic}</Text> : null}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Diastolic (mmHg)</Text>
          <TextInput
            accessibilityLabel="Diastolic"
            keyboardType="number-pad"
            onChangeText={setDiastolic}
            placeholder="80"
            style={styles.input}
            value={diastolic}
          />
          {fieldErrors.diastolic ? <Text style={styles.error}>{fieldErrors.diastolic}</Text> : null}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Pulse (optional)</Text>
          <TextInput
            accessibilityLabel="Pulse optional"
            keyboardType="number-pad"
            onChangeText={setPulse}
            placeholder="72"
            style={styles.input}
            value={pulse}
          />
          {fieldErrors.pulse ? <Text style={styles.error}>{fieldErrors.pulse}</Text> : null}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Date and time</Text>
          <Pressable
            accessibilityLabel="Date and time"
            onPress={openPicker}
            style={({ pressed }) => [styles.dateRow, pressed && styles.dateRowPressed]}>
            <Text style={styles.dateText}>
              {measuredAt.toLocaleString(undefined, {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </Text>
          </Pressable>
          {fieldErrors.measuredAt ? <Text style={styles.error}>{fieldErrors.measuredAt}</Text> : null}
        </View>

        {picker}

        {formError ? <Text style={styles.error}>{formError}</Text> : null}

        <PrimaryButton
          accessibilityLabel="Save reading"
          disabled={saving}
          label="Save reading"
          onPress={() => void save()}
        />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: spacing['2xl'],
    gap: spacing.lg,
  },
  field: {
    gap: spacing.sm,
  },
  label: {
    ...typography.label,
    color: colors.textPrimary,
  },
  input: {
    ...typography.body,
    color: colors.textPrimary,
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    minHeight: 48,
  },
  dateRow: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    minHeight: 48,
    justifyContent: 'center',
  },
  dateRowPressed: {
    opacity: 0.9,
  },
  dateText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  error: {
    ...typography.label,
    color: colors.destructive,
    fontWeight: '400',
  },
});
