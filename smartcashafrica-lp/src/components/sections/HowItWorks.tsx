import { BarChart3, Link2, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useTranslation } from "@/context/I18nContext";

interface StepConfig {
  number: string;
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
}

const stepConfigs: StepConfig[] = [
  {
    number: "01",
    icon: Link2,
    titleKey: "howItWorks.connect.title",
    descKey: "howItWorks.connect.desc",
  },
  {
    number: "02",
    icon: BarChart3,
    titleKey: "howItWorks.analyze.title",
    descKey: "howItWorks.analyze.desc",
  },
  {
    number: "03",
    icon: Sparkles,
    titleKey: "howItWorks.improve.title",
    descKey: "howItWorks.improve.desc",
  },
];

export function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="section-padding">
      <div className="container-main">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel>{t("nav.howItWorks")}</SectionLabel>
          <h2 className="mt-4 text-3xl font-semibold text-navy lg:text-[40px]">
            {t("howItWorks.title")}
          </h2>
          <p className="mt-4 text-lg text-muted">{t("howItWorks.subtitle")}</p>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-24 hidden h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-3">
            {stepConfigs.map((step, index) => (
              <Reveal key={step.titleKey} delay={index * 120}>
                <div className="relative text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <span className="mt-6 inline-block text-sm font-bold text-primary/60">
                    {t("howItWorks.step")} {step.number}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold text-navy">
                    {t(step.titleKey)}
                  </h3>
                  <p className="mx-auto mt-3 max-w-xs text-base leading-relaxed text-muted">
                    {t(step.descKey)}
                  </p>
                  {index < stepConfigs.length - 1 && (
                    <div className="mx-auto mt-8 h-8 w-px bg-border lg:hidden" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
