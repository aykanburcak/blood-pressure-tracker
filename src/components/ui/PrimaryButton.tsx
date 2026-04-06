import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radius, shell, spacing, typography } from '@/lib/theme';

type Props = {
  label: string;
  onPress: () => void | Promise<void>;
  disabled?: boolean;
  accessibilityLabel?: string;
  testID?: string;
};

export function PrimaryButton({ label, onPress, disabled, accessibilityLabel, testID }: Props) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      disabled={disabled}
      testID={testID}
      onPress={() => void onPress()}
      style={({ pressed }) => [
        styles.btn,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    minHeight: shell.minHitArea,
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.92,
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    ...typography.label,
    color: colors.secondary,
  },
});
