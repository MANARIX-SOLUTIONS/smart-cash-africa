import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/context/I18nContext";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

const sections = [
  { titleKey: "legal.terms.s1Title", bodyKey: "legal.terms.s1Body" },
  { titleKey: "legal.terms.s2Title", bodyKey: "legal.terms.s2Body" },
  { titleKey: "legal.terms.s3Title", bodyKey: "legal.terms.s3Body" },
  { titleKey: "legal.terms.s4Title", bodyKey: "legal.terms.s4Body" },
  { titleKey: "legal.terms.s5Title", bodyKey: "legal.terms.s5Body" },
  { titleKey: "legal.terms.s6Title", bodyKey: "legal.terms.s6Body" },
] as const;

export function Terms() {
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
          {t("legal.terms.title")}
        </h1>
        <p className="mt-2 text-muted">{t("legal.lastUpdated")}</p>

        <div className="prose-mt mt-8 space-y-6 text-navy">
          {sections.map((section) => (
            <section key={section.titleKey}>
              <h2 className="text-xl font-semibold">{t(section.titleKey)}</h2>
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
