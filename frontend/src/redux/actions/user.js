// frontend/src/redux/actions/user.js
import axios from 'axios';
import { server } from '../../server.js';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: 'LoadUserRequest',
    });
    
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    
    dispatch({
      type: 'LoadUserSuccess',
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: 'LoadUserFail',
      payload: error.response?.data?.message || 'Failed to load user',
    });
  }
};

// Load Seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: 'LoadSellerRequest',
    });
    
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });
    
    dispatch({
      type: 'LoadSellerSuccess',
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: 'LoadSellerFail',
      payload: error.response?.data?.message || 'Failed to load seller',
    });
  }
};

// Login User
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'LoginRequest',
    });

    const { data } = await axios.post(
      `${server}/user/login-user`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: 'LoginSuccess',
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: 'LoginFail',
      payload: error.response?.data?.message || 'Login failed',
    });
  }
};

// Login Seller
export const loginSeller = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'LoginSellerRequest',
    });

    const { data } = await axios.post(
      `${server}/shop/login-shop`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: 'LoginSellerSuccess',
      payload: data.user, // Note: backend returns user, not seller
    });
    
    return data; // Return data for component to use
  } catch (error) {
    dispatch({
      type: 'LoginSellerFail',
      payload: error.response?.data?.message || 'Seller login failed',
    });
    throw error; // Re-throw for component error handling
  }
};

// Logout User
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get(`${server}/user/logout`, {
      withCredentials: true,
    });

    dispatch({
      type: 'LogoutSuccess',
    });
  } catch (error) {
    dispatch({
      type: 'LogoutFail',
      payload: error.response?.data?.message || 'Logout failed',
    });
  }
};

// Logout Seller
export const logoutSeller = () => async (dispatch) => {
  try {
    await axios.get(`${server}/shop/logout`, {
      withCredentials: true,
    });

    dispatch({
      type: 'LogoutSellerSuccess',
    });
  } catch (error) {
    dispatch({
      type: 'LogoutSellerFail',
      payload: error.response?.data?.message || 'Seller logout failed',
    });
  }
};