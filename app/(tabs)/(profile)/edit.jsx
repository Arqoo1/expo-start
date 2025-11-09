import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useProfile } from "../../../context/profile.hook";
import { useRouter } from "expo-router";
import { EditProfileSchema } from "../../../utils/validations";
import ScreenWrapper from "../../../components/ScreenWrapper";
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
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>
        <Formik
          initialValues={{
            name: loggedInUser.name || "",
            surname: loggedInUser.surname || "",
            email: loggedInUser.email || "",
            phone: loggedInUser.phone || "",
          }}
          validationSchema={EditProfileSchema}
          onSubmit={(values) => {
            updateProfile(values);
            Alert.alert("Success", "Profile updated!");
            router.back();
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              <Text>Name</Text>
              <TextInput
                style={styles.input}
                value={values.name}
                onChangeText={handleChange("name")}
              />
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}

              <Text>Surname</Text>
              <TextInput
                style={styles.input}
                value={values.surname}
                onChangeText={handleChange("surname")}
              />
              {touched.surname && errors.surname && (
                <Text style={styles.error}>{errors.surname}</Text>
              )}

              <Text>Email</Text>
              <TextInput
                style={styles.input}
                value={values.email}
                onChangeText={handleChange("email")}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <Text>Phone</Text>
              <TextInput
                style={styles.input}
                value={values.phone}
                onChangeText={handleChange("phone")}
              />
              {touched.phone && errors.phone && (
                <Text style={styles.error}>{errors.phone}</Text>
              )}

              <Button title="Save" color="#2E186A" onPress={handleSubmit} />
            </>
          )}
        </Formik>
      </View>
    </ScreenWrapper>
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
  error: {
    color: "red",
    marginBottom: 8,
  },
});
