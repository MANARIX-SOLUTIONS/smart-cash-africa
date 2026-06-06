import { Bot, Send, Sparkles, TrendingUp } from "lucide-react";
import { useTranslation } from "@/context/I18nContext";

const insightKeys = [
  {
    labelKey: "aiAdvisor.spendingTrends",
    valueKey: "aiAdvisor.spendingTrendsValue",
  },
  { labelKey: "aiAdvisor.cashFlow", valueKey: "aiAdvisor.cashFlowValue" },
  {
    labelKey: "aiAdvisor.goalProjections",
    valueKey: "aiAdvisor.goalProjectionsValue",
  },
  { labelKey: "aiAdvisor.healthTips", valueKey: "aiAdvisor.healthTipsValue" },
] as const;

const categoryKeys = [
  { key: "aiAdvisor.categories.food", pct: 35, color: "bg-primary" },
  { key: "aiAdvisor.categories.transport", pct: 25, color: "bg-accent" },
  { key: "aiAdvisor.categories.bills", pct: 20, color: "bg-orange-400" },
  { key: "aiAdvisor.categories.other", pct: 20, color: "bg-slate-500" },
] as const;

export function AIAdvisor() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-navy section-padding">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(37,99,235,0.15),_transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,168,107,0.1),_transparent_50%)]" />

      <div className="container-main relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              {t("aiAdvisor.badge")}
            </div>
            <h2 className="mt-6 text-3xl font-semibold text-white lg:text-[40px]">
              {t("aiAdvisor.title")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-400">
              {t("aiAdvisor.subtitle")}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {insightKeys.map((item) => (
                <div key={item.labelKey} className="glass-dark rounded-xl p-4">
                  <p className="text-xs text-slate-500">{t(item.labelKey)}</p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {t(item.valueKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="animate-pulse-glow rounded-3xl border border-white/10 bg-navy-light p-6 shadow-2xl">
              <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {t("aiAdvisor.chatName")}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t("aiAdvisor.chatStatus")}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-br-md bg-accent px-4 py-3 text-sm text-white">
                    {t("aiAdvisor.userQuestion")}
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="max-w-[85%] rounded-2xl rounded-bl-md glass-dark px-4 py-3 text-sm leading-relaxed text-slate-300">
                    {t("aiAdvisor.aiResponse", {
                      amount: t("aiAdvisor.aiAmount"),
                    })}
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 rounded-2xl glass-dark p-4">
                    <p className="text-xs font-medium text-slate-500">
                      {t("aiAdvisor.spendingBreakdown")}
                    </p>
                    <div className="mt-3 space-y-2">
                      {categoryKeys.map((item) => (
                        <div key={item.key} className="flex items-center gap-2">
                          <span className="w-16 text-xs text-slate-400">
                            {t(item.key)}
                          </span>
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                            <div
                              className={`h-full rounded-full ${item.color}`}
                              style={{ width: `${item.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <input
                  type="text"
                  placeholder={t("aiAdvisor.inputPlaceholder")}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
                  readOnly
                />
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white"
                  aria-label={t("aiAdvisor.sendMessage")}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
