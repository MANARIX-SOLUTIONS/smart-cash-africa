import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { AddBudgetModal } from "@/components/ui/AddBudgetModal";
import { useAppData } from "@/context/AppDataContext";
import { useTranslation } from "@/context/I18nContext";
import { budgetAnalytics } from "@/lib/mock-data";
import { enrichBudget } from "@/lib/budget-helpers";
import { useChartTheme } from "@/hooks/useChartTheme";
import { translateCategory, translateMonth } from "@/lib/i18n/helpers";
import { cn } from "@/lib/utils";

function getBudgetStatus(percent: number) {
  if (percent > 100) return "over" as const;
  if (percent > 90) return "warning" as const;
  return "onTrack" as const;
}

const statusConfig = {
  onTrack: { icon: CheckCircle2, variant: "success" as const },
  warning: { icon: AlertTriangle, variant: "warning" as const },
  over: { icon: AlertTriangle, variant: "error" as const },
};

export function Budgets() {
  const { budgets, transactions } = useAppData();
  const { t, formatMoney } = useTranslation();
  const chart = useChartTheme();
  const [addOpen, setAddOpen] = useState(false);

  const enriched = useMemo(
    () => budgets.map((b) => enrichBudget(b, transactions)),
    [budgets, transactions],
  );

  const totalAllocated = enriched.reduce((s, b) => s + b.allocated, 0);
  const totalSpent = enriched.reduce((s, b) => s + b.spent, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title={t("budgets.title")}
        subtitle={t("budgets.subtitle")}
        action={
          <Button onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4" />
            {t("budgets.addCategory")}
          </Button>
        }
      />

      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted">{t("budgets.totalBudget")}</p>
            <p className="text-2xl font-bold text-navy">
              {formatMoney(totalAllocated)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted">{t("budgets.totalSpent")}</p>
            <p className="text-2xl font-bold text-navy">
              {formatMoney(totalSpent)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted">{t("budgets.remaining")}</p>
            <p className="text-2xl font-bold text-primary">
              {formatMoney(totalAllocated - totalSpent)}
            </p>
          </div>
        </div>
        <ProgressBar value={totalSpent} max={totalAllocated} className="mt-4" />
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {enriched.map((budget) => {
          const remaining = budget.allocated - budget.spent;
          const percent = (budget.spent / budget.allocated) * 100;
          const status = getBudgetStatus(percent);
          const StatusIcon = statusConfig[status].icon;

          return (
            <Link key={budget.id} to={`/budgets/${budget.id}`}>
              <Card hover className="h-full">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: budget.color }}
                    />
                    <h3 className="text-lg font-semibold text-navy">
                      {translateCategory(t, budget.category)}
                    </h3>
                  </div>
                  <Badge variant={statusConfig[status].variant}>
                    <StatusIcon className="mr-1 inline h-3 w-3" />
                    {t(`budgets.status.${status}`)}
                  </Badge>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">{t("common.allocated")}</span>
                    <span className="font-medium text-navy">
                      {formatMoney(budget.allocated)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">{t("common.spent")}</span>
                    <span className="font-medium text-navy">
                      {formatMoney(budget.spent)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">{t("common.remaining")}</span>
                    <span
                      className={cn(
                        "font-medium",
                        status !== "onTrack" ? "text-warning" : "text-primary",
                      )}
                    >
                      {formatMoney(remaining)}
                    </span>
                  </div>
                </div>

                <ProgressBar
                  value={budget.spent}
                  max={budget.allocated}
                  color={status !== "onTrack" ? "#F59E0B" : budget.color}
                  className="mt-4"
                  showLabel
                />
              </Card>
            </Link>
          );
        })}
      </div>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-navy">
            {t("budgets.analytics")}
          </h2>
          <p className="mt-1 text-sm text-muted">{t("budgets.analyticsSub")}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-navy">
                {t("budgets.monthlyTrends")}
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={budgetAnalytics.monthlyTrends} barGap={4}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={chart.grid}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: chart.tick, fontSize: 12 }}
                  tickFormatter={(m) => translateMonth(t, m)}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: chart.tick, fontSize: 12 }}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: number) =>
                    formatMoney(value)
                  }
                  contentStyle={chart.tooltip}
                />
                <Legend />
                <Bar
                  dataKey="allocated"
                  name={t("common.allocated")}
                  fill="#E2E8F0"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="spent"
                  name={t("common.spent")}
                  fill="#00A86B"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-navy">
              {t("budgets.predictions")}
            </h3>
            <p className="mt-1 text-sm text-muted">
              {t("budgets.predictionsSub")}
            </p>
            <div className="mt-6 space-y-4">
              {budgetAnalytics.predictions.map((item) => {
                const overBudget = item.predicted > item.allocated;
                return (
                  <div key={item.category}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="font-medium text-navy">
                        {translateCategory(t, item.category)}
                      </span>
                      <span
                        className={cn(
                          "font-medium",
                          overBudget ? "text-warning" : "text-primary",
                        )}
                      >
                        {formatMoney(item.predicted)}
                      </span>
                    </div>
                    <ProgressBar
                      value={item.predicted}
                      max={item.allocated}
                      color={overBudget ? "#F59E0B" : "#00A86B"}
                    />
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </section>

      <AddBudgetModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}
