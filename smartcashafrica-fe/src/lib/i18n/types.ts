export type Locale = 'en' | 'fr' | 'wo';

export type TranslationParams = Record<string, string | number | undefined>;

export type NestedMessages = {
  [key: string]: string | NestedMessages;
};
