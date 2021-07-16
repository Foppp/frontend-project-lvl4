import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import _ from 'lodash';
import { setInitialState } from "./channels.js";

export const messagesInfo = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  extraReducers: {
    [setInitialState]: (state, action) => {
      state.messages = action.payload.messages;
  },
  }
});

export default messagesInfo.reducer;