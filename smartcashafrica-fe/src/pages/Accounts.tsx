import { useState } from "react";
import { Link } from "react-router-dom";
import {
  RefreshCw,
  Eye,
  Pencil,
  MoreHorizontal,
  Plus,
  Loader2,
  ArrowLeftRight,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { RenameAccountDialog } from "@/components/ui/RenameAccountDialog";
import { useAppData } from "@/context/AppDataContext";
import { useTranslation } from "@/context/I18nContext";
import { useToast } from "@/context/ToastContext";
import { AccountProviderLogo } from "@/components/ui/ProviderLogo";
import {
  translateAccountActivity,
  translateAccountType,
} from "@/lib/i18n/helpers";

export function Accounts() {
  const { accounts, syncAccount, syncAllAccounts, renameAccount } =
    useAppData();
  const { toast } = useToast();
  const { t, formatMoney } = useTranslation();
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [syncingAll, setSyncingAll] = useState(false);
  const [renameId, setRenameId] = useState<string | null>(null);

  const renameTarget = accounts.find((a) => a.id === renameId);

  const handleSync = async (id: string) => {
    setSyncingId(id);
    await syncAccount(id);
    setSyncingId(null);
    toast(t("accounts.synced"), "success");
  };

  const handleSyncAll = async () => {
    setSyncingAll(true);
    await syncAllAccounts();
    setSyncingAll(false);
    toast(t("accounts.allSynced"), "success");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title={t("accounts.title")}
        subtitle={t("accounts.subtitle")}
        action={
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleSyncAll}
              disabled={syncingAll || accounts.length === 0}
            >
              {syncingAll ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              {t("common.syncAll")}
            </Button>
            <Link to="/accounts/connect">
              <Button>
                <Plus className="h-4 w-4" />
                {t("accounts.addAccount")}
              </Button>
            </Link>
          </div>
        }
      />

      {accounts.length === 0 ? (
        <Card className="py-12 text-center">
          <p className="text-muted">{t("accounts.empty")}</p>
          <p className="mt-2 text-sm text-muted">{t("accounts.emptyHint")}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link to="/accounts/connect">
              <Button>{t("accounts.connectFirst")}</Button>
            </Link>
            <Link to="/accounts/connect?mode=create">
              <Button variant="outline">{t("accounts.createFirst")}</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {accounts.map((account) => (
            <Card key={account.id} hover className="group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <AccountProviderLogo account={account} size="lg" />
                  <div>
                    <p className="font-semibold text-navy">
                      {account.nickname ?? account.provider}
                    </p>
                    <p className="text-sm text-muted">
                      {translateAccountType(t, account.type)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setRenameId(account.id)}
                  className="rounded-lg p-1.5 text-muted opacity-0 transition-opacity hover:bg-surface group-hover:opacity-100"
                  aria-label={t("common.openMenu")}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-6 text-3xl font-bold text-navy">
                {formatMoney(account.balance)}
              </p>

              <p className="mt-2 text-sm text-muted">
                {translateAccountActivity(t, account)}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border pt-4">
                <Link to={`/accounts/${account.id}`}>
                  <Button variant="ghost" size="sm" className="w-full">
                    <Eye className="h-4 w-4" />
                    {t("accounts.viewTransactions")}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  disabled={syncingId === account.id}
                  onClick={() => handleSync(account.id)}
                >
                  {syncingId === account.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  {t("common.refresh")}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => setRenameId(account.id)}
                >
                  <Pencil className="h-4 w-4" />
                  {t("common.rename")}
                </Button>
                <Link to="/accounts/connect">
                  <Button variant="ghost" size="sm" className="w-full">
                    <ArrowLeftRight className="h-4 w-4" />
                    {t("common.edit")}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      <RenameAccountDialog
        open={renameId !== null}
        currentName={renameTarget?.nickname ?? renameTarget?.provider ?? ""}
        onClose={() => setRenameId(null)}
        onSave={(name) => {
          if (renameId) {
            renameAccount(renameId, name);
            toast(t("accounts.renamed"), "success");
          }
        }}
      />
    </div>
  );
}
