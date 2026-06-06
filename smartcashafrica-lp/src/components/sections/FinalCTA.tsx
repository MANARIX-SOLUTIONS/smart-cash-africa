import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { useDemo } from "@/context/DemoContext";
import { useTranslation } from "@/context/I18nContext";
import { appLinks } from "@/lib/links";

export function FinalCTA() {
  const { t } = useTranslation();
  const { openDemo } = useDemo();

  return (
    <section className="relative overflow-hidden section-padding">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />

      <div className="container-main relative">
        <Reveal>
          <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-10 text-center shadow-card-hover lg:p-16">
            <h2 className="text-3xl font-bold text-navy lg:text-5xl">
              {t("finalCta.title")}{" "}
              <span className="gradient-text">
                {t("finalCta.titleHighlight")}
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {t("finalCta.subtitle")}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" href={appLinks.signup}>
                {t("nav.startFree")}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={openDemo}>
                <Calendar className="h-5 w-5" />
                {t("finalCta.bookDemo")}
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted">{t("finalCta.footnote")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
