import { useMemo, useState } from "react";
import { Search, Download, SlidersHorizontal } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TransactionDetailDrawer } from "@/components/ui/TransactionDetailDrawer";
import { useAppData } from "@/context/AppDataContext";
import { useTranslation } from "@/context/I18nContext";
import { useToast } from "@/context/ToastContext";
import { translateCategory, translateStatus } from "@/lib/i18n/helpers";
import type { Transaction } from "@/types/finance";
import { cn, formatCurrency } from "@/lib/utils";

const statusVariant = {
  completed: "success",
  pending: "warning",
  failed: "error",
} as const;

export function Transactions() {
  const { transactions, exportTransactions } = useAppData();
  const { toast } = useToast();
  const { t, intlLocale } = useTranslation();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [provider, setProvider] = useState("all");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const categories = useMemo(
    () => ["all", ...new Set(transactions.map((tx) => tx.category))],
    [transactions],
  );
  const providers = useMemo(
    () => ["all", ...new Set(transactions.map((tx) => tx.account))],
    [transactions],
  );

  const filtered = transactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(search.toLowerCase()) ||
      tx.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || tx.category === category;
    const matchesProvider = provider === "all" || tx.account === provider;
    const matchesStatus = status === "all" || tx.status === status;
    const matchesType =
      type === "all" ||
      (type === "income" && tx.amount >= 0) ||
      (type === "expense" && tx.amount < 0);
    const matchesDateFrom = !dateFrom || tx.date >= dateFrom;
    const matchesDateTo = !dateTo || tx.date <= dateTo;
    const absAmount = Math.abs(tx.amount);
    const matchesMin = !minAmount || absAmount >= Number(minAmount);
    const matchesMax = !maxAmount || absAmount <= Number(maxAmount);
    return (
      matchesSearch &&
      matchesCategory &&
      matchesProvider &&
      matchesStatus &&
      matchesType &&
      matchesDateFrom &&
      matchesDateTo &&
      matchesMin &&
      matchesMax
    );
  });

  const handleExport = () => {
    exportTransactions(filtered);
    toast(t("transactions.exported", { count: filtered.length }), "success");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title={t("transactions.title")}
        subtitle={t("transactions.subtitle")}
        action={
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={!filtered.length}
          >
            <Download className="h-4 w-4" />
            {t("common.export")}
          </Button>
        }
      />

      <Card padding="md">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("transactions.search")}
                className={[
                  "h-10 w-full rounded-xl border border-border bg-surface",
                  "pl-10 pr-4 text-sm outline-none",
                  "focus:border-primary focus:ring-2 focus:ring-primary/20",
                ].join(" ")}
              />
            </div>
            <Button
              variant="outline"
              size="md"
              onClick={() => setShowFilters((v) => !v)}
              aria-expanded={showFilters}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {t("transactions.filters")}
            </Button>
          </div>
          {showFilters && (
            <div className="grid gap-3 border-t border-border pt-3 sm:grid-cols-2 lg:grid-cols-4">
              <FilterSelect
                label={t("transactions.filterCategory")}
                allLabel={t("transactions.allCategories")}
                value={category}
                options={categories}
                onChange={setCategory}
                formatOption={(opt) => translateCategory(t, opt)}
              />
              <FilterSelect
                label={t("transactions.filterProvider")}
                allLabel={t("transactions.allProviders")}
                value={provider}
                options={providers}
                onChange={setProvider}
              />
              <FilterSelect
                label={t("transactions.filterStatus")}
                allLabel={t("transactions.allStatuses")}
                value={status}
                options={["all", "completed", "pending", "failed"]}
                onChange={setStatus}
                formatOption={(opt) => translateStatus(t, opt)}
              />
              <FilterSelect
                label={t("transactions.filterType")}
                allLabel={t("transactions.allTypes")}
                value={type}
                options={["all", "income", "expense"]}
                onChange={setType}
                formatOption={(opt) =>
                  opt === "all"
                    ? t("transactions.allTypes")
                    : t(opt === "income" ? "common.income" : "common.expense")
                }
              />
              <FilterInput
                label={t("transactions.dateFrom")}
                type="date"
                value={dateFrom}
                onChange={setDateFrom}
              />
              <FilterInput
                label={t("transactions.dateTo")}
                type="date"
                value={dateTo}
                onChange={setDateTo}
              />
              <FilterInput
                label={t("transactions.minAmount")}
                type="number"
                value={minAmount}
                onChange={setMinAmount}
                placeholder="0"
              />
              <FilterInput
                label={t("transactions.maxAmount")}
                type="number"
                value={maxAmount}
                onChange={setMaxAmount}
                placeholder="1000000"
              />
            </div>
          )}
        </div>
      </Card>

      <Card padding="sm" className="overflow-hidden">
        {filtered.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-muted">
            {t("transactions.empty")}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-border bg-surface/50 text-left text-xs font-medium uppercase tracking-wider text-muted">
                  <th className="px-6 py-4">{t("common.date")}</th>
                  <th className="px-6 py-4">{t("common.description")}</th>
                  <th className="px-6 py-4">{t("common.provider")}</th>
                  <th className="px-6 py-4">{t("common.category")}</th>
                  <th className="px-6 py-4 text-right">{t("common.amount")}</th>
                  <th className="px-6 py-4">{t("common.status")}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx) => (
                  <tr
                    key={tx.id}
                    onClick={() => setSelectedTx(tx)}
                    className="cursor-pointer border-b border-border/60 transition-colors hover:bg-surface/80"
                  >
                    <td className="px-6 py-4 text-sm text-muted">
                      {new Date(tx.date).toLocaleDateString(intlLocale, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-navy">
                      {tx.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">
                      {tx.account}
                    </td>
                    <td className="px-6 py-4">
                      <Badge>{translateCategory(t, tx.category)}</Badge>
                    </td>
                    <td
                      className={cn(
                        "px-6 py-4 text-right text-sm font-semibold",
                        tx.amount >= 0 ? "text-success" : "text-navy",
                      )}
                    >
                      {tx.amount >= 0 ? "+" : ""}
                      {formatCurrency(Math.abs(tx.amount), "FCFA", intlLocale)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={statusVariant[tx.status]}>
                        {translateStatus(t, tx.status)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <TransactionDetailDrawer
        transaction={selectedTx}
        onClose={() => setSelectedTx(null)}
      />
    </div>
  );
}

function FilterSelect({
  label,
  allLabel,
  value,
  options,
  onChange,
  formatOption,
}: {
  label: string;
  allLabel: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  formatOption?: (opt: string) => string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-muted">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-10 w-full rounded-xl border border-border bg-surface px-3",
          "text-sm text-navy outline-none capitalize",
          "focus:border-primary focus:ring-2 focus:ring-primary/20",
        )}
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="capitalize">
            {opt === "all" ? allLabel : formatOption ? formatOption(opt) : opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function FilterInput({
  label,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-muted">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-10 w-full rounded-xl border border-border bg-surface px-3",
          "text-sm text-navy outline-none",
          "focus:border-primary focus:ring-2 focus:ring-primary/20",
        )}
      />
    </div>
  );
}
