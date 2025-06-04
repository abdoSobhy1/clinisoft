// hooks/useCountUp.ts
import { useEffect, useState } from "react";

export function useCountUp(
  target: number,
  duration: number = 2000,
  start = 0
): [number, boolean] {
  const [count, setCount] = useState(start);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let startTimestamp: number | null = null;
    setIsFinished(false);

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const progressRatio = Math.min(progress / duration, 1);
      const currentValue = Math.floor(progressRatio * (target - start) + start);
      setCount(currentValue);

      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
        setIsFinished(true);
      }
    };

    requestAnimationFrame(step);
  }, [target, duration, start]);

  return [count, isFinished];
}
