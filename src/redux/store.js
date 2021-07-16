import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import channelsInfo from "./channels.js";
import messagesInfo from "./masseges.js";
import modal from "./modal.js";
export default configureStore({
  reducer: {
    channelsInfo,
    messagesInfo,
    modal,
  },
  middleware: getDefaultMiddleware(),
  devTools: true,
});
