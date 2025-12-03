import { useQuery } from "@tanstack/react-query";
import { api } from "../axios";

// Fetch all phones
const getPhones = async () => {
  const res = await api.get("/products?type=phone");
  return res.data;
};

// Hook for the list
export const usePhones = () => {
  return useQuery({
    queryKey: ["phones"],
    queryFn: getPhones,
  });
};

// Hook for a single phone by id (from cached list)
export const usePhone = (id) => {
  return useQuery({
    queryKey: ["phone", id],
    queryFn: async () => {
      const res = await api.get("/products?type=phone"); // fetch full list
      const phone = res.data.find((p) => p._id === id);
      if (!phone) throw new Error("Phone not found");
      return phone;
    },
    enabled: !!id,
  });
};
