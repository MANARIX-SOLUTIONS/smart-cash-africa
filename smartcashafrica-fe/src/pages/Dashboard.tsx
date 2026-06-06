import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  HeartPulse,
  Sparkles,
  ArrowRight,
  Calendar,
  Search,
  CheckCircle2,
  Plus,
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
  aiInsights,
} from "@/lib/mock-data";
import { AccountProviderLogo } from "@/components/ui/ProviderLogo";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { useAddTransaction } from "@/context/AddTransactionContext";
import { useTranslation } from "@/context/I18nContext";
import { findAccountForProvider } from "@/lib/account-helpers";
import { useChartTheme } from "@/hooks/useChartTheme";
import {
  translateCashDist,
  translateCategory,
  translateMonth,
  translateSummaryCard,
} from "@/lib/i18n/helpers";
import { cn, formatPercent } from "@/lib/utils";

const iconMap = {
  wallet: Wallet,
  "trending-up": TrendingUp,
  "trending-down": TrendingDown,
  "piggy-bank": PiggyBank,
  "heart-pulse": HeartPulse,
};

const priorityVariant = {
  high: "error",
  medium: "warning",
  low: "success",
} as const;

export function Dashboard() {
  const { user } = useAuth();
  const { transactions, accounts } = useAppData();
  const { openAddTransaction } = useAddTransaction();
  const { t, greeting, formatMoney, formatDate } = useTranslation();
  const [txnSearch, setTxnSearch] = useState("");
  const chart = useChartTheme();
  const firstName = user?.name.split(" ")[0] ?? "there";
  const today = formatDate(new Date(), {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const recentTxns = useMemo(() => {
    const query = txnSearch.toLowerCase();
    return transactions
      .filter(
        (tx) =>
          !query ||
          tx.description.toLowerCase().includes(query) ||
          tx.category.toLowerCase().includes(query) ||
          tx.account.toLowerCase().includes(query),
      )
      .slice(0, 5);
  }, [transactions, txnSearch]);

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
            <div className="mt-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <p className="text-base text-navy">
                {t("dashboard.healthStatus")}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={() => openAddTransaction("expense")}>
              <Plus className="h-4 w-4" />
              {t("transactions.add")}
            </Button>
            <Link to="/advisor">
              <Button variant="outline" size="sm">
                <Sparkles className="h-4 w-4 text-primary" />
                {t("dashboard.askAdvisor")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {summaryCards.map((card) => {
          const Icon = iconMap[card.icon as keyof typeof iconMap];
          const isPositive =
            card.id === "expenses" ? card.trend <= 0 : card.trend >= 0;

          return (
            <Card key={card.id} hover className="animate-count-up">
              <div className="flex items-start justify-between">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    card.id === "expenses"
                      ? "bg-red-50 text-error dark:bg-red-950"
                      : card.id === "health-score"
                        ? "bg-accent-light text-accent"
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
                    <AnimatedNumber value={card.value} />
                    {card.id === "health-score" ? "/100" : "%"}
                  </>
                ) : (
                  <AnimatedNumber
                    value={card.value}
                    formatter={(v) => formatMoney(v)}
                  />
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

      {accounts.length > 0 && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-navy">
              {t("dashboard.linkedAccounts")}
            </h3>
            <Link
              to="/accounts"
              className="text-sm font-medium text-primary hover:underline"
            >
              {t("common.viewAll")}
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {accounts.slice(0, 6).map((account) => (
              <Link
                key={account.id}
                to={`/accounts/${account.id}`}
                className={cn(
                  "flex min-w-[180px] items-center gap-3 rounded-xl",
                  "border border-border bg-card p-3 transition-all",
                  "hover:border-primary/30 hover:shadow-[var(--shadow-card)]",
                )}
              >
                <AccountProviderLogo account={account} size="md" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-navy">
                    {account.nickname ?? account.provider}
                  </p>
                  <p className="text-sm font-semibold text-navy">
                    {formatMoney(account.balance)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="text-2xl font-semibold text-navy">
            {t("dashboard.assetsDistribution")}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {t("dashboard.assetsDistributionSub")}
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
                  formatter={(value: number) => formatMoney(value)}
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
                    {formatMoney(item.value)}
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
                formatter={(value: number) => formatMoney(value)}
                contentStyle={chart.tooltip}
              />
              <Bar dataKey="amount" fill="#00A86B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={txnSearch}
              onChange={(e) => setTxnSearch(e.target.value)}
              placeholder={t("transactions.search")}
              className={[
                "h-10 w-full rounded-xl border border-border bg-surface",
                "pl-10 pr-4 text-sm outline-none",
                "focus:border-primary focus:ring-2 focus:ring-primary/20",
              ].join(" ")}
            />
          </div>
          <div className="mt-4 divide-y divide-border">
            {recentTxns.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-sm text-muted">{t("transactions.empty")}</p>
                <Button
                  className="mt-4"
                  size="sm"
                  onClick={() => openAddTransaction("expense")}
                >
                  <Plus className="h-4 w-4" />
                  {t("dashboard.addFirstTransaction")}
                </Button>
              </div>
            ) : (
              recentTxns.map((tx) => {
                const account = findAccountForProvider(accounts, tx.account);

                return (
                  <Link
                    key={tx.id}
                    to={`/transactions/${tx.id}`}
                    className="flex items-center justify-between py-3 first:pt-0 transition-colors hover:bg-surface/50 -mx-2 px-2 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {account ? (
                        <AccountProviderLogo account={account} size="md" />
                      ) : (
                        <div
                          className={cn(
                            "flex h-11 w-11 items-center justify-center",
                            "rounded-xl text-xs font-bold",
                            tx.amount >= 0
                              ? "bg-green-50 text-success dark:bg-green-950"
                              : "bg-surface text-muted",
                          )}
                        >
                          {tx.category.slice(0, 2).toUpperCase()}
                        </div>
                      )}
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
                      {formatMoney(Math.abs(tx.amount))}
                    </span>
                  </Link>
                );
              })
            )}
          </div>
        </Card>

        <Card className="relative overflow-hidden border-primary/20">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary">
                  {t("dashboard.aiInsights")}
                </p>
                <p className="text-xs text-muted">
                  {t("dashboard.aiInsightsSub")}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {aiInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="rounded-xl border border-border bg-surface/60 p-3"
                >
                  <p className="text-sm leading-relaxed text-navy">
                    {t(`aiInsights.${insight.id}.message`)}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge variant="info" className="text-xs">
                      {t("dashboard.confidence", {
                        value: insight.confidence,
                      })}
                    </Badge>
                    <Badge
                      variant={priorityVariant[insight.priority]}
                      className="text-xs"
                    >
                      {t(`dashboard.priority.${insight.priority}`)}
                    </Badge>
                  </div>
                  <Link to={insight.actionPath}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 h-8 px-0 text-primary"
                    >
                      {t(`aiInsights.${insight.id}.action`)}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
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
                      {formatMoney(cat.amount)}
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
