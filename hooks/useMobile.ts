import { useEffect, useState } from "react";

export function useMobile(setIsOpen?: (isOpen: boolean) => void) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      // Close mobile menu when switching to desktop
      if (!mobile && setIsOpen) {
        setIsOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsOpen]);

  return isMobile;
}
