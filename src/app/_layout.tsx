import {
  Inter_400Regular,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import {
  Manrope_600SemiBold,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope';
import type {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { PRIVACY_DETAIL_SCREEN_TITLE } from '@/features/privacy/privacy-detail-copy';
import { colors, spacing } from '@/lib/theme';

/**
 * Native stack uses @react-navigation/elements `Header`, which ignores `headerStyle.paddingTop`
 * (only backgroundColor etc. apply). It also sets status bar inset to 0 when a parent header is
 * “shown” in context — so modal screens can end up under the notch/status bar unless we set this.
 */
const STACK_HEADER_STATUS_BAR_EXTRA = spacing.sm;

void SplashScreen.preventAutoHideAsync();

function RootNavigation() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const navigationTheme = useMemo(
    () =>
      colorScheme === 'dark'
        ? DarkTheme
        : {
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              primary: colors.primary,
              background: colors.surface,
              card: colors.surface,
              text: colors.onSurface,
              border: colors.outlineVariant,
            },
          },
    [colorScheme],
  );
  const stackScreenOptions = useMemo((): NativeStackNavigationOptions => {
    const statusBarH = insets.top + STACK_HEADER_STATUS_BAR_EXTRA;
    const base = {
      headerShown: false,
      /** Passed through to @react-navigation/elements Header (not in NativeStackNavigationOptions typings). */
      headerStatusBarHeight: statusBarH,
    } as NativeStackNavigationOptions;
    if (colorScheme === 'dark') {
      return base;
    }
    return {
      ...base,
      headerStyle: {backgroundColor: colors.surface},
      headerTintColor: colors.primary,
      headerTitleStyle: {
        color: colors.onSurface,
        fontWeight: '600' as const,
      },
      headerShadowVisible: false,
    } as NativeStackNavigationOptions;
  }, [colorScheme, insets.top]);
  return (
    <ThemeProvider value={navigationTheme}>
      <Stack screenOptions={stackScreenOptions}>
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
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Manrope_600SemiBold,
    Manrope_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <RootNavigation />
    </SafeAreaProvider>
  );
}
