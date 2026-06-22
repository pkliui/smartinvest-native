import { ComponentType } from 'react';
import { TabKey } from '../components/tabs';
import HomeScreen from './HomeScreen';
import MarketsScreen from './MarketsScreen';
import PortfolioScreen from './PortfolioScreen';
import ProfileScreen from './ProfileScreen';

// Maps each tab to its screen. Add a tab in components/tabs.ts, add its screen
// here, and the app routes to it automatically.
export const SCREENS: Record<TabKey, ComponentType> = {
  home: HomeScreen,
  markets: MarketsScreen,
  portfolio: PortfolioScreen,
  profile: ProfileScreen,
};
