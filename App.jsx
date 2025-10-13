import { StyleSheet, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { width, height } from "./constants/Dimensions";
export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.Square1}>
          <View style={styles.innerSquare1} />
          <View style={styles.innerSquare2} />
        </View>

        <View style={styles.Square2}>
          <View style={styles.centered} />
        </View>

        <View style={styles.Square3} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: "#ffffff",
  },
  Square1: {
    flex: 0.3,
    flexDirection: "row",
  },
  innerSquare1: {
    flex: 0.2,
    backgroundColor: "#f54291",
  },
  innerSquare2: {
    flex: 0.8,
    backgroundColor: "#42d9f5",
  },
  Square2: {
    flex: 0.3,
    backgroundColor: "#42f554",
    justifyContent: "center",
    alignItems: "center",
  },
  centered: {
    width: 100,
    height: 100,
    backgroundColor: "#f5e642",
  },
  Square3: {
    flex: 0.4,
    backgroundColor: "#f57e42",
  },
});
