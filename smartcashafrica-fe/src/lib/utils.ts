import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import {
  DEFAULT_CURRENCY,
  formatCurrencyAmount,
  getCurrencyDefinition,
} from './currencies';

/** @deprecated Prefer useTranslation().formatMoney() */
export function formatCurrency(
  amount: number,
  currencyCode = DEFAULT_CURRENCY,
  intlLocale = 'fr-FR',
): string {
  const definition = getCurrencyDefinition(currencyCode);
  return formatCurrencyAmount(amount, definition, intlLocale);
}

export function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

/** @deprecated Use useTranslation().greeting() instead */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
