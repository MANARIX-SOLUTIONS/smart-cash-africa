import { useState } from "react";
import { Link } from "react-router-dom";
import {
  RefreshCw,
  Eye,
  Pencil,
  MoreHorizontal,
  Plus,
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { RenameAccountDialog } from "@/components/ui/RenameAccountDialog";
import { useAppData } from "@/context/AppDataContext";
import { useTranslation } from "@/context/I18nContext";
import { useToast } from "@/context/ToastContext";
import {
  translateAccountActivity,
  translateAccountType,
} from "@/lib/i18n/helpers";
import { formatCurrency } from "@/lib/utils";

export function Accounts() {
  const { accounts, syncAccount, syncAllAccounts, renameAccount } =
    useAppData();
  const { toast } = useToast();
  const { t, intlLocale } = useTranslation();
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
                {t("common.connect")}
              </Button>
            </Link>
          </div>
        }
      />

      {accounts.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-muted">{t("accounts.empty")}</p>
          <Link to="/accounts/connect" className="mt-4 inline-block">
            <Button>{t("accounts.connectFirst")}</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {accounts.map((account) => (
            <Card key={account.id} hover className="group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{ backgroundColor: account.color }}
                  >
                    {account.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-navy">
                      {account.provider}
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
                {formatCurrency(account.balance, "FCFA", intlLocale)}
              </p>

              <p className="mt-2 text-sm text-muted">
                {translateAccountActivity(t, account)}
              </p>

              <div className="mt-4 flex gap-2 border-t border-border pt-4">
                <Link to={`/accounts/${account.id}`} className="flex-1">
                  <Button variant="ghost" size="sm" className="w-full">
                    <Eye className="h-4 w-4" />
                    {t("common.details")}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1"
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
                  className="flex-1"
                  onClick={() => setRenameId(account.id)}
                >
                  <Pencil className="h-4 w-4" />
                  {t("common.rename")}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <RenameAccountDialog
        open={renameId !== null}
        currentName={renameTarget?.provider ?? ""}
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
