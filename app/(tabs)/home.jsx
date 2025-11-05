import { View, Button, StyleSheet, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function Home() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>HOME PAGE</Text>
        <View style={styles.authButtons}>
          <Link href="/register" asChild>
            <Button title="Register" color="#2E186A" />
          </Link>
          <Link href="/login" asChild>
            <Button title="Login" color="#2E186A" />
          </Link>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  authButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
