import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useProfile } from "../../../context/profile.hook";

export default function EditProfile() {
  const { profile, updateProfile } = useProfile();
  const [form, setForm] = useState(profile);
  const router = useRouter();

  const handleSave = () => {
    updateProfile(form);
    router.back();
  };

  return (
    <View style={styles.container}>
      {["name", "surname", "email", "phone"].map((field) => (
        <View key={field} style={styles.inputGroup}>
          <Text style={styles.label}>{field.toUpperCase()}</Text>
          <TextInput
            style={styles.input}
            value={form[field]}
            onChangeText={(value) => setForm({ ...form, [field]: value })}
          />
        </View>
      ))}

      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
});
