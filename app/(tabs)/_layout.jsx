import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2E186A",
        tabBarStyle: { backgroundColor: "#f5f5f5", paddingVertical: 6 },
      }}
    >
      <Tabs.Screen
        name="phones"
        options={{
          title: "Phones",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="phone-portrait-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="laptops"
        options={{
          title: "Laptops",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="laptop-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
