// @ts-check
import '../assets/application.scss';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Provider as ProviderRoll, ErrorBoundary } from '@rollbar/react'
import store from './redux/store.js'
import App from './App.jsx';

const rollbarConfig = {
  accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
  environment: 'production',
};

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
render(
  <Provider store={store}>
    <ProviderRoll config={rollbarConfig}>
      <App />
      </ProviderRoll>
  </Provider>,
  document.getElementById('chat'),
);

