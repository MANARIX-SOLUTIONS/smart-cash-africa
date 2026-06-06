import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  X,
  Calendar,
  Wallet,
  Tag,
  Hash,
  MapPin,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/context/I18nContext";
import { translateCategory, translateStatus } from "@/lib/i18n/helpers";
import type { Transaction } from "@/types/finance";
import { cn, formatCurrency } from "@/lib/utils";

const statusVariant = {
  completed: "success",
  pending: "warning",
  failed: "error",
} as const;

interface TransactionDetailDrawerProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export function TransactionDetailDrawer({
  transaction,
  onClose,
}: TransactionDetailDrawerProps) {
  const { t, intlLocale } = useTranslation();

  useEffect(() => {
    if (!transaction) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [transaction, onClose]);

  if (!transaction) return null;

  const isIncome = transaction.amount >= 0;
  const merchant = transaction.description.split(" — ")[0];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-overlay backdrop-blur-sm"
        onClick={onClose}
        aria-label={t("common.close")}
      />
      <aside
        className={cn(
          "relative flex h-full w-full max-w-md flex-col",
          "border-l border-border bg-card shadow-2xl",
          "animate-slide-in-right",
        )}
        role="dialog"
        aria-modal="true"
        aria-label={t("transactions.details")}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-navy">
            {t("transactions.details")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted hover:bg-surface"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="text-center">
            <p
              className={cn(
                "text-3xl font-bold",
                isIncome ? "text-success" : "text-navy",
              )}
            >
              {isIncome ? "+" : "−"}
              {formatCurrency(Math.abs(transaction.amount), "FCFA", intlLocale)}
            </p>
            <p className="mt-2 text-lg font-medium text-navy">{merchant}</p>
            <Badge variant={statusVariant[transaction.status]} className="mt-3">
              {translateStatus(t, transaction.status)}
            </Badge>
          </div>

          <div className="mt-8 space-y-4">
            <DetailRow
              icon={Tag}
              label={t("common.category")}
              value={translateCategory(t, transaction.category)}
            />
            <DetailRow
              icon={Wallet}
              label={t("common.provider")}
              value={transaction.account}
            />
            <DetailRow
              icon={Calendar}
              label={t("common.date")}
              value={new Date(transaction.date).toLocaleDateString(intlLocale, {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
            <DetailRow
              icon={MapPin}
              label={t("transactions.location")}
              value={t("transactions.locationDefault")}
            />
            <DetailRow
              icon={Hash}
              label={t("common.reference")}
              value={`TXN-${transaction.id.padStart(6, "0")}`}
            />
          </div>

          <div className="mt-6 rounded-xl border border-primary/20 bg-primary-light/40 p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="text-sm font-medium text-primary">
                {t("transactions.aiClassification")}
              </p>
            </div>
            <p className="mt-2 text-sm text-navy">
              {t("transactions.aiClassificationDesc", {
                category: translateCategory(t, transaction.category),
                confidence: 94,
              })}
            </p>
          </div>
        </div>

        <div className="border-t border-border p-4">
          <Link to={`/transactions/${transaction.id}`}>
            <Button variant="outline" className="w-full" size="sm">
              <ExternalLink className="h-4 w-4" />
              {t("transactions.openFullPage")}
            </Button>
          </Link>
        </div>
      </aside>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Tag;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-surface p-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-medium text-navy">{value}</p>
      </div>
    </div>
  );
}
