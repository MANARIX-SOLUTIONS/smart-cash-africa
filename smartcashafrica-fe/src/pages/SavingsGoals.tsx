import { Link } from "react-router-dom";
import { Plus, Sparkles, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { PageHeader } from "@/components/ui/PageHeader";
import { useAppData } from "@/context/AppDataContext";
import { useTranslation } from "@/context/I18nContext";
import { translateSavingsTip } from "@/lib/i18n/helpers";
import { formatCurrency } from "@/lib/utils";

export function SavingsGoals() {
  const { savingsGoals } = useAppData();
  const { t, intlLocale } = useTranslation();

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title={t("savings.title")}
        subtitle={t("savings.subtitle")}
        action={
          <Link to="/savings/new">
            <Button>
              <Plus className="h-4 w-4" />
              {t("savings.newGoal")}
            </Button>
          </Link>
        }
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {savingsGoals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;

          return (
            <Card key={goal.id} hover>
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-2xl">
                  {goal.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-navy">
                    {goal.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {t("savings.targetLabel", {
                      amount: formatCurrency(goal.target, "FCFA", intlLocale),
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-8">
                <div className="relative">
                  <ProgressRing value={progress} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-navy">
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted">{t("common.saved")}</p>
                    <p className="text-lg font-bold text-primary">
                      {formatCurrency(goal.current, "FCFA", intlLocale)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted">
                      {t("common.predicted")}
                    </p>
                    <p className="text-sm font-medium text-navy">
                      {goal.predictedDate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-2 rounded-xl bg-accent-light p-4">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p className="text-sm text-navy">
                  {translateSavingsTip(t, goal)}
                </p>
              </div>

              <Link to={`/savings/${goal.id}`} className="mt-4 block">
                <Button variant="outline" className="w-full" size="sm">
                  {t("common.view")} {t("common.details")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
