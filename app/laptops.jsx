import { StyleSheet, View, FlatList, Text, Pressable } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { width, height } from "../constants/Dimensions";
import Card from "../components/Card";

const laptops = [
  {
    id: "1",
    name: "MacBook Pro",
    price: 1999,
    description: "Powerful laptop for creators.",
  },
  {
    id: "2",
    name: "Dell XPS 15",
    price: 1799,
    description: "Excellent display and performance.",
  },
  {
    id: "3",
    name: "HP Spectre x360",
    price: 1599,
    description: "Stylish and versatile 2-in-1.",
  },
  {
    id: "4",
    name: "MacBook Pro",
    price: 1999,
    description: "Powerful laptop for creators.",
  },
  {
    id: "5",
    name: "Dell XPS 15",
    price: 1799,
    description: "Excellent display and performance.",
  },
  {
    id: "6",
    name: "HP Spectre x360",
    price: 1599,
    description: "Stylish and versatile 2-in-1.",
  },
  {
    id: "7",
    name: "HP Spectre x360",
    price: 1599,
    description: "Stylish and versatile 2-in-1.",
  },
  {
    id: "8",
    name: "MacBook Pro",
    price: 1999,
    description: "Powerful laptop for creators.",
  },
  {
    id: "9",
    name: "Dell XPS 15",
    price: 1799,
    description: "Excellent display and performance.",
  },
  {
    id: "10",
    name: "HP Spectre x360",
    price: 1599,
    description: "Stylish and versatile 2-in-1.",
  },
];

export default function Laptops() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.listWrapper}>
          <Text style={styles.header}>Laptops</Text>
          <FlatList
            data={laptops}
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

          <Link href="/phones" style={styles.button}>
            Go to Phones
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
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 15,
  },
  button: {
    backgroundColor: "#2E186A",
    borderRadius: 10,
    color: "#fff",
    textAlign: "center",
    padding: 12,
  },
});
