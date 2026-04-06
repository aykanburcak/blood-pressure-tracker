import React, { type ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';

import { colors, spacing, typography } from '@/lib/theme';

type Props = {
  children: ReactNode;
};

export function ScreenTitle({ children }: Props) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    ...typography.display,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
});
