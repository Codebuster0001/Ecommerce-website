// src/features/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../utils/localStorage";

const persistedCart = loadState("cart"); // pass key "cart"

const initialState = persistedCart || {
  cartItems: [],
  totalQuantity: 0,
};

const getItemKey = (item) => `${item.id}-${item.size}-${item.color}`;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const newKey = getItemKey(newItem);
      const existingItem = state.cartItems.find(
        (item) => getItemKey(item) === newKey
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.cartItems.push({ ...newItem });
      }

      state.totalQuantity = state.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },

    decreaseQuantity: (state, action) => {
      const keyToMatch = action.payload;
      const item = state.cartItems.find((item) => getItemKey(item) === keyToMatch);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => getItemKey(item) !== keyToMatch
          );
        }
      }

      state.totalQuantity = state.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },

    removeFromCart: (state, action) => {
      const keyToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => getItemKey(item) !== keyToRemove
      );

      state.totalQuantity = state.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },

    resetCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, decreaseQuantity, removeFromCart, resetCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartCount = (state) => state.cart.totalQuantity;
export const selectCartTotal = (state) =>
  state.cart.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export default cartSlice.reducer;
