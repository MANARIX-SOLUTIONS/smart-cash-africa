import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { useTranslation } from "@/context/I18nContext";
import { budgets } from "@/lib/mock-data";
import { useToast } from "@/context/ToastContext";
import { translateCategory } from "@/lib/i18n/helpers";
import { cn, formatCurrency } from "@/lib/utils";

export function Budgets() {
  const { t, intlLocale } = useTranslation();
  const { toast } = useToast();
  const totalAllocated = budgets.reduce((s, b) => s + b.allocated, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title={t("budgets.title")}
        subtitle={t("budgets.subtitle")}
        action={
          <Button
            onClick={() => toast(t("budgets.comingSoon"), "info")}
          >
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
              {formatCurrency(totalAllocated, "FCFA", intlLocale)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted">{t("budgets.totalSpent")}</p>
            <p className="text-2xl font-bold text-navy">
              {formatCurrency(totalSpent, "FCFA", intlLocale)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted">{t("budgets.remaining")}</p>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(totalAllocated - totalSpent, "FCFA", intlLocale)}
            </p>
          </div>
        </div>
        <ProgressBar value={totalSpent} max={totalAllocated} className="mt-4" />
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {budgets.map((budget) => {
          const remaining = budget.allocated - budget.spent;
          const percent = (budget.spent / budget.allocated) * 100;
          const isOver = percent > 90;

          return (
            <Link key={budget.id} to={`/budgets/${budget.id}`}>
              <Card hover className="h-full">
                <div className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: budget.color }}
                  />
                  <h3 className="text-lg font-semibold text-navy">
                    {translateCategory(t, budget.category)}
                  </h3>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">{t("common.allocated")}</span>
                    <span className="font-medium text-navy">
                      {formatCurrency(budget.allocated, "FCFA", intlLocale)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">{t("common.spent")}</span>
                    <span className="font-medium text-navy">
                      {formatCurrency(budget.spent, "FCFA", intlLocale)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">{t("common.remaining")}</span>
                    <span
                      className={cn(
                        "font-medium",
                        isOver ? "text-warning" : "text-primary",
                      )}
                    >
                      {formatCurrency(remaining, "FCFA", intlLocale)}
                    </span>
                  </div>
                </div>

                <ProgressBar
                  value={budget.spent}
                  max={budget.allocated}
                  color={isOver ? "#F59E0B" : budget.color}
                  className="mt-4"
                  showLabel
                />
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
