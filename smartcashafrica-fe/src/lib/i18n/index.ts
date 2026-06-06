import { en, type Messages } from './en';
import { fr } from './fr';
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
  switch (locale) {
    case 'fr':
      return 'fr-FR';
    case 'wo':
      return 'fr-SN';
    default:
      return 'en-GB';
  }
}

export function getGreetingKey(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'greeting.morning';
  if (hour < 17) return 'greeting.afternoon';
  return 'greeting.evening';
}

export { en, fr, wo };
export type { Locale, Messages };
