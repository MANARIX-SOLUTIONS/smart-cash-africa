import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({
  label,
  error,
  hint,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-navy">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "h-11 w-full rounded-xl border border-border bg-card px-4",
          "text-sm text-navy placeholder:text-muted outline-none",
          "transition-all focus:border-primary focus:ring-2 focus:ring-primary/20",
          error && "border-error focus:border-error focus:ring-error/20",
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-error" role="alert">
          {error}
        </p>
      )}
      {hint && !error && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}
