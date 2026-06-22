import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Card from '../components/Card';
import { colors } from '../theme/colors';
import {
  fetchMarkets,
  formatChange,
  formatPrice,
  MarketCoin,
} from '../api/markets';

export default function MarketsScreen() {
  const [coins, setCoins] = useState<MarketCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      setCoins(await fetchMarkets());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load prices');
    } finally {
      isRefresh ? setRefreshing(false) : setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => load(true)}
          tintColor={colors.green}
        />
      }
    >
      <Text style={styles.title}>Markets</Text>
      <Text style={styles.subtitle}>Live prices · pull to refresh</Text>

      <View style={styles.body}>
        {loading ? (
          <ActivityIndicator color={colors.green} style={styles.loader} />
        ) : error ? (
          <Card>
            <Text style={styles.error}>{error}</Text>
            <Pressable onPress={() => load()}>
              <Text style={styles.retry}>Tap to retry</Text>
            </Pressable>
          </Card>
        ) : (
          <Card>
            {coins.map((c, i) => {
              const up = c.change24h >= 0;
              return (
                <View key={c.id} style={[styles.row, i > 0 && styles.divider]}>
                  <Image source={{ uri: c.image }} style={styles.icon} />
                  <View style={styles.nameCol}>
                    <Text style={styles.symbol}>{c.symbol}</Text>
                    <Text style={styles.name}>{c.name}</Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.price}>{formatPrice(c.price)}</Text>
                    <Text
                      style={[
                        styles.change,
                        { color: up ? colors.green : colors.orange },
                      ]}
                    >
                      {formatChange(c.change24h)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </Card>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 },
  title: { color: colors.onDark, fontSize: 30, fontWeight: '700' },
  subtitle: { color: colors.muted, fontSize: 15, marginTop: 4 },
  body: { marginTop: 20 },
  loader: { marginTop: 40 },
  error: { color: colors.orange, fontSize: 15 },
  retry: { color: colors.green, fontWeight: '600', marginTop: 8 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.outline,
  },
  icon: { width: 32, height: 32, borderRadius: 16, marginRight: 12 },
  nameCol: { flex: 1 },
  symbol: { color: colors.onDark, fontSize: 16, fontWeight: '700' },
  name: { color: colors.muted, fontSize: 13, marginTop: 2 },
  right: { alignItems: 'flex-end' },
  price: { color: colors.onDark, fontSize: 16, fontWeight: '600' },
  change: { fontSize: 13, fontWeight: '600', marginTop: 2 },
});
