export type TransactionStatus = 'completed' | 'pending' | 'failed';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  account: string;
  amount: number;
  status: TransactionStatus;
}

export interface Account {
  id: string;
  provider: string;
  providerId?: string;
  type: string;
  balance: number;
  currency: string;
  lastActivity: string;
  color: string;
  initials: string;
  nickname?: string;
  activityKey?: string;
  activityParams?: Record<string, string | number>;
}

export interface Budget {
  id: string;
  category: string;
  allocated: number;
  color: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  emoji: string;
  predictedDate: string;
  aiTip: string;
  monthlyContribution?: number;
  aiTipKey?: string;
  aiTipParams?: Record<string, string | number>;
}

export interface AppNotification {
  id: string;
  group: string;
  title: string;
  message: string;
  time: string;
  type: 'warning' | 'info' | 'success' | 'security';
  read: boolean;
  titleKey?: string;
  messageKey?: string;
  timeKey?: string;
  params?: Record<string, string | number>;
}

export interface UserProfile {
  phone: string;
  country: string;
}

export interface AppPreferences {
  language: string;
  /** When true, locale is not auto-adjusted for Senegal */
  languageManual?: boolean;
  currency: string;
  notificationPrefs: Record<string, boolean>;
}

export interface ConnectProviderInput {
  id: string;
  name: string;
  color: string;
  initials: string;
  type: string;
  nickname?: string;
  initialBalance?: number;
}

export interface CreateAccountInput {
  name: string;
  type: AccountType;
  initialBalance?: number;
  phone?: string;
}

export type AccountType =
  | 'Mobile Money'
  | 'Savings Account'
  | 'Current Account'
  | 'Physical Cash'
  | 'Savings';
