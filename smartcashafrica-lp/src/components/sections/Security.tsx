import { Cloud, Eye, KeyRound, Lock, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useTranslation } from "@/context/I18nContext";

const securityConfigs: {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
}[] = [
  {
    icon: Lock,
    titleKey: "security.encryption.title",
    descKey: "security.encryption.desc",
  },
  {
    icon: KeyRound,
    titleKey: "security.mfa.title",
    descKey: "security.mfa.desc",
  },
  {
    icon: Eye,
    titleKey: "security.privacy.title",
    descKey: "security.privacy.desc",
  },
  {
    icon: Cloud,
    titleKey: "security.cloud.title",
    descKey: "security.cloud.desc",
  },
  {
    icon: Shield,
    titleKey: "security.financialGrade.title",
    descKey: "security.financialGrade.desc",
  },
];

export function Security() {
  const { t } = useTranslation();

  return (
    <section id="security" className="section-padding bg-surface/50">
      <div className="container-main">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel>{t("nav.security")}</SectionLabel>
          <div className="mx-auto mb-6 mt-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-semibold text-navy lg:text-[40px]">
            {t("security.title")}
          </h2>
          <p className="mt-4 text-lg text-muted">{t("security.subtitle")}</p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {securityConfigs.map((feature, index) => (
            <Reveal key={feature.titleKey} delay={index * 60}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-card-hover">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-navy">
                  {t(feature.titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(feature.descKey)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {["SOC 2", "GDPR", "PCI DSS", "ISO 27001"].map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3"
            >
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-navy">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
