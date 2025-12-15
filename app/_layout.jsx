import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useVerify } from "../api/auth/useAuth";

const queryClient = new QueryClient();

function LayoutContent() {
  const router = useRouter();
  const { data, isLoading, isError } = useVerify();

  useEffect(() => {
    const init = async () => {
      if (isLoading) return;

      if (isError) {
        await AsyncStorage.multiRemove(["token", "user"]);
        router.replace("/");
        return;
      }

      if (data) {
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        router.replace("/(tabs)");
      }
    };

    init();
  }, [isLoading, isError, data]);

  return null;
}



export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutContent />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </QueryClientProvider>
  );
}