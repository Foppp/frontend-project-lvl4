/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { setInitialState, removeChannel } from './channels.js';

export const messagesInfo = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
  extraReducers: {
    [setInitialState]: (state, action) => {
      state.messages = action.payload.messages;
    },
    [removeChannel]: (state, action) => {
      state.messages = state.messages.filter((m) => m.channelId !== action.payload.id);
    },
  },
});

export const { addMessage } = messagesInfo.actions;

export default messagesInfo.reducer;
