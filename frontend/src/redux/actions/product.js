// frontend/src/redux/actions/product.js - FIXED VERSION
import axios from "axios";
import { server } from "../../server";

export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",
    });

    console.log("🚀 Redux: Creating product...");

    const config = { 
      headers: { 
        "Content-Type": "multipart/form-data" 
      },
      withCredentials: true // ✅ Add credentials for auth
    };

    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm, 
      config
    );

    console.log("✅ Redux: Product created successfully:", data);

    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });

    return data; // ✅ Return data for component to use

  } catch (error) {
    console.error("❌ Redux: Product creation failed:", error);
    
    let errorMessage = "Product creation failed";
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.response?.status === 401) {
      errorMessage = "Please login to create products";
    } else if (error.response?.status === 400) {
      errorMessage = error.response.data?.message || "Invalid product data";
    } else if (error.message) {
      errorMessage = error.message;
    }

    dispatch({
      type: "productCreateFail",
      payload: errorMessage,
    });
  }
};

// ✅ ADD: Clear errors action
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: "clearErrors",
  });
};