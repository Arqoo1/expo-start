import { StyleSheet, View, FlatList, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { width, height } from "../../constants/Dimensions";
import Card from "../../components/Card";
import { laptops } from "../../data/products";

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
                id={item.id}
                name={item.name}
                price={item.price}
                description={item.description}
                detailsLink="/laptopDetails"
              />
            )}
            showsVerticalScrollIndicator={false}
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
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
});
