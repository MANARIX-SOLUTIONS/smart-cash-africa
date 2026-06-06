import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency = 'FCFA',
  intlLocale = 'fr-FR',
): string {
  return (
    new Intl.NumberFormat(intlLocale, {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(amount) + ` ${currency}`
  );
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
