// frontend/src/redux/reducers/seller.js - FIXED DEBUG VERSION
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
      console.log("🔄 LoadSellerRequest - Setting loading to true");
      state.isLoading = true;
    })
    .addCase('LoadSellerSuccess', (state, action) => {
      console.log("✅ LoadSellerSuccess - Payload:", action.payload);
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
      state.error = null;
    })
    .addCase('LoadSellerFail', (state, action) => {
      console.log("❌ LoadSellerFail - Error:", action.payload);
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
      state.seller = null;
    })
    
    // Login Seller Cases
    .addCase('LoginSellerRequest', (state) => {
      console.log("🔄 LoginSellerRequest - Setting loading to true");
      state.isLoading = true;
    })
    .addCase('LoginSellerSuccess', (state, action) => {
      console.log("✅ LoginSellerSuccess - Payload:", action.payload);
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
      state.error = null;
    })
    .addCase('LoginSellerFail', (state, action) => {
      console.log("❌ LoginSellerFail - Error:", action.payload);
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
      state.seller = null;
    })
    
    // Logout Seller
    .addCase('LogoutSellerSuccess', (state) => {
      console.log("✅ LogoutSellerSuccess");
      state.isLoading = false;
      state.error = null;
      state.isSeller = false;
      state.seller = null;
    })
    .addCase('LogoutSellerFail', (state, action) => {
      console.log("❌ LogoutSellerFail - Error:", action.payload);
      state.isLoading = false;
      state.error = action.payload;
    })
    
    // Clear Errors
    .addCase('clearErrors', (state) => {
      console.log("🧹 Clearing seller errors");
      state.error = null;
    });
});