import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { TABS, TabKey } from './tabs';

interface Props {
  active: TabKey;
  onChange: (key: TabKey) => void;
}

const PAD = 10; // horizontal padding inside the bar

/**
 * Revolut-style bottom navigation with a frosted-glass indicator that *slides*
 * between tabs. The pill is a translucent BlurView; its X position springs to
 * the selected tab using the built-in Animated API (native-driven transform).
 */
export default function AnimatedTabBar({ active, onChange }: Props) {
  const [barWidth, setBarWidth] = useState(0);
  const activeIndex = TABS.findIndex((t) => t.key === active);

  // Drives the indicator: value === tab index. Springs on selection change.
  const pos = useRef(new Animated.Value(activeIndex)).current;

  useEffect(() => {
    Animated.spring(pos, {
      toValue: activeIndex,
      useNativeDriver: true,
      friction: 9,
      tension: 90,
    }).start();
  }, [activeIndex, pos]);

  const tabWidth = barWidth > 0 ? (barWidth - PAD * 2) / TABS.length : 0;

  const onBarLayout = (e: LayoutChangeEvent) =>
    setBarWidth(e.nativeEvent.layout.width);

  // Map tab index -> horizontal pixels.
  const translateX = Animated.multiply(pos, tabWidth);

  return (
    <View style={styles.wrapper} onLayout={onBarLayout}>
      {/* The bar surface itself is a subtle glass panel. */}
      <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />

      {/* Sliding frosted-glass indicator. */}
      {tabWidth > 0 && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.indicator,
            { width: tabWidth, transform: [{ translateX }] },
          ]}
        >
          <BlurView intensity={40} tint="light" style={styles.glass}>
            <View style={styles.glassTint} />
          </BlurView>
        </Animated.View>
      )}

      {/* Tab buttons on top. */}
      <View style={styles.row}>
        {TABS.map((tab) => {
          const focused = tab.key === active;
          return (
            <Pressable
              key={tab.key}
              onPress={() => onChange(tab.key)}
              style={styles.item}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
            >
              <Ionicons
                name={tab.icon}
                size={23}
                color={focused ? colors.tabActiveIcon : colors.muted}
              />
              <Text style={[styles.label, focused && styles.labelActive]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const ITEM_HEIGHT = 56;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: PAD,
    paddingTop: 8,
    paddingBottom: 24,
    backgroundColor: 'rgba(16, 24, 40, 0.6)', // surfaceLow @ 60% for the glass base
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    height: ITEM_HEIGHT,
  },
  item: {
    flex: 1,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  indicator: {
    position: 'absolute',
    left: PAD,
    top: 8,
    height: ITEM_HEIGHT,
  },
  glass: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 999,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  glassTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.tabGlass, // sliding-pill tint — set in theme/colors.ts
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.muted,
  },
  labelActive: {
    color: colors.tabActiveIcon,
  },
});
