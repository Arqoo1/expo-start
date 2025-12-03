import { StyleSheet, Text, Pressable } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import Loading from "../../../../components/Loading";

import { usePhone } from "../../../../api/phones/usePhones";

export default function PhoneDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data: phone, isLoading, error } = usePhone(id);

  if (isLoading) return <Loading />;

  if (error || !phone) {
    return (
      <Text style={{ fontSize: 20, textAlign: "center" }}>
        Product not found
      </Text>
    );
  }

  return <ProductView product={phone} router={router} />;
}

// Reusable product display
const ProductView = ({ product, router }) => (
  <SafeAreaProvider>
    <Stack.Screen options={{ title: product.name }} />
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  price: { fontSize: 18, color: "gray", marginBottom: 12 },
  description: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  button: {
    backgroundColor: "#2E186A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontSize: 16, textAlign: "center" },
});
