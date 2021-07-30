import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import channelsInfoReducer from './channels.js';
import messagesInfoReducer from './masseges.js';
import modal from './modal.js';

export default configureStore({
  reducer: {
    channelsInfoReducer,
    messagesInfoReducer,
    modal,
  },
  middleware: getDefaultMiddleware(),
  devTools: true,
});
