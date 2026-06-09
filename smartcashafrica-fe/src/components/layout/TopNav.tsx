import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, Plus, Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { QuickAddModal } from "@/components/ui/QuickAddModal";
import { CommandPalette } from "@/components/search/CommandPalette";
import { ProfileMenu } from "./ProfileMenu";
import { useTheme } from "@/context/ThemeContext";
import { useAppData } from "@/context/AppDataContext";
import { useTranslation } from "@/context/I18nContext";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { cn } from "@/lib/utils";

interface TopNavProps {
  onMenuClick: () => void;
}

export function TopNav({ onMenuClick }: TopNavProps) {
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { resolvedTheme, theme, toggleTheme } = useTheme();
  const { unreadCount } = useAppData();
  const { t } = useTranslation();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-30 flex h-16 min-w-0 items-center justify-between",
          "gap-2 border-b border-border bg-card/90 px-3 backdrop-blur-lg",
          "sm:gap-4 sm:px-6",
          "dark:bg-card/85 dark:shadow-[0_1px_0_0_var(--color-border)]",
        )}
      >
        <button
          onClick={onMenuClick}
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            "border border-border text-muted lg:hidden",
            "transition-colors hover:bg-surface hover:text-navy",
          )}
          aria-label={t("common.openMenu")}
        >
          <Menu className="h-5 w-5" />
        </button>

        <button
          onClick={() => setSearchOpen(true)}
          className={cn(
            "relative flex min-w-0 flex-1 items-center gap-2 sm:gap-3",
            "h-10 max-w-md rounded-xl border border-border bg-surface px-3",
            "text-left transition-all hover:border-primary/30",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
          )}
        >
          <Search className="h-4 w-4 shrink-0 text-muted" />
          <span className="hidden min-w-0 flex-1 truncate text-sm text-muted sm:inline">
            {t("common.searchPlaceholder")}
          </span>
          <kbd className="ml-auto hidden shrink-0 rounded-md border border-border bg-card px-1.5 py-0.5 text-[10px] text-muted md:inline">
            ⌘K
          </kbd>
        </button>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <button
            onClick={toggleTheme}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl",
              "border border-border transition-colors",
              resolvedTheme === "dark"
                ? "bg-surface text-warning hover:bg-surface-hover"
                : "text-muted hover:bg-surface hover:text-navy",
            )}
            aria-label={t("common.toggleTheme")}
            title={
              theme === "system"
                ? t("settings.themes.system")
                : resolvedTheme === "dark"
                  ? t("settings.themes.dark")
                  : t("settings.themes.light")
            }
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <Button
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => setQuickAddOpen(true)}
          >
            <Plus className="h-4 w-4" />
            {t("common.quickAdd")}
          </Button>

          <button
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl",
              "border border-border text-muted sm:hidden",
              "transition-colors hover:bg-surface hover:text-navy",
            )}
            onClick={() => setQuickAddOpen(true)}
            aria-label={t("common.quickAdd")}
          >
            <Plus className="h-5 w-5" />
          </button>

          <LanguageSwitcher variant="compact" className="hidden sm:block" />

          <Link
            to="/notifications"
            className={cn(
              "relative flex h-10 w-10 items-center justify-center",
              "rounded-xl border border-border text-muted",
              "transition-colors hover:bg-surface hover:text-navy",
            )}
            aria-label={t("common.notifications")}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[10px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>

          <ProfileMenu />
        </div>
      </header>

      <QuickAddModal
        open={quickAddOpen}
        onClose={() => setQuickAddOpen(false)}
      />
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
