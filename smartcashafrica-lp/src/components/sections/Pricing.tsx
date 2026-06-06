import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useTranslation } from "@/context/I18nContext";
import { appLinks } from "@/lib/links";

const planConfigs = [
  {
    id: "free" as const,
    highlighted: false,
    featureKeys: [
      "pricing.free.features.dashboard",
      "pricing.free.features.transactions",
      "pricing.free.features.budgets",
      "pricing.free.features.savings",
      "pricing.free.features.aggregation",
    ],
  },
  {
    id: "premium" as const,
    highlighted: true,
    featureKeys: [
      "pricing.premium.features.allFree",
      "pricing.premium.features.aiAdvisor",
      "pricing.premium.features.analytics",
      "pricing.premium.features.healthScore",
      "pricing.premium.features.cashFlow",
      "pricing.premium.features.support",
    ],
  },
];

export function Pricing() {
  const { t } = useTranslation();

  return (
    <section id="pricing" className="section-padding">
      <div className="container-main">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel>{t("nav.pricing")}</SectionLabel>
          <h2 className="mt-4 text-3xl font-semibold text-navy lg:text-[40px]">
            {t("pricing.title")}
          </h2>
          <p className="mt-4 text-lg text-muted">{t("pricing.subtitle")}</p>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-4xl gap-8 lg:grid-cols-2">
          {planConfigs.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 100}>
              <div
                className={`relative h-full rounded-3xl border p-8 lg:p-10 ${
                  plan.highlighted
                    ? "border-primary bg-gradient-to-b from-primary-light/50 to-card shadow-xl shadow-primary/10"
                    : "border-border bg-card"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white">
                      <Sparkles className="h-3.5 w-3.5" />
                      {t("pricing.mostPopular")}
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-semibold text-navy">
                  {t(`pricing.${plan.id}.name`)}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {t(`pricing.${plan.id}.description`)}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-navy">
                    {plan.id === "free" ? "0" : "2,500"}
                  </span>
                  <span className="text-sm text-muted">
                    {t("pricing.period")}
                  </span>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.featureKeys.map((key) => (
                    <li key={key} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm text-navy">{t(key)}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlighted ? "primary" : "outline"}
                  className="mt-8 w-full"
                  size="lg"
                  href={appLinks.signup}
                >
                  {t(`pricing.${plan.id}.cta`)}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
