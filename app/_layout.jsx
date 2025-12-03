import { Stack, useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProfileProvider, ProfileContext } from "../context/profile.context";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function LayoutContent() {
  const { dispatch } = useContext(ProfileContext);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        console.log("🔍 Checking AsyncStorage for logged-in user...");
        const storedUser = await AsyncStorage.getItem("loggedInUser");

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log("✅ Found stored user:", parsedUser);
          dispatch({ type: "SET_USER", payload: parsedUser });
          router.replace("/home");
        } else {
          console.log("⚠️ No user found in AsyncStorage.");
          router.replace("/");
        }
      } catch (error) {
        console.log("❌ Error checking AsyncStorage:", error);
        router.replace("/");
      }
    };

    checkUser();
  }, []);

  return null;
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProfileProvider>
        <LayoutContent />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ProfileProvider>
    </QueryClientProvider>
  );
}
