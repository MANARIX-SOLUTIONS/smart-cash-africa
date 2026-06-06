import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

export function Card({
  children,
  className,
  hover = false,
  padding = "lg",
}: CardProps) {
  const paddingClass = {
    sm: "p-4",
    md: "p-5",
    lg: "p-6",
  }[padding];

  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] bg-card border border-border",
        "shadow-[var(--shadow-card)]",
        hover &&
          "transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5",
        paddingClass,
        className,
      )}
    >
      {children}
    </div>
  );
}
