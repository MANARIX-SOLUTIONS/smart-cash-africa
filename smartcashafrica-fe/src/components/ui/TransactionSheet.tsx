import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Loader2,
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
} from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { useAppData } from '@/context/AppDataContext';
import { useTranslation } from '@/context/I18nContext';
import { getAccountDisplayName } from '@/lib/account-helpers';
import { getCurrencyDefinition } from '@/lib/currencies';
import { translateCategory } from '@/lib/i18n/helpers';
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  QUICK_AMOUNTS_DECIMAL,
  QUICK_AMOUNTS_ZERO_DECIMAL,
} from '@/lib/transaction-categories';
import { cn } from '@/lib/utils';

export type TransactionType = 'income' | 'expense';

interface AddTransactionSheetProps {
  open: boolean;
  initialType?: TransactionType;
  onClose: () => void;
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function AddTransactionSheet({
  open,
  initialType = 'expense',
  onClose,
}: AddTransactionSheetProps) {
  const { accounts, addTransaction, preferences } = useAppData();
  const { toast } = useToast();
  const { t, formatMoney } = useTranslation();
  const currencyDef = getCurrencyDefinition(preferences.currency);

  const [txType, setTxType] = useState<TransactionType>(initialType);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(todayIso());
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [addAnother, setAddAnother] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const categories =
    txType === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const quickAmounts =
    currencyDef.decimals === 0
      ? QUICK_AMOUNTS_ZERO_DECIMAL
      : QUICK_AMOUNTS_DECIMAL;

  useEffect(() => {
    if (!open) return;
    setTxType(initialType);
    setDescription('');
    setAmount('');
    setDate(todayIso());
    setCategory('');
    setAccount(accounts[0]?.provider ?? '');
    setFormError('');
    setAddAnother(false);
  }, [open, initialType, accounts]);

  useEffect(() => {
    setCategory('');
  }, [txType]);

  const amountLabel = useMemo(
    () => t('transactions.amountLabel', { symbol: currencyDef.symbol }),
    [t, currencyDef.symbol],
  );

  if (!open) return null;

  const resetForm = (keepType = true) => {
    setDescription('');
    setAmount('');
    setDate(todayIso());
    setCategory('');
    setFormError('');
    if (!keepType) setTxType(initialType);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!description.trim() || !amount || !category || !account) {
      setFormError(t('transactions.requiredFields'));
      return;
    }

    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setFormError(t('transactions.invalidAmount'));
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    addTransaction({
      type: txType,
      description: description.trim(),
      amount: numericAmount,
      category,
      account,
      date,
    });
    setIsLoading(false);
    toast(
      t('transactions.recorded', {
        type: t(txType === 'income' ? 'common.income' : 'common.expense'),
        amount: formatMoney(numericAmount),
      }),
      'success',
    );

    if (addAnother) {
      resetForm(true);
      return;
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-overlay backdrop-blur-sm"
        onClick={onClose}
        aria-label={t('common.close')}
      />
      <div
        className={cn(
          'relative flex max-h-[92vh] w-full max-w-lg flex-col',
          'rounded-t-2xl bg-card shadow-2xl animate-slide-up sm:rounded-2xl',
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-xl font-semibold text-navy">
            {t('transactions.addTitle')}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted hover:bg-surface"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-4">
          <div
            className={cn(
              'mb-5 grid grid-cols-2 gap-2 rounded-xl',
              'border border-border bg-surface p-1',
            )}
          >
            {(['expense', 'income'] as const).map((type) => {
              const Icon = type === 'income' ? ArrowDownLeft : ArrowUpRight;
              const active = txType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTxType(type)}
                  className={cn(
                    'flex items-center justify-center gap-2 rounded-lg',
                    'px-3 py-2.5 text-sm font-medium transition-all',
                    active
                      ? type === 'income'
                        ? 'bg-success/15 text-success shadow-sm'
                        : 'bg-error/15 text-error shadow-sm'
                      : 'text-muted hover:text-navy',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {t(
                    type === 'income'
                      ? 'transactions.addIncome'
                      : 'transactions.addExpense',
                  )}
                </button>
              );
            })}
          </div>

          {accounts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-6 text-center">
              <div
                className={cn(
                  'mx-auto mb-3 flex h-12 w-12 items-center',
                  'justify-center rounded-xl bg-primary-light text-primary',
                )}
              >
                <Wallet className="h-6 w-6" />
              </div>
              <p className="font-medium text-navy">
                {t('transactions.noAccountsTitle')}
              </p>
              <p className="mt-1 text-sm text-muted">
                {t('transactions.noAccountsDesc')}
              </p>
              <Link
                to="/accounts/connect"
                onClick={onClose}
                className="mt-4 inline-flex"
              >
                <Button type="button">{t('transactions.noAccountsCta')}</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label={t('common.description')}
                placeholder={t('transactions.descPlaceholder')}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoFocus
              />

              <div className="space-y-2">
                <Input
                  label={amountLabel}
                  type="number"
                  inputMode="decimal"
                  placeholder={t('common.placeholders.amountExample')}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  step={currencyDef.decimals === 0 ? '1' : '0.01'}
                />
                <div>
                  <p className="mb-2 text-xs font-medium text-muted">
                    {t('transactions.quickAmounts')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickAmounts.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setAmount(String(value))}
                        className={cn(
                          'rounded-full border px-3 py-1 text-xs font-medium',
                          'transition-all hover:border-primary/40',
                          Number(amount) === value
                            ? 'border-primary bg-primary-light text-primary'
                            : 'border-border text-muted',
                        )}
                      >
                        {formatMoney(value)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Input
                label={t('common.date')}
                type="date"
                value={date}
                max={todayIso()}
                onChange={(e) => setDate(e.target.value)}
              />

              <div>
                <label className="text-sm font-medium text-navy">
                  {t('common.category')}
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={cn(
                        'rounded-full border px-3 py-1.5 text-xs font-medium',
                        'transition-all',
                        category === cat
                          ? 'border-primary bg-primary-light text-primary'
                          : 'border-border text-muted hover:border-primary/30',
                      )}
                    >
                      {translateCategory(t, cat)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-navy">
                  {t('common.account')}
                </label>
                <div className="mt-2 space-y-2">
                  {accounts.map((a) => {
                    const selected = account === a.provider;
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => setAccount(a.provider)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-xl',
                          'border p-3 text-left transition-all',
                          selected
                            ? 'border-primary bg-primary-light/50'
                            : 'border-border hover:border-primary/30',
                        )}
                      >
                        <div
                          className={cn(
                            'flex h-10 w-10 shrink-0 items-center',
                            'justify-center rounded-xl text-sm font-bold',
                            'text-white',
                          )}
                          style={{ backgroundColor: a.color }}
                        >
                          {a.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-navy">
                            {getAccountDisplayName(a)}
                          </p>
                          <p className="text-xs text-muted">{a.type}</p>
                        </div>
                        <p className="text-sm font-semibold text-navy">
                          {formatMoney(a.balance)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <label
                className={cn(
                  'flex cursor-pointer items-center gap-2',
                  'text-sm text-muted',
                )}
              >
                <input
                  type="checkbox"
                  checked={addAnother}
                  onChange={(e) => setAddAnother(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary"
                />
                {t('transactions.addAnother')}
              </label>

              {formError && (
                <p className="text-sm text-error" role="alert">
                  {formError}
                </p>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : txType === 'income' ? (
                  t('transactions.saveIncome')
                ) : (
                  t('transactions.saveExpense')
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/** @deprecated Use AddTransactionSheet via useAddTransaction */
export function TransactionSheet({
  open,
  type,
  onClose,
}: {
  open: boolean;
  type: TransactionType;
  onClose: () => void;
}) {
  return (
    <AddTransactionSheet open={open} initialType={type} onClose={onClose} />
  );
}
