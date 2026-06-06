import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Wallet,
  Target,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { useTranslation } from "@/context/I18nContext";
import { useToast } from "@/context/ToastContext";
import { onboardingProviders } from "@/lib/providers";
import { translateAccountType } from "@/lib/i18n/helpers";
import { cn } from "@/lib/utils";

const stepKeys = [
  "onboarding.welcome",
  "onboarding.accounts",
  "onboarding.goals",
  "onboarding.done",
] as const;

export function Onboarding() {
  const navigate = useNavigate();
  const { user, completeOnboarding } = useAuth();
  const { connectAccount } = useAppData();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [savingsTarget, setSavingsTarget] = useState("20");

  const toggleProvider = (id: string) => {
    setSelectedProviders((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const handleComplete = () => {
    selectedProviders.forEach((providerId) => {
      const p = onboardingProviders.find((item) => item.id === providerId);
      if (!p) return;
      try {
        connectAccount({
          id: p.id,
          name: p.name,
          color: p.color,
          initials: p.initials,
          type: p.type,
        });
      } catch {
        // Already connected from a previous session
      }
    });
    completeOnboarding();
    toast(t("onboarding.welcomeToast"), "success");
    navigate("/dashboard");
  };

  const next = () => setStep((s) => Math.min(s + 1, stepKeys.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const firstName = user?.name.split(" ")[0] ?? "there";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <span className="text-sm font-bold text-white">SC</span>
            </div>
            <span className="font-semibold text-navy">{t("brand.name")}</span>
          </div>
          <div className="flex gap-2">
            {stepKeys.map((key, i) => (
              <div
                key={key}
                className={cn(
                  "h-1.5 w-8 rounded-full transition-colors",
                  i <= step ? "bg-primary" : "bg-border",
                )}
                title={t(key)}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 py-12">
        {step === 0 && (
          <div className="animate-fade-in text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-light">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mt-8 text-3xl font-bold text-navy">
              {t("onboarding.welcomeTitle", { name: firstName })}
            </h1>
            <p className="mt-3 text-muted">{t("onboarding.welcomeSubtitle")}</p>
            <Button className="mt-10" size="lg" onClick={next}>
              {t("onboarding.getStarted")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3">
              <Wallet className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-navy">
                  {t("onboarding.connectTitle")}
                </h1>
                <p className="text-sm text-muted">
                  {t("onboarding.connectSubtitle")}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {onboardingProviders.map((p) => {
                const isSelected = selectedProviders.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => toggleProvider(p.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border p-4",
                      "transition-all text-left",
                      isSelected
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
                    <div className="flex-1">
                      <span className="block font-medium text-navy">
                        {p.name}
                      </span>
                      <span className="text-xs text-muted">
                        {translateAccountType(t, p.type)}
                      </span>
                    </div>
                    {isSelected && <Check className="h-5 w-5 text-primary" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="ghost" onClick={back}>
                <ArrowLeft className="h-4 w-4" />
                {t("common.back")}
              </Button>
              <Button onClick={next} disabled={selectedProviders.length === 0}>
                {t("common.continue")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-navy">
                  {t("onboarding.goalsTitle")}
                </h1>
                <p className="text-sm text-muted">
                  {t("onboarding.goalsSubtitle")}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <Input
                label={t("onboarding.monthlyIncome")}
                type="number"
                placeholder={t("common.placeholders.incomeExample")}
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
              />

              <div>
                <label className="text-sm font-medium text-navy">
                  {t("onboarding.savingsTarget")}
                </label>
                <div className="mt-2 flex gap-2">
                  {["10", "20", "30"].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => setSavingsTarget(pct)}
                      className={cn(
                        "flex-1 rounded-xl border py-3 text-sm font-medium",
                        "transition-all",
                        savingsTarget === pct
                          ? "border-primary bg-primary-light text-primary"
                          : "border-border text-muted hover:border-primary/30",
                      )}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="ghost" onClick={back}>
                <ArrowLeft className="h-4 w-4" />
                {t("common.back")}
              </Button>
              <Button onClick={next} disabled={!monthlyIncome}>
                {t("common.continue")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-light">
              <Check className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mt-8 text-3xl font-bold text-navy">
              {t("onboarding.allSetTitle")}
            </h1>
            <p className="mt-3 text-muted">
              {t("onboarding.allSetSubtitle", {
                count: selectedProviders.length,
              })}
            </p>
            <Button className="mt-10" size="lg" onClick={handleComplete}>
              {t("onboarding.goDashboard")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
