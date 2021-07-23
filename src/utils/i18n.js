import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '../locales/index.js';

const i18n = i18next.createInstance();

i18n
  .use(initReactI18next)
  .init({
    resources: resources,
    lng: "ru",
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
