import { useQuery } from "@tanstack/react-query";
import { api } from "../axios";

// Fetch all laptops
const getLaptops = async () => {
  const res = await api.get("/products?type=laptop");
  return res.data;
};

// Hook for the list
export const useLaptops = () => {
  return useQuery({
    queryKey: ["laptops"],
    queryFn: getLaptops,
  });
};

// Hook for a single laptop by id (from cached list)
export const useLaptop = (id) => {
  return useQuery({
    queryKey: ["laptop", id],
    queryFn: async () => {
      const res = await api.get("/products?type=laptop"); // fetch full list
      const laptop = res.data.find((l) => l._id === id);
      if (!laptop) throw new Error("Laptop not found");
      return laptop;
    },
    enabled: !!id,
  });
};
