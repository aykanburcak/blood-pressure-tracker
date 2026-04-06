import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  CONTINUE_OFFLINE_LABEL,
  PRIVACY_BODY,
  PRIVACY_SUPPORT,
  PRIVACY_TITLE,
} from '@/features/onboarding/privacy-copy';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { setPrivacyAcknowledged } from '@/lib/storage/app-shell-flags';
import { colors, radius, shadow, spacing, typography } from '@/lib/theme';

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
          <PrimaryButton
            accessibilityLabel={CONTINUE_OFFLINE_LABEL}
            disabled={busy}
            label={CONTINUE_OFFLINE_LABEL}
            onPress={onContinue}
          />
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
});
