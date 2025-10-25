import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
             headerStyle: { backgroundColor: Colors.light.background },
            headerTintColor: Colors.light.text,
        contentStyle: { backgroundColor: Colors.light.background }, 
        }}
        >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="drow" options={{ title: 'カードを引く' }} />
        <Stack.Screen name="result" options={{ title: '結果' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
