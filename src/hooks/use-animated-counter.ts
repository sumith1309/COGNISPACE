'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface UseAnimatedCounterOptions {
  end: number;
  duration?: number; // milliseconds
  start?: number;
  decimals?: number;
}

/**
 * Hook for animating a number counter when it scrolls into view
 * Uses easeOutCubic easing for smooth deceleration
 *
 * @example
 * const { count, ref } = useAnimatedCounter({ end: 99.9, decimals: 1 });
 * return <div ref={ref}>{count}%</div>;
 */
export function useAnimatedCounter({
  end,
  duration = 2000,
  start = 0,
  decimals = 0,
}: UseAnimatedCounterOptions) {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const endTime = startTime + duration;
    const range = end - start;

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function (easeOutCubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = start + range * easeProgress;

      setCount(Number(current.toFixed(decimals)));

      if (now >= endTime) {
        setCount(end);
        clearInterval(timer);
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [isInView, end, duration, start, decimals]);

  return { count, ref };
}
