import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { width, height } from "../../../constants/Dimensions";
import Card from "../../../components/Card";
import { useProducts } from "../../../context/products.context";
import Loading from "../../../components/Loading";

export default function Phones() {
  const { state } = useProducts();
  const { phones, loading, error } = state;

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.listWrapper}>
          <FlatList
            data={phones}
            keyExtractor={(item) => item.id.toString()}
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
});
