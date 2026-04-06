import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { readingInputSchema } from '@/lib/bp/reading-schema';
import { deleteReading, getReadingById, updateReading } from '@/lib/db/readings-repository';
import { colors, spacing, typography } from '@/lib/theme';

type Props = {
  readingId: string;
};

export function EditReadingScreen({ readingId }: Props) {
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');
  const [measuredAt, setMeasuredAt] = useState(() => new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const row = await getReadingById(readingId);
      if (cancelled) return;
      if (!row) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setSystolic(String(row.systolic));
      setDiastolic(String(row.diastolic));
      setPulse(row.pulse != null ? String(row.pulse) : '');
      setMeasuredAt(new Date(row.measuredAt));
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [readingId]);

  const openPicker = useCallback(() => setShowPicker(true), []);

  const onPickerChange = useCallback((_event: unknown, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (date) {
      setMeasuredAt(date);
    }
  }, []);

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
      await updateReading(readingId, {
        systolic: parsed.data.systolic,
        diastolic: parsed.data.diastolic,
        pulse: parsed.data.pulse ?? null,
        measuredAt: parsed.data.measuredAt.getTime(),
      });
      router.back();
    } finally {
      setSaving(false);
    }
  }, [systolic, diastolic, pulse, measuredAt, readingId]);

  const confirmDelete = useCallback(() => {
    Alert.alert('Delete this reading?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          void (async () => {
            await deleteReading(readingId);
            router.back();
          })();
        },
      },
    ]);
  }, [readingId]);

  if (loading) {
    return (
      <ScreenContainer>
        <View style={styles.centered}>
          <ActivityIndicator accessibilityLabel="Loading reading" />
        </View>
      </ScreenContainer>
    );
  }

  if (notFound) {
    return (
      <ScreenContainer>
        <View style={styles.centered}>
          <Text style={styles.notFoundTitle}>Reading not found</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()}>
            <Text style={styles.backLink}>Go back</Text>
          </Pressable>
        </View>
      </ScreenContainer>
    );
  }

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

        {showPicker ? (
          <DateTimePicker
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            mode="datetime"
            onChange={onPickerChange}
            value={measuredAt}
          />
        ) : null}

        {formError ? <Text style={styles.error}>{formError}</Text> : null}

        <PrimaryButton
          accessibilityLabel="Save changes"
          disabled={saving}
          label="Save changes"
          onPress={() => void save()}
        />

        <Pressable accessibilityLabel="Delete reading" onPress={confirmDelete} style={styles.deleteBtn}>
          <Text style={styles.deleteLabel}>Delete reading</Text>
        </Pressable>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  notFoundTitle: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  backLink: {
    ...typography.body,
    color: colors.textSecondary,
    textDecorationLine: 'underline',
  },
  deleteBtn: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  deleteLabel: {
    ...typography.label,
    color: colors.destructive,
  },
});
