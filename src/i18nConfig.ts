import { Config } from 'next-i18n-router/dist/types';

const i18nConfig: Config = {
  locales: ['de', 'en'],
  defaultLocale: 'de',
  serverSetCookie: 'never',
  prefixDefault: true,
};

export default i18nConfig;
