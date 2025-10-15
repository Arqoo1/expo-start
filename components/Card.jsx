import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Card({ name, price, description }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>Price: ${price}</Text>
      <Text>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginVertical: 5,
    padding: 16,
    borderColor: "#000000",
    borderWidth: 1,
    borderStyle: "solid",
    gap: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  price: {
    fontSize: 16,
  },
});
