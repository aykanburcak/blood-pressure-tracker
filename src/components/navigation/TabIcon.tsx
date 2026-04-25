import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';

export type TabIconName = 'home' | 'history' | 'shareReport' | 'settings';

const GLYPHS: Record<
  TabIconName,
  { outline: keyof typeof Ionicons.glyphMap; filled: keyof typeof Ionicons.glyphMap }
> = {
  home: { outline: 'home-outline', filled: 'home' },
  history: { outline: 'time-outline', filled: 'time' },
  shareReport: { outline: 'share-social-outline', filled: 'share-social' },
  settings: { outline: 'settings-outline', filled: 'settings' },
};

type Props = {
  name: TabIconName;
  focused: boolean;
  color: string;
  size: number;
};

export function TabIcon({ name, focused, color, size }: Props) {
  const g = GLYPHS[name];
  const glyph = focused ? g.filled : g.outline;
  return <Ionicons name={glyph} size={size} color={color} />;
}
