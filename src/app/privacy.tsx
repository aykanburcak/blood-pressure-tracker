import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  CONTINUE_OFFLINE_LABEL,
  PRIVACY_BODY,
  PRIVACY_SUPPORT,
  PRIVACY_TITLE,
} from '@/features/onboarding/privacy-copy';
import { setPrivacyAcknowledged } from '@/lib/storage/app-shell-flags';
import { colors, radius, shadow, shell, spacing, typography } from '@/lib/theme';

export default function PrivacyScreen() {
  const [busy, setBusy] = useState(false);

  async function onContinue() {
    if (busy) return;
    setBusy(true);
    try {
      await setPrivacyAcknowledged(true);
      router.replace('/(tabs)');
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.title}>{PRIVACY_TITLE}</Text>
          <Text style={styles.body}>{PRIVACY_BODY}</Text>
          <Text style={styles.support}>{PRIVACY_SUPPORT}</Text>
          <Pressable
            accessibilityLabel={CONTINUE_OFFLINE_LABEL}
            accessibilityRole="button"
            disabled={busy}
            onPress={onContinue}
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed, busy && styles.ctaDisabled]}>
            <Text style={styles.ctaLabel}>{CONTINUE_OFFLINE_LABEL}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.dominant,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['3xl'],
    paddingBottom: spacing.xl,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.secondary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadow.card,
  },
  title: {
    ...typography.display,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  body: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  support: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  cta: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    minHeight: shell.minHitArea,
    justifyContent: 'center',
  },
  ctaPressed: {
    opacity: 0.92,
  },
  ctaDisabled: {
    opacity: 0.6,
  },
  ctaLabel: {
    ...typography.label,
    color: colors.secondary,
  },
});
