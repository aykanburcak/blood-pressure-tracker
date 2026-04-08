import {Ionicons} from '@expo/vector-icons'
import {getHeaderTitle} from '@react-navigation/elements'
import type {NativeStackHeaderProps} from '@react-navigation/native-stack'
import React from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {colors, spacing, typography} from '@/lib/theme'

export function AppStackHeader({
  back,
  navigation,
  options,
  route,
}: NativeStackHeaderProps) {
  const insets = useSafeAreaInsets()
  const title = getHeaderTitle(options, route.name)

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + spacing.lg,
        },
      ]}>
      <View style={styles.row}>
        {back ? (
          <Pressable
            accessibilityLabel="Go back"
            accessibilityRole="button"
            hitSlop={10}
            onPress={navigation.goBack}
            style={styles.backButton}>
            <Ionicons color={colors.primary} name="chevron-back" size={24} />
          </Pressable>
        ) : (
          <View style={styles.backButton} />
        )}
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 44,
  },
  backButton: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    marginRight: spacing.sm,
    width: 40,
  },
  title: {
    ...typography.heading,
    color: colors.onSurface,
    flex: 1,
  },
})
