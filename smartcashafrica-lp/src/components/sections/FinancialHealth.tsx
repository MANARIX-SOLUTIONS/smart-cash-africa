import { Reveal } from "@/components/ui/Reveal";
import { useInView } from "@/hooks/useInView";
import { useTranslation } from "@/context/I18nContext";

const breakdownKeys = [
  { key: "financialHealth.savings", score: 88, color: "bg-primary" },
  { key: "financialHealth.budgetDiscipline", score: 76, color: "bg-accent" },
  {
    key: "financialHealth.incomeStability",
    score: 90,
    color: "bg-emerald-400",
  },
  { key: "financialHealth.emergencyFund", score: 72, color: "bg-orange-400" },
  { key: "financialHealth.goalProgress", score: 84, color: "bg-violet-400" },
] as const;

export function FinancialHealth() {
  const { t } = useTranslation();
  const { ref, isInView } = useInView();

  return (
    <section className="section-padding bg-surface/50">
      <div className="container-main">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-3xl font-semibold text-navy lg:text-[40px]">
              {t("financialHealth.title")}{" "}
              <span className="gradient-text">
                {t("financialHealth.titleHighlight")}
              </span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {t("financialHealth.subtitle")}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div
              ref={ref}
              className="rounded-3xl border border-border bg-card p-8 shadow-card-hover"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted">
                    {t("financialHealth.scoreLabel")}
                  </p>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-navy">82</span>
                    <span className="text-2xl text-muted">/ 100</span>
                  </div>
                </div>
                <div className="relative flex h-24 w-24 items-center justify-center">
                  <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="#00a86b"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${isInView ? 82 * 2.64 : 0} 264`}
                      className="transition-all duration-[2000ms] ease-out"
                    />
                  </svg>
                  <span className="absolute text-sm font-bold text-primary">
                    {t("financialHealth.rating")}
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-5">
                {breakdownKeys.map((item, index) => (
                  <div key={item.key}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-navy">
                        {t(item.key)}
                      </span>
                      <span className="text-muted">{item.score}/100</span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-1000 ease-out`}
                        style={{
                          width: isInView ? `${item.score}%` : "0%",
                          transitionDelay: `${index * 150}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
