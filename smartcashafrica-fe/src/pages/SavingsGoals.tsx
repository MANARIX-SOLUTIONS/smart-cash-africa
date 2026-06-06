import { Link } from "react-router-dom";
import { Plus, Sparkles, ArrowRight, Target } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { PageHeader } from "@/components/ui/PageHeader";
import { useAppData } from "@/context/AppDataContext";
import { useTranslation } from "@/context/I18nContext";
import { savingsAiRecommendations } from "@/lib/mock-data";
import { translateSavingsTip } from "@/lib/i18n/helpers";

export function SavingsGoals() {
  const { savingsGoals } = useAppData();
  const { t, formatMoney } = useTranslation();

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

      {savingsGoals.length === 0 ? (
        <Card className="py-12 text-center">
          <Target className="mx-auto h-12 w-12 text-muted" />
          <p className="mt-4 text-lg font-medium text-navy">
            {t("savings.emptyTitle")}
          </p>
          <p className="mt-2 text-sm text-muted">{t("savings.emptyHint")}</p>
          <Link to="/savings/new" className="mt-4 inline-block">
            <Button>{t("savings.setFirstGoal")}</Button>
          </Link>
        </Card>
      ) : (
        <>
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
                          amount: formatMoney(goal.target),
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
                        <p className="text-sm text-muted">
                          {t("common.saved")}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          {formatMoney(goal.current)}
                        </p>
                      </div>
                      {goal.monthlyContribution != null && (
                        <div>
                          <p className="text-sm text-muted">
                            {t("savings.monthlyContrib")}
                          </p>
                          <p className="text-sm font-medium text-navy">
                            {formatMoney(goal.monthlyContribution)}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-muted">
                          {t("savings.estimatedCompletion")}
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

          <Card className="border-primary/20 bg-gradient-to-br from-primary-light/40 to-card">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-navy">
                  {t("savings.aiRecommendations")}
                </h3>
                <p className="text-sm text-muted">
                  {t("savings.aiRecommendationsSub")}
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-card p-4">
                <p className="text-sm text-muted">
                  {t("savings.suggestedMonthly")}
                </p>
                <p className="mt-1 text-2xl font-bold text-primary">
                  {formatMoney(savingsAiRecommendations.suggestedMonthly)}
                </p>
              </div>
              <div className="rounded-xl bg-card p-4">
                <p className="text-sm text-muted">
                  {t("savings.goalProbability")}
                </p>
                <p className="mt-1 text-2xl font-bold text-navy">
                  {savingsAiRecommendations.goalProbability}%
                </p>
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              {savingsAiRecommendations.tips.map((_, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-navy"
                >
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {t(`savings.aiTips.${index + 1}`)}
                </li>
              ))}
            </ul>
          </Card>
        </>
      )}
    </div>
  );
}
