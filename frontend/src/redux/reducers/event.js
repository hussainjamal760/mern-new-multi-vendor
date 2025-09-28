// frontend/src/redux/reducers/event.js - FIXED VERSION
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false, // Changed from true to false
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
    
    // Get all events for shop - FIXED ACTION NAMES
    .addCase("getAllEventsRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("getAllEventsSuccess", (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
      state.error = null;
    })
    .addCase("getAllEventsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.events = [];
    })
    
    // Delete event - ADDED
    .addCase("deleteEventRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteEventSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
    })
    .addCase("deleteEventFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    
    // Clear errors and reset success state
    .addCase("clearErrors", (state) => {
      state.error = null;
      state.success = false; // Also reset success state
      state.isLoading = false;
    });
});