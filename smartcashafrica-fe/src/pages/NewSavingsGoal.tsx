import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { BackLink } from "@/components/ui/BackLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { useAppData } from "@/context/AppDataContext";
import { useToast } from "@/context/ToastContext";
import { useTranslation } from "@/context/I18nContext";
import { cn } from "@/lib/utils";

const emojis = ["🎯", "🛡️", "💻", "🏝️", "🚀", "🏠", "🚗", "🎓"];

export function NewSavingsGoal() {
  const navigate = useNavigate();
  const { addSavingsGoal } = useAppData();
  const { toast } = useToast();
  const { t, currencySymbol } = useTranslation();
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [monthly, setMonthly] = useState("");
  const [emoji, setEmoji] = useState("🎯");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !target) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const goal = addSavingsGoal({
      name,
      target: Number(target),
      emoji,
      monthlyContribution: monthly ? Number(monthly) : undefined,
    });
    setIsLoading(false);
    toast(t("savings.created", { name }), "success");
    navigate(`/savings/${goal.id}`);
  };

  return (
    <div className="mx-auto max-w-xl space-y-8 animate-fade-in">
      <BackLink to="/savings" label={t("savings.back")} />

      <PageHeader
        title={t("savings.newTitle")}
        subtitle={t("savings.newSubtitle")}
      />

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-navy">
              {t("savings.icon")}
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {emojis.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl text-xl",
                    "border transition-all",
                    emoji === e
                      ? "border-primary bg-primary-light"
                      : "border-border hover:border-primary/30",
                  )}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <Input
            label={t("savings.goalName")}
            placeholder={t("savings.goalPlaceholder")}
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />

          <Input
            label={t("savings.targetAmount", { symbol: currencySymbol })}
            type="number"
            placeholder="2000000"
            value={target}
            onChange={(ev) => setTarget(ev.target.value)}
            min="1"
          />

          <Input
            label={t("savings.monthlyContribution", {
              symbol: currencySymbol,
            })}
            type="number"
            placeholder="50000"
            value={monthly}
            onChange={(ev) => setMonthly(ev.target.value)}
            hint={t("savings.monthlyHint")}
          />

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading || !name || !target}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              t("savings.createGoal")
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
