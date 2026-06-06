import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Settings, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/I18nContext";
import { cn } from "@/lib/utils";

export function ProfileMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const initial = user?.name.charAt(0).toUpperCase() ?? "U";
  const firstName = user?.name.split(" ")[0] ?? "User";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 rounded-xl border border-border",
          "px-2 py-2 transition-colors hover:bg-surface sm:px-3",
        )}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
          {initial}
        </div>
        <div className="hidden text-left md:block">
          <p className="text-sm font-medium text-navy">{firstName}</p>
          <p className="text-xs text-muted">{t("common.premium")}</p>
        </div>
        <ChevronDown
          className={cn(
            "hidden h-4 w-4 text-muted transition-transform md:block",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 top-full z-50 mt-2 w-56",
            "rounded-xl border border-border bg-card py-2",
            "shadow-[var(--shadow-card-hover)] animate-fade-in",
          )}
        >
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-medium text-navy">{user?.name}</p>
            <p className="text-xs text-muted">{user?.email}</p>
          </div>

          <Link
            to="/settings/profile"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 text-sm text-navy",
              "transition-colors hover:bg-surface",
            )}
          >
            <User className="h-4 w-4 text-muted" />
            {t("profile.profile")}
          </Link>
          <Link
            to="/settings/profile"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 text-sm text-navy",
              "transition-colors hover:bg-surface",
            )}
          >
            <Settings className="h-4 w-4 text-muted" />
            {t("profile.settings")}
          </Link>

          <div className="my-1 border-t border-border" />

          <button
            onClick={handleLogout}
            className={cn(
              "flex w-full items-center gap-3 px-4 py-2.5 text-sm text-error",
              "transition-colors hover:bg-red-50 dark:hover:bg-red-950",
            )}
          >
            <LogOut className="h-4 w-4" />
            {t("auth.signOut")}
          </button>
        </div>
      )}
    </div>
  );
}
