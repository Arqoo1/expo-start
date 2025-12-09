import { View, Text, Button, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileDetails() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (!storedUser) {
        router.replace("/login");
        return;
      }
      setUser(JSON.parse(storedUser));
    };

    loadUser();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No user logged in.</Text>
        <Link href="/login" asChild>
          <Button title="Go to Login" color="#2E186A" />
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {user.name}</Text>
      <Text style={styles.text}>Surname: {user.surname}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <Text style={styles.text}>Phone: {user.phone}</Text>

      <Link href="edit" asChild>
        <Button title="Edit Profile" color="#2E186A" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  text: { fontSize: 18, marginBottom: 10 },
});
