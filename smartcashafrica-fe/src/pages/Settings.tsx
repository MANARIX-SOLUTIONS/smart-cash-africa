import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  User,
  Shield,
  Link2,
  Bell,
  Globe,
  Coins,
  Palette,
  CreditCard,
  Sun,
  Moon,
  Monitor,
  Check,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { ThemePreview } from "@/components/ui/ThemePreview";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useAppData } from "@/context/AppDataContext";
import { useToast } from "@/context/ToastContext";
import { useTranslation } from "@/context/I18nContext";
import { isSenegaleseUser, localeOrderForUser } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";
import { translateAccountType } from "@/lib/i18n/helpers";
import {
  CURRENCY_GROUPS,
  CURRENCY_OPTIONS,
  getCurrenciesByGroup,
} from "@/lib/currencies";
import { cn } from "@/lib/utils";

const sectionIds = [
  "profile",
  "security",
  "accounts",
  "notifications",
  "language",
  "currency",
  "theme",
  "subscription",
  "privacy",
] as const;

const sectionIcons = {
  profile: User,
  security: Shield,
  accounts: Link2,
  notifications: Bell,
  language: Globe,
  currency: Coins,
  theme: Palette,
  subscription: CreditCard,
  privacy: ShieldCheck,
} as const;

const languageFlags: Record<Locale, string> = {
  fr: "🇫🇷",
  en: "🇬🇧",
  wo: "🇸🇳",
};

const themeOptionIds = ["light", "dark", "system"] as const;
const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

const notifPrefIds = [
  "budget",
  "ai",
  "savings",
  "accounts",
  "security",
] as const;

const securityItemKeys = [
  "twoFactor",
  "biometric",
  "sessions",
  "changePassword",
] as const;

export function Settings() {
  const { section } = useParams();
  const active = section ?? "profile";
  const { theme, setTheme } = useTheme();
  const { user, logout, updateUser } = useAuth();
  const { accounts, profile, preferences, updateProfile, updatePreferences } =
    useAppData();
  const { toast } = useToast();
  const { t, formatMoney, setLocale, setCurrency, currency } = useTranslation();
  const navigate = useNavigate();

  const sections = useMemo(
    () =>
      sectionIds.map((id) => ({
        id,
        label: t(`settings.${id === "accounts" ? "connectedAccounts" : id}`),
        icon: sectionIcons[id],
      })),
    [t],
  );

  const notificationPrefs = useMemo(
    () =>
      notifPrefIds.map((id) => ({
        id,
        label: t(`settings.notifPrefs.${id}`),
        description: t(`settings.notifPrefs.${id}Desc`),
      })),
    [t],
  );

  const languages = useMemo(
    () =>
      localeOrderForUser(profile).map((code) => ({
        code,
        label: t(`settings.languages.${code}`),
        flag: languageFlags[code],
      })),
    [t, profile],
  );

  const themeOptions = useMemo(
    () =>
      themeOptionIds.map((id) => ({
        id,
        label: t(`settings.themes.${id}`),
        icon: themeIcons[id],
      })),
    [t],
  );

  const securityItems = useMemo(
    () => securityItemKeys.map((key) => t(`settings.${key}`)),
    [t],
  );

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(profile.phone);
  const [country, setCountry] = useState(profile.country);

  const handleSaveProfile = () => {
    if (!name.trim() || !email.trim()) {
      toast(t("settings.requiredFields"), "info");
      return;
    }
    updateUser({ name: name.trim(), email: email.trim() });
    updateProfile({ phone, country });
    toast(t("settings.profileSaved"), "success");
  };

  if (section && !sectionIds.includes(section as (typeof sectionIds)[number])) {
    return <Navigate to="/settings/profile" replace />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-[40px] font-bold tracking-tight text-navy">
          {t("settings.title")}
        </h1>
        <p className="mt-1 text-base text-muted">{t("settings.subtitle")}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card padding="sm" className="h-fit lg:col-span-1">
          <nav className="space-y-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <Link
                key={id}
                to={`/settings/${id}`}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5",
                  "text-sm font-medium transition-colors",
                  active === id
                    ? "bg-primary-light text-primary"
                    : "text-muted hover:bg-surface hover:text-navy",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </Card>

        <Card className="lg:col-span-3">
          {active === "profile" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-navy">
                {t("settings.profile")}
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white">
                  {name.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <p className="text-lg font-semibold text-navy">{name}</p>
                  <p className="text-sm text-muted">{email}</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    label: t("common.fullName"),
                    value: name,
                    set: setName,
                  },
                  { label: t("common.email"), value: email, set: setEmail },
                  { label: t("common.phone"), value: phone, set: setPhone },
                  {
                    label: t("common.country"),
                    value: country,
                    set: setCountry,
                  },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-sm font-medium text-muted">
                      {field.label}
                    </label>
                    <input
                      value={field.value}
                      onChange={(e) => field.set(e.target.value)}
                      className={cn(
                        "mt-1 h-10 w-full rounded-xl border border-border",
                        "bg-card px-3 text-sm text-navy outline-none",
                        "focus:border-primary focus:ring-2 focus:ring-primary/20",
                      )}
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleSaveProfile}>
                  {t("settings.saveChanges")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  {t("auth.signOut")}
                </Button>
              </div>
            </div>
          )}

          {active === "security" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-navy">
                {t("settings.security")}
              </h2>
              {securityItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl border border-border p-4"
                >
                  <span className="text-sm font-medium text-navy">{item}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      toast(t("settings.securityOpened", { item }), "info")
                    }
                  >
                    {t("common.configure")}
                  </Button>
                </div>
              ))}
            </div>
          )}

          {active === "accounts" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-navy">
                  {t("settings.connectedAccounts")}
                </h2>
                <Link to="/accounts/connect">
                  <Button size="sm">{t("settings.connectNew")}</Button>
                </Link>
              </div>
              <div className="space-y-3">
                {accounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between rounded-xl border border-border p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold text-white"
                        style={{ backgroundColor: account.color }}
                      >
                        {account.initials}
                      </div>
                      <div>
                        <p className="font-medium text-navy">
                          {account.provider}
                        </p>
                        <p className="text-sm text-muted">
                          {translateAccountType(t, account.type)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-navy">
                        {formatMoney(account.balance)}
                      </p>
                      <p className="text-xs text-success">
                        {t("common.synced")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-navy">
                {t("settings.notifications")}
              </h2>
              <div className="space-y-4">
                {notificationPrefs.map((pref) => (
                  <div
                    key={pref.id}
                    className="flex items-center justify-between rounded-xl border border-border p-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-navy">
                        {pref.label}
                      </p>
                      <p className="text-xs text-muted">{pref.description}</p>
                    </div>
                    <Toggle
                      id={pref.id}
                      checked={preferences.notificationPrefs[pref.id] ?? false}
                      onChange={(checked) => {
                        updatePreferences({
                          notificationPrefs: { [pref.id]: checked },
                        });
                        toast(
                          checked
                            ? t("settings.notifEnabled", {
                                label: pref.label,
                              })
                            : t("settings.notifDisabled", {
                                label: pref.label,
                              }),
                          "success",
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "language" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-navy">
                  {t("settings.language")}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {t("settings.languageDesc")}
                </p>
                {isSenegaleseUser(profile) && (
                  <p className="mt-2 text-sm text-primary">
                    {t("settings.languageSenegalHint")}
                  </p>
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLocale(lang.code as Locale);
                      toast(
                        t("settings.languageSet", { language: lang.label }),
                        "success",
                      );
                    }}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border p-4",
                      "transition-all text-left",
                      preferences.language === lang.code
                        ? "border-primary bg-primary-light"
                        : "border-border hover:border-primary/30",
                    )}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="flex-1">
                      <p className="font-medium text-navy">{lang.label}</p>
                    </div>
                    {preferences.language === lang.code && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {active === "currency" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-navy">
                  {t("settings.currency")}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {t("settings.currencyDesc")}
                </p>
              </div>
              <div className="max-h-[65vh] space-y-6 overflow-y-auto pr-1">
                {CURRENCY_GROUPS.map((group) => {
                  const groupKey = `settings.currencyGroups.${group}`;
                  const options = getCurrenciesByGroup(groupKey);
                  if (options.length === 0) return null;

                  return (
                    <section key={group}>
                      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                        {t(groupKey)}
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {options.map((option) => (
                          <button
                            key={option.code}
                            type="button"
                            onClick={() => {
                              setCurrency(option.code);
                              toast(
                                t("settings.currencySet", {
                                  currency: t(
                                    `settings.currencies.${option.code}`,
                                  ),
                                }),
                                "success",
                              );
                            }}
                            className={cn(
                              "flex items-center gap-4 rounded-xl border p-4 text-left",
                              "transition-all",
                              currency === option.code
                                ? "border-primary bg-primary-light ring-2 ring-ring"
                                : "border-border hover:border-primary/30 hover:bg-surface/50",
                            )}
                          >
                            <div
                              className={cn(
                                "flex h-12 w-12 shrink-0 items-center justify-center",
                                "rounded-xl bg-surface text-xs font-bold text-navy",
                              )}
                            >
                              {option.symbol}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-navy">
                                {t(`settings.currencies.${option.code}`)}
                              </p>
                              <p className="text-xs text-muted">
                                {option.code} · {t(option.regionKey)}
                              </p>
                            </div>
                            {currency === option.code && (
                              <Check className="h-5 w-5 shrink-0 text-primary" />
                            )}
                          </button>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
              <p className="text-xs text-muted">
                {t("settings.currencyCount", {
                  count: CURRENCY_OPTIONS.length,
                })}
              </p>
            </div>
          )}

          {active === "theme" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-navy">
                  {t("settings.theme")}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {t("settings.themeDesc")}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {themeOptions.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTheme(id)}
                    className={cn(
                      "flex flex-col gap-4 rounded-xl border p-4 text-left",
                      "transition-all",
                      theme === id
                        ? "border-primary bg-primary-light ring-2 ring-ring"
                        : "border-border hover:border-primary/30 hover:bg-surface/50",
                    )}
                  >
                    <ThemePreview mode={id} />
                    <div className="flex items-center gap-2">
                      <Icon
                        className={cn(
                          "h-5 w-5",
                          theme === id ? "text-primary" : "text-muted",
                        )}
                      />
                      <span className="font-medium text-navy">{label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {active === "subscription" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-navy">
                {t("settings.subscription")}
              </h2>
              <div className="rounded-2xl border-2 border-primary bg-primary-light/30 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-navy">
                      {t("settings.premiumPlan")}
                    </p>
                    <p className="text-sm text-muted">
                      {t("settings.premiumDesc")}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    {t("settings.premiumPrice")}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => toast(t("settings.subscriptionOpened"), "info")}
              >
                {t("settings.subscriptionManage")}
              </Button>
            </div>
          )}

          {active === "privacy" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-navy">
                {t("settings.privacy")}
              </h2>
              <p className="text-sm text-muted">{t("settings.privacySub")}</p>
              <div className="space-y-3">
                {(
                  ["exportData", "privacyPolicy", "deleteAccount"] as const
                ).map((key) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-xl border border-border p-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-navy">
                        {t(`settings.privacyItems.${key}`)}
                      </p>
                      <p className="text-xs text-muted">
                        {t(`settings.privacyItems.${key}Desc`)}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (key === "privacyPolicy") {
                          navigate("/privacy");
                          return;
                        }
                        toast(t(`settings.privacyItems.${key}Toast`), "info");
                      }}
                    >
                      {t(
                        key === "privacyPolicy"
                          ? "common.view"
                          : "common.configure",
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
