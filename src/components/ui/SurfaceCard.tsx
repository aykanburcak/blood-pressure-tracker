import React, { type ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { colors, radius, shadow, spacing } from '@/lib/theme';

type Props = {
  children: ReactNode;
  padded?: 'md' | 'lg';
  style?: ViewStyle;
  testID?: string;
};

export function SurfaceCard({ children, padded = 'md', style, testID }: Props) {
  const pad = padded === 'lg' ? spacing.lg : spacing.md;
  return (
    <View style={[styles.card, { padding: pad }, style]} testID={testID}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    /* Same hex as `secondary` — explicit semantic name for Stitch cards */
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.lg,
    ...shadow.card,
  },
});
