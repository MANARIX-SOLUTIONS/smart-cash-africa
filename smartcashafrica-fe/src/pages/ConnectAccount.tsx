import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Check, Loader2, Link2, PenLine } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { BackLink } from "@/components/ui/BackLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { useAppData } from "@/context/AppDataContext";
import { useTranslation } from "@/context/I18nContext";
import { useToast } from "@/context/ToastContext";
import { ACCOUNT_TYPES } from "@/lib/account-helpers";
import {
  bankProviders,
  cashProviders,
  financialProviders,
  mobileMoneyProviders,
  type FinancialProvider,
  type ProviderCategory,
} from "@/lib/providers";
import { translateAccountType } from "@/lib/i18n/helpers";
import type { AccountType } from "@/types/finance";
import { ProviderLogo } from "@/components/ui/ProviderLogo";
import { cn } from "@/lib/utils";

type AccountMode = "connect" | "create";

const providerGroups: {
  category: ProviderCategory;
  labelKey: string;
  items: FinancialProvider[];
}[] = [
  {
    category: "mobile_money",
    labelKey: "accounts.mobileMoneyGroup",
    items: mobileMoneyProviders,
  },
  { category: "bank", labelKey: "accounts.bankGroup", items: bankProviders },
  { category: "cash", labelKey: "accounts.cashGroup", items: cashProviders },
];

export function ConnectAccount() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMode: AccountMode =
    searchParams.get("mode") === "create" ? "create" : "connect";

  const { connectAccount, createAccount } = useAppData();
  const { toast } = useToast();
  const { t, currencySymbol } = useTranslation();

  const [mode, setMode] = useState<AccountMode>(initialMode);
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("Mobile Money");
  const [initialBalance, setInitialBalance] = useState("");
  const [createPhone, setCreatePhone] = useState("");

  const provider = financialProviders.find((p) => p.id === selected);

  const handleConnect = async () => {
    if (!provider) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const displayName = nickname.trim() || provider.name;

    try {
      connectAccount({
        id: provider.id,
        name: provider.name,
        color: provider.color,
        initials: provider.initials,
        type: provider.type,
        nickname: nickname.trim(),
      });
      setIsLoading(false);
      toast(t("accounts.connected", { name: displayName }), "success");
      navigate("/accounts");
    } catch {
      setIsLoading(false);
      toast(t("accounts.nameAlreadyExists", { name: displayName }), "info");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = accountName.trim();
    if (!name) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    try {
      createAccount({
        name,
        type: accountType,
        initialBalance: initialBalance ? Number(initialBalance) : 0,
        phone: createPhone.trim() || undefined,
      });
      setIsLoading(false);
      toast(t("accounts.created", { name }), "success");
      navigate("/accounts");
    } catch {
      setIsLoading(false);
      toast(t("accounts.nameAlreadyExists", { name }), "info");
    }
  };

  const switchMode = (next: AccountMode) => {
    setMode(next);
    setStep(1);
    setSelected("");
    setIsLoading(false);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 animate-fade-in">
      <BackLink to="/accounts" label={t("accounts.back")} />

      <PageHeader
        title={t("accounts.addAccountTitle")}
        subtitle={t("accounts.addAccountSubtitle")}
      />

      <div className="flex gap-2 rounded-xl bg-surface p-1">
        <button
          type="button"
          onClick={() => switchMode("connect")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5",
            "text-sm font-medium transition-all",
            mode === "connect"
              ? "bg-card text-navy shadow-sm"
              : "text-muted hover:text-navy",
          )}
        >
          <Link2 className="h-4 w-4" />
          {t("accounts.modeConnect")}
        </button>
        <button
          type="button"
          onClick={() => switchMode("create")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5",
            "text-sm font-medium transition-all",
            mode === "create"
              ? "bg-card text-navy shadow-sm"
              : "text-muted hover:text-navy",
          )}
        >
          <PenLine className="h-4 w-4" />
          {t("accounts.modeCreate")}
        </button>
      </div>

      {mode === "connect" && (
        <>
          <div className="flex gap-2">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 flex-1 rounded-full",
                  step >= s ? "bg-primary" : "bg-border",
                )}
              />
            ))}
          </div>

          {step === 1 && (
            <Card>
              <h3 className="text-lg font-semibold text-navy">
                {t("accounts.chooseProvider")}
              </h3>
              <div className="mt-6 space-y-6">
                {providerGroups.map((group) => (
                  <section key={group.category}>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                      {t(group.labelKey)}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {group.items.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setSelected(p.id)}
                          className={cn(
                            "flex items-center gap-3 rounded-xl border p-4 text-left",
                            "transition-all",
                            selected === p.id
                              ? "border-primary bg-primary-light"
                              : "border-border hover:border-primary/30",
                          )}
                        >
                          <ProviderLogo provider={p} size="md" />
                          <div className="flex-1">
                            <span className="block font-medium text-navy">
                              {p.name}
                            </span>
                            <span className="text-xs text-muted">
                              {translateAccountType(t, p.type)}
                            </span>
                          </div>
                          {selected === p.id && (
                            <Check className="h-5 w-5 text-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
              <Button
                className="mt-6 w-full"
                disabled={!selected}
                onClick={() => setStep(2)}
              >
                {t("common.continue")}
              </Button>
            </Card>
          )}

          {step === 2 && provider && (
            <Card>
              <div className="flex items-center gap-3">
                <ProviderLogo provider={provider} size="lg" />
                <div>
                  <h3 className="text-lg font-semibold text-navy">
                    {t("accounts.connectProvider", { name: provider.name })}
                  </h3>
                </div>
              </div>
              <p className="mt-1 text-sm text-muted">
                {t("accounts.connectDetails")}
              </p>
              <div className="mt-6 space-y-4">
                <Input
                  label={t("common.nickname")}
                  placeholder={t("common.nicknameTemplate", {
                    name: provider.name,
                  })}
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <Input
                  label={t("common.phoneNumber")}
                  placeholder={t("common.placeholders.phone")}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>
                  {t("common.back")}
                </Button>
                <Button
                  className="flex-1"
                  disabled={isLoading || !nickname || !phone}
                  onClick={handleConnect}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    t("accounts.connectButton")
                  )}
                </Button>
              </div>
            </Card>
          )}
        </>
      )}

      {mode === "create" && (
        <Card>
          <h3 className="text-lg font-semibold text-navy">
            {t("accounts.createTitle")}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {t("accounts.createSubtitle")}
          </p>

          <form onSubmit={handleCreate} className="mt-6 space-y-5">
            <Input
              label={t("accounts.accountName")}
              placeholder={t("accounts.accountNamePlaceholder")}
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              required
            />

            <div className="space-y-2">
              <p className="text-sm font-medium text-navy">
                {t("accounts.accountType")}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {ACCOUNT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAccountType(type)}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left text-sm",
                      "transition-all",
                      accountType === type
                        ? "border-primary bg-primary-light font-medium text-navy"
                        : "border-border text-muted hover:border-primary/30",
                    )}
                  >
                    {translateAccountType(t, type)}
                  </button>
                ))}
              </div>
            </div>

            <Input
              label={t("accounts.initialBalance", { symbol: currencySymbol })}
              type="number"
              min="0"
              step="1"
              placeholder={t("common.placeholders.amount")}
              hint={t("accounts.initialBalanceHint")}
              value={initialBalance}
              onChange={(e) => setInitialBalance(e.target.value)}
            />

            {accountType === "Mobile Money" && (
              <Input
                label={t("common.phoneNumber")}
                placeholder={t("common.placeholders.phone")}
                value={createPhone}
                onChange={(e) => setCreatePhone(e.target.value)}
              />
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !accountName.trim()}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                t("accounts.createButton")
              )}
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
