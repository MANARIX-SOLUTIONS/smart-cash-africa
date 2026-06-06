import { Link } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Sparkles,
  ArrowRight,
  Calendar,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { MiniSparkline } from "@/components/charts/MiniSparkline";
import {
  summaryCards,
  cashDistribution,
  monthlySpending,
  categorySpending,
  aiInsight,
} from "@/lib/mock-data";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { useTranslation } from "@/context/I18nContext";
import { useChartTheme } from "@/hooks/useChartTheme";
import {
  translateCashDist,
  translateCategory,
  translateMonth,
  translateSummaryCard,
} from "@/lib/i18n/helpers";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";

const iconMap = {
  wallet: Wallet,
  "trending-up": TrendingUp,
  "trending-down": TrendingDown,
  "piggy-bank": PiggyBank,
};

export function Dashboard() {
  const { user } = useAuth();
  const { transactions } = useAppData();
  const { t, greeting, intlLocale } = useTranslation();
  const recentTxns = transactions.slice(0, 5);
  const chart = useChartTheme();
  const firstName = user?.name.split(" ")[0] ?? "there";
  const today = new Date().toLocaleDateString(intlLocale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <Calendar className="h-4 w-4" />
              {today}
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-navy sm:text-[40px]">
              {greeting()}, {firstName}
            </h1>
            <p className="mt-1 text-base text-muted">{t("dashboard.overview")}</p>
          </div>
          <Link to="/advisor">
            <Button variant="outline" size="sm">
              <Sparkles className="h-4 w-4 text-primary" />
              {t("dashboard.askAdvisor")}
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = iconMap[card.icon as keyof typeof iconMap];
          const isPositive = card.trend >= 0;

          return (
            <Card key={card.id} hover className="animate-count-up">
              <div className="flex items-start justify-between">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    card.id === "expenses"
                      ? "bg-red-50 text-error dark:bg-red-950"
                      : "bg-primary-light text-primary",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <Badge variant={isPositive ? "success" : "error"}>
                  {formatPercent(card.trend)}
                </Badge>
              </div>
              <p className="mt-4 text-sm text-muted">
                {translateSummaryCard(t, card.id, card.label)}
              </p>
              <p className="mt-1 text-2xl font-bold text-navy">
                {card.isPercent ? (
                  <>
                    <AnimatedNumber value={card.value} />%
                  </>
                ) : (
                  <>
                    <AnimatedNumber
                      value={card.value}
                      formatter={(v) =>
                        new Intl.NumberFormat(intlLocale, {
                          maximumFractionDigits: 0,
                        }).format(v)
                      }
                    />{" "}
                    FCFA
                  </>
                )}
              </p>
              <div className="mt-3">
                <MiniSparkline
                  data={card.sparkline}
                  positive={card.id !== "expenses"}
                />
              </div>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="text-2xl font-semibold text-navy">
            {t("dashboard.cashDistribution")}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {t("dashboard.cashDistributionSub")}
          </p>
          <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={cashDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {cashDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) =>
                    formatCurrency(value, "FCFA", intlLocale)
                  }
                  contentStyle={chart.tooltip}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full space-y-3">
              {cashDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="flex-1 text-sm text-navy">
                    {translateCashDist(t, item.name)}
                  </span>
                  <span className="text-sm font-medium text-navy">
                    {formatCurrency(item.value, "FCFA", intlLocale)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-2xl font-semibold text-navy">
            {t("dashboard.monthlySpending")}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {t("dashboard.monthlySpendingSub")}
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlySpending} barSize={32}>
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
                tickFormatter={(month) => translateMonth(t, month)}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: chart.tick, fontSize: 12 }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number) =>
                  formatCurrency(value, "FCFA", intlLocale)
                }
                contentStyle={chart.tooltip}
              />
              <Bar dataKey="amount" fill="#00A86B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-navy">
                {t("dashboard.recentTransactions")}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {t("dashboard.latestActivity")}
              </p>
            </div>
            <Link
              to="/transactions"
              className="text-sm font-medium text-primary hover:underline"
            >
              {t("common.viewAll")}
            </Link>
          </div>
          <div className="mt-4 divide-y divide-border">
            {recentTxns.map((tx) => (
              <Link
                key={tx.id}
                to={`/transactions/${tx.id}`}
                className="flex items-center justify-between py-3 first:pt-0 transition-colors hover:bg-surface/50 -mx-2 px-2 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold",
                      tx.amount >= 0
                        ? "bg-green-50 text-success dark:bg-green-950"
                        : "bg-surface text-muted",
                    )}
                  >
                    {tx.category.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy">
                      {tx.description}
                    </p>
                    <p className="text-xs text-muted">
                      {tx.account} · {translateCategory(t, tx.category)}
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
            ))}
          </div>
        </Card>

        <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary-light/60 to-card dark:from-primary-light/30">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary">
                  {t("dashboard.aiInsight")}
                </p>
                <Badge variant="info">
                  {t("dashboard.confidence", { value: aiInsight.confidence })}
                </Badge>
              </div>
            </div>
            <p className="mt-4 text-base leading-relaxed text-navy">
              {t("aiInsight.message")}
            </p>
            <Link to="/advisor">
              <Button className="mt-6 w-full" variant="primary">
                {t("aiInsight.action")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      <section>
        <Card>
          <h3 className="text-2xl font-semibold text-navy">
            {t("dashboard.categoryBreakdown")}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {t("dashboard.monthSpending")}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {categorySpending.map((cat) => {
              const max = Math.max(...categorySpending.map((c) => c.amount));
              const width = (cat.amount / max) * 100;

              return (
                <div key={cat.category}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="font-medium text-navy">
                      {translateCategory(t, cat.category)}
                    </span>
                    <span className="text-muted">
                      {formatCurrency(cat.amount, "FCFA", intlLocale)}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${width}%`,
                        backgroundColor: cat.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </section>
    </div>
  );
}
