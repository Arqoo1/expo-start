import { StyleSheet, View, FlatList, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { width, height } from "../../constants/Dimensions";
import { phones } from "../../data/products";
import { useRouter } from "expo-router";

export default function Phones() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Phones</Text>
      <FlatList
        data={phones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/phones/${item.id}`)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10, paddingTop: 10 },
  header: { fontSize: 22, fontWeight: "600", marginBottom: 10 },
  card: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 10,
    marginVertical: 6,
  },
  name: { fontSize: 16, fontWeight: "500" },
  price: { color: "gray", marginTop: 4 },
});
