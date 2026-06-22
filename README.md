# SmartInvest Draft — React Native (Expo)

A native mobile app starter: Revolut-style animated bottom tabs, themed with the
**loggd.life** color palette (verified from its compiled CSS).

- **Stack:** React Native + Expo SDK 54 + TypeScript
- **Brand green:** `#00C758` · **Background:** `#0B1222` · **Surface:** `#1E2939` · **Accent orange:** `#F99C00`
- **Tabs:** Home · Markets · Portfolio · Profile (the selected tab grows into a colored pill with its label sliding in)

## Requirements (macOS 11 Big Sur)

- **Node.js 18+** (`node -v`). If missing: `brew install node` or grab the LTS installer.
- **Expo Go** app on your phone (App Store / Play Store) — the easiest way to run with no Xcode/Android Studio.
- *(Optional)* Android Studio / Xcode only if you want native simulators.

## Run it

```bash
npm install          # installs dependencies (creates package-lock.json)
npx expo install --fix   # pins every package to the exact SDK 54 version
npx expo start --tunnel  # starts the dev server + QR code
```

> Expo Go on your phone must match the project's SDK. This project targets **SDK 54**
> (the current Expo Go). `npx expo install --fix` is the source of truth for versions —
> run it after install to reconcile React / React Native / etc. to SDK 54.

Then either:
- **Phone:** open **Expo Go** and scan the QR code from the terminal.
- **iOS simulator:** press `i` · **Android emulator:** press `a` · **Web preview:** press `w`.

> First `npm install` needs internet to fetch packages. After that, the QR/Expo Go
> flow works on the same Wi-Fi network.

## Where to change things

| Want to change…           | File |
|---------------------------|------|
| Colors / palette          | `src/theme/colors.ts` |
| Tabs (add/rename/icons)   | `src/components/tabs.ts` |
| Tab bar look & animation  | `src/components/AnimatedTabBar.tsx` |
| Per-tab content           | `src/screens/PlaceholderScreen.tsx` |
| Root layout / state       | `App.tsx` |

Icons come from `@expo/vector-icons` (Ionicons) — browse names at https://icons.expo.fyi.

## Next steps

- Replace each placeholder with a real screen.
- If you need per-tab navigation stacks, add **expo-router** or **React Navigation**.
- Swap in a custom font with `expo-font`.
