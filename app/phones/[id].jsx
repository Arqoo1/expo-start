import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { phones } from "../../data/products";

export default function PhoneDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const phone = phones.find((item) => item.id === id);

  if (!phone) {
    router.replace("/not-found");
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{phone.name}</Text>
      <Text style={styles.price}>${phone.price}</Text>
      <Text style={styles.description}>{phone.description}</Text>
      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  price: { fontSize: 18, color: "gray", marginBottom: 12 },
  description: { textAlign: "center", marginBottom: 20 },
  button: { backgroundColor: "#2E186A", padding: 10, borderRadius: 8 },
  buttonText: { color: "#fff" },
});
