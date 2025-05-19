import { useEffect, useRef } from "react";

export function useAutoOpenOnView(
  isOpen: boolean | undefined,
  onToggle: (() => void) | undefined,
  delay = 500
) {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current || !onToggle || isOpen) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
          timeoutRef.current = setTimeout(() => {
            onToggle();
          }, delay);
        } else {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        }
      },
      {
        threshold: [0.75],
        rootMargin: "0px",
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, onToggle, delay]);

  return elementRef;
}

