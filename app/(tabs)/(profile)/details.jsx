import { View, Text, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useProfile } from "../../../context/profile.hook";

export default function ProfileDetails() {
  const { loggedInUser } = useProfile();

  if (!loggedInUser) {
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
      <Text style={styles.text}>Name: {loggedInUser.name}</Text>
      <Text style={styles.text}>Surname: {loggedInUser.surname}</Text>
      <Text style={styles.text}>Email: {loggedInUser.email}</Text>
      <Text style={styles.text}>Phone: {loggedInUser.phone}</Text>

      <Link href="edit" asChild>
        <Button title="Edit Profile" color="#2E186A" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
