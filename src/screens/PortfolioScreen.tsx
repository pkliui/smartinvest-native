import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenScaffold from '../components/ScreenScaffold';
import Card from '../components/Card';
import { colors } from '../theme/colors';

const HOLDINGS = [
  { name: 'Apple', units: '12 shares', value: '$2,749', weight: 0.42 },
  { name: 'Bitcoin', units: '0.05 BTC', value: '$3,362', weight: 0.31 },
  { name: 'Nvidia', units: '8 shares', value: '$1,026', weight: 0.18 },
  { name: 'Cash', units: 'USD', value: '$520', weight: 0.09 },
];

export default function PortfolioScreen() {
  return (
    <ScreenScaffold title="Portfolio" subtitle="Your holdings">
      <Card title="Total value">
        <Text style={styles.total}>$7,657.00</Text>
      </Card>

      {HOLDINGS.map((h) => (
        <Card key={h.name}>
          <View style={styles.row}>
            <Text style={styles.name}>{h.name}</Text>
            <Text style={styles.value}>{h.value}</Text>
          </View>
          <Text style={styles.units}>{h.units}</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { flex: h.weight }]} />
            <View style={{ flex: 1 - h.weight }} />
          </View>
        </Card>
      ))}
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  total: { color: colors.onDark, fontSize: 30, fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { color: colors.onDark, fontSize: 16, fontWeight: '600' },
  value: { color: colors.onDark, fontSize: 16, fontWeight: '600' },
  units: { color: colors.muted, fontSize: 13 },
  barTrack: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surfaceHigh,
    overflow: 'hidden',
  },
  barFill: { backgroundColor: colors.green },
});
