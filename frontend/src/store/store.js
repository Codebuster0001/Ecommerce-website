import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productsSlice';
import cartReducer from '../features/cartSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
});

export default store;
