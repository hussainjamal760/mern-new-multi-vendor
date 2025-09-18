// frontend/src/redux/reducers/seller.js
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,
  isLoading: true,
  seller: null,
  error: null,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    // Load Seller Cases
    .addCase('LoadSellerRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('LoadSellerSuccess', (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
      state.error = null;
    })
    .addCase('LoadSellerFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
      state.seller = null;
    })
    
    // Login Seller Cases
    .addCase('LoginSellerRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('LoginSellerSuccess', (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
      state.error = null;
    })
    .addCase('LoginSellerFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })
    
    // Logout Seller
    .addCase('LogoutSellerSuccess', (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSeller = false;
      state.seller = null;
    })
    .addCase('LogoutSellerFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    
    // Clear Errors
    .addCase('clearErrors', (state) => {
      state.error = null;
    });
});