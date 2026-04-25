import { Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabIcon } from '@/components/navigation/TabIcon';
import { colors, shell } from '@/lib/theme';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 8);
  const tabBarHeight = shell.tabBarVisualHeight + bottomInset;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          height: tabBarHeight,
          paddingTop: 8,
          paddingBottom: bottomInset,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarAccessibilityLabel: 'Home',
          tabBarButtonTestID: 'tab-home',
          tabBarIcon: (props) => <TabIcon name="home" {...props} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarAccessibilityLabel: 'History',
          tabBarButtonTestID: 'tab-history',
          tabBarIcon: (props) => <TabIcon name="history" {...props} />,
        }}
      />
      <Tabs.Screen
        name="share-report"
        options={{
          title: 'Share report',
          tabBarAccessibilityLabel: 'Share report',
          tabBarButtonTestID: 'tab-share-report',
          tabBarIcon: (props) => <TabIcon name="shareReport" {...props} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarAccessibilityLabel: 'Settings',
          tabBarButtonTestID: 'tab-settings',
          tabBarIcon: (props) => <TabIcon name="settings" {...props} />,
        }}
      />
    </Tabs>
  );
}
