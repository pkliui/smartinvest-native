import React from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { TABS, TabKey } from './tabs';

// LayoutAnimation needs to be turned on explicitly on Android.
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  active: TabKey;
  onChange: (key: TabKey) => void;
}

/**
 * Revolut-style bottom navigation: the selected tab grows into a colored "pill"
 * with its label sliding in. LayoutAnimation smoothly animates the size change
 * as the active tab moves.
 */
export default function AnimatedTabBar({ active, onChange }: Props) {
  const select = (key: TabKey) => {
    if (key === active) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onChange(key);
  };

  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const focused = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            onPress={() => select(tab.key)}
            style={[styles.item, focused && styles.itemActive]}
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={focused ? colors.green : colors.muted}
            />
            {focused && (
              <Text style={styles.label} numberOfLines={1}>
                {tab.label}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.surfaceLow,
    paddingHorizontal: 8,
    paddingTop: 10,
    paddingBottom: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  itemActive: {
    backgroundColor: colors.greenDeep,
  },
  label: {
    color: colors.green,
    fontWeight: '600',
    fontSize: 13,
    marginLeft: 8,
  },
});
