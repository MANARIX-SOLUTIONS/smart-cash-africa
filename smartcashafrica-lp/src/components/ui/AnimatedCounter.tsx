import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useInView } from "@/hooks/useInView";
import { formatCompact } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className,
}: AnimatedCounterProps) {
  const { ref, isInView } = useInView();
  const count = useAnimatedCounter(value, isInView);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatCompact(count)}
      {suffix}
    </span>
  );
}
