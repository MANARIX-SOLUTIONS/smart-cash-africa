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
  {
    id: 'health-score',
    label: 'Financial Health Score',
    value: 78,
    trend: 6.2,
    icon: 'heart-pulse',
    isPercent: true,
    sparkline: [68, 70, 72, 74, 75, 76, 78],
  },
];

export const cashDistribution = [
  { name: 'Bank Accounts', value: 2_100_000, color: '#00A86B' },
  { name: 'Mobile Money', value: 1_470_000, color: '#2563EB' },
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
  { category: 'Bills', amount: 85_000, color: '#F59E0B' },
  { category: 'Shopping', amount: 72_000, color: '#EF4444' },
  { category: 'Health', amount: 42_000, color: '#22C55E' },
  { category: 'Education', amount: 35_000, color: '#0F172A' },
  { category: 'Entertainment', amount: 38_000, color: '#8B5CF6' },
];

export const accounts = [
  {
    id: '1',
    provider: 'Wave',
    providerId: 'wave',
    type: 'Mobile Money',
    balance: 850_000,
    currency: 'FCFA',
    lastActivity: 'Payment to Shoprite — 5h ago',
    color: '#00D4FF',
    initials: 'WV',
  },
  {
    id: '2',
    provider: 'Orange Money',
    providerId: 'orange',
    type: 'Mobile Money',
    balance: 620_000,
    currency: 'FCFA',
    lastActivity: 'Airtime purchase — 1d ago',
    color: '#FF7900',
    initials: 'OM',
  },
  {
    id: '3',
    provider: 'Free Money',
    providerId: 'free',
    type: 'Mobile Money',
    balance: 185_000,
    currency: 'FCFA',
    lastActivity: 'Transfer received — 3h ago',
    color: '#CD1719',
    initials: 'FM',
  },
  {
    id: '4',
    provider: 'MTN MoMo',
    providerId: 'mtn',
    type: 'Mobile Money',
    balance: 415_000,
    currency: 'FCFA',
    lastActivity: 'Bill payment — 6h ago',
    color: '#FFCC00',
    initials: 'MM',
  },
  {
    id: '5',
    provider: 'CBAO',
    providerId: 'cbao',
    type: 'Savings Account',
    balance: 980_000,
    currency: 'FCFA',
    lastActivity: 'Transfer received — 2h ago',
    color: '#006B3F',
    initials: 'CB',
  },
  {
    id: '6',
    provider: 'BOA',
    providerId: 'boa',
    type: 'Current Account',
    balance: 720_000,
    currency: 'FCFA',
    lastActivity: 'Salary deposit — 3d ago',
    color: '#1B2A4A',
    initials: 'BO',
  },
  {
    id: '7',
    provider: 'Ecobank',
    providerId: 'ecobank',
    type: 'Savings Account',
    balance: 400_000,
    currency: 'FCFA',
    lastActivity: 'Freelance deposit — 1d ago',
    color: '#00843D',
    initials: 'EB',
  },
  {
    id: '8',
    provider: 'Cash Wallet',
    providerId: 'cash',
    type: 'Physical Cash',
    balance: 180_000,
    currency: 'FCFA',
    lastActivity: 'Manual entry — 1w ago',
    color: '#64748B',
    initials: 'CA',
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
  { id: '1', category: 'Food', allocated: 300_000, color: '#00A86B' },
  { id: '2', category: 'Transport', allocated: 150_000, color: '#2563EB' },
  { id: '3', category: 'Housing', allocated: 350_000, color: '#0F172A' },
  { id: '4', category: 'Utilities', allocated: 100_000, color: '#F59E0B' },
  { id: '5', category: 'Shopping', allocated: 80_000, color: '#EF4444' },
  { id: '6', category: 'Health', allocated: 60_000, color: '#22C55E' },
  { id: '7', category: 'Entertainment', allocated: 50_000, color: '#8B5CF6' },
];

export const savingsGoals = [
  {
    id: '1',
    name: 'Emergency Fund',
    target: 2_000_000,
    current: 1_450_000,
    emoji: '🛡️',
    predictedDate: 'Aug 2026',
    monthlyContribution: 75_000,
    aiTip:
      'Increase monthly contribution by 15,000 FCFA to reach goal 2 months earlier.',
  },
  {
    id: '2',
    name: 'New Car',
    target: 8_000_000,
    current: 2_100_000,
    emoji: '🚗',
    predictedDate: 'Jun 2027',
    monthlyContribution: 150_000,
    aiTip: 'Save 180,000 FCFA monthly to reach this goal on time.',
  },
  {
    id: '3',
    name: 'Vacation',
    target: 1_500_000,
    current: 680_000,
    emoji: '🏝️',
    predictedDate: 'Dec 2026',
    monthlyContribution: 50_000,
    aiTip: 'Save an extra 25,000 FCFA monthly to hit your December target.',
  },
  {
    id: '4',
    name: 'Business Capital',
    target: 5_000_000,
    current: 1_200_000,
    emoji: '🚀',
    predictedDate: 'Mar 2027',
    monthlyContribution: 120_000,
    aiTip:
      'Consider allocating 20% of freelance income to accelerate this goal.',
  },
];

export const healthScores = {
  overall: 78,
  categories: [
    { name: 'Budget Discipline', score: 88, benchmark: 75 },
    { name: 'Savings Rate', score: 82, benchmark: 70 },
    { name: 'Income Stability', score: 74, benchmark: 65 },
    { name: 'Emergency Fund', score: 65, benchmark: 60 },
    { name: 'Goal Progress', score: 81, benchmark: 70 },
  ],
  recommendations: [
    'Build emergency fund to 3 months of expenses (currently at 2.1 months).',
    'Restaurant spending is 18% above your 3-month average.',
    'Your savings rate of 28.6% exceeds the recommended 20% threshold.',
  ],
};

export const healthHistory = [
  { month: 'Jan', score: 68 },
  { month: 'Feb', score: 70 },
  { month: 'Mar', score: 72 },
  { month: 'Apr', score: 74 },
  { month: 'May', score: 76 },
  { month: 'Jun', score: 78 },
];

export const budgetAnalytics = {
  monthlyTrends: [
    { month: 'Jan', allocated: 1_100_000, spent: 980_000 },
    { month: 'Feb', allocated: 1_100_000, spent: 1_020_000 },
    { month: 'Mar', allocated: 1_100_000, spent: 940_000 },
    { month: 'Apr', allocated: 1_100_000, spent: 1_050_000 },
    { month: 'May', allocated: 1_100_000, spent: 1_010_000 },
    { month: 'Jun', allocated: 1_100_000, spent: 930_000 },
  ],
  predictions: [
    { category: 'Food', predicted: 268_000, allocated: 300_000 },
    { category: 'Transport', predicted: 142_000, allocated: 150_000 },
    { category: 'Entertainment', predicted: 52_000, allocated: 50_000 },
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
    name: 'Monthly Financial Summary',
    description: 'Complete overview of income, expenses, and savings',
    period: 'June 2026',
    type: 'summary',
  },
  {
    id: '2',
    name: 'Spending Analysis',
    description: 'Category breakdown, trends and spending patterns',
    period: 'June 2026',
    type: 'spending',
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

export const aiInsights = [
  {
    id: '1',
    message: 'You spent 15% more than last month on dining and restaurants.',
    confidence: 92,
    priority: 'high' as const,
    action: 'Review food spending',
    actionPath: '/budgets/1',
  },
  {
    id: '2',
    message:
      'You can save 25,000 FCFA by reducing restaurant spending this month.',
    confidence: 87,
    priority: 'medium' as const,
    action: 'See savings tips',
    actionPath: '/advisor',
  },
  {
    id: '3',
    message: 'Your Emergency Fund savings goal is on track for August 2026.',
    confidence: 94,
    priority: 'low' as const,
    action: 'View goal progress',
    actionPath: '/savings/1',
  },
];

export const aiInsight = aiInsights[1];

export const savingsAiRecommendations = {
  suggestedMonthly: 95_000,
  goalProbability: 82,
  tips: [
    'Increase Emergency Fund contribution by 15,000 FCFA to finish 2 months early.',
    'Your savings rate of 28.6% is above the 20% benchmark — great discipline.',
    'Allocate 20% of freelance income to accelerate Business Capital goal.',
  ],
};
