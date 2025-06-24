import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useMobile } from "./useMobile";

interface UseSequentialCardAnimationOptions {
  length: number;
  skipOnContainerHidden?: boolean;
}

export function useSequentialCardAnimation({
  length,
  skipOnContainerHidden = false,
}: UseSequentialCardAnimationOptions) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animatedIndexes, setAnimatedIndexes] = useState<number[]>([]);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const isInView = useInView(containerRef, { once: true });
  const isMobile = useMobile();
  const skipIndexes = Array.from({ length }, (_, index) => index);

  const shouldSkip = () => {
    if (skipOnContainerHidden && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return true;
    }
    return false;
  };

  useEffect(() => {
    if (!isMobile || !isInView) return;

    let scrollHandler: (() => void) | null = null;

    const animateSequentially = async () => {
      for (let i = 0; i < length; i++) {
        // Check if we should skip
        if (isCancelled || shouldSkip()) {
          setAnimatedIndexes(skipIndexes);
          break;
        }

        const ref = cardRefs.current[i];
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const bottomVisible = rect.bottom <= window.innerHeight;
          if (!bottomVisible) {
            ref.scrollIntoView({ behavior: "smooth", block: "end" });
            await new Promise((res) => setTimeout(res, 50));
            await new Promise((res) => setTimeout(res, 400));
          }
        }

        setAnimatedIndexes((prev) => [...prev, i]);
        await new Promise((res) => setTimeout(res, 500));
      }

      // Animation is done, remove scroll listener
      if (scrollHandler) {
        console.log("Animation completed, removing scroll listener");
        window.removeEventListener("scroll", scrollHandler);
        scrollHandler = null;
      }

      // Final container scroll if not skipped
      if (!shouldSkip()) {
        const containerRect = containerRef.current?.getBoundingClientRect();
        const bottomVisible =
          containerRect?.bottom && containerRect.bottom <= window.innerHeight;
        if (!bottomVisible) {
          containerRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }
    };

    // Create scroll handler
    const handleScroll = () => {
      console.log("scrolled");
      if (shouldSkip()) {
        setAnimatedIndexes(skipIndexes);
        setIsCancelled(true);
        console.log("skipped");

        if (scrollHandler) {
          console.log("Animation skipped, removing scroll listener");
          window.removeEventListener("scroll", scrollHandler);
          scrollHandler = null;
        }
      }
    };

    // Add scroll listener if needed
    if (skipOnContainerHidden) {
      scrollHandler = handleScroll;
      window.addEventListener("scroll", handleScroll);
    }

    setAnimatedIndexes([]); // Reset on rerun
    setIsCancelled(false);
    animateSequentially();

    return () => {
      setIsCancelled(true);
      if (scrollHandler) {
        console.log("Component unmounting, removing scroll listener");
        window.removeEventListener("scroll", scrollHandler);
      }
    };
  }, [isMobile, isInView, length, skipOnContainerHidden]);

  return { cardRefs, containerRef, animatedIndexes, isMobile };
}

