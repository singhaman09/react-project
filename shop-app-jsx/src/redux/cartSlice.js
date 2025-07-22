// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) {
        exists.qty += 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.qty = action.payload.qty;
    },
  },
});

export const { addToCart, removeFromCart, updateQty } = cartSlice.actions;
export default cartSlice.reducer;
