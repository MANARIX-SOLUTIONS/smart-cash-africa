import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useAppData } from "@/context/AppDataContext";
import {
  getGreetingKey,
  getIntlLocale,
  translate,
  type Locale,
} from "@/lib/i18n";
import type { TranslationParams } from "@/lib/i18n/types";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: TranslationParams) => string;
  greeting: () => string;
  intlLocale: string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function isLocale(value: string): value is Locale {
  return value === "en" || value === "fr" || value === "wo";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { preferences, updatePreferences } = useAppData();
  const locale = isLocale(preferences.language) ? preferences.language : "fr";

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      updatePreferences({ language: next });
    },
    [updatePreferences],
  );

  const t = useCallback(
    (key: string, params?: TranslationParams) => translate(locale, key, params),
    [locale],
  );

  const greeting = useCallback(() => t(getGreetingKey()), [t]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      greeting,
      intlLocale: getIntlLocale(locale),
    }),
    [locale, setLocale, t, greeting],
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
