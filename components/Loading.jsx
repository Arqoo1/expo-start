import React from "react";
import {

  ActivityIndicator,
  StyleSheet,
} from "react-native";

export default function Loading() {
  return <ActivityIndicator size="large" color="#2E186A" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
