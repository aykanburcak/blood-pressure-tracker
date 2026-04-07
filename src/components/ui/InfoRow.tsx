import React, { type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colors, radius, spacing, typography } from '@/lib/theme';

type Props = {
  title: string;
  detail?: string;
  showChevron?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
  testID?: string;
};

export function InfoRow({ title, detail, showChevron, onPress, accessibilityLabel, testID }: Props) {
  const content: ReactNode = (
    <View style={styles.inner}>
      <View style={styles.textCol}>
        <Text style={styles.title}>{title}</Text>
        {detail ? <Text style={styles.detail}>{detail}</Text> : null}
      </View>
      {showChevron ? (
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} style={styles.chev} />
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityLabel={accessibilityLabel ?? title}
        accessibilityRole="button"
        onPress={onPress}
        testID={testID}
        style={({ pressed }) => [styles.rowPressable, pressed && styles.pressed]}>
        {content}
      </Pressable>
    );
  }

  return (
    <View accessibilityLabel={accessibilityLabel ?? title} style={styles.row}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    minHeight: 48,
    justifyContent: 'center',
  },
  rowPressable: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    minHeight: 48,
    justifyContent: 'center',
    /* Same as card fill — tappable rows read as white pills on the white SurfaceCard (Settings). */
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.md,
  },
  pressed: {
    opacity: 0.9,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCol: {
    flex: 1,
  },
  title: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  detail: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  chev: {
    marginLeft: spacing.sm,
  },
});
