import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { laptops } from "../../../../data/products";

export default function LaptopDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const laptop = laptops.find((item) => item.id === id);

  if (!laptop) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Text style={styles.error}>Laptop not found</Text>
          <Pressable style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </Pressable>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack.Screen options={{ title: laptop.name }} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{laptop.name}</Text>
        <Text style={styles.price}>${laptop.price}</Text>
        <Text style={styles.description}>{laptop.description}</Text>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: "gray",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  error: {
    fontSize: 18,
    color: "red",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2E186A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
