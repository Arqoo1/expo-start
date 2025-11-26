import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Text, Pressable, StyleSheet } from "react-native";

export default function NotFound({ message = "Product not found", onBack }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>404 </Text>
        {onBack && (
          <Pressable style={styles.button} onPress={onBack}>
            <Text style={styles.buttonText}>Go Back</Text>
          </Pressable>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  error: { fontSize: 18, color: "red", marginBottom: 12, textAlign: "center" },
  button: { backgroundColor: "#2E186A", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  buttonText: { color: "#fff", fontSize: 16, textAlign: "center" },
});
