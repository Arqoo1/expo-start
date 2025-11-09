import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Platform,
  StyleSheet,
} from "react-native";

export default function ScreenWrapper({ children }) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
