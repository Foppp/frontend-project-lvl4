import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import _ from 'lodash';

// const getUserId = () => JSON.parse(localStorage.getItem('userId'));

// const getAuthHeader = () => {
//   const userId = getUserId();
//   const auth = userId && userId.token ? { Authorization: `Bearer ${userId.token}` } : {};
//   return auth;
// };

// export const fetchChatData = () => (dispatch) => {
//   const headers = getAuthHeader();
//   axios.get('/api/v1/data', { headers })
//     .then((response) => {
//       dispatch(setInitialState(response.data))
//     })
//     .catch((err) => err)
// };

export const channelsInfo = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    setInitialState: (state, action) => {
    state.channels = action.payload.channels;
    state.currentChannelId = action.payload.currentChannelId;
  },
  }
});

export const { setInitialState } = channelsInfo.actions;
export default channelsInfo.reducer;