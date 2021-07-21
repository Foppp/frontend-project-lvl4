// import { createSlice } from "@reduxjs/toolkit";
// import { setInitialState } from "./channels.js";
// import axios from 'axios';

export const getUserId = () => JSON.parse(localStorage.getItem('userId'));

export const getAuthHeader = () => {
  const userId = getUserId();
  const auth = userId && userId.token ? { Authorization: `Bearer ${userId.token}` } : {};
  return auth;
};

