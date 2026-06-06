import { ArrowRight, Check, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DashboardMockup } from "@/components/ui/DashboardMockup";
import { useDemo } from "@/context/DemoContext";
import { useTranslation } from "@/context/I18nContext";
import { appLinks } from "@/lib/links";

const trustKeys = [
  "hero.trust.secure",
  "hero.trust.private",
  "hero.trust.aiPowered",
  "hero.trust.builtForAfrica",
] as const;

export function Hero() {
  const { t } = useTranslation();
  const { openDemo } = useDemo();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />

      <div className="container-main relative px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-1.5 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {t("hero.badge")}
          </div>

          <h1
            className="animate-fade-in-up mt-8 text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[64px]"
            style={{ animationDelay: "0.1s" }}
          >
            {t("hero.title")}{" "}
            <span className="gradient-text">{t("hero.titleHighlight")}</span>
          </h1>

          <p
            className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted lg:text-[18px]"
            style={{ animationDelay: "0.2s" }}
          >
            {t("hero.subtitle")}
          </p>

          <div
            className="animate-fade-in-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ animationDelay: "0.3s" }}
          >
            <Button size="lg" href={appLinks.signup}>
              {t("nav.startFree")}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" onClick={openDemo}>
              <Play className="h-4 w-4 fill-current" />
              {t("hero.watchDemo")}
            </Button>
          </div>

          <div
            className="animate-fade-in-up mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
            style={{ animationDelay: "0.4s" }}
          >
            {trustKeys.map((key) => (
              <div
                key={key}
                className="flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-3 py-1.5 text-sm font-medium text-muted shadow-sm"
              >
                <Check className="h-4 w-4 text-primary" />
                {t(key)}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
