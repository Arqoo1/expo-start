import { View, Text, Button, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { useProfile } from "../../../api/profile";
import { useLogout } from "../../../api/auth/useAuth";

export default function ProfileDetails() {
  const router = useRouter();
  const { data: user, isLoading, isError } = useProfile();
  const { mutate: logout, isPending } = useLogout();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError || !user) {
    router.replace("/login");
    return null;
  }

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        router.replace("/login");
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{user.name}</Text>

      <Text style={styles.label}>Surname:</Text>
      <Text style={styles.value}>{user.surname}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>

      <Text style={styles.label}>Phone:</Text>
      <Text style={styles.value}>{user.phone}</Text>

      <View style={styles.buttonWrapper}>
        <Link href="edit" asChild>
          <Button title="Edit Profile" />
        </Link>
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title={isPending ? "Logging out..." : "Logout"}
          onPress={handleLogout}
          disabled={isPending}
          color="red"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  buttonWrapper: {
    marginTop: 16,
  },
});
