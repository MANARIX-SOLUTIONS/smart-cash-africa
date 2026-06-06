import { useMemo, useState } from "react";
import {
  MessageCircle,
  Mail,
  BookOpen,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { useToast } from "@/context/ToastContext";
import { useTranslation } from "@/context/I18nContext";
import { cn } from "@/lib/utils";

export function Help() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const faqs = useMemo(
    () => [
      { q: t("help.faq1q"), a: t("help.faq1a") },
      { q: t("help.faq2q"), a: t("help.faq2a") },
      { q: t("help.faq3q"), a: t("help.faq3a") },
      { q: t("help.faq4q"), a: t("help.faq4a") },
      { q: t("help.faq5q"), a: t("help.faq5a") },
    ],
    [t],
  );

  const resources = useMemo(
    () => [
      { title: t("help.res1Title"), desc: t("help.res1Desc") },
      { title: t("help.res2Title"), desc: t("help.res2Desc") },
      { title: t("help.res3Title"), desc: t("help.res3Desc") },
    ],
    [t],
  );

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setIsSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSending(false);
    toast(t("help.sent"), "success");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 animate-fade-in">
      <PageHeader
        title={t("help.title")}
        subtitle={t("help.subtitle")}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => toast(t("help.liveChatToast"), "info")}
        >
          <Card hover className="flex w-full items-center gap-4 text-left">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-navy">{t("help.liveChat")}</p>
              <p className="text-sm text-muted">{t("help.liveChatHours")}</p>
            </div>
          </Card>
        </button>
        <a href="mailto:support@smartcash.africa">
          <Card hover className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light text-accent">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-navy">{t("help.emailSupport")}</p>
              <p className="text-sm text-muted">support@smartcash.africa</p>
            </div>
          </Card>
        </a>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-navy">{t("help.faq")}</h3>
        <div className="mt-4 space-y-2">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="rounded-xl border border-border">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <span className="text-sm font-medium text-navy">{faq.q}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted transition-transform",
                    openFaq === i && "rotate-180",
                  )}
                />
              </button>
              {openFaq === i && (
                <p className="border-t border-border px-4 pb-4 pt-2 text-sm text-muted">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-navy">{t("help.resources")}</h3>
        </div>
        <div className="mt-4 space-y-2">
          {resources.map((r) => (
            <button
              key={r.title}
              type="button"
              onClick={() => toast(t("help.opening", { title: r.title }), "info")}
              className={cn(
                "flex w-full items-center justify-between rounded-xl",
                "border border-border p-4 text-left transition-colors",
                "hover:border-primary/30 hover:bg-surface",
              )}
            >
              <div>
                <p className="font-medium text-navy">{r.title}</p>
                <p className="text-sm text-muted">{r.desc}</p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted" />
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-navy">
          {t("help.sendMessage")}
        </h3>
        <form onSubmit={handleSend} className="mt-4 space-y-4">
          <Input
            label={t("common.subject")}
            placeholder={t("help.subjectPlaceholder")}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <div>
            <label className="text-sm font-medium text-navy">
              {t("common.message")}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder={t("help.messagePlaceholder")}
              className={cn(
                "mt-1.5 w-full rounded-xl border border-border bg-card p-4",
                "text-sm text-navy outline-none resize-none",
                "focus:border-primary focus:ring-2 focus:ring-primary/20",
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={!message.trim() || !subject.trim() || isSending}
          >
            {isSending ? t("help.sending") : t("help.sendBtn")}
          </Button>
        </form>
      </Card>
    </div>
  );
}
