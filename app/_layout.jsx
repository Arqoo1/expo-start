import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useVerify } from "../api/auth/useAuth";
import BaseInterceptor from "../interceptors/base.interceptor";

const queryClient = new QueryClient();

// Module-level variable to prevent loops across remounts
let authCheckStarted = false;

// Exported ONLY for testing purposes
export const resetAuthFlag = () => {
  authCheckStarted = false;
};

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Bootstrap />
      <BaseInterceptor />
    </QueryClientProvider>
  );
}

function Bootstrap() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const { refetch } = useVerify();

  useEffect(() => {
    if (authCheckStarted) {
      setReady(true);
      return;
    }

    authCheckStarted = true;

    const run = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          setReady(true);
          return;
        }

        const res = await refetch();

        if (res.data?.user) {
          await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
          router.replace("/(tabs)");
        } else {
          await AsyncStorage.removeItem("token");
        }
      } catch (error) {
        await AsyncStorage.removeItem("token");
      } finally {
        setReady(true);
      }
    };

    run();
  }, [refetch, router]);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator testID="activity-indicator" size="large" />
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