import {
  AlertTriangle,
  Sparkles,
  Trophy,
  RefreshCw,
  Shield,
  CheckCheck,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAppData } from "@/context/AppDataContext";
import { useToast } from "@/context/ToastContext";
import { useTranslation } from "@/context/I18nContext";
import {
  translateNotificationGroup,
  resolveNotificationTitle,
  resolveNotificationMessage,
  resolveNotificationTime,
} from "@/lib/i18n/helpers";
import { cn } from "@/lib/utils";

const typeConfig = {
  warning: { icon: AlertTriangle, variant: "warning" as const },
  info: { icon: Sparkles, variant: "info" as const },
  success: { icon: Trophy, variant: "success" as const },
  security: { icon: Shield, variant: "error" as const },
};

const groupIcons: Record<string, typeof AlertTriangle> = {
  "Budget Alerts": AlertTriangle,
  "AI Insights": Sparkles,
  "Savings Milestones": Trophy,
  "Account Updates": RefreshCw,
  "Security Events": Shield,
};

export function Notifications() {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    unreadCount,
  } = useAppData();
  const { toast } = useToast();
  const { t } = useTranslation();
  const groups = [...new Set(notifications.map((n) => n.group))];

  const handleMarkAll = () => {
    markAllNotificationsRead();
    toast(t("notifications.allMarked"), "success");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[40px] font-bold tracking-tight text-navy">
            {t("notifications.title")}
          </h1>
          <p className="mt-1 text-base text-muted">
            {t("notifications.subtitle")}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAll}>
            <CheckCheck className="h-4 w-4" />
            {t("notifications.markAllRead")}
          </Button>
        )}
      </div>

      <div className="space-y-8">
        {groups.map((group) => {
          const GroupIcon = groupIcons[group] ?? AlertTriangle;
          const items = notifications.filter((n) => n.group === group);

          return (
            <section key={group}>
              <div className="mb-4 flex items-center gap-2">
                <GroupIcon className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-navy">
                  {translateNotificationGroup(t, group)}
                </h2>
                <Badge>{items.length}</Badge>
              </div>

              <div className="relative space-y-0">
                <div className="absolute left-[23px] top-4 bottom-4 w-px bg-border" />
                {items.map((notif) => {
                  const config = typeConfig[notif.type];
                  const Icon = config.icon;

                  return (
                    <button
                      key={notif.id}
                      type="button"
                      onClick={() => markNotificationRead(notif.id)}
                      className="block w-full text-left"
                    >
                      <Card
                        padding="md"
                        className={cn(
                          "relative mb-3 ml-0 pl-14 transition-colors",
                          !notif.read &&
                            "border-primary/20 bg-primary-light/20",
                        )}
                      >
                        <div
                          className={cn(
                            "absolute left-4 top-5 flex h-8 w-8",
                            "items-center justify-center rounded-full",
                            notif.type === "warning" &&
                              "bg-amber-50 text-warning",
                            notif.type === "info" && "bg-blue-50 text-accent",
                            notif.type === "success" &&
                              "bg-green-50 text-success",
                            notif.type === "security" && "bg-red-50 text-error",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-navy">
                                {resolveNotificationTitle(t, notif)}
                              </p>
                              {!notif.read && (
                                <span className="h-2 w-2 rounded-full bg-primary" />
                              )}
                            </div>
                            <p className="mt-1 text-sm text-muted">
                              {resolveNotificationMessage(t, notif)}
                            </p>
                          </div>
                          <span className="shrink-0 text-xs text-muted">
                            {resolveNotificationTime(t, notif)}
                          </span>
                        </div>
                      </Card>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
