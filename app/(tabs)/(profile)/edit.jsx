import { useReducer } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
}

export default function EditProfile() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const initialState = {
    name: params.name || "",
    surname: params.surname || "",
    email: params.email || "",
    phone: params.phone || "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSave = () => {
    console.log("Saved Profile:", state);
    router.back();
  };

  return (
    <View style={styles.container}>
      {["name", "surname", "email", "phone"].map((field) => (
        <View key={field} style={styles.inputGroup}>
          <Text style={styles.label}>{field.toUpperCase()}</Text>
          <TextInput
            style={styles.input}
            value={state[field]}
            onChangeText={(value) =>
              dispatch({ type: "UPDATE_FIELD", field, value })
            }
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
