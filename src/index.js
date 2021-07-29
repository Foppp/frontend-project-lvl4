// @ts-check
import '../assets/application.scss';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import store from './redux/store.js'
import App from './App.jsx';


const init = () => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }
  const vdom = (
    <Provider store={store}>
      <App />
    </Provider>
  );
  if (document.getElementById('chat')) {
    render(vdom, document.getElementById('chat'))
  }
  return vdom;
};
init()
export default init;
