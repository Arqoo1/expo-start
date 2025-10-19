import { StyleSheet, View, FlatList, Text, Pressable } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { width, height } from "../constants/Dimensions";
import Card from "../components/Card";

const phones = [
  {
    id: "1",
    name: "iPhone 15",
    price: 999,
    description: "Latest Apple flagship.",
  },
  {
    id: "2",
    name: "Samsung Galaxy S24",
    price: 899,
    description: "Premium Android phone.",
  },
  {
    id: "3",
    name: "Google Pixel 8",
    price: 799,
    description: "Smooth Android experience.",
  },
  {
    id: "4",
    name: "iPhone 15",
    price: 999,
    description: "Latest Apple flagship.",
  },
  {
    id: "5",
    name: "Samsung Galaxy S24",
    price: 899,
    description: "Premium Android phone.",
  },
  {
    id: "6",
    name: "Google Pixel 8",
    price: 799,
    description: "Smooth Android experience.",
  },
  {
    id: "7",
    name: "Google Pixel 8",
    price: 799,
    description: "Smooth Android experience.",
  },
  {
    id: "8",
    name: "iPhone 15",
    price: 999,
    description: "Latest Apple flagship.",
  },
  {
    id: "9",
    name: "Samsung Galaxy S24",
    price: 899,
    description: "Premium Android phone.",
  },
  {
    id: "10",
    name: "Google Pixel 8",
    price: 799,
    description: "Smooth Android experience.",
  },
];

export default function Phones() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.listWrapper}>
          <Text style={styles.header}>Phones</Text>
          <FlatList
            data={phones}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card
                name={item.name}
                price={item.price}
                description={item.description}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          <Link href="/laptops" style={styles.button}>
            Go to Laptops
          </Link>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    paddingHorizontal: 10,
  },
  listWrapper: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#2E186A",
    borderRadius: 10,
    color: "#fff",
    textAlign: "center",
    padding: 12,
  },
});
