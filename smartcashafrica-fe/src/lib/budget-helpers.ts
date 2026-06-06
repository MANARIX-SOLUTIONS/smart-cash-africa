import type { Budget, Transaction } from '@/types/finance';

export const BUDGET_CATEGORY_COLORS: Record<string, string> = {
  Food: '#00A86B',
  Transport: '#2563EB',
  Housing: '#0F172A',
  Utilities: '#F59E0B',
  Bills: '#F59E0B',
  Shopping: '#EF4444',
  Health: '#22C55E',
  Entertainment: '#8B5CF6',
  Education: '#6366F1',
};

export const ADDABLE_BUDGET_CATEGORIES = [
  'Food',
  'Transport',
  'Housing',
  'Utilities',
  'Bills',
  'Shopping',
  'Health',
  'Entertainment',
  'Education',
] as const;

export function computeBudgetSpent(
  transactions: Transaction[],
  category: string,
): number {
  return transactions
    .filter((tx) => tx.category === category && tx.amount < 0)
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
}

export function enrichBudget(
  budget: Budget,
  transactions: Transaction[],
): Budget & { spent: number } {
  return {
    ...budget,
    spent: computeBudgetSpent(transactions, budget.category),
  };
}

export function colorForCategory(category: string): string {
  return BUDGET_CATEGORY_COLORS[category] ?? '#64748B';
}
