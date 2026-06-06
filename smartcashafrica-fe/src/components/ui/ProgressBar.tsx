import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  color = "#00A86B",
  className,
  showLabel = false,
}: ProgressBarProps) {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div className={cn("w-full", className)}>
      <div className="h-2 w-full overflow-hidden rounded-full bg-surface">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${percent}%`,
            backgroundColor: color,
          }}
        />
      </div>
      {showLabel && (
        <p className="mt-1 text-xs text-muted text-right">
          {percent.toFixed(0)}%
        </p>
      )}
    </div>
  );
}
