import { ArrowRight, Check, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useTranslation } from "@/context/I18nContext";

const painKeys = [
  "problemSolution.pain1",
  "problemSolution.pain2",
  "problemSolution.pain3",
  "problemSolution.pain4",
] as const;

const solutionKeys = [
  "problemSolution.sol1",
  "problemSolution.sol2",
  "problemSolution.sol3",
  "problemSolution.sol4",
  "problemSolution.sol5",
] as const;

export function ProblemSolution() {
  const { t } = useTranslation();

  return (
    <section className="section-padding">
      <div className="container-main">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="rounded-3xl border border-border bg-card p-8 lg:p-10">
              <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
                {t("problemSolution.problemBadge")}
              </span>
              <h3 className="mt-4 text-2xl font-semibold text-navy lg:text-3xl">
                {t("problemSolution.problemTitle")}
              </h3>
              <ul className="mt-8 space-y-5">
                {painKeys.map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50">
                      <X className="h-3.5 w-3.5 text-red-500" />
                    </div>
                    <span className="text-base leading-relaxed text-muted lg:text-lg">
                      &ldquo;{t(key)}&rdquo;
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative rounded-3xl border border-primary/20 bg-gradient-to-br from-primary-light to-card p-8 lg:p-10">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {t("problemSolution.solutionBadge")}
              </span>
              <h3 className="mt-4 text-2xl font-semibold text-navy lg:text-3xl">
                {t("problemSolution.solutionTitle")}
              </h3>
              <ul className="mt-8 space-y-5">
                {solutionKeys.map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-base leading-relaxed text-navy lg:text-lg">
                      {t(key)}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#how-it-works"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
              >
                {t("problemSolution.cta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
