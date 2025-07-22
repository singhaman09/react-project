import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { CartState, Product } from "../types";

// Load cart from localStorage
const loadCart = (): CartState => {
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : { items: [] };
  } catch {
    return { items: [] };
  }
};

// Create slice
const cartSlice = createSlice({
  name: "cart",
  initialState: loadCart(),
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          quantity: 1,
          product,
        });
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.quantity = Math.max(1, quantity);
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
