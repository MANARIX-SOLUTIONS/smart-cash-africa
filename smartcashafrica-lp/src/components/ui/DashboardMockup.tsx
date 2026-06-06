import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useTranslation } from "@/context/I18nContext";

export function DashboardMockup() {
  const { t } = useTranslation();

  const accounts = [
    { key: "dashboard.bankBalance", value: "1,840,000", color: "bg-accent" },
    { key: "dashboard.wave", value: "245,000", color: "bg-orange-400" },
    { key: "dashboard.orangeMoney", value: "180,000", color: "bg-orange-500" },
    { key: "dashboard.savings", value: "2,020,000", color: "bg-primary" },
  ] as const;

  const goals = [
    { key: "dashboard.emergencyFund", pct: 78 },
    { key: "dashboard.newLaptop", pct: 45 },
  ] as const;

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="pointer-events-none absolute -left-8 top-12 z-10 animate-float rounded-2xl glass p-4 shadow-glass">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
            <Wallet className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <p className="text-xs text-muted">{t("dashboard.waveBalance")}</p>
            <p className="text-sm font-semibold text-navy">245,000 FCFA</p>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -right-6 top-32 z-10 animate-float-slow rounded-2xl glass p-4 shadow-glass"
        style={{ animationDelay: "1s" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light">
            <TrendingUp className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-xs text-muted">{t("dashboard.healthScore")}</p>
            <p className="text-sm font-semibold text-primary">82 / 100</p>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -left-4 bottom-20 z-10 animate-float rounded-2xl glass p-4 shadow-glass"
        style={{ animationDelay: "2s" }}
      >
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-accent" />
          <p className="text-xs font-medium text-navy">
            {t("dashboard.saveTip")}
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-1 shadow-2xl shadow-navy/10">
        <div className="rounded-[20px] bg-gradient-to-br from-surface to-background p-6 lg:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">{t("dashboard.netWorth")}</p>
              <p className="text-3xl font-bold text-navy">4,285,000 FCFA</p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-primary-light px-3 py-1 text-sm font-medium text-primary">
              <ArrowUpRight className="h-4 w-4" />
              +12.4%
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {accounts.map((item) => (
              <div
                key={item.key}
                className="rounded-2xl border border-border/50 bg-card p-4"
              >
                <div className={`mb-2 h-1 w-8 rounded-full ${item.color}`} />
                <p className="text-xs text-muted">{t(item.key)}</p>
                <p className="text-sm font-semibold text-navy">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-border/50 bg-card p-5 lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-navy">
                  {t("dashboard.monthlySpending")}
                </p>
                <span className="text-xs text-muted">
                  {t("dashboard.monthLabel")}
                </span>
              </div>
              <div className="flex h-32 items-end gap-2">
                {[40, 65, 45, 80, 55, 70, 50, 85, 60, 75, 48, 62].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-primary/20 to-primary"
                      style={{ height: `${h}%` }}
                    />
                  ),
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-border/50 bg-card p-5">
                <p className="text-sm font-semibold text-navy">
                  {t("dashboard.savingsGoals")}
                </p>
                <div className="mt-3 space-y-3">
                  {goals.map((goal) => (
                    <div key={goal.key}>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted">{t(goal.key)}</span>
                        <span className="font-medium text-navy">
                          {goal.pct}%
                        </span>
                      </div>
                      <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${goal.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-accent/20 bg-accent-light/50 p-4">
                <div className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <p className="text-xs font-semibold text-navy">
                      {t("dashboard.aiRecommendation")}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {t("dashboard.aiRecommendationText")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-muted">
            <ArrowDownRight className="h-3 w-3 text-error" />
            <span>{t("dashboard.foodTrend")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
