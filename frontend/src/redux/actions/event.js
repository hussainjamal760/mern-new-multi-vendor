// frontend/src/redux/actions/event.js - COMPLETE FIXED VERSION
import axios from "axios";
import { server } from "../../server";

// Create Event
export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    console.log("🚀 Making request to:", `${server}/event/create-event`);
    
    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config
    );

    console.log("✅ Event created successfully:", data);

    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    console.error("❌ Event create error:", error.response?.data || error.message);
    dispatch({
      type: "eventCreateFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Get all events for a shop - COMPLETELY FIXED
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsRequest",
    });

    console.log("🔍 Fetching events for shop ID:", id);

    const { data } = await axios.get(
      `${server}/event/get-all-events-shop/${id}`,
      {
        withCredentials: true,
      }
    );

    console.log("🎉 Events fetched successfully:", data);

    dispatch({
      type: "getAllEventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    console.error("❌ Get events error:", error);
    dispatch({
      type: "getAllEventsFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete Event
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteEventRequest",
    });

    console.log("🗑️ Deleting event ID:", id);

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      {
        withCredentials: true,
      }
    );

    console.log("✅ Event deleted successfully:", data);

    dispatch({
      type: "deleteEventSuccess",
      payload: data.message,
    });
  } catch (error) {
    console.error("❌ Delete event error:", error);
    dispatch({
      type: "deleteEventFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Get all events (public)
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsRequest",
    });

    const { data } = await axios.get(`${server}/event/get-all-events`);

    dispatch({
      type: "getAllEventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: "clearErrors",
  });
};