import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useVerify } from "../api/auth/useAuth";
import BaseInterceptor from "../interceptors/base.interceptor";

const queryClient = new QueryClient();

let hasBootstrapped = false;

function Bootstrap() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const { refetch } = useVerify();

  useEffect(() => {
    if (hasBootstrapped) {
      setReady(true);
      return;
    }

    hasBootstrapped = true;

    const run = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          return;
        }

        const res = await refetch();

        if (!res.data?.user) {
          throw new Error("Invalid token");
        }

        await AsyncStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        router.replace("/(tabs)");
      } catch {
        await AsyncStorage.removeItem("token");
      } finally {
        setReady(true);
      }
    };

    run();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Bootstrap />
      <BaseInterceptor />
    </QueryClientProvider>
  );
}
