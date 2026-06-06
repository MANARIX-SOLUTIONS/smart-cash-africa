import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";
import { useTranslation } from "@/context/I18nContext";

const stats = [
  { value: 100_000, suffix: "+", labelKey: "trust.users" },
  { value: 2_000_000, suffix: "+", labelKey: "trust.transactions" },
  { value: 20_000_000, suffix: "+", labelKey: "trust.savingsTracked" },
  { value: 50_000, suffix: "+", labelKey: "trust.connectedAccounts" },
] as const;

export function Trust() {
  const { t } = useTranslation();

  return (
    <section className="border-y border-border/60 bg-card">
      <div className="container-main section-padding !py-16">
        <Reveal>
          <h2 className="text-center text-2xl font-semibold text-navy lg:text-[40px]">
            {t("trust.title")}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, index) => (
            <Reveal key={stat.labelKey} delay={index * 80}>
              <div className="text-center">
                <p className="text-3xl font-bold text-navy lg:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-muted lg:text-base">
                  {t(stat.labelKey)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
