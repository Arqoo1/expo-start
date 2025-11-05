import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import { useProfile } from "../../../context/profile.hook";
import { useRouter } from "expo-router";

export default function EditProfile() {
  const { loggedInUser, updateProfile } = useProfile();
  const router = useRouter();

  if (!loggedInUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No user logged in.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <Formik
        initialValues={{
          name: loggedInUser.name || "",
          surname: loggedInUser.surname || "",
          email: loggedInUser.email || "",
          phone: loggedInUser.phone || "",
        }}
        onSubmit={(values) => {
          updateProfile(values);
          Alert.alert("Success", "Profile updated!");
          router.back();
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <>
            <Text>Name</Text>
            <TextInput
              style={styles.input}
              value={values.name}
              onChangeText={handleChange("name")}
            />
            <Text>Surname</Text>
            <TextInput
              style={styles.input}
              value={values.surname}
              onChangeText={handleChange("surname")}
            />
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              value={values.email}
              onChangeText={handleChange("email")}
            />
            <Text>Phone</Text>
            <TextInput
              style={styles.input}
              value={values.phone}
              onChangeText={handleChange("phone")}
            />

            <Button title="Save" color="#2E186A" onPress={handleSubmit} />
          </>
        )}
      </Formik>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});
