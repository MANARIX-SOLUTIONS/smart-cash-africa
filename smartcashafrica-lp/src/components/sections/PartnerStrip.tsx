import { Reveal } from "@/components/ui/Reveal";
import { useTranslation } from "@/context/I18nContext";

const partners = [
  { name: "Wave", color: "text-orange-600 bg-orange-50" },
  { name: "Orange Money", color: "text-orange-700 bg-orange-50" },
  { name: "MTN MoMo", color: "text-yellow-700 bg-yellow-50" },
  { name: "Ecobank", color: "text-accent bg-accent-light" },
  { name: "UBA", color: "text-red-700 bg-red-50" },
  { name: "BOA", color: "text-primary bg-primary-light" },
] as const;

export function PartnerStrip() {
  const { t } = useTranslation();

  return (
    <section className="border-y border-border/60 bg-card/80 py-10">
      <div className="container-main px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-sm font-medium text-muted">
            {t("partners.title")}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:gap-4">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${partner.color}`}
              >
                {partner.name}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
