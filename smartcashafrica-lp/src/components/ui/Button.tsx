import { cn } from "@/lib/utils";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25",
  secondary: "bg-navy text-white hover:bg-navy-light shadow-lg shadow-navy/20",
  ghost: "bg-transparent text-navy hover:bg-surface",
  outline:
    "border border-border bg-card text-navy hover:border-primary/40 hover:bg-primary-light/50",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-12 px-8 text-base font-semibold",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl",
    "font-medium transition-all duration-200",
    "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-primary focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    const { ...anchorProps } = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={styles} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { ...buttonProps } = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={styles} {...buttonProps}>
      {children}
    </button>
  );
}
