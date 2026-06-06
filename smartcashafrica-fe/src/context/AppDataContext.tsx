import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  accounts as defaultAccounts,
  transactions as defaultTransactions,
  savingsGoals as defaultSavingsGoals,
  notifications as defaultNotifications,
} from "@/lib/mock-data";
import { downloadTransactionsCsv } from "@/lib/export";
import type {
  Account,
  AppNotification,
  AppPreferences,
  ConnectProviderInput,
  SavingsGoal,
  Transaction,
  TransactionStatus,
  UserProfile,
} from "@/types/finance";

const DATA_KEY = "smartcash-app-data";
const PREFS_KEY = "smartcash-preferences";
const PROFILE_KEY = "smartcash-profile";

interface PersistedData {
  transactions: Transaction[];
  accounts: Account[];
  savingsGoals: SavingsGoal[];
  notifications: AppNotification[];
}

interface AppDataContextValue {
  transactions: Transaction[];
  accounts: Account[];
  savingsGoals: SavingsGoal[];
  notifications: AppNotification[];
  preferences: AppPreferences;
  profile: UserProfile;
  unreadCount: number;
  getAccountById: (id: string) => Account | undefined;
  getTransactionById: (id: string) => Transaction | undefined;
  getSavingsGoalById: (id: string) => SavingsGoal | undefined;
  getTransactionsByAccount: (provider: string) => Transaction[];
  addTransaction: (input: {
    type: "income" | "expense";
    description: string;
    amount: number;
    category: string;
    account: string;
  }) => Transaction;
  connectAccount: (provider: ConnectProviderInput) => Account;
  renameAccount: (id: string, nickname: string) => void;
  syncAccount: (id: string) => Promise<void>;
  syncAllAccounts: () => Promise<void>;
  addSavingsGoal: (input: {
    name: string;
    target: number;
    emoji: string;
    monthlyContribution?: number;
  }) => SavingsGoal;
  addContribution: (goalId: string, amount: number) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  exportTransactions: (items?: Transaction[]) => void;
  updateProfile: (fields: Partial<UserProfile>) => void;
  updatePreferences: (fields: Partial<AppPreferences>) => void;
}

const AppDataContext = createContext<AppDataContextValue | null>(null);

const defaultNotificationPrefs: Record<string, boolean> = {
  budget: true,
  ai: true,
  savings: true,
  accounts: true,
  security: true,
};

function withReadFlags(
  items: Omit<AppNotification, "read">[],
): AppNotification[] {
  return items.map((n, i) => ({ ...n, read: i >= 3 }));
}

function loadJson<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function loadInitialData(): PersistedData {
  const saved = loadJson<PersistedData>(DATA_KEY);
  if (saved) return saved;

  return {
    transactions: defaultTransactions,
    accounts: defaultAccounts,
    savingsGoals: defaultSavingsGoals,
    notifications: withReadFlags(defaultNotifications),
  };
}

function loadInitialProfile(): UserProfile {
  return (
    loadJson<UserProfile>(PROFILE_KEY) ?? {
      phone: "+221 77 123 4567",
      country: "Senegal",
    }
  );
}

function loadInitialPreferences(): AppPreferences {
  return (
    loadJson<AppPreferences>(PREFS_KEY) ?? {
      language: "fr",
      notificationPrefs: defaultNotificationPrefs,
    }
  );
}

function predictDate(monthly: number, remaining: number): string {
  if (monthly <= 0) return "TBD";
  const months = Math.ceil(remaining / monthly);
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PersistedData>(loadInitialData);
  const [profile, setProfile] = useState<UserProfile>(loadInitialProfile);
  const [preferences, setPreferences] = useState<AppPreferences>(
    loadInitialPreferences,
  );

  useEffect(() => {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(PREFS_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const unreadCount = useMemo(
    () => data.notifications.filter((n) => !n.read).length,
    [data.notifications],
  );

  const getAccountById = useCallback(
    (id: string) => data.accounts.find((a) => a.id === id),
    [data.accounts],
  );

  const getTransactionById = useCallback(
    (id: string) => data.transactions.find((t) => t.id === id),
    [data.transactions],
  );

  const getSavingsGoalById = useCallback(
    (id: string) => data.savingsGoals.find((g) => g.id === id),
    [data.savingsGoals],
  );

  const getTransactionsByAccount = useCallback(
    (provider: string) =>
      data.transactions.filter((t) => t.account === provider),
    [data.transactions],
  );

  const addTransaction = useCallback(
    (input: {
      type: "income" | "expense";
      description: string;
      amount: number;
      category: string;
      account: string;
    }) => {
      const amount =
        input.type === "income"
          ? Math.abs(input.amount)
          : -Math.abs(input.amount);
      const status: TransactionStatus = "completed";
      const tx: Transaction = {
        id: crypto.randomUUID(),
        date: new Date().toISOString().slice(0, 10),
        description: input.description,
        category: input.category,
        account: input.account,
        amount,
        status,
      };

      setData((prev) => ({
        ...prev,
        transactions: [tx, ...prev.transactions],
        accounts: prev.accounts.map((a) =>
          a.provider === input.account
            ? {
                ...a,
                balance: a.balance + amount,
                lastActivity: `${input.description} — Just now`,
                activityKey: "accounts.activity.recentTransaction",
                activityParams: { description: input.description },
              }
            : a,
        ),
        notifications: [
          {
            id: crypto.randomUUID(),
            group: "Account Updates",
            title: "New transaction recorded",
            message: `${input.description} (${input.account})`,
            time: "Just now",
            type: "info",
            read: false,
            titleKey: "notifications.dynamic.newTransaction.title",
            messageKey: "notifications.dynamic.newTransaction.message",
            timeKey: "notifications.time.justNow",
            params: {
              description: input.description,
              account: input.account,
            },
          },
          ...prev.notifications,
        ],
      }));

      return tx;
    },
    [],
  );

  const connectAccount = useCallback(
    (provider: ConnectProviderInput) => {
      const exists = data.accounts.some(
        (a) => a.provider.toLowerCase() === provider.name.toLowerCase(),
      );
      if (exists) {
        throw new Error("already_connected");
      }

      const account: Account = {
        id: crypto.randomUUID(),
        provider: provider.nickname?.trim() || provider.name,
        type: provider.type,
        balance: 0,
        currency: "FCFA",
        lastActivity: "Connected · Just now",
        activityKey: "accounts.activity.connected",
        color: provider.color,
        initials: provider.initials,
      };

      setData((prev) => ({
        ...prev,
        accounts: [...prev.accounts, account],
        notifications: [
          {
            id: crypto.randomUUID(),
            group: "Account Updates",
            title: `${provider.name} connected`,
            message: "Your account is ready to sync transactions.",
            time: "Just now",
            type: "success",
            read: false,
            titleKey: "notifications.dynamic.accountConnected.title",
            messageKey: "notifications.dynamic.accountConnected.message",
            timeKey: "notifications.time.justNow",
            params: { name: provider.name },
          },
          ...prev.notifications,
        ],
      }));

      return account;
    },
    [data.accounts],
  );

  const renameAccount = useCallback((id: string, nickname: string) => {
    const trimmed = nickname.trim();
    if (!trimmed) return;

    setData((prev) => ({
      ...prev,
      accounts: prev.accounts.map((a) =>
        a.id === id ? { ...a, provider: trimmed, nickname: trimmed } : a,
      ),
    }));
  }, []);

  const syncAccount = useCallback(async (id: string) => {
    await new Promise((r) => setTimeout(r, 800));
    setData((prev) => ({
      ...prev,
      accounts: prev.accounts.map((a) =>
        a.id === id
          ? {
              ...a,
              lastActivity: "Synced · Just now",
              activityKey: "accounts.activity.synced",
              activityParams: undefined,
            }
          : a,
      ),
    }));
  }, []);

  const syncAllAccounts = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 1200));
    setData((prev) => ({
      ...prev,
      accounts: prev.accounts.map((a) => ({
        ...a,
        lastActivity: "Synced · Just now",
        activityKey: "accounts.activity.synced",
        activityParams: undefined,
      })),
    }));
  }, []);

  const addSavingsGoal = useCallback(
    (input: {
      name: string;
      target: number;
      emoji: string;
      monthlyContribution?: number;
    }) => {
      const monthly = input.monthlyContribution ?? 50_000;
      const goal: SavingsGoal = {
        id: crypto.randomUUID(),
        name: input.name.trim(),
        target: input.target,
        current: 0,
        emoji: input.emoji,
        predictedDate: predictDate(monthly, input.target),
        aiTip: `Save ${monthly.toLocaleString("fr-FR")} FCFA monthly to reach this goal on time.`,
        aiTipKey: "savings.dynamicTip",
        aiTipParams: { amount: monthly.toLocaleString("fr-FR") },
        monthlyContribution: monthly,
      };

      setData((prev) => ({
        ...prev,
        savingsGoals: [...prev.savingsGoals, goal],
        notifications: [
          {
            id: crypto.randomUUID(),
            group: "Savings Milestones",
            title: "New savings goal created",
            message: `"${goal.name}" — target ${goal.target.toLocaleString("fr-FR")} FCFA`,
            time: "Just now",
            type: "success",
            read: false,
            titleKey: "notifications.dynamic.newGoal.title",
            messageKey: "notifications.dynamic.newGoal.message",
            timeKey: "notifications.time.justNow",
            params: {
              name: goal.name,
              target: goal.target.toLocaleString("fr-FR"),
            },
          },
          ...prev.notifications,
        ],
      }));

      return goal;
    },
    [],
  );

  const addContribution = useCallback((goalId: string, amount: number) => {
    setData((prev) => ({
      ...prev,
      savingsGoals: prev.savingsGoals.map((g) =>
        g.id === goalId
          ? { ...g, current: Math.min(g.current + amount, g.target) }
          : g,
      ),
    }));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      ),
    }));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setData((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, read: true })),
    }));
  }, []);

  const exportTransactions = useCallback(
    (items?: Transaction[]) => {
      downloadTransactionsCsv(items ?? data.transactions);
    },
    [data.transactions],
  );

  const updateProfile = useCallback((fields: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...fields }));
  }, []);

  const updatePreferences = useCallback((fields: Partial<AppPreferences>) => {
    setPreferences((prev) => ({
      ...prev,
      ...fields,
      notificationPrefs: fields.notificationPrefs
        ? { ...prev.notificationPrefs, ...fields.notificationPrefs }
        : prev.notificationPrefs,
    }));
  }, []);

  const value = useMemo(
    () => ({
      transactions: data.transactions,
      accounts: data.accounts,
      savingsGoals: data.savingsGoals,
      notifications: data.notifications,
      preferences,
      profile,
      unreadCount,
      getAccountById,
      getTransactionById,
      getSavingsGoalById,
      getTransactionsByAccount,
      addTransaction,
      connectAccount,
      renameAccount,
      syncAccount,
      syncAllAccounts,
      addSavingsGoal,
      addContribution,
      markNotificationRead,
      markAllNotificationsRead,
      exportTransactions,
      updateProfile,
      updatePreferences,
    }),
    [
      data,
      preferences,
      profile,
      unreadCount,
      getAccountById,
      getTransactionById,
      getSavingsGoalById,
      getTransactionsByAccount,
      addTransaction,
      connectAccount,
      renameAccount,
      syncAccount,
      syncAllAccounts,
      addSavingsGoal,
      addContribution,
      markNotificationRead,
      markAllNotificationsRead,
      exportTransactions,
      updateProfile,
      updatePreferences,
    ],
  );

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) {
    throw new Error("useAppData must be used within AppDataProvider");
  }
  return ctx;
}
