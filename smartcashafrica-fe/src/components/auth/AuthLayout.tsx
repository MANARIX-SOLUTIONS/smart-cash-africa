import { Link } from "react-router-dom";
import { Shield, TrendingUp, Bot } from "lucide-react";
import { useTranslation } from "@/context/I18nContext";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { lpLinks } from "@/lib/links";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

function BrandLogo({ className }: { className?: string }) {
  const { t } = useTranslation();

  const logo = (
    <>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
        <span className="text-sm font-bold text-white">SC</span>
      </div>
      <span className={`font-semibold ${className ?? ""}`}>
        {t("brand.name")}
      </span>
    </>
  );

  if (lpLinks.isExternal) {
    return (
      <a href={lpLinks.home} className="relative flex items-center gap-3">
        {logo}
      </a>
    );
  }

  return (
    <Link to="/" className="relative flex items-center gap-3">
      {logo}
    </Link>
  );
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const { t } = useTranslation();

  const features = [
    { icon: TrendingUp, textKey: "auth.trackAccounts" },
    { icon: Bot, textKey: "auth.aiCoaching" },
    { icon: Shield, textKey: "auth.bankSecurity" },
  ];

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden overflow-hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-between bg-[#0F172A] p-12 text-white">
        <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />

        <BrandLogo className="text-white" />

        <div className="relative">
          <h2 className="text-4xl font-bold leading-tight">
            {t("auth.takeControl")}
            <br />
            <span className="bg-gradient-to-r from-primary to-emerald-300 bg-clip-text text-transparent">
              {t("auth.yourFinances")}
            </span>
          </h2>
          <p className="mt-4 max-w-md text-white/70">{t("auth.authTagline")}</p>

          <div className="mt-10 space-y-4">
            {features.map(({ icon: Icon, textKey }) => (
              <div
                key={textKey}
                className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur-sm"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-white/80">{t(textKey)}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-white/40">{t("auth.rights")}</p>
      </div>

      <div className="relative flex flex-1 flex-col justify-center bg-background px-6 py-12 sm:px-12">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl lg:hidden" />

        <div className="relative mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <BrandLogo className="text-navy" />
            <LanguageSwitcher variant="compact" />
          </div>

          <h1 className="text-3xl font-bold text-navy">{title}</h1>
          <p className="mt-2 text-muted">{subtitle}</p>

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
