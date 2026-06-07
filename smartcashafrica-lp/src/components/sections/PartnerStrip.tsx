import { Reveal } from "@/components/ui/Reveal";
import { useTranslation } from "@/context/I18nContext";

const partners = [
  {
    id: "wave",
    name: "Wave",
    logo: "/providers/wave.png",
    bg: "#00D4FF",
  },
  {
    id: "orange",
    name: "Orange Money",
    logo: "/providers/orange.svg",
    bg: "#FF7900",
  },
  {
    id: "mtn",
    name: "MTN MoMo",
    logo: "/providers/mtn.svg",
    bg: "#FFCC00",
  },
  {
    id: "ecobank",
    name: "Ecobank",
    logo: "/providers/ecobank.svg",
    bg: "#FFFFFF",
  },
  {
    id: "cbao",
    name: "CBAO",
    logo: "/providers/cbao.jpg",
    bg: "#FFFFFF",
  },
  {
    id: "boa",
    name: "BOA",
    logo: "/providers/boa.png",
    bg: "#FFFFFF",
  },
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
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className={[
                  "flex h-12 min-w-[120px] items-center justify-center",
                  "rounded-xl border border-border/60 px-4 py-2",
                  "shadow-sm",
                ].join(" ")}
                style={{ backgroundColor: partner.bg }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-8 max-w-[100px] object-contain"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
