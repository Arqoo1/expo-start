import { View, Text, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function ProfileDetails() {
  const profile = {
    name: "Giorgi",
    surname: "Arkania",
    email: "Giorgi@example.com",
    phone: "+995 555 123 456",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {profile.name}</Text>
      <Text style={styles.text}>Surname: {profile.surname}</Text>
      <Text style={styles.text}>Email: {profile.email}</Text>
      <Text style={styles.text}>Phone: {profile.phone}</Text>

      <Link
        href={{
          pathname: "edit",
          params: {
            name: profile.name,
            surname: profile.surname,
            email: profile.email,
            phone: profile.phone,
          },
        }}
        asChild
      >
        <Button title="Edit Profile" />
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
