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
  notificationPrefs: Record<string, boolean>;
}

export interface ConnectProviderInput {
  id: string;
  name: string;
  color: string;
  initials: string;
  type: string;
  nickname?: string;
}
