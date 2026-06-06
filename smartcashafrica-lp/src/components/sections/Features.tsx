import {
  BarChart3,
  Bot,
  HeartPulse,
  Landmark,
  PiggyBank,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useTranslation } from "@/context/I18nContext";

interface FeatureConfig {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  gradient: string;
}

const featureConfigs: FeatureConfig[] = [
  {
    icon: Landmark,
    titleKey: "features.aggregation.title",
    descKey: "features.aggregation.desc",
    gradient: "from-accent/10 to-accent/5",
  },
  {
    icon: Wallet,
    titleKey: "features.budgeting.title",
    descKey: "features.budgeting.desc",
    gradient: "from-primary/10 to-primary/5",
  },
  {
    icon: PiggyBank,
    titleKey: "features.savings.title",
    descKey: "features.savings.desc",
    gradient: "from-orange-500/10 to-orange-500/5",
  },
  {
    icon: Bot,
    titleKey: "features.aiAdvisor.title",
    descKey: "features.aiAdvisor.desc",
    gradient: "from-violet-500/10 to-violet-500/5",
  },
  {
    icon: HeartPulse,
    titleKey: "features.healthScore.title",
    descKey: "features.healthScore.desc",
    gradient: "from-emerald-500/10 to-emerald-500/5",
  },
  {
    icon: BarChart3,
    titleKey: "features.analytics.title",
    descKey: "features.analytics.desc",
    gradient: "from-blue-500/10 to-blue-500/5",
  },
];

export function Features() {
  const { t } = useTranslation();

  return (
    <section id="features" className="section-padding bg-surface/50">
      <div className="container-main">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-navy lg:text-[40px]">
            {t("features.title")}{" "}
            <span className="gradient-text">
              {t("features.titleHighlight")}
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted">{t("features.subtitle")}</p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureConfigs.map((feature, index) => (
            <Reveal key={feature.titleKey} delay={index * 80}>
              <div className="group h-full rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-card-hover">
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} transition-transform duration-300 group-hover:scale-110`}
                >
                  <feature.icon className="h-7 w-7 text-navy" />
                </div>
                <h3 className="text-xl font-semibold text-navy">
                  {t(feature.titleKey)}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {t(feature.descKey)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
