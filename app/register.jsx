import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import { useProfile } from "../context/profile.hook";

export default function Register() {
  const { registerUser } = useProfile();
  const router = useRouter();

  const handleRegister = (values) => {
    registerUser(values);
    Alert.alert("Success", "Registered successfully!");
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Formik
        initialValues={{
          name: "",
          surname: "",
          email: "",
          phone: "",
          password: "",
        }}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleSubmit, values }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={values.name}
              onChangeText={handleChange("name")}
            />
            <TextInput
              style={styles.input}
              placeholder="Surname"
              value={values.surname}
              onChangeText={handleChange("surname")}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange("email")}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={values.phone}
              onChangeText={handleChange("phone")}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange("password")}
            />
            <Button title="Register" color="#2E186A" onPress={handleSubmit} />
            <Text style={styles.link} onPress={() => router.push("/login")}>
              Already have an account? Login
            </Text>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  link: {
    textAlign: "center",
    marginTop: 15,
    color: "#4400ff",
    fontWeight: "600",
  },
});
