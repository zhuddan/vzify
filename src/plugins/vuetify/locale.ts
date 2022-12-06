import type { LocaleMessages, VuetifyOptions } from 'vuetify';
import { en, ja, zhHans } from 'vuetify/locale';

export interface LocaleItem {
  name: string;
  key: string;
  locale: LocaleMessages;
}
export const locales: LocaleItem [] = [
  {
    name: 'English',
    key: 'en',
    locale: en,
  },
  {
    name: '日本語',
    key: 'ja',
    locale: ja,
  },
  {
    name: '简体中文',
    key: 'zhHans',
    locale: zhHans,
  },
];

const messages: LocaleMessages = {};

locales.forEach(({ locale, key }) => {
  messages[key] = locale;
});

export const locale: VuetifyOptions['locale'] = {
  locale: 'zhHans',
  fallback: 'en',
  messages,
};