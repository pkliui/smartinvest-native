import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AnimatedTabBar from './src/components/AnimatedTabBar';
import PlaceholderScreen from './src/screens/PlaceholderScreen';
import { TABS, TabKey } from './src/components/tabs';
import { colors } from './src/theme/colors';

export default function App() {
  const [active, setActive] = useState<TabKey>('home');
  const activeTab = TABS.find((t) => t.key === active) ?? TABS[0];

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <PlaceholderScreen tab={activeTab} />
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
