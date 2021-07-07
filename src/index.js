// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { render } from 'react-dom';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
import App from './App.jsx';

// const EXTENSION = window.__REDUX_DEVTOOLS_EXTENSION__;
// const store = createStore(reducers, EXTENSION && EXTENSION());

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
render(
    <App />,
  document.getElementById('chat'),
);

