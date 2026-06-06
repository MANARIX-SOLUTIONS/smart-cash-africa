import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border",
        "border-primary/20 bg-primary-light px-4 py-1.5",
        "text-xs font-semibold uppercase tracking-wider text-primary",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}
