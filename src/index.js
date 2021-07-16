// @ts-check
import '../assets/application.scss';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import store from './redux/store.js'
import App from './App.jsx';
import { fetchChatData } from './redux/user.js';

// store.dispatch(fetchChatData());
if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

  render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);

