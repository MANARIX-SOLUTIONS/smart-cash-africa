import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ArrowLeftRight,
  Wallet,
  LayoutDashboard,
  Bot,
  HelpCircle,
  X,
} from "lucide-react";
import { useAppData } from "@/context/AppDataContext";
import { useTranslation } from "@/context/I18nContext";
import { translateCategory } from "@/lib/i18n/helpers";
import { cn, formatCurrency } from "@/lib/utils";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const pages = [
  { labelKey: "nav.dashboard", path: "/dashboard", icon: LayoutDashboard },
  { labelKey: "nav.accounts", path: "/accounts", icon: Wallet },
  {
    labelKey: "nav.transactions",
    path: "/transactions",
    icon: ArrowLeftRight,
  },
  { labelKey: "nav.advisor", path: "/advisor", icon: Bot },
  { labelKey: "help.title", path: "/help", icon: HelpCircle },
];

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const navigate = useNavigate();
  const { transactions, accounts } = useAppData();
  const { t, intlLocale } = useTranslation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return { pages, txns: [], accts: [] };
    const q = query.toLowerCase();

    return {
      pages: pages.filter((p) => t(p.labelKey).toLowerCase().includes(q)),
      txns: transactions
        .filter(
          (tx) =>
            tx.description.toLowerCase().includes(q) ||
            tx.category.toLowerCase().includes(q),
        )
        .slice(0, 5),
      accts: accounts
        .filter((a) => a.provider.toLowerCase().includes(q))
        .slice(0, 3),
    };
  }, [query, transactions, accounts, t]);

  if (!open) return null;

  const go = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4">
      <button
        className="absolute inset-0 bg-overlay backdrop-blur-sm"
        onClick={onClose}
        aria-label={t("common.close")}
      />
      <div
        className={cn(
          "relative w-full max-w-lg overflow-hidden rounded-2xl",
          "border border-border bg-card shadow-2xl animate-slide-up",
        )}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-5 w-5 text-muted" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("common.cmdSearchPlaceholder")}
            className={cn(
              "h-14 flex-1 bg-transparent text-sm text-navy outline-none",
              "placeholder:text-muted",
            )}
          />
          <kbd className="hidden rounded-md border border-border bg-surface px-2 py-0.5 text-xs text-muted sm:inline">
            ESC
          </kbd>
          <button onClick={onClose} className="text-muted hover:text-navy">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {results.pages.length > 0 && (
            <Section title={t("common.pages")}>
              {results.pages.map((p) => (
                <ResultRow
                  key={p.path}
                  icon={p.icon}
                  label={t(p.labelKey)}
                  onClick={() => go(p.path)}
                />
              ))}
            </Section>
          )}

          {results.txns.length > 0 && (
            <Section title={t("common.transactions")}>
              {results.txns.map((tx) => (
                <ResultRow
                  key={tx.id}
                  icon={ArrowLeftRight}
                  label={tx.description}
                  meta={`${translateCategory(t, tx.category)} · ${formatCurrency(Math.abs(tx.amount), "FCFA", intlLocale)}`}
                  onClick={() => go(`/transactions/${tx.id}`)}
                />
              ))}
            </Section>
          )}

          {results.accts.length > 0 && (
            <Section title={t("common.accounts")}>
              {results.accts.map((a) => (
                <ResultRow
                  key={a.id}
                  icon={Wallet}
                  label={a.provider}
                  meta={formatCurrency(a.balance, "FCFA", intlLocale)}
                  onClick={() => go(`/accounts/${a.id}`)}
                />
              ))}
            </Section>
          )}

          {query &&
            !results.pages.length &&
            !results.txns.length &&
            !results.accts.length && (
              <p className="px-4 py-8 text-center text-sm text-muted">
                {t("common.noResults", { query })}
              </p>
            )}

          {!query && (
            <p className="px-4 py-3 text-xs text-muted">
              {t("common.cmdHint")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-2">
      <p className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-muted">
        {title}
      </p>
      {children}
    </div>
  );
}

function ResultRow({
  icon: Icon,
  label,
  meta,
  onClick,
}: {
  icon: typeof Search;
  label: string;
  meta?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5",
        "text-left transition-colors hover:bg-surface",
      )}
    >
      <Icon className="h-4 w-4 text-muted" />
      <span className="flex-1 text-sm font-medium text-navy">{label}</span>
      {meta && <span className="text-xs text-muted">{meta}</span>}
    </button>
  );
}
