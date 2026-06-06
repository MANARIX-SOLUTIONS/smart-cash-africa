export interface CurrencyDefinition {
  code: string;
  symbol: string;
  decimals: number;
  /** Use suffix label instead of Intl currency style */
  suffixLabel?: boolean;
  regionKey: string;
  groupKey: string;
}

export const DEFAULT_CURRENCY = 'XOF';

export const CURRENCY_GROUPS = [
  'westAfrica',
  'centralAfrica',
  'northAfrica',
  'eastAfrica',
  'southernAfrica',
  'islands',
] as const;

export type CurrencyGroup = (typeof CURRENCY_GROUPS)[number];

export const CURRENCY_OPTIONS: CurrencyDefinition[] = [
  // West Africa
  {
    code: 'XOF',
    symbol: 'FCFA',
    decimals: 0,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.uemoa',
    groupKey: 'settings.currencyGroups.westAfrica',
  },
  {
    code: 'NGN',
    symbol: '₦',
    decimals: 2,
    regionKey: 'settings.currencyRegions.nigeria',
    groupKey: 'settings.currencyGroups.westAfrica',
  },
  {
    code: 'GHS',
    symbol: '₵',
    decimals: 2,
    regionKey: 'settings.currencyRegions.ghana',
    groupKey: 'settings.currencyGroups.westAfrica',
  },
  {
    code: 'GMD',
    symbol: 'GMD',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.gambia',
    groupKey: 'settings.currencyGroups.westAfrica',
  },
  {
    code: 'GNF',
    symbol: 'GNF',
    decimals: 0,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.guinea',
    groupKey: 'settings.currencyGroups.westAfrica',
  },
  {
    code: 'SLE',
    symbol: 'SLE',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.sierraLeone',
    groupKey: 'settings.currencyGroups.westAfrica',
  },
  {
    code: 'LRD',
    symbol: 'LRD',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.liberia',
    groupKey: 'settings.currencyGroups.westAfrica',
  },
  {
    code: 'CVE',
    symbol: 'CVE',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.capeVerde',
    groupKey: 'settings.currencyGroups.westAfrica',
  },
  {
    code: 'STN',
    symbol: 'STN',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.saoTome',
    groupKey: 'settings.currencyGroups.westAfrica',
  },
  // Central Africa
  {
    code: 'XAF',
    symbol: 'FCFA',
    decimals: 0,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.cemac',
    groupKey: 'settings.currencyGroups.centralAfrica',
  },
  {
    code: 'CDF',
    symbol: 'CDF',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.drc',
    groupKey: 'settings.currencyGroups.centralAfrica',
  },
  {
    code: 'AOA',
    symbol: 'AOA',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.angola',
    groupKey: 'settings.currencyGroups.centralAfrica',
  },
  // North Africa
  {
    code: 'MAD',
    symbol: 'MAD',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.morocco',
    groupKey: 'settings.currencyGroups.northAfrica',
  },
  {
    code: 'DZD',
    symbol: 'DZD',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.algeria',
    groupKey: 'settings.currencyGroups.northAfrica',
  },
  {
    code: 'TND',
    symbol: 'TND',
    decimals: 3,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.tunisia',
    groupKey: 'settings.currencyGroups.northAfrica',
  },
  {
    code: 'EGP',
    symbol: 'EGP',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.egypt',
    groupKey: 'settings.currencyGroups.northAfrica',
  },
  {
    code: 'LYD',
    symbol: 'LYD',
    decimals: 3,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.libya',
    groupKey: 'settings.currencyGroups.northAfrica',
  },
  {
    code: 'MRU',
    symbol: 'MRU',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.mauritania',
    groupKey: 'settings.currencyGroups.northAfrica',
  },
  {
    code: 'SDG',
    symbol: 'SDG',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.sudan',
    groupKey: 'settings.currencyGroups.northAfrica',
  },
  // East Africa
  {
    code: 'KES',
    symbol: 'KSh',
    decimals: 2,
    regionKey: 'settings.currencyRegions.kenya',
    groupKey: 'settings.currencyGroups.eastAfrica',
  },
  {
    code: 'TZS',
    symbol: 'TSh',
    decimals: 2,
    regionKey: 'settings.currencyRegions.tanzania',
    groupKey: 'settings.currencyGroups.eastAfrica',
  },
  {
    code: 'UGX',
    symbol: 'UGX',
    decimals: 0,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.uganda',
    groupKey: 'settings.currencyGroups.eastAfrica',
  },
  {
    code: 'RWF',
    symbol: 'RWF',
    decimals: 0,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.rwanda',
    groupKey: 'settings.currencyGroups.eastAfrica',
  },
  {
    code: 'BIF',
    symbol: 'BIF',
    decimals: 0,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.burundi',
    groupKey: 'settings.currencyGroups.eastAfrica',
  },
  {
    code: 'ETB',
    symbol: 'ETB',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.ethiopia',
    groupKey: 'settings.currencyGroups.eastAfrica',
  },
  {
    code: 'ERN',
    symbol: 'ERN',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.eritrea',
    groupKey: 'settings.currencyGroups.eastAfrica',
  },
  {
    code: 'DJF',
    symbol: 'DJF',
    decimals: 0,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.djibouti',
    groupKey: 'settings.currencyGroups.eastAfrica',
  },
  {
    code: 'SOS',
    symbol: 'SOS',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.somalia',
    groupKey: 'settings.currencyGroups.eastAfrica',
  },
  {
    code: 'SSP',
    symbol: 'SSP',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.southSudan',
    groupKey: 'settings.currencyGroups.eastAfrica',
  },
  {
    code: 'MGA',
    symbol: 'MGA',
    decimals: 0,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.madagascar',
    groupKey: 'settings.currencyGroups.eastAfrica',
  },
  // Southern Africa
  {
    code: 'ZAR',
    symbol: 'R',
    decimals: 2,
    regionKey: 'settings.currencyRegions.southAfrica',
    groupKey: 'settings.currencyGroups.southernAfrica',
  },
  {
    code: 'BWP',
    symbol: 'BWP',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.botswana',
    groupKey: 'settings.currencyGroups.southernAfrica',
  },
  {
    code: 'NAD',
    symbol: 'NAD',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.namibia',
    groupKey: 'settings.currencyGroups.southernAfrica',
  },
  {
    code: 'ZMW',
    symbol: 'ZMW',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.zambia',
    groupKey: 'settings.currencyGroups.southernAfrica',
  },
  {
    code: 'MWK',
    symbol: 'MWK',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.malawi',
    groupKey: 'settings.currencyGroups.southernAfrica',
  },
  {
    code: 'MZN',
    symbol: 'MZN',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.mozambique',
    groupKey: 'settings.currencyGroups.southernAfrica',
  },
  {
    code: 'ZWG',
    symbol: 'ZWG',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.zimbabwe',
    groupKey: 'settings.currencyGroups.southernAfrica',
  },
  {
    code: 'SZL',
    symbol: 'SZL',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.eswatini',
    groupKey: 'settings.currencyGroups.southernAfrica',
  },
  {
    code: 'LSL',
    symbol: 'LSL',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.lesotho',
    groupKey: 'settings.currencyGroups.southernAfrica',
  },
  // Islands
  {
    code: 'MUR',
    symbol: 'MUR',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.mauritius',
    groupKey: 'settings.currencyGroups.islands',
  },
  {
    code: 'SCR',
    symbol: 'SCR',
    decimals: 2,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.seychelles',
    groupKey: 'settings.currencyGroups.islands',
  },
  {
    code: 'KMF',
    symbol: 'KMF',
    decimals: 0,
    suffixLabel: true,
    regionKey: 'settings.currencyRegions.comoros',
    groupKey: 'settings.currencyGroups.islands',
  },
];

export type CurrencyCode = (typeof CURRENCY_OPTIONS)[number]['code'];

const currencyCodes = new Set(CURRENCY_OPTIONS.map((c) => c.code));

export function isCurrencyCode(value: string): value is CurrencyCode {
  return currencyCodes.has(value);
}

export function getCurrencyDefinition(code: string): CurrencyDefinition {
  return CURRENCY_OPTIONS.find((c) => c.code === code) ?? CURRENCY_OPTIONS[0];
}

export function getCurrenciesByGroup(groupKey: string): CurrencyDefinition[] {
  return CURRENCY_OPTIONS.filter((c) => c.groupKey === groupKey);
}

export function formatCurrencyAmount(
  amount: number,
  currency: CurrencyDefinition,
  intlLocale: string,
): string {
  const abs = Math.abs(amount);
  const formatted = new Intl.NumberFormat(intlLocale, {
    style: 'decimal',
    maximumFractionDigits: currency.decimals,
    minimumFractionDigits: 0,
  }).format(abs);

  if (currency.suffixLabel) {
    const value = `${formatted} ${currency.symbol}`;
    return amount < 0 ? `-${value}` : value;
  }

  try {
    const value = new Intl.NumberFormat(intlLocale, {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: currency.decimals,
    }).format(amount);
    return value;
  } catch {
    const value = `${formatted} ${currency.symbol}`;
    return amount < 0 ? `-${value}` : value;
  }
}
