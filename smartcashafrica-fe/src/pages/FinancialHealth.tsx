import { TrendingUp, CheckCircle2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useTranslation } from "@/context/I18nContext";
import { useChartTheme } from "@/hooks/useChartTheme";
import {
  translateHealthCategory,
  translateHealthRecommendation,
  translateMonth,
} from "@/lib/i18n/helpers";
import { healthScores, healthHistory } from "@/lib/mock-data";

export function FinancialHealth() {
  const { t } = useTranslation();
  const chart = useChartTheme();
  const scoreColor =
    healthScores.overall >= 80
      ? "#22C55E"
      : healthScores.overall >= 60
        ? "#00A86B"
        : "#F59E0B";

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-[40px]">
          {t("health.title")}
        </h1>
        <p className="mt-1 text-base text-muted">{t("health.subtitle")}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="flex flex-col items-center justify-center py-8 sm:py-10 lg:col-span-1">
          <div className="relative scale-90 sm:scale-100">
            <svg width={200} height={200} className="-rotate-90">
              <circle
                cx={100}
                cy={100}
                r={85}
                fill="none"
                stroke="#E2E8F0"
                strokeWidth={12}
              />
              <circle
                cx={100}
                cy={100}
                r={85}
                fill="none"
                stroke={scoreColor}
                strokeWidth={12}
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 85}
                strokeDashoffset={
                  2 * Math.PI * 85 * (1 - healthScores.overall / 100)
                }
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-navy">
                {healthScores.overall}
              </span>
              <span className="text-sm text-muted">/ 100</span>
            </div>
          </div>
          <p className="mt-4 text-lg font-semibold text-navy">
            {t("health.overall")}
          </p>
          <div className="mt-2 flex items-center gap-1 text-sm text-success">
            <TrendingUp className="h-4 w-4" />
            {t("health.regionalAvg", { value: 72 })}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="text-2xl font-semibold text-navy">
            {t("health.scoreBreakdown")}
          </h3>
          <div className="mt-6 space-y-5">
            {healthScores.categories.map((cat) => (
              <div key={cat.name}>
                <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm font-medium text-navy">
                    {translateHealthCategory(t, cat.name)}
                  </span>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-bold text-navy">{cat.score}</span>
                    <span className="text-muted">
                      {t("health.benchmark", { value: cat.benchmark })}
                    </span>
                  </div>
                </div>
                <ProgressBar
                  value={cat.score}
                  color={cat.score >= cat.benchmark ? "#00A86B" : "#F59E0B"}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-2xl font-semibold text-navy">
          {t("health.historicalEvolution")}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {t("health.historicalEvolutionSub")}
        </p>
        <ResponsiveContainer width="100%" height={280} className="mt-6">
          <LineChart data={healthHistory}>
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
              domain={[60, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: chart.tick, fontSize: 12 }}
            />
            <Tooltip contentStyle={chart.tooltip} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#00A86B"
              strokeWidth={3}
              dot={{ fill: "#00A86B", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <h3 className="text-2xl font-semibold text-navy">
          {t("health.recommendations")}
        </h3>
        <div className="mt-4 space-y-3">
          {healthScores.recommendations.map((rec, index) => (
            <div
              key={rec}
              className="flex items-start gap-3 rounded-xl bg-surface p-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm text-navy">
                {translateHealthRecommendation(t, index, rec)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
