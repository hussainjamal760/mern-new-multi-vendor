// frontend/src/redux/actions/coupon.js
import axios from "axios";
import { server } from "../../server";

// Get all coupons for a shop
 export const getAllCouponsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllCouponsShopRequest",
    });

    const { data } = await axios.get(`${server}/copoun/get-coupon/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllCouponsShopSuccess",
      payload: data.couponCodes,
    });
  } catch (error) {
    dispatch({
      type: "getAllCouponsShopFailed",
      payload: error.response?.data?.message || "Failed to fetch coupons",
    });
  }
};

// Delete coupon
export const deleteCoupon = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCouponRequest",
    });

    const { data } = await axios.delete(`${server}/copoun/delete-coupon/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "deleteCouponSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCouponFailed",
      payload: error.response?.data?.message || "Failed to delete coupon",
    });
  }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: "clearErrors",
  });
};