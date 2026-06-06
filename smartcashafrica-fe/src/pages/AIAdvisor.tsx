import { useEffect, useMemo, useState } from "react";
import { Send, Bot, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/I18nContext";
import { cn } from "@/lib/utils";

const suggestionKeys = [
  "analyze",
  "save",
  "overspending",
  "goal",
  "budget",
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

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: String(prev.length + 1), role: "user", content: text },
    ]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          role: "assistant",
          content: t("advisor.analyzing"),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col animate-fade-in">
      <div className="mb-6">
        <h1 className="text-[40px] font-bold tracking-tight text-navy">
          {t("advisor.title")}
        </h1>
        <p className="mt-1 text-base text-muted">{t("advisor.subtitle")}</p>
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden p-0">
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
                    : "bg-surface text-navy",
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
        </div>

        <div className="border-t border-border p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSend(suggestion)}
                className={[
                  "rounded-full border border-border px-3 py-1.5",
                  "text-xs font-medium text-navy",
                  "transition-colors hover:border-primary hover:bg-primary-light",
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
              className={[
                "h-12 flex-1 rounded-xl border border-border bg-surface",
                "px-4 text-sm outline-none",
                "focus:border-primary focus:ring-2 focus:ring-primary/20",
              ].join(" ")}
            />
            <Button
              size="lg"
              onClick={() => handleSend(input)}
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
