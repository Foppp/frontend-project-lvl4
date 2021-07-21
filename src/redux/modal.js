import { createSlice } from "@reduxjs/toolkit";
import { addChannel, removeChannel, renameChannel } from "./channels.js";

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
      if (action.payload.type === 'removeChannel' || action.payload.type === 'renameChannel') {
        state.extra = { channelId: action.payload.channelId };
      }
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.extra = null;
    }
  },
  extraReducers: {
    [addChannel]: (state) => {
      state.isOpened = false;
      state.type = null;
      state.extra = null;
    },
    [removeChannel]: (state) => {
      state.isOpened = false;
      state.type = null;
      state.extra = null;
    },
    [renameChannel]: (state) => {
      state.isOpened = false;
      state.type = null;
      state.extra = null;
    }
  }
});

export const { openModal, closeModal } = modal.actions;
export default modal.reducer;