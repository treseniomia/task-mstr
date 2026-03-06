import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "../src/store/AuthContext";

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const [isFirstLoadDone, setIsFirstLoadDone] = useState(false);

  // 1. Splash Screen Logic
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setIsFirstLoadDone(true);
        SplashScreen.hideAsync();
      }, 1000);
    }
  }, [loading]);

  // 2. Navigation Guard (Simplified & Robust)
  useEffect(() => {
    if (!isFirstLoadDone || loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      // Kung walang user at wala sa login/onboarding, itapon sa onboarding
      router.replace("/(auth)/onboarding");
    } else if (user && inAuthGroup) {
      // Kung may user pero nasa login/auth pa, itapon sa tabs
      router.replace("/(tabs)");
    }
  }, [user, segments, isFirstLoadDone, loading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Huwag lagyan ng Stack.Screen name="index" dito kung redirect lang naman siya */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* DITO NATIN SIGURADUHIN ANG PATH */}
      <Stack.Screen
        name="task/[id]"
        options={{
          headerShown: true,
          title: "Task Focus",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
