import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useTranslation } from "@/context/I18nContext";
import { useActiveSection } from "@/hooks/useActiveSection";
import { appLinks } from "@/lib/links";
import { cn } from "@/lib/utils";

const navLinks = [
  { key: "nav.features", href: "#features", id: "features" },
  { key: "nav.howItWorks", href: "#how-it-works", id: "how-it-works" },
  { key: "nav.security", href: "#security", id: "security" },
  { key: "nav.pricing", href: "#pricing", id: "pricing" },
  { key: "nav.resources", href: "#resources", id: "resources" },
] as const;

export function Header() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const activeSection = useActiveSection(navLinks.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled || isMobileOpen
          ? "glass border-b border-white/40 py-3 shadow-sm"
          : "bg-transparent py-5",
      )}
    >
      <div className="container-main flex items-center justify-between px-6 lg:px-8">
        <a href="#" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30 transition-transform group-hover:scale-105">
            <span className="text-sm font-bold text-white">SC</span>
          </div>
          <span className="text-lg font-semibold text-navy">
            {t("brand.name")}
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                activeSection === link.id
                  ? "text-primary"
                  : "text-muted hover:text-navy",
              )}
            >
              {t(link.key)}
              {activeSection === link.id && (
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary" />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Button variant="ghost" size="sm" href={appLinks.login}>
            {t("nav.signIn")}
          </Button>
          <Button size="sm" href={appLinks.signup}>
            {t("nav.startFree")}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="rounded-lg p-2 text-navy"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={t("nav.toggleMenu")}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "glass overflow-hidden border-t border-white/40 lg:hidden",
          "transition-all duration-300 ease-out",
          isMobileOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                activeSection === link.id
                  ? "bg-primary-light text-primary"
                  : "text-navy hover:bg-surface",
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              {t(link.key)}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
            <Button variant="ghost" href={appLinks.login}>
              {t("nav.signIn")}
            </Button>
            <Button href={appLinks.signup}>{t("nav.startFree")}</Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
