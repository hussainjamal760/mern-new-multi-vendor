// frontend/src/redux/actions/product.js - FIXED VERSION
import axios from "axios";
import { server } from "../../server";

export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",
    });


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


    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });

    return data; // ✅ Return data for component to use

  } catch (error) {
    
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

// ✅ IMPROVED: Clear all product states
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: "clearErrors",
  });
};

export const getAllProductsShop = (id) =>async (dispatch)=>{
  try {
    dispatch({
      type:"getAllProductsShopRequest",
    })
    const {data} = await axios.get(`${server}/product/get-all-products-shop/${id}`)

     dispatch({
      type:"getAllProductsShopSuccess",
      payload:data.product,
    })

  } catch (error) {
    dispatch({
      type:"getAllProductsShopFailed",
      payload:error.response.data.message
    })
  }
}

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};