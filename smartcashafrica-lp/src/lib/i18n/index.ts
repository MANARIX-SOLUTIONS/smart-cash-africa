import { en, type Messages } from "./en";
import { fr } from "./fr";
import type { Locale, TranslationParams } from "./types";

const catalogs: Record<Locale, Messages> = { en, fr };

const STORAGE_KEY = "smartcashafrica-lp-locale";

function getNestedValue(
  obj: Record<string, unknown>,
  path: string,
): string | undefined {
  const parts = path.split(".");
  let current: unknown = obj;

  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === "string" ? current : undefined;
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

export function getStoredLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "fr") return stored;

  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith("fr") ? "fr" : "en";
}

export function storeLocale(locale: Locale): void {
  localStorage.setItem(STORAGE_KEY, locale);
}

export function getIntlLocale(locale: Locale): string {
  return locale === "fr" ? "fr-FR" : "en-GB";
}

export { en, fr };
export type { Locale, Messages };
