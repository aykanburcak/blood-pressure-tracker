import { LinearGradient } from 'expo-linear-gradient';
import React, { type ReactNode } from 'react';
import { StyleSheet } from 'react-native';

type Props = {
  children: ReactNode;
};

export function AppGradientBackground({ children }: Props) {
  return (
    <LinearGradient
      colors={['#F4C6DA', '#D6D0F4', '#F5F2F8']}
      end={{ x: 0.5, y: 1 }}
      start={{ x: 0.5, y: 0 }}
      style={styles.root}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
