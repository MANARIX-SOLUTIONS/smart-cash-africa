export type ProviderCategory = 'mobile_money' | 'bank' | 'cash';

export interface FinancialProvider {
  id: string;
  name: string;
  color: string;
  initials: string;
  type: string;
  category: ProviderCategory;
}

/** African financial providers — mobile money listed first. */
export const financialProviders: FinancialProvider[] = [
  {
    id: 'wave',
    name: 'Wave',
    color: '#2563EB',
    initials: 'WV',
    type: 'Mobile Money',
    category: 'mobile_money',
  },
  {
    id: 'orange',
    name: 'Orange Money',
    color: '#F59E0B',
    initials: 'OM',
    type: 'Mobile Money',
    category: 'mobile_money',
  },
  {
    id: 'free',
    name: 'Free Money',
    color: '#EF4444',
    initials: 'FM',
    type: 'Mobile Money',
    category: 'mobile_money',
  },
  {
    id: 'mtn',
    name: 'MTN MoMo',
    color: '#FBBF24',
    initials: 'MM',
    type: 'Mobile Money',
    category: 'mobile_money',
  },
  {
    id: 'airtel',
    name: 'Airtel Money',
    color: '#DC2626',
    initials: 'AM',
    type: 'Mobile Money',
    category: 'mobile_money',
  },
  {
    id: 'cbao',
    name: 'CBAO',
    color: '#00A86B',
    initials: 'CB',
    type: 'Savings Account',
    category: 'bank',
  },
  {
    id: 'boa',
    name: 'BOA',
    color: '#0F172A',
    initials: 'BO',
    type: 'Current Account',
    category: 'bank',
  },
  {
    id: 'ecobank',
    name: 'Ecobank',
    color: '#22C55E',
    initials: 'EB',
    type: 'Savings Account',
    category: 'bank',
  },
  {
    id: 'cash',
    name: 'Cash Wallet',
    color: '#64748B',
    initials: 'CA',
    type: 'Physical Cash',
    category: 'cash',
  },
];

export const mobileMoneyProviders = financialProviders.filter(
  (p) => p.category === 'mobile_money',
);

export const bankProviders = financialProviders.filter(
  (p) => p.category === 'bank',
);

export const cashProviders = financialProviders.filter(
  (p) => p.category === 'cash',
);

export const onboardingProviders = [
  ...mobileMoneyProviders,
  ...bankProviders.slice(0, 2),
  ...cashProviders,
];

export function getProviderById(id: string) {
  return financialProviders.find((p) => p.id === id);
}
