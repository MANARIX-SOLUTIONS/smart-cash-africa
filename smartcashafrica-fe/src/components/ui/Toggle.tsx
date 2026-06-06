import { cn } from "@/lib/utils";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
}

export function Toggle({ checked, onChange, label, id }: ToggleProps) {
  return (
    <label
      htmlFor={id}
      className="inline-flex cursor-pointer items-center gap-3"
    >
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors duration-200",
          checked ? "bg-primary" : "bg-slate-200 dark:bg-slate-600",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white",
            "shadow-sm transition-transform duration-200",
            checked && "translate-x-5",
          )}
        />
      </button>
      {label && <span className="text-sm font-medium text-navy">{label}</span>}
    </label>
  );
}
