import { StyleSheet, View, FlatList, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { width, height } from "./constants/Dimensions";
import Card from "./components/Card";

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
];

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
];

export default function App() {
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
          />
        </View>

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
          />
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
    flex: 0.5,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
});
