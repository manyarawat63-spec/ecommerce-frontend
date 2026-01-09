// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice";

// Load saved cart state
const loadState = () => {
  try {
    const saved = localStorage.getItem("reduxState");
    if (saved === null) return undefined;
    return JSON.parse(saved);
  } catch {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem("reduxState", JSON.stringify(state));
  } catch (err) {
    console.log(err);
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    cart: cartReducer,  // ✅ ONLY CART HERE
  },
  preloadedState,
});


store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
  });
});
