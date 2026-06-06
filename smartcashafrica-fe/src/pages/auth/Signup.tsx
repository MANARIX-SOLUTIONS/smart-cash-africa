import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/I18nContext";

export function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError(t("auth.fillAllFields"));
      return;
    }

    if (password.length < 8) {
      setError(t("auth.passwordMin"));
      return;
    }

    setIsLoading(true);
    try {
      await signup(name, email, password);
      navigate("/onboarding");
    } catch {
      setError(t("auth.somethingWrong"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title={t("auth.createYourAccount")}
      subtitle={t("auth.signupSubtitle")}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <p
            role="alert"
            className="select-text rounded-xl bg-red-50 px-4 py-3 text-sm text-error dark:bg-red-950"
          >
            {error}
          </p>
        )}

        <Input
          label={t("common.fullName")}
          type="text"
          placeholder={t("auth.yourFullName")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />

        <Input
          label={t("common.email")}
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <div className="relative">
          <Input
            label={t("common.password")}
            type={showPassword ? "text" : "password"}
            placeholder={t("auth.minPassword")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            hint={t("auth.passwordHint")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-[38px] text-muted hover:text-navy"
            aria-label={
              showPassword ? t("auth.hidePassword") : t("auth.showPassword")
            }
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            t("auth.createAccount")
          )}
        </Button>
      </form>

      <p className="mt-4 text-center text-xs text-muted">
        {t("auth.signupTermsPrefix")}{" "}
        <Link to="/terms" className="text-primary hover:underline">
          {t("auth.termsOfService")}
        </Link>{" "}
        {t("common.and")}{" "}
        <Link to="/privacy" className="text-primary hover:underline">
          {t("auth.privacyPolicy")}
        </Link>
        .
      </p>

      <p className="mt-6 text-center text-sm text-muted">
        {t("auth.hasAccount")}{" "}
        <Link to="/login" className="font-medium text-primary hover:underline">
          {t("auth.signIn")}
        </Link>
      </p>
    </AuthLayout>
  );
}
