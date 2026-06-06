import type { Locale } from './types';

export interface LocaleConfig {
  code: Locale;
  flag: string;
  labelKey: string;
  nativeName: string;
  intlLocale: string;
}

export const LOCALE_CONFIG: Record<Locale, LocaleConfig> = {
  fr: {
    code: 'fr',
    flag: '🇫🇷',
    labelKey: 'settings.languages.fr',
    nativeName: 'Français',
    intlLocale: 'fr-FR',
  },
  en: {
    code: 'en',
    flag: '🇬🇧',
    labelKey: 'settings.languages.en',
    nativeName: 'English',
    intlLocale: 'en-GB',
  },
  wo: {
    code: 'wo',
    flag: '🇸🇳',
    labelKey: 'settings.languages.wo',
    nativeName: 'Wolof',
    intlLocale: 'fr-SN',
  },
};

export const LOCALE_ORDER: Locale[] = ['fr', 'en', 'wo'];
