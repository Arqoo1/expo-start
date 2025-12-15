import { useEffect } from "react";
import { api } from "../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BaseInterceptor = () => {
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(async (config) => {
      config.headers["Content-Type"] = "application/json";
      const token = await AsyncStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return null;
};

export default BaseInterceptor;
