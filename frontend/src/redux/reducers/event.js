// frontend/src/redux/reducers/event.js
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  success: false,
  error: null,
  event: null,
  events: [],
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    // Event create
    .addCase("eventCreateRequest", (state) => {
      state.isLoading = true;
      state.success = false;
      state.error = null;
    })
    .addCase("eventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.event = action.payload;
      state.error = null;
    })
    .addCase("eventCreateFail", (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
    })
    
    // Clear errors and reset success state
    .addCase("clearErrors", (state) => {
      state.error = null;
      state.success = false; // ✅ Also reset success state
    });
});