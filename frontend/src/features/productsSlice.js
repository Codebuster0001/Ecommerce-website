import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import products from '../data/products'; // Make sure the path is correct

// Async thunk to fetch a single product by ID
export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const product = products.find((p) => p._id === String(id));
    if (!product) throw new Error('Product not found');
    await new Promise((resolve) => setTimeout(resolve, 300)); // simulate delay
    return product;
  }
);

// Product slice
const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearProduct: (state) => {
      state.product = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Selectors
export const selectProduct = (state) => state.product.product;
export const selectProductStatus = (state) => state.product.status;
export const selectProductError = (state) => state.product.error;

// Export actions and reducer
export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
