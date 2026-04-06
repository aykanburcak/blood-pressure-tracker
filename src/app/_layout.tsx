import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
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
      </Stack>
    </ThemeProvider>
  );
}
