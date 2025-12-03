import { StyleSheet, View, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { width, height } from "../../../constants/Dimensions";
import Card from "../../../components/Card";
import Loading from "../../../components/Loading";

import { usePhones } from "../../../api/phones/usePhones";

export default function Phones() {
  const { data: phones, isLoading, error, refetch, isFetching } = usePhones();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Loading />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.listWrapper}>
          <FlatList
            data={phones}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <Card
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
                description={item.description}
                detailsLink="/phoneDetails"
              />
            )}
            showsVerticalScrollIndicator={false}
            refreshing={isFetching}
            onRefresh={refetch}
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
