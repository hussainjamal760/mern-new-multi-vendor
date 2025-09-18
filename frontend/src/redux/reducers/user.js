// frontend/src/redux/reducers/user.js
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    // Load User Cases
    .addCase('LoadUserRequest', (state) => {
      state.loading = true;
    })
    .addCase('LoadUserSuccess', (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    })
    .addCase('LoadUserFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    })
    
    // Login User Cases
    .addCase('LoginUserRequest', (state) => {
      state.loading = true;
    })
    .addCase('LoginUserSuccess', (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    })
    .addCase('LoginUserFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    
    // Logout User
    .addCase('LogoutUserSuccess', (state) => {
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
      state.user = null;
    })
    .addCase('LogoutUserFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    
    // Clear Errors
    .addCase('clearErrors', (state) => {
      state.error = null;
    })
    
    // Clear Messages
    .addCase('clearMessages', (state) => {
      state.successMessage = null;
    });
});