import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/context/I18nContext";

export function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-8xl font-bold text-primary/20">404</p>
      <h1 className="mt-4 text-3xl font-bold text-navy">
        {t("notFound.title")}
      </h1>
      <p className="mt-2 max-w-md text-muted">{t("notFound.subtitle")}</p>
      <div className="mt-8 flex gap-3">
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4" />
          {t("notFound.goBack")}
        </Button>
        <Link to="/dashboard">
          <Button>
            <Home className="h-4 w-4" />
            {t("notFound.dashboard")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
