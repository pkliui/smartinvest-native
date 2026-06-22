import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { TabDef } from '../components/tabs';

/** Simple placeholder used by every tab until real screens are built. */
export default function PlaceholderScreen({ tab }: { tab: TabDef }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name={tab.icon} size={40} color={colors.green} />
      </View>
      <Text style={styles.title}>{tab.label}</Text>
      <Text style={styles.subtitle}>
        This is the {tab.label} tab — a blank canvas for now.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: colors.background,
  },
  iconWrap: {
    backgroundColor: colors.greenDeep,
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
  },
  title: {
    color: colors.onDark,
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16,
    textAlign: 'center',
  },
});
