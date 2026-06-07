import {
  getProviderLogoSrc,
  resolveAccountProvider,
  type FinancialProvider,
} from '@/lib/providers';
import { cn } from '@/lib/utils';

type ProviderLogoSize = 'sm' | 'md' | 'lg';

const sizeClasses: Record<ProviderLogoSize, string> = {
  sm: 'h-6 w-6 rounded-md',
  md: 'h-11 w-11 rounded-xl',
  lg: 'h-12 w-12 rounded-xl',
};

const padClasses: Record<ProviderLogoSize, string> = {
  sm: 'p-0.5',
  md: 'p-1',
  lg: 'p-1.5',
};

const textClasses: Record<ProviderLogoSize, string> = {
  sm: 'text-[9px]',
  md: 'text-xs',
  lg: 'text-sm',
};

interface ProviderLogoProps {
  provider?: FinancialProvider | null;
  providerId?: string;
  name?: string;
  color?: string;
  initials?: string;
  size?: ProviderLogoSize;
  className?: string;
}

export function ProviderLogo({
  provider,
  providerId,
  name,
  color,
  initials,
  size = 'md',
  className,
}: ProviderLogoProps) {
  const resolved =
    provider ??
    (providerId
      ? resolveAccountProvider({ provider: name ?? '', providerId })
      : name
        ? resolveAccountProvider({ provider: name })
        : null);

  const fallbackColor = resolved?.color ?? color ?? '#64748B';
  const fallbackInitials = resolved?.initials ?? initials ?? '??';
  const label = resolved?.name ?? name ?? 'Provider';

  if (resolved) {
    const src = getProviderLogoSrc(resolved, size);
    const bg = resolved.logoBg ?? '#FFFFFF';

    return (
      <div
        className={cn(
          'flex shrink-0 items-center justify-center overflow-hidden',
          'border border-border/60 shadow-sm',
          sizeClasses[size],
          className,
        )}
        style={{ backgroundColor: bg }}
      >
        <img
          src={src}
          alt={label}
          className={cn('h-full w-full object-contain', padClasses[size])}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center font-bold text-white',
        sizeClasses[size],
        className,
      )}
      style={{ backgroundColor: fallbackColor }}
      aria-label={label}
    >
      <span className={textClasses[size]}>{fallbackInitials}</span>
    </div>
  );
}

interface AccountProviderLogoProps {
  account: {
    provider: string;
    providerId?: string;
    color: string;
    initials: string;
  };
  size?: ProviderLogoSize;
  className?: string;
}

export function AccountProviderLogo({
  account,
  size = 'md',
  className,
}: AccountProviderLogoProps) {
  const provider = resolveAccountProvider(account);

  return (
    <ProviderLogo
      provider={provider}
      name={account.provider}
      color={account.color}
      initials={account.initials}
      size={size}
      className={className}
    />
  );
}
