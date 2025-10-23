import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Card({ id, name, price, description, detailsLink }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>Price: ${price}</Text>
      <Text>{description}</Text>

      <Link href={`${detailsLink}/${id}`} style={styles.link}>
        View Details
      </Link>
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
    gap: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  price: {
    fontSize: 16,
  },
  link: {
    marginTop: 10,
    backgroundColor: "#2E186A",
    color: "#fff",
    textAlign: "center",
    paddingVertical: 6,
    borderRadius: 6,
  },
});
