import { cn } from "@/lib/utils";

type PreviewMode = "light" | "dark" | "system";

interface ThemePreviewProps {
  mode: PreviewMode;
  className?: string;
}

const previewStyles: Record<
  Exclude<PreviewMode, "system">,
  { bg: string; card: string; bar: string; accent: string }
> = {
  light: {
    bg: "#f6f8fb",
    card: "#ffffff",
    bar: "#eef2f6",
    accent: "#00a86b",
  },
  dark: {
    bg: "#070b14",
    card: "#121a27",
    bar: "#1a2435",
    accent: "#00a86b",
  },
};

export function ThemePreview({ mode, className }: ThemePreviewProps) {
  if (mode === "system") {
    return (
      <div
        className={cn(
          "relative h-24 w-full overflow-hidden rounded-xl border border-border",
          className,
        )}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #f6f8fb 0%, #f6f8fb 50%, #070b14 50%, #070b14 100%)",
          }}
        />
        <PreviewChrome
          colors={previewStyles.light}
          className="absolute inset-y-2 left-2 w-[46%]"
        />
        <PreviewChrome
          colors={previewStyles.dark}
          className="absolute inset-y-2 right-2 w-[46%]"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "h-24 w-full overflow-hidden rounded-xl border border-border",
        className,
      )}
      style={{ backgroundColor: previewStyles[mode].bg }}
    >
      <PreviewChrome colors={previewStyles[mode]} className="p-2.5" />
    </div>
  );
}

function PreviewChrome({
  colors,
  className,
}: {
  colors: (typeof previewStyles)["light"];
  className?: string;
}) {
  return (
    <div className={cn("flex h-full flex-col gap-1.5", className)}>
      <div
        className="h-2.5 w-2/5 rounded-full"
        style={{ backgroundColor: colors.bar }}
      />
      <div
        className="flex flex-1 flex-col gap-1.5 rounded-lg p-2"
        style={{ backgroundColor: colors.card }}
      >
        <div
          className="h-2 w-3/5 rounded-full"
          style={{ backgroundColor: colors.bar }}
        />
        <div
          className="h-6 w-full rounded-md"
          style={{ backgroundColor: colors.accent, opacity: 0.85 }}
        />
      </div>
    </div>
  );
}
