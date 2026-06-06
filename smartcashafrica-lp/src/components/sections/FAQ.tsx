import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useTranslation } from "@/context/I18nContext";
import { cn } from "@/lib/utils";

const faqIds = [
  "what",
  "security",
  "mobileMoney",
  "pricing",
  "countries",
] as const;

export function FAQ() {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState<string | null>("what");

  return (
    <section id="faq" className="section-padding bg-surface/50">
      <div className="container-main">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel>{t("faq.eyebrow")}</SectionLabel>
          <h2 className="mt-4 text-3xl font-semibold text-navy lg:text-[40px]">
            {t("faq.title")}
          </h2>
          <p className="mt-4 text-lg text-muted">{t("faq.subtitle")}</p>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqIds.map((id, index) => {
            const isOpen = openId === id;
            return (
              <Reveal key={id} delay={index * 60}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border bg-card transition-all duration-300",
                    isOpen
                      ? "border-primary/30 shadow-card-hover"
                      : "border-border",
                  )}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpenId(isOpen ? null : id)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-navy">
                      {t(`faq.items.${id}.question`)}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-muted transition-transform duration-300",
                        isOpen && "rotate-180 text-primary",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-base leading-relaxed text-muted">
                        {t(`faq.items.${id}.answer`)}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
