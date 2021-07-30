import axios from 'axios';
import { setInitialState } from './channels.js';

export const getUserId = () => JSON.parse(localStorage.getItem('userId'));

export const getAuthHeader = () => {
  const userId = getUserId();
  const auth = userId && userId.token ? { Authorization: `Bearer ${userId.token}` } : {};
  return auth;
};

export const fetchChatData = () => async (dispatch) => {
  const headers = getAuthHeader();
  axios.get('/api/v1/data', { headers }).then((response) => {
    dispatch(setInitialState(response.data));
  }).catch((err) => err);
};
