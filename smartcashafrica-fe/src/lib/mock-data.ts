export const summaryCards = [
  {
    id: 'net-worth',
    label: 'Total Net Worth',
    value: 4_850_000,
    trend: 12.4,
    icon: 'wallet',
    sparkline: [3.2, 3.5, 3.8, 4.1, 4.3, 4.6, 4.85],
  },
  {
    id: 'income',
    label: 'Monthly Income',
    value: 1_250_000,
    trend: 5.2,
    icon: 'trending-up',
    sparkline: [1.1, 1.15, 1.2, 1.18, 1.22, 1.24, 1.25],
  },
  {
    id: 'expenses',
    label: 'Monthly Expenses',
    value: 892_000,
    trend: -3.8,
    icon: 'trending-down',
    sparkline: [0.95, 0.92, 0.9, 0.88, 0.89, 0.9, 0.892],
  },
  {
    id: 'savings-rate',
    label: 'Savings Rate',
    value: 28.6,
    trend: 4.1,
    icon: 'piggy-bank',
    isPercent: true,
    sparkline: [22, 24, 25, 26, 27, 28, 28.6],
  },
];

export const cashDistribution = [
  { name: 'Bank Accounts', value: 2_100_000, color: '#00A86B' },
  { name: 'Wave', value: 850_000, color: '#2563EB' },
  { name: 'Orange Money', value: 620_000, color: '#F59E0B' },
  { name: 'Cash', value: 180_000, color: '#64748B' },
  { name: 'Savings', value: 1_100_000, color: '#22C55E' },
];

export const monthlySpending = [
  { month: 'Jan', amount: 780_000 },
  { month: 'Feb', amount: 820_000 },
  { month: 'Mar', amount: 750_000 },
  { month: 'Apr', amount: 890_000 },
  { month: 'May', amount: 860_000 },
  { month: 'Jun', amount: 892_000 },
];

export const categorySpending = [
  { category: 'Food', amount: 245_000, color: '#00A86B' },
  { category: 'Transport', amount: 128_000, color: '#2563EB' },
  { category: 'Housing', amount: 320_000, color: '#0F172A' },
  { category: 'Utilities', amount: 85_000, color: '#F59E0B' },
  { category: 'Shopping', amount: 72_000, color: '#EF4444' },
  { category: 'Health', amount: 42_000, color: '#22C55E' },
];

export const accounts = [
  {
    id: '1',
    provider: 'Ecobank',
    type: 'Savings Account',
    balance: 1_450_000,
    currency: 'FCFA',
    lastActivity: 'Transfer received — 2h ago',
    color: '#00A86B',
    initials: 'EB',
  },
  {
    id: '2',
    provider: 'Wave',
    type: 'Mobile Money',
    balance: 850_000,
    currency: 'FCFA',
    lastActivity: 'Payment to Shoprite — 5h ago',
    color: '#2563EB',
    initials: 'WV',
  },
  {
    id: '3',
    provider: 'Orange Money',
    type: 'Mobile Money',
    balance: 620_000,
    currency: 'FCFA',
    lastActivity: 'Airtime purchase — 1d ago',
    color: '#F59E0B',
    initials: 'OM',
  },
  {
    id: '4',
    provider: 'UBA',
    type: 'Current Account',
    balance: 650_000,
    currency: 'FCFA',
    lastActivity: 'Salary deposit — 3d ago',
    color: '#EF4444',
    initials: 'UB',
  },
  {
    id: '5',
    provider: 'Cash',
    type: 'Physical Cash',
    balance: 180_000,
    currency: 'FCFA',
    lastActivity: 'Manual entry — 1w ago',
    color: '#64748B',
    initials: 'CA',
  },
  {
    id: '6',
    provider: 'Savings Vault',
    type: 'Savings',
    balance: 1_100_000,
    currency: 'FCFA',
    lastActivity: 'Auto-save — 2d ago',
    color: '#22C55E',
    initials: 'SV',
  },
];

export const transactions = [
  {
    id: '1',
    date: '2026-06-06',
    description: 'Shoprite Groceries',
    category: 'Food',
    account: 'Wave',
    amount: -45_000,
    status: 'completed' as const,
  },
  {
    id: '2',
    date: '2026-06-05',
    description: 'Salary Deposit',
    category: 'Income',
    account: 'UBA',
    amount: 1_250_000,
    status: 'completed' as const,
  },
  {
    id: '3',
    date: '2026-06-05',
    description: 'Uber Ride',
    category: 'Transport',
    account: 'Orange Money',
    amount: -8_500,
    status: 'completed' as const,
  },
  {
    id: '4',
    date: '2026-06-04',
    description: 'Netflix Subscription',
    category: 'Entertainment',
    account: 'Ecobank',
    amount: -12_000,
    status: 'completed' as const,
  },
  {
    id: '5',
    date: '2026-06-04',
    description: 'Electricity Bill',
    category: 'Utilities',
    account: 'Wave',
    amount: -35_000,
    status: 'pending' as const,
  },
  {
    id: '6',
    date: '2026-06-03',
    description: 'Freelance Payment',
    category: 'Income',
    account: 'Ecobank',
    amount: 350_000,
    status: 'completed' as const,
  },
  {
    id: '7',
    date: '2026-06-03',
    description: 'Pharmacy',
    category: 'Health',
    account: 'Cash',
    amount: -18_500,
    status: 'completed' as const,
  },
  {
    id: '8',
    date: '2026-06-02',
    description: 'Rent Payment',
    category: 'Housing',
    account: 'UBA',
    amount: -320_000,
    status: 'completed' as const,
  },
];

export const budgets = [
  {
    id: '1',
    category: 'Food',
    allocated: 300_000,
    spent: 245_000,
    color: '#00A86B',
  },
  {
    id: '2',
    category: 'Transport',
    allocated: 150_000,
    spent: 128_000,
    color: '#2563EB',
  },
  {
    id: '3',
    category: 'Housing',
    allocated: 350_000,
    spent: 320_000,
    color: '#0F172A',
  },
  {
    id: '4',
    category: 'Utilities',
    allocated: 100_000,
    spent: 85_000,
    color: '#F59E0B',
  },
  {
    id: '5',
    category: 'Shopping',
    allocated: 80_000,
    spent: 72_000,
    color: '#EF4444',
  },
  {
    id: '6',
    category: 'Health',
    allocated: 60_000,
    spent: 42_000,
    color: '#22C55E',
  },
  {
    id: '7',
    category: 'Entertainment',
    allocated: 50_000,
    spent: 38_000,
    color: '#8B5CF6',
  },
];

export const savingsGoals = [
  {
    id: '1',
    name: 'Emergency Fund',
    target: 2_000_000,
    current: 1_450_000,
    emoji: '🛡️',
    predictedDate: 'Aug 2026',
    aiTip:
      'Increase monthly contribution by 15,000 FCFA to reach goal 2 months earlier.',
  },
  {
    id: '2',
    name: 'New Laptop',
    target: 800_000,
    current: 520_000,
    emoji: '💻',
    predictedDate: 'Sep 2026',
    aiTip: 'You are on track. Current pace achieves goal by September.',
  },
  {
    id: '3',
    name: 'Vacation to Zanzibar',
    target: 1_500_000,
    current: 680_000,
    emoji: '🏝️',
    predictedDate: 'Dec 2026',
    aiTip: 'Save an extra 25,000 FCFA monthly to hit your December target.',
  },
  {
    id: '4',
    name: 'Business Startup',
    target: 5_000_000,
    current: 1_200_000,
    emoji: '🚀',
    predictedDate: 'Mar 2027',
    aiTip:
      'Consider allocating 20% of freelance income to accelerate this goal.',
  },
];

export const healthScores = {
  overall: 78,
  categories: [
    { name: 'Savings Score', score: 82, benchmark: 70 },
    { name: 'Spending Discipline', score: 74, benchmark: 65 },
    { name: 'Budget Adherence', score: 88, benchmark: 75 },
    { name: 'Emergency Fund', score: 65, benchmark: 60 },
    { name: 'Debt Management', score: 81, benchmark: 70 },
  ],
  recommendations: [
    'Build emergency fund to 3 months of expenses (currently at 2.1 months).',
    'Restaurant spending is 18% above your 3-month average.',
    'Your savings rate of 28.6% exceeds the recommended 20% threshold.',
  ],
};

export const aiMessages = [
  {
    id: '1',
    role: 'assistant' as const,
    content:
      "Hello! I'm your SmartCash Africa AI advisor. I can help you understand your spending, optimize your budget, and reach your financial goals faster.",
  },
  {
    id: '2',
    role: 'user' as const,
    content: 'How much can I save this month?',
  },
  {
    id: '3',
    role: 'assistant' as const,
    content:
      'Based on your current spending patterns, you can save approximately **358,000 FCFA** this month. Reducing restaurant expenses by 10% alone would add 12,000 FCFA to your savings.',
  },
];

export const aiSuggestions = [
  'Analyze my spending',
  'How much can I save?',
  'Am I overspending?',
  'Will I achieve my goal?',
  'Suggest a budget',
  'Generate monthly report',
];

export const reports = [
  {
    id: '1',
    name: 'Monthly Summary',
    description: 'Complete overview of income, expenses, and savings',
    period: 'June 2026',
    type: 'summary',
  },
  {
    id: '2',
    name: 'Annual Summary',
    description: 'Year-to-date financial performance',
    period: '2026',
    type: 'annual',
  },
  {
    id: '3',
    name: 'Budget Report',
    description: 'Budget vs actual spending by category',
    period: 'June 2026',
    type: 'budget',
  },
  {
    id: '4',
    name: 'Savings Report',
    description: 'Progress on all savings goals',
    period: 'Q2 2026',
    type: 'savings',
  },
  {
    id: '5',
    name: 'Financial Health Report',
    description: 'Score breakdown and recommendations',
    period: 'June 2026',
    type: 'health',
  },
];

export const notifications = [
  {
    id: '1',
    group: 'Budget Alerts',
    title: 'Food budget at 82%',
    message: 'You have spent 245,000 of 300,000 FCFA on food this month.',
    time: '2 hours ago',
    type: 'warning' as const,
  },
  {
    id: '2',
    group: 'AI Insights',
    title: 'Spending pattern detected',
    message: 'Restaurant spending is 18% higher than your 3-month average.',
    time: '5 hours ago',
    type: 'info' as const,
  },
  {
    id: '3',
    group: 'Savings Milestones',
    title: 'Emergency Fund milestone!',
    message: 'You reached 70% of your emergency fund goal. Keep going!',
    time: '1 day ago',
    type: 'success' as const,
  },
  {
    id: '4',
    group: 'Account Updates',
    title: 'Salary deposited',
    message: '1,250,000 FCFA received in UBA Current Account.',
    time: '1 day ago',
    type: 'info' as const,
  },
  {
    id: '5',
    group: 'Security Events',
    title: 'New login detected',
    message: 'Login from Chrome on macOS — Dakar, Senegal.',
    time: '2 days ago',
    type: 'security' as const,
  },
  {
    id: '6',
    group: 'Budget Alerts',
    title: 'Transport under budget',
    message: 'Great job! Transport spending is 15% below budget.',
    time: '3 days ago',
    type: 'success' as const,
  },
];

export const aiInsight = {
  message:
    'You spent 18% more on restaurants this month. Reducing transport expenses by 10% could save 12,000 FCFA.',
  confidence: 87,
  action: 'View spending breakdown',
};
