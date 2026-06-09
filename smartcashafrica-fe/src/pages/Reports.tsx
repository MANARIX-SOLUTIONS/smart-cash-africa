import { Link } from "react-router-dom";
import {
  FileText,
  Download,
  FileSpreadsheet,
  File,
  Eye,
  BarChart3,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { useToast } from "@/context/ToastContext";
import { useTranslation } from "@/context/I18nContext";
import { downloadReportFile } from "@/lib/export";
import {
  translateExportFormat,
  translateReport,
  translateReportPeriod,
} from "@/lib/i18n/helpers";
import { reports } from "@/lib/mock-data";

const typeIcons: Record<string, typeof FileText> = {
  summary: FileText,
  spending: BarChart3,
  budget: FileSpreadsheet,
  savings: FileText,
  health: File,
};

const exportFormats = ["PDF", "Excel", "CSV"] as const;

export function Reports() {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleExport = (reportName: string, format: string) => {
    downloadReportFile(
      reportName,
      format,
      `${reportName}\n${t("reports.generatedBy")}\n${t("reports.formatLabel")}: ${translateExportFormat(t, format)}`,
    );
    toast(
      t("reports.exported", {
        name: reportName,
        format: translateExportFormat(t, format),
      }),
      "success",
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title={t("reports.title")} subtitle={t("reports.subtitle")} />

      <section>
        <h2 className="text-lg font-semibold text-navy">
          {t("reports.available")}
        </h2>
        <p className="mt-1 text-sm text-muted">{t("reports.availableSub")}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {reports.map((report) => {
            const Icon = typeIcons[report.type] ?? FileText;
            const translated = translateReport(t, report.id, {
              name: report.name,
              description: report.description,
            });

            return (
              <Card key={report.id} hover>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-navy">
                      {translated.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {translated.description}
                    </p>
                    <p className="mt-2 text-xs font-medium text-primary">
                      {translateReportPeriod(t, report.period)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:flex-wrap">
                  <Link
                    to={`/reports/${report.id}`}
                    className="w-full sm:w-auto sm:flex-1"
                  >
                    <Button variant="primary" size="sm" className="w-full">
                      <Eye className="h-3.5 w-3.5" />
                      {t("common.view")}
                    </Button>
                  </Link>
                  <div className="grid grid-cols-3 gap-2 sm:contents">
                    {exportFormats.map((format) => (
                      <Button
                        key={format}
                        variant="outline"
                        size="sm"
                        className="w-full sm:flex-1"
                        onClick={() => handleExport(translated.name, format)}
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">
                          {translateExportFormat(t, format)}
                        </span>
                        <span className="sm:hidden">{format}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <Card className="border-dashed">
        <h3 className="text-lg font-semibold text-navy">
          {t("reports.exportsTitle")}
        </h3>
        <p className="mt-1 text-sm text-muted">{t("reports.exportsSub")}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {exportFormats.map((format) => (
            <span
              key={format}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-navy"
            >
              {translateExportFormat(t, format)}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
