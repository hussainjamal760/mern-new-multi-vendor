// frontend/src/redux/reducers/product.js - COMPLETE FIXED VERSION
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  product: null,
  products: [],
  success: false,
  error: null,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    // create product
    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
      state.success = false;
      state.error = null;
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
      state.error = null;
    })
    .addCase("productCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
      state.product = null;
    })

    // ✅ ADD: Get all products for shop
    .addCase("getAllProductsShopRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("getAllProductsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.error = null;
    })
    .addCase("getAllProductsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.products = [];
    })

    // ✅ ADD: Delete product
    .addCase("deleteProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteProductSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
    })
    .addCase("deleteProductFailed", (state, action) => {
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

// ✅ FIXED getAllProductsShop Action
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });
    
    console.log('🔍 Fetching products for shop:', id);
    
    const { data } = await axios.get(`${server}/product/get-all-products-shop/${id}`, {
      withCredentials: true,
    });

    console.log('📦 Products response:', data);

    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products, // ✅ FIXED: Use data.products
    });

  } catch (error) {
    console.error('❌ Get products error:', error);
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response?.data?.message || 'Failed to fetch products'
    });
  }
};