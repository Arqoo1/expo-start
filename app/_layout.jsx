import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useVerify } from "../api/auth/useAuth";
import BaseInterceptor from "../interceptors/base.interceptor";

const queryClient = new QueryClient();

// LayoutContent handles verification and redirect
export function LayoutContent({ onDone }) {
  const router = useRouter();
  const { data, isLoading, isError } = useVerify();

  useEffect(() => {
    if (isLoading) return;

    const bootstrap = async () => {
      if (isError || !data?.user) {
        await AsyncStorage.removeItem("token"); // clear invalid token
        onDone(); // signal RootLayout to render login/register
        return;
      }

      // Token is valid, store user
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to tabs
      router.replace("/(tabs)");
      onDone(); // stop loader in RootLayout
    };

    bootstrap();
  }, []);

  return null;
}

// RootLayout
export default function RootLayout() {
  const [ready, setReady] = useState(false); // loader state

  return (
    <QueryClientProvider client={queryClient}>
      {!ready && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}

      {!ready && <LayoutContent onDone={() => setReady(true)} />}

      {ready && (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="register" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      )}

      <BaseInterceptor />
    </QueryClientProvider>
  );
}
