import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Download, Printer, Share2 } from "lucide-react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BackLink } from "@/components/ui/BackLink";
import { useToast } from "@/context/ToastContext";
import { useAppData } from "@/context/AppDataContext";
import { useTranslation } from "@/context/I18nContext";
import { useChartTheme } from "@/hooks/useChartTheme";
import { downloadReportFile } from "@/lib/export";
import { getReportById } from "@/lib/data-helpers";
import { enrichBudget } from "@/lib/budget-helpers";
import {
  translateCategory,
  translateHealthCategory,
  translateHealthRecommendation,
  translateReport,
  translateSummaryCard,
} from "@/lib/i18n/helpers";
import { summaryCards, categorySpending, healthScores } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { NotFound } from "@/pages/NotFound";

export function ReportDetail() {
  const { id } = useParams();
  const report = id ? getReportById(id) : undefined;
  const { toast } = useToast();
  const { savingsGoals, budgets, transactions } = useAppData();
  const { t, intlLocale } = useTranslation();
  const chart = useChartTheme();

  const enrichedBudgets = useMemo(
    () => budgets.map((b) => enrichBudget(b, transactions)),
    [budgets, transactions],
  );

  if (!report) return <NotFound />;

  const translated = translateReport(t, report.id, {
    name: report.name,
    description: report.description,
  });

  const handleExport = (format: string) => {
    downloadReportFile(
      translated.name,
      format,
      `${translated.name}\n${translated.description}\nPeriod: ${report.period}`,
    );
    toast(t("reports.exported", { name: translated.name, format }), "success");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const text = `${translated.name} — ${report.period}\n${translated.description}`;
    if (navigator.share) {
      await navigator.share({ title: translated.name, text });
      toast(t("reports.shared"), "success");
    } else {
      await navigator.clipboard.writeText(text);
      toast(t("reports.copied"), "success");
    }
  };

  const spendingChartData = categorySpending.map((c) => ({
    name: translateCategory(t, c.category),
    amount: c.amount,
    fill: c.color,
  }));

  return (
    <div className="mx-auto max-w-4xl space-y-8 animate-fade-in">
      <BackLink to="/reports" label={t("reports.back")} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy">{translated.name}</h1>
          <p className="mt-1 text-muted">{translated.description}</p>
          <p className="mt-2 text-sm font-medium text-primary">
            {report.period}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("PDF")}
          >
            <Download className="h-4 w-4" />
            PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
            {t("common.print")}
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
            {t("common.share")}
          </Button>
        </div>
      </div>

      <Card className="print:shadow-none">
        <div className="border-b border-border pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">
              SC
            </div>
            <div>
              <p className="font-semibold text-navy">{t("brand.name")}</p>
              <p className="text-xs text-muted">
                {t("reports.financialReport")}
              </p>
            </div>
          </div>
        </div>

        {report.type === "summary" && (
          <div className="mt-6 space-y-6">
            <h2 className="text-xl font-semibold text-navy">
              {t("reports.executiveSummary")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {summaryCards.map((c) => (
                <div key={c.id} className="rounded-xl border border-border p-4">
                  <p className="text-sm text-muted">
                    {translateSummaryCard(t, c.id, c.label)}
                  </p>
                  <p className="mt-1 text-lg font-bold text-navy">
                    {c.isPercent
                      ? `${c.value}%`
                      : formatCurrency(c.value, "FCFA", intlLocale)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {report.type === "spending" && (
          <div className="mt-6 space-y-6">
            <h2 className="text-xl font-semibold text-navy">
              {t("reports.spendingBreakdown")}
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={spendingChartData} barSize={32}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={chart.grid}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: chart.tick, fontSize: 11 }}
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
                <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                  {spendingChartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {categorySpending.map((cat) => (
                <div
                  key={cat.category}
                  className="flex items-center justify-between rounded-xl border border-border p-4"
                >
                  <span className="font-medium text-navy">
                    {translateCategory(t, cat.category)}
                  </span>
                  <span className="font-semibold text-navy">
                    {formatCurrency(cat.amount, "FCFA", intlLocale)}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted">{t("reports.spendingInsight")}</p>
          </div>
        )}

        {report.type === "budget" && (
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold text-navy">
              {t("reports.budgetVsActual")}
            </h2>
            {enrichedBudgets.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between rounded-xl border border-border p-4"
              >
                <span className="font-medium text-navy">
                  {translateCategory(t, b.category)}
                </span>
                <div className="text-right text-sm">
                  <p className="text-muted">
                    {formatCurrency(b.spent, "FCFA", intlLocale)} /{" "}
                    {formatCurrency(b.allocated, "FCFA", intlLocale)}
                  </p>
                  <p className="font-medium text-primary">
                    {((b.spent / b.allocated) * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {report.type === "savings" && (
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold text-navy">
              {t("reports.goalsProgress")}
            </h2>
            {savingsGoals.map((g) => (
              <div
                key={g.id}
                className="flex items-center justify-between rounded-xl border border-border p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{g.emoji}</span>
                  <span className="font-medium text-navy">{g.name}</span>
                </div>
                <p className="text-sm font-medium text-primary">
                  {((g.current / g.target) * 100).toFixed(0)}%
                </p>
              </div>
            ))}
          </div>
        )}

        {report.type === "health" && (
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold text-navy">
              {t("reports.healthReport", { score: healthScores.overall })}
            </h2>
            {healthScores.categories.map((c) => (
              <div
                key={c.name}
                className="flex justify-between rounded-xl border border-border p-4"
              >
                <span className="text-navy">
                  {translateHealthCategory(t, c.name)}
                </span>
                <span className="font-bold text-navy">{c.score}</span>
              </div>
            ))}
            <div className="mt-4 rounded-xl bg-surface p-4">
              <p className="text-sm font-medium text-navy">
                {t("reports.recommendations")}
              </p>
              <ul className="mt-2 space-y-2">
                {healthScores.recommendations.map((r, index) => (
                  <li key={r} className="text-sm text-muted">
                    • {translateHealthRecommendation(t, index, r)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
