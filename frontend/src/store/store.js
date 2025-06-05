import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productsSlice';
import cartReducer from '../features/cartSlice';
import { saveState } from "../utils/localStorage";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveState({
    cartItems: state.cart.cartItems,
    totalQuantity: state.cart.totalQuantity,
  });
});


export default store;
