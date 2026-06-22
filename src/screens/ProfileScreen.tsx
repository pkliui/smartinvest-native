import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenScaffold from '../components/ScreenScaffold';
import Card from '../components/Card';
import { colors } from '../theme/colors';

const ROWS: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: 'person-outline', label: 'Account details' },
  { icon: 'card-outline', label: 'Payment methods' },
  { icon: 'shield-checkmark-outline', label: 'Security' },
  { icon: 'notifications-outline', label: 'Notifications' },
  { icon: 'help-circle-outline', label: 'Help & support' },
];

export default function ProfileScreen() {
  return (
    <ScreenScaffold title="Profile" subtitle="Pavel">
      <Card>
        {ROWS.map((r, i) => (
          <View key={r.label} style={[styles.row, i > 0 && styles.divider]}>
            <Ionicons name={r.icon} size={20} color={colors.green} />
            <Text style={styles.label}>{r.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </View>
        ))}
      </Card>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.outline,
  },
  label: {
    flex: 1,
    color: colors.onDark,
    fontSize: 16,
  },
});
