import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
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
    },

    decreaseQuantity: (state, action) => {
      const keyToMatch = action.payload;
      const item = state.cartItems.find((item) => getItemKey(item) === keyToMatch);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Remove item if quantity is 1
          state.cartItems = state.cartItems.filter(
            (item) => getItemKey(item) !== keyToMatch
          );
        }
      }
    },

    removeFromCart: (state, action) => {
      const keyToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => getItemKey(item) !== keyToRemove
      );
    },
  },
});

export const { addToCart, decreaseQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartCount = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );