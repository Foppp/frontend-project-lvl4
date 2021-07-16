import { createSlice } from "@reduxjs/toolkit";
import { setInitialState } from "./channels.js";
import axios from 'axios';

export const getUserId = () => JSON.parse(localStorage.getItem('userId'));

const getAuthHeader = () => {
  const userId = getUserId();
  const auth = userId && userId.token ? { Authorization: `Bearer ${userId.token}` } : {};
  return auth;
};

export const fetchChatData = () => (dispatch) => {
  const headers = getAuthHeader();
  axios.get('/api/v1/data', { headers })
    .then((response) => {
      dispatch(setInitialState(response.data))
    })
    .catch((err) => err)
};
