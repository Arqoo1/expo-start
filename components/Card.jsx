import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Card({
  id,
  name,
  price,
  description,
  detailsLink,
  image,
}) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.img} />

      <View style={styles.infoBox}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
        <Text style={styles.desc}>{description}</Text>

        <Link href={`${detailsLink}/${id}`} style={styles.link}>
          View Details
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginVertical: 10,
    overflow: "hidden",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  img: {
    width: "100%",
    height: 180,
  },
  infoBox: {
    padding: 12,
    gap: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  price: {
    fontSize: 16,
    color: "#2E186A",
    fontWeight: "700",
  },
  desc: {
    fontSize: 14,
    color: "#333",
  },
  link: {
    marginTop: 8,
    backgroundColor: "#2E186A",
    color: "#fff",
    textAlign: "center",
    paddingVertical: 8,
    borderRadius: 8,
    fontWeight: "600",
  },
});
