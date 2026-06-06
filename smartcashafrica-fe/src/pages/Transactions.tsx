import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Download } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAppData } from "@/context/AppDataContext";
import { useTranslation } from "@/context/I18nContext";
import { useToast } from "@/context/ToastContext";
import { translateCategory, translateStatus } from "@/lib/i18n/helpers";
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
    return matchesSearch && matchesCategory && matchesProvider && matchesStatus;
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
          <div className="relative">
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
          <div className="grid gap-3 sm:grid-cols-3">
            <FilterSelect
              label={t("transactions.filterCategory")}
              allLabel={t("transactions.allCategories")}
              value={category}
              options={categories}
              onChange={setCategory}
              formatOption={(opt) => translateCategory(t, opt)}
            />
            <FilterSelect
              label={t("transactions.filterAccount")}
              allLabel={t("transactions.allAccounts")}
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
          </div>
        </div>
      </Card>

      <Card padding="sm" className="overflow-hidden">
        {filtered.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-muted">
            {t("transactions.empty")}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted">
                  <th className="px-6 py-4">{t("common.date")}</th>
                  <th className="px-6 py-4">{t("common.description")}</th>
                  <th className="px-6 py-4">{t("common.category")}</th>
                  <th className="px-6 py-4">{t("common.account")}</th>
                  <th className="px-6 py-4 text-right">{t("common.amount")}</th>
                  <th className="px-6 py-4">{t("common.status")}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-border/60 transition-colors hover:bg-surface/80"
                  >
                    <td className="px-6 py-4 text-sm text-muted">
                      {new Date(tx.date).toLocaleDateString(intlLocale, {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <Link
                        to={`/transactions/${tx.id}`}
                        className="text-navy hover:text-primary hover:underline"
                      >
                        {tx.description}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Badge>{translateCategory(t, tx.category)}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">
                      {tx.account}
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
            {opt === "all"
              ? allLabel
              : formatOption
                ? formatOption(opt)
                : opt}
          </option>
        ))}
      </select>
    </div>
  );
}
