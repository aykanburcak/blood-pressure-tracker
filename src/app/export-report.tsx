import DateTimePicker from '@react-native-community/datetimepicker';
import * as Sharing from 'expo-sharing';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { buildBpReportHtml } from '@/features/export/bp-report-html';
import { localDayBoundsRange, rollingPresetRange } from '@/features/export/export-window';
import { deletePdfFile, generateBpPdfFromHtml } from '@/features/export/generate-bp-pdf';
import type { ReadingRow } from '@/lib/db/schema';
import { listReadingsInRange } from '@/lib/db/readings-repository';
import { colors, copy, spacing, typography } from '@/lib/theme';

type ExportPreset = '7d' | '30d' | '90d' | 'custom';

const PRESETS: ExportPreset[] = ['7d', '30d', '90d', 'custom'];

function presetLabel(p: ExportPreset): string {
  switch (p) {
    case '7d':
      return copy.exportRangeLast7;
    case '30d':
      return copy.exportRangeLast30;
    case '90d':
      return copy.exportRangeLast90;
    default:
      return copy.exportRangeCustom;
  }
}

export default function ExportReportScreen() {
  const [preset, setPreset] = useState<ExportPreset>('30d');
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [customStart, setCustomStart] = useState(() => new Date());
  const [customEnd, setCustomEnd] = useState(() => new Date());
  const [rows, setRows] = useState<ReadingRow[]>([]);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [pdfUri, setPdfUri] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      setNowMs(Date.now());
    }, []),
  );

  const windowSpec = useMemo(() => {
    if (preset !== 'custom') {
      const r = rollingPresetRange(preset, nowMs);
      return { ...r, rangeLabel: presetLabel(preset), valid: true as const };
    }
    try {
      const r = localDayBoundsRange(customStart, customEnd);
      const rangeLabel = `${customStart.toLocaleDateString(undefined, { dateStyle: 'medium' })} – ${customEnd.toLocaleDateString(undefined, { dateStyle: 'medium' })}`;
      return { ...r, rangeLabel, valid: true as const };
    } catch {
      return {
        startMs: 0,
        endMs: 0,
        rangeLabel: copy.exportNoReadingsInRange,
        valid: false as const,
      };
    }
  }, [preset, nowMs, customStart, customEnd]);

  const { startMs, endMs, rangeLabel, valid } = windowSpec;

  useEffect(() => {
    setPdfUri(null);
  }, [preset, customStart, customEnd, nowMs]);

  useEffect(() => {
    if (!valid) {
      setRows([]);
      return;
    }
    let cancelled = false;
    void listReadingsInRange(startMs, endMs).then((data) => {
      if (!cancelled) {
        setRows(data);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [startMs, endMs, valid]);

  const onStartPickerChange = useCallback((_e: unknown, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowStartPicker(false);
    }
    if (date) {
      setCustomStart(date);
    }
  }, []);

  const onEndPickerChange = useCallback((_e: unknown, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowEndPicker(false);
    }
    if (date) {
      setCustomEnd(date);
    }
  }, []);

  const generatePdf = useCallback(async () => {
    if (rows.length === 0) {
      return;
    }
    setGenerating(true);
    setPdfUri(null);
    try {
      const html = buildBpReportHtml({
        rows,
        rangeLabel,
        generatedAtMs: Date.now(),
      });
      const { uri } = await generateBpPdfFromHtml(html);
      setPdfUri(uri);
    } catch {
      Alert.alert('Could not create PDF', 'Try again.');
    } finally {
      setGenerating(false);
    }
  }, [rows, rangeLabel]);

  const sharePdf = useCallback(async () => {
    if (!pdfUri) {
      return;
    }
    const available = await Sharing.isAvailableAsync();
    if (!available) {
      Alert.alert('Sharing unavailable', 'This device cannot open the share sheet.');
      return;
    }
    try {
      await Sharing.shareAsync(pdfUri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share report',
      });
    } finally {
      await deletePdfFile(pdfUri).catch(() => {});
      setPdfUri(null);
    }
  }, [pdfUri]);

  const count = rows.length;
  const generateDisabled = count === 0 || generating || !valid;
  const shareDisabled = !pdfUri || generating;

  return (
    <ScreenContainer>
      <View style={styles.root} testID="screen-export-report">
        <Text style={styles.disclaimer}>{copy.exportDisclaimerShort}</Text>

        <Text style={styles.sectionLabel}>Time range</Text>
        <View style={styles.presetRow}>
          {PRESETS.map((p) => {
            const selected = preset === p;
            return (
              <Pressable
                key={p}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setPreset(p)}
                style={[styles.presetChip, selected && styles.presetChipSelected]}>
                <Text style={[styles.presetChipText, selected && styles.presetChipTextSelected]}>
                  {presetLabel(p)}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {preset === 'custom' ? (
          <View style={styles.customBlock}>
            <Text style={styles.fieldLabel}>Start date</Text>
            <Pressable
              accessibilityLabel="Start date"
              onPress={() => setShowStartPicker(true)}
              style={({ pressed }) => [styles.dateRow, pressed && styles.dateRowPressed]}>
              <Text style={styles.dateText}>
                {customStart.toLocaleDateString(undefined, { dateStyle: 'medium' })}
              </Text>
            </Pressable>
            {showStartPicker ? (
              <DateTimePicker
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                mode="date"
                onChange={onStartPickerChange}
                value={customStart}
              />
            ) : null}

            <Text style={[styles.fieldLabel, styles.fieldLabelSpaced]}>End date</Text>
            <Pressable
              accessibilityLabel="End date"
              onPress={() => setShowEndPicker(true)}
              style={({ pressed }) => [styles.dateRow, pressed && styles.dateRowPressed]}>
              <Text style={styles.dateText}>
                {customEnd.toLocaleDateString(undefined, { dateStyle: 'medium' })}
              </Text>
            </Pressable>
            {showEndPicker ? (
              <DateTimePicker
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                mode="date"
                onChange={onEndPickerChange}
                value={customEnd}
              />
            ) : null}
          </View>
        ) : null}

        <Text style={styles.summary}>
          {valid ? copy.exportReadingsInRange(count) : copy.exportNoReadingsInRange}
        </Text>

        <PrimaryButton
          accessibilityLabel={copy.exportGeneratePdfLabel}
          disabled={generateDisabled}
          label={generating ? copy.exportGeneratingLabel : copy.exportGeneratePdfLabel}
          testID="export-generate-pdf"
          onPress={() => void generatePdf()}
        />

        <View style={styles.shareSpacer}>
          <PrimaryButton
            accessibilityLabel={copy.exportShareLabel}
            disabled={shareDisabled}
            label={copy.exportShareLabel}
            testID="export-share-pdf"
            onPress={() => void sharePdf()}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: spacing.md,
  },
  disclaimer: {
    ...typography.body,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color: colors.textSecondary,
  },
  sectionLabel: {
    ...typography.label,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  presetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  presetChip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  presetChipSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.placeholderTint,
  },
  presetChipText: {
    ...typography.label,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  presetChipTextSelected: {
    color: colors.accent,
  },
  customBlock: {
    marginTop: spacing.sm,
  },
  fieldLabel: {
    ...typography.label,
    color: colors.textPrimary,
  },
  fieldLabelSpaced: {
    marginTop: spacing.md,
  },
  dateRow: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    minHeight: 48,
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  dateRowPressed: {
    opacity: 0.9,
  },
  dateText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  summary: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  shareSpacer: {
    marginTop: spacing.sm,
  },
});

