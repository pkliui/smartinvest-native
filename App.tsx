import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AnimatedTabBar from './src/components/AnimatedTabBar';
import { SCREENS } from './src/screens';
import { TabKey } from './src/components/tabs';
import { colors } from './src/theme/colors';

export default function App() {
  const [active, setActive] = useState<TabKey>('home');
  const ActiveScreen = SCREENS[active];

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <ActiveScreen />
      </View>
      <AnimatedTabBar active={active} onChange={setActive} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});
