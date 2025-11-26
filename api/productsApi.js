import axios from "axios";

const API_URL = "http://192.168.100.11:4000";

export const getProducts = async (type) => {
  try {
    const res = await axios.get(type ? `${API_URL}/products?type=${type}` : `${API_URL}/products`);
    return res.data;
  } catch (err) {
    throw new Error("Failed to fetch products");
  }
};
