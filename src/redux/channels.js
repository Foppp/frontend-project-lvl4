/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

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
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannel: (state, action) => {
      state.channels = [...state.channels, action.payload];
    },
    removeChannel: (state, action) => {
      state.channels = state.channels.filter((ch) => ch.id !== action.payload.id);
    },
    renameChannel: (state, action) => {
      const newName = action.payload.name;
      state.channels = state.channels.map((ch) => ((ch.id === action.payload.id)
        ? ({ ...ch, name: newName }) : ch), []);
    },
  },
});

export const {
  setInitialState,
  setCurrentChannel,
  addChannel,
  removeChannel,
  renameChannel,
} = channelsInfo.actions;

export default channelsInfo.reducer;
