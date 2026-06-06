import type { AccountType } from '@/types/finance';

const ACCOUNT_COLORS = [
  '#00A86B',
  '#2563EB',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#22C55E',
  '#0F172A',
  '#64748B',
  '#EC4899',
  '#14B8A6',
];

export const ACCOUNT_TYPES: AccountType[] = [
  'Mobile Money',
  'Savings Account',
  'Current Account',
  'Physical Cash',
  'Savings',
];

export function getAccountInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return 'AC';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function getAccountColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return ACCOUNT_COLORS[Math.abs(hash) % ACCOUNT_COLORS.length];
}
