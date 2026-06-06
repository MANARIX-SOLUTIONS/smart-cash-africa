import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RefreshCw, Pencil, ArrowLeftRight, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BackLink } from "@/components/ui/BackLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { RenameAccountDialog } from "@/components/ui/RenameAccountDialog";
import { useAppData } from "@/context/AppDataContext";
import { useTranslation } from "@/context/I18nContext";
import { useToast } from "@/context/ToastContext";
import {
  translateAccountActivity,
  translateAccountType,
  translateCategory,
} from "@/lib/i18n/helpers";
import { cn, formatCurrency } from "@/lib/utils";
import { NotFound } from "@/pages/NotFound";

export function AccountDetail() {
  const { id } = useParams();
  const {
    getAccountById,
    getTransactionsByAccount,
    syncAccount,
    renameAccount,
  } = useAppData();
  const { toast } = useToast();
  const { t, intlLocale } = useTranslation();
  const [syncing, setSyncing] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);

  const account = id ? getAccountById(id) : undefined;

  if (!account) return <NotFound />;

  const accountTxns = getTransactionsByAccount(account.provider).slice(0, 8);
  const monthIncome = accountTxns
    .filter((tx) => tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);
  const monthExpenses = Math.abs(
    accountTxns
      .filter((tx) => tx.amount < 0)
      .reduce((sum, tx) => sum + tx.amount, 0),
  );

  const handleSync = async () => {
    setSyncing(true);
    await syncAccount(account.id);
    setSyncing(false);
    toast(t("accounts.synced"), "success");
  };

  const stats = [
    { label: t("accounts.incomeMonth"), value: monthIncome || 1_600_000 },
    { label: t("accounts.expensesMonth"), value: monthExpenses || 892_000 },
    {
      label: t("accounts.netChange"),
      value: (monthIncome || 1_600_000) - (monthExpenses || 892_000),
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <BackLink to="/accounts" label={t("accounts.back")} />

      <PageHeader
        title={account.provider}
        subtitle={translateAccountType(t, account.type)}
        action={
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRenameOpen(true)}
            >
              <Pencil className="h-4 w-4" />
              {t("common.rename")}
            </Button>
            <Button size="sm" disabled={syncing} onClick={handleSync}>
              {syncing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              {t("common.sync")}
            </Button>
          </div>
        }
      />

      <Card className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundColor: account.color }}
        />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-lg font-bold text-white"
              style={{ backgroundColor: account.color }}
            >
              {account.initials}
            </div>
            <div>
              <p className="text-4xl font-bold text-navy">
                {formatCurrency(account.balance, "FCFA", intlLocale)}
              </p>
              <p className="mt-1 text-sm text-muted">
                {translateAccountActivity(t, account)}
              </p>
            </div>
          </div>
          <Badge variant="success">{t("accounts.syncedNow")}</Badge>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} padding="md">
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="mt-1 text-xl font-bold text-navy">
              {formatCurrency(stat.value, "FCFA", intlLocale)}
            </p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-navy">
            {t("accounts.recentActivity")}
          </h3>
          <Link
            to="/transactions"
            className="text-sm font-medium text-primary hover:underline"
          >
            {t("common.viewAll")}
          </Link>
        </div>
        <div className="mt-4 divide-y divide-border">
          {accountTxns.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted">
              {t("accounts.noTransactions")}
            </p>
          ) : (
            accountTxns.map((tx) => (
              <Link
                key={tx.id}
                to={`/transactions/${tx.id}`}
                className="flex items-center justify-between py-3 transition-colors hover:bg-surface/50 -mx-2 px-2 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface">
                    <ArrowLeftRight className="h-4 w-4 text-muted" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy">
                      {tx.description}
                    </p>
                    <p className="text-xs text-muted">
                      {translateCategory(t, tx.category)}
                    </p>
                  </div>
                </div>
                <span
                  className={cn(
                    "text-sm font-semibold",
                    tx.amount >= 0 ? "text-success" : "text-navy",
                  )}
                >
                  {tx.amount >= 0 ? "+" : ""}
                  {formatCurrency(Math.abs(tx.amount), "FCFA", intlLocale)}
                </span>
              </Link>
            ))
          )}
        </div>
      </Card>

      <RenameAccountDialog
        open={renameOpen}
        currentName={account.provider}
        onClose={() => setRenameOpen(false)}
        onSave={(name) => {
          renameAccount(account.id, name);
          toast(t("accounts.renamed"), "success");
        }}
      />
    </div>
  );
}
