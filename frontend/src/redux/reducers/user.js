import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAutenticated: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAutenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAutenticated = false;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
