import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Yup from 'yup';
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
  },
    Yup.setLocale({
      mixed: {
        default: i18n.t('errors.unknown'),
        required: i18n.t('errors.required'),
        oneOf: () => i18n.t('errors.passMatch'),
        notOneOf: () => i18n.t('errors.channelExist')
      },
      string: {
        min: ({ path }) => path === 'password' ? i18n.t('errors.minCharactersPass'): i18n.t('errors.minCharacters'),
        max: () => i18n.t('errors.maxCharacters'),
      },
    }),
  );
export default i18n;
