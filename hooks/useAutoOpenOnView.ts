import { useEffect, useRef, useState } from "react";

export function useAutoOpenOnView(
  isOpen: boolean | undefined,
  onToggle: (() => void) | undefined,
  delay = 500
) {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasBeenManuallyClosed, setHasBeenManuallyClosed] = useState(false);
  const wasInView = useRef(false);

  useEffect(() => {
    if (
      !elementRef.current ||
      !onToggle ||
      isOpen ||
      typeof window === "undefined" ||
      window.innerWidth <= 768 // Skip on mobile
    ) {
      return;
    }

    const handleUserClosed = () => {
      if (!isOpen) {
        setHasBeenManuallyClosed(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isFullyInView =
          entry.isIntersecting && entry.intersectionRatio >= 1;

        // User scrolled away — reset manual-close blocker
        if (!isFullyInView && wasInView.current) {
          setHasBeenManuallyClosed(false);
        }

        wasInView.current = isFullyInView;

        if (isFullyInView && !isOpen && !hasBeenManuallyClosed) {
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
        threshold: [1],
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
  }, [isOpen, onToggle, delay, hasBeenManuallyClosed]);

  // Detect manual closing
  useEffect(() => {
    if (!isOpen) {
      setHasBeenManuallyClosed(true);
    }
  }, [isOpen]);

  return elementRef;
}

