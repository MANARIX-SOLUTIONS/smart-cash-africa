import { Globe, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/context/I18nContext";
import type { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

const locales: Locale[] = ["fr", "en", "wo"];

interface LanguageSwitcherProps {
  variant?: "default" | "compact";
  className?: string;
}

export function LanguageSwitcher({
  variant = "default",
  className,
}: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 rounded-xl border border-border",
          "text-sm font-medium text-navy transition-colors hover:bg-surface",
          variant === "compact" ? "h-10 px-3" : "h-10 px-3",
        )}
        aria-label={t("settings.language")}
      >
        <Globe className="h-4 w-4 text-muted" />
        <span className="uppercase">{locale}</span>
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 top-full z-50 mt-2 min-w-[160px]",
            "rounded-xl border border-border bg-card py-1 shadow-lg",
            "animate-fade-in",
          )}
        >
          {locales.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setLocale(code);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between px-4 py-2.5",
                "text-left text-sm transition-colors hover:bg-surface",
                locale === code && "text-primary",
              )}
            >
              {t(`settings.languages.${code}`)}
              {locale === code && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
