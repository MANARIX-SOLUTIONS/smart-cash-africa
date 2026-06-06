import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/context/I18nContext";

export function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <AuthLayout
        title={t("auth.checkEmail")}
        subtitle={t("auth.checkEmailSubtitle")}
      >
        <div className="flex flex-col items-center py-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-primary" />
          <p className="mt-4 text-sm text-muted">
            {t("auth.checkEmailBody", { email })}
          </p>
          <Link to="/login" className="mt-8">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4" />
              {t("auth.backToSignIn")}
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title={t("auth.resetPassword")}
      subtitle={t("auth.resetSubtitle")}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label={t("common.email")}
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isLoading || !email}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            t("auth.sendResetLink")
          )}
        </Button>
      </form>

      <Link
        to="/login"
        className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("auth.backToSignIn")}
      </Link>
    </AuthLayout>
  );
}
