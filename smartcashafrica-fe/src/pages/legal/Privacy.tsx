import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/context/I18nContext";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

const sections = [
  { titleKey: "legal.privacy.s1Title", bodyKey: "legal.privacy.s1Body" },
  { titleKey: "legal.privacy.s2Title", bodyKey: "legal.privacy.s2Body" },
  { titleKey: "legal.privacy.s3Title", bodyKey: "legal.privacy.s3Body" },
  { titleKey: "legal.privacy.s4Title", bodyKey: "legal.privacy.s4Body" },
  { titleKey: "legal.privacy.s5Title", bodyKey: "legal.privacy.s5Body" },
  { titleKey: "legal.privacy.s6Title", bodyKey: "legal.privacy.s6Body" },
] as const;

export function Privacy() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="flex items-center justify-end">
          <LanguageSwitcher variant="compact" />
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("legal.backHome")}
        </Link>

        <h1 className="mt-8 text-4xl font-bold text-navy">
          {t("legal.privacy.title")}
        </h1>
        <p className="mt-2 text-muted">{t("legal.lastUpdated")}</p>

        <div className="mt-8 space-y-6">
          {sections.map((section) => (
            <section key={section.titleKey}>
              <h2 className="text-xl font-semibold text-navy">
                {t(section.titleKey)}
              </h2>
              <p className="mt-2 text-muted leading-relaxed">
                {t(section.bodyKey)}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
