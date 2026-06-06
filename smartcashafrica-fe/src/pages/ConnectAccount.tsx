import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { BackLink } from "@/components/ui/BackLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { useAppData } from "@/context/AppDataContext";
import { useTranslation } from "@/context/I18nContext";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";

const providers = [
  {
    id: "ecobank",
    name: "Ecobank",
    color: "#00A86B",
    initials: "EB",
    type: "Savings Account",
  },
  {
    id: "wave",
    name: "Wave",
    color: "#2563EB",
    initials: "WV",
    type: "Mobile Money",
  },
  {
    id: "orange",
    name: "Orange Money",
    color: "#F59E0B",
    initials: "OM",
    type: "Mobile Money",
  },
  {
    id: "uba",
    name: "UBA",
    color: "#EF4444",
    initials: "UB",
    type: "Current Account",
  },
  {
    id: "boa",
    name: "Bank of Africa",
    color: "#8B5CF6",
    initials: "BO",
    type: "Savings Account",
  },
  {
    id: "cash",
    name: "Cash",
    color: "#64748B",
    initials: "CA",
    type: "Physical Cash",
  },
];

export function ConnectAccount() {
  const navigate = useNavigate();
  const { connectAccount } = useAppData();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const provider = providers.find((p) => p.id === selected);

  const handleConnect = async () => {
    if (!provider) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

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
      toast(t("accounts.connected", { name: provider.name }), "success");
      navigate("/accounts");
    } catch {
      setIsLoading(false);
      toast(t("accounts.alreadyConnected", { name: provider.name }), "info");
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 animate-fade-in">
      <BackLink to="/accounts" label={t("accounts.back")} />

      <PageHeader
        title={t("accounts.connectTitle")}
        subtitle={t("accounts.connectSubtitle")}
      />

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
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {providers.map((p) => (
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
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-xs font-bold text-white"
                  style={{ backgroundColor: p.color }}
                >
                  {p.initials}
                </div>
                <span className="flex-1 font-medium text-navy">{p.name}</span>
                {selected === p.id && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </button>
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
          <h3 className="text-lg font-semibold text-navy">
            {t("accounts.connectProvider", { name: provider.name })}
          </h3>
          <p className="mt-1 text-sm text-muted">{t("accounts.connectDetails")}</p>
          <div className="mt-6 space-y-4">
            <Input
              label={t("common.nickname")}
              placeholder={`My ${provider.name}`}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <Input
              label={t("common.phoneNumber")}
              placeholder="+221 77 000 0000"
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
    </div>
  );
}
