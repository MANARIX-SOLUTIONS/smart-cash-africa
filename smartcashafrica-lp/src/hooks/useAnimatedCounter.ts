import { useEffect, useState } from "react";

export function useAnimatedCounter(
  target: number,
  isActive: boolean,
  duration = 2000,
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let start = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(tick);
  }, [target, isActive, duration]);

  return count;
}
