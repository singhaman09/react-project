import axios from "axios";
import { Product } from "./types";

const API_URL = "https://fakestoreapi.com";

// Get all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
