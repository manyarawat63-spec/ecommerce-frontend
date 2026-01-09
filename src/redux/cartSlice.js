// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {

    // ✅ Add item or increase if exists
    addToCart: (state, action) => {
      const existingItem = state.find(
        (item) => item._id === action.payload._id   // 🔥 FIX HERE
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    // ✅ Increase quantity
    increaseQuantity: (state, action) => {
      const item = state.find(
        (item) => item._id === action.payload._id   // 🔥 FIX
      );
      if (item) item.quantity += 1;
    },

    // ✅ Decrease or remove
    decreaseQuantity: (state, action) => {
      const index = state.findIndex(
        (item) => item._id === action.payload._id   // 🔥 FIX
      );

      if (index !== -1) {
        if (state[index].quantity > 1) {
          state[index].quantity -= 1;
        } else {
          state.splice(index, 1);
        }
      }
    },

    // ✅ Clear cart
    clearCart: () => [],
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
