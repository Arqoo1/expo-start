import { useMutation } from "@tanstack/react-query";
import { api } from "../axios";

// REGISTER
const registerRequest = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerRequest,
  });
};

// LOGIN
const loginRequest = async (data) => {
  const res = await api.post("/auth/login", {
    email: data.email.trim(),
    password: data.password.trim(),
  });
  return res.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: async (data) => {
      try {
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
      } catch (e) {
        console.log("AsyncStorage error:", e);
      }
    },
  });
};