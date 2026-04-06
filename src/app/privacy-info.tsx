import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/ui/ScreenContainer';
import {
  PRIVACY_DETAIL_SECTIONS,
} from '@/features/privacy/privacy-detail-copy';
import { colors, spacing, typography } from '@/lib/theme';

export default function PrivacyInfoScreen() {
  return (
    <ScreenContainer>
      <View testID="screen-privacy-info">
        {PRIVACY_DETAIL_SECTIONS.map((section) => (
          <View key={section.title} style={styles.block}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionBody}>{section.body}</Text>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  block: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  sectionBody: {
    ...typography.body,
    color: colors.textPrimary,
  },
});
