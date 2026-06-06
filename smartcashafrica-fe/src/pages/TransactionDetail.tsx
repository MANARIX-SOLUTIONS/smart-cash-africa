import { useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, Wallet, Tag, Hash } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { BackLink } from "@/components/ui/BackLink";
import { useAppData } from "@/context/AppDataContext";
import { useTranslation } from "@/context/I18nContext";
import { useToast } from "@/context/ToastContext";
import {
  getExportCsvHeaders,
  translateCategory,
  translateStatus,
} from "@/lib/i18n/helpers";
import { downloadTransactionsCsv } from "@/lib/export";
import { cn } from "@/lib/utils";
import { NotFound } from "@/pages/NotFound";

const statusVariant = {
  completed: "success",
  pending: "warning",
  failed: "error",
} as const;

export function TransactionDetail() {
  const { id } = useParams();
  const { getTransactionById } = useAppData();
  const { toast } = useToast();
  const { t, formatMoney, intlLocale } = useTranslation();
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);

  const tx = id ? getTransactionById(id) : undefined;

  if (!tx) return <NotFound />;

  const isIncome = tx.amount >= 0;

  const handleDispute = () => {
    toast(t("transactions.disputeSubmitted"), "info");
  };

  const handleSaveNote = () => {
    if (!note.trim()) return;
    toast(t("transactions.noteSaved"), "success");
    setShowNote(false);
  };

  const handleReceipt = () => {
    downloadTransactionsCsv(
      [tx],
      `receipt-${tx.id}.csv`,
      getExportCsvHeaders(t),
    );
    toast(t("transactions.receiptDownloaded"), "success");
  };

  const details = [
    {
      icon: Tag,
      label: t("common.category"),
      value: translateCategory(t, tx.category),
    },
    { icon: Wallet, label: t("common.account"), value: tx.account },
    {
      icon: Calendar,
      label: t("common.date"),
      value: new Date(tx.date).toLocaleDateString(intlLocale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    },
    {
      icon: Hash,
      label: t("common.reference"),
      value: `TXN-${tx.id.padStart(6, "0")}`,
    },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-8 animate-fade-in">
      <BackLink to="/transactions" label={t("transactions.back")} />

      <Card className="text-center">
        <Badge variant={statusVariant[tx.status]}>
          {translateStatus(t, tx.status)}
        </Badge>
        <p
          className={cn(
            "mt-4 text-4xl font-bold",
            isIncome ? "text-success" : "text-navy",
          )}
        >
          {isIncome ? "+" : "-"}
          {formatMoney(Math.abs(tx.amount))}
        </p>
        <h1 className="mt-2 text-xl font-semibold text-navy">
          {tx.description}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {new Date(tx.date).toLocaleDateString(intlLocale, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-semibold text-navy">
          {t("transactions.details")}
        </h3>
        <dl className="space-y-4">
          {details.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface">
                <Icon className="h-4 w-4 text-muted" />
              </div>
              <div>
                <dt className="text-xs text-muted">{label}</dt>
                <dd className="text-sm font-medium text-navy">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </Card>

      {showNote && (
        <Card>
          <Input
            label={t("transactions.noteLabel")}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t("transactions.notePlaceholder")}
          />
          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowNote(false)}
            >
              {t("common.cancel")}
            </Button>
            <Button
              className="flex-1"
              onClick={handleSaveNote}
              disabled={!note.trim()}
            >
              {t("transactions.saveNote")}
            </Button>
          </div>
        </Card>
      )}

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={handleDispute}>
          {t("common.dispute")}
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => setShowNote(true)}
        >
          {t("common.addNote")}
        </Button>
        <Button className="flex-1" onClick={handleReceipt}>
          {t("common.downloadReceipt")}
        </Button>
      </div>
    </div>
  );
}
