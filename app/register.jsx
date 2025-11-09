import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import { useProfile } from "../context/profile.hook";
import { RegisterSchema } from "../utils/validations";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import ScreenWrapper from "../components/ScreenWrapper";
export default function Register() {
  const { registerUser } = useProfile();
  const router = useRouter();

  const handleRegister = (values) => {
    registerUser(values);
    Alert.alert("Success", "Registered successfully!");
    router.replace("/login");
  };

  return (
    <ScreenWrapper>
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
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={values.name}
                onChangeText={handleChange("name")}
              />
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Surname"
                value={values.surname}
                onChangeText={handleChange("surname")}
              />
              {touched.surname && errors.surname && (
                <Text style={styles.error}>{errors.surname}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange("email")}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={values.phone}
                onChangeText={handleChange("phone")}
              />
              {touched.phone && errors.phone && (
                <Text style={styles.error}>{errors.phone}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange("password")}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <Button title="Register" color="#2E186A" onPress={handleSubmit} />
              <Text style={styles.link} onPress={() => router.push("/login")}>
                Already have an account? Login
              </Text>
            </>
          )}
        </Formik>
      </View>
    </ScreenWrapper>
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
  error: {
    color: "red",
    marginBottom: 8,
  },
});
