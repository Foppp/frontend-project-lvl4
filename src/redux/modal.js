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
  reducers: {},
});

export const { } = modal.actions;
export default modal.reducer;