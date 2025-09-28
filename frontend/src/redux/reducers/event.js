// frontend/src/redux/reducers/event.js - COMPLETE FIXED VERSION
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  event: null,
  events: [],
  success: false,
  error: null,
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    // create event
    .addCase("eventCreateRequest", (state) => {
      state.isLoading = true;
      state.success = false;
      state.error = null;
    })
    .addCase("eventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
      state.error = null;
    })
    .addCase("eventCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
      state.event = null;
    })

    .addCase("getAllEventsShopRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("getAllEventsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
      state.error = null;
    })
    .addCase("getAllEventsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.events = [];
    })

    // ✅ ADD: Delete event
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

    // Clear errors
    .addCase("clearErrors", (state) => {
      state.error = null;
      state.success = false;
      state.isLoading = false;
    });
});

// ✅ FIXED getAlleventsShop Action
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsShopRequest",
    });
    
    
    const { data } = await axios.get(`${server}/event/get-all-events-shop/${id}`, {
      withCredentials: true,
    });


    dispatch({
      type: "getAllEventsShopSuccess",
      payload: data.events, // ✅ FIXED: Use data.events
    });

  } catch (error) {
    dispatch({
      type: "getAllEventsShopFailed",
      payload: error.response?.data?.message || 'Failed to fetch events'
    });
  }
};