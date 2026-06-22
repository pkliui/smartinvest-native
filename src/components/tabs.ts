import { Ionicons } from '@expo/vector-icons';

export type TabKey = 'home' | 'markets' | 'portfolio' | 'profile';

export interface TabDef {
  key: TabKey;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

// The bottom-bar tabs for SmartInvest. Add/rename here and the bar + screens follow.
export const TABS: TabDef[] = [
  { key: 'home', label: 'Home', icon: 'home-outline' },
  { key: 'markets', label: 'Markets', icon: 'stats-chart-outline' },
  { key: 'portfolio', label: 'Portfolio', icon: 'wallet-outline' },
  { key: 'profile', label: 'Profile', icon: 'person-outline' },
];
