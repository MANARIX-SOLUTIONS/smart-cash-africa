import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";
import { useAppData } from "@/context/AppDataContext";
import { useTranslation } from "@/context/I18nContext";
import { translateCategory } from "@/lib/i18n/helpers";
import { cn, formatCurrency } from "@/lib/utils";

export type TransactionType = "income" | "expense";

interface TransactionSheetProps {
  open: boolean;
  type: TransactionType;
  onClose: () => void;
}

const categories = {
  income: ["Salary", "Freelance", "Investment", "Other"],
  expense: [
    "Food",
    "Transport",
    "Housing",
    "Utilities",
    "Shopping",
    "Health",
    "Entertainment",
  ],
};

export function TransactionSheet({
  open,
  type,
  onClose,
}: TransactionSheetProps) {
  const { accounts, addTransaction } = useAppData();
  const { toast } = useToast();
  const { t, intlLocale } = useTranslation();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState(accounts[0]?.provider ?? "");
  const [isLoading, setIsLoading] = useState(false);

  if (!open) return null;

  const title =
    type === "income"
      ? t("transactions.addIncome")
      : t("transactions.addExpense");
  const cats = categories[type];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !category || !account) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const numericAmount = Number(amount);
    addTransaction({
      type,
      description: description.trim(),
      amount: numericAmount,
      category,
      account,
    });
    setIsLoading(false);
    toast(
      t("transactions.recorded", {
        type: t(type === "income" ? "common.income" : "common.expense"),
        amount: formatCurrency(numericAmount, "FCFA", intlLocale),
      }),
      "success",
    );
    setDescription("");
    setAmount("");
    setCategory("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
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
          <h2 className="text-xl font-semibold text-navy">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted hover:bg-surface"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t("common.description")}
            placeholder={t("transactions.descPlaceholder")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            label={t("transactions.amountFcfa")}
            type="number"
            placeholder="45000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
          />

          <div>
            <label className="text-sm font-medium text-navy">
              {t("common.category")}
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {cats.map((cat) => (
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

          <div>
            <label className="text-sm font-medium text-navy">
              {t("common.account")}
            </label>
            <select
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className={cn(
                "mt-1.5 h-11 w-full rounded-xl border border-border",
                "bg-card px-4 text-sm text-navy outline-none",
                "focus:border-primary focus:ring-2 focus:ring-primary/20",
              )}
            >
              {accounts.map((a) => (
                <option key={a.id} value={a.provider}>
                  {a.provider}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={
              isLoading ||
              !description ||
              !amount ||
              !category ||
              !account ||
              accounts.length === 0
            }
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : type === "income" ? (
              t("transactions.saveIncome")
            ) : (
              t("transactions.saveExpense")
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
