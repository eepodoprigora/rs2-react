import { useRef } from "react";

export function useThrottle(fn, delay) {
  const lastCall = useRef(0);

  return function (...args) {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      fn(...args);
      lastCall.current = now;
    }
  };
}
