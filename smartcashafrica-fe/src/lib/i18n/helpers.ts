import { pluralize, type Locale } from './index';

const CATEGORY_KEYS: Record<string, string> = {
  Food: 'transactions.categories.food',
  Transport: 'transactions.categories.transport',
  Housing: 'transactions.categories.housing',
  Utilities: 'transactions.categories.utilities',
  Bills: 'transactions.categories.bills',
  Shopping: 'transactions.categories.shopping',
  Health: 'transactions.categories.health',
  Education: 'transactions.categories.education',
  Entertainment: 'transactions.categories.entertainment',
  Income: 'transactions.categories.income',
  Salary: 'transactions.categories.salary',
  Freelance: 'transactions.categories.freelance',
  Investment: 'transactions.categories.investment',
  Other: 'transactions.categories.other',
};

const NOTIFICATION_GROUP_KEYS: Record<string, string> = {
  'Budget Alerts': 'notifications.budgetAlerts',
  'AI Insights': 'notifications.aiInsights',
  'Savings Milestones': 'notifications.savingsMilestones',
  'Account Updates': 'notifications.accountUpdates',
  'Security Events': 'notifications.securityEvents',
};

const REPORT_KEYS: Record<string, { name: string; desc: string }> = {
  '1': {
    name: 'reports.monthlySummary',
    desc: 'reports.monthlySummaryDesc',
  },
  '2': {
    name: 'reports.spendingAnalysis',
    desc: 'reports.spendingAnalysisDesc',
  },
  '3': { name: 'reports.budgetReport', desc: 'reports.budgetReportDesc' },
  '4': { name: 'reports.savingsReport', desc: 'reports.savingsReportDesc' },
  '5': {
    name: 'reports.healthReportName',
    desc: 'reports.healthReportDesc',
  },
};

const HEALTH_CATEGORY_KEYS: Record<string, string> = {
  'Budget Discipline': 'health.budgetDiscipline',
  'Savings Rate': 'health.savingsRateScore',
  'Income Stability': 'health.incomeStability',
  'Emergency Fund': 'health.emergencyFund',
  'Goal Progress': 'health.goalProgress',
  'Savings Score': 'health.savingsScore',
  'Spending Discipline': 'health.spendingDiscipline',
  'Budget Adherence': 'health.budgetAdherence',
  'Debt Management': 'health.debtManagement',
};

const CASH_DIST_KEYS: Record<string, string> = {
  'Bank Accounts': 'dashboard.bankAccounts',
  'Mobile Money': 'dashboard.mobileMoney',
  Savings: 'dashboard.savings',
  Cash: 'dashboard.cash',
};

const SUMMARY_CARD_KEYS: Record<string, string> = {
  'net-worth': 'dashboard.netWorth',
  income: 'dashboard.monthlyIncome',
  expenses: 'dashboard.monthlyExpenses',
  'savings-rate': 'dashboard.savingsRate',
  'health-score': 'dashboard.healthScore',
};

const MONTH_KEYS: Record<string, string> = {
  Jan: 'months.jan',
  Feb: 'months.feb',
  Mar: 'months.mar',
  Apr: 'months.apr',
  May: 'months.may',
  Jun: 'months.jun',
  Jul: 'months.jul',
  Aug: 'months.aug',
  Sep: 'months.sep',
  Oct: 'months.oct',
  Nov: 'months.nov',
  Dec: 'months.dec',
};

const REPORT_PERIOD_KEYS: Record<string, string> = {
  'June 2026': 'reports.periods.june2026',
  'Juin 2026': 'reports.periods.june2026',
  'Q2 2026': 'reports.periods.q22026',
  'T2 2026': 'reports.periods.q22026',
};

const EXPORT_FORMAT_KEYS: Record<string, string> = {
  PDF: 'reports.formats.pdf',
  Excel: 'reports.formats.excel',
  CSV: 'reports.formats.csv',
};

const ACCOUNT_TYPE_KEYS: Record<string, string> = {
  'Savings Account': 'accounts.types.savingsAccount',
  'Mobile Money': 'accounts.types.mobileMoney',
  'Current Account': 'accounts.types.currentAccount',
  'Physical Cash': 'accounts.types.physicalCash',
  Savings: 'accounts.types.savings',
};

const SEED_ACCOUNT_ACTIVITY: Record<
  string,
  { key: string; params?: Record<string, string | number> }
> = {
  '1': {
    key: 'accounts.activity.paymentTo',
    params: { merchant: 'Shoprite', hours: 5 },
  },
  '2': { key: 'accounts.activity.airtime', params: { days: 1 } },
  '3': { key: 'accounts.activity.transferReceived', params: { hours: 3 } },
  '4': {
    key: 'accounts.activity.paymentTo',
    params: { merchant: 'SONABEL', hours: 6 },
  },
  '5': { key: 'accounts.activity.transferReceived', params: { hours: 2 } },
  '6': { key: 'accounts.activity.salaryDeposit', params: { days: 3 } },
  '7': { key: 'accounts.activity.transferReceived', params: { hours: 24 } },
  '8': { key: 'accounts.activity.manualEntry', params: { weeks: 1 } },
};

const NOTIFICATION_TIME_BY_ID: Record<
  string,
  { key: string; params: Record<string, number> }
> = {
  '1': { key: 'notifications.time.hoursAgo', params: { count: 2 } },
  '2': { key: 'notifications.time.hoursAgo', params: { count: 5 } },
  '3': { key: 'notifications.time.daysAgo', params: { count: 1 } },
  '4': { key: 'notifications.time.daysAgo', params: { count: 1 } },
  '5': { key: 'notifications.time.daysAgo', params: { count: 2 } },
  '6': { key: 'notifications.time.daysAgo', params: { count: 3 } },
};

const HEALTH_REC_KEYS = ['health.rec1', 'health.rec2', 'health.rec3'] as const;

type TranslateFn = (
  key: string,
  params?: Record<string, string | number>,
) => string;

export function translateCategory(
  t: (key: string) => string,
  category: string,
): string {
  const key = CATEGORY_KEYS[category];
  return key ? t(key) : category;
}

export function translateNotificationGroup(
  t: (key: string) => string,
  group: string,
): string {
  const key = NOTIFICATION_GROUP_KEYS[group];
  return key ? t(key) : group;
}

export function translateNotificationItem(
  t: TranslateFn,
  id: string,
  field: 'title' | 'message',
  fallback: string,
): string {
  const key = `notifications.items.${id}.${field}`;
  const translated = t(key);
  return translated === key ? fallback : translated;
}

export function resolveNotificationTitle(
  t: TranslateFn,
  notif: {
    id: string;
    title: string;
    titleKey?: string;
    params?: Record<string, string | number>;
  },
): string {
  if (notif.titleKey) return t(notif.titleKey, notif.params);
  return translateNotificationItem(t, notif.id, 'title', notif.title);
}

export function resolveNotificationMessage(
  t: TranslateFn,
  notif: {
    id: string;
    message: string;
    messageKey?: string;
    params?: Record<string, string | number>;
  },
): string {
  if (notif.messageKey) return t(notif.messageKey, notif.params);
  return translateNotificationItem(t, notif.id, 'message', notif.message);
}

export function resolveNotificationTime(
  t: TranslateFn,
  locale: Locale,
  notif: {
    id: string;
    time: string;
    timeKey?: string;
    params?: Record<string, string | number>;
  },
): string {
  if (notif.timeKey) return t(notif.timeKey, notif.params);
  const seed = NOTIFICATION_TIME_BY_ID[notif.id];
  if (seed) {
    const count = seed.params.count;
    if (seed.key === 'notifications.time.hoursAgo') {
      return t(
        pluralize(locale, count, {
          one: 'notifications.time.hoursAgo_one',
          other: 'notifications.time.hoursAgo_other',
        }),
        seed.params,
      );
    }
    if (seed.key === 'notifications.time.daysAgo') {
      return t(
        pluralize(locale, count, {
          one: 'notifications.time.daysAgo_one',
          other: 'notifications.time.daysAgo_other',
        }),
        seed.params,
      );
    }
    return t(seed.key, seed.params);
  }
  if (notif.time === 'Just now') return t('notifications.time.justNow');
  return notif.time;
}

export function translateReport(
  t: (key: string) => string,
  id: string,
  fallback: { name: string; description: string },
) {
  const keys = REPORT_KEYS[id];
  if (!keys) return fallback;
  return {
    name: t(keys.name),
    description: t(keys.desc),
  };
}

export function translateHealthCategory(
  t: (key: string) => string,
  name: string,
): string {
  const key = HEALTH_CATEGORY_KEYS[name];
  return key ? t(key) : name;
}

export function translateCashDist(
  t: (key: string) => string,
  name: string,
): string {
  const key = CASH_DIST_KEYS[name];
  return key ? t(key) : name;
}

export function translateSummaryCard(
  t: (key: string) => string,
  id: string,
  fallback: string,
): string {
  const key = SUMMARY_CARD_KEYS[id];
  return key ? t(key) : fallback;
}

export function translateMonth(
  t: (key: string) => string,
  month: string,
): string {
  const key = MONTH_KEYS[month];
  return key ? t(key) : month;
}

export function translateStatus(t: TranslateFn, status: string): string {
  if (status === 'completed') return t('common.completed');
  if (status === 'pending') return t('common.pending');
  if (status === 'failed') return t('common.failed');
  return status;
}

export function translateAccountType(t: TranslateFn, type: string): string {
  const key = ACCOUNT_TYPE_KEYS[type];
  return key ? t(key) : type;
}

export function translateAccountActivity(
  t: TranslateFn,
  account: {
    id: string;
    lastActivity: string;
    activityKey?: string;
    activityParams?: Record<string, string | number>;
  },
): string {
  if (account.activityKey) {
    return t(account.activityKey, account.activityParams);
  }
  const seed = SEED_ACCOUNT_ACTIVITY[account.id];
  if (seed) return t(seed.key, seed.params);
  if (account.lastActivity.endsWith(' — Just now')) {
    const description = account.lastActivity.replace(' — Just now', '');
    return t('accounts.activity.recentTransaction', { description });
  }
  if (account.lastActivity === 'Connected · Just now') {
    return t('accounts.activity.connected');
  }
  if (account.lastActivity === 'Synced · Just now') {
    return t('accounts.activity.synced');
  }
  if (account.lastActivity === 'Created · Just now') {
    return t('accounts.activity.created');
  }
  return account.lastActivity;
}

export function translateReportPeriod(t: TranslateFn, period: string): string {
  const key = REPORT_PERIOD_KEYS[period];
  return key ? t(key) : period;
}

export function translateExportFormat(t: TranslateFn, format: string): string {
  const key = EXPORT_FORMAT_KEYS[format];
  return key ? t(key) : format;
}

export function getExportCsvHeaders(t: TranslateFn): string[] {
  return [
    t('export.headers.date'),
    t('export.headers.description'),
    t('export.headers.category'),
    t('export.headers.account'),
    t('export.headers.amount'),
    t('export.headers.status'),
  ];
}

export function translateHealthRecommendation(
  t: TranslateFn,
  index: number,
  fallback: string,
): string {
  const key = HEALTH_REC_KEYS[index];
  if (!key) return fallback;
  const translated = t(key);
  return translated === key ? fallback : translated;
}

export function translateSavingsTip(
  t: TranslateFn,
  goal: {
    id: string;
    aiTip: string;
    aiTipKey?: string;
    aiTipParams?: Record<string, string | number>;
  },
): string {
  if (goal.aiTipKey) return t(goal.aiTipKey, goal.aiTipParams);
  const tipKey = `savings.tips.${goal.id}`;
  const translated = t(tipKey);
  return translated === tipKey ? goal.aiTip : translated;
}
