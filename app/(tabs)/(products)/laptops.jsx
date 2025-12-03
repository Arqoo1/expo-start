import { StyleSheet, View, FlatList, Button } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { width, height } from "../../../constants/Dimensions";
import Card from "../../../components/Card";
import Loading from "../../../components/Loading";

import { useLaptops } from "../../../api/laptops/useLaptops";

export default function Laptops() {
  const router = useRouter();
  const { data: laptops, isLoading, error, refetch, isFetching } = useLaptops();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Button title="Error loading laptops" onPress={() => refetch()} />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.listWrapper}>
          <FlatList
            data={laptops}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <Card
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
                detailsLink="/laptopDetails"
              />
            )}
            showsVerticalScrollIndicator={false}
            refreshing={isFetching}
            onRefresh={refetch}
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
  buttonWrapper: {
    marginVertical: 15,
    paddingHorizontal: 20,
  },
});
