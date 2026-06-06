import { useEffect, useMemo, useState } from "react";
import { Send, Bot, Sparkles, Zap } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/I18nContext";
import { cn } from "@/lib/utils";

const suggestionKeys = [
  "analyze",
  "save",
  "overspending",
  "budget",
  "cashflow",
  "trends",
  "goal",
  "report",
] as const;

export function AIAdvisor() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const firstName = user?.name.split(" ")[0] ?? "there";

  const suggestions = useMemo(
    () => suggestionKeys.map((key) => t(`advisor.suggestions.${key}`)),
    [t],
  );

  const initialMessages = useMemo(
    () => [
      {
        id: "1",
        role: "assistant" as const,
        content: t("advisor.greetingName", { name: firstName }),
      },
      {
        id: "2",
        role: "user" as const,
        content: t("advisor.suggestions.save"),
      },
      {
        id: "3",
        role: "assistant" as const,
        content: t("advisor.demoSavingsAnswer"),
      },
    ],
    [t, firstName],
  );

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const handleSend = (text: string) => {
    if (!text.trim() || isTyping) return;
    setMessages((prev) => [
      ...prev,
      { id: String(prev.length + 1), role: "user", content: text },
    ]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          role: "assistant",
          content: t("advisor.analyzing"),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-[40px] font-bold tracking-tight text-navy">
              {t("advisor.title")}
            </h1>
            <p className="text-base text-muted">{t("advisor.subtitle")}</p>
          </div>
        </div>
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden p-0">
        <div className="border-b border-border bg-surface/50 px-6 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {t("advisor.capabilities")}
          </p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3",
                msg.role === "user" ? "flex-row-reverse" : "",
              )}
            >
              {msg.role === "assistant" && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                  <Bot className="h-5 w-5" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-primary text-white"
                    : "border border-border bg-surface text-navy",
                )}
              >
                {msg.content
                  .split("**")
                  .map((part, i) =>
                    i % 2 === 1 ? (
                      <strong key={i}>{part}</strong>
                    ) : (
                      <span key={i}>{part}</span>
                    ),
                  )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                <Bot className="h-5 w-5" />
              </div>
              <div className="rounded-2xl border border-border bg-card px-4 py-3">
                <span className="inline-flex gap-1">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-muted" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-muted [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-muted [animation-delay:300ms]" />
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border bg-surface/30 p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSend(suggestion)}
                disabled={isTyping}
                className={[
                  "rounded-full border border-border bg-card px-3 py-1.5",
                  "text-xs font-medium text-navy",
                  "transition-colors hover:border-primary hover:bg-primary-light",
                  "disabled:opacity-50",
                ].join(" ")}
              >
                <Sparkles className="mr-1 inline h-3 w-3 text-primary" />
                {suggestion}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              placeholder={t("advisor.placeholder")}
              disabled={isTyping}
              className={[
                "h-12 flex-1 rounded-xl border border-border bg-card",
                "px-4 text-sm outline-none shadow-sm",
                "focus:border-primary focus:ring-2 focus:ring-primary/20",
                "disabled:opacity-50",
              ].join(" ")}
            />
            <Button
              size="lg"
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
