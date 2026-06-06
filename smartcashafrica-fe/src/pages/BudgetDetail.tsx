import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { BackLink } from "@/components/ui/BackLink";
import { getBudgetById } from "@/lib/data-helpers";
import { useAppData } from "@/context/AppDataContext";
import { useTranslation } from "@/context/I18nContext";
import { Link } from "react-router-dom";
import { useChartTheme } from "@/hooks/useChartTheme";
import { translateCategory } from "@/lib/i18n/helpers";
import { formatCurrency } from "@/lib/utils";
import { NotFound } from "@/pages/NotFound";

const weeklySpending = [
  { week: "W1", amount: 58_000 },
  { week: "W2", amount: 72_000 },
  { week: "W3", amount: 55_000 },
  { week: "W4", amount: 60_000 },
];

export function BudgetDetail() {
  const { id } = useParams();
  const budget = id ? getBudgetById(id) : undefined;
  const { transactions } = useAppData();
  const { t, intlLocale } = useTranslation();
  const chart = useChartTheme();

  if (!budget) return <NotFound />;

  const categoryTxns = transactions
    .filter(
      (txn) =>
        txn.category.toLowerCase() === budget.category.toLowerCase() &&
        txn.amount < 0,
    )
    .slice(0, 5);

  const remaining = budget.allocated - budget.spent;
  const percent = (budget.spent / budget.allocated) * 100;
  const isWarning = percent > 85;

  return (
    <div className="mx-auto max-w-3xl space-y-8 animate-fade-in">
      <BackLink to="/budgets" label={t("budgets.back")} />

      <Card>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: budget.color }}
              />
              <h1 className="text-3xl font-bold text-navy">
                {translateCategory(t, budget.category)}
              </h1>
            </div>
            <p className="mt-1 text-muted">{t("budgets.monthBudget")}</p>
          </div>
          <Badge variant={isWarning ? "warning" : "success"}>
            {t("budgets.used", { percent: percent.toFixed(0) })}
          </Badge>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-muted">{t("common.allocated")}</p>
            <p className="text-xl font-bold text-navy">
              {formatCurrency(budget.allocated, "FCFA", intlLocale)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted">{t("common.spent")}</p>
            <p className="text-xl font-bold text-navy">
              {formatCurrency(budget.spent, "FCFA", intlLocale)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted">{t("common.remaining")}</p>
            <p className="text-xl font-bold text-primary">
              {formatCurrency(remaining, "FCFA", intlLocale)}
            </p>
          </div>
        </div>

        <ProgressBar
          value={budget.spent}
          max={budget.allocated}
          color={isWarning ? "#F59E0B" : budget.color}
          className="mt-6"
          showLabel
        />
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-navy">
          {t("budgets.weeklySpending")}
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={weeklySpending} barSize={28}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={chart.grid}
            />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fill: chart.tick, fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: chart.tick, fontSize: 12 }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(v: number) =>
                formatCurrency(v, "FCFA", intlLocale)
              }
              contentStyle={chart.tooltip}
            />
            <Bar dataKey="amount" fill={budget.color} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-navy">
          {t("budgets.topTransactions")}
        </h3>
        <div className="mt-4 space-y-3">
          {categoryTxns.length === 0 ? (
            <p className="text-sm text-muted">
              {t("budgets.noCategoryTxns")}
            </p>
          ) : (
            categoryTxns.map((txn) => (
              <Link
                key={txn.id}
                to={`/transactions/${txn.id}`}
                className="flex justify-between text-sm hover:text-primary"
              >
                <span className="text-navy">
                  {txn.description}
                  <span className="ml-2 text-muted">
                    ({translateCategory(t, txn.category)})
                  </span>
                </span>
                <span className="font-medium text-muted">
                  {formatCurrency(Math.abs(txn.amount), "FCFA", intlLocale)}
                </span>
              </Link>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
