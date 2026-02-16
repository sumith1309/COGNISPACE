'use client';

import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number; // milliseconds per character
  delay?: number; // initial delay before starting
  startOnMount?: boolean; // start immediately or wait for manual trigger
}

/**
 * Hook for creating a typewriter text effect
 * Characters appear one by one at specified speed
 *
 * @example
 * const { displayedText, isComplete, start } = useTypewriter({
 *   text: "Hello, world!",
 *   speed: 50,
 *   delay: 500,
 *   startOnMount: false
 * });
 *
 * // Manual trigger: <button onClick={start}>Start</button>
 * // Or set startOnMount: true for automatic start
 */
export function useTypewriter({
  text,
  speed = 50,
  delay = 0,
  startOnMount = true,
}: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(startOnMount);

  useEffect(() => {
    if (!hasStarted) return;

    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, hasStarted]);

  return {
    displayedText,
    isComplete,
    start: () => setHasStarted(true),
    reset: () => {
      setDisplayedText('');
      setIsComplete(false);
      setHasStarted(false);
    },
  };
}
