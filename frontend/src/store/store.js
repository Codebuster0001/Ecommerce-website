import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productsSlice';
import cartReducer from '../features/cartSlice';
import { saveState } from "../utils/localStorage";
import checkoutReducer from '../features/checkoutSlice';
import authReducer from '../features/authSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    auth: authReducer,
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
