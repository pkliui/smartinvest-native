import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenScaffold from '../components/ScreenScaffold';
import Card from '../components/Card';
import { colors } from '../theme/colors';

export default function HomeScreen() {
  return (
    <ScreenScaffold title="Good morning" subtitle="Here's your overview">
      <Card title="Total balance">
        <Text style={styles.balance}>$12,480.55</Text>
        <Text style={styles.gain}>▲ 2.4% today</Text>
      </Card>

      <Card title="Quick actions">
        <View style={styles.actions}>
          <Text style={styles.action}>Add funds</Text>
          <Text style={styles.action}>Invest</Text>
          <Text style={styles.action}>Withdraw</Text>
        </View>
      </Card>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  balance: {
    color: colors.onDark,
    fontSize: 34,
    fontWeight: '700',
  },
  gain: {
    color: colors.green,
    fontSize: 15,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    color: colors.green,
    fontWeight: '600',
  },
});
