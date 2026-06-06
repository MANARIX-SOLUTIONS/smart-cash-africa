import { useState } from "react";
import { useParams } from "react-router-dom";
import { Sparkles, Plus, TrendingUp, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { BackLink } from "@/components/ui/BackLink";
import { useAppData } from "@/context/AppDataContext";
import { useToast } from "@/context/ToastContext";
import { useTranslation } from "@/context/I18nContext";
import { translateSavingsTip } from "@/lib/i18n/helpers";
import { formatCurrency } from "@/lib/utils";
import { NotFound } from "@/pages/NotFound";

export function SavingsGoalDetail() {
  const { id } = useParams();
  const { getSavingsGoalById, addContribution } = useAppData();
  const { toast } = useToast();
  const { t, intlLocale } = useTranslation();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [contributions, setContributions] = useState<
    { date: string; amount: number }[]
  >([
    { date: "Jun 5, 2026", amount: 50_000 },
    { date: "Jun 1, 2026", amount: 50_000 },
    { date: "May 28, 2026", amount: 75_000 },
    { date: "May 15, 2026", amount: 50_000 },
  ]);

  const goal = id ? getSavingsGoalById(id) : undefined;

  if (!goal) return <NotFound />;

  const progress = (goal.current / goal.target) * 100;
  const remaining = goal.target - goal.current;
  const monthly = goal.monthlyContribution ?? 50_000;

  const handleContribution = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = Number(amount);
    if (!value || value <= 0) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    addContribution(goal.id, value);
    setContributions((prev) => [
      {
        date: new Date().toLocaleDateString(intlLocale, {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        amount: value,
      },
      ...prev,
    ]);
    setAmount("");
    setIsLoading(false);
    toast(
      t("savings.added", {
        amount: formatCurrency(value, "FCFA", intlLocale),
        name: goal.name,
      }),
      "success",
    );
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 animate-fade-in">
      <BackLink to="/savings" label={t("savings.back")} />

      <Card>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-surface text-4xl">
            {goal.emoji}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-navy">{goal.name}</h1>
            <p className="mt-1 text-muted">
              {t("savings.targetLabel", {
                amount: formatCurrency(goal.target, "FCFA", intlLocale),
              })}
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <div>
                <p className="text-xs text-muted">{t("common.saved")}</p>
                <p className="text-lg font-bold text-primary">
                  {formatCurrency(goal.current, "FCFA", intlLocale)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">{t("common.remaining")}</p>
                <p className="text-lg font-bold text-navy">
                  {formatCurrency(remaining, "FCFA", intlLocale)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">{t("common.predicted")}</p>
                <p className="text-lg font-bold text-navy">
                  {goal.predictedDate}
                </p>
              </div>
            </div>
          </div>
          <div className="relative shrink-0">
            <ProgressRing value={progress} size={100} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-navy">
                {progress.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
        <ProgressBar value={goal.current} max={goal.target} className="mt-6" />
      </Card>

      <Card className="border-primary/20 bg-gradient-to-br from-primary-light/40 to-card">
        <div className="flex gap-3">
          <Sparkles className="h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium text-primary">
              {t("savings.aiRecommendation")}
            </p>
            <p className="mt-1 text-sm text-navy">
              {translateSavingsTip(t, goal)}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-navy">
              {t("savings.monthlyContrib")}
            </h3>
          </div>
          <p className="mt-2 text-2xl font-bold text-navy">
            {formatCurrency(monthly, "FCFA", intlLocale)}
          </p>
          <p className="text-sm text-muted">{t("savings.stayOnTrack")}</p>
          <form onSubmit={handleContribution} className="mt-4 space-y-3">
            <Input
              label={t("savings.contribAmount")}
              type="number"
              placeholder="50000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !amount || goal.current >= goal.target}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  {t("savings.addContribution")}
                </>
              )}
            </Button>
          </form>
        </Card>

        <Card>
          <h3 className="font-semibold text-navy">
            {t("savings.recentContribs")}
          </h3>
          <div className="mt-4 space-y-3">
            {contributions.map((c) => (
              <div
                key={`${c.date}-${c.amount}`}
                className="flex justify-between text-sm"
              >
                <span className="text-muted">{c.date}</span>
                <span className="font-medium text-success">
                  +{formatCurrency(c.amount, "FCFA", intlLocale)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
