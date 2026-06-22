import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenScaffold from '../components/ScreenScaffold';
import Card from '../components/Card';
import { colors } from '../theme/colors';

const MARKETS = [
  { symbol: 'AAPL', name: 'Apple', price: '$229.10', change: '+1.2%', up: true },
  { symbol: 'TSLA', name: 'Tesla', price: '$248.50', change: '-0.8%', up: false },
  { symbol: 'BTC', name: 'Bitcoin', price: '$67,240', change: '+3.5%', up: true },
  { symbol: 'NVDA', name: 'Nvidia', price: '$128.30', change: '+2.1%', up: true },
];

export default function MarketsScreen() {
  return (
    <ScreenScaffold title="Markets" subtitle="Live prices">
      <Card>
        {MARKETS.map((m, i) => (
          <View key={m.symbol} style={[styles.row, i > 0 && styles.divider]}>
            <View>
              <Text style={styles.symbol}>{m.symbol}</Text>
              <Text style={styles.name}>{m.name}</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.price}>{m.price}</Text>
              <Text style={[styles.change, { color: m.up ? colors.green : colors.orange }]}>
                {m.change}
              </Text>
            </View>
          </View>
        ))}
      </Card>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.outline,
  },
  symbol: { color: colors.onDark, fontSize: 16, fontWeight: '700' },
  name: { color: colors.muted, fontSize: 13, marginTop: 2 },
  right: { alignItems: 'flex-end' },
  price: { color: colors.onDark, fontSize: 16, fontWeight: '600' },
  change: { fontSize: 13, fontWeight: '600', marginTop: 2 },
});
