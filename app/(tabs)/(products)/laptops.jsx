import { StyleSheet, View, FlatList, Text, Button } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { width, height } from "../../../constants/Dimensions";
import Card from "../../../components/Card";
import { laptops } from "../../../data/products";

export default function Laptops() {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.listWrapper}>
          <FlatList
            data={laptops}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card
                id={item.id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
                detailsLink="/laptopDetails"
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="Check our phones too"
            color="#2E186A"
            onPress={() => router.push("/(products)/phones")}
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
  buttonWrapper: {
    marginVertical: 15,
    paddingHorizontal: 20,
  },
});
