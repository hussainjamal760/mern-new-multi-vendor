// frontend/src/redux/reducers/product.js - FIXED VERSION
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  product: null,
  products: [],
  success: false,
  error: null,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    // create product
    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
      state.success = false; // ✅ Reset success state
      state.error = null;   // ✅ Reset error state
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
      state.error = null;
    })
    .addCase("productCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
      state.product = null;
    })

    // ✅ FIXED: Clear all states properly
    .addCase("clearErrors", (state) => {
      state.error = null;
      state.success = false; // ✅ Also clear success state
      state.isLoading = false;
    });
});