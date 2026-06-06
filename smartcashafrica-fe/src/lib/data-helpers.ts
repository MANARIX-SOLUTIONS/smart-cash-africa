import {
  accounts,
  transactions,
  budgets,
  savingsGoals,
  reports,
} from './mock-data';

export function getAccountById(id: string) {
  return accounts.find((a) => a.id === id);
}

export function getTransactionsByAccount(provider: string) {
  return transactions.filter((t) => t.account === provider);
}

export function getTransactionById(id: string) {
  return transactions.find((t) => t.id === id);
}

export function getBudgetById(id: string) {
  return budgets.find((b) => b.id === id);
}

export function getSavingsGoalById(id: string) {
  return savingsGoals.find((g) => g.id === id);
}

export function getReportById(id: string) {
  return reports.find((r) => r.id === id);
}
