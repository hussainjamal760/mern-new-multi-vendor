// frontend/src/redux/reducers/coupon.js
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  coupons: [],
  error: null,
  success: false,
  message: null,
};

export const couponReducer = createReducer(initialState, (builder) => {
  builder
    // Get all coupons for shop
    .addCase("getAllCouponsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllCouponsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.coupons = action.payload;
      state.error = null;
    })
    .addCase("getAllCouponsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.coupons = [];
    })
    
    // Delete coupon
    .addCase("deleteCouponRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteCouponSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.success = true;
      state.error = null;
    })
    .addCase("deleteCouponFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    
    // Clear errors and messages
    .addCase("clearErrors", (state) => {
      state.error = null;
      state.message = null;
      state.success = false;
    })
    
    // Clear messages only
    .addCase("clearMessages", (state) => {
      state.message = null;
      state.success = false;
    });
});