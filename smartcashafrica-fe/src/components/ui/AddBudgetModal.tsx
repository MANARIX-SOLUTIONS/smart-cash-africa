import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAppData } from "@/context/AppDataContext";
import { useToast } from "@/context/ToastContext";
import { useTranslation } from "@/context/I18nContext";
import { ADDABLE_BUDGET_CATEGORIES } from "@/lib/budget-helpers";
import { translateCategory } from "@/lib/i18n/helpers";
import { cn } from "@/lib/utils";

interface AddBudgetModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddBudgetModal({ open, onClose }: AddBudgetModalProps) {
  const { budgets, addBudget } = useAppData();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [category, setCategory] = useState("");
  const [allocated, setAllocated] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!open) return null;

  const existing = new Set(budgets.map((b) => b.category));
  const available = ADDABLE_BUDGET_CATEGORIES.filter(
    (cat) => !existing.has(cat),
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !allocated) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    try {
      addBudget({
        category,
        allocated: Number(allocated),
      });
      toast(
        t("budgets.created", { category: translateCategory(t, category) }),
        "success",
      );
      setCategory("");
      setAllocated("");
      onClose();
    } catch {
      toast(t("budgets.alreadyExists"), "info");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-overlay backdrop-blur-sm"
        onClick={onClose}
        aria-label={t("common.close")}
      />
      <div
        className={cn(
          "relative w-full max-w-md rounded-t-2xl bg-card p-6",
          "shadow-2xl animate-slide-up sm:rounded-2xl",
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-navy">
            {t("budgets.addCategory")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted hover:bg-surface"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {available.length === 0 ? (
          <p className="text-sm text-muted">
            {t("budgets.allCategoriesAdded")}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-navy">
                {t("common.category")}
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {available.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium",
                      "transition-all",
                      category === cat
                        ? "border-primary bg-primary-light text-primary"
                        : "border-border text-muted hover:border-primary/30",
                    )}
                  >
                    {translateCategory(t, cat)}
                  </button>
                ))}
              </div>
            </div>

            <Input
              label={t("budgets.allocatedAmount")}
              type="number"
              placeholder={t("common.placeholders.budgetExample")}
              value={allocated}
              onChange={(e) => setAllocated(e.target.value)}
              min="1"
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading || !category || !allocated}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                t("budgets.createBudget")
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
