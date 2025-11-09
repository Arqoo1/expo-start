import { Stack } from "expo-router";
import { useContext } from "react";
import { ProfileProvider, ProfileContext } from "../context/profile.context";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

function LayoutContent() {
  const { loggedInUser } = useContext(ProfileContext);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!loggedInUser ? (
        <Stack.Screen name="login" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ProfileProvider>
      <LayoutContent />
    </ProfileProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
