import { Globe, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAppData } from "@/context/AppDataContext";
import { useTranslation } from "@/context/I18nContext";
import { localeOrderForUser } from "@/lib/i18n";
import { LOCALE_CONFIG } from "@/lib/i18n/locales";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  variant?: "default" | "compact";
  className?: string;
}

export function LanguageSwitcher({
  variant = "default",
  className,
}: LanguageSwitcherProps) {
  const { profile } = useAppData();
  const { locale, setLocale, t } = useTranslation();
  const localeOrder = localeOrderForUser(profile);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LOCALE_CONFIG[locale];

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
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="text-base leading-none" aria-hidden>
          {current.flag}
        </span>
        {variant === "default" ? (
          <span>{current.nativeName}</span>
        ) : (
          <span className="uppercase">{locale}</span>
        )}
        <Globe className="h-4 w-4 text-muted" />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t("settings.language")}
          className={cn(
            "absolute right-0 top-full z-50 mt-2 min-w-[200px]",
            "rounded-xl border border-border bg-card py-1 shadow-lg",
            "animate-fade-in",
          )}
        >
          {localeOrder.map((code) => {
            const config = LOCALE_CONFIG[code];
            const isActive = locale === code;
            return (
              <button
                key={code}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-2.5",
                  "text-left text-sm transition-colors hover:bg-surface",
                  isActive && "bg-primary-light/50 text-primary",
                )}
              >
                <span className="text-lg leading-none">{config.flag}</span>
                <div className="flex-1">
                  <p className="font-medium text-navy">{config.nativeName}</p>
                  <p className="text-xs text-muted">{t(config.labelKey)}</p>
                </div>
                {isActive && <Check className="h-4 w-4 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
