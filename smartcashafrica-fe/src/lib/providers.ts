export type ProviderCategory = 'mobile_money' | 'bank' | 'cash';

export interface FinancialProvider {
  id: string;
  name: string;
  color: string;
  initials: string;
  type: string;
  category: ProviderCategory;
  /** Full wordmark — settings, connect flow, wide layouts */
  logo: string;
  /** Square mark — avatars, lists, command palette */
  logoIcon?: string;
  /** Container background behind the logo asset */
  logoBg?: string;
}

/** African financial providers — mobile money listed first. */
export const financialProviders: FinancialProvider[] = [
  {
    id: 'wave',
    name: 'Wave',
    color: '#00D4FF',
    initials: 'WV',
    type: 'Mobile Money',
    category: 'mobile_money',
    logo: '/providers/wave.png',
    logoIcon: '/providers/wave-icon.png',
    logoBg: '#00D4FF',
  },
  {
    id: 'orange',
    name: 'Orange Money',
    color: '#FF7900',
    initials: 'OM',
    type: 'Mobile Money',
    category: 'mobile_money',
    logo: '/providers/orange.svg',
    logoIcon: '/providers/orange.svg',
    logoBg: '#FF7900',
  },
  {
    id: 'free',
    name: 'Free Money',
    color: '#CD1719',
    initials: 'FM',
    type: 'Mobile Money',
    category: 'mobile_money',
    logo: '/providers/free.svg',
    logoIcon: '/providers/free-icon.svg',
    logoBg: '#CD1E25',
  },
  {
    id: 'mtn',
    name: 'MTN MoMo',
    color: '#FFCC00',
    initials: 'MM',
    type: 'Mobile Money',
    category: 'mobile_money',
    logo: '/providers/mtn.svg',
    logoIcon: '/providers/mtn.svg',
    logoBg: '#FFCC00',
  },
  {
    id: 'airtel',
    name: 'Airtel Money',
    color: '#ED1C24',
    initials: 'AM',
    type: 'Mobile Money',
    category: 'mobile_money',
    logo: '/providers/airtel.svg',
    logoIcon: '/providers/airtel-icon.svg',
    logoBg: '#FFFFFF',
  },
  {
    id: 'cbao',
    name: 'CBAO',
    color: '#006B3F',
    initials: 'CB',
    type: 'Savings Account',
    category: 'bank',
    logo: '/providers/cbao.jpg',
    logoIcon: '/providers/cbao-icon.png',
    logoBg: '#FFFFFF',
  },
  {
    id: 'boa',
    name: 'BOA',
    color: '#1B2A4A',
    initials: 'BO',
    type: 'Current Account',
    category: 'bank',
    logo: '/providers/boa.png',
    logoIcon: '/providers/boa-icon.png',
    logoBg: '#FFFFFF',
  },
  {
    id: 'ecobank',
    name: 'Ecobank',
    color: '#00577A',
    initials: 'EB',
    type: 'Savings Account',
    category: 'bank',
    logo: '/providers/ecobank.svg',
    logoIcon: '/providers/ecobank.svg',
    logoBg: '#FFFFFF',
  },
  {
    id: 'cash',
    name: 'Cash Wallet',
    color: '#64748B',
    initials: 'CA',
    type: 'Physical Cash',
    category: 'cash',
    logo: '/providers/cash.svg',
    logoIcon: '/providers/cash.svg',
    logoBg: '#475569',
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

export function getProviderByName(name: string) {
  const normalized = name.trim().toLowerCase();
  return financialProviders.find(
    (p) =>
      p.name.toLowerCase() === normalized ||
      normalized.startsWith(p.name.toLowerCase()),
  );
}

export function resolveAccountProvider(account: {
  provider: string;
  providerId?: string;
}) {
  if (account.providerId) {
    return getProviderById(account.providerId);
  }
  return getProviderByName(account.provider);
}

export function getProviderLogoSrc(
  provider: FinancialProvider,
  size: 'sm' | 'md' | 'lg' = 'md',
): string {
  if (size !== 'lg' && provider.logoIcon) {
    return provider.logoIcon;
  }
  return provider.logo;
}
