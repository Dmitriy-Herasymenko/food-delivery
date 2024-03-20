import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import messagesnTranslation from '../pages/messages/translation.json';


function setupI18n() {
  const selectedLanguage = localStorage.getItem('lang') ?? 'ua';
  const resources = {
    ua: {
      translation: {
        messages: { ...messagesnTranslation.ua },
      },
    },
    en: {
      translation: {
        messages: { ...messagesnTranslation.en },
      },
    },
  };

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: selectedLanguage,
      fallbackLng: selectedLanguage,
      interpolation: {
        escapeValue: false,
      },
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log('An error occurred:', error);
    });
}

setupI18n();

export default i18n;
