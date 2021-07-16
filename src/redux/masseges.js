import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import _ from 'lodash';
import { setInitialState } from "./channels.js";

export const messagesInfo = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    }
  },
  extraReducers: {
    [setInitialState]: (state, action) => {
      state.messages = action.payload.messages;
  },
  }
});

export const { addMessage } = messagesInfo.actions;
export default messagesInfo.reducer;