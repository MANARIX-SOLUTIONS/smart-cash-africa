import type { Locale } from './types';

const SENEGAL_COUNTRY_NAMES = new Set(['senegal', 'sénégal', 'sn']);

export function isSenegalCountry(country?: string): boolean {
  if (!country?.trim()) return false;
  return SENEGAL_COUNTRY_NAMES.has(country.trim().toLowerCase());
}

export function isSenegalPhone(phone?: string): boolean {
  if (!phone?.trim()) return false;
  const digits = phone.replace(/\D/g, '');
  return digits.startsWith('221');
}

export function isSenegalTimezone(): boolean {
  if (typeof Intl === 'undefined') return false;
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone === 'Africa/Dakar';
  } catch {
    return false;
  }
}

export function isSenegalBrowserRegion(): boolean {
  if (typeof navigator === 'undefined') return false;

  const langs = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  return langs.some((lang) => {
    const normalized = lang.toLowerCase();
    return normalized.endsWith('-sn') || normalized.startsWith('wo');
  });
}

export function isSenegaleseUser(profile?: {
  country?: string;
  phone?: string;
}): boolean {
  return (
    isSenegalCountry(profile?.country) ||
    isSenegalPhone(profile?.phone) ||
    isSenegalTimezone() ||
    isSenegalBrowserRegion()
  );
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

export function detectDefaultLocale(profile?: {
  country?: string;
  phone?: string;
}): Locale {
  if (typeof navigator !== 'undefined') {
    const langs = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];

    for (const lang of langs) {
      const code = lang.toLowerCase().split('-')[0];
      if (code === 'wo') return 'wo';
    }
  }

  if (isSenegaleseUser(profile)) return 'wo';

  return detectBrowserLocale();
}

export function localeOrderForUser(profile?: {
  country?: string;
  phone?: string;
}): Locale[] {
  if (isSenegaleseUser(profile)) {
    return ['wo', 'fr', 'en'];
  }
  return ['fr', 'en', 'wo'];
}
