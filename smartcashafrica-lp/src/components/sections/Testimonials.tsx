import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useTranslation } from "@/context/I18nContext";
import { cn } from "@/lib/utils";

const testimonialIds = ["aminata", "kwame", "fatou", "jeanPaul"] as const;

export function Testimonials() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prev = () =>
    setActive((i) => (i === 0 ? testimonialIds.length - 1 : i - 1));
  const next = () =>
    setActive((i) => (i === testimonialIds.length - 1 ? 0 : i + 1));

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActive((i) => (i === testimonialIds.length - 1 ? 0 : i + 1));
    }, 6000);
    return () => window.clearInterval(timer);
  }, [isPaused, active]);

  const id = testimonialIds[active];

  return (
    <section className="section-padding">
      <div className="container-main">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel>{t("testimonials.eyebrow")}</SectionLabel>
          <h2 className="mt-4 text-3xl font-semibold text-navy lg:text-[40px]">
            {t("testimonials.title")}
          </h2>
          <p className="mt-4 text-lg text-muted">
            {t("testimonials.subtitle")}
          </p>
        </Reveal>

        <Reveal delay={150} className="relative mx-auto mt-16 max-w-3xl">
          <div
            className="rounded-3xl border border-border bg-card p-8 shadow-card lg:p-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <Quote className="h-10 w-10 text-primary/30" />
            <blockquote
              key={id}
              className="mt-6 animate-fade-in-up text-xl font-medium leading-relaxed text-navy lg:text-2xl"
            >
              &ldquo;{t(`testimonials.items.${id}.quote`)}&rdquo;
            </blockquote>
            <div
              key={`${id}-author`}
              className="mt-8 flex animate-fade-in-up items-center gap-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
                {t(`testimonials.items.${id}.name`)
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-navy">
                  {t(`testimonials.items.${id}.name`)}
                </p>
                <p className="text-sm text-muted">
                  {t(`testimonials.items.${id}.role`)} ·{" "}
                  {t(`testimonials.items.${id}.location`)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-navy transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary-light"
              aria-label={t("testimonials.prev")}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonialIds.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === active ? "w-8 bg-primary" : "w-2 bg-border",
                  )}
                  aria-label={t("testimonials.goTo", { n: i + 1 })}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-navy transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary-light"
              aria-label={t("testimonials.next")}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
