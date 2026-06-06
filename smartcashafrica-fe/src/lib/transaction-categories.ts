export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Other',
] as const;

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Housing',
  'Utilities',
  'Shopping',
  'Health',
  'Entertainment',
  'Bills',
  'Education',
] as const;

export type IncomeCategory = (typeof INCOME_CATEGORIES)[number];
export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export const QUICK_AMOUNTS_ZERO_DECIMAL = [
  1000, 5000, 10000, 25000, 50000,
] as const;

export const QUICK_AMOUNTS_DECIMAL = [10, 50, 100, 500, 1000] as const;
