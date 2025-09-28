// frontend/src/redux/actions/event.js - FIXED VERSION
import axios from "axios";
import { server } from "../../server";

export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });


    const config = { 
      headers: { 
        "Content-Type": "multipart/form-data" 
      },
      withCredentials: true // ✅ Add credentials for auth
    };

    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm, 
      config
    );


    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });

    return data; // ✅ Return data for component to use

  } catch (error) {
    
    let errorMessage = "event creation failed";
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.response?.status === 401) {
      errorMessage = "Please login to create events";
    } else if (error.response?.status === 400) {
      errorMessage = error.response.data?.message || "Invalid event data";
    } else if (error.message) {
      errorMessage = error.message;
    }

    dispatch({
      type: "eventCreateFail",
      payload: errorMessage,
    });
  }
};

// ✅ IMPROVED: Clear all event states
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: "clearErrors",
  });
};

// frontend/src/redux/actions/event.js - FIXED getAlleventsShop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsShopRequest",
    });
    
    
    const { data } = await axios.get(`${server}/event/get-all-events-shop/${id}`, {
      withCredentials: true, // Add this for authentication
    });


    dispatch({
      type: "getAllEventsShopSuccess",
      payload: data.events, // ✅ FIXED: Use data.events, not data.event
    });

  } catch (error) {
    dispatch({
      type: "getAllEventsShopFailed",
      payload: error.response?.data?.message || 'Failed to fetch events'
    });
  }
};
