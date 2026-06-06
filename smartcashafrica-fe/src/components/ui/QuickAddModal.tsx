import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, ArrowDownLeft, ArrowUpRight, Target, Wallet } from "lucide-react";
import { TransactionSheet } from "@/components/ui/TransactionSheet";
import { useTranslation } from "@/context/I18nContext";
import { cn } from "@/lib/utils";

interface QuickAddModalProps {
  open: boolean;
  onClose: () => void;
}

const actions = [
  {
    id: "income" as const,
    icon: ArrowDownLeft,
    labelKey: "quickAdd.addIncome",
    descKey: "quickAdd.addIncomeDesc",
    color: "bg-green-50 text-success dark:bg-green-950",
  },
  {
    id: "expense" as const,
    icon: ArrowUpRight,
    labelKey: "quickAdd.addExpense",
    descKey: "quickAdd.addExpenseDesc",
    color: "bg-red-50 text-error dark:bg-red-950",
  },
  {
    id: "account" as const,
    icon: Wallet,
    labelKey: "quickAdd.connectAccount",
    descKey: "quickAdd.connectAccountDesc",
    color: "bg-blue-50 text-accent dark:bg-blue-950",
  },
  {
    id: "goal" as const,
    icon: Target,
    labelKey: "quickAdd.newGoal",
    descKey: "quickAdd.newGoalDesc",
    color: "bg-primary-light text-primary",
  },
];

export function QuickAddModal({ open, onClose }: QuickAddModalProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [sheet, setSheet] = useState<"income" | "expense" | null>(null);

  const handleAction = (id: string) => {
    if (id === "income" || id === "expense") {
      onClose();
      setSheet(id);
      return;
    }
    if (id === "account") {
      onClose();
      navigate("/accounts/connect");
      return;
    }
    if (id === "goal") {
      onClose();
      navigate("/savings/new");
    }
  };

  if (!open && !sheet) return null;

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <button
            className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
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
                {t("quickAdd.title")}
              </h2>
              <button
                onClick={onClose}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  "text-muted transition-colors hover:bg-surface",
                )}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2">
              {actions.map(({ id, icon: Icon, labelKey, descKey, color }) => (
                <button
                  key={id}
                  onClick={() => handleAction(id)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-xl p-4",
                    "border border-border text-left transition-all",
                    "hover:border-primary/30 hover:shadow-[var(--shadow-card)]",
                    "active:scale-[0.98]",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center",
                      "rounded-xl",
                      color,
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-navy">{t(labelKey)}</p>
                    <p className="text-sm text-muted">{t(descKey)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <TransactionSheet
        open={sheet !== null}
        type={sheet ?? "expense"}
        onClose={() => setSheet(null)}
      />
    </>
  );
}
