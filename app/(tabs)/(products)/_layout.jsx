import { Stack } from "expo-router";

export default function ProductsLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="laptops" options={{ title: "laptops" }} />
      <Stack.Screen name="phones" options={{ title: "phones" }} />
    </Stack>
  );
}
