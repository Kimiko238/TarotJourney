import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

SplashScreen.preventAutoHideAsync().catch(() => null);

const MIN_SPLASH_DISPLAY_MS = 200;
const POST_HIDE_SPLASH_VISIBLE_MS = 2000;

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isAppReady, setIsAppReady] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function prepare() {
      const startTime = Date.now();

      try {
        // TODO: 必要な初期化処理（フォント読み込み等）があればここで await する
        await new Promise((resolve) => setTimeout(resolve, 400));
      } finally {
        const elapsed = Date.now() - startTime;
        const waitTime = Math.max(MIN_SPLASH_DISPLAY_MS - elapsed, 0);
        await new Promise((resolve) => setTimeout(resolve, waitTime));

        if (isMounted) {
          setIsAppReady(true);
        }
      }
    }

    prepare();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isAppReady) {
      return;
    }

    let isActive = true;

    (async () => {
      await SplashScreen.hideAsync().catch(() => null);
      if (isActive) {
        setTimeout(() => {
          if (isActive) {
            setIsSplashVisible(false);
          }
        }, POST_HIDE_SPLASH_VISIBLE_MS);
      }
    })();

    return () => {
      isActive = false;
    };
  }, [isAppReady]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: Colors.light.background },
            headerTintColor: Colors.light.text,
            contentStyle: { backgroundColor: Colors.light.background },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="drow" options={{ title: 'ホーム画面へ戻る' }} />
          <Stack.Screen name="result" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </View>

      {isSplashVisible && (
        <ImageBackground
          source={require('@/assets/images/splash.png')}
          style={styles.fullscreenSplash}
          resizeMode="cover"
          fadeDuration={0}
        />
      )}
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  fullscreenSplash: {
    ...StyleSheet.absoluteFillObject,
  },
});
 
