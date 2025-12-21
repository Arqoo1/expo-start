import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { useProfile, useUpdateProfile } from "../../../api/profile";
import { EditProfileSchema } from "../../../utils/validations";
import { useRouter } from "expo-router";

export default function EditProfile() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useProfile();
  const { mutate, isPending } = useUpdateProfile();

  if (isLoading || !user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ padding: 20 }}>
      <Formik
        initialValues={{
          name: user.name,
          surname: user.surname,
          email: user.email,
          phone: user.phone,
        }}
        validationSchema={EditProfileSchema}
        onSubmit={(values) =>
          mutate(values, {
            onSuccess: async () => {
              await queryClient.refetchQueries({ queryKey: ["profile"] });
              router.back();
            },
          })
        }
      >
        {({ handleChange, handleSubmit, values }) => (
          <>
            <TextInput
              style={styles.input}
              value={values.name}
              onChangeText={handleChange("name")}
              placeholder="Name"
            />

            <TextInput
              style={styles.input}
              value={values.surname}
              onChangeText={handleChange("surname")}
              placeholder="Surname"
            />

            <TextInput
              style={styles.input}
              value={values.email}
              onChangeText={handleChange("email")}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              value={values.phone}
              onChangeText={handleChange("phone")}
              placeholder="Phone"
              keyboardType="phone-pad"
            />
            <Button
              title={isPending ? "Saving..." : "Save"}
              onPress={handleSubmit}
              disabled={isPending}
            />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
});
