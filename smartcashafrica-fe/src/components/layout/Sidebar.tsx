import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  PieChart,
  Target,
  HeartPulse,
  Bot,
  FileText,
  Bell,
  HelpCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useTranslation } from "@/context/I18nContext";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", labelKey: "nav.dashboard", icon: LayoutDashboard },
  { to: "/accounts", labelKey: "nav.myAccounts", icon: Wallet },
  { to: "/transactions", labelKey: "nav.transactions", icon: ArrowLeftRight },
  { to: "/budgets", labelKey: "nav.budgets", icon: PieChart },
  { to: "/savings", labelKey: "nav.savings", icon: Target },
  { to: "/health", labelKey: "nav.health", icon: HeartPulse },
  { to: "/advisor", labelKey: "nav.advisor", icon: Bot },
  { to: "/reports", labelKey: "nav.reports", icon: FileText },
  { to: "/notifications", labelKey: "nav.notifications", icon: Bell },
  { to: "/help", labelKey: "nav.help", icon: HelpCircle },
  { to: "/settings/profile", labelKey: "nav.settings", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onMobileClose: () => void;
}

export function Sidebar({
  collapsed,
  mobileOpen,
  onToggle,
  onMobileClose,
}: SidebarProps) {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <>
      {mobileOpen && (
        <button
          className="fixed inset-0 z-40 bg-overlay backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
          aria-label={t("common.closeNav")}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen flex-col",
          "border-r border-border bg-card transition-all duration-300",
          "lg:z-40",
          collapsed ? "lg:w-[72px]" : "lg:w-[260px]",
          mobileOpen ? "w-[260px]" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div
          className={cn(
            "flex h-16 items-center border-b border-border px-4",
            collapsed && !mobileOpen ? "lg:justify-center" : "gap-3",
          )}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary">
            <span className="text-sm font-bold text-white">SC</span>
          </div>
          {(!collapsed || mobileOpen) && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-semibold text-navy">
                {t("brand.short")}
              </p>
              <p className="truncate text-xs text-muted">{t("brand.region")}</p>
            </div>
          )}
          <button
            onClick={onMobileClose}
            className="rounded-lg p-1.5 text-muted hover:bg-surface lg:hidden"
            aria-label={t("common.closeMenu")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map(({ to, labelKey, icon: Icon }) => {
            const label = t(labelKey);
            return (
              <NavLink
                key={to}
                to={to}
                end={to === "/dashboard"}
                onClick={onMobileClose}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5",
                    "text-sm font-medium transition-all duration-200",
                    collapsed && !mobileOpen && "lg:justify-center lg:px-2",
                    isActive ||
                      (to.startsWith("/settings") &&
                        location.pathname.startsWith("/settings"))
                      ? "bg-primary-light text-primary"
                      : "text-muted hover:bg-surface hover:text-navy",
                  )
                }
                title={collapsed && !mobileOpen ? label : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {(!collapsed || mobileOpen) && <span>{label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <button
          onClick={onToggle}
          className={cn(
            "hidden h-12 items-center justify-center lg:flex",
            "border-t border-border text-muted",
            "transition-colors hover:bg-surface hover:text-navy",
          )}
          aria-label={
            collapsed ? t("common.expandSidebar") : t("common.collapseSidebar")
          }
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </aside>
    </>
  );
}
