// @ts-check
import '../assets/application.scss';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import io from 'socket.io-client';
// import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
// import * as Yup from 'yup';
import App from './App.jsx';
import store from './redux/store.js';
import initLoclale from './utils/i18n.js';
// import resources from './locales/index.js';

const init = (socket) => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }
  const i18n = initLoclale();

  const vdom = (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App socket={socket} />
      </I18nextProvider>
    </Provider>
  );

  if (document.getElementById('chat')) {
    render(vdom, document.getElementById('chat'));
  }
  return vdom;
};

const userSocket = io();
init(userSocket);

export default init;
