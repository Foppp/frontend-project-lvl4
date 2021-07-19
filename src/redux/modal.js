import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import _ from 'lodash';

const modal = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    type: null,
    extra: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpened = true;
      state.type = action.payload.type;
      state.extra = { channelId: action.payload.channelId };
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.extra = null;
    }
  },
});

export const { openModal, closeModal } = modal.actions;
export default modal.reducer;