import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-surface text-navy",
  success:
    "bg-green-50 text-green-700 dark:bg-green-950/60 dark:text-green-300",
  warning:
    "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  error: "bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300",
  info: "bg-accent-light text-accent dark:text-blue-300",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5",
        "text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
