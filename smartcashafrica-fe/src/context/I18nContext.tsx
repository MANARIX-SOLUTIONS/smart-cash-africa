import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useAppData } from "@/context/AppDataContext";
import {
  formatCurrencyAmount,
  getCurrencyDefinition,
  isCurrencyCode,
} from "@/lib/currencies";
import {
  formatLocalizedDate,
  formatLocalizedNumber,
  getGreetingKey,
  getIntlLocale,
  translate,
  type Locale,
} from "@/lib/i18n";
import type { TranslationParams } from "@/lib/i18n/types";

interface I18nContextValue {
  locale: Locale;
  currency: string;
  setLocale: (locale: Locale) => void;
  setCurrency: (currency: string) => void;
  t: (key: string, params?: TranslationParams) => string;
  greeting: () => string;
  intlLocale: string;
  formatDate: (
    date: Date | string,
    options?: Intl.DateTimeFormatOptions,
  ) => string;
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
  formatMoney: (amount: number) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function isLocale(value: string): value is Locale {
  return value === "en" || value === "fr" || value === "wo";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { preferences, updatePreferences } = useAppData();
  const locale = isLocale(preferences.language) ? preferences.language : "fr";
  const currency = isCurrencyCode(preferences.currency)
    ? preferences.currency
    : "XOF";

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      updatePreferences({ language: next });
    },
    [updatePreferences],
  );

  const setCurrency = useCallback(
    (next: string) => {
      if (!isCurrencyCode(next)) return;
      updatePreferences({ currency: next });
    },
    [updatePreferences],
  );

  const t = useCallback(
    (key: string, params?: TranslationParams) => translate(locale, key, params),
    [locale],
  );

  const greeting = useCallback(() => t(getGreetingKey()), [t]);
  const intlLocale = getIntlLocale(locale);
  const currencyDef = getCurrencyDefinition(currency);

  const formatDate = useCallback(
    (date: Date | string, options?: Intl.DateTimeFormatOptions) =>
      formatLocalizedDate(intlLocale, date, options),
    [intlLocale],
  );

  const formatNumber = useCallback(
    (value: number, options?: Intl.NumberFormatOptions) =>
      formatLocalizedNumber(intlLocale, value, options),
    [intlLocale],
  );

  const formatMoney = useCallback(
    (amount: number) => formatCurrencyAmount(amount, currencyDef, intlLocale),
    [currencyDef, intlLocale],
  );

  const value = useMemo(
    () => ({
      locale,
      currency,
      setLocale,
      setCurrency,
      t,
      greeting,
      intlLocale,
      formatDate,
      formatNumber,
      formatMoney,
    }),
    [
      locale,
      currency,
      setLocale,
      setCurrency,
      t,
      greeting,
      intlLocale,
      formatDate,
      formatNumber,
      formatMoney,
    ],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within I18nProvider");
  }
  return ctx;
}
