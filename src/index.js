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
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import * as Yup from 'yup';
import resources from './locales/index.js';




const init = () => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }
  const i18n = i18next.createInstance();

i18n
  .use(initReactI18next)
  .init({
    resources: resources,
    lng: "ru",
    debug: false,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  }).then(() => {
    Yup.setLocale({
      mixed: {
        default: i18n.t('errors.unknown'),
        required: i18n.t('errors.required'),
        oneOf: () => i18n.t('errors.passMatch'),
        notOneOf: () => i18n.t('errors.channelExist')
      },
      string: {
        min: ({ path }) => path === 'password' ? i18n.t('errors.minCharactersPass') : i18n.t('errors.minCharacters'),
        max: () => i18n.t('errors.maxCharacters'),
      },
    });
      const vdom = (
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </Provider>
  );
  if (document.getElementById('chat')) {
    render(vdom, document.getElementById('chat'))
  }
  return vdom;
  }).catch((e) => e);
};
init();
export default init;
