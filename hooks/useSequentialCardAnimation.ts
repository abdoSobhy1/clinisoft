import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useMobile } from "./useMobile";

export function useSequentialCardAnimation({ length }: { length: number }) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animatedIndexes, setAnimatedIndexes] = useState<number[]>([]);
  const isInView = useInView(containerRef, { once: true });
  const isMobile = useMobile();

  useEffect(() => {
    if (!isMobile || !isInView) return;
    let cancelled = false;
    const animateSequentially = async () => {
      for (let i = 0; i < length; i++) {
        if (cancelled) break;
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
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    };
    setAnimatedIndexes([]); // Reset on rerun
    animateSequentially();
    return () => {
      cancelled = true;
    };
  }, [isMobile, isInView, length]);

  return { cardRefs, containerRef, animatedIndexes };
}
