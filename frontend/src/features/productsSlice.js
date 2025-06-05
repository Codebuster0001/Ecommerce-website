// src/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsData from "../data/products";

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const productsArray = Array.isArray(productsData.products)
      ? productsData.products
      : Object.values(productsData.products || {});

    const product = productsArray.find((p) => p._id === String(id));
    if (!product) throw new Error(`Product not found with id: ${id}`);

    await new Promise((resolve) => setTimeout(resolve, 300)); // simulate delay
    return product;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearProduct: (state) => {
      state.product = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;

export const selectProduct = (state) => state.product.product;
export const selectProductStatus = (state) => state.product.status;
export const selectProductError = (state) => state.product.error;
