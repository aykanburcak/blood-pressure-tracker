import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PRIVACY_DETAIL_SCREEN_TITLE } from '@/features/privacy/privacy-detail-copy';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="privacy" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="add-reading"
            options={{
              headerShown: true,
              title: 'New reading',
              presentation: 'card',
            }}
          />
          <Stack.Screen
            name="edit-reading/[id]"
            options={{
              headerShown: true,
              title: 'Edit reading',
              presentation: 'card',
            }}
          />
          <Stack.Screen
            name="export-report"
            options={{
              headerShown: true,
              title: 'Export report',
              presentation: 'card',
            }}
          />
          <Stack.Screen
            name="privacy-info"
            options={{
              headerShown: true,
              title: PRIVACY_DETAIL_SCREEN_TITLE,
              presentation: 'card',
            }}
          />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
