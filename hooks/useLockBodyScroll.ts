import { useEffect } from "react";

// Custom hook to lock body scroll
export function useLockBodyScroll(lock: boolean) {
  useEffect(() => {
    if (lock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lock]);
}
