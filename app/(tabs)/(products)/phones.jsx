import { StyleSheet, View, FlatList, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { width, height } from "../../../constants/Dimensions";
import Card from "../../../components/Card";
import { phones } from "../../../data/products";

export default function Phones() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.listWrapper}>
          <FlatList
            data={phones}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                description={item.description}
                detailsLink="/phoneDetails"
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
