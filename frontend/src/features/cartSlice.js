import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      // Always clone object to avoid shared reference bugs
      const existingItem = state.cartItems.find(
        item =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.cartItems.push({ ...newItem, quantity: newItem.quantity || 1 });
      }

      // Recalculate totals
      updateTotals(state);
    },

    decreaseQuantity: (state, action) => {
      const { id, size, color } = action.payload;
      const item = state.cartItems.find(
        item => item.id === id && item.size === size && item.color === color
      );

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            item => !(item.id === id && item.size === size && item.color === color)
          );
        }
      }

      // Recalculate totals
      updateTotals(state);
    },

    removeFromCart: (state, action) => {
      const { id, size, color } = action.payload;
      state.cartItems = state.cartItems.filter(
        item => !(item.id === id && item.size === size && item.color === color)
      );

      // Recalculate totals
      updateTotals(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

// Helper to update totals
const updateTotals = (state) => {
  state.totalQuantity = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  state.totalPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
};

export const {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
