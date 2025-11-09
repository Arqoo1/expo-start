import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import { useProfile } from "../context/profile.hook";
import { LoginSchema } from "../utils/validations";
import ScreenWrapper from "../components/ScreenWrapper";
export default function Login() {
  const { loginUser } = useProfile();
  const router = useRouter();

  const handleLogin = (values) => {
    const success = loginUser(values.email, values.password);
    if (success) {
      Alert.alert("Success", "Logged in successfully!");
      router.replace("/(tabs)/(profile)/details");
    } else {
      Alert.alert("Error", "Invalid email or password");
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            handleBlur,
          }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <Button title="Login" color="#2E186A" onPress={handleSubmit} />
              <Text
                style={styles.link}
                onPress={() => router.push("/register")}
              >
                Don’t have an account? Register
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
    marginBottom: 5,
  },
  error: {
    color: "red",
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 13,
  },
  link: {
    textAlign: "center",
    marginTop: 15,
    color: "#4400ff",
    fontWeight: "600",
  },
});
