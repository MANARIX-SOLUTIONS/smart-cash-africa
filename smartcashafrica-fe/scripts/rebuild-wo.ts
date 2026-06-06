import { writeFileSync } from 'fs';
import { fr } from '../src/lib/i18n/fr.ts';

const overrides: Record<string, unknown> = {
  brand: { region: 'Afrik' },
  common: {
    actions: 'Actions',
    save: 'Aar',
    cancel: 'Neenal',
    continue: 'Kontine',
    back: 'Dellu',
    view: 'Gis',
    viewAll: 'Gis lépp',
    export: 'Génn',
    connect: 'Bokk',
    sync: 'Melokaan',
    syncAll: 'Melokaan lépp',
    refresh: 'Yeesal',
    rename: 'Tuddéeti',
    edit: 'Soppi',
    details: 'Xibaar yi',
    search: 'Seet',
    loading: 'Mi ngi yor...',
    justNow: 'Léegi',
    all: 'Lépp',
    optional: 'Bu la neexee',
    premium: 'Premium',
    configure: 'Parametré',
    send: 'Yónnee',
    download: 'Téléchargé',
    create: 'Sos',
    delete: 'Far',
    yes: 'Waaw',
    no: 'Déedéet',
    or: 'wala',
    and: 'ak',
    synced: 'Melokaan na',
    completed: 'Jeex na',
    pending: 'Ci yoon',
    failed: 'Lajj na',
    income: 'Alal bi jot',
    expense: 'Dépense',
    target: 'Xalaat bi',
    remaining: 'Fi des',
    allocated: 'Taxawal',
    spent: 'Joos na',
    saved: 'Aar na',
    category: 'Wàll',
    account: 'Compte',
    date: 'Bés',
    status: 'Melokaan',
    amount: 'Li ëmb',
    email: 'Email',
    password: 'Mot de passe',
    fullName: 'Tur bu mat',
    nickname: 'Tur compte bi',
    phoneNumber: 'Nimero téléphone',
    noResults: 'Amul benn li méngoo ak « {query} »',
    close: 'Tëj',
    openMenu: 'Ubbi menu bi',
    closeMenu: 'Tëj menu bi',
    closeNav: 'Tëj navigation bi',
    expandSidebar: 'Yàgg sidebar bi',
    collapseSidebar: 'Wàññi sidebar bi',
    toggleTheme: 'Soppi melokaan bi',
    quickAdd: 'Yokk bu gaaw',
    notifications: 'Xibaar yi',
    searchPlaceholder: 'Seet transactions, comptes...',
    cmdSearchPlaceholder: 'Seet pages, transactions, comptes...',
    cmdHint: 'Jéema "Wave", "Courses" wala "Budget".',
    placeholders: {
      email: 'email@example.com',
      phone: '+221 77 000 0000',
      amount: '0',
      amountExample: '45000',
      budgetExample: '300000',
      incomeExample: '1 250 000',
      amountMax: '1000000',
    },
    nicknameTemplate: 'Sama {name}',
  },
  greeting: {
    morning: 'Nak ba suba',
    afternoon: 'Nak ba ciign',
    evening: 'Nak ba ciign',
  },
  nav: {
    dashboard: 'Tablo bi',
    accounts: 'Comptes yi',
    myAccounts: 'Sama comptes yi',
    transactions: 'Transactions yi',
    budgets: 'Budgets yi',
    savings: 'Xalaat yu aar',
    health: 'Wérgu-yaram bu xaalis',
    advisor: 'Conseiller IA',
    reports: 'Rapports yi',
    notifications: 'Xibaar yi',
    help: 'Ndimbal',
    settings: 'Paramètres yi',
  },
  auth: {
    welcomeBack: 'Dalal ak jamm',
    signIn: 'Dugg',
    signUp: 'Bindu',
    signOut: 'Génn',
    getStarted: 'Tàmbali',
    createAccount: 'Sos compte',
    createYourAccount: 'Sos sa compte',
    forgotPassword: 'Fatte nga sa mot de passe ?',
    backToSignIn: 'Dellu ci dugg bi',
    backToHome: '← Dellu kër gi',
    noAccount: 'Amuloo compte ?',
    hasAccount: 'Am nga compte ba noppi ?',
    takeControl: 'Saytu',
    yourFinances: 'sa xaalis.',
    supportedProviders: 'Mobile money yi ñu supporté',
  },
  dashboard: {
    linkedAccounts: 'Comptes yi ñu bokk',
    addFirstTransaction: 'Duggal sa transaction bu jëkk',
    overview: 'Lii mooy sa xayma bu xaalis.',
    healthStatus: 'Sa xaalis dafa baax.',
    askAdvisor: 'Laaj Conseiller IA bi',
    netWorth: 'Li nga am lépp',
    monthlyIncome: 'Alal bi jot weer wu',
    monthlyExpenses: 'Dépenses weer wu',
    savingsRate: 'Taux aar',
    healthScore: 'Score wérgu-yaram xaalis',
    recentTransactions: 'Transactions yu bees',
    aiInsights: 'Xibaar IA yi',
    bankAccounts: 'Comptes bancaires',
    mobileMoney: 'Mobile money',
    savings: 'Épargne',
    cash: 'Xaalis ci loxo',
  },
  accounts: {
    title: 'Sama comptes yi',
    addAccount: 'Yokk compte',
    createFirst: 'Sos compte bu la mel',
    connectFirst: 'Bokk sa compte bu jëkk',
    back: 'Dellu ci Comptes yi',
    modeConnect: 'Bokk fournisseur',
    modeCreate: 'Sos compte',
    createButton: 'Sos compte bi',
    created: '{name} sos na bu baax',
  },
  onboarding: {
    languageTitle: 'Tann sa làkk',
    languageSubtitle:
      'Wolof la ñu laaj ci Senegaal. Man nga ko soppi saa yu la neexee.',
    welcomeTitle: 'Dalal ak jamm, {name}!',
    welcomeSubtitle:
      'Nu taxawal sa kër bu xaalis ci 2 simili. Dina ñu la dimbali bokk sa comptes, def sa xalaat yi, am xibaar IA.',
    getStarted: 'Tàmbali',
  },
  settings: {
    languageDesc:
      'SmartCash am na ci français, anglais ak wolof. Bés yi ak xaalis yi topp sa locale.',
    languageSenegalHint:
      'Wolof la ñu tànn ci Senegaal. Tann beneen làkk bu la neexee.',
    currency: 'Devise',
    currencyDesc:
      'Tann devise bi ngir wone soldes, budgets ak transactions yi.',
    currencySet: 'Devise bi taxaw na ci {currency}',
    currencyCount: '{count} devise yu Afrik ñu man a tann',
    currencySearch: 'Seet devise...',
    currencyNoResults: 'Amul devise bu méngoo ak « {query} »',
    currencyGroups: {
      westAfrica: "Afrique de l'Ouest",
      centralAfrica: 'Afrique centrale',
      northAfrica: 'Afrique du Nord',
      eastAfrica: "Afrique de l'Est",
      southernAfrica: 'Afrique australe',
      islands: 'Îles océan Indien',
    },
    themeDesc:
      'Tann melokaanu SmartCash. Système bi topp preferences appareil bi.',
    languages: { fr: 'Français', en: 'English', wo: 'Wolof' },
  },
  transactions: {
    add: 'Yokk transaction',
    addTitle: 'Transaction bu bees',
    amountLabel: 'Li ëmb ({symbol})',
    quickAmounts: 'Montants yu gaaw',
    addAnother: 'Yokk beneen gannaaw bi nga aar',
    requiredFields: 'Dugal lépp lu laaj',
    invalidAmount: 'Dugal montant bu baax bu ëpp 0',
    noAccountsTitle: 'Amul compte',
    noAccountsDesc: 'Bokk wala sos compte bala nga duggal transactions.',
    noAccountsCta: 'Yokk compte',
  },
  help: {
    faq5a:
      'SmartCash Africa daf na 41 devise yu Afrik — FCFA (XOF/XAF), Naira, Rand, Shilling, Dirham, ak yeneen. Tann sa devise ci Paramètres → Devise.',
  },
  reports: {
    generatedBy: 'Généré ci SmartCash Africa',
    periodLabel: 'Période',
    formatLabel: 'Format',
    periods: { june2026: 'Suwe 2026', q22026: 'T2 2026' },
  },
  export: {
    headers: {
      date: 'Bés',
      description: 'Melokaan',
      category: 'Wàll',
      account: 'Compte',
      amount: 'Li ëmb',
      status: 'Melokaan',
    },
  },
  notifications: {
    time: {
      justNow: 'Léegi',
      hoursAgo_one: '{count} waxtu ci gannaaw',
      hoursAgo_other: '{count} waxtu ci gannaaw',
      daysAgo_one: '{count} bés ci gannaaw',
      daysAgo_other: '{count} bés ci gannaaw',
    },
  },
  months: {
    jan: 'Sam',
    feb: 'Few',
    mar: 'Mar',
    apr: 'Awr',
    may: 'Me',
    jun: 'Suwe',
    jul: 'Sul',
    aug: 'Ut',
    sep: 'Satt',
    oct: 'Tub',
    nov: 'Wer',
    dec: 'Gis',
  },
};

function deepMerge(
  base: Record<string, unknown>,
  patch: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(patch)) {
    if (
      v &&
      typeof v === 'object' &&
      !Array.isArray(v) &&
      typeof out[k] === 'object' &&
      out[k]
    ) {
      out[k] = deepMerge(
        out[k] as Record<string, unknown>,
        v as Record<string, unknown>,
      );
    } else {
      out[k] = v;
    }
  }
  return out;
}

function toTsValue(v: unknown, indent: number): string {
  if (typeof v === 'string') {
    return `'${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
  }
  const pad = ' '.repeat(indent);
  const inner = Object.entries(v as Record<string, unknown>)
    .map(([k, val]) => `${pad}${k}: ${toTsValue(val, indent + 2)},`)
    .join('\n');
  return `{\n${inner}\n${' '.repeat(indent - 2)}}`;
}

const wo = deepMerge(fr as Record<string, unknown>, overrides);
writeFileSync(
  './src/lib/i18n/wo.ts',
  `import type { Messages } from './en';\n\nexport const wo: Messages = ${toTsValue(wo, 2)};\n`,
);
console.log('wo rebuilt');
