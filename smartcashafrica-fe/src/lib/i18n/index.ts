import { en, type Messages } from './en';
import { fr } from './fr';
import { LOCALE_CONFIG } from './locales';
import { wo } from './wo';
import type { Locale, TranslationParams } from './types';

const catalogs: Record<Locale, Messages> = { en, fr, wo };

function getNestedValue(
  obj: Record<string, unknown>,
  path: string,
): string | undefined {
  const parts = path.split('.');
  let current: unknown = obj;

  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === 'string' ? current : undefined;
}

function interpolate(template: string, params?: TranslationParams): string {
  if (!params) return template;

  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = params[key];
    return value === undefined ? `{${key}}` : String(value);
  });
}

export function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return 'fr';

  const langs = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const lang of langs) {
    const code = lang.toLowerCase().split('-')[0];
    if (code === 'wo') return 'wo';
    if (code === 'fr') return 'fr';
    if (code === 'en') return 'en';
  }

  return 'fr';
}

export function pluralize(
  locale: Locale,
  count: number,
  forms: { one: string; other: string },
): string {
  if (locale === 'en') {
    return count === 1 ? forms.one : forms.other;
  }
  if (locale === 'fr') {
    return count <= 1 ? forms.one : forms.other;
  }
  return count === 1 ? forms.one : forms.other;
}

export function translate(
  locale: Locale,
  key: string,
  params?: TranslationParams,
): string {
  const dict = catalogs[locale] ?? catalogs.en;
  const value =
    getNestedValue(dict as Record<string, unknown>, key) ??
    getNestedValue(catalogs.en as Record<string, unknown>, key);

  if (!value) return key;
  return interpolate(value, params);
}

export function getIntlLocale(locale: Locale): string {
  return LOCALE_CONFIG[locale]?.intlLocale ?? 'fr-FR';
}

export function getGreetingKey(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'greeting.morning';
  if (hour < 17) return 'greeting.afternoon';
  return 'greeting.evening';
}

export function formatLocalizedDate(
  intlLocale: string,
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  },
): string {
  const value = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(intlLocale, options).format(value);
}

export function formatLocalizedNumber(
  intlLocale: string,
  value: number,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(intlLocale, options).format(value);
}

export { LOCALE_CONFIG, LOCALE_ORDER } from './locales';
export { en, fr, wo };
export type { Messages } from './en';
export type { Locale, TranslationParams } from './types';
