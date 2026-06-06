import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useTranslation } from "@/context/I18nContext";
import { cn } from "@/lib/utils";

interface RenameAccountDialogProps {
  open: boolean;
  currentName: string;
  onClose: () => void;
  onSave: (name: string) => void;
}

export function RenameAccountDialog({
  open,
  currentName,
  onClose,
  onSave,
}: RenameAccountDialogProps) {
  const { t } = useTranslation();
  const [name, setName] = useState(currentName);

  useEffect(() => {
    if (open) setName(currentName);
  }, [open, currentName]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-overlay backdrop-blur-sm"
        onClick={onClose}
        aria-label={t("common.close")}
      />
      <div
        className={cn(
          "relative w-full max-w-md rounded-2xl bg-card p-6",
          "shadow-2xl animate-slide-up",
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-navy">
            {t("rename.title")}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted hover:bg-surface"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t("common.displayName")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              {t("common.cancel")}
            </Button>
            <Button type="submit" className="flex-1" disabled={!name.trim()}>
              {t("common.save")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
