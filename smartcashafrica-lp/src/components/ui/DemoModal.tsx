import { useEffect } from "react";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/context/I18nContext";
import { appLinks } from "@/lib/links";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t("demo.title")}
    >
      <button
        type="button"
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label={t("demo.close")}
      />
      <div className="relative w-full max-w-2xl animate-fade-in-up rounded-3xl border border-border bg-card p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-navy"
          aria-label={t("demo.close")}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-navy to-navy-light text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,168,107,0.2),transparent_50%)]" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 ring-4 ring-primary/10">
            <Play className="h-8 w-8 fill-primary text-primary" />
          </div>
          <p className="relative mt-4 text-lg font-semibold text-white">
            {t("demo.title")}
          </p>
          <p className="relative mt-2 max-w-sm px-6 text-sm text-slate-400">
            {t("demo.subtitle")}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button className="flex-1" href={appLinks.signup} onClick={onClose}>
            {t("nav.startFree")}
          </Button>
          <Button variant="outline" className="flex-1" onClick={onClose}>
            {t("demo.close")}
          </Button>
        </div>
      </div>
    </div>
  );
}
